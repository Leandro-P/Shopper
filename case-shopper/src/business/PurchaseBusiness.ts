import { PurchaseDatabase } from "../data/PurchaseDatabase";
import { Purchase } from "../models/purchase";
import { InvalidRequest, InvalidName, InvalidQuantity, InvalidId } from "../errors/CustomErrors";

export class PurchaseBusiness {
  public searchCustomerOrders = async (userName: string) => {
    if (!userName) {
      throw new InvalidName();
    } else {
      const purchaseDatabase = new PurchaseDatabase();
      const result = await purchaseDatabase.searchCustomerOrders(userName);

      return result;
    }
  }

  public createProductList = async (products: Purchase[]) => {
    if (products.length === 0) {
      throw new InvalidQuantity();
    } else {
      const purchaseDatabase = new PurchaseDatabase();
      await purchaseDatabase.createProductList(products);
    }
  }

  public updateProductList = async (idPurchase: number, qtyProduct: number) => {
    if (!idPurchase || !qtyProduct || qtyProduct === 0) {
      throw new InvalidRequest();
    } else {
      const purchaseDatabase = new PurchaseDatabase();
      await purchaseDatabase.updateProductList(idPurchase, qtyProduct);
    }
  }

  public deleteOrderProduct = async (idPurchase: number) => {
    if (!idPurchase) {
      throw new InvalidId();
    } else {
      const purchaseDatabase = new PurchaseDatabase();
      await purchaseDatabase.deleteOrderProduct(idPurchase);
    }
  }
}
