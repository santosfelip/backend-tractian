import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        first: {
            type: String,
            require: true,
            isNull: false
        },
        last: {
            type: String,
            require: true,
            isNull: false
        },
        type: Object,
        require:true,
        isNull: false
    },
    contact: {
        email: {
            type: String,
            require: true,
            isNull: false
        },
        phone_number: {
            type: String
        },
        password: {
            type: String,
            select: false,
            require: true,
            isNull: false
        },
        type: Object,
        require:true,
        isNull: false
    },
    access: {
        isAdmin: {
            type: Boolean,
            require:true,
            isNull: false
        },
        type: Object,
        require:true,
        isNull: false
    }
    //TODO: Imagem
    //TODO: Empresa
});

export default mongoose.model('users', userSchema);
