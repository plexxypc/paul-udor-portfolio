import PostList from "../components/PostList";
import { useDocumentTitle } from "../hooks/use_document_title";
import { all_posts } from "../utils/blog";

/**
 * All blog posts, newest first.
 *
 * @returns {import("react").JSX.Element} Page content.
 */
export default function BlogIndexPage() {
  useDocumentTitle("Writing");

  return (
    <div className="container page">
      <header className="page_header">
        <h1 className="page_heading">Writing</h1>
        <p className="page_header_meta mono">
          {all_posts.length} {all_posts.length === 1 ? "post" : "posts"} · newest first
        </p>
      </header>
      <PostList posts={all_posts} heading_level={2} />
    </div>
  );
}
