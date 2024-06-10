import z from "zod";

const envSchema = z.object({
    OPENAI_API_KEY: z.string().trim().min(1),
    OPENAI_EMBEDDING_MODEL: z.string().trim().min(1),
    GEMINI_API_KEY: z.string().trim().min(1),
    COHERE_API_KEY: z.string().trim().min(1),
    PINECONE_API_KEY: z.string().trim().min(1),
    PINECONE_INDEX: z.string().trim().min(1),
    PINECONE_NAMESPACE: z.string().trim().min(1),
    PINECONE_ENVIRONMENT: z.string().trim().min(1),
});

export const env = envSchema.parse(process.env);