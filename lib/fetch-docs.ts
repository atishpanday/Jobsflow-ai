import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";

export const fetchDocs = async (link: string) => {
    const loader = new CheerioWebBaseLoader(link, {
        selector: ["div", "p", "h1"],
    });

    const docs = await loader.load();

    return docs;
}