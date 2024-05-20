import { Request, Response } from "express";
import { getIO } from "../libs/socket";

import AppError from "../errors/AppError";
import { head } from "lodash";

import CreateService from "../services/FileServices/CreateService";
import ListService from "../services/FileServices/ListService";
import UpdateService from "../services/FileServices/UpdateService";
import ShowService from "../services/FileServices/ShowService";
import DeleteService from "../services/FileServices/DeleteService";
import SimpleListService from "../services/FileServices/SimpleListService";
import DeleteAllService from "../services/FileServices/DeleteAllService";
import ShowTicketService from "../services/TicketServices/ShowTicketService";
import UpdateTicketService from "../services/TicketServices/UpdateTicketService";
import FilesOptions from "../models/FilesOptions";

type IndexQuery = {
  searchParam?: string;
  pageNumber?: string | number;
};

export const index = async (req: Request, res: Response): Promise<Response> => {
  const { pageNumber, searchParam } = req.query as IndexQuery;
  const { companyId } = req.user;

  const { files, count, hasMore } = await ListService({
    searchParam,
    pageNumber,
    companyId
  });

  return res.json({ files, count, hasMore });
};

export const store = async (req: Request, res: Response): Promise<Response> => {
  const { name, message, options } = req.body;
  const { companyId } = req.user;

  const fileList = await CreateService({
    name,
    message,
    options,
    companyId
  });

  const io = getIO();
  io.emit(`company${companyId}-file`, {
    action: "create",
    fileList
  });

  return res.status(200).json(fileList);
};

export const show = async (req: Request, res: Response): Promise<Response> => {
  const { fileId } = req.params;
  const { companyId } = req.user;

  const file = await ShowService(fileId, companyId);

  return res.status(200).json(file);
};

export const uploadMedias = async (req: Request, res: Response): Promise<Response> => {
  const { fileId, id, mediaType } = req.body;
  const files = req.files as Express.Multer.File[];
  const file = head(files);

  try {
    
    let fileOpt
    if (files.length > 0) {

      for (const [index, file] of files.entries()) {
        fileOpt = await FilesOptions.findOne({
          where: {
            fileId,
            id: Array.isArray(id)? id[index] : id
          }
        });

        fileOpt.update({
          path: file.filename.replace('/','-'),
          mediaType: Array.isArray(mediaType)? mediaType[index] : mediaType
        }) ;
      }
    }
    
    return res.send({ mensagem: "Arquivos atualizados" });
  } catch (err: any) {
    throw new AppError(err.message);
  }
};

export const update = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (req.user.profile !== "admin") {
    throw new AppError("ERR_NO_PERMISSION", 403);
  }

  const { fileId } = req.params;
  const fileData = req.body;
  const { companyId } = req.user;

  const fileList = await UpdateService({ fileData, id: fileId, companyId });

  const io = getIO();
  io.emit(`company${companyId}-file`, {
    action: "update",
    fileList
  });

  return res.status(200).json(fileList);
};
    

export const remove = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { fileId } = req.params;
  const { companyId } = req.user;

  await DeleteService(fileId, companyId);

  const io = getIO();
  io.emit(`company${companyId}-file`, {
    action: "delete",
    fileId
  });

  return res.status(200).json({ message: "File List deleted" });
};

export const removeAll = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { companyId } = req.user;
  await DeleteAllService(companyId);

  return res.send();
};

export const list = async (req: Request, res: Response): Promise<Response> => {
  const { searchParam } = req.query as IndexQuery;
  const { companyId } = req.user;

  const ratings = await SimpleListService({ searchParam, companyId });

  return res.json(ratings);
};
