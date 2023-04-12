import express from "express";
import { PurchaseController } from "../controller/PurchaseController";

export const purchaseRouter = express.Router();

const purchaseController = new PurchaseController();

purchaseRouter.get("/customers-orders/:userName", purchaseController.searchCustomerOrders);

purchaseRouter.post("/create-product-list", purchaseController.createProductList);

purchaseRouter.put("/update-purchase-product", purchaseController.updateProductList);

purchaseRouter.delete("/delete-order-product/:id", purchaseController.deleteOrderProduct);
  