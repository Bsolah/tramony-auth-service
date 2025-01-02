import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
  CreationOptional,
  Association,
  NonAttribute,
  HasManyGetAssociationsMixin,
} from 'sequelize';
import sequelize from '.';

class Business extends Model<
  InferAttributes<Business>,
  InferCreationAttributes<Business>
> {
  declare id: CreationOptional<string>;
  declare email: string;
  declare businessName?: string;
  declare isEmailVerified?: boolean;
  declare type?: string;
  declare category?: string;
  declare subCategory?: string;
  declare businessAddress?: string;
  declare homeAddress?: string;
  declare dateOfBirth?: Date;
  declare phoneNumber?: string;
  declare bankName?: string;
  declare accountNumber?: string;
  declare accountName?: string;
  declare revenue?: string;
  declare password?: string;
  declare createdAt: CreationOptional<Date> | null;
  declare updatedAt: CreationOptional<Date> | null;

  toJSON() {
    const { password, ...values } = this.get() as { password?: string };
    return values;
  }
}

Business.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    businessName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    isEmailVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    subCategory: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    businessAddress: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    homeAddress: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dateOfBirth: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bankName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    accountNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    accountName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    revenue: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
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
    modelName: 'business',
    tableName: 'businesses',
  },
);

export default Business;
