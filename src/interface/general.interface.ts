export interface IValidateOtp {
  email: string;
  otp: string;
}

export interface IEmail {
  email: string;
}

export interface IPhone {
  phoneNumber: string;
}

export interface IValidatePhoneOtp {
  phoneNumber: string;
  otp: string;
}

export interface UserTokenPayload {
    id: string;
    email: string;
    twoFA?: boolean;
}