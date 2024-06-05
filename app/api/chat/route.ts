import { streamText } from "ai";
// import { createOpenAI } from "@ai-sdk/openai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import context from "./context";

const gemini = createGoogleGenerativeAI({
    apiKey: process.env.GEMINI_API_KEY,
})

export const POST = async (req: Request) => {
    const { messages } = await req.json();
    const result = await streamText({
        model: gemini("models/gemini-1.5-pro-latest"),
        prompt: `Context:\n${context}\n\n${messages}`,
    });
    return result.toAIStreamResponse();
};