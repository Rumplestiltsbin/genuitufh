// fetch-news.js
const Parser = require("rss-parser");
const fs = require("fs");
const path = require("path");
const parser = new Parser();

(async () => {
  // 1. define your feeds:
  const feeds = [
    { title: "BBC World", url: "http://feeds.bbci.co.uk/news/world/rss.xml" },
    { title: "TechCrunch", url: "http://feeds.feedburner.com/TechCrunch/" },
    // add more RSS URLs here
  ];

  let items = [];
  for (let feedInfo of feeds) {
    try {
      let feed = await parser.parseURL(feedInfo.url);
      feed.items.forEach((item) => {
        items.push({
          title: item.title,
          link: item.link,
          date: new Date(item.pubDate),
          source: feedInfo.title,
        });
      });
    } catch (e) {
      console.error(`Failed to fetch ${feedInfo.url}:`, e);
    }
  }

  // 2. sort by newest first
  items.sort((a, b) => b.date - a.date);

  // 3. ensure data folder exists
  const dataDir = path.join(__dirname, "src", "_data");
  fs.mkdirSync(dataDir, { recursive: true });

  // 4. write to data/news.json (limit to 50 items)
  fs.writeFileSync(
    path.join(dataDir, "news.json"),
    JSON.stringify(items.slice(0, 50), null, 2),
  );
  console.log("Wrote news.json with", items.length, "items");
})();
