import { Request,Response,NextFunction } from 'express';

export default (error:any, req:Request, res:Response, next:NextFunction) =>{
    console.log(error);
       
    if (error.name === 'CustomError' && error.message === 'EmptyResponse') {
            return res.status(404).send('Not Found');
        }
    return res.status(500).send('Unknown Error');
}