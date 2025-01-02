import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import config from './config';
import sequelizeInstance from './models';
import { errorMiddleware } from './middlewares/errorMiddleware';

const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());

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
