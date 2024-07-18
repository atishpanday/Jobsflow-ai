import React from "react";

interface ChatBubbleProps {
    message: string,
    sender: string,
};

export default function ChatBubble({ message, sender }: ChatBubbleProps) {
    return (
        <div
            className={`w-3/4 max-w-3/4 p-4 my-2 rounded-lg flex justify-center items-center ${sender === "User" ? "bg-gray-300 self-start text-start" : "bg-blue-500 self-end text-end"} ${sender === "Interviewer" && "text-white"}`}>
            {message}
        </div>
    );
}