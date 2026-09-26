import NodeHeader from "../components/NodeHeader";
import PipelineConnector from "../components/PipelineConnector";
import ProjectCard from "../components/ProjectCard";
import WebsiteGrid from "../components/WebsiteGrid";
import { projects } from "../data/projectsData";
import { websites } from "../data/websitesData";
import Seo from "../components/Seo";
import { format_count } from "../utils/format";

/**
 * All work: automation case studies, then every previous website.
 *
 * @returns {import("react").JSX.Element} Page content.
 */
export default function WorkIndexPage() {
  return (
    <div className="container page">
      <Seo
        title="Work"
        description="Automation case studies and websites built or worked on by Paul Udor, including n8n pipelines, React sites, and WordPress/WooCommerce stores."
        path="/work"
      />
      <header className="page_header">
        <h1 className="page_heading">Work</h1>
        <p className="page_header_meta mono">
          {format_count(projects.length, "case study", "case studies")} ·{" "}
          {format_count(websites.length, "website", "websites")}
        </p>
      </header>

      <section className="pipeline_section" aria-labelledby="case_studies_heading">
        <NodeHeader
          heading_id="case_studies_heading"
          title="AI Case studies"
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

      <PipelineConnector />

      <section
        id="previous_work"
        className="pipeline_section"
        tabIndex={-1}
        aria-labelledby="previous_work_heading"
      >
        <NodeHeader
          heading_id="previous_work_heading"
          title="Previous work"
          meta={format_count(websites.length, "site", "sites")}
        />
        <WebsiteGrid sites={websites} />
      </section>
    </div>
  );
}
