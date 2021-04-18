package com.gorchilov.backend.models;

import com.gorchilov.backend.utils.WordDictionary;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Data
public class Words {
    @Id
    @GeneratedValue()
    private Integer id;

    private WordDictionary wordDictionary;
}
