import { OpenAIEmbeddings } from "@langchain/openai";
import { CohereEmbeddings } from "@langchain/cohere";
import { env } from "./config";

export const openaiEmbedding = new OpenAIEmbeddings({
    apiKey: env.OPENAI_API_KEY,
    model: env.OPENAI_EMBEDDING_MODEL,
});

export const cohereEmbedding = new CohereEmbeddings({
    apiKey: env.COHERE_API_KEY,
});