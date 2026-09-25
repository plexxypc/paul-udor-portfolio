import { Link, useLocation } from "react-router-dom";
import { useDocumentTitle } from "../hooks/use_document_title";

/**
 * Fallback for unknown routes, projects, and posts.
 *
 * @returns {import("react").JSX.Element} Page content.
 */
export default function NotFoundPage() {
  const { pathname } = useLocation();
  useDocumentTitle("Not found");

  return (
    <div className="container page">
      <p className="mono page_header_meta">404 · {pathname}</p>
      <h1 className="page_heading">Nothing at this address.</h1>
      <p className="lead">
        <Link to="/">Back to the homepage</Link>
      </p>
    </div>
  );
}
