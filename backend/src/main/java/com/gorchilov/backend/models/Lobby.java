package com.gorchilov.backend.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.Set;

@Entity
public class Lobby {
    @Id
    @GeneratedValue
    Integer id;
    String uuid;
    @OneToMany
    Set<Player> players;
}
