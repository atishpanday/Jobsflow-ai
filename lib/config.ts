import z from "zod";

const envSchema = z.object({
    GEMINI_API_KEY: z.string().trim().min(1),
    COHERE_API_KEY: z.string().trim().min(1),
    PINECONE_API_KEY: z.string().trim().min(1),
    PINECONE_INDEX: z.string().trim().min(1),
    PINECONE_NAMESPACE: z.string().trim().min(1),
    PINECONE_ENVIRONMENT: z.string().trim().min(1),
});

export const env = envSchema.parse(process.env);