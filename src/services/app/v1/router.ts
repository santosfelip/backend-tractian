//import isAuthenticated from '../../../middlewares/isAuthenticated';

//Validators
import UserValidator from './validators/UserValidator';
import CompanyValidator from './validators/CompanyValidator';
import CompanyUnitsValidator from './validators/CompanyUnitsValidator';
import MachineUnitsValidator from './validators/MachineUnitsValidator';

export const routes = {

    //rotas de usuario
    'POST /user/register': {
        path: 'UserController.add',
        middlewares: UserValidator.addUser()
    },
    'DELETE /user/:id': {
        path: 'UserController.delete',
        middlewares: UserValidator.getUser()
    },
    'GET /user/:id': {
        path: 'UserController.getUser',
        middlewares: UserValidator.getUser()
    },
    'PUT /user/:id': {
        path: 'UserController.updateUser',
        middlewares: UserValidator.updateUser()
    },

    //rotas para empresa
    'POST /company': {
        path: 'CompanyController.add',
        middlewares: CompanyValidator.addCompany()
    },
    'DELETE /company/:id': {
        path: 'CompanyController.delete',
        middlewares: CompanyValidator.getCompany()
    },
    'GET /company/:id': {
        path: 'CompanyController.get',
        middlewares: CompanyValidator.getCompany()
    },
    'PUT /company/:id': {
        path: 'CompanyController.update',
        middlewares: CompanyValidator.updateCompany()
    },

    //rotas para unidades de empresa
    'POST /company/units': {
        path: 'CompanyUnitsController.add',
        middlewares: CompanyUnitsValidator.addCompanyUnit()
    },
    'DELETE /company/units/:id': {
        path: 'CompanyUnitsController.delete',
        middlewares: CompanyUnitsValidator.getCompanyUnit()
    },
    'GET /company/units/:id': {
        path: 'CompanyUnitsController.get',
        middlewares: CompanyUnitsValidator.getCompanyUnit()
    },
    'PUT /company/units/:id': {
        path: 'CompanyUnitsController.update',
        middlewares: CompanyUnitsValidator.updateCompanyUnit()
    },

    //rotas para maquinas das unidades
    'POST /company/units/machine': {
        path: 'MachineUnitsController.add',
        middlewares: MachineUnitsValidator.addMachineUnit()
    },
    'DELETE /company/units/machine/:id': {
        path: 'MachineUnitsController.delete',
        middlewares: MachineUnitsValidator.getMachineUnit()
    },
    'GET /company/units/machine/:id': {
        path: 'MachineUnitsController.get',
        middlewares: MachineUnitsValidator.getMachineUnit()
    },
    'PUT /company/units/machine/:id': {
        path: 'MachineUnitsController.update',
        middlewares: MachineUnitsValidator.updateMachineUnit()
    },

    // //rota de Autenticação
    // 'POST /auth': {
    //     path: 'AuthController.getAccessToken',
    //     middlewares: [AuthValidator.getAccessToken()]
    // }
}