package com.niit.authUserService.service;

import com.niit.authUserService.exceptions.InvalidDataException;
import com.niit.authUserService.exceptions.UserAlreadyExistsException;
import com.niit.authUserService.model.User;

public interface IUserService
{
    public User saveUser(User user) throws UserAlreadyExistsException;
    public User loginCheck(String emailId, String password) throws InvalidDataException;
    public User getUserDetails(String emailId);
}
