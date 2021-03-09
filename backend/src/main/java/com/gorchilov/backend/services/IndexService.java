package com.gorchilov.backend.services;

import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class IndexService {

    public String findLobby() {

        return UUID.randomUUID().toString();
    }
}
