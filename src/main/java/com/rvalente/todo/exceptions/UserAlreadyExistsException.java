package com.rvalente.todo.exceptions;

public class UserAlreadyExistsException extends RuntimeException {
    public UserAlreadyExistsException(String username) {
        super("An user with the an username of" + username +" already exists.");
    }
}
