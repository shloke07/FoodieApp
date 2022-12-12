import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { FavouriteService } from '../service/favourite.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  constructor(private favouriteService:FavouriteService, private route:Router, private snackBar : MatSnackBar) { }

  ngOnInit(): void {
  }

  addressForm = new FormGroup({
    "houseNo" : new FormControl(''),
    "street" : new FormControl(''),
    "city" : new FormControl(''),
    "pinCode" : new FormControl('')
  })

  addAddress()
  {
    this.favouriteService.addAddress(this.addressForm.value).subscribe({
      next:(response) => {
        this.snackBar.open("Address Added", "Close", {duration:2000});
        this.addressForm.reset();
        this.route.navigate(['view-address']);
      },
      error: (err) => {
        console.log(err);
        if (err.status == 409) {
          this.snackBar.open(err.error.message, 'Close', { duration: 2000 });
        }
      },
  })
  }

}
