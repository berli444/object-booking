import { Sequelize } from 'sequelize-typescript';
import { databaseConfig } from "../config";

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize(databaseConfig);
      sequelize.addModels([]);
      await sequelize.sync();
      return sequelize;
    },
  },
];