import { Request, Response } from "express";
import { StockBusiness } from "../business/StockBusiness";

export class StockController {
  public getStock = async (req: Request, res: Response) => {
    try {
      const stockBusiness = new StockBusiness();
      const result = await stockBusiness.getStock();
      res.status(200).send({ message: result });
    } catch (error: any) {
      res.status(400).send({ message: error.message });
    }
  };
}
