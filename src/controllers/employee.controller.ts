import { Request, Response, NextFunction } from 'express';
import EmployeeService from '../service/employee.service';
import { validateEmployeeLogin } from '../validators/employee.validator';

const employeeService = new EmployeeService();

export const loginEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const body = await validateEmployeeLogin.validateAsync(req.body);
    const employee = await employeeService.loginEmployee(body.passcode);
    res.status(200).json(employee);
  } catch (error) {
    next(error);
  }
};

export const updateEmployeePasscode = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const body = await validateEmployeeLogin.validateAsync(req.body);
    await employeeService.updateEmployeePasscode(
      req.user?.employeeId!,
      body.passcode,
    );
    res.status(200).json({ message: 'Passcode updated successfully' });
  } catch (error) {
    next(error);
  }
};
