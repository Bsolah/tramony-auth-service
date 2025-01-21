import VerificationService from '../service/verification.service';
import { Request, Response, NextFunction } from 'express';
import { submitVerificationValidator } from '../validators/verification.validator';
import { BadRequest } from '../errors';

const verificationService = new VerificationService();

export const startVerification = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const response = await verificationService.createSumSubApplication(
      req.user.id,
    );
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const submitDocument = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await submitVerificationValidator.validateAsync(req.body);
    if (!req.file.idFile || !req.file.selfieFile) {
      throw new BadRequest('Please upload both document and selfie');
    }
    const response = await verificationService.submitIdDocument(
      req.user.id,
      req.file.idFile[0],
      req.file.selfieFile[0],
      req.body.documentType,
    );
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const webhookVerification = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await verificationService.webhookVerification(req.body);
    res.status(200).json({});
  } catch (error) {
    next(error);
  }
};
