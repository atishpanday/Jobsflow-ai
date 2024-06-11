import { CohereEmbeddings } from "@langchain/cohere";
import { env } from "./config";

export const cohereEmbedding = new CohereEmbeddings({
    apiKey: env.COHERE_API_KEY,
});