import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
  CreationOptional,
} from 'sequelize';
import sequelize from '.';
import User from './user';

class Balance extends Model<
  InferAttributes<Balance>,
  InferCreationAttributes<Balance>
> {
  declare id: CreationOptional<string>;
  declare userId: string;
  declare gbp: number;
  declare usd: number;
  declare ngn: number;

  declare createdAt: CreationOptional<Date> | null;
  declare updatedAt: CreationOptional<Date> | null;
}

Balance.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    gbp: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    usd: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    ngn: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'balances',
    modelName: 'balance',
  },
);

// Balance.belongsTo(User, {
//   foreignKey: 'userId',
//   targetKey: 'id',
// });

export default Balance;
