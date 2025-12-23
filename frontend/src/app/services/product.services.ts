import { inject, Injectable } from "@angular/core";
import { AppConfig } from "../config/config";
import { HttpClient } from "@angular/common/http";
import { HeaderBearerGen } from "../config/header-bearer";

@Injectable({ providedIn: 'root'})
export class ProductRequest {
    private url = `${AppConfig.api}/product` 
    private http = inject(HttpClient)
    private header = HeaderBearerGen()

    deleteProduct( id: string ) {
        this.header = HeaderBearerGen()        
        return this.http.delete(`${this.url}/${id}`, {headers: this.header})
    }

    findAll() {
        this.header = HeaderBearerGen()
        return this.http.get(this.url, {headers: this.header})
    }

    createProduct( entry: {
        name: string,
        description: string,
        price: number,
        stock: number,
        iva: boolean
    } ) {
        this.header = HeaderBearerGen()
        return this.http.post(this.url, entry, {headers: this.header} )
    }
    
    updateProduct( id: string, entry: {
        name?: string,
        description?: string,
        price?: number,
        stock?: number,
        iva?: boolean
    } ) {
        this.header = HeaderBearerGen()
        return this.http.put(`${this.url}/${id}`, entry, {headers: this.header} )
    }
    
}