import { parseFeeds } from "@/utils/parse-feeds";
import { afterEach, describe, expect, it, vitest } from "vitest";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";

describe("parseFeed", () => {
  const mock = new MockAdapter(axios, { onNoMatch: "throwException" });

  afterEach(() => mock.reset());

  describe("when sources is given", () => {
    it("returns a parsed feed", async () => {
      mock.onGet("https://example.com/rss.xml").reply(
        200,
        `
        <rss version="2.0">
          <channel>
            <item>
              <title>title</title>
              <link>https://www.example.com/item.html</link>
              <description>description</description>
              <pubDate>Sun, 01 Jun 2023 01:23:45 +0900</pubDate>
            </item>
            <item>
              <title>title</title>
              <link>https://www.example.com/item.html</link>
              <description>description</description>
              <pubDate>Mon, 02 Jun 2023 01:23:45 +0900</pubDate>
            </item>
          </channel>
        </rss>
        `
      );
      const feeds = await parseFeeds([
        {
          siteName: "example",
          url: "https://example.com/rss.xml",
        },
      ]);
      expect(feeds).toEqual([
        {
          description: "description",
          link: "https://www.example.com/item.html",
          pubDate: new Date("2023-06-01T16:23:45.000Z"),
          siteName: "example",
          title: "title",
        },
        {
          description: "description",
          link: "https://www.example.com/item.html",
          pubDate: new Date("2023-05-31T16:23:45.000Z"),
          siteName: "example",
          title: "title",
        },
      ]);
    });
  });

  describe("when the character of the description is longer than 100", () => {
    it("omits description and adds '...'", async () => {
      mock.onGet("https://example.com/rss.xml").reply(
        200,
        `
        <rss version="2.0">
          <channel>
            <item>
              <title>title</title>
              <link>https://www.example.com/item.html</link>
              <description>${"".padStart(101, "a")}</description>
              <pubDate>Sun, 01 Jun 2023 01:23:45 +0900</pubDate>
            </item>
          </channel>
        </rss>
        `
      );
      const feeds = await parseFeeds([
        {
          siteName: "example",
          url: "https://example.com/rss.xml",
        },
      ]);
      expect(feeds[0]?.description).toBe(`${"".padStart(100, "a")}...`);
    });
  });

  describe("when the description has whitespaces on at both ends", () => {
    it("trims whitespaces", async () => {
      mock.onGet("https://example.com/rss.xml").reply(
        200,
        `
        <rss version="2.0">
          <channel>
            <item>
              <title>title</title>
              <link>https://www.example.com/item.html</link>
              <description>  foo  </description>
              <pubDate>Sun, 01 Jun 2023 01:23:45 +0900</pubDate>
            </item>
          </channel>
        </rss>
        `
      );
      const feeds = await parseFeeds([
        {
          siteName: "example",
          url: "https://example.com/rss.xml",
        },
      ]);
      expect(feeds[0]?.description).toBe("foo");
    });
  });

  describe("when the description has tags", () => {
    it("removes tags", async () => {
      mock.onGet("https://example.com/rss.xml").reply(
        200,
        `
        <rss version="2.0">
          <channel>
            <item>
              <title>title</title>
              <link>https://www.example.com/item.html</link>
              <description><b>foo</b><s></s>bar</description>
              <pubDate>Sun, 01 Jun 2023 01:23:45 +0900</pubDate>
            </item>
          </channel>
        </rss>
        `
      );
      const feeds = await parseFeeds([
        {
          siteName: "example",
          url: "https://example.com/rss.xml",
        },
      ]);
      expect(feeds[0]?.description).toBe("bar");
    });
  });

  describe("when the description has new lines", () => {
    it("removes new lines", async () => {
      mock.onGet("https://example.com/rss.xml").reply(
        200,
        `
        <rss version="2.0">
          <channel>
            <item>
              <title>title</title>
              <link>https://www.example.com/item.html</link>
              <description>
                foo\nbar
              </description>
              <pubDate>Sun, 01 Jun 2023 01:23:45 +0900</pubDate>
            </item>
          </channel>
        </rss>
        `
      );
      const feeds = await parseFeeds([
        {
          siteName: "example",
          url: "https://example.com/rss.xml",
        },
      ]);
      expect(feeds[0]?.description).toBe("foobar");
    });
  });

  describe("when sources are empty", () => {
    it("returns empty feeds", async () => {
      vitest.mock("https", () => ({
        get() {
          return "";
        },
      }));
      const feeds = await parseFeeds([]);
      expect(feeds).toEqual([]);
    });
  });
});
