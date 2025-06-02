import 'reflect-metadata';
import express from 'express';
import router from './routes/index.router';
import * as dotenv from 'dotenv';
import { AppDataSource } from './configs/config';
import { swaggerSpec } from './configs/swaggerconfig';
import swaggerUi from 'swagger-ui-express';
dotenv.config();

const app = express();

const port = process.env.PORT || 3000

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('', router)

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