import type { AxiosInstance } from "axios";
import { BaseRest } from "@/services/baseRest";

export type Product = {
    id: number
    title: string
    price: string
    category: string
    description: string
    image:string
    isHovering: boolean
    isInWishlist: boolean
}

export class ProductRest extends BaseRest {
    constructor(endpoint: AxiosInstance) {
        super(endpoint)   
    }

    public getProducts() {
        return this.get<Product[]>("/products")
    }

    public getProduct(id: string) {
        return this.get<Product>(`/products/${id}`)
    }

    public getMens() {
        return this.get<Product[]>("/products/category/men's clothing")
    }
}