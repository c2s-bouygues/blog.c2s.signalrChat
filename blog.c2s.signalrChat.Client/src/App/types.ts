export type AppDataProps = {
    connected: boolean,
    currentConnectionId: string | null | undefined,
    currentRoom: string,
    messages: Message[],
    users: User[],
    joinRoom: (user: string, room: string) => void,
    sendMessage: (message: string) => void,
    closeConnection: () => void
}

export type Message = {
    connectionId: string | null,
    userName: string | undefined,
    content: string,
    time: string | undefined
}

export type User = {
    name: string,
    room: string,    
    userId: string
}