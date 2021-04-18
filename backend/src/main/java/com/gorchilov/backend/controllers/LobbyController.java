package com.gorchilov.backend.controllers;

import com.gorchilov.backend.models.Lobby;
import com.gorchilov.backend.services.LobbyService;
import com.gorchilov.backend.utils.RequestLobbyOptions;
import com.gorchilov.backend.utils.ResponseLobby;
import com.gorchilov.backend.utils.WordDictionary;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
public class LobbyController {
    private final LobbyService lobbyService;

    public LobbyController(LobbyService service) {
        this.lobbyService = service;
    }

    @GetMapping("/find")
    public String findLobby() {
        return lobbyService.findLobby();
    }

    @PostMapping("/create")
    public String createLobby(@RequestBody RequestLobbyOptions lobbyOptions) {
        return lobbyService.createLobby(
                lobbyOptions.rounds,
                lobbyOptions.time,
                lobbyOptions.players,
                WordDictionary.valueOf(lobbyOptions.dictionary),
                lobbyOptions.isPrivate
        ).getId();
    }

    @GetMapping("/lobbies")
    public ArrayList<ResponseLobby> getLobbies(@RequestParam(value = "m", defaultValue = "10") int max) {
        return lobbyService.getLobbies(max);
    }

    @MessageMapping("/play/{id}")
    @SendTo("/play/{id}")
    public Lobby connection(@RequestParam String id) {
        return this.lobbyService.findLobby(id);
    }

}
