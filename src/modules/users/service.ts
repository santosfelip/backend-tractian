import { IUser } from './model';
import users from './schema';

export default class UserService {
    
    public static createUser(user_params: IUser) {
        return new users(user_params).save();
    }

    public static filterUser(query: any) {
        return users.find(query);
    }

    // public updateUser(user_params: IUser, callback: any) {
    //     const query = { _id: user_params._id };
    //     users.findOneAndUpdate(query, user_params, callback);
    // }
    
    public static deleteUser(id: String) {
        const query = { _id: id };
        return users.deleteOne(query);
    }

}