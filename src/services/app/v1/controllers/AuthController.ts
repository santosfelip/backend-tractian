import { Request, Response } from 'express';
import RouterResponse from '../../../../libraries/RouterResponse';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

import UserService from '../../../../modules/users/service';

export default class AuthController {

    public async getAccessToken(req: Request, res: Response) {
        const { email, password } = req.body;

        try {
            // Busca no banco se já existe o email cadastrado
            const result: any = await UserService.filterUser({'contact.email':email});

            if(result.length === 0) {
                return RouterResponse.error('Credentials not found', res);
            }

            // Compare o hash com o password enviado
            const match = await bcrypt.compare(password, result[0].contact.password);

            if(!match) {
                return RouterResponse.error('Credentials not found', res);
            }

            const DataResponse = {
                id: result[0]._id,
                name: result[0].name,
                contact: {
                    email: result[0].contact.email,
                    phone_number: result[0].contact.phone_number
                },
                access: result[0].access
            }

            const accessToken = jwt.sign(DataResponse, process.env.ACCESS_TOKEN_SECRET, {
                subject: String(DataResponse.id),
                expiresIn: process.env.EXPIRE_TOKEN
            });
            
            RouterResponse.success({Token: accessToken}, res);
        } catch(err) {
            RouterResponse.error(err, res);
        }
    }


}