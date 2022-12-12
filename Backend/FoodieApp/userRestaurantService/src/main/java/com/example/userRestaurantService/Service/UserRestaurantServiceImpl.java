package com.example.userRestaurantService.Service;

import com.example.userRestaurantService.Exceptions.AddressAlreadyExistsException;
import com.example.userRestaurantService.Exceptions.RestaurantAlreadyExistsException;
import com.example.userRestaurantService.Model.*;
import com.example.userRestaurantService.Exceptions.UserAlreadyExistException;
import com.example.userRestaurantService.Proxy.UserProxy;
import com.example.userRestaurantService.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


@Service
public class UserRestaurantServiceImpl implements UserRestaurantService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    UserProxy userProxy;


    @Override
    public User registerUser(CommonUser commonUser) throws UserAlreadyExistException {
        User user = new User(commonUser.getEmailId(), commonUser.getProfilePicture(), commonUser.getFirstName(), commonUser.getLastName(), commonUser.getGender(), commonUser.getPassword(), commonUser.getCpassword(), new ArrayList<>(), new ArrayList<>(), new ArrayList<>());

        if (userRepository.findById(user.getEmailId()).isPresent())
        {
            throw new UserAlreadyExistException();
        }

        UserDTO userDTO = new UserDTO();
        userDTO.setEmailId(commonUser.getEmailId());
        userDTO.setPassword(commonUser.getPassword());
        ResponseEntity<?> responseEntity = userProxy.sendUserObjectToAuth(userDTO);
        return userRepository.insert(user);
    }

    @Override
    public User addAddress(Address address, String emailId) throws AddressAlreadyExistsException {
        List<Address> addressList = new ArrayList<>();
        User user = userRepository.findById(emailId).get();
        addressList = user.getAddressList();
        if(addressList==null)
        {
            user.setAddressList(Arrays.asList(address));
        }
        else if(addressList.contains(address)) {
            throw new AddressAlreadyExistsException();
        }
        else
        {
            addressList.add(address);
            user.setAddressList(addressList);
        }
        return userRepository.save(user);
    }

    @Override
    public User addFavouriteCuisine(Cuisine cuisine, String emailId) {
        List<Cuisine> favCuisine= new ArrayList<>();
        User user= userRepository.findById(emailId).get();
        favCuisine=user.getFavouriteCuisine();
        if (favCuisine ==null)
        {
            user.setFavouriteCuisine(Arrays.asList(cuisine));
        }
        else {
            favCuisine.add(cuisine);
            user.setFavouriteCuisine(favCuisine);
        }
        return userRepository.save(user);
    }

    @Override
    public List<Address> getAddress(String emailId) {
        return userRepository.findById(emailId).get().getAddressList();
    }

    @Override
    public List<Cuisine> getFavouriteCuisine(String emailId) {
        return userRepository.findById(emailId).get().getFavouriteCuisine();
    }

    @Override
    public User deleteAddress(String houseNo, String emailId) {
        User cust = userRepository.findById(emailId).get();
        cust.getAddressList().removeIf(cus->cus.getHouseNo().equals(houseNo));
        return  userRepository.save(cust);
    }

    @Override
    public User deleteFromFavouriteCuisine(String cuisineId, String emailId) {
        User cust = userRepository.findById(emailId).get();
        cust.getFavouriteCuisine().removeIf(cus->cus.getCuisineId().equals(cuisineId));
        return  userRepository.save(cust);
    }

    @Override
    public User getUserDetails(String emailId) {
        return userRepository.findById(emailId).get();
    }
}
