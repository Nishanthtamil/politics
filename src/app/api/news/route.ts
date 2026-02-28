import { NextResponse } from "next/server";
import Parser from "rss-parser";

const parser = new Parser();

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");

    if (!query) {
        return NextResponse.json({ items: [] });
    }

    try {
        // Use Google News RSS for reliable, free news
        const feedUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(query + " Tamil Nadu politics")}&hl=en-IN&gl=IN&ceid=IN:en`;

        const feed = await parser.parseURL(feedUrl);

        const items = feed.items.slice(0, 5).map((item) => ({
            title: item.title,
            link: item.link,
            pubDate: item.pubDate,
            source: item.source || "Google News",
        }));

        return NextResponse.json({ items });
    } catch (error) {
        console.error("RSS Fetch Error:", error);
        return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 });
    }
}
