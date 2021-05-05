import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const companyUnits = new Schema({
    name: {
        type: String,
        require:true,
        isNull: false
    },
    id_company: {
        type: String,
        require:true,
        isNull: false
    }
});

export default mongoose.model('companiesUnits', companyUnits);
