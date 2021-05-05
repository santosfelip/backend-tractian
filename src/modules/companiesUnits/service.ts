import { ICompanyUnit } from './model';
import companiesUnits from './schema';

export default class CompanyService {
    public static createCompanyUnit(companie_params: ICompanyUnit) {
        return new companiesUnits(companie_params).save();
    }

    public static filterCompanyUnit(query: any) {
        return companiesUnits.find(query);
    }

    public static async updateCompanyUnit(id: String, companie_params: ICompanyUnit) {
        const query = { _id: id };
        return companiesUnits.updateOne(query, companie_params);
    }
    
    public static deleteCompanyUnit(id: String) {
        const query = { _id: id };
        return companiesUnits.deleteOne(query);
    }
}