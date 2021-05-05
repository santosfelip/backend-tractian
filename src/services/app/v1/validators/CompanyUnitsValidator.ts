import { ParamSchema } from 'express-validator';
import RouterRequest from '../../../../libraries/RouterRequest';

export default class CompanyUnitsValidator {
    public static addCompanyUnit() {
        const schema: Record<string, ParamSchema> = {
            name: {
                in: 'body',
                notEmpty: true,
                isString :true
            },
            id_company: {
                in: 'body',
                notEmpty: true,
                isString :true
            }
        }

        return RouterRequest.checkSchema(schema);
    }

    public static getCompanyUnit() {
        const schema: Record<string, ParamSchema> = {
            id: {
                in: 'params',
                notEmpty: true,
                isString :true
            }
        }

        return RouterRequest.checkSchema(schema);
    }

    public static updateCompanyUnit() {

        const schema: Record<string, ParamSchema> = {
            id: {
                in: 'params',
                notEmpty: true,
                isString :true
            },
            data: {
                in: 'body',
                notEmpty: true,
                isObject: true,
                custom: {
                    options: async (data) => {
                        const dataInJSON = JSON.stringify(data);
                        // verifica se uma propriedade esta vazia
                        if(dataInJSON.includes('""') || dataInJSON.includes('{}')) {
                            return Promise.reject();
                        } else {
                            return Promise.resolve();
                        }
                    }
                }
            }
        }

        return RouterRequest.checkSchema(schema);
    }
}