import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Restaurant } from '../model/restaurant';
import { AdminService } from '../service/admin.service';
import { RestaurantService } from '../service/restaurant.service';
import { SearchService } from '../service/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  id:any;
  emailId:any;
  constructor(private route:ActivatedRoute,private adminService:AdminService,private dialog : MatDialog, private search:SearchService, private fb:FormBuilder, private httpClient : HttpClient, private sanitizer: DomSanitizer) 
  {
    this.id=this.route.snapshot.params['id'];
    this.emailId=this.route.snapshot.params['emailId'];
    this.getUserDetails2();
    this.getRestaurantByCity('delhi');
  }

  ngOnInit(): void {
  }

  restaurants:Restaurant[]= [];
  restaurantId='';
  restaurantData:any;
  public userFile1:any = File;
  public userFile2:any = File;
  retrievedImage: any;
  data: any;
  user:any;
  profileImage:any;

  getRestaurantByCity(city:string)
  {
    console.log("adding data");
    
    this.search.searchByCity(city).subscribe(
      data=>
      {
        this.restaurants!=data;
        this.retrievedImage = 'data:image/jpeg;base64,' + this.data.picByte;
      }
    );
  }

  getUserDetails2()
  {
    this.adminService.getUserDetails2(localStorage.getItem('mailId')).subscribe(
      data => 
      {
        console.log(data);
        this.user = data; 
        this.profileImage = 'data:image/jpeg;base64,' + this.user.profilePicture;
      }
    )
  }

}
