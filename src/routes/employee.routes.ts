import express from 'express';
import {
  loginEmployee,
  updateEmployeePasscode,
} from '../controllers/employee.controller';
import { authenticateEmployee } from '../middlewares/authenticationMiddleware';

const router = express.Router();

router.post('/login', loginEmployee);
router.put('/update-passcode', authenticateEmployee, updateEmployeePasscode);

export default router;
