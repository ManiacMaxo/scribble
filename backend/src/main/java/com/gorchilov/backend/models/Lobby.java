package com.gorchilov.backend.models;

import com.gorchilov.backend.utils.Dictionary;

import java.util.Random;
import java.util.Set;

public class Lobby {
    private final String id;
    private final int maxRounds;
    private final int timePerRound;
    private final int maxPlayers;
    private final Dictionary dictionary;
    private Set<Player> players;
    private int passedRounds;

    public Lobby() {
        this.passedRounds = 0;
        this.id = this.generateId();
        this.maxRounds = 4;
        this.timePerRound = 150;
        this.maxPlayers = 9;
        this.dictionary = Dictionary.GENERAL;
    }

    public Lobby(int maxRounds, int timePerRound, int maxPlayers, Dictionary dictionary) {
        this.passedRounds = 0;
        this.id = this.generateId();
        this.maxRounds = maxRounds;
        this.timePerRound = timePerRound;
        this.maxPlayers = maxPlayers;
        this.dictionary = dictionary;
    }

    private String generateId() {
        // generate random alphanumeric string with length 5
        return new Random().ints(48, 123)
                .filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97))
                .limit(5)
                .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                .toString();
    }

    public String getId() {
        return id;
    }

    public Set<Player> getPlayers() {
        return players;
    }

    public void addPlayer(Player player) {
        this.players.add(player);
    }

    public void removePlayer(Player player) {
        this.players.removeIf(p -> p.equals(player));
    }

    public void passRound() {
        this.passedRounds++;
        if (this.passedRounds == this.maxRounds) {
            this.endGame();
        }
    }

    private void endGame() {

    }
}
