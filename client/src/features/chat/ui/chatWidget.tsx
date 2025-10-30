import { useState } from "react";
import { useChat } from "@/features/chat/lib/useChat.ts";
import classes from "./chatWidget.module.scss";

type ChatWidgetProps = {
    lessonId: string;
    userId: string;
};

export const ChatWidget = ({ lessonId, userId }: ChatWidgetProps) => {
    const [input, setInput] = useState(``);
    const { messages, sendMessage } = useChat(lessonId, userId);

    return (
        <div className={classes.Chat}>
            <div className={classes.Messages}>
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={classes.Message}
                    >
                        {msg.text}
                    </div>
                ))}
            </div>

            <input
                type={`text`}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={`...сообщение`}
            />

            <button
                onClick={() => {
                    sendMessage(input);
                    setInput(``);
                }}
            >
                Отправить
            </button>
        </div>
    );
};
