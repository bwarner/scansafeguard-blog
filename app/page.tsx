import Link from "next/link";
import { ArrowRight, Shield, Search, Lock } from "lucide-react";
import { getAllPosts, formatDate } from "@/lib/content";

// JSON-LD structured data for homepage
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "ScanSafeguard Blog",
  url: "https://blog.scansafeguard.com",
  description:
    "Security insights, vulnerability research, and network defense strategies from ScanSafeguard.",
  publisher: {
    "@type": "Organization",
    name: "ScanSafeguard",
    url: "https://www.scansafeguard.com",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ScanSafeguard",
  url: "https://www.scansafeguard.com",
  description:
    "Network security scanning and vulnerability assessment. Defend your network, one scan at a time.",
  sameAs: [],
};

const topics = [
  {
    icon: Shield,
    title: "Vulnerability Research",
    description:
      "Deep dives into CVEs, exploits, and how to defend against them.",
  },
  {
    icon: Search,
    title: "Network Scanning",
    description:
      "Best practices for discovering and assessing your attack surface.",
  },
  {
    icon: Lock,
    title: "Defense Strategies",
    description: "Practical guides for hardening your infrastructure.",
  },
];

export default async function Home() {
  const posts = await getAllPosts();
  const recentPosts = posts.slice(0, 3);

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <main>
        {/* Hero Section */}
        <section className="relative py-24 px-6">
          <div className="absolute inset-0 bg-gradient-to-br from-[#FEE9C9]/30 via-white to-[#FCFCFC]" />
          <div className="relative mx-auto max-w-5xl">
            <div className="max-w-3xl">
              <p
                className="text-[#F5B141] font-medium mb-4 tracking-widest uppercase text-sm"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Security Insights
              </p>
              <h1
                className="text-5xl md:text-7xl tracking-wide text-[#302D26] mb-6"
                style={{ fontFamily: "var(--font-display)" }}
              >
                DEFEND YOUR NETWORK
              </h1>
              <p className="text-xl md:text-2xl text-[#5E574B] leading-relaxed mb-10 max-w-2xl">
                Expert security research, vulnerability analysis, and practical
                defense strategies. Stay ahead of threats with insights from
                ScanSafeguard.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/posts"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#F5B141] text-[#302D26] rounded-lg hover:bg-[#FFD18A] transition-colors font-medium"
                >
                  Read the Blog
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="https://www.scansafeguard.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#443E3E] text-[#443E3E] rounded-lg hover:bg-[#443E3E] hover:text-white transition-colors font-medium"
                >
                  Start Scanning
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Topics Bar */}
        <section className="bg-[#302D26] text-white py-16 px-6">
          <div className="mx-auto max-w-5xl">
            <h2
              className="text-center text-2xl tracking-wide mb-12"
              style={{ fontFamily: "var(--font-display)" }}
            >
              WHAT WE COVER
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {topics.map((topic) => (
                <div key={topic.title} className="text-center">
                  <topic.icon className="w-10 h-10 mx-auto mb-4 text-[#F5B141]" />
                  <h3
                    className="text-lg tracking-wide mb-2"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {topic.title.toUpperCase()}
                  </h3>
                  <p className="text-[#FFD18A] text-sm">{topic.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Recent Posts */}
        <section className="py-24 px-6">
          <div className="mx-auto max-w-5xl">
            <div className="flex items-end justify-between mb-16">
              <div>
                <p
                  className="text-[#F5B141] font-medium mb-3 tracking-widest uppercase text-sm"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Latest
                </p>
                <h2
                  className="text-3xl md:text-4xl tracking-wide text-[#302D26]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  RECENT POSTS
                </h2>
              </div>
              <Link
                href="/posts"
                className="hidden md:inline-flex items-center gap-2 text-[#5E574B] font-medium hover:text-[#F5B141] transition-colors"
              >
                All posts
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {recentPosts.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-8">
                {recentPosts.map((post) => (
                  <article key={post.slug} className="group">
                    <Link href={`/posts/${post.slug}`} className="block">
                      <div className="aspect-[16/10] bg-gradient-to-br from-[#FEE9C9] to-[#FFD18A] rounded-xl mb-5 group-hover:from-[#FFD18A] group-hover:to-[#F5B141] transition-colors flex items-center justify-center">
                        <Shield className="w-12 h-12 text-[#302D26]/20" />
                      </div>
                      <time className="text-sm text-[#5E574B]">
                        {formatDate(post.metadata.date)}
                      </time>
                      <h3
                        className="text-xl text-[#302D26] mt-2 mb-3 group-hover:text-[#F5B141] transition-colors tracking-wide"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {post.metadata.title.toUpperCase()}
                      </h3>
                      <p className="text-[#5E574B] line-clamp-2">
                        {post.metadata.description}
                      </p>
                    </Link>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-[#FEE9C9]/30 rounded-2xl">
                <Shield className="w-16 h-16 mx-auto mb-4 text-[#F5B141]" />
                <p className="text-[#5E574B] text-lg">
                  Security insights coming soon. Stay tuned!
                </p>
              </div>
            )}

            <Link
              href="/posts"
              className="md:hidden inline-flex items-center gap-2 text-[#5E574B] font-medium hover:text-[#F5B141] transition-colors mt-8"
            >
              View all posts
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-6 bg-gradient-to-br from-[#302D26] to-[#5E574B] text-white">
          <div className="mx-auto max-w-3xl text-center">
            <h2
              className="text-3xl md:text-5xl tracking-wide mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              READY TO SECURE YOUR NETWORK?
            </h2>
            <p className="text-xl text-[#FFD18A] mb-10 max-w-xl mx-auto">
              Start scanning for vulnerabilities today with ScanSafeguard. Know
              your attack surface before attackers do.
            </p>
            <a
              href="https://www.scansafeguard.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#F5B141] text-[#302D26] rounded-lg hover:bg-[#FFD18A] transition-colors font-medium text-lg"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
