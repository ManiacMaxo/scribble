package com.gorchilov.backend.controllers;

import com.gorchilov.backend.models.Lobby;
import com.gorchilov.backend.services.LobbyService;
import com.gorchilov.backend.utils.Dictionary;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
public class IndexController {
    private final LobbyService lobbyService;

    public IndexController(LobbyService service) {
        this.lobbyService = service;
    }

    @RequestMapping("favicon.ico")
    @ResponseBody
    void returnNoFavicon() {
    }

    @GetMapping("/find")
    public String findLobby() {
        return lobbyService.findLobby();
    }

    @GetMapping("/create")
    public String createPrivateLobby(@RequestParam int maxRounds, @RequestParam int timePerRound, @RequestParam int maxPlayers, @RequestParam String dictionary) {
        Dictionary.valueOf(dictionary);
        return lobbyService.createPrivateLobby(maxRounds, timePerRound, maxPlayers, Dictionary.valueOf(dictionary)).getId();
    }

    @GetMapping("/lobbies")
    public ArrayList<Lobby> getLobbies(@RequestParam int m) {
        return lobbyService.getLobbies(m);
    }

}
