import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import config from './config';
import sequelizeInstance from './models';
import { errorMiddleware } from './middlewares/errorMiddleware';
import businessRouter from './routes/business.routes';
import employeeRouter from './routes/employee.routes';
import yamljs from 'yamljs';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
declare module 'express-serve-static-core' {
  interface Request {
    user: {
      id: string;
      email: string;
      employeeId?: string;
    };
  }
}


const app = express();

const docs = yamljs.load(path.join(__dirname, '../src/swaggerDocs.yaml'));

app.use(cors());
app.use(express.json());
app.use(helmet());

app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(docs));
app.use('/api/v1/business', businessRouter);
app.use('/api/v1/employee', employeeRouter);

app.use('*', (_: Request, res: Response, __: NextFunction) => {
  res.status(404).json({ message: 'Not Found' });
});
app.use(errorMiddleware);

sequelizeInstance
  .authenticate()
  .then(() => {
    console.log('Database connected 🔥 🔥 🔥');
    app.listen(config().port, () => {
      console.log(
        `⚡️⚡️⚡️ Server is running on port ${config().port} ⚡️⚡️⚡️`,
      );
    });
  })
  .catch((err: Error) => {
    console.log(err);
  });
