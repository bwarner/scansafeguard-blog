/**
 * Metadata exported from blog post MDX files
 */
export interface PostMetadata {
  title: string;
  description: string;
  date: string; // ISO date string (YYYY-MM-DD)
  updated?: string; // Optional last updated date
  tags?: string[];
  published: boolean;
  image?: string; // Optional hero/og image
  author?: string; // Optional author name
}

/**
 * Blog post with slug for routing
 */
export interface Post {
  slug: string;
  metadata: PostMetadata;
}
