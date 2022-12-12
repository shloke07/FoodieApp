import { Component } from '@angular/core';
import { CartService } from './service/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'foodieAppAngular';
  itemInCart!:number;
  constructor(private cart:CartService){}

  ngOnInit(){
    this.cart.numOfItems.subscribe(d=>{
      this.itemInCart= d.length;
      console.log(this.itemInCart);
      
      
    })
  }
}
