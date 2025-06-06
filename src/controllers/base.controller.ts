import { Response, Request } from 'express';

abstract class BaseController {
   protected nameController: string;

   constructor(nameController: string) {
       this.nameController = nameController;
   }

    protected responseSuccess<T>(res: Response<T>, result: T): void {
        const response: any = {
            ...result,
        };
        
        const code = response?.code;
        
        res.status(code).json(response);
    } 
    
    protected async handleRequest<T>(
        res: Response<T>,
        req : Request,
        serviceMethod: (req: Request) => Promise<T>
    ): Promise<void> {
            const result = await serviceMethod(req);
            this.responseSuccess(res, result);
    }
}

export default BaseController;