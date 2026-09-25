import { Link } from "react-router-dom";
import TagList from "./TagList";

/**
 * Log-style list of blog posts: date column, then title, excerpt, and tags.
 *
 * @param {Object} props - Component props.
 * @param {import("../utils/blog").blog_post[]} props.posts - Posts to list.
 * @param {2 | 3} [props.heading_level] - Heading level for post titles.
 * @returns {import("react").JSX.Element} List, or an empty-state message.
 */
export default function PostList({ posts, heading_level = 3 }) {
  const HeadingTag = `h${heading_level}`;

  if (!posts.length) {
    return <p className="empty_state">No posts yet.</p>;
  }

  return (
    <ul className="post_list">
      {posts.map((post) => (
        <li key={post.slug} className="post_row">
          <time className="post_row_date mono" dateTime={post.date}>
            {post.date}
          </time>
          <div className="post_row_body">
            <HeadingTag className="post_row_title">
              <Link to={`/blog/${post.slug}`}>{post.title}</Link>
            </HeadingTag>
            {post.excerpt ? <p className="post_row_excerpt">{post.excerpt}</p> : null}
            <TagList tags={post.tags} label={`${post.title} tags`} />
          </div>
        </li>
      ))}
    </ul>
  );
}
