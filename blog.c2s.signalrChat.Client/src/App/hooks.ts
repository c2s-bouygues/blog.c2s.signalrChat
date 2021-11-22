import { useState } from "react";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { AppDataProps, Message, User } from "./types";

const useData = (): AppDataProps => {

  const [hubConnection, setHubConnection] = useState<signalR.HubConnection | undefined>(undefined);
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [currentRoom, setCurrentRoom] = useState<string>('');

  const joinRoom = async (user: string, room: string) => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl("https://localhost:7145/hub")
        .configureLogging(LogLevel.Information)
        .build();

      connection.on("ReceiveMessage", (connectionId, user, msg, srvTime) => {
        const newMsg: Message = {
          content: msg,
          userName: user,
          connectionId: connectionId,
          time: srvTime
        };

        setMessages((prevMessages) => [...prevMessages, newMsg]);
      });

      connection.on("UsersInRoom", (users) => {
        setUsers(users);
      });

      connection.onclose(() => {
        setHubConnection(undefined);
        setMessages([]);
        setUsers([]);
      });

      await connection.start();
      await connection.invoke("JoinRoom", { user, room });
      setHubConnection(connection);
      setCurrentRoom(room);
    } catch (e) {
      console.log(e);
      setCurrentRoom('');
    }
  }

  const sendMessage = async (message: string) => {
    try {
      await hubConnection?.invoke("SendMessage", message);
    } catch (e) {
      console.log(e);
    }
  }

  const closeConnection = async () => {
    try {
      setCurrentRoom('');
      await hubConnection?.stop();
    } catch (e) {
      console.log(e);
    }
  }

  return {
      connected: (hubConnection !== undefined),
      currentConnectionId: hubConnection?.connectionId,
      currentRoom,
      messages,
      users,
      joinRoom,
      sendMessage,
      closeConnection
  }
};

export default useData;