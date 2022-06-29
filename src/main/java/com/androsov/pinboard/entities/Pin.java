package com.androsov.pinboard.entities;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.sql.Date;

@Entity
@Table(name = "pins")
public class Pin {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer id;
    private String groupName;
    private String description;
    private String color;
    private String author;
    private Date dateCreation;
    private Date dateCompletion;
    private Date dateDeadline;
    private Integer priority;
    @NotBlank(message = "Status must no be blank")
    private String status;

    protected Pin() {}

    public Pin(Integer id, String groupName, String description, String color, String author, Date dateCreation, Date dateCompletion, Date dateDeadline, Integer priority, String status) {
        this.id = id;
        this.groupName = groupName;
        this.description = description;
        this.color = color;
        this.author = author;
        this.dateCreation = dateCreation;
        this.dateCompletion = dateCompletion;
        this.dateDeadline = dateDeadline;
        this.priority = priority;
        this.status = status;
    }

    @Override
    public String toString() {
        return "{" +
                "id=" + id +
                ", groupName='" + groupName + '\'' +
                ", description='" + description + '\'' +
                ", color='" + color + '\'' +
                ", author='" + author + '\'' +
                ", dateCreation=" + dateCreation +
                ", dateCompletion=" + dateCompletion +
                ", dateDeadline=" + dateDeadline +
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

    public String getGroupName() {
        return groupName;
    }

    public void setGroupName(String groupName) {
        this.groupName = groupName;
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

    public Date getDateCreation() {
        return dateCreation;
    }

    public void setDateCreation(Date dateCreation) {
        this.dateCreation = dateCreation;
    }

    public Date getDateCompletion() {
        return dateCompletion;
    }

    public void setDateCompletion(Date dateCompletion) {
        this.dateCompletion = dateCompletion;
    }

    public Date getDateDeadline() {
        return dateDeadline;
    }

    public void setDateDeadline(Date dateDeadline) {
        this.dateDeadline = dateDeadline;
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
