"use client";
import { Message } from "ai";
import { useChat } from "@ai-sdk/react";
import ReactMarkdown from 'react-markdown';

export const initialMessages: Message[] = [
    {
        role: "assistant",
        id: "0",
        content: "Hi! I am your AI assistant. Ask me anything about this website!",
    },
];

const Chat = () => {
    const { messages, input, handleInputChange, handleSubmit } = useChat({
        initialMessages,
        streamMode: "text",
    });
    return (
        <div>
            {messages.map((m) => (
                <div key={m.id}>
                    <ReactMarkdown>{`${m.role === "user" ? "User: " : "AI: "} ${m.content}`}</ReactMarkdown>
                </div>
            ))}
            <form onSubmit={handleSubmit}>
                <input
                    value={input}
                    placeholder="Say something..."
                    onChange={handleInputChange}
                />
            </form>
        </div>
    );
};

export default Chat;