import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { remarkCodeHike, recmaCodeHike } from "codehike/mdx";
import { Code } from "@/components/code";
import fs from "fs";
import path from "path";

const chConfig = {
  components: { code: "Code" },
};

import {
  getPostMetadata,
  getAllPostSlugs,
  formatDate,
  isValidSlug,
} from "@/lib/content";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  if (!isValidSlug(slug)) {
    return { title: "Not Found" };
  }

  const metadata = await getPostMetadata(slug);

  if (!metadata) {
    return { title: "Not Found" };
  }

  return {
    title: metadata.title,
    description: metadata.description,
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      type: "article",
      publishedTime: metadata.date,
      modifiedTime: metadata.updated,
      images: metadata.image ? [metadata.image] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.title,
      description: metadata.description,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;

  if (!isValidSlug(slug)) {
    notFound();
  }

  const metadata = await getPostMetadata(slug);

  if (!metadata) {
    notFound();
  }

  // Read MDX content from file system
  const filePath = path.join(process.cwd(), "content/posts", `${slug}.mdx`);
  let source: string;
  try {
    source = fs.readFileSync(filePath, "utf-8");
    // Remove the metadata export from the content
    source = source.replace(
      /export\s+const\s+metadata\s*=\s*\{[\s\S]*?\};/,
      "",
    );
  } catch (error) {
    console.error(`Failed to load MDX for slug "${slug}":`, error);
    notFound();
  }

  // JSON-LD structured data for BlogPosting (Google Rich Results)
  const blogPostingJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: metadata.title,
    description: metadata.description,
    datePublished: metadata.date,
    dateModified: metadata.updated || metadata.date,
    author: {
      "@type": "Organization",
      name: "ScanSafeguard",
      url: "https://www.scansafeguard.com",
    },
    publisher: {
      "@type": "Organization",
      name: "ScanSafeguard",
      url: "https://www.scansafeguard.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://blog.scansafeguard.com/posts/${slug}`,
    },
    url: `https://blog.scansafeguard.com/posts/${slug}`,
    ...(metadata.image && { image: metadata.image }),
    ...(metadata.tags && { keywords: metadata.tags.join(", ") }),
  };

  // Breadcrumb JSON-LD for navigation rich results
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.scansafeguard.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://blog.scansafeguard.com",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Posts",
        item: "https://blog.scansafeguard.com/posts",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: metadata.title,
        item: `https://blog.scansafeguard.com/posts/${slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <main className="min-h-screen px-6 py-12">
        <article className="mx-auto max-w-3xl">
          {/* Back link */}
          <Link
            href="/posts"
            className="inline-flex items-center gap-2 text-sm text-[#5E574B] hover:text-[#F5B141] mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to posts
          </Link>

          {/* Post header */}
          <header className="mb-8 pb-8 border-b border-[#443E3E]/10">
            <div className="flex items-center gap-2 text-sm text-[#5E574B]">
              <time>
                {formatDate(metadata.date)}
                {metadata.updated && (
                  <span className="ml-2">
                    (Updated: {formatDate(metadata.updated)})
                  </span>
                )}
              </time>
              {metadata.author && (
                <>
                  <span>•</span>
                  <span>{metadata.author}</span>
                </>
              )}
            </div>
            <h1
              className="mt-4 text-4xl tracking-wide text-[#302D26]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {metadata.title.toUpperCase()}
            </h1>
            <p className="mt-4 text-xl text-[#5E574B]">
              {metadata.description}
            </p>
            {metadata.tags && metadata.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {metadata.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block px-2 py-1 text-xs font-medium bg-[#FEE9C9] text-[#5E574B] rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Post content */}
          <div className="prose prose-lg max-w-none">
            <MDXRemote
              source={source}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm, [remarkCodeHike, chConfig]],
                  recmaPlugins: [[recmaCodeHike, chConfig]],
                },
              }}
              components={{ Code }}
            />
          </div>
        </article>
      </main>
    </>
  );
}
