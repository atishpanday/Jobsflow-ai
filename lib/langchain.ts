import { getPineconeClient, getVectorStore } from "./pinecone-client";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { createHistoryAwareRetriever } from "langchain/chains/history_aware_retriever";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createRetrievalChain } from "langchain/chains/retrieval";

import { nonStreamingModel, streamingModel } from "./llm";


type ConversationalRetrievalQAChainInput = {
    question: string;
    chat_history: string;
};

const contextualizeQSystemPrompt = `
Given a chat history and the latest user question
which might reference context in the chat history,
formulate a standalone question which can be understood
without the chat history. Do NOT answer the question, just
reformulate it if needed and otherwise return it as is.`;

const qaSystemPrompt = `
You are an assistant for question-answering tasks. Use
the following pieces of retrieved context to answer the
question. If you don't know the answer, just say that you
don't know. Use three sentences maximum and keep the answer
concise.
\n\n
{context}`;

export const callChain = async ({ question, chat_history }: ConversationalRetrievalQAChainInput) => {
    const sanitizedQuestion = question.trim().replaceAll("\n", " ");
    const pc = await getPineconeClient();
    const vectorStore = await getVectorStore(pc);
    const retriever = vectorStore.asRetriever();

    const contextualizeQPrompt = ChatPromptTemplate.fromMessages([
        ["system", contextualizeQSystemPrompt],
        "\n{chat_history}\n",
        ["human", "{input}"],
    ]);

    const qaPrompt = ChatPromptTemplate.fromMessages([
        ["system", qaSystemPrompt],
        "\n{chat_history}\n",
        ["human", "{input}"],
    ]);

    const historyAwareRetriever = await createHistoryAwareRetriever({
        llm: nonStreamingModel,
        retriever: retriever,
        rephrasePrompt: contextualizeQPrompt,
    });

    const questionAnswerChain = await createStuffDocumentsChain({
        llm: streamingModel,
        prompt: qaPrompt,
    });

    const ragChain = await createRetrievalChain({
        retriever: historyAwareRetriever,
        combineDocsChain: questionAnswerChain,
    });

    const response = await ragChain.invoke({
        input: sanitizedQuestion,
        chat_history: chat_history,
    });

    const stream = await ragChain.stream({
        input: sanitizedQuestion,
        chat_history: chat_history,
    });

    return response.answer;
};