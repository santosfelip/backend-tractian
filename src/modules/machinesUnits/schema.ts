import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const machinesUnits = new Schema({
    name: {
        type: String,
        require:true,
        isNull: false
    },
    status: {
        type: String,
        enum : ['OPERACAO','ALERTA', 'PARADA'],
        default: 'OPERACAO'
    },
    health_level: {
        type: Number,
        require:true,
        isNull: false
    }
});

export default mongoose.model('machinesUnits', machinesUnits);
