import { useState } from "react";
import { ChatDataProps } from "./types";

const useData = (): ChatDataProps => {
    const [newMessage, setNewMessage] = useState<string>("");

    return {
        newMessage,
        setNewMessage,
    };
};

export default useData;