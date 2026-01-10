import { Metadata } from "next";
import Link from "next/link";
import { Shield } from "lucide-react";
import { getAllPosts, formatDate } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Security insights, vulnerability research, and network defense strategies from ScanSafeguard.",
};

// Breadcrumb JSON-LD for blog index
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
      item: "https://www.scansafeguard.com/blog",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Posts",
      item: "https://www.scansafeguard.com/blog/posts",
    },
  ],
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <main className="min-h-screen px-6 py-12">
        <div className="mx-auto max-w-3xl">
          <header className="mb-12">
            <h1
              className="text-4xl tracking-wide text-[#302D26] mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              SECURITY BLOG
            </h1>
            <p className="text-lg text-[#5E574B]">
              Vulnerability research, defense strategies, and security insights.
            </p>
          </header>

          {posts.length === 0 ? (
            <div className="text-center py-16 bg-[#FEE9C9]/30 rounded-2xl">
              <Shield className="w-16 h-16 mx-auto mb-4 text-[#F5B141]" />
              <p className="text-[#5E574B]">
                No posts yet. Check back soon for security insights!
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {posts.map((post) => (
                <article
                  key={post.slug}
                  className="group border-b border-[#443E3E]/10 pb-8 last:border-0"
                >
                  <Link href={`/posts/${post.slug}`} className="block">
                    <time className="text-sm text-[#5E574B]">
                      {formatDate(post.metadata.date)}
                    </time>
                    <h2
                      className="mt-2 text-2xl tracking-wide text-[#302D26] group-hover:text-[#F5B141] transition-colors"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {post.metadata.title.toUpperCase()}
                    </h2>
                    <p className="mt-2 text-[#5E574B] leading-relaxed">
                      {post.metadata.description}
                    </p>
                    {post.metadata.tags && post.metadata.tags.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {post.metadata.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-block px-2 py-1 text-xs font-medium bg-[#FEE9C9] text-[#5E574B] rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
