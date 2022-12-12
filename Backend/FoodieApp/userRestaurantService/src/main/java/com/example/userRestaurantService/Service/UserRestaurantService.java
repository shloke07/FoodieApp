package com.example.userRestaurantService.Service;

import com.example.userRestaurantService.Exceptions.AddressAlreadyExistsException;
import com.example.userRestaurantService.Exceptions.RestaurantAlreadyExistsException;
import com.example.userRestaurantService.Model.*;
import com.example.userRestaurantService.Exceptions.UserAlreadyExistException;

import java.util.List;


public interface UserRestaurantService
{
    User registerUser(CommonUser commonUser) throws UserAlreadyExistException;
    User addAddress(Address address, String emailId) throws AddressAlreadyExistsException;
    public User addFavouriteCuisine(Cuisine cuisine, String emailId);
    List<Address> getAddress(String emailId);
    List<Cuisine> getFavouriteCuisine(String emailId);
    User deleteAddress(String houseNo, String emailId);
    User deleteFromFavouriteCuisine(String cuisineName, String emailId);
    User getUserDetails(String emailId);
}
