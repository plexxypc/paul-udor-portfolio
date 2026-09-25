import { Link } from "react-router-dom";
import TagList from "./TagList";

/**
 * Homepage card for a case study. The title link is stretched over the whole
 * card so the card is one click target but only one tab stop.
 *
 * @param {{ project: import("../data/projectsData").project }} props - Component props.
 * @returns {import("react").JSX.Element} Card element.
 */
export default function ProjectCard({ project }) {
  return (
    <article className="project_card">
      <div className="project_card_body">
        <h3 className="project_card_title">
          <Link to={`/work/${project.id}`} className="stretched_link">
            {project.title}
          </Link>
        </h3>
        <p className="project_card_summary">{project.summary}</p>
        <span className="project_card_cta" aria-hidden="true">
          Read case study &rarr;
        </span>
      </div>
      <TagList tags={project.stack} label={`${project.title} stack`} />
    </article>
  );
}
