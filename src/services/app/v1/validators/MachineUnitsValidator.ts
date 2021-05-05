import { ParamSchema } from 'express-validator';
import RouterRequest from '../../../../libraries/RouterRequest';

import { MachineUnitStatus } from '../../../../modules/machinesUnits/model';

export default class MachineUnitsValidator {
    public static addMachineUnit() {
        const schema: Record<string, ParamSchema> = {
            name: {
                in: 'body',
                notEmpty: true,
                isString :true
            },
            status: {
                in: 'body',
                isString: true,
                custom: {
                    options: async (value) => {
                        if(!Object.values(MachineUnitStatus).includes(value)) {
                            return Promise.reject();
                        } else {
                            return Promise.resolve();
                        }
                    }
                }
            },
            health_level: {
                notEmpty: true,
                isNumeric: true,
                custom: {
                    options: async (value) => {
                        if(value >= 0 && value <= 100) {
                            return Promise.resolve();
                        } else {
                            return Promise.reject();
                        }
                    }
                }
            }
        }

        return RouterRequest.checkSchema(schema);
    }

    public static getMachineUnit() {
        const schema: Record<string, ParamSchema> = {
            id: {
                in: 'params',
                notEmpty: true,
                isString :true
            }
        }

        return RouterRequest.checkSchema(schema);
    }

    public static updateMachineUnit() {

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