import express from 'express';
import {
  createEmployee,
  getAllEmployees,
  getBusinessDetails,
  getBusinessInformationFromCacNumber,
  getBvnInformation,
  loginBusiness,
  register2FA,
  registerBusiness,
  requestResetPassword,
  resendMailOtp,
  resetPassword,
  updateBankAccountDetails,
  updateBusinessDetails,
  updateBusinessOwnerDetails,
  verify2FA,
  verify2FAForLogin,
  verifyBusinessEmail,
  verifyBvnOtp,
  verifyResetPasswordOtp,
} from '../controllers/business.controller';
import {
  authenticateUser,
  authenticateUserWithout2FACheck,
} from '../middlewares/authenticationMiddleware';

const router = express.Router();

router.post('/register', registerBusiness);
router.post('/verify/email', verifyBusinessEmail);
router.post('/register/resend/otp', resendMailOtp);
router.post('/register/2fa', authenticateUserWithout2FACheck, register2FA);
router.post('/verify/2fa', authenticateUserWithout2FACheck, verify2FA);
router.post('/login', loginBusiness);
router.post(
  '/login/verify/2fa',
  authenticateUserWithout2FACheck,
  verify2FAForLogin,
);
router.get('/me', authenticateUser, getBusinessDetails);
router.put('/update/business', authenticateUser, updateBusinessDetails);
router.put('/update/owner', authenticateUser, updateBusinessOwnerDetails);
router.put('/update/bank', authenticateUser, updateBankAccountDetails);
router.post('/reset/password', requestResetPassword);
router.post('/reset/password/verify', verifyResetPasswordOtp);
router.post('/reset/password/update', authenticateUser, resetPassword);
router.post('/employee', authenticateUser, createEmployee);
router.get('/employee', authenticateUser, getAllEmployees);
router.get(
  '/cac',
  authenticateUserWithout2FACheck,
  getBusinessInformationFromCacNumber,
);
router.get('/bvn', authenticateUserWithout2FACheck, getBvnInformation);
router.post('/bvn/confirm', authenticateUserWithout2FACheck, verifyBvnOtp);

export default router;
