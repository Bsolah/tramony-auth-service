interface Iconfig {
  port: number;
  dbHost: string;
  dbUser: string;
  dbPassword: string;
  dbName: string;
  addressIoKey: string;
  addressIoBaseUrl: string;
  jwtSecret: string;
}

export default Iconfig;