import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import { Cuisine } from '../model/cuisine';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems:any[]=[];
  numOfItems = new BehaviorSubject<any>([]);

  constructor() {
    const ls = this.getCartData();
    if(ls) this.numOfItems.next(ls)
   }

  addItem(item:Cuisine){

    const ls = this.getCartData();
    let exist:any;
    if(ls)
    exist = ls.find((i:any)=>{
      return i.cuisineId===item.cuisineId
      
    });

    if(exist){
      exist.qty++;
      this.setCartData(ls);
    }
    else{
      if(ls){
        const newData = [...ls,item];
        this.setCartData(newData);
        return
      }
        this.cartItems.push(item);
        this.setCartData(this.cartItems);
        
      
    }

  }

  setCartData(data:any){
    localStorage.setItem('cart',JSON.stringify(data));
    this.numOfItems.next(this.getCartData());
  }
  getCartData(){
    return JSON.parse(localStorage.getItem('cart')!);
  }

  removeAllCart(){
    this.cartItems=[];
    this.numOfItems.next(this.cartItems);
    localStorage.clear();
  }

}
