import 'reflect-metadata';
import express from 'express';
import router from './routes/index.router';
import * as dotenv from 'dotenv';
import { AppDataSource } from './configs/config';
import { swaggerSpec } from './configs/swaggerconfig';
import swaggerUi from 'swagger-ui-express';
import errorHandler from './middlewares/error.middleware';
import cors from 'cors';
import morgan from 'morgan';

dotenv.config();

const app = express();

const port = process.env.PORT || 3000

app.use(express.json());

app.use(morgan('dev'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(cors());

app.use('', router)

app.use(errorHandler);

AppDataSource.initialize()
  .then(() => {
    console.log('Kết nối database thành công');

    app.listen(port, () => {
      console.log(`Server đang khởi chạy trên port: ${port}`);
    });
  })
  .catch((error) => {
    console.error('Lỗi kết nối database:', error);
  });