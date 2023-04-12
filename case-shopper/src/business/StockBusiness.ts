import { StockDatabase } from "../data/StockDatabase";
import { InvalidRequest } from "../errors/CustomErrors";

export class StockBusiness {
  constructor() {}
  public getStock = async () => {
    try {
      const stockDatabase = new StockDatabase();
      const result = stockDatabase.getStock();
      return result;
    } catch (error: any) {
      throw new InvalidRequest();
    }
  };
}
