import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.addColumn("FilesOptions", "mediaType", {
      type: DataTypes.STRING,
      defaultValue: "",
      allowNull: true
    });
  },

  down: (queryInterface: QueryInterface) => {
    return queryInterface.removeColumn("FilesOptions", "mediaType");
  }
};