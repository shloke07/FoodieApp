import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartComponent } from '../cart/cart.component';
import { CartService } from '../service/cart.service';
import { FavouriteService } from '../service/favourite.service';

@Component({
  selector: 'app-fav-cuisine',
  templateUrl: './fav-cuisine.component.html',
  styleUrls: ['./fav-cuisine.component.css'],
})
export class FavCuisineComponent implements OnInit {
  public items: any = [];
  show: boolean = false;
  constructor(private fav: FavouriteService, private snackBar : MatSnackBar, private cart:CartService) {
    this.getUserCuisine();
  }

  setItems(items:any){

  }

  ngOnInit(): void {
    this.fav.setFavItems(this.items);
  }

  cuisineList:any;

  getUserCuisine()
  {
    this.fav.getItems().subscribe(
      res => {
        this.items=res;
      }
    )
  }

  removeFav(cuisineId:string){
    
    this.fav.removeFavItem(cuisineId).subscribe(
      res=>{
        this.snackBar.open("Removed", "Close", {duration:2000});
        this.getUserCuisine();
      }
    );
  }

  addToCart(cuisine: any) {
    this.snackBar.open('Added To Cart!!!!', 'Close', {duration:2000});
    this.cart.addItem(cuisine);
  }
}
