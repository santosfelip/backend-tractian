import { IUser } from './model';
import users from './schema';

export default class UserService {
    
    public static createUser(user_params: IUser) {
        return new users(user_params).save();
    }

    public static filterUser(query: any) {
        return users.find(query);
    }

    public static async updateUser(id: String, user_params: IUser) {
        const query = { _id: id };
        return users.updateOne(query, user_params);
    }
    
    public static deleteUser(id: String) {
        const query = { _id: id };
        return users.deleteOne(query);
    }

}