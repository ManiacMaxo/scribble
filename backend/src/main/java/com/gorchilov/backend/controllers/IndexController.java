package com.gorchilov.backend.controllers;

import org.json.simple.JSONArray;
import org.json.simple.JSONValue;
import org.json.simple.parser.ParseException;
import org.springframework.core.io.ClassPathResource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.Random;

@RestController
public class IndexController {

    @RequestMapping("favicon.ico")
    @ResponseBody
    void returnNoFavicon() {
    }

    @GetMapping("/")
    public String index() {
        return "Available API routes are: /find, /create, /word, /lobbies";
    }

    @GetMapping("/word")
    public String getRandomWord(HttpServletResponse response) throws IOException, ParseException {
        try {
            File file = new ClassPathResource("words.json").getFile();
            JSONArray words = (JSONArray) JSONValue.parse(new FileReader(file));

            return (String) words.get(new Random().nextInt(words.toArray().length));

        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            return "";
        }
    }
}
