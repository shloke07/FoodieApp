import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  tokenStr='Bearer '+localStorage.getItem("jwt");
  headers=new HttpHeaders().set("Authorization",this.tokenStr);
  constructor(private http: HttpClient) { }

  searchByCity(city: string | null){
    console.log(this.tokenStr)
    console.log(city);
    
    return this.http.get("http://localhost:65100/api/v1/restaurants/" + city, {headers:this.headers});
  }
}
