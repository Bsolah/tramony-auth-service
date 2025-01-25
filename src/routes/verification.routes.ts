import express from 'express';
import multer from 'multer';

import {
  startVerification,
  submitDocument,
  webhookVerification,
} from '../controllers/verification.controller';
import { authenticateUser } from '../middlewares/authenticationMiddleware';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/token', authenticateUser, startVerification);
router.post(
  '/submit-document',
  authenticateUser,
  upload.fields([
    { name: 'idFile', maxCount: 1 },
    { name: 'selfieFile', maxCount: 1 },
  ]),
  submitDocument,
);
router.post('/webhook', webhookVerification);

export default router;
