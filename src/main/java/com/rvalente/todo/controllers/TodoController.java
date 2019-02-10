package com.rvalente.todo.controllers;

import com.rvalente.todo.enums.TodoStatus;
import com.rvalente.todo.exceptions.TodoNotFoundException;
import com.rvalente.todo.repositories.TodoRepository;
import com.rvalente.todo.models.Todo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class TodoController {

    @Autowired
    TodoRepository repository;

    @GetMapping("/api/todos")
    public List<Todo> list() {
        return repository.findAll();
    }

    @PostMapping("/api/todos")
    public Todo add(@RequestBody Todo newTodo) {
        return repository.save(newTodo);
    }

    @GetMapping("/api/todos/{id}")
    public Todo one(@PathVariable Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new TodoNotFoundException(id));
    }

    @PutMapping("/api/todos/{id}")
    public Todo updateTodo(@RequestBody Todo newTodo, @PathVariable Long id) {
        return repository.findById(id)
                    .map(todo -> {
                        todo.setContent(newTodo.getContent());
                        todo.setStatus(newTodo.getStatus());
                        return repository.save(todo);
                    }).orElseGet(() -> {
                        newTodo.setId(id);
                        return repository.save(newTodo);
                    });
    }

    @PutMapping("/api/todos/{id}/mark-as-done")
    public Todo markAsDone(@PathVariable Long id) {
        return repository.findById(id)
                    .map(todo -> {
                        todo.setStatus(TodoStatus.DONE);
                        return repository.save(todo);
                    }).orElseThrow(() -> new TodoNotFoundException(id));
    }

    @DeleteMapping("/api/todos/{id}")
    public void deleteTodo(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
