import * as bcrypt from 'bcrypt';
import express from 'express';
import RouterResponse from '../../../../libraries/RouterResponse';

//Módulos do usuario
import { IUser } from '../../../../modules/users/model';
import UserService from '../../../../modules/users/service';

import 'dotenv/config';

export default class UserController {

    //Cria um novo usuario na base de dados
    public async add(req: express.Request, res: express.Response) {
        
        try {
            const data:IUser  = req.body;
            // encripta a senha
            const salt = bcrypt.genSaltSync(10);
            const password = bcrypt.hashSync(data.contact.password, salt);

            // exclue a senha salva sem o hash
            delete data.contact.password;
            // monta o novo objeto a ser persistido
            const newUser: IUser = {
                name: data.name,
                contact: { ...data.contact, password: password },
                access: data.access
            };

            const DataResponse = await UserService.createUser(newUser);

            RouterResponse.success(DataResponse, res);
        } catch(error) {
            RouterResponse.error(error, res);
        }
    }


    public async delete(req: express.Request, res: express.Response) {
        const id = req.params.id;

        try {
            const Response = await UserService.deleteUser(id);
            
            if(Response.deletedCount > 0) {
                RouterResponse.success('User successfully deleted', res);
            } else {
                RouterResponse.notFound(res,'User not found');
            }
        } catch(error) {
            RouterResponse.error(error, res);
        }
    }
}