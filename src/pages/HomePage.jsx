import { Link } from "react-router-dom";
import ContactSection from "../components/ContactSection";
import HeroSection from "../components/HeroSection";
import NodeHeader from "../components/NodeHeader";
import PipelineConnector from "../components/PipelineConnector";
import PostList from "../components/PostList";
import ProjectCard from "../components/ProjectCard";
import ResumeSection from "../components/ResumeSection";
import WebsiteGrid from "../components/WebsiteGrid";
import { profile } from "../data/profileData";
import { projects } from "../data/projectsData";
import { featured_websites, websites } from "../data/websitesData";
import Seo from "../components/Seo";
import { all_posts, get_recent_posts } from "../utils/blog";
import { format_count } from "../utils/format";

const RECENT_POST_COUNT = 3;

/**
 * Homepage: Hero → Work → Previous work → Recent writing → Resume → Get in touch,
 * joined by pipeline connectors.
 *
 * @returns {import("react").JSX.Element} Page content.
 */
export default function HomePage() {
  const recent_posts = get_recent_posts(RECENT_POST_COUNT);

  return (
    <>
      <Seo title={null} description={profile.bio} path="/" />
      <HeroSection />

      <div className="container">
        <PipelineConnector />
      </div>

      <section id="work" className="container pipeline_section" tabIndex={-1} aria-labelledby="work_heading">
        <NodeHeader
          heading_id="work_heading"
          title="Pending Work"
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

      <section
        id="previous_work"
        className="container pipeline_section"
        tabIndex={-1}
        aria-labelledby="previous_work_heading"
      >
        <NodeHeader
          heading_id="previous_work_heading"
          title="Previous work"
          meta={`${featured_websites.length} of ${format_count(websites.length, "site", "sites")}`}
        />
        <WebsiteGrid sites={featured_websites} />
        {websites.length > featured_websites.length ? (
          <p className="section_footer_link">
            <Link to="/work#previous_work">See all previous work &rarr;</Link>
          </p>
        ) : null}
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
