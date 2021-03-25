package com.gorchilov.backend.models;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Data
public class Game {
    @Id
    @GeneratedValue()
    private Integer id;

    private String words;
}
