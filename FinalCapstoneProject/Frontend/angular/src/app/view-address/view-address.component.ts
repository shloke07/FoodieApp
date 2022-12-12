import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FavouriteService } from '../service/favourite.service';

@Component({
  selector: 'app-view-address',
  templateUrl: './view-address.component.html',
  styleUrls: ['./view-address.component.css']
})
export class ViewAddressComponent implements OnInit {

  public items: any = [];
  constructor(private fav: FavouriteService,private snackBar: MatSnackBar,) { 
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
        this.snackBar.open('Removed', 'Close', {duration:2000});
        this.getUserAddress();
      }
    );
    console.log(houseNo)
    // window.location.reload();
  }
}
