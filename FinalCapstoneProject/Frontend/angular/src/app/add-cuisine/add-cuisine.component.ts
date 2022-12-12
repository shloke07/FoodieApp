import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { Route, Router } from '@angular/router';
import { FileHandle } from '../model/FileHandle';
import { RestaurantService } from '../service/restaurant.service';

@Component({
  selector: 'app-add-cuisine',
  templateUrl: './add-cuisine.component.html',
  styleUrls: ['./add-cuisine.component.css']
})
export class AddCuisineComponent implements OnInit {
  constructor(private restaurantService:RestaurantService,
     private snackBar : MatSnackBar, private sanitizer: DomSanitizer,private router:Router) {
    this.getAllCuisine();
   }

  ngOnInit(): void {
  }

  cuisineForm = new FormGroup({
    cuisineId:new FormControl(''),
    cuisineName:new FormControl(''),
    cuisineDescription:new FormControl(''),
    price:new FormControl(''),
    qty:new FormControl('')
  });
  
  cuisineData:any;

  public userFile1:any = File;
  public userFile2:any = File;

  getAllCuisine()
  {
    this.restaurantService.getAllCuisine().subscribe(
      response =>
      {
        this.cuisineData=response;
      }
    )
  }

  addCuisine(submitForm:FormGroup)
  {
    const cuisine = submitForm.value;
    const formData = new FormData();
    formData.append('cuisine', JSON.stringify(cuisine));
    formData.append('file',this.userFile2);
    this.restaurantService.addCuisine(formData).subscribe(
      response =>
      {
        this.snackBar.open("Cuisine Added", "Close", {duration:2000});
      }
      
    )
    this.router.navigate(['admin']);
  }

  onFileSelect(event:any)
  {
    const file = event.target.files[0];
    const fileHandle : FileHandle={
      file: file,
      url:this.sanitizer.bypassSecurityTrustUrl(
        window.URL.createObjectURL(file)
      )
    }
    this.userFile1 = fileHandle;
    this.userFile2 = fileHandle.file;
  }
}
