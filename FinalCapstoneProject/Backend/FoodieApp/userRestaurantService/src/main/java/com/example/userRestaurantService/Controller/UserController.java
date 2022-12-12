package com.example.userRestaurantService.Controller;

import com.example.userRestaurantService.Exceptions.AddressAlreadyExistsException;
import com.example.userRestaurantService.Exceptions.RestaurantAlreadyExistsException;
import com.example.userRestaurantService.Exceptions.UserAlreadyExistException;
import com.example.userRestaurantService.Model.*;
import com.example.userRestaurantService.Service.UserRestaurantService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;


@RestController
@RequestMapping("/api/v2")
public class UserController
{
    @Autowired
    UserRestaurantService userRestaurantService;

    private ResponseEntity<?> responseEntity;


    //http://localhost:9000/api/v2/user/addAddress/{emailId}
    @PostMapping("/user/addAddress/{emailId}")
    public ResponseEntity<?> addAddress(@RequestBody Address address, @PathVariable String emailId) throws AddressAlreadyExistsException {
        try
        {
            return new ResponseEntity<>(userRestaurantService.addAddress(address,emailId),HttpStatus.OK);
        }
        catch (AddressAlreadyExistsException e)
        {
            throw new AddressAlreadyExistsException();
        }
    }

//    //http://localhost:9000/api/v1/user/addfavcuisine/{emailId}
//    @PostMapping("/user/addfavcuisine/{emailId}")
//    public ResponseEntity<?> addFavouriteCuisine(@RequestParam("file") MultipartFile file, @RequestParam ("cuisine") String cuisine, @PathVariable String emailId) throws IOException {
////        return new ResponseEntity<>(userRestaurantService.addFavouriteCuisine(cuisine,emailId),HttpStatus.OK);
//        Cuisine cuisine1 = new ObjectMapper().readValue(cuisine, Cuisine.class);
//        cuisine1.setImage(file.getBytes());
//        User dbCuisine = userRestaurantService.addFavouriteCuisine(cuisine1,emailId);
//        return new ResponseEntity<>(dbCuisine,HttpStatus.OK);
//    }

    //http://localhost:9000/api/v1/user/addfavcuisine/{emailId}
    @PostMapping("/user/addfavcuisine/{emailId}")
    public ResponseEntity<?> addFavouriteCuisine(@RequestBody Cuisine cuisine , @PathVariable String emailId)
    {
        return new ResponseEntity<>(userRestaurantService.addFavouriteCuisine(cuisine,emailId),HttpStatus.OK);
    }

    //http://localhost:9000/api/v2/user/getAddress/{emailId}
    @GetMapping("/user/getAddress/{emailId}")
    public ResponseEntity<?> getAddress(@PathVariable String emailId) {
        return new ResponseEntity<>(userRestaurantService.getAddress(emailId), HttpStatus.OK);
    }

    //http://localhost:9000/api/v2/user/{emailId}
    @GetMapping("/user/{emailId}")
    public ResponseEntity<?> getUserDetails(@PathVariable String emailId) {
        return new ResponseEntity<>(userRestaurantService.getUserDetails(emailId), HttpStatus.OK);
    }

    //http://localhost:9000/api/v1/user/getfavcuisine/{emailId}
    @GetMapping("/user/getfavcuisine/{emailId}")
    public ResponseEntity<?> getFavouriteCuisine(@PathVariable String emailId) {
        return new ResponseEntity<>(userRestaurantService.getFavouriteCuisine(emailId), HttpStatus.OK);
    }

    //http://localhost:9000/api/v1/user/deletefavrestaurant/{emailId}/{restaurantName}
    @DeleteMapping("/user/deleteAddress/{emailId}/{houseNo}")
    public ResponseEntity<?> deleteAddress(@PathVariable String houseNo, @PathVariable String emailId) {
        return new ResponseEntity<>(userRestaurantService.deleteAddress(houseNo,emailId), HttpStatus.OK);
    }

    //http://localhost:9000/api/v1/user/deletefavcuisine/{emailId}/{restaurantName}
    @DeleteMapping("/user/deletefavcuisine/{emailId}/{cuisineId}")
    public ResponseEntity<?> deleteFavouriteCuisine(@PathVariable String cuisineId, @PathVariable String emailId) {
        return new ResponseEntity<>(userRestaurantService.deleteFromFavouriteCuisine(cuisineId,emailId), HttpStatus.OK);
    }
    //http://localhost:9000/api/v2/register
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestParam("file")MultipartFile file, @RequestParam("commonUser") String commonUser) throws UserAlreadyExistException, IOException {
        CommonUser User1 = new ObjectMapper().readValue(commonUser, CommonUser.class);
        User1.setProfilePicture(file.getBytes());
        User dbCommonUser = userRestaurantService.registerUser(User1);
        return new ResponseEntity<>(dbCommonUser, HttpStatus.OK);
    }

}
