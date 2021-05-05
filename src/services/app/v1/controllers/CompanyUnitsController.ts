import express from 'express';
import RouterResponse from '../../../../libraries/RouterResponse';

import CompanyUnitService  from '../../../../modules/companiesUnits/service';

export default class CompanyUnitsController {
   
    public async add(req: express.Request, res: express.Response) {
        
        try {
            const DataResponse = await CompanyUnitService.createCompanyUnit(req.body);

            RouterResponse.success(DataResponse, res);
        } catch(error) {
            RouterResponse.error(error, res);
        }
    }

    public async get(req: express.Request, res: express.Response) {
        const id = req.params.id;

        try {
            const Response: any = await CompanyUnitService.filterCompanyUnit({ _id: id});
            
            if(Response.length) {
                RouterResponse.success(Response[0], res);
            } else {
                RouterResponse.notFound(res,'Company not found');
            }
        } catch(error) {
            RouterResponse.error(error, res);
        }
    }

    public async update(req: express.Request, res: express.Response) {
        try {

            const Response: any = await CompanyUnitService.updateCompanyUnit(req.params.id, req.body.data);

            if(Response.ok === 1) {
                RouterResponse.success('Unit successfully changed', res);
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
            const Response = await CompanyUnitService.deleteCompanyUnit(id);
            
            if(Response.deletedCount > 0) {
                RouterResponse.success('Unit successfully deleted', res);
            } else {
                RouterResponse.notFound(res,'Unit not found');
            }
        } catch(error) {
            RouterResponse.error(error, res);
        }
    }
}