import { ParamSchema } from 'express-validator';
import { IUser } from '../../../../modules/users/model';
import UserService from '../../../../modules/users/service';
import RouterRequest from '../../../../libraries/RouterRequest';
import RouterResponse from '../../../..//libraries/RouterResponse';

export default class UserValidator {
    public static addUser() {
        const schema: Record<string, ParamSchema> = {
            'name.first': {
                in: 'body',
                notEmpty: true,
                isString :true
            },
            'name.last': {
                in: 'body',
                notEmpty: true,
                isString :true
            },
            'contact.email': {
                in: 'body',
                notEmpty: true,
                isString :true,
                isEmail: true,
                custom: {
                    errorMessage: 'E-mail already in use',
                    options: async (email:String) => {
                        const listUsers = await UserService.filterUser({ 'contact.email': email });

                        if(listUsers.length) {
                            return Promise.reject();
                        } else {
                            return Promise.resolve();
                        }
                    }
                }
            },
            'contact.phone_number': {
                in: 'body',
                notEmpty: true,
                isString :true
            },
            'contact.password': {
                in: 'body',
                isString: true,
                notEmpty: true,
                isLength: {
                    options: { min: 8 },
                }
            },
            'access.isAdmin': {
                in: 'body',
                isBoolean: true,
                notEmpty: true
            }
        }

        return RouterRequest.checkSchema(schema);
    }

    public static deleteUser() {
        const schema: Record<string, ParamSchema> = {
            id: {
                in: 'params',
                notEmpty: true,
                isString :true
            }
        }

        return RouterRequest.checkSchema(schema);
    }
}