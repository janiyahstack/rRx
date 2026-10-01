import express from "express";
import { ApifyClient } from "apify-client";
import "dotenv/config";
const app = express();
app.use(express.json());
const client = new ApifyClient({
    token: process.env.APIFY_API_TOKEN,
});

app.post("/search", async (req,res) => {
    const { query } = req.body;

const input = {
    query: query,
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
res.json({
    results: items
});
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
