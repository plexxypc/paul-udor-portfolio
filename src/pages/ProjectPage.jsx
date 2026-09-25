import { Link, useParams } from "react-router-dom";
import LiveDemo from "../components/LiveDemo";
import NodeHeader from "../components/NodeHeader";
import PipelineConnector from "../components/PipelineConnector";
import SpecPanel from "../components/SpecPanel";
import TagList from "../components/TagList";
import { get_project_by_id } from "../data/projectsData";
import { useDocumentTitle } from "../hooks/use_document_title";
import NotFoundPage from "./NotFoundPage";

/**
 * Build the case-study readout rows, skipping links that aren't set.
 *
 * @param {import("../data/projectsData").project} project - Project to describe.
 * @returns {import("../components/SpecPanel").spec_row[]} Rows.
 */
function build_spec_rows(project) {
  /** @type {import("../components/SpecPanel").spec_row[]} */
  const rows = [{ key: "stack", value: <TagList tags={project.stack} label={`${project.title} stack`} /> }];
  if (project.github_url) {
    rows.push({
      key: "source",
      value: (
        <a href={project.github_url} target="_blank" rel="noreferrer">
          GitHub &#8599;
        </a>
      ),
    });
  }
  if (project.demo_url) {
    rows.push({
      key: "demo",
      value: (
        <a href={project.demo_url} target="_blank" rel="noreferrer">
          Live &#8599;
        </a>
      ),
      is_signal: true,
    });
  }
  return rows;
}

/**
 * Case-study page: problem → approach → architecture notes → result,
 * presented as a pipeline because it genuinely is one.
 *
 * @returns {import("react").JSX.Element} Page content.
 */
export default function ProjectPage() {
  const { project_id } = useParams();
  const project = get_project_by_id(project_id);
  useDocumentTitle(project ? project.title : "Not found");

  if (!project) {
    return <NotFoundPage />;
  }

  return (
    <article className="container page case_study">
      <Link to="/#work" className="back_link">
        &larr; All work
      </Link>

      <header className="case_header">
        <div className="case_header_copy">
          <h1 className="page_heading">{project.title}</h1>
          <p className="lead">{project.summary}</p>
        </div>
        <SpecPanel title="project.meta" rows={build_spec_rows(project)} accessible_label="Project details" />
      </header>

      <LiveDemo demo_url={project.demo_url} demo_embed={project.demo_embed} project_title={project.title} />

      <section className="case_section" aria-labelledby="case_problem">
        <NodeHeader heading_id="case_problem" title="Problem" />
        <p className="prose_block">{project.problem}</p>
      </section>

      <PipelineConnector size="compact" />

      <section className="case_section" aria-labelledby="case_approach">
        <NodeHeader heading_id="case_approach" title="Approach" />
        <p className="prose_block">{project.approach}</p>
      </section>

      <PipelineConnector size="compact" />

      <section className="case_section" aria-labelledby="case_architecture">
        <NodeHeader heading_id="case_architecture" title="Architecture notes" />
        <ul className="spec_list">
          {project.architecture_notes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </section>

      <PipelineConnector size="compact" />

      <section className="case_section" aria-labelledby="case_result">
        <NodeHeader heading_id="case_result" title="Result" />
        <p className="prose_block">{project.result}</p>
      </section>
    </article>
  );
}
