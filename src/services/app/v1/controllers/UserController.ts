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

    public async getUser(req: express.Request, res: express.Response) {
        const id = req.params.id;

        try {
            const Response: any = await UserService.filterUser({ _id: id});
            
            if(Response.length) {
                RouterResponse.success(Response[0], res);
            } else {
                RouterResponse.notFound(res,'User not found');
            }
        } catch(error) {
            RouterResponse.error(error, res);
        }
    }

    public async updateUser(req: express.Request, res: express.Response) {
        try {
            const DATA = req.body.data;

            const [userSaved]: any = await UserService.filterUser({_id: req.params.id});
    
            const newData:IUser = {
               name: DATA.name? {
                   first: DATA.name.first? DATA.name.first : userSaved.name.first,
                   last: DATA.name.last? DATA.name.last : userSaved.name.last
               } : userSaved.name,
               contact: DATA.contact? {
                    email: DATA.contact.email? DATA.contact.email : userSaved.contact.email,
                    phone_number: DATA.contact.phone_number? DATA.contact.phone_number : userSaved.contact.phone_number,
                    password: DATA.contact.password ? DATA.contact.password : userSaved.contact.password
               }: userSaved.contact,
               access: DATA.access? DATA.access : userSaved.access
            }

            const Response: any = await UserService.updateUser(req.params.id, newData);

            if(Response.ok === 1) {
                RouterResponse.success('User successfully changed', res);
            } else {
                RouterResponse.error('Invalid attributes',res);
            }
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