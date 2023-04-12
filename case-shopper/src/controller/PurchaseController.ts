import { Request, Response } from "express";
import { PurchaseBusiness } from "../business/PurchaseBusiness";
import { Purchase } from "../models/purchase";

const purchaseBusiness = new PurchaseBusiness();
export class PurchaseController {
  public searchCustomerOrders = async (req: Request, res: Response) => {
    try {
      const userName = req.params.userName;

      const result = await purchaseBusiness.searchCustomerOrders(userName);

      res.status(200).send({ message: result });
    } catch (error: any) {
      res.status(400).send({ message: error.message });
    }
  }

  public createProductList = async (req: Request, res: Response) => {
    try {
      const products: Purchase[] = req.body.products;

      await purchaseBusiness.createProductList(products);

      res.status(200).send({ message: "Successful purchase!" });
    } catch (error: any) {
      res.status(400).send({ message: error.message });
    }
  }

  public updateProductList = async (req: Request, res: Response) => {
    try {
      const idPurchase = req.body.id;
      const qtyProduct = req.body.qty_product;

      await purchaseBusiness.updateProductList(idPurchase, qtyProduct);

      res.status(200).send("updated quantity!");
    } catch (error: any) {
      res.status(400).send({ message: error.message });
    }
  }

  public deleteOrderProduct = async (req: Request, res: Response) => {
    try {
      const idPurchase = req.params.id;

      await purchaseBusiness.deleteOrderProduct(Number(idPurchase));

      res.status(200).send("successfully deleted product!");
    } catch (error: any) {
      res.status(400).send({ message: error.message });
    }
  }
}
