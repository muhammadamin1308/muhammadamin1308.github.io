import { Link, useParams } from "react-router-dom";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import liquid from "react-syntax-highlighter/dist/esm/languages/prism/liquid";
import typescript from "react-syntax-highlighter/dist/esm/languages/prism/typescript";
import tsx from "react-syntax-highlighter/dist/esm/languages/prism/tsx";
import javascript from "react-syntax-highlighter/dist/esm/languages/prism/javascript";
import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx";
import bash from "react-syntax-highlighter/dist/esm/languages/prism/bash";
import json from "react-syntax-highlighter/dist/esm/languages/prism/json";
import css from "react-syntax-highlighter/dist/esm/languages/prism/css";
import markup from "react-syntax-highlighter/dist/esm/languages/prism/markup";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import Navigation from "../components/Navigation";
import blogPosts from "../data/blog-posts";

SyntaxHighlighter.registerLanguage("liquid", liquid);
SyntaxHighlighter.registerLanguage("typescript", typescript);
SyntaxHighlighter.registerLanguage("ts", typescript);
SyntaxHighlighter.registerLanguage("tsx", tsx);
SyntaxHighlighter.registerLanguage("javascript", javascript);
SyntaxHighlighter.registerLanguage("js", javascript);
SyntaxHighlighter.registerLanguage("jsx", jsx);
SyntaxHighlighter.registerLanguage("bash", bash);
SyntaxHighlighter.registerLanguage("sh", bash);
SyntaxHighlighter.registerLanguage("json", json);
SyntaxHighlighter.registerLanguage("css", css);
SyntaxHighlighter.registerLanguage("html", markup);
SyntaxHighlighter.registerLanguage("xml", markup);
SyntaxHighlighter.registerLanguage("markup", markup);

const normalizeLanguage = (language?: string) => {
  if (!language) return "text";

  const lower = language.toLowerCase();
  if (lower === "txt" || lower === "text" || lower === "plaintext") return "text";
  return lower;
};

const BlogPost = () => {
  const { slug } = useParams();
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    return (
      <>
        <Navigation />
        <main className="min-h-screen bg-black px-6 py-32 text-white">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl md:text-6xl font-bold neon-text mb-6">Post not found</h1>
            <p className="text-slate-300 mb-8">
              The blog post you are looking for does not exist or has not been added yet.
            </p>
            <Link
              to="/blog"
              className="inline-flex items-center rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-white hover:bg-white/10 transition-colors"
            >
              Back to blog
            </Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-black px-6 pt-28 pb-16 text-white">
        <article className="mx-auto flex max-w-4xl flex-col gap-8">
          <div className="space-y-4">
            <Link to="/blog" className="text-sm uppercase tracking-[0.35em] text-slate-400 hover:text-white transition-colors">
              Back to blog
            </Link>
            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-400">
              <span>{post.date}</span>
              <span aria-hidden="true">•</span>
              <span>{post.readTime}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight neon-text">{post.title}</h1>
            <p className="max-w-3xl text-lg text-slate-300">{post.excerpt}</p>
            <div className="flex flex-wrap gap-2 pt-2">
              {post.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.25em] text-slate-200">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-10 rounded-3xl border border-white/10 bg-white/5 p-6 md:p-10 shadow-lg">
            {post.sections.map((section, index) => (
              <section key={`${post.slug}-${index}`} className="space-y-4">
                {section.heading && <h2 className="text-2xl md:text-3xl font-semibold text-white">{section.heading}</h2>}
                {section.blocks.map((block, blockIndex) => {
                  if (block.type === "paragraph") {
                    return (
                      <p key={`${post.slug}-${index}-${blockIndex}`} className="text-base md:text-lg leading-8 text-slate-300">
                        {block.text}
                      </p>
                    );
                  }

                  if (block.type === "image") {
                    return (
                      <figure key={`${post.slug}-${index}-${blockIndex}`} className="overflow-hidden rounded-2xl border border-white/10 bg-black/30">
                        <img src={block.src} alt={block.alt} className="w-full object-cover" />
                        {block.caption && (
                          <figcaption className="border-t border-white/10 px-4 py-3 text-sm text-slate-400">
                            {block.caption}
                          </figcaption>
                        )}
                      </figure>
                    );
                  }

                  return (
                    <figure key={`${post.slug}-${index}-${blockIndex}`} className="overflow-hidden rounded-2xl border border-white/10 bg-[#060606]">
                      {block.filename && (
                        <div className="border-b border-white/10 px-4 py-3 text-xs uppercase tracking-[0.25em] text-slate-400">
                          {block.filename}
                        </div>
                      )}
                      <SyntaxHighlighter
                        language={normalizeLanguage(block.language)}
                        style={vscDarkPlus}
                        showLineNumbers
                        customStyle={{
                          margin: 0,
                          padding: "1rem",
                          background: "transparent",
                          fontSize: "0.875rem",
                          lineHeight: "1.75rem",
                        }}
                        codeTagProps={{ style: { fontFamily: "Consolas, Menlo, Monaco, monospace" } }}
                      >
                        {block.code}
                      </SyntaxHighlighter>
                      {block.language && (
                        <figcaption className="border-t border-white/10 px-4 py-3 text-xs uppercase tracking-[0.25em] text-slate-500">
                          {block.language}
                        </figcaption>
                      )}
                    </figure>
                  );
                })}
              </section>
            ))}
          </div>
        </article>
      </main>
    </>
  );
};

export default BlogPost;