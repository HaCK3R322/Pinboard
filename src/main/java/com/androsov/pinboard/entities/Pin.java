package com.androsov.pinboard.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.sql.Date;
import java.sql.Timestamp;

@Entity
@Table(name = "pins")
@AllArgsConstructor
@ToString
public class Pin {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Getter @Setter private Integer id;
    @Getter @Setter private String groupName;
    @Size(max = 2048)
    @Getter @Setter private String description;
    @Getter @Setter private String color;
    @Getter @Setter private Integer authorId;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSX")
    @Getter @Setter private Timestamp dateCreation;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSX")
    @Getter @Setter private Timestamp dateCompletion;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSX")
    @Getter @Setter private Timestamp dateDeadline;
    @Getter @Setter private String priority;
    @Getter @Setter private String status;

    protected Pin() {}
}




