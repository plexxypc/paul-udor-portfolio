import { profile } from "../data/profileData";
import NodeHeader from "./NodeHeader";
import ResumeActions from "./ResumeActions";

/**
 * Resume node on the homepage: download the PDF or open it in the browser.
 * Renders nothing when profile.resume_url is empty.
 *
 * @returns {import("react").JSX.Element | null} Resume section, or nothing.
 */
export default function ResumeSection() {
  if (!profile.resume_url) return null;

  return (
    <section id="resume" className="container pipeline_section" tabIndex={-1} aria-labelledby="resume_heading">
      <NodeHeader heading_id="resume_heading" title="Resume" meta="pdf" />
      <div className="resume_card">
        <div className="resume_card_copy">
          <p className="resume_card_title">
            {profile.name} — {profile.title}
          </p>
          <p className="resume_card_text">
            Experience, skills, and background in one document, for hiring managers and teams scoping a build.
          </p>
        </div>
        <ResumeActions is_primary_download />
        <p className="resume_card_file mono" aria-hidden="true">
          {profile.resume_file_name}
        </p>
      </div>
    </section>
  );
}
