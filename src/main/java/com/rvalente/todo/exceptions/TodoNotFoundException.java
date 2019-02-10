package com.rvalente.todo.exceptions;

public class TodoNotFoundException extends RuntimeException {
    public TodoNotFoundException(Long id) {
        super("Could not find todo with an id of: " + id);
    }
}
