import { Link } from "react-router-dom";
import ContactSection from "../components/ContactSection";
import HeroSection from "../components/HeroSection";
import NodeHeader from "../components/NodeHeader";
import PipelineConnector from "../components/PipelineConnector";
import PostList from "../components/PostList";
import ProjectCard from "../components/ProjectCard";
import ResumeSection from "../components/ResumeSection";
import { profile } from "../data/profileData";
import { projects } from "../data/projectsData";
import { useDocumentTitle } from "../hooks/use_document_title";
import { all_posts, get_recent_posts } from "../utils/blog";

const RECENT_POST_COUNT = 3;

/**
 * Pluralise a count for data readouts, e.g. "1 post" / "3 posts".
 *
 * @param {number} count - Item count.
 * @param {string} singular - Singular noun.
 * @param {string} plural - Plural noun.
 * @returns {string} Formatted count.
 */
function format_count(count, singular, plural) {
  return `${count} ${count === 1 ? singular : plural}`;
}

/**
 * Homepage: Hero → Work → Recent writing → Resume → Get in touch, joined by pipeline connectors.
 *
 * @returns {import("react").JSX.Element} Page content.
 */
export default function HomePage() {
  useDocumentTitle(null);
  const recent_posts = get_recent_posts(RECENT_POST_COUNT);

  return (
    <>
      <HeroSection />

      <div className="container">
        <PipelineConnector />
      </div>

      <section id="work" className="container pipeline_section" tabIndex={-1} aria-labelledby="work_heading">
        <NodeHeader
          heading_id="work_heading"
          title="Work"
          meta={format_count(projects.length, "case study", "case studies")}
        />
        <ul className="project_list">
          {projects.map((project) => (
            <li key={project.id}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      </section>

      <div className="container">
        <PipelineConnector />
      </div>

      <section id="writing" className="container pipeline_section" tabIndex={-1} aria-labelledby="writing_heading">
        <NodeHeader
          heading_id="writing_heading"
          title="Recent writing"
          meta={format_count(all_posts.length, "post", "posts")}
        />
        <PostList posts={recent_posts} heading_level={3} />
        {all_posts.length > RECENT_POST_COUNT ? (
          <p className="section_footer_link">
            <Link to="/blog">All writing &rarr;</Link>
          </p>
        ) : null}
      </section>

      {profile.resume_url ? (
        <>
          <div className="container">
            <PipelineConnector />
          </div>
          <ResumeSection />
        </>
      ) : null}

      <div className="container">
        <PipelineConnector />
      </div>

      <ContactSection />
    </>
  );
}
