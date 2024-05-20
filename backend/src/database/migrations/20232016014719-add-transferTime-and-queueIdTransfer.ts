import { QueryInterface, DataTypes } from "sequelize";
//
module.exports = {

  up: (queryInterface: QueryInterface) => {
    return Promise.all([

      queryInterface.addColumn("Whatsapps", "transferQueueId", {
        type: DataTypes.INTEGER,
        allowNull: true,
      }),

      queryInterface.addColumn("Whatsapps", "timeToTransfer", {
        type: DataTypes.INTEGER,
        allowNull: true,
      })
    ]);
  },

  down: (queryInterface: QueryInterface) => {
    return Promise.all([
      queryInterface.removeColumn("Whatsapps", "timeToTransfer"),
      queryInterface.removeColumn("Whatsapps", "transferQueueId")
    ]);
  }

};
