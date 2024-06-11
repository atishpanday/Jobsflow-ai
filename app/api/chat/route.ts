import { Message } from "ai";
import { callChain } from "@/lib/langchain";
import { StreamingTextResponse } from "ai";

const formatMessage = (message: Message) => {
    return `${message.role === "user" ? "human" : "AI"}: ${message.content}`;
};

export const POST = async (req: Request) => {
    const { messages } = await req.json();
    const question = messages[messages.length - 1].content;
    const chat_history = messages.slice(0, messages.length - 1).map(formatMessage).join("\n");

    const streamText = await callChain({ question: question, chat_history: chat_history });

    // console.log(streamText);

    const textEncoder = new TextEncoder();

    const stream = new ReadableStream({
        async start(controller) {
            controller.enqueue(textEncoder.encode(streamText));
            controller.close();
        },
    });

    // const aiStream = async () => { for await (const chunk of stream) { return chunk.answer } };

    return new StreamingTextResponse(stream);
};