import { inject, Injectable } from "@angular/core";
import { AppConfig } from "../config/config";
import { HttpClient } from "@angular/common/http";
import { HeaderBearerGen } from "../config/header-bearer";

@Injectable({ providedIn: 'root'})
export class ReportsRequest {
    private url = `${AppConfig.api}/reports` 
    private http = inject(HttpClient)
    private header = HeaderBearerGen()

    monthly() {
        this.header = HeaderBearerGen()
        return this.http.get(this.url+'/monthly', {headers: this.header})
    }

    countAll() {
        this.header = HeaderBearerGen()
        return this.http.get(this.url+'/count', {headers: this.header})
    }


    topProducts() {
        this.header = HeaderBearerGen()
        return this.http.get(this.url+'/products', {headers: this.header})
    }


}