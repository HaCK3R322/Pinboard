package com.androsov.pinboard.entities;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "pin_tags")
public class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer id;
    private Integer pinId;
    private String description;

    protected Tag() {}

    public Tag(Integer id, Integer pinId, String description) {
        this.id = id;
        this.pinId = pinId;
        this.description = description;
    }

    @Override
    public String toString() {
        return "Tag{" +
                "id=" + id +
                ", pinId=" + pinId +
                ", description='" + description + '\'' +
                '}';
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getPinId() {
        return pinId;
    }

    public void setPinId(Integer pinId) {
        this.pinId = pinId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
