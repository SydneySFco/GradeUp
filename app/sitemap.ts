import type { MetadataRoute } from "next";

const baseUrl = "https://gradeup.solutions";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Statik sayfaların
  const routes = [
    "",
    "/projects",
    "/contact",
    // varsa ekle:
    // "/services",
    // "/work",
  ];

  return routes.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));
}
