import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const companySchema = new Schema({
    name: {
        type: String,
        require:true,
        isNull: false
    },
    cnpj: {
        type: String,
        require:true,
        isNull: false
    }
});

export default mongoose.model('companies', companySchema);
