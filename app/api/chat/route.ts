import { Message } from "ai";
import { callChain } from "@/lib/lanchain";

const formatMessage = (message: Message) => {
    return `${message.role === "user" ? "Human" : "Assistant"}: ${message.content}`;
};

export const POST = async (req: Request) => {
    const { messages } = await req.json();
    const question = messages[messages.length - 1].content;
    console.log(question);
    const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage);
    console.log("Chat history: ", formattedPreviousMessages.join("\n"));
    const streamingTextResponse = callChain(question, formattedPreviousMessages.join("\n"),);

    return streamingTextResponse;
}