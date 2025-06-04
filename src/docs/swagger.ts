import { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import {swaggerSpec} from '../configs/swaggerconfig';
import { paths } from './swaggerDocs';

(swaggerSpec as { paths: any }).paths = paths;

const useSwagger = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export default useSwagger;
