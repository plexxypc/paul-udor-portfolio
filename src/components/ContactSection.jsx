import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { profile } from "../data/profileData";
import NodeHeader from "./NodeHeader";

/**
 * @typedef {"hire" | "build" | "other"} contact_intent
 * @typedef {"idle" | "sending" | "sent" | "error"} submit_status
 */

/** @type {{ value: contact_intent, label: string }[]} */
const INTENT_OPTIONS = [
  { value: "hire", label: "Hiring for a role" },
  { value: "build", label: "Commissioning an automation build" },
  { value: "other", label: "Something else" },
];

const FORMSUBMIT_AJAX_URL = `https://formsubmit.co/ajax/${encodeURIComponent(profile.email)}`;
const FORMSUBMIT_FALLBACK_URL = `https://formsubmit.co/${encodeURIComponent(profile.email)}`;

/**
 * Validate an intent string from the URL.
 *
 * @param {string | null} value - Raw `?intent=` value.
 * @returns {contact_intent} A known intent, defaulting to "other".
 */
function to_contact_intent(value) {
  return INTENT_OPTIONS.some((option) => option.value === value) ? /** @type {contact_intent} */ (value) : "other";
}

/**
 * Human label for an intent.
 *
 * @param {contact_intent} intent - Intent value.
 * @returns {string} Label.
 */
function get_intent_label(intent) {
  return INTENT_OPTIONS.find((option) => option.value === intent)?.label ?? "Something else";
}

/**
 * Send the form through FormSubmit's AJAX endpoint.
 *
 * @param {FormData} form_data - Submitted fields.
 * @returns {Promise<void>} Resolves on success, rejects with a readable message.
 */
async function send_to_formsubmit(form_data) {
  const intent = to_contact_intent(String(form_data.get("intent")));
  const payload = {
    name: String(form_data.get("name") ?? ""),
    email: String(form_data.get("email") ?? ""),
    intent: get_intent_label(intent),
    message: String(form_data.get("message") ?? ""),
    _subject: `Portfolio enquiry — ${get_intent_label(intent)}`,
    _template: "table",
  };

  const response = await fetch(FORMSUBMIT_AJAX_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  const result = await response.json().catch(() => ({}));

  if (!response.ok || String(result.success) !== "true") {
    throw new Error(result.message || "The message couldn't be sent.");
  }
}

/**
 * Contact form. Works without JavaScript via a normal POST to FormSubmit; with
 * JavaScript it submits in place and reports status inline.
 *
 * @param {{ initial_intent: contact_intent }} props - Component props.
 * @returns {import("react").JSX.Element} Form element.
 */
function ContactForm({ initial_intent }) {
  const [status, set_status] = useState(/** @type {submit_status} */ ("idle"));
  const [error_message, set_error_message] = useState("");

  /**
   * @param {import("react").FormEvent<HTMLFormElement>} event - Submit event.
   * @returns {Promise<void>}
   */
  async function handle_submit(event) {
    event.preventDefault();
    const form_element = event.currentTarget;
    const form_data = new FormData(form_element);

    if (String(form_data.get("_honey") ?? "")) {
      set_status("sent");
      return;
    }

    set_status("sending");
    set_error_message("");
    try {
      await send_to_formsubmit(form_data);
      form_element.reset();
      set_status("sent");
    } catch (error) {
      set_error_message(error instanceof Error ? error.message : String(error));
      set_status("error");
    }
  }

  return (
    <form className="contact_form" action={FORMSUBMIT_FALLBACK_URL} method="POST" onSubmit={handle_submit}>
      <div className="form_field">
        <label htmlFor="contact_intent">What's this about?</label>
        <select id="contact_intent" name="intent" defaultValue={initial_intent}>
          {INTENT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="form_row">
        <div className="form_field">
          <label htmlFor="contact_name">Name</label>
          <input id="contact_name" name="name" type="text" autoComplete="name" required />
        </div>
        <div className="form_field">
          <label htmlFor="contact_email">Email</label>
          <input id="contact_email" name="email" type="email" autoComplete="email" required />
        </div>
      </div>
      <div className="form_field">
        <label htmlFor="contact_message">Message</label>
        <textarea id="contact_message" name="message" rows={6} required />
      </div>
      <div className="visually_hidden" aria-hidden="true">
        <label htmlFor="contact_honey">Leave this field empty</label>
        <input id="contact_honey" name="_honey" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="form_actions">
        <button type="submit" className="button button_primary" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send message"}
        </button>
        <output className={`form_status form_status_${status}`} aria-live="polite">
          {status === "sent" && "Sent. Thanks — I'll reply by email."}
          {status === "error" && (
            <>
              {error_message} You can also email{" "}
              <a href={`mailto:${profile.email}`}>{profile.email}</a> directly.
            </>
          )}
        </output>
      </div>
    </form>
  );
}

/**
 * "Get in touch" node at the end of the homepage pipeline. Reads `?intent=`
 * so the hero's hire / commission buttons preselect the right option.
 *
 * @returns {import("react").JSX.Element} Contact section.
 */
export default function ContactSection() {
  const [search_params] = useSearchParams();
  const initial_intent = to_contact_intent(search_params.get("intent"));

  return (
    <section id="contact" className="container pipeline_section" tabIndex={-1} aria-labelledby="contact_heading">
      <NodeHeader heading_id="contact_heading" title="Get in touch" meta={profile.email} />
      <div className="contact_layout">
        <div className="contact_intro">
          <p>
            Hiring for a role, or want an automation system built for your team? Pick which one below — both go
            straight to my inbox.
          </p>
          <ul className="contact_links">
            <li>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </li>
            {profile.socials.map((social) => (
              <li key={social.label}>
                <a href={social.url} target="_blank" rel="noreferrer">
                  {social.label}
                </a>{" "}
                <span className="mono contact_handle">{social.handle}</span>
              </li>
            ))}
          </ul>
        </div>
        <ContactForm key={initial_intent} initial_intent={initial_intent} />
      </div>
    </section>
  );
}
