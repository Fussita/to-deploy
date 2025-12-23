import { inject, Injectable } from "@angular/core";
import { AppConfig } from "../config/config";
import { HttpClient } from "@angular/common/http";
import { HeaderBearerGen } from "../config/header-bearer";

@Injectable({ providedIn: 'root'})
export class UsersRequest {
    private url = `${AppConfig.api}/user` 
    private http = inject(HttpClient)
    private header = HeaderBearerGen()

    delete( id: string ) {
        this.header = HeaderBearerGen()        
        return this.http.delete(`${this.url}/${id}`, {headers: this.header})
    }

    findAll() {
        this.header = HeaderBearerGen()
        return this.http.get(this.url, {headers: this.header})
    }

    registerUser( entry: {
        username: string,
        password: string,
        role: string
    } ) {
        this.header = HeaderBearerGen()
        return this.http.post(this.url, entry, {headers: this.header} )
    }
    
    update( id: string, entry: {
        username?: string,
        password?: string,
        role?: string
    } ) {
        this.header = HeaderBearerGen()
        return this.http.put(`${this.url}/${id}`, entry, {headers: this.header} )
    }
    
}