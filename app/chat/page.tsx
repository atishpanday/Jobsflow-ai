"use client";
import { useChat } from "ai/react";
import ReactMarkdown from 'react-markdown';

const Chat = () => {
    const { messages, input, handleInputChange, handleSubmit } = useChat();
    return (
        <div>
            {messages.map((m) => (
                <div key={m.id}>
                    {m.role === "user" ? "User: " : "AI: "}
                    <ReactMarkdown>{m.content}</ReactMarkdown>
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