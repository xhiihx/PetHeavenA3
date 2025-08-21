import { useEffect, useRef, useState } from "react";
import "./login.css";

const LS_RELEASE = "phs_releaseRequests";
const readReqs = () => { try { return JSON.parse(localStorage.getItem(LS_RELEASE)) || []; } catch { return []; } };
const writeReqs = (x) => localStorage.setItem(LS_RELEASE, JSON.stringify(x));

export default function ReleaseModal({ open, onClose }) {
  const dialogRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") success ? setSuccess(null) : onClose?.(); };
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, success, onClose]);

  if (!open) return null;

  const handleBackdrop = (e) => {
    if (dialogRef.current && !dialogRef.current.contains(e.target)) {
      success ? setSuccess(null) : onClose?.();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMsg(null);
    const fd = new FormData(e.currentTarget);
    const fullName = (fd.get("fullName") || "").trim();
    const email = (fd.get("email") || "").trim().toLowerCase();
    const phone = (fd.get("phone") || "").trim();
    const petType = (fd.get("petType") || "").trim();
    const reason   = (fd.get("reason") || "").trim();
    const message  = (fd.get("message") || "").trim();

    if (!fullName || !email || !petType || !reason) {
      setMsg({ type: "error", text: "Name, email, pet type and reason are required." });
      return;
    }

    setLoading(true);
    try {
      const req = {
        id: crypto.randomUUID?.() || Date.now().toString(),
        fullName, email, phone, petType, reason, message,
        createdAt: new Date().toISOString(),
      };
      const all = readReqs(); all.push(req); writeReqs(all);
      e.currentTarget.reset();
      setSuccess({ title: "Release request sent", message: "Thanks. Our team will contact you shortly." });
    } finally { setLoading(false); }
  };

  return (
    <div className="auth-backdrop" onMouseDown={handleBackdrop}>
      <section className="auth-modal" role="dialog" aria-modal="true" aria-labelledby="release-title"
        ref={dialogRef} onMouseDown={(e) => e.stopPropagation()}>
        <header className="auth-header">
          <h2 id="release-title" className="auth-title">Release a Pet</h2>
          <button className="auth-close" onClick={() => (success ? setSuccess(null) : onClose?.())} aria-label="Close">×</button>
        </header>

        {msg && <div className={`auth-alert ${msg.type}`}>{msg.text}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <label><span>Full name</span>
            <input name="fullName" type="text" placeholder="Your full name" required />
          </label>
          <label><span>Email</span>
            <input name="email" type="email" placeholder="you@example.com" required />
          </label>
          <label><span>Phone (optional)</span>
            <input name="phone" type="tel" placeholder="e.g. +65 9123 4567" />
          </label>
          <label><span>Pet type</span>
            <select name="petType" defaultValue="" required>
              <option value="" disabled>Select one…</option>
              <option>Dog</option><option>Cat</option><option>Other</option>
            </select>
          </label>
          <label><span>Reason for release</span>
            <select name="reason" defaultValue="" required>
              <option value="" disabled>Select one…</option>
              <option>Relocation</option><option>Allergies</option><option>Financial</option>
              <option>Behavioral</option><option>Health</option><option>Other</option>
            </select>
          </label>
          <label><span>Message</span>
            <textarea name="message" rows="4" placeholder="Anything we should know?" />
          </label>
          <button className="auth-btn" type="submit" disabled={loading}>
            {loading ? "Sending…" : "Send request"}
          </button>
        </form>

        {success && (
          <div className="auth-overlay" role="alertdialog" aria-modal="true" aria-labelledby="rel-success-title">
            <div className="auth-success-card">
              <div className="auth-check" aria-hidden="true">
                <svg width="44" height="44" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="11" fill="#e8f5e9" />
                  <path d="M7 12.5l3 3 7-7" fill="none" stroke="#16a34a" strokeWidth="2"
                        strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 id="rel-success-title" className="auth-success-title">{success.title}</h3>
              <p className="auth-success-msg">{success.message}</p>
              <button className="auth-btn" onClick={() => { setSuccess(null); onClose?.(); }}>Continue</button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
