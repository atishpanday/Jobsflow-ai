import { embedDocs } from "@/lib/embed-docs";
import { fetchDocs } from "@/lib/fetch-docs";
import { loadDocs } from "@/lib/load-docs";
import { getPineconeClient } from "@/lib/pinecone-client";

(async () => {
    try {
        const pc = await getPineconeClient();
        const docs = await fetchDocs();
        const splitDocs = await loadDocs(docs);
        await embedDocs(pc, splitDocs);
    } catch (error) {
        console.log(error);
    }
})();