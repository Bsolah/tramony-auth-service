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
}

export default Iconfig;