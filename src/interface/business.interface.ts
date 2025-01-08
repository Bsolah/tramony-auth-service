interface IBusiness {
  id: string;
  email: string;
  businessName: string;
  isEmailVerified: boolean;
  type: string;
  category: string;
  subCategory: string;
  businessAddress: string;
  homeAddress: string;
  dateOfBirth: Date;
  phoneNumber: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
  revenue: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

interface IRegisterBusiness {
  email: string;
  password: string;
}

interface IRegisterBusinessDetails {
  businessName: string;
  businessAddress: string;
  category: string;
  subCategory: string;
  type: string;
  revenue: string;
}

interface IRegisterBusinessOwnerDetails {
  dateOfBirth: string;
  personalPhoneNumber: string;
  homeAddress: string;
  firstName: string;
  lastName: string;
}

interface IRegisterBankAccount {
  bankName: string;
  accountNumber: string;
}

export {
  IBusiness,
  IRegisterBusiness,
  IRegisterBusinessDetails,
  IRegisterBusinessOwnerDetails,
  IRegisterBankAccount
};