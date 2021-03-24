package com.gorchilov.backend.services;

import com.gorchilov.backend.models.Lobby;
import com.gorchilov.backend.utils.Dictionary;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.Random;
import java.util.Set;
import java.util.UUID;

@Service
public class IndexService {
    private ArrayList<Lobby> lobbies;
    private ArrayList<Lobby> privateLobbies;

    public String findLobby() {
        if (this.lobbies.size() == 0) { // create new lobby if none exist
            return createLobby().getId();
        }
        // get random lobby from pool
        return this.lobbies.get(new Random().nextInt(this.lobbies.size())).getId();
    }

    private Lobby createLobby() {
        Lobby newLobby = new Lobby();
        this.lobbies.add(newLobby);
        return newLobby;
    }

    public Lobby createPrivateLobby(int maxRounds, int timePerRound, int maxPlayers, Dictionary dictionary) {
        Lobby newLobby = new Lobby(maxRounds, timePerRound, maxPlayers, dictionary);
        this.privateLobbies.add(newLobby);
        return newLobby;
    }
}
