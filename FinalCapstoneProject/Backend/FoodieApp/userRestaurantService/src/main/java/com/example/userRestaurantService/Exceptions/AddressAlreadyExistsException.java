package com.example.userRestaurantService.Exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.CONFLICT, reason = "Address already exist!!!!")
public class AddressAlreadyExistsException extends Exception{
}
