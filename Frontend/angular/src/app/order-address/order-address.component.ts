import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CartService } from '../service/cart.service';
import { FavouriteService } from '../service/favourite.service';

@Component({
  selector: 'app-order-address',
  templateUrl: './order-address.component.html',
  styleUrls: ['./order-address.component.css']
})
export class OrderAddressComponent implements OnInit {

  public items: any = [];
  constructor(private fav: FavouriteService,private cart:CartService, private router:Router, private snackBar : MatSnackBar) { 
    this.getUserAddress();
  }

  ngOnInit(): void {
  }

  getUserAddress()
  {
    this.fav.getAddress().subscribe(
      res => {
        this.items=res;
      }
    )
  }

  removeAddress(houseNo:string){
    
    this.fav.removeAddress(houseNo).subscribe(
      res=>{
        this.snackBar.open("Removed", "Close", {duration:2000});
        this.getUserAddress();
      }
    );
    console.log(houseNo)
    // window.location.reload();
  }

  onCheckOut(){
    localStorage.removeItem('cart');
    this.cart.removeAllCart();
    this.router.navigate(['/success']);
  }

}
