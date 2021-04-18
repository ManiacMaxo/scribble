package com.gorchilov.backend.services;

import com.gorchilov.backend.models.Lobby;
import org.junit.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.anyObject;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
public class LobbyServiceTest {
    @Mock
    private LobbyService lobbyServiceMock;

    @BeforeEach
    void setup() {
        this.lobbyServiceMock = new LobbyService();
    }

    @Test
    public void findLobby() {
        String lobby = lobbyServiceMock.findLobby();
        assertThat(lobby).isNotNull();
        verify(lobbyServiceMock, times(1)).findLobby(anyObject());
    }

    @Test
    public void findLobbyById() {
        Lobby lobby = lobbyServiceMock.createLobby();
        Lobby found = lobbyServiceMock.findLobby(lobby.getId());
        assertThat(lobby.equals(found)).isTrue();
    }

    @Test
    public void createLobby() {
        Lobby lobby = new Lobby();
        lobbyServiceMock.createLobby(lobby.getMaxRounds(),
                lobby.getMaxRoundTime(),
                lobby.getMaxPlayers(),
                lobby.getWordDictionary(),
                false);
        assertThat(lobbyServiceMock.findLobby(lobby.getId())).isNotNull();
    }
}
