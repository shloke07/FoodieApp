import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../service/admin.service';
import { FavouriteService } from '../service/favourite.service';
import { RestaurantService } from '../service/restaurant.service';
import { FilterNamePipe } from '../filter-name.pipe';
import { Cuisine } from '../model/cuisine';
import { CartService } from '../service/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-cuisine',
  templateUrl: './user-cuisine.component.html',
  styleUrls: ['./user-cuisine.component.css'],
})
export class UserCuisineComponent implements OnInit {
  id: any;
  data: any;
  retrievedImage: any;
  user: any;
  profileImage: any;

  itemInCart!:number;

  searchTextName!: string;

  constructor(
    private fav: FavouriteService,
    private adminService: AdminService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private restaurantService: RestaurantService,
    private cart: CartService
  ) {
    this.id = this.route.snapshot.params['id'];
    this.getRestaurant();
    console.log(this.id);
    
  }

  cuisineForm = new FormGroup({
    cuisineId: new FormControl(''),
    cuisineName: new FormControl(''),
    cuisineDescription: new FormControl(''),
    price: new FormControl(''),
  });

  cuisineData: any;

  tempFavList:any

  ngOnInit(): void {
    this.tempFavList=this.fav.getFavItems();

    this.cart.numOfItems.subscribe(d=>{
      this.itemInCart= d.length;
      console.log(this.itemInCart);
      
      
    })
  }

  getRestaurant() {
    this.restaurantService.getRestaurant(this.id).subscribe((data) => {
      this.data = data;
      console.log(data);
      this.restaurantService.restaurantId = this.data.restaurantId;
      this.retrievedImage = 'data:image/jpeg;base64,' + this.data.picByte;
    });
  }

  deleteCuisine(cuisineId: any) {
    this.restaurantService.deleteCuisine(cuisineId).subscribe((data) => {
      alert('Deleted');
      this.getRestaurant();
    });
  }

  getUserDetails2() {
    this.adminService
      .getUserDetails2(this.adminService.emailId)
      .subscribe((data) => {
        console.log(data);
        this.user = data;
        this.profileImage =
          'data:image/jpeg;base64,' + this.user.profilePicture;
      });
  }

  responseData: any;
  favList: any;
  public email: any = localStorage.getItem('mailId');
  addToFav(item: any) {

    this.fav.addToFaves(item, this.email).subscribe((res) => {
      this.snackBar.open('Added To Favourite!!!!', 'Close', {duration:2000});
    });
    // console.log('added item for ' + this.email);
  }
  addToCart(cuisine: any) {
    this.snackBar.open('Added To Cart!!!!', 'Close', {duration:2000});
    this.cart.addItem(cuisine);
  }
}
