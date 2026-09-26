import { Link, useLocation } from "react-router-dom";
import Seo from "../components/Seo";

/**
 * Fallback for unknown routes, projects, and posts. Marked noindex.
 *
 * @returns {import("react").JSX.Element} Page content.
 */
export default function NotFoundPage() {
  const { pathname } = useLocation();

  return (
    <div className="container page">
      <Seo title="Not found" description="This page doesn't exist." path={pathname} no_index />
      <p className="mono page_header_meta">404 · {pathname}</p>
      <h1 className="page_heading">Nothing at this address.</h1>
      <p className="lead">
        <Link to="/">Back to the homepage</Link>
      </p>
    </div>
  );
}
