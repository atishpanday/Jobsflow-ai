import { Pinecone } from "@pinecone-database/pinecone";
import { env } from "./config";
import { PineconeStore } from "@langchain/pinecone";
import { cohereEmbedding } from "./embedding";

export const getPineconeClient = async () => {
    const pc = new Pinecone({
        apiKey: env.PINECONE_API_KEY,
    });

    return pc;
};

export const createIndex = async (pc: Pinecone, indexName: string) => {
    await pc.createIndex({
        name: indexName,
        dimension: 1024,
        metric: 'cosine',
        spec: {
            serverless: {
                cloud: 'aws',
                region: env.PINECONE_ENVIRONMENT,
            }
        }
    });
}

export const getVectorStore = async (pc: Pinecone) => {
    const index = pc.index(env.PINECONE_INDEX);
    const vectorStore = await PineconeStore.fromExistingIndex(cohereEmbedding, {
        pineconeIndex: index,
        namespace: env.PINECONE_NAMESPACE,
        textKey: "text",
    })
    return vectorStore;
}
