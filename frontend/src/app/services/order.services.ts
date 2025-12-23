import { inject, Injectable } from "@angular/core";
import { AppConfig } from "../config/config";
import { HttpClient } from "@angular/common/http";
import { HeaderBearerGen } from "../config/header-bearer";

@Injectable({ providedIn: 'root'})
export class OrderRequest {
    private url = `${AppConfig.api}/order` 
    private http = inject(HttpClient)
    private header = HeaderBearerGen()

    deleteOrder( id: string ) {
        this.header = HeaderBearerGen()        
        return this.http.delete(`${this.url}/${id}`, {headers: this.header})
    }

    findAllForInvoices() {
        this.header = HeaderBearerGen()
        return this.http.get(this.url+'/invoices', {headers: this.header})
    }

    findAll() {
        this.header = HeaderBearerGen()
        return this.http.get(this.url, {headers: this.header})
    }

    findAllNoPaid() {
        this.header = HeaderBearerGen()
        return this.http.get(this.url+'/no-paid', {headers: this.header})
    }

    createOrder( entry: {
        userId: string,
        clientId: string,
        details: { productId: string, quantity: number } [] 
    } ) {
        this.header = HeaderBearerGen()
        return this.http.post(this.url, entry, {headers: this.header} )
    }
    
    updateOrder( id: string, entry: { imageBase64: File } ) {
        const formData = new FormData()
        formData.append('id', id);
        formData.append('file', entry.imageBase64); 
        return this.http.post(`${this.url}-image/${id}`, formData )
    }
    
}