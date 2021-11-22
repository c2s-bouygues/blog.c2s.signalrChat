import React from "react";
import useData from "./hooks";
import { messageListStyle, messageItemBoxStyle, messageInputAreaStyle } from "./styles";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  TextField,
  Divider,
  Fab,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { ChatInputProps } from "./types";

const Chat: React.FC<ChatInputProps> = ({
  currentConnectionId,
  messages,
  sendMessage
}) => {
  const { newMessage, setNewMessage } = useData();
  
  return (
    <>
      <List sx={messageListStyle}>
        {messages.map(({ userName, time, content, connectionId }, idx) => (
          <ListItem key={idx} sx={{ justifyContent: (currentConnectionId === connectionId) ? 'flex-end' : 'flex-start' }}>
            <Box sx={messageItemBoxStyle}>
              <ListItemText primary={content}></ListItemText>
              <ListItemText secondary={time ? `${userName} - ${time}` : userName}></ListItemText>
            </Box>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box sx={messageInputAreaStyle}>
        <TextField
          label="Tapez votre message"
          value={newMessage}
          onChange={(msg) => setNewMessage(msg.currentTarget.value)}
          sx={{ width: '90%' }}
        ></TextField>
        <Fab color="primary" aria-label="add">
          <SendIcon
            onClick={() => {
              sendMessage(newMessage);
              setNewMessage('');
            }}
          />
        </Fab>
      </Box>
    </>
  );
};

export default Chat;
