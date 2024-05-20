import Files from "../../models/Files";
import AppError from "../../errors/AppError";

const DeleteService = async (id: string | number, companyId: number): Promise<void> => {
  const file = await Files.findOne({
    where: { id, companyId }
  });

  if (!file) {
    throw new AppError("ERR_NO_RATING_FOUND", 404);
  }

  await file.destroy();
};

export default DeleteService;
