import { ICompany } from './model';
import companies from './schema';


export default class CompanyService {
    public static createCompany(companie_params: ICompany) {
        return new companies(companie_params).save();
    }

    public static filterCompany(query: any) {
        return companies.find(query);
    }

    public static async updateCompany(id: String, companie_params: ICompany) {
        const query = { _id: id };
        return companies.updateOne(query, companie_params);
    }
    
    public static deleteCompany(id: String) {
        const query = { _id: id };
        return companies.deleteOne(query);
    }
}