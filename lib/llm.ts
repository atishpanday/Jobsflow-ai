import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { env } from "./config";

export const streamingModel = new ChatGoogleGenerativeAI({
    apiKey: env.GEMINI_API_KEY,
    model: "gemini-1.5-pro-latest",
    temperature: 0,
    streaming: true,
});

export const nonStreamingModel = new ChatGoogleGenerativeAI({
    apiKey: env.GEMINI_API_KEY,
    model: "gemini-1.5-pro-latest",
    temperature: 0,
    streaming: false,
});

