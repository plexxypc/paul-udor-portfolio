import ReactMarkdown from "react-markdown";
import { Link, useParams } from "react-router-dom";
import TagList from "../components/TagList";
import Seo from "../components/Seo";
import { get_post_by_slug } from "../utils/blog";
import NotFoundPage from "./NotFoundPage";

/**
 * Markdown link renderer: external links open in a new tab.
 *
 * @param {import("react").AnchorHTMLAttributes<HTMLAnchorElement> & { node?: unknown }} props - Anchor props from react-markdown.
 * @returns {import("react").JSX.Element} Anchor element.
 */
function MarkdownLink({ node: _node, href = "", children, ...anchor_props }) {
  const is_external = /^https?:\/\//.test(href);
  return (
    <a href={href} {...anchor_props} {...(is_external ? { target: "_blank", rel: "noreferrer" } : {})}>
      {children}
    </a>
  );
}

const MARKDOWN_COMPONENTS = { a: MarkdownLink };

/**
 * A single blog post rendered from markdown.
 *
 * @returns {import("react").JSX.Element} Page content.
 */
export default function BlogPostPage() {
  const { slug } = useParams();
  const post = get_post_by_slug(slug);
  if (!post) {
    return <NotFoundPage />;
  }

  return (
    <article className="container page post">
      <Seo
        title={post.title}
        description={post.excerpt || post.title}
        path={`/blog/${post.slug}`}
        og_type="article"
      />
      <Link to="/blog" className="back_link">
        &larr; All writing
      </Link>
      <header className="post_header">
        <time className="post_header_date mono" dateTime={post.date}>
          {post.date}
        </time>
        <h1 className="page_heading">{post.title}</h1>
        {post.excerpt ? <p className="lead">{post.excerpt}</p> : null}
        <TagList tags={post.tags} label="Tags" />
      </header>
      <div className="prose">
        <ReactMarkdown components={MARKDOWN_COMPONENTS}>{post.content}</ReactMarkdown>
      </div>
    </article>
  );
}
