import { getPineconeClient, getVectorStore } from "./pinecone-client";
import {
    ChatPromptTemplate,
    MessagesPlaceholder,
} from "@langchain/core/prompts";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createHistoryAwareRetriever } from "langchain/chains/history_aware_retriever";
import { createRetrievalChain } from "langchain/chains/retrieval";

import { streamingModel, nonStreamingModel } from "./llm";
import { QA_TEMPLATE, STANDALONE_QUESTION_TEMPLATE } from "./prompt-templates";

import { StreamingTextResponse } from "ai";


export const callChain = async (question: string, chatHistory: string) => {
    const sanitizedQuestion = question.trim().replaceAll("\n", " ");
    const pc = await getPineconeClient();
    const vectorStore = await getVectorStore(pc);
    const retriever = vectorStore.asRetriever();

    const standaloneQuestionPrompt = ChatPromptTemplate.fromMessages([
        ["system", STANDALONE_QUESTION_TEMPLATE],
        new MessagesPlaceholder("chat_history"),
        ["human", "{input}"],
    ]);

    const historyAwareRetriever = await createHistoryAwareRetriever({
        llm: nonStreamingModel,
        retriever: retriever,
        rephrasePrompt: standaloneQuestionPrompt,
    });

    const qaPrompt = ChatPromptTemplate.fromMessages([
        ["system", QA_TEMPLATE],
        new MessagesPlaceholder("chat_history"),
        ["human", "{input}"],
    ]);

    const questionAnswerChain = await createStuffDocumentsChain({
        llm: streamingModel,
        prompt: qaPrompt,
    });

    const ragChain = await createRetrievalChain({
        retriever: historyAwareRetriever,
        combineDocsChain: questionAnswerChain,
    });

    const stream = await ragChain.stream({
        input: sanitizedQuestion,
        chat_history: chatHistory,
    })

    return new StreamingTextResponse(stream);

}