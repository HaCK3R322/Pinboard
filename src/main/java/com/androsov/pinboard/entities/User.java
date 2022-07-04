package com.androsov.pinboard.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

//TODO: make all values NotNull (create validators)

@Entity
@Table(name = "users")
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Getter @Setter private Integer id;
    @Getter @Setter private String username;
    @Getter @Setter private String password;

    protected User() {}
}
