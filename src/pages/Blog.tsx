import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";
import blogPosts from "../data/blog-posts";

const Blog = () => {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-black px-6 pt-28 pb-16 text-white">
        <section className="mx-auto max-w-6xl">
          <div className="max-w-3xl mb-12 space-y-4">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Writing</p>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight neon-text">Blog</h1>
            <p className="text-lg text-slate-300">
              A running set of notes, experiments, and implementation details from the site.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {blogPosts.map((post) => (
              <Link key={post.slug} to={`/blog/${post.slug}`} className="group block">
                <article className="h-full rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:bg-white/10">
                  <div className="mb-4 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.25em] text-slate-400">
                    <span>{post.date}</span>
                    <span aria-hidden="true">•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h2 className="text-2xl font-semibold text-white group-hover:text-[#93a8ff] transition-colors">
                    {post.title}
                  </h2>
                  <p className="mt-4 text-slate-300 leading-7">{post.excerpt}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-200">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="mt-6 inline-flex items-center text-sm font-medium text-white underline-offset-4 group-hover:underline">
                    Read post
                  </span>
                </article>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default Blog;