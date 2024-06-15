"use client";
import ReactMarkdown from 'react-markdown';
import { useState } from "react";

type Message = {
    id: string,
    role: string,
    content: string,
};

export const initialMessages: Message[] = [
    {
        role: "assistant",
        id: "0",
        content: "Hi! I am your AI assistant. Ask me anything about this website!",
    },
];

async function* getMessageResponse(messages: Message[]) {
    const response = await fetch("http://127.0.0.1:8000/api/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(messages),
    });
    if (!response.body) {
        return "No response received";
    }
    // const chunk = await response.text();
    const textDecoder = new TextDecoder("utf-8");
    const reader = response.body?.getReader();

    while (true) {
        const { done, value } = await reader.read();
        if (done) {
            break;
        }

        yield* textDecoder.decode(value, { stream: true });
    }
};

function Chat() {
    // const { messages, input, handleInputChange, handleSubmit } = useChat({
    //     initialMessages,
    //     streamMode: "text",
    // });

    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [lastAIMessage, setLastAIMessage] = useState<string | null>(null);
    const [input, setInput] = useState<string>("");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const userMessage: Message = {
            id: messages.length.toString(),
            role: "user",
            content: input,
        }
        setMessages(prev => [...prev, {
            id: prev.length.toString(),
            role: "user",
            content: input
        }]);
        setInput("");
        const currMessages = [...messages, userMessage];
        const aiMessageId = (messages.length + 1).toString();
        setMessages((prev) => [
            ...prev,
            {
                id: aiMessageId,
                role: "assistant",
                content: "",
            },
        ]);

        let aiMessageContent = "";
        for await (const chunk of getMessageResponse(currMessages)) {
            aiMessageContent += chunk
            setMessages((prev) =>
                prev.map((msg) =>
                    msg.id === aiMessageId
                        ? { ...msg, content: aiMessageContent }
                        : msg
                )
            );
        }
    };

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        setInput(e.currentTarget.value);
    };

    return (
        <div className="mx-auto max-w-md">
            {messages.map((m) => (
                <div key={m.id}>
                    <ReactMarkdown>{`${m.role === "user" ? "User: " : "AI: "} ${m.content}`}</ReactMarkdown>
                </div>
            ))}
            {lastAIMessage && <div>
                <ReactMarkdown>{`${"AI: "} ${lastAIMessage}`}</ReactMarkdown>
            </div>}
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