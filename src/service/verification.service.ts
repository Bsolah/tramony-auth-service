import { BadRequest } from '../errors';
import { sumsubInstance } from '../external/requests';
import UserRepository from '../repository/user.repository';
import { PENDING, VERIFIED } from '../utils/constants';
import sendMail from '../utils/mail';

class VerificationService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async createSumSubApplication(userId: string) {
    try {
      const user = await this.userRepository.getUserById(Number(userId));
      if (!user) {
        throw new BadRequest('User not found');
      }
      if (!user.sumSubId) {
        try {
          const response = await sumsubInstance.post('/resources/applicants', {
            externalUserId: userId,
            email: user.email,
            type: 'individual',
            fixedInfo: {
              firstName: user.firstName,
              lastName: user.lastName,
              dob: user.dateOfBirth,
              country: 'GBR',
            },
          });
          if (response?.status === 200) {
            return response.data;
          }
        } catch (error: any) {
          console.log(error);
          throw new BadRequest(
            error.response.data.message ||
              'Error occured while creating sumsub application',
          );
        }
      }
    } catch (error) {
      console.log(error);
      if (error instanceof BadRequest) {
        throw error;
      } else {
        throw new BadRequest('Error occured while creating sumsub application');
      }
    }
  }

  async submitIdDocument(
    userId: string,
    idFile: any,
    selfieFile: any,
    documentType: 'ID_CARD' | 'PASSPORT' | 'DRIVERS',
  ) {
    try {
      const user = await this.userRepository.getUserById(Number(userId));
      const idDocFormData = new FormData();
      const selfieFormData = new FormData();
      idDocFormData.append(
        'metadata',
        JSON.stringify({ idDocType: documentType, country: 'GBR' }),
      );
      idDocFormData.append('content', idFile);
      selfieFormData.append(
        'metadata',
        JSON.stringify({ idDocType: 'SELFIE', country: 'GBR' }),
      );
      selfieFormData.append('content', selfieFile);
      const idResponse = await sumsubInstance.post(
        `/resources/applicants/${user?.sumSubId}/info/idDoc`,
        idDocFormData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'X-Return-Doc-Warnings': 'true',
          },
        },
      );
      const selfieResponse = await sumsubInstance.post(
        `/resources/applicants/${user?.sumSubId}/info/idDoc`,
        selfieFormData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'X-Return-Doc-Warnings': 'true',
          },
        },
      );
      if (idResponse?.status === 200 && selfieResponse?.status === 200) {
        await this.startVerificationProcess(userId);
        await this.userRepository.updateVerificationStatus(
          Number(userId),
          PENDING,
        );
        return { idResponse, selfieResponse };
      } else {
        throw new BadRequest(
          'Error occured while submitting id document, please try again',
        );
      }
    } catch (error: any) {
      console.log(error);
      if (error instanceof BadRequest) {
        throw error;
      } else {
        throw new BadRequest(
          error.response.data.message ||
            'Error occured while submitting id document',
        );
      }
    }
  }
  async startVerificationProcess(userId: string) {
    try {
      const user = await this.userRepository.getUserById(Number(userId));
      const reponse = await sumsubInstance.post(
        `/resources/applicants/${user?.sumSubId}/status/pending`,
      );
      return reponse;
    } catch (error: any) {
      console.log(error);
      if (error instanceof BadRequest) {
        throw error;
      } else {
        throw new BadRequest(
          error.response.data.message ||
            'Error occured while starting verification process',
        );
      }
    }
  }

  async webhookVerification(body: any) {
    try {
      const user = await this.userRepository.getUserBySumSubId(
        body.applicantId,
      );
      if (!user) {
        throw new BadRequest('User not found');
      }
      if (body.reviewResult.reviewAnswer === 'RED') {
        await sendMail(
          user?.email!,
          'Verification Failed',
          verificationRejectEmail(user?.firstName!, user?.lastName!),
        );
      } else if (body.reviewResult.reviewAnswer === 'GREEN') {
        await sendMail(
          user?.email!,
          'Verification Passed',
          verificationAcceptedEmail(user?.firstName!, user?.lastName!),
        );
        await this.userRepository.updateVerificationStatus(
          Number(user.id),
          VERIFIED,
        );
      }
    } catch (error: any) {
      console.log(error);
      if (error instanceof BadRequest) {
        throw error;
      } else {
        throw new BadRequest(
          error.response.data.message ||
            'Error occured while starting verification process',
        );
      }
    }
  }
}

export default VerificationService;
