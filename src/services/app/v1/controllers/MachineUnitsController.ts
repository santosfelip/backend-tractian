import express from 'express';
import RouterResponse from '../../../../libraries/RouterResponse';

import MachinesUnitService  from '../../../../modules/machinesUnits/service';

export default class MachineUnitsController {
   
    public async add(req: express.Request, res: express.Response) {
        
        try {
            const DataResponse = await MachinesUnitService.createMachineCompanyUnit(req.body);

            RouterResponse.success(DataResponse, res);
        } catch(error) {
            RouterResponse.error(error, res);
        }
    }

    public async get(req: express.Request, res: express.Response) {
        const id = req.params.id;

        try {
            const Response: any = await MachinesUnitService.filterMachineCompanyUnit({ _id: id});
            
            if(Response.length) {
                RouterResponse.success(Response[0], res);
            } else {
                RouterResponse.notFound(res,'Machine not found');
            }
        } catch(error) {
            RouterResponse.error(error, res);
        }
    }

    public async update(req: express.Request, res: express.Response) {
        try {

            const Response: any = await MachinesUnitService.updateMachineCompanyUnit(req.params.id, req.body.data);

            if(Response.ok === 1) {
                RouterResponse.success('Machine successfully changed', res);
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
            const Response = await MachinesUnitService.deleteMachineCompanyUnit(id);
            
            if(Response.deletedCount > 0) {
                RouterResponse.success('Machine successfully deleted', res);
            } else {
                RouterResponse.notFound(res,'Machine not found');
            }
        } catch(error) {
            RouterResponse.error(error, res);
        }
    }
}