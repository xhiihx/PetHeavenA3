import { useEffect, useRef, useState } from "react";
import "./login.css";

const LS_ADOPT = "phs_adoptionRequests";
const readReqs = () => {
    try { return JSON.parse(localStorage.getItem(LS_ADOPT)) || []; }
    catch { return []; }
};
const writeReqs = (x) => localStorage.setItem(LS_ADOPT, JSON.stringify(x));

export default function AdoptionModal({ open, onClose, selectedPet }) {
    const dialogRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState(null);
    const [success, setSuccess] = useState(null);
    const lockPetFields = !!selectedPet;

    useEffect(() => {
        const onKey = (e) => {
            if (e.key !== "Escape") return;
            if (success) setSuccess(null);
            else onClose?.();
        };
        if (open) document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [open, success, onClose]);

    if (!open) return null;

    const handleBackdrop = (e) => {
        if (dialogRef.current && !dialogRef.current.contains(e.target)) {
            if (success) setSuccess(null);
            else onClose?.();
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
        const petName = (fd.get("petName") || "").trim();
        const breed = (fd.get("breed") || "").trim();
        const age = (fd.get("age") || "").trim();
        const petId = (fd.get("petId") || "").trim();
        const image = (fd.get("image") || "").trim();
        const adoptable = (fd.get("adoptable") || "") === "true";
        const message = (fd.get("message") || "").trim();

        if (!fullName || !email || !petType || !petName) {
            setMsg({ type: "error", text: "Name, email and pet type are required." });
            return;
        }

        setLoading(true);
        try {
            const req = {
                id: crypto.randomUUID?.() || Date.now().toString(),
                // applicant
                fullName, email, phone, message,
                // pet snapshot
                pet: {
                    id: petId || selectedPet?.id || "",
                    name: petName,
                    type: petType,
                    breed,
                    age,
                    adoptable,
                    image
                },
                createdAt: new Date().toISOString(),
            };
            const all = readReqs();
            all.push(req);
            writeReqs(all);

            e.currentTarget.reset();
            setSuccess({
                title: "Adoption request sent",
                message: "Thanks! We’ll get back to you via email shortly.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-backdrop" onMouseDown={handleBackdrop}>
            <section
                className="auth-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="adopt-title"
                ref={dialogRef}
                onMouseDown={(e) => e.stopPropagation()}
            >
                <header className="auth-header">
                    <h2 id="adopt-title" className="auth-title">Adoption Form</h2>
                    <button className="auth-close" onClick={() => (success ? setSuccess(null) : onClose?.())} aria-label="Close">×</button>
                </header>

                {msg && <div className={`auth-alert ${msg.type}`}>{msg.text}</div>}

                <form className="auth-form" onSubmit={handleSubmit}>
                    <label>
                        <span>Full name</span>
                        <input name="fullName" type="text" placeholder="Your full name" autoComplete="name" required />
                    </label>
                    <label>
                        <span>Email</span>
                        <input name="email" type="email" placeholder="you@example.com" autoComplete="email" required />
                    </label>
                    <label>
                        <span>Phone (optional)</span>
                        <input name="phone" type="tel" placeholder="e.g. +65 9123 4567" autoComplete="tel" />
                    </label>
                    <label>
                        <span>Pet type</span>
                        <select
                            name="petType"
                            defaultValue={selectedPet?.type || ""}
                            // if no selectedPet, this becomes a required user choice
                            required={!lockPetFields}
                        >
                            <option value="" disabled>Select one…</option>
                            <option>Dog</option>
                            <option>Cat</option>
                            <option>Other</option>
                        </select>
                    </label>

                    <label>
                        <span>Name of Adoptee</span>
                        <input
                            name="petName"
                            type="text"
                            placeholder="Adoptee Name"
                            defaultValue={selectedPet?.name || ""}
                            readOnly={lockPetFields}         // locked if chosen from a card
                            required={!lockPetFields}        // required if user didn’t click a card
                        />
                    </label>

                    <label>
                        <span>Breed</span>
                        <input
                            name="breed"
                            type="text"
                            placeholder="Breed"
                            defaultValue={selectedPet?.breed || ""}  // prefill if we have it
                            readOnly={lockPetFields}                 // editable when no card was clicked
                            required={!lockPetFields}
                        />
                    </label>

                    <label>
                        <span>Age</span>
                        <input
                            name="age"
                            type="text"
                            placeholder="Age"
                            defaultValue={selectedPet?.age ?? ""}    // prefill if we have it
                            readOnly={lockPetFields}
                            required={!lockPetFields}
                        />
                    </label>

                    {/* Hidden extras are fine; they'll be empty when no card was clicked */}
                    <input type="hidden" name="petId" value={selectedPet?.id ?? ""} />
                    <input type="hidden" name="image" value={selectedPet?.image ?? ""} />
                    <input type="hidden" name="adoptable" value={String(selectedPet?.adoptable ?? "")} />

                    <label>
                        <span>Message</span>
                        <textarea name="message" rows="4" placeholder="Tell us about your home, preferred breed/age, etc." />
                    </label>

                    <button className="auth-btn" type="submit" disabled={loading}>
                        {loading ? "Sending…" : "Send request"}
                    </button>
                </form>

                {/* Success overlay */}
                {success && (
                    <div className="auth-overlay" role="alertdialog" aria-modal="true" aria-labelledby="adopt-success-title">
                        <div className="auth-success-card">
                            <div className="auth-check" aria-hidden="true">
                                <svg width="44" height="44" viewBox="0 0 24 24">
                                    <circle cx="12" cy="12" r="11" fill="#e8f5e9" />
                                    <path d="M7 12.5l3 3 7-7" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <h3 id="adopt-success-title" className="auth-success-title">{success.title}</h3>
                            <p className="auth-success-msg">{success.message}</p>
                            <button className="auth-btn" onClick={() => { setSuccess(null); onClose?.(); }}>
                                Continue
                            </button>
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
}
