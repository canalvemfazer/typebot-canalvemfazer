import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.addColumn("QueueIntegrations", "typebotKeywordRestart", {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: ""
    }),
    queryInterface.addColumn("QueueIntegrations", "typebotRestartMessage", {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: ""
    })
  },

  down: (queryInterface: QueryInterface) => {
    return queryInterface.removeColumn("QueueIntegrations", "typebotKeywordRestart"),
    queryInterface.removeColumn("QueueIntegrations", "typebotRestartMessage")
  }
};