import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { env } from "./config";

export const gemini = createGoogleGenerativeAI({
    apiKey: env.GEMINI_API_KEY,
});

export const gemini_model = gemini("models/gemini-1.5-pro-latest");