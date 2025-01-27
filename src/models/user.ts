import sequelize from '.';
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
  CreationOptional,
} from 'sequelize';
import { UNVERIFIED } from '../utils/constants';
import Balance from './balance.model';

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<Number>;
  declare email?: string;
  declare phoneNumber: string;
  declare verified?: boolean;
  declare firstName?: string;
  declare lastName?: string;
  declare dateOfBirth?: string;
  declare isEmailVerified?: boolean;
  declare addressLine1?: string;
  declare addressLine2?: string;
  declare city?: string;
  declare postalCode?: string;
  declare sumSubId?: string;
  declare referralCode: string;
  hasRedeemedReferral?: boolean;
  declare password?: string;
  declare verificationStatus?: string;
  declare updatedAt: CreationOptional<Date>;
  declare createdAt: CreationOptional<Date>;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    isEmailVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dateOfBirth: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    addressLine1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    addressLine2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    postalCode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    referralCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    sumSubId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    verificationStatus: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: UNVERIFIED,
    },
    hasRedeemedReferral: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'user',
    tableName: 'users',
  },
);

User.hasOne(Balance, {
  foreignKey: 'userId',
});
export default User;