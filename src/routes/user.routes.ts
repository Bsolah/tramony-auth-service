import express from 'express';
import {
  addAddressInformation,
  addBasicInformation,
  addPassword,
  getPostCodeDetails,
  getPostCodeId,
  redeemReferralCode,
  registerUser,
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

export default router;
