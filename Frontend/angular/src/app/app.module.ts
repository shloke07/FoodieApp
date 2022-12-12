import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { SignupComponent } from './signup/signup.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './home/home.component';
import {MatDialogModule} from '@angular/material/dialog';
import { RestaurantComponent } from './restaurant/restaurant.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { AdminTestComponent } from './admin-test/admin-test.component';
import { CuisineComponent } from './cuisine/cuisine.component';
import { AddCuisineComponent } from './add-cuisine/add-cuisine.component';
import { UserCuisineComponent } from './user-cuisine/user-cuisine.component';
import { FavCuisineComponent } from './fav-cuisine/fav-cuisine.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SearchComponent } from './search/search.component';
import { FilterPipe } from './filter.pipe';
import { FilterNamePipe } from './filter-name.pipe';
import { AddressComponent } from './address/address.component';
import { ViewAddressComponent } from './view-address/view-address.component';
import { CartComponent } from './cart/cart.component';
import { OrderAddressComponent } from './order-address/order-address.component';
import { SuccessComponent } from './success/success.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { defineElement } from 'lord-icon-element';
import lottie from 'lottie-web';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    AdminComponent,
    UserComponent,
    HomeComponent,
    RestaurantComponent,
    AdminTestComponent,
    CuisineComponent,
    AddCuisineComponent,
    UserCuisineComponent,
    FavCuisineComponent,
    LandingPageComponent,
    SearchComponent,
    FilterPipe,
    FilterNamePipe,
    AddressComponent,
    ViewAddressComponent,
    CartComponent,
    OrderAddressComponent,
    SuccessComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {
  constructor() {
    defineElement(lottie.loadAnimation);
  }
 }
