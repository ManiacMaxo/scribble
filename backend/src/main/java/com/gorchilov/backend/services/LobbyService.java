package com.gorchilov.backend.services;

import com.gorchilov.backend.models.Lobby;
import com.gorchilov.backend.utils.ResponseLobby;
import com.gorchilov.backend.utils.WordDictionary;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
public class LobbyService {
    private final ArrayList<Lobby> lobbies = new ArrayList<>();
    private final ArrayList<Lobby> privateLobbies = new ArrayList<>();

    public ArrayList<ResponseLobby> getLobbies(int max) {
        ArrayList<ResponseLobby> res = new ArrayList<>();
        this.lobbies.forEach(lobby -> res.add(new ResponseLobby(lobby)));
        return res;
    }

    public String findLobby() {
        if (this.lobbies.size() == 0) return createLobby().getId();

        List<Lobby> openLobbies = this.lobbies.stream().filter(lobby ->
                lobby.getPlayers().size() != lobby.getMaxPlayers()
        ).collect(Collectors.<Lobby>toList());
        return openLobbies.get(new Random().nextInt(openLobbies.size())).getId();
    }

    public Lobby findLobby(String id) {
        return this.lobbies.stream().filter(lobby -> lobby.getId().equals(id)).findFirst().orElseThrow();
    }

    public Lobby createLobby() {
        Lobby newLobby = new Lobby();
        this.lobbies.add(newLobby);
        return newLobby;
    }

    public Lobby createLobby(int maxRounds, int timePerRound, int maxPlayers, WordDictionary wordDictionary, boolean isPrivate) {
        Lobby newLobby = new Lobby(maxRounds, timePerRound, maxPlayers, wordDictionary);
        if (isPrivate) {
            this.privateLobbies.add(newLobby);
        } else {
            this.lobbies.add(newLobby);
        }
        return newLobby;
    }

}
