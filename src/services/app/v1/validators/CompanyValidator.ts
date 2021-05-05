import { ParamSchema } from 'express-validator';
import CompanyService from '../../../../modules/companies/service';
import RouterRequest from '../../../../libraries/RouterRequest';

export default class CompanyValidator {
    public static addCompany() {
        const schema: Record<string, ParamSchema> = {
            name: {
                in: 'body',
                notEmpty: true,
                isString :true
            },
            cnpj: {
                in: 'body',
                notEmpty: true,
                isString :true,
                custom: {
                    errorMessage: 'CNPJ already in use',
                    options: async (cnpj:String) => {
                        const listCompanies = await CompanyService.filterCompany({ cnpj : cnpj });

                        if(listCompanies.length) {
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

    public static getCompany() {
        const schema: Record<string, ParamSchema> = {
            id: {
                in: 'params',
                notEmpty: true,
                isString :true
            }
        }

        return RouterRequest.checkSchema(schema);
    }

    public static updateCompany() {

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