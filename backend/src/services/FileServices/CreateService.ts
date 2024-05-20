import * as Yup from "yup";

import AppError from "../../errors/AppError";
import Files from "../../models/Files";
import FilesOptions from "../../models/FilesOptions";
import ShowService from "./ShowService";

interface Request {
  name: string;
  companyId: number;
  message: string;
  options?: FilesOptions[];
}

const CreateService = async ({
  name,
  message,
  companyId,
  options
}: Request): Promise<Files> => {
  const schema = Yup.object().shape({
    name: Yup.string()
      .required()
      .min(3)
      .test(
        "Check-unique-name",
        "ERR_RATING_NAME_ALREADY_EXISTS",
        async value => {
          if (value) {
            const tagWithSameName = await Files.findOne({
              where: { name: value, companyId }
            });

            return !tagWithSameName;
          }
          return false;
        }
      )
  });

  try {
    await schema.validate({ name });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    throw new AppError(err.message);
  }
  let fileList = await Files.create({
    name, 
    message, 
    companyId 
  });

  if(options && options.length > 0) {
    await Promise.all(
      options.map(async info => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        await FilesOptions.upsert({ ...info, fileId: fileList.id });
      })
    );
  }

   fileList = await ShowService(fileList.id, companyId)

  return fileList;
};

export default CreateService;