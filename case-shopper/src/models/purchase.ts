export type Purchase = {
  id_product: number;
  name_product: string;
  qty_product: number;
  tot_price: number;
  date: string;
  customer_name: string;
};

export interface Product {
  length: number;
  id_product: number;
  name_product: string;
  qty_product: number;
  tot_price: number;
  date: string;
  customer_name: string;
}
