import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import ScrollManager from "./components/ScrollManager";
import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";
import BlogIndexPage from "./pages/BlogIndexPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import ProjectPage from "./pages/ProjectPage";

const BlogPostPage = lazy(() => import("./pages/BlogPostPage"));

/**
 * App shell: skip link, header, routed page content, footer.
 *
 * @returns {import("react").JSX.Element} Application root.
 */
export default function App() {
  return (
    <>
      <a className="skip_link" href="#main_content">
        Skip to content
      </a>
      <ScrollManager />
      <SiteHeader />
      <main id="main_content" tabIndex={-1}>
        <Suspense fallback={<div className="container page" aria-busy="true" />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/work/:project_id" element={<ProjectPage />} />
            <Route path="/blog" element={<BlogIndexPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
      <SiteFooter />
    </>
  );
}
