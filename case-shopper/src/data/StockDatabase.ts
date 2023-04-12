import { BaseDatabase } from "./BaseDatabase";

export class StockDatabase extends BaseDatabase {
  private static TABLE_NAME = "shopper_products";
  public getStock = async () => {
    const result = await StockDatabase.connection(
      StockDatabase.TABLE_NAME
    ).select();
    return result;
  };
}
