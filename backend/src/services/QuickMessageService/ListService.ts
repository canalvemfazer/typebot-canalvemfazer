import { Sequelize, Op, Filterable } from "sequelize";
import QuickMessage from "../../models/QuickMessage";

interface Request {
  searchParam?: string;
  pageNumber?: string;
  companyId: number | string;
  userId?: number | string;
}

interface Response {
  records: QuickMessage[];
  count: number;
  hasMore: boolean;
}

const ListService = async ({
  searchParam = "",
  pageNumber = "1",
  companyId,
  userId
}: Request): Promise<Response> => {
  const sanitizedSearchParam = searchParam.toLocaleLowerCase().trim();

  let whereCondition: Filterable["where"] = {
    // [Op.or]: [
    //   {
    shortcode: Sequelize.where(
      Sequelize.fn("LOWER", Sequelize.col("shortcode")),
      "LIKE",
      `%${sanitizedSearchParam}%`
    )
    //   },
    //   {
    //     message: Sequelize.where(
    //       Sequelize.fn("LOWER", Sequelize.col("message")),
    //       "LIKE",
    //       `%${sanitizedSearchParam}%`
    //     )
    //   }
    // ]
  };
  whereCondition = {
  ...whereCondition,
  companyId,
  userId: userId
  }
  const limit = 20;
  const offset = limit * (+pageNumber - 1);

  const { count, rows: records } = await QuickMessage.findAndCountAll({
    where: whereCondition,
    limit,
    offset,
    order: [["shortcode", "ASC"]]
  });

  const hasMore = count > offset + records.length;

  return {
    records,
    count,
    hasMore
  };
};

export default ListService;