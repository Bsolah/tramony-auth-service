import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
  CreationOptional,
} from 'sequelize';
import sequelize from '.';
import Business from './business.model';

class Employee extends Model<
  InferAttributes<Employee>,
  InferCreationAttributes<Employee>
> {
  declare id: CreationOptional<string>;
  declare email: string;
  declare passcode: string;
  declare businessId: string;
  declare createdAt: CreationOptional<Date> | null;
  declare updatedAt: CreationOptional<Date> | null;

  toJSON() {
    const { passcode, ...values } = this.get() as { passcode?: string };
    return values;
  }
}

Employee.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    passcode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    businessId: {
      type: DataTypes.INTEGER,
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
    modelName: 'employee',
    tableName: 'employees',
  },
);

export default Employee;
