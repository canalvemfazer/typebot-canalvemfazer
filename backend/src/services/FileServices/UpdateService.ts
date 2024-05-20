import * as Yup from "yup";

import AppError from "../../errors/AppError";
import Files from "../../models/Files";
import FilesOptions from "../../models/FilesOptions";
import ShowService from "./ShowService";

interface Options {
  id?: number;
  name: string;
  path: string;
}

interface FileData {
  id?: number;
  name: string;
  message: string;
  options?: Options[];
}

interface Request {
  fileData: FileData;
  id: string | number;
  companyId: number;
}

const UpdateService = async ({
  fileData,
  id,
  companyId
}: Request): Promise<Files | undefined> => {
  const file = await ShowService(id, companyId);

  const schema = Yup.object().shape({
    name: Yup.string().min(3)
  });

  const { name, message, options } = fileData;

  try {
    await schema.validate({ name });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    throw new AppError(err.message);
  }

  if (options) {
    await Promise.all(
      options.map(async info => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        await FilesOptions.upsert({ ...info, fileId: file.id });
      })
    );

    await Promise.all(
      file.options.map(async oldInfo => {
        const stillExists = options.findIndex(info => info.id === oldInfo.id);

        if (stillExists === -1) {
          await FilesOptions.destroy({ where: { id: oldInfo.id } });
        }
      })
    );
  }


  
  
  await file.update({
    name,
    message
  });

  await file.reload({
    attributes: ["id", "name", "message","companyId"],
    include: ["options"]
  });
  return file;
};

export default UpdateService;
