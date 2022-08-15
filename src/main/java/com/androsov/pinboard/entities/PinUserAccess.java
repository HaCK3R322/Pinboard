package com.androsov.pinboard.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
@Table(name = "pin_user_accesses")
@AllArgsConstructor
public class PinUserAccess {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Getter @Setter private Integer id;
    @Getter @Setter private Integer pinId;
    @Getter @Setter private Integer userId;

    protected PinUserAccess() {}

    public PinUserAccess(Integer pinId, Integer userId) {
        this.pinId = pinId;
        this.userId = userId;
    }
}
