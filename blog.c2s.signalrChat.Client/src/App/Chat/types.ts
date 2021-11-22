import React, { SetStateAction } from "react"
import { Message } from "../types"

export type ChatDataProps = {
    newMessage: string
    setNewMessage: React.Dispatch<SetStateAction<string>>
}

export type ChatInputProps = {
    currentConnectionId: string | null | undefined,
    messages: Message[],
    sendMessage: (message: string) => void
}