import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

export const loadDocs = async (docs: any) => {
    const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 100,
        separators: ['\n']
    });

    const splitDocs = await textSplitter.splitDocuments(docs);

    return splitDocs;
}