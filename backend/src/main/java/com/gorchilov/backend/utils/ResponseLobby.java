package com.gorchilov.backend.utils;

import com.gorchilov.backend.models.Lobby;

public class ResponseLobby {
    public String name;
    public String id;
    public int round;
    public int maxRounds;
    public int maxRoundTime;
    public int maxPlayers;
    public int players;

    public ResponseLobby(Lobby lobby) {
        this.id = lobby.getId();
        this.name = "Lobby " + this.id;
        this.round = lobby.getPassedRounds();
        this.maxRounds = lobby.getMaxRounds();
        this.maxRoundTime = lobby.getMaxRoundTime();
        this.maxPlayers = lobby.getMaxPlayers();
        this.players = lobby.getPlayers().size();
    }
}
