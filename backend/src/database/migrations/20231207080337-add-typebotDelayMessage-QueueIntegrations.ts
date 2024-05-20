import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.addColumn("QueueIntegrations", "typebotDelayMessage", {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1000
    })
  },

  down: (queryInterface: QueryInterface) => {
    return queryInterface.removeColumn("QueueIntegrations", "typebotDelayMessage")
  }
};