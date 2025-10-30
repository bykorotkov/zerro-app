import { useEffect, useState } from "react";
import type { Message } from "@/features/chat/model/types.ts";
import type { Socket } from "socket.io-client";
import { io } from "socket.io-client";

export const useChat = (lessonId: string, userId: string) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const newSocket = io(`url`, {
            auth: { userId },
        });

        newSocket.emit(`joinLesson`, lessonId);

        newSocket.on(`newMessage`, (message: Message) => {
            setMessages((prev) => [...prev, message]);
        });

        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, [lessonId, userId]);

    const sendMessage = (text: string) => {
        if (!socket) return;
        socket.emit(`sendMessage`, { lessonId, text });
    };

    return { messages, sendMessage };
};
