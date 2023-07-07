import type { AxiosInstance } from "axios";
import { BaseRest } from "@/services/baseRest";

export type Product = {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
  isHovering: boolean;
  isInWishlist: boolean;
  isInCart: boolean
};

export enum Instance {
  Mens = "men's clothing",
  Womens = "women's clothing",
  Jewellery = "jewelery",
  Electronics = "electronics",
}

export class ProductRest extends BaseRest {
  constructor(endpoint: AxiosInstance) {
    super(endpoint);
  }

  public getProducts() {
    return this.get<Product[]>("/products");
  }

  public getProduct(id: string) {
    return this.get<Product>(`/products/${id}`);
  }

  public getCategory(instance: Instance) {
    return this.get<Product[]>(`/products/category/${instance}`);
  }
}
