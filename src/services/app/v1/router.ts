//import isAuthenticated from '../../../middlewares/isAuthenticated';

//Validators
import UserValidator from './validators/UserValidator';
import CompanyValidator from './validators/CompanyValidator';

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

    // //rota de Autenticação
    // 'POST /auth': {
    //     path: 'AuthController.getAccessToken',
    //     middlewares: [AuthValidator.getAccessToken()]
    // }
}