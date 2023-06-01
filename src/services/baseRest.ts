import type {AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios"
import axios from "axios"

export abstract class BaseRest {

    constructor(protected readonly endpoint: AxiosInstance) {}

    

    private static async extractData<T>(request: Promise<AxiosResponse<T>>) {
        const {data} = await request
        return data
    }

    protected get<T>(url: string, data?: object, config?: AxiosRequestConfig) {
        return BaseRest.extractData<T>(this.endpoint.get(url, {data, ...config}))
    }
}