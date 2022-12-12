import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cuisine } from '../model/cuisine';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  items:any[]=[];
  total!:number;

  constructor(private cart:CartService, private router:Router) { 
    
  }

  ngOnInit(): void {
    this.cart.numOfItems.subscribe(data=>{
      this.items=data;
    })

    if(this.items){
      this.getTotal(this.items);
    }
  }

  onDelete(i:number){
    this.items.splice(+i,1);
    console.log(i+'is the index');
    
    this.cart.setCartData(this.items);
    this.getTotal(this.cart);
    console.log(this.cart.getCartData());
    
    // localStorage.clear();
  }

  removeAllCart(){
    this.cart.removeAllCart();
  }

  validateInput(event:any,i:number){
    const qty = +event.target.value;
    console.log(qty+' is quant');
    
    if(qty<1){
      event.target.value=this.items[i].qty;
      
      return; 
    }

    this.QtyUpdated(qty,i);
  }

  private QtyUpdated(qty:number,i:number){
    this.items[i].qty=qty;
    this.cart.setCartData(this.items);
    this.getTotal(this.items);
  }
  
  getTotal(data:any){
    let subs=0;

    for(const item of data)
      subs+=item.price*item.qty;

      this.total=subs;
    
  }

  // onCheckOut(){
  //   alert("order placed successfully! Your total amount is ₹ "+this.total);
  //   localStorage.removeItem('cart');
  //   this.cart.removeAllCart();
  //   this.router.navigate(['/user']);
    
  // }

}
