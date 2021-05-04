import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        first: String,
        last: String
    },
    contact: {
        email: String,
        phone_number: String,
        password: String
    },
    access: {
        isAdmin: Boolean,
    }
    //TODO: Imagem
    //TODO: Empresa
});

export default mongoose.model('users', userSchema);
