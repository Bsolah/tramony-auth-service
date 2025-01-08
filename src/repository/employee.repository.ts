import Employee from '../models/employee.model';
import { Op } from 'sequelize';

class EmployeeRepository {
  async createEmployee(employee: any) {
    return await Employee.create({ ...employee });
  }

  async getEmployeeById(id: string) {
    return await Employee.findByPk(id);
  }

  async findEmployeeByEmail(email: string) {
    return await Employee.findOne({ where: { email } });
  }

  async findEmployeeByEmailAndBusinessId(email: string, businessId: string) {
    return await Employee.findOne({ where: { email, businessId } });
  }

  async findEmployeeByBusinessId(businessId: string) {
    return await Employee.findAll({ where: { businessId } });
  }

  async findEmployeeByPassCode(passcode: string) {
    return await Employee.findOne({ where: { passcode } });
  }

  async findEmployeesByPasscode(passcode: string) {
    return await Employee.findAll({
      where: {
        passcode,
      },
    });
  }

  async updateEmployeePasscode(id: string, passcode: string) {
    return await Employee.update({ passcode }, { where: { id } });
  }
}

export default EmployeeRepository;
