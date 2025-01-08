import express from 'express';
import {
  getBusinessDetails,
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

export default router;
