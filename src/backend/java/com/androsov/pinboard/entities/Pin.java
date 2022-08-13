package com.androsov.pinboard.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.sql.Date;

@Entity
@Table(name = "pins")
@AllArgsConstructor
@ToString
public class Pin {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Getter @Setter private Integer id;
    @Getter @Setter private String groupName;
    @Getter @Setter private String description;
    @Getter @Setter private String color;
    @Getter @Setter private Integer authorId;
    @Getter @Setter private Date dateCreation;
    @Getter @Setter private Date dateCompletion;
    @Getter @Setter private Date dateDeadline;
    @Getter @Setter private Integer priority;
    @Getter @Setter private String status;

    protected Pin() {}
}




