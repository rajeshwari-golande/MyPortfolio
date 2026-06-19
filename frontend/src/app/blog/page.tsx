import Link from "next/link";
import { ArrowLeft, Clock, Tag } from "lucide-react";
import { getBlogPosts } from "@/lib/api";

export const metadata = {
  title: "Technical Blog | Rajeshwari Golande",
  description: "Articles on FastAPI, Docker, PostgreSQL, RAG systems, and AWS deployment.",
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="pt-24 pb-20">
      <div className="section-container">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted hover:text-accent transition-colors mb-8 text-sm"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>

        <div className="mb-12">
          <span className="inline-block text-sm font-mono uppercase tracking-widest text-accent mb-3">
            Technical Blog
          </span>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Engineering Insights
          </h1>
          <p className="text-muted text-lg max-w-2xl">
            Deep dives into backend development, AI engineering, DevOps, and cloud
            deployment — written from production experience.
          </p>
          <div className="mt-4 h-1 w-16 bg-accent rounded-full" />
        </div>

        {posts.length === 0 ? (
          <div className="rounded-xl border border-border bg-surface/50 p-12 text-center">
            <p className="text-muted">
              Blog posts will appear here once the backend is running. Start the
              API with Docker Compose to seed sample articles.
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group block rounded-xl border border-border bg-surface/50 p-6 card-glow hover:border-accent/30 transition-all"
              >
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted mb-3">
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {post.read_time_minutes} min read
                  </span>
                  <span>
                    {new Date(post.published_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <h2 className="text-xl font-semibold text-foreground group-hover:text-accent transition-colors mb-2">
                  {post.title}
                </h2>
                <p className="text-muted text-sm leading-relaxed mb-4">
                  {post.excerpt}
                </p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-mono bg-accent/10 text-accent rounded"
                    >
                      <Tag size={10} />
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
