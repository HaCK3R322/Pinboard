package com.androsov.pinboard.entities;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Table(name = "pins")
public class Pin {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer id;
    private String group_name;
    private String description;
    private String color;
    private String author;
    private Date date_creation;
    private Date date_completion;
    private Date date_deadline;
    private Integer priority;
    private String status;

    protected Pin() {}

    public Pin(Integer id,
               String group_name,
               String text,
               String color,
               String author,
               Date date_creation,
               Date date_completion,
               Date date_deadline,
               Integer priority,
               String status) {
        this.id = id;
        this.group_name = group_name;
        this.description = text;
        this.color = color;
        this.author = author;
        this.date_creation = date_creation;
        this.date_completion = date_completion;
        this.date_deadline = date_deadline;
        this.priority = priority;
        this.status = status;
    }

    @Override
    public String toString() {
        return "Pin{" +
                "id=" + id +
                ", group_name='" + group_name + '\'' +
                ", description='" + description + '\'' +
                ", color='" + color + '\'' +
                ", author='" + author + '\'' +
                ", date_creation=" + date_creation +
                ", date_completion=" + date_completion +
                ", date_deadline=" + date_deadline +
                ", priority=" + priority +
                ", status='" + status + '\'' +
                '}';
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getGroup_name() {
        return group_name;
    }

    public void setGroup_name(String group_name) {
        this.group_name = group_name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public Date getDate_creation() {
        return date_creation;
    }

    public void setDate_creation(Date date_creation) {
        this.date_creation = date_creation;
    }

    public Date getDate_completion() {
        return date_completion;
    }

    public void setDate_completion(Date date_completion) {
        this.date_completion = date_completion;
    }

    public Date getDate_deadline() {
        return date_deadline;
    }

    public void setDate_deadline(Date date_deadline) {
        this.date_deadline = date_deadline;
    }

    public Integer getPriority() {
        return priority;
    }

    public void setPriority(Integer priority) {
        this.priority = priority;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
