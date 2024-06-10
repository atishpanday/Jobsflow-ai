import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";

export const fetchDocs = async () => {
    const loader = new CheerioWebBaseLoader("https://www.fictionontheweb.co.uk/2024/06/the-weird-family-by-cliff-aliperti.html",
        {
            selector: "#post-body-6858155206068642790"
        }
    );

    const docs = await loader.load();

    return docs;
}