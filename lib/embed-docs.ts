import { PineconeStore } from "@langchain/pinecone";
import { cohereEmbedding } from "./embedding";
import { env } from "./config";
import { Pinecone } from "@pinecone-database/pinecone";

export const embedDocs = async (pc: Pinecone, docs: any) => {
    try {
        const index = pc.index(env.PINECONE_INDEX);
        await PineconeStore.fromDocuments(docs, cohereEmbedding, {
            pineconeIndex: index,
            namespace: env.PINECONE_NAMESPACE,
            textKey: "text",
        });
    } catch (error) {
        console.log(error);
    }
}