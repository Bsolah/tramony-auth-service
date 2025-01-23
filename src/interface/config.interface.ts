interface Iconfig {
  port: number;
  dbHost: string;
  dbUser: string;
  dbPassword: string;
  dbName: string;
  addressIoKey: string;
  addressIoBaseUrl: string;
  jwtSecret: string;
  baseUrl: string;
  sumsubApiKey: string;
  sumsubBaseUrl: string;
  sumsubSecretKey: string;
}

export default Iconfig;