import express from 'express';
import { StockController } from "../controller/StockController";

export const stockRouter = express.Router();

const stockController = new StockController();

stockRouter.get('/products', stockController.getStock);