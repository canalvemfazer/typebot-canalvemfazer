import Files from "../../models/Files";
import AppError from "../../errors/AppError";

const DeleteAllService = async (companyId: number): Promise<void> => {
  await Files.findAll({
    where: { companyId }
  });

  if (!Files) {
    throw new AppError("ERR_NO_RATING_FOUND", 404);
  }

  await Files.destroy({ where: {} });
};

export default DeleteAllService;
