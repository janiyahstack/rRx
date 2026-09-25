import { ApifyClient } from "apify-client";
import "dotenv/config";
const client = new ApifyClient({
    token: process.env.APIFY_API_TOKEN,
});

const input ={
    query: "Fetch 5 drugs recently recalled by NAFDAC",
    searchType: "user",
    searchLimit:  2,
};
console.log("Starting Search...");
const run = await client.actor("humanitarian_turnery/rrx").call(input);
console.log("Scraping finished!");
console.log("Dataset:", run.defaultDatasetId);
const { items } = await client.dataset(run.defaultDatasetId).listItems();
console.log("Results:");
console.dir(items, { depth:null });