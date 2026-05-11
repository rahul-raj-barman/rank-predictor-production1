import type { MetadataRoute } from "next";
import { exams } from "@/data/exams";

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
    ...exams.map((exam) => ({
      url: `${siteUrl}/exam/${exam.slug}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
  ];
}
