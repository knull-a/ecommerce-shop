import { ProductRest } from "@/services/ProductRest"
import axios from "axios"

export class Rest {
    public readonly product
    private endpoint
    
    private createAxios() {
        return axios.create({
            baseURL: import.meta.env.VITE_API_URL,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        })
    }

    public constructor() {
        this.endpoint = this.createAxios()
        this.product = new ProductRest(this.endpoint)
    }
}

export const useRest = () => {
    const api = new Rest()
    return api
}