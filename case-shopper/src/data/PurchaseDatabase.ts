import { BaseDatabase } from "./BaseDatabase";
import { Purchase } from "../models/purchase";
import { generateId } from "../services/IdGenerator";

export class PurchaseDatabase extends BaseDatabase {
  public static TablePurchase: string = "shopper_purchases";
  public static TableProduct: string = "shopper_products";

  public searchCustomerOrders = async (userName: string) => {
    const result = await BaseDatabase.connection(PurchaseDatabase.TablePurchase)
      .select()
      .where({ customer_name: userName });
    return result;
  };

  public createProductList = async (products: Purchase[]) => {
    for (let i = 0; i < products.length; i++) {
      await BaseDatabase.connection(PurchaseDatabase.TablePurchase).insert({
        id_purchase: generateId(),
        id_product: products[i].id_product,
        name_product: products[i].name_product,
        qty_product: products[i].qty_product,
        tot_price: products[i].tot_price,
        date: products[i].date,
        customer_name: products[i].customer_name,
      });

      await BaseDatabase.connection.raw(`UPDATE shopper_products 
      SET qty_stock = qty_stock - ${products[i].qty_product} 
      WHERE id = ${products[i].id_product}`);
    }
  };

  public updateProductList = async (idPurchase: number, qtyProduct: number) => {
    const quantityAndIdProduct = await BaseDatabase.connection(
      PurchaseDatabase.TablePurchase
    )
      .select("qty_product", "id_product")
      .where("id_purchase", idPurchase);

    const quantityProductStock = await BaseDatabase.connection(
      PurchaseDatabase.TableProduct
    )
      .select("qty_stock")
      .where("id", quantityAndIdProduct[0].id_product);

    if (qtyProduct > quantityAndIdProduct[0].qty_product) {
      await BaseDatabase.connection(PurchaseDatabase.TableProduct)
        .where("id", quantityAndIdProduct[0].id_product)
        .update({
          qty_stock:
            quantityProductStock[0].qty_stock -
            (qtyProduct - quantityAndIdProduct[0].qty_product),
        });
    } else {
      await BaseDatabase.connection(PurchaseDatabase.TableProduct)
        .where("id", quantityAndIdProduct[0].id_product)
        .update({
          qty_stock:
            quantityProductStock[0].qty_stock +
            (quantityAndIdProduct[0].qty_product - qtyProduct),
        });
    }

    await BaseDatabase.connection(PurchaseDatabase.TablePurchase)
      .where("id_purchase", idPurchase)
      .update({ qty_product: qtyProduct });
  };

  public deleteOrderProduct = async (idPurchase: number) => {
    const quantityAndIdProduct = await BaseDatabase.connection(
      PurchaseDatabase.TablePurchase
    )
      .select("qty_product", "id_product")
      .where("id_purchase", idPurchase);

    const quantityProductStock = await BaseDatabase.connection(
      PurchaseDatabase.TableProduct
    )
      .select("qty_stock")
      .where("id", quantityAndIdProduct[0].id_product);

    await BaseDatabase.connection(PurchaseDatabase.TablePurchase)
      .where("id_purchase", idPurchase)
      .del();

    await BaseDatabase.connection(PurchaseDatabase.TableProduct)
      .where("id", quantityAndIdProduct[0].id_product)
      .update({
        qty_stock:
          quantityAndIdProduct[0].qty_product +
          quantityProductStock[0].qty_stock,
      });
  };
}
