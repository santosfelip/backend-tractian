import express from 'express';
import RouterResponse from '../../../../libraries/RouterResponse';

import CompanyService from '../../../../modules/companies/service';

export default class CompanyController {
   
    public async add(req: express.Request, res: express.Response) {
        
        try {
            const DataResponse = await CompanyService.createCompany(req.body);

            RouterResponse.success(DataResponse, res);
        } catch(error) {
            RouterResponse.error(error, res);
        }
    }

    public async get(req: express.Request, res: express.Response) {
        const id = req.params.id;

        try {
            const Response: any = await CompanyService.filterCompany({ _id: id});
            
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

            const Response: any = await CompanyService.updateCompany(req.params.id, req.body.data);

            if(Response.ok === 1) {
                RouterResponse.success('Company successfully changed', res);
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
            const Response = await CompanyService.deleteCompany(id);
            
            if(Response.deletedCount > 0) {
                RouterResponse.success('Company successfully deleted', res);
            } else {
                RouterResponse.notFound(res,'Company not found');
            }
        } catch(error) {
            RouterResponse.error(error, res);
        }
    }
}