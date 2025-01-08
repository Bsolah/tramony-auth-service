import { BadRequest } from '../errors';
import EmployeeRepository from '../repository/employee.repository';
import { generateEmployeeToken } from '../utils/generateToken';

class EmployeeService {
  private employeeRepository: EmployeeRepository;

  constructor() {
    this.employeeRepository = new EmployeeRepository();
  }

  async loginEmployee(passcode: string) {
    try {
      const employee =
        await this.employeeRepository.findEmployeeByPassCode(passcode);
      if (employee) {
        const token = generateEmployeeToken(
          employee?.businessId,
          employee?.email,
          employee?.id,
        );
        return { token, employee };
      } else {
        throw new BadRequest('Invalid passcode');
      }
    } catch (error) {
      throw new BadRequest('Invalid passcode');
    }
  }

  async updateEmployeePasscode(id: string, passcode: string) {
    try {
      const employee =
        await this.employeeRepository.findEmployeeByPassCode(passcode);
      if (employee) {
        throw new BadRequest('Passcode already exists');
      }
      await this.employeeRepository.updateEmployeePasscode(id, passcode);
    } catch (error) {
      throw new BadRequest('Invalid passcode');
    }
  }
}

export default EmployeeService;
