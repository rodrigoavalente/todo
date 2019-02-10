package com.rvalente.todo.models;

import com.rvalente.todo.enums.TodoStatus;

import javax.persistence.*;

@Entity
public class Todo {
    @Id
    @GeneratedValue
    private long id;
    private String content;
    private TodoStatus status = TodoStatus.OPEN;


    public Todo() {
        super();
    }

    public Todo(long id, String content) {
        this.id = id;
        this.content = content;
    }

    public Todo(String content) {
        this.content = content;
    }

    public long getId() {
        return id;
    }

    public String getContent() {
        return content;
    }

    public TodoStatus getStatus() { return status; }

    public void setId(long id) {
        this.id = id;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setStatus(TodoStatus status) { this.status = status; }

    @Override
    public String toString() {
        return String.format("TODO Nº: %d - %s", this.id, this.content);
    }

}
