import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
  CreationOptional,
} from 'sequelize';
import sequelize from '.';
import Employee from './employee.model';

class Business extends Model<
  InferAttributes<Business>,
  InferCreationAttributes<Business>
> {
  declare id: CreationOptional<string>;
  declare email: string;
  declare businessName?: string;
  declare isEmailVerified?: boolean;
  declare twoFactorAuth?: boolean;
  declare passcode?: string;
  declare type?: string;
  declare category?: string;
  declare subCategory?: string;
  declare businessAddress?: string;
  declare homeAddress?: string;
  declare dateOfBirth?: Date;
  declare phoneNumber?: string;
  declare personalPhoneNumber?: string;
  declare bankName?: string;
  declare accountNumber?: string;
  declare accountName?: string;
  declare firstName?: string;
  declare lastName?: string;
  declare revenue?: string;
  declare password?: string;
  declare passwordReset?: boolean;
  declare registrationNumber?: string;
  declare businessVerification?: boolean;
  declare bvn?: string;
  declare createdAt: CreationOptional<Date> | null;
  declare updatedAt: CreationOptional<Date> | null;

  toJSON() {
    const { password, passwordReset, ...values } = this.get() as {
      password?: string;
      passwordReset?: boolean;
    };
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
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    twoFactorAuth: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isEmailVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    passwordReset: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    passcode: {
      type: DataTypes.STRING,
      allowNull: true,
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
    registrationNumber: {
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
    personalPhoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastName: {
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
    businessVerification: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    bvn: {
      type: DataTypes.STRING,
      allowNull: true,
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

Business.hasMany(Employee, {
  foreignKey: 'businessId',
  as: 'employees',
});

export default Business;