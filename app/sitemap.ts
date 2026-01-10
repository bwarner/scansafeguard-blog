import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();

  const blogPosts = posts.map((post) => ({
    url: `https://www.scansafeguard.com/blog/${post.slug}`,
    lastModified: new Date(post.metadata.updated || post.metadata.date),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: "https://www.scansafeguard.com/blog",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...blogPosts,
  ];
}
