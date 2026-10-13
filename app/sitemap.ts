import { MetadataRoute } from "next";

const ROUTES: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/about", priority: 0.5 },
  { path: "/terms", priority: 0.3 },
  { path: "/privacy", priority: 0.3 },
  { path: "/security", priority: 0.3 },
  { path: "/imprint", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map(({ path, priority }) => ({
    url: `https://ean.millibar.io${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority,
  }));
}
