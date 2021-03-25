package com.gorchilov.backend.controllers;

import com.gorchilov.backend.services.IndexService;
import com.gorchilov.backend.utils.Dictionary;
import org.springframework.web.bind.annotation.*;

@RestController
public class IndexController {
    private final IndexService service;

    public IndexController(IndexService service) {
        this.service = service;
    }

    @RequestMapping("favicon.ico")
    @ResponseBody
    void returnNoFavicon() {
    }

    @GetMapping("/find")
    public String findLobby() {
        return service.findLobby();
    }

    @GetMapping("/create")
    public String createPrivateLobby(@RequestParam int maxRounds, @RequestParam int timePerRound, @RequestParam int maxPlayers, @RequestParam String dictionary) {
        Dictionary.valueOf(dictionary);
        return service.createPrivateLobby(maxRounds, timePerRound, maxPlayers, Dictionary.valueOf(dictionary)).getId();
    }

}
