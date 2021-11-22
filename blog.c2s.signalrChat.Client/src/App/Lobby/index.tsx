import React, { useState } from 'react';
import { Box, FormGroup, FormControl, TextField, ButtonGroup, Button } from '@mui/material';
import { LobbyInputProps } from './types';
import { lobbyBoxStyle } from './styles';

const Lobby: React.FC<LobbyInputProps> = (lobbyProps: LobbyInputProps) => {  
  const [user, setUser] = useState('');
  const [room, setRoom] = useState('');

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        lobbyProps.joinRoom(user, room);
      }}
    >
      <Box sx={lobbyBoxStyle}>
        <FormGroup>
          <FormControl sx={{paddingBottom: '0.5vw'}}>
            <TextField placeholder="Nom" value={user} onChange={(e) => setUser(e.currentTarget.value)}></TextField>
          </FormControl>
          <FormControl>
            <TextField placeholder="Salon" value={room} onChange={(e) => setRoom(e.currentTarget.value)}></TextField>
          </FormControl>
        </FormGroup>
        <ButtonGroup variant="outlined">
          <Button color="primary" type="submit" disabled={!user || !room}>
            Rejoindre
          </Button>
        </ButtonGroup>
      </Box>
    </form>
  );
};

export default Lobby;
