package com.gorchilov.backend.controllers;

import com.gorchilov.backend.services.IndexService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
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

}
