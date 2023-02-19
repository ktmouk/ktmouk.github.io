import Parser from "rss-parser";
import R from "remeda";
import type { Feed } from "@/types/feed";
import axios from "axios";

type Source = {
  siteName: string;
  url: string;
};

const parser = new Parser({
  customFields: {
    item: ["pubDate", "description"],
  },
});

const removeTags = (text: string) => {
  return text.replace(/<[^>]+>/g, "");
};

const removeNewLine = (text: string) => {
  return text.replace(/\n/g, "");
};

const shortenText = (text: string, maxLength = 100) => {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
};

const parseFeed = async (source: Source): Promise<Feed[]> => {
  const { data: xml } = await axios.get<string>(source.url);
  const data = await parser.parseString(xml);
  return data.items.map((item) => {
    return {
      siteName: source.siteName,
      title: item.title,
      pubDate: new Date(item.pubDate),
      link: item.link,
      description: shortenText(
        removeNewLine(removeTags(item.description.trim()))
      ),
    };
  });
};

export const parseFeeds = async (sources: Source[]) => {
  return R.pipe(
    await Promise.all(sources.map((source) => parseFeed(source))),
    R.flatten(),
    R.sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime())
  );
};
