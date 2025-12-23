import { inject, Injectable } from "@angular/core";
import { AppConfig } from "../config/config";
import { HttpClient } from "@angular/common/http";
import { HeaderBearerGen } from "../config/header-bearer";
import { IClient } from "../interfaces/client";

@Injectable({ providedIn: 'root'})
export class ClientRequest {
    private url = `${AppConfig.api}/client` 
    private http = inject(HttpClient)
    private header = HeaderBearerGen()

    deleteClient( id: string ) {
        this.header = HeaderBearerGen()        
        return this.http.delete(`${this.url}/${id}`, {headers: this.header})
    }

    findAll() {
        this.header = HeaderBearerGen()
        return this.http.get<IClient[]>(this.url, {headers: this.header})
    }

    createClient( entry: {
        name: string,
        email: string,
        address: string,
        phone: string,
        cedula: string
    } ) {
        this.header = HeaderBearerGen()
        return this.http.post<IClient>(this.url, entry, {headers: this.header} )
    }
    
    updateClient( id: string, entry: Partial<IClient> ) {
        this.header = HeaderBearerGen()
        return this.http.put<IClient>(`${this.url}/${id}`, entry, {headers: this.header} )
    }
    
}