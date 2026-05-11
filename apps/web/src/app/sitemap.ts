import type { MetadataRoute } from "next";
import { getAllExamRouteSlugs } from "@/data/exams";
import { hubPages } from "@/data/hubs";

const siteUrl = "https://www.sikshalabh.com";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-05-11");

  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...hubPages.map((hub) => ({
      url: `${siteUrl}/${hub.slug}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.95,
    })),
    ...getAllExamRouteSlugs().map((slug) => ({
      url: `${siteUrl}/exam/${slug}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
  ];
}
