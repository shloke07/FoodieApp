import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AdminService } from './admin.service';

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {

  tokenStr='Bearer '+localStorage.getItem("jwt");
  headers=new HttpHeaders().set("Authorization",this.tokenStr);
  public favItemList:any=[];
  public itemList =  new BehaviorSubject<any>([]);
  emailId:any;
  
  public baseurl:string='http://localhost:9000/api/v2/user/';

  constructor(private admin:AdminService, private http:HttpClient) 
  { 

  }

  public FavItemsTemp: any = [];

  setFavItems(items:any){
    this.FavItemsTemp=items;
  }

  getFavItems(){
    return this.FavItemsTemp;
  }

  addAddress(addressobj:any)
  {
    return this.http.post(this.baseurl + "addAddress/" + this.emailId ,addressobj);
  }

  addToFaves(item:any,email:any){
    return this.http.post(this.baseurl+'addfavcuisine/'+ this.emailId,item,{headers: this.headers});
    
    
  }
  // getItems(){
  //   return this.http.get(this.baseurl+'getfavcuisine/'+localStorage.getItem('mailId'),{headers:this.headers})
  // }

  getItems()
  {
    return this.http.get(this.baseurl + "getfavcuisine/" + this.emailId);
  }

  getAddress()
  {
    return this.http.get(this.baseurl + "getAddress/" + this.emailId);
  }

  removeAddress(houseNo:string)
  {
    return this.http.delete(this.baseurl+'deleteAddress/'+ this.emailId + "/" + houseNo);
  }

  removeFavItem(name:string)
  {
    return this.http.delete(this.baseurl+'deletefavcuisine/'+ this.emailId + "/" + name);
  }

  removeAllFavs(){
    this.favItemList=[];
    this.itemList.next(this.favItemList);
  }
}
