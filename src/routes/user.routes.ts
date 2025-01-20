import express from 'express';
import {
  addAddressInformation,
  addBasicInformation,
  addPassword,
  getDetails,
  getPostCodeDetails,
  getPostCodeId,
  getVerificationEmail,
  redeemReferralCode,
  registerUser,
  verifyUserEmail,
  verifyUserPhoneNumber,
} from '../controllers/user.controller';
import { authenticateUser } from '../middlewares/authenticationMiddleware';

const router = express.Router();

router.post('/register', registerUser);
router.post('/register/verify', verifyUserPhoneNumber);
router.put('/basic-information', authenticateUser, addBasicInformation);
router.put('/address-information', authenticateUser, addAddressInformation);
router.put('/password', authenticateUser, addPassword);
router.post('/referral', authenticateUser, redeemReferralCode);
router.get('/postcode/:postalCode', authenticateUser, getPostCodeId);
router.get(
  '/details/postcode/:postalCodeId',
  authenticateUser,
  getPostCodeDetails,
);
router.get(
  '/email/verification/generate',
  authenticateUser,
  getVerificationEmail,
);

router.get('/email/verify/:token', verifyUserEmail);
router.get('/me', authenticateUser, getDetails);

export default router;
