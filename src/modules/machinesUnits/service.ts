import { IMachineUnit } from './model';
import machinesUnits from './schema';

export default class MachinesUnitService {
    public static createMachineCompanyUnit(params: IMachineUnit) {
        return new machinesUnits(params).save();
    }

    public static filterMachineCompanyUnit(query: any) {
        return machinesUnits.find(query);
    }

    public static async updateMachineCompanyUnit(id: String, params: IMachineUnit) {
        const query = { _id: id };
        return machinesUnits.updateOne(query, params);
    }
    
    public static deleteMachineCompanyUnit(id: String) {
        const query = { _id: id };
        return machinesUnits.deleteOne(query);
    }
}