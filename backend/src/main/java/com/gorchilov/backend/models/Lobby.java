package com.gorchilov.backend.models;

import com.gorchilov.backend.utils.WordDictionary;

import java.util.Collections;
import java.util.Random;
import java.util.Set;

public class Lobby {
    private final String id;
    private final int maxRounds;
    private final int maxRoundTime;
    private final int maxPlayers;
    private final WordDictionary wordDictionary;
    private int passedRounds;
    private Set<Player> players = Collections.emptySet();

    public Lobby() {
        this.passedRounds = 0;
        this.id = this.generateId();
        this.maxRounds = 6;
        this.maxRoundTime = 150;
        this.maxPlayers = 9;
        this.wordDictionary = WordDictionary.GENERAL;
    }

    public Lobby(int maxRounds, int maxRoundTime, int maxPlayers, WordDictionary wordDictionary) {
        this.passedRounds = 0;
        this.id = this.generateId();
        this.maxRounds = Math.min(maxRounds, 10);
        this.maxRoundTime = Math.min(maxRoundTime, 200);
        this.maxPlayers = Math.min(maxPlayers, 15);
        this.wordDictionary = wordDictionary;
    }

    private String generateId() {
        // generate random alphanumeric string with length 5
        return new Random().ints(48, 123)
                .filter(i -> (i <= 57 || i >= 97))
                .limit(5)
                .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                .toString();
    }

    public String getId() {
        return id;
    }

    public int getMaxRounds() {
        return maxRounds;
    }

    public int getMaxRoundTime() {
        return maxRoundTime;
    }

    public int getMaxPlayers() {
        return maxPlayers;
    }

    public int getPassedRounds() {
        return passedRounds;
    }

    public WordDictionary getWordDictionary() {
        return wordDictionary;
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
        this.passedRounds = 0;
        players.forEach(Player::resetPoints);
    }
}
