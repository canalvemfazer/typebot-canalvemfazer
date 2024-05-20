import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.addColumn("Queues", "promptId", {
      type: DataTypes.INTEGER,
      references: { model: "Prompts", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "SET NULL"
    })
  },

  down: (queryInterface: QueryInterface) => {
    return queryInterface.removeColumn("Queues", "promptId");
  }
};