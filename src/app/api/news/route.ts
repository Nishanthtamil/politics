import { NextResponse } from "next/server";
import Parser from "rss-parser";

const parser = new Parser();

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");
    const district = searchParams.get("district");
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = 10;

    if (!query) {
        return NextResponse.json({ items: [], hasMore: false });
    }

    try {
        // Use Google News RSS for reliable, free news
        let searchQuery = query;
        if (district && district !== "All Districts") {
            searchQuery += ` ${district}`;
        }
        searchQuery += " Tamil Nadu politics";

        const feedUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(searchQuery)}&hl=en-IN&gl=IN&ceid=IN:en`;

        const feed = await parser.parseURL(feedUrl);

        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const totalItems = feed.items.length;
        const hasMore = endIndex < totalItems;

        const items = feed.items.slice(startIndex, endIndex).map((item) => ({
            title: item.title,
            link: item.link,
            pubDate: item.pubDate,
            source: item.source || "Google News",
        }));

        return NextResponse.json({ items, hasMore });
    } catch (error) {
        console.error("RSS Fetch Error:", error);
        return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 });
    }
}
