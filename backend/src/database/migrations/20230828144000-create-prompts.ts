import { QueryInterface, DataTypes } from "sequelize";

interface ExistingTables {
  [key: string]: any;
}

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    const table = "Prompts";

    const existingTables: ExistingTables = await queryInterface.showAllTables();

    if (!existingTables.includes(table)) {
      return queryInterface.createTable(table, {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false
        },
        name: {
          type: DataTypes.TEXT,
          allowNull: false
        },
        apiKey: {
          type: DataTypes.TEXT,
          allowNull: false
        },
        prompt: {
          type: DataTypes.TEXT,
          allowNull: false
        },
        maxTokens: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 100
        },
        maxMessages: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 10
        },
        temperature: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 1
        },
        promptTokens: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0
        },
        completionTokens: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0
        },
        totalTokens: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0
        },
        voice: {
          type: DataTypes.TEXT,
          allowNull: true
        },
        voiceKey: {
          type: DataTypes.TEXT,
          allowNull: true
        },
        voiceRegion: {
          type: DataTypes.TEXT,
          allowNull: true
        },
        queueId: {
          type: DataTypes.INTEGER,
          references: { model: "Queues", key: "id" },
          onUpdate: "NO ACTION",
          onDelete: "NO ACTION",
          allowNull: false
        },
        companyId: {
          type: DataTypes.INTEGER,
          references: { model: "Companies", key: "id" },
          onUpdate: "NO ACTION",
          onDelete: "NO ACTION",
          allowNull: false
        },
        createdAt: {
          type: DataTypes.DATE(6),
          allowNull: false
        },
        updatedAt: {
          type: DataTypes.DATE(6),
          allowNull: false
        }
      });
    }
  },
  down: (queryInterface: QueryInterface) => {
    return queryInterface.dropTable("Prompts");
  }
};
