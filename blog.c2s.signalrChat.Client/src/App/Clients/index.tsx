import React from "react";
import { List, ListItem, ListItemText } from "@mui/material";
import { clientsListStyle } from './styles';
import { ClientsInputProps } from './types';

const Clients: React.FC<ClientsInputProps> = ({ users }) => {
  return (
    <List sx={clientsListStyle}>
      {users.map((name, idx) => (
        <ListItem key={idx}>
          <ListItemText primary={name} sx={{ whiteSpace: 'normal' }}></ListItemText>
        </ListItem>
      ))}
    </List>
  );
};

export default Clients;