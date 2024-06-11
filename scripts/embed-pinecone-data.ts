import { embedDocs } from "@/lib/embed-docs";
import { fetchDocs } from "@/lib/fetch-docs";
import { loadDocs } from "@/lib/load-docs";
import { getPineconeClient } from "@/lib/pinecone-client";

const links = ["https://www.jamsnext.com/", "https://www.jamsnext.com/about/"];

(async () => {
    links.map(async (link) => {
        try {
            const pc = await getPineconeClient();
            const docs = await fetchDocs(link);
            const splitDocs = await loadDocs(docs);
            await embedDocs(pc, splitDocs);
        } catch (error) {
            console.log(error);
        }
    });
})();