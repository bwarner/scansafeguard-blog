import fs from "fs";
import path from "path";
import { Post, PostMetadata } from "./types";

const POSTS_DIR = path.join(process.cwd(), "content/posts");

/**
 * Validates a slug to prevent path traversal attacks
 */
export function isValidSlug(slug: string): boolean {
  return /^[a-zA-Z0-9_-]+$/.test(slug);
}

/**
 * Calculate reading time based on word count
 * Average reading speed: 200 words per minute
 */
export function calculateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / 200);
}

/**
 * Extract metadata from MDX file content
 * Parses the metadata object safely without using eval/Function
 */
function extractMetadata(content: string): PostMetadata | null {
  // Match the metadata export - capture just the object content
  const metadataMatch = content.match(
    /export\s+const\s+metadata\s*=\s*\{([\s\S]*?)\};/,
  );

  if (!metadataMatch) {
    return null;
  }

  try {
    const objectContent = metadataMatch[1];

    // Parse individual fields safely using regex
    const getString = (key: string): string | undefined => {
      const match = objectContent.match(
        new RegExp(`${key}:\\s*["'\`]([^"'\`]*)["'\`]`),
      );
      return match ? match[1] : undefined;
    };

    const getBoolean = (key: string): boolean | undefined => {
      const match = objectContent.match(new RegExp(`${key}:\\s*(true|false)`));
      return match ? match[1] === "true" : undefined;
    };

    const getStringArray = (key: string): string[] | undefined => {
      const match = objectContent.match(
        new RegExp(`${key}:\\s*\\[([^\\]]*)\\]`),
      );
      if (!match) return undefined;
      const items = match[1].match(/["'`]([^"'`]*)["'`]/g);
      return items ? items.map((s) => s.slice(1, -1)) : [];
    };

    const title = getString("title");
    const description = getString("description");
    const date = getString("date");
    const published = getBoolean("published");

    if (!title || !description || !date || published === undefined) {
      return null;
    }

    return {
      title,
      description,
      date,
      published,
      updated: getString("updated"),
      tags: getStringArray("tags"),
      image: getString("image"),
      author: getString("author"),
    };
  } catch (error) {
    console.error("Error parsing metadata:", error);
    return null;
  }
}

/**
 * Get all published blog posts, sorted by date (newest first)
 */
export async function getAllPosts(): Promise<Post[]> {
  // Check if posts directory exists
  if (!fs.existsSync(POSTS_DIR)) {
    return [];
  }

  const fileNames = fs.readdirSync(POSTS_DIR);
  const mdxFiles = fileNames.filter((name) => name.endsWith(".mdx"));

  const posts: Post[] = [];

  for (const fileName of mdxFiles) {
    const slug = fileName.replace(/\.mdx$/, "");

    if (!isValidSlug(slug)) {
      console.warn(`Skipping invalid slug: ${slug}`);
      continue;
    }

    try {
      const filePath = path.join(POSTS_DIR, fileName);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const metadata = extractMetadata(fileContent);

      if (metadata && metadata.published) {
        posts.push({ slug, metadata });
      }
    } catch (error) {
      console.error(`Error loading post ${slug}:`, error);
    }
  }

  // Sort by date, newest first
  return posts.sort(
    (a, b) =>
      new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime(),
  );
}

/**
 * Get a single post's metadata by slug
 */
export async function getPostMetadata(
  slug: string,
): Promise<PostMetadata | null> {
  if (!isValidSlug(slug)) {
    return null;
  }

  try {
    const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
    if (!fs.existsSync(filePath)) {
      return null;
    }
    const fileContent = fs.readFileSync(filePath, "utf-8");
    return extractMetadata(fileContent);
  } catch {
    return null;
  }
}

/**
 * Get all unique tags from published posts
 */
export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts();
  const tagSet = new Set<string>();

  for (const post of posts) {
    if (post.metadata.tags) {
      post.metadata.tags.forEach((tag) => tagSet.add(tag));
    }
  }

  return Array.from(tagSet).sort();
}

/**
 * Get posts filtered by tag
 */
export async function getPostsByTag(tag: string): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts.filter((post) => post.metadata.tags?.includes(tag));
}

/**
 * Format a date string for display
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Get all post slugs for static generation
 */
export async function getAllPostSlugs(): Promise<string[]> {
  if (!fs.existsSync(POSTS_DIR)) {
    return [];
  }

  const fileNames = fs.readdirSync(POSTS_DIR);
  return fileNames
    .filter((name) => name.endsWith(".mdx"))
    .map((name) => name.replace(/\.mdx$/, ""))
    .filter(isValidSlug);
}
