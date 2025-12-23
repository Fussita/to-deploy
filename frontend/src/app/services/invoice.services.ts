import { inject, Injectable } from "@angular/core";
import { AppConfig } from "../config/config";
import { HttpClient } from "@angular/common/http";
import { HeaderBearerGen } from "../config/header-bearer";

@Injectable({ providedIn: 'root'})
export class InvoiceRequest {
    private url = `${AppConfig.api}/invoice` 
    private http = inject(HttpClient)
    private header = HeaderBearerGen()

    deleteInvoice( id: string ) {
        this.header = HeaderBearerGen()        
        return this.http.delete(`${this.url}/${id}`, {headers: this.header})
    }

    findAll() {
        this.header = HeaderBearerGen()
        return this.http.get(this.url, {headers: this.header})
    }

    createInvoice( entry: {
        orderId: string,
    } ) {
        this.header = HeaderBearerGen()
        return this.http.post(this.url, entry, {headers: this.header} )
    }
    
}