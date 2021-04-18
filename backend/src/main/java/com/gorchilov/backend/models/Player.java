package com.gorchilov.backend.models;

import java.net.Socket;
import java.util.UUID;

public class Player {
    private final UUID id;
    private final String name;
    private int points;
    private Socket socket;

    public Player(String name, int points) {
        this.id = UUID.randomUUID();
        this.name = name;
        this.points = points;
    }

    public UUID getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public int getPoints() {
        return points;
    }

    public void addPoints(int points) {
        this.points += points;
    }

    public void resetPoints() {
        this.points = 0;
    }

    public Socket getSocket() {
        return socket;
    }

    public void setSocket(Socket socket) {
        this.socket = socket;
    }
}
