//import isAuthenticated from '../../../middlewares/isAuthenticated';

//Validators
import UserValidator from './validators/UserValidator';

export const routes = {

    //rotas de usuario
    'POST /user/register': {
        path: 'UserController.add',
        middlewares: UserValidator.addUser()
    },
    'DELETE /user/:id': {
        path: 'UserController.delete',
        middlewares: UserValidator.deleteUser()
    },
    // 'GET /user': {
    //     path: 'UserController.getUser',
    //     middlewares: [isAuthenticated]
    // },



    // //rota de Autenticação
    // 'POST /auth': {
    //     path: 'AuthController.getAccessToken',
    //     middlewares: [AuthValidator.getAccessToken()]
    // }
}