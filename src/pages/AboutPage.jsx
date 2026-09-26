import NodeHeader from "../components/NodeHeader";
import PipelineConnector from "../components/PipelineConnector";
import ResumeActions from "../components/ResumeActions";
import Seo from "../components/Seo";
import SpecPanel from "../components/SpecPanel";
import TagList from "../components/TagList";
import { experience } from "../data/experienceData";
import { faq_entries } from "../data/faqData";
import { principles } from "../data/principlesData";
import { profile } from "../data/profileData";
import { format_count } from "../utils/format";
import { build_faq_schema } from "../utils/structured_data";

/**
 * Format a role's date range for the timeline, e.g. "2023-04 — present".
 *
 * @param {import("../data/experienceData").experience_entry} entry - Experience entry.
 * @returns {string} Date range.
 */
function format_date_range(entry) {
  return `${entry.start_date} — ${entry.end_date}`;
}

/**
 * About page: background, skills, experience, working principles, and an FAQ
 * (also published as FAQPage JSON-LD). Resume actions sit in the page header.
 *
 * @returns {import("react").JSX.Element} Page content.
 */
export default function AboutPage() {
  const skill_count = profile.skills.reduce((total, group) => total + group.items.length, 0);

  /** @type {import("../components/SpecPanel").spec_row[]} */
  const resume_rows = [
    { key: "file", value: profile.resume_file_name },
    { key: "actions", value: <ResumeActions is_primary_download /> },
  ];

  return (
    <div className="container page about">
      <Seo
        title="About"
        description={`About ${profile.name}: background, skills across content, SEO, AI tools and web development, experience, and how he works.`}
        path="/about"
        og_type="profile"
        json_ld={[build_faq_schema(faq_entries)]}
      />

      <header className="case_header">
        <div className="case_header_copy">
          <h1 className="page_heading">About {profile.name}</h1>
          <p className="lead">{profile.title}</p>
        </div>
        {profile.resume_url ? (
          <SpecPanel title="resume.pdf" rows={resume_rows} accessible_label="Resume" />
        ) : null}
      </header>

      <section className="pipeline_section" aria-labelledby="about_background">
        <NodeHeader heading_id="about_background" title="Background" />
        <div className="about_story">
          {profile.story.map((paragraph) => (
            <p key={paragraph} className="prose_block">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <PipelineConnector />

      <section className="pipeline_section" aria-labelledby="about_skills">
        <NodeHeader
          heading_id="about_skills"
          title="Skills & tools"
          meta={format_count(skill_count, "skill", "skills")}
        />
        <ul className="skill_grid">
          {profile.skills.map((group) => (
            <li key={group.category} className="skill_group">
              <h3 className="skill_group_title">{group.category}</h3>
              <TagList tags={group.items} label={group.category} />
            </li>
          ))}
        </ul>
      </section>

      <PipelineConnector />

      <section className="pipeline_section" aria-labelledby="about_experience">
        <NodeHeader
          heading_id="about_experience"
          title="Experience"
          meta={format_count(experience.length, "role", "roles")}
        />
        <ol className="timeline">
          {experience.map((entry, entry_index) => (
            <li key={`${entry.role}-${entry_index}`} className="timeline_entry">
              <p className="timeline_dates mono">{format_date_range(entry)}</p>
              <div className="timeline_body">
                <h3 className="timeline_role">{entry.role}</h3>
                <p className="timeline_company">
                  {entry.location ? `${entry.company} · ${entry.location}` : entry.company}
                </p>
                <p className="timeline_description">{entry.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <PipelineConnector />

      <section className="pipeline_section" aria-labelledby="about_principles">
        <NodeHeader heading_id="about_principles" title="How I work" />
        <ul className="principle_grid">
          {principles.map((item) => (
            <li key={item.title} className="principle">
              <h3 className="principle_title">{item.title}</h3>
              <p className="principle_detail">{item.detail}</p>
            </li>
          ))}
        </ul>
      </section>

      <PipelineConnector />

      <section id="faq" className="pipeline_section" tabIndex={-1} aria-labelledby="about_faq">
        <NodeHeader
          heading_id="about_faq"
          title="Frequently asked questions"
          meta={format_count(faq_entries.length, "question", "questions")}
        />
        <div className="faq_list">
          {faq_entries.map((entry) => (
            <div key={entry.question} className="faq_entry">
              <h3 className="faq_question">{entry.question}</h3>
              <p className="faq_answer">{entry.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
