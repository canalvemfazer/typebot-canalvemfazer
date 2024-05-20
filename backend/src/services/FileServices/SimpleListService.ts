import { Op } from "sequelize";
import Rating from "../../models/Files";

interface Request {
  companyId: number
  searchParam?: string;
}

const ListService = async ({ searchParam, companyId }: Request): Promise<Rating[]> => {
  let whereCondition = {};

  if (searchParam) {
    whereCondition = {
      [Op.or]: [{ name: { [Op.like]: `%${searchParam}%` } }]
    };
  }

  const ratings = await Rating.findAll({
    where: {companyId, ...whereCondition},
    order: [["name", "ASC"]],
    attributes: {
      exclude: ["createdAt", "updatedAt"]
    },
    group: ["Rating.id"]
  });

  return ratings;
};

export default ListService;
