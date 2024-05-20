import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.addColumn("Campaigns", "fileListId", {
      type: DataTypes.INTEGER,
      references: { model: "Files", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "SET NULL"
    })
  },

  down: (queryInterface: QueryInterface) => {
    return queryInterface.removeColumn("Campaigns", "fileListId")
  }
};