import { inject, Injectable } from "@angular/core";
import { AppConfig } from "../config/config";
import { HttpClient } from "@angular/common/http";
import { HeaderBearerGen } from "../config/header-bearer";

@Injectable({ providedIn: 'root'})
export class AuthRequest {
    private url = `${AppConfig.api}/auth` 
    private http = inject(HttpClient)
    private header = HeaderBearerGen()

    login( entry: {
        username: string,
        password: string,
    } ) {
        return this.http.post(this.url+'/login', entry, {headers: this.header} )
    }

    verifyToken() {
        this.header = HeaderBearerGen()
        return this.http.post(this.url, '/verify-token', {headers: this.header} )
    }
    
}