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

export { IBusiness, IRegisterBusiness };