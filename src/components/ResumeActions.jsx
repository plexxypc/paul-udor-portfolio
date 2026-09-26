import { profile } from "../data/profileData";
import DownloadIcon from "./DownloadIcon";

/**
 * Resume buttons: download the PDF, or open it in a new tab. Shared by the
 * hero's profile.config panel, the homepage Resume section, and the About page.
 * Renders nothing when profile.resume_url is empty.
 *
 * @param {Object} props - Component props.
 * @param {"default" | "small"} [props.size] - "small" for compact config panels.
 * @param {boolean} [props.is_primary_download] - Give the download button primary emphasis.
 * @returns {import("react").JSX.Element | null} Button group, or nothing.
 */
export default function ResumeActions({ size = "default", is_primary_download = false }) {
  if (!profile.resume_url) return null;

  const is_small = size === "small";
  const size_class = is_small ? " button_small" : "";
  const download_class = `button${size_class}${is_primary_download ? " button_primary" : ""}`;

  return (
    <span className={is_small ? "spec_actions" : "resume_actions"}>
      <a
        className={download_class}
        href={profile.resume_url}
        download={profile.resume_file_name}
        aria-label="Download resume (PDF)"
      >
        <DownloadIcon size={is_small ? 14 : 16} />
        {is_small ? "Download" : "Download resume"}
      </a>
      <a
        className={`button${size_class}`}
        href={profile.resume_url}
        target="_blank"
        rel="noreferrer"
        aria-label="View resume in browser (opens in a new tab)"
      >
        View in browser &#8599;
      </a>
    </span>
  );
}
