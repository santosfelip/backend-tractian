import express from 'express';
import RouterResponse from './RouterResponse';
import { checkSchema, ParamSchema, Result, ValidationError, validationResult } from "express-validator";
import isAuthenticated from '../middlewares/isAuthenticated';


export default class RouterRequest {
    
    public static checkSchema(schema: Record<string, ParamSchema>, privateRouter: boolean = true) {
        
        const listValidators: Array<any> = [
            checkSchema(schema),
            RouterRequest.validate
        ];

        if(privateRouter) {
            listValidators.unshift(isAuthenticated);
        }

        return listValidators;
    }

    public static validate(req: express.Request, res: express.Response, next: express.NextFunction) {
        const errors: Result<ValidationError> = validationResult(req);
        if (!errors.isEmpty()) {
            RouterResponse.error(errors.array(), res);
        }
        else {
            next();
        }
    }
}
    