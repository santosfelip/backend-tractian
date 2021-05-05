import { ParamSchema } from 'express-validator';
import RouterRequest from '../../../../libraries/RouterRequest';

export default class AuthValidator {

    public static getAccessToken() {
        const schema: Record<string, ParamSchema> = {
            email: {
                in: 'body',
                isEmail: true,
                isEmpty: {
                    negated: true
                }
            },
            password: {
                in: 'body',
                isString: true,
                isEmpty: {
                    negated: true
                },
                isLength: {
                    options: { min: 8 },
                }
            }
        }

        return RouterRequest.checkSchema(schema, false);
    }


}