import React from "react";
import "./contact.css";

export default function Contact({ layout = "text-left" }) {
    // layout: "text-left" or "text-right"
    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Thanks for submitting your enquiry!");
        e.target.reset();
    };

    return (
        <section id="contact" className={`ph-contact ${layout} theme-photo`} aria-labelledby="ph-contact-title">
            <div className="ph-contact__copy">
                <p className="ph-eyebrow">Contact</p>
                <h1 id="ph-contact-title">We’d love to hear from you</h1>
                <p>
                    Have a question about adoption, releasing a pet, or anything else?
                    Send us a message and our team will get back to you soon.
                </p>
                <ul className="ph-contact__highlights">
                    <li>Response within 1–2 business days</li>
                    <li>Friendly guidance for adopters & owners</li>
                    <li>Safe, responsible rehoming support</li>
                </ul>
            </div>

            <form className="ph-contact__form" onSubmit={handleSubmit} noValidate>
                <div className="ph-field">
                    <label htmlFor="name">Name</label>
                    <input id="name" name="name" type="text" placeholder="Your full name" required />
                </div>

                <div className="ph-field">
                    <label htmlFor="email">Email</label>
                    <input id="email" name="email" type="email" placeholder="you@example.com" required />
                </div>

                <div className="ph-field">
                    <label htmlFor="phone">Contact</label>
                    <input id="phone" name="phone" type="tel" placeholder="e.g., +65 9123 4567" />
                </div>

                <div className="ph-field">
                    <label htmlFor="type">Enquiry Type</label>
                    <select id="type" name="type" defaultValue="" required>
                        <option value="" disabled>
                            Select type
                        </option>
                        <option value="General">General</option>
                        <option value="Adopt">Adopt</option>
                        <option value="Release">Release</option>
                    </select>
                </div>

                <div className="ph-field">
                    <label htmlFor="message">Message</label>
                    <textarea id="message" name="message" rows="6" placeholder="How can we help?" required />
                </div>

                <button type="submit" className="ph-btn">Submit</button>
            </form>
        </section>
    );
}
