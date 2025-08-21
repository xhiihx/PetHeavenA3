import React, { useEffect, useRef, useState } from "react";
import "./login.css";

/** localStorage keys */
const LS_USERS = "phs_users";
const LS_CURRENT_USER = "phs_currentUser";

/** helpers */
const readUsers = () => {
  try { return JSON.parse(localStorage.getItem(LS_USERS)) || []; }
  catch { return []; }
};
const writeUsers = (users) => localStorage.setItem(LS_USERS, JSON.stringify(users));
const setCurrentUser = (user) => localStorage.setItem(LS_CURRENT_USER, JSON.stringify(user));
export const getCurrentUser = () => {
  try { return JSON.parse(localStorage.getItem(LS_CURRENT_USER)); }
  catch { return null; }
};
export const clearCurrentUser = () => localStorage.removeItem(LS_CURRENT_USER);
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());

export default function AuthModal({ open, mode = "login", onClose, onAuthed }) {
  const [active, setActive] = useState(mode);      // "login" | "register"
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);
  const [success, setSuccess] = useState(null);    // { title, message, intent: "go-login" | "close" }

  // show/hide password toggles (text buttons)
  const [showLoginPw, setShowLoginPw] = useState(false);
  const [showRegisterPw, setShowRegisterPw] = useState(false);

  const dialogRef = useRef(null);

  useEffect(() => setActive(mode), [mode]);

  // Close on ESC (overlay-aware)
  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      if (success) setSuccess(null);
      else onClose?.();
    };
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose, success]);

  useEffect(() => { if (open) setMsg(null); }, [open, active]);

  if (!open) return null;

  const handleBackdrop = (e) => {
    if (dialogRef.current && !dialogRef.current.contains(e.target)) {
      if (success) setSuccess(null);
      else onClose?.();
    }
  };

  // ---- Register (NO auto-login) ----
  const handleRegister = async (e) => {
    e.preventDefault();
    setMsg(null);

    const fd = new FormData(e.currentTarget);
    const name = (fd.get("name") || "").trim();
    const address = (fd.get("address") || "").trim();
    const email = (fd.get("email") || "").trim().toLowerCase();
    const password = (fd.get("password") || "").trim();

    if (!name || !address || !email || !password) {
      setMsg({ type: "error", text: "All fields are required." }); return;
    }
    if (!validateEmail(email)) {
      setMsg({ type: "error", text: "Please enter a valid email." }); return;
    }
    if (password.length < 6) {
      setMsg({ type: "error", text: "Password should be at least 6 characters." }); return;
    }

    setLoading(true);
    try {
      const users = readUsers();
      if (users.some(u => u.email === email)) {
        setMsg({ type: "error", text: "Email is already registered." });
        setLoading(false); return;
      }
      users.push({ name, address, email, password });
      writeUsers(users);

      // Clear form and show confirmation overlay that leads to Login view
      e.currentTarget.reset();
      setSuccess({
        title: "Registration complete",
        message: "Your account has been created. Please log in to continue.",
        intent: "go-login",
      });
    } finally {
      setLoading(false);
    }
  };

  // ---- Login (shows success then closes modal) ----
  const handleLogin = async (e) => {
    e.preventDefault();
    setMsg(null);

    const fd = new FormData(e.currentTarget);
    const email = (fd.get("email") || "").trim().toLowerCase();
    const password = (fd.get("password") || "").trim();

    if (!email || !password) {
      setMsg({ type: "error", text: "Email and password are required." }); return;
    }
    if (!validateEmail(email)) {
      setMsg({ type: "error", text: "Please enter a valid email." }); return;
    }

    setLoading(true);
    try {
      const users = readUsers();
      const found = users.find(u => u.email === email && u.password === password);
      if (!found) {
        setMsg({ type: "error", text: "Invalid email or password." });
        setLoading(false); return;
      }

      // Set logged-in user, notify parent, then show success overlay
      setCurrentUser({ name: found.name, email: found.email });
      onAuthed?.({ name: found.name, email: found.email });

      setSuccess({
        title: "Logged in",
        message: `Welcome back, ${found.name}!`,
        intent: "close",
      });
    } finally {
      setLoading(false);
    }
  };

  const title = active === "login" ? "Login" : "Register";

  return (
    <div className="auth-backdrop" onMouseDown={handleBackdrop}>
      <section
        className="auth-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-title"
        ref={dialogRef}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* Header with centered title */}
        <header className="auth-header">
          <h2 id="auth-title" className="auth-title">{title}</h2>
          <button className="auth-close" onClick={() => (success ? setSuccess(null) : onClose?.())} aria-label="Close">×</button>
        </header>

        {msg && <div className={`auth-alert ${msg.type}`}>{msg.text}</div>}

        {active === "register" ? (
          <form className="auth-form" onSubmit={handleRegister}>
            <label>
              <span>Name</span>
              <input name="name" type="text" placeholder="Your full name" autoComplete="name" required />
            </label>
            <label>
              <span>Address</span>
              <input name="address" type="text" placeholder="123 Pet St" autoComplete="street-address" required />
            </label>
            <label>
              <span>Email</span>
              <input name="email" type="email" placeholder="you@example.com" autoComplete="email" required />
            </label>
            <label>
              <span>Password</span>
              <input
                name="password"
                type={showRegisterPw ? "text" : "password"}
                placeholder="••••••••"
                autoComplete="new-password"
                required
              />
            </label>
            <div className="pw-actions">
              <button
                type="button"
                className="pw-toggle-text"
                aria-pressed={showRegisterPw}
                onClick={() => setShowRegisterPw(v => !v)}
              >
                {showRegisterPw ? "Hide password" : "Show password"}
              </button>
            </div>

            <button className="auth-btn" type="submit" disabled={loading}>
              {loading ? "Creating account…" : "Create account"}
            </button>

            <p className="auth-switch">
              Already have an account?
              <button type="button" className="auth-link" onClick={() => setActive("login")}>
                Login
              </button>
            </p>
          </form>
        ) : (
          <form className="auth-form" onSubmit={handleLogin}>
            <label>
              <span>Email</span>
              <input name="email" type="email" placeholder="you@example.com" autoComplete="email" required />
            </label>
            <label>
              <span>Password</span>
              <input
                name="password"
                type={showLoginPw ? "text" : "password"}
                placeholder="••••••••"
                autoComplete="current-password"
                required
              />
            </label>
            <div className="pw-actions">
              <button
                type="button"
                className="pw-toggle-text"
                aria-pressed={showLoginPw}
                onClick={() => setShowLoginPw(v => !v)}
              >
                {showLoginPw ? "Hide password" : "Show password"}
              </button>
            </div>

            <button className="auth-btn" type="submit" disabled={loading}>
              {loading ? "Signing in…" : "Sign in"}
            </button>

            <p className="auth-switch">
              Don’t have an account?
              <button type="button" className="auth-link" onClick={() => setActive("register")}>
                Register
              </button>
            </p>
          </form>
        )}

        {/* Success overlay */}
        {success && (
          <div
            className="auth-overlay"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="auth-success-title"
          >
            <div className="auth-success-card">
              <div className="auth-check" aria-hidden="true">
                <svg width="44" height="44" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="11" fill="#e8f5e9" />
                  <path d="M7 12.5l3 3 7-7" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 id="auth-success-title" className="auth-success-title">{success.title}</h3>
              <p className="auth-success-msg">{success.message}</p>
              <button
                className="auth-btn"
                onClick={() => {
                  if (success?.intent === "go-login") {
                    setSuccess(null);
                    setActive("login");
                  } else {
                    setSuccess(null);
                    onClose?.();
                  }
                }}
              >
                Continue
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
