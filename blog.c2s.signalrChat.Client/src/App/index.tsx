import React from 'react';
import { Paper, Box, Typography, IconButton } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Clients from './Clients';
import Chat from './Chat';
import Lobby from './Lobby';
import useData from './hooks';
import { mainBoxStyle, headerStyle, chatHubWrapperStyle, chatHubStyle, clientsFeedStyle, chatStyle } from './styles';

const App: React.FC = () => {
  
  const {
    connected,
    currentConnectionId,
    currentRoom,
    messages,
    users,
    joinRoom,
    sendMessage,
    closeConnection
  } = useData();
  
  return (
    <>
      {!connected ? (
        <Lobby joinRoom={joinRoom} />
      ) : (
        <Box sx={mainBoxStyle}>
          <Box sx={headerStyle}>
            <Typography variant="h5">{`Salon - ${currentRoom}`}</Typography>
            <IconButton color="error" onClick={() => closeConnection()}>
              <ExitToAppIcon />
            </IconButton>
          </Box>
          <Box component={Paper} elevation={5} sx={chatHubWrapperStyle}>
            <Box sx={chatHubStyle}>
              <Box sx={clientsFeedStyle}>
                <Clients users={users} />
              </Box>
              <Box sx={chatStyle}>
                <Chat messages={messages} sendMessage={sendMessage} currentConnectionId={currentConnectionId} />
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default App;
