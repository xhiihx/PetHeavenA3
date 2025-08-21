import React from "react";
import "./blogs.css";

const HeartHandsIcon = (props) => (
    <svg viewBox="0 0 64 64" aria-hidden="true" {...props}>
        <path
            d="M32 56s-24-14-24-30a12 12 0 0 1 21-8 12 12 0 0 1 21 8c0 16-24 30-24 30z"
            fill="currentColor"
        />
    </svg>
);

const CatBoxIcon = (props) => (
    <svg viewBox="0 0 64 64" aria-hidden="true" {...props}>
        <path d="M10 26h44v24H10z" fill="none" stroke="currentColor" strokeWidth="3" />
        <path d="M10 26l8-12 8 12m28 0l-8-12-8 12" fill="none" stroke="currentColor" strokeWidth="3" />
        <path d="M24 31h16" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <circle cx="28" cy="37" r="2" fill="currentColor" /><circle cx="36" cy="37" r="2" fill="currentColor" />
    </svg>
);

const StethoIcon = (props) => (
    <svg viewBox="0 0 64 64" aria-hidden="true" {...props}>
        <path d="M18 10v16a10 10 0 0 0 20 0V10" fill="none" stroke="currentColor" strokeWidth="3" />
        <path d="M54 20a6 6 0 1 1-6-6v18a16 16 0 0 1-32 0" fill="none" stroke="currentColor" strokeWidth="3" />
        <circle cx="48" cy="20" r="6" fill="none" stroke="currentColor" strokeWidth="3" />
    </svg>
);

const HeartPetsIcon = (props) => (
    <svg viewBox="0 0 64 64" aria-hidden="true" {...props}>
        <path d="M32 54S8 40 8 24a10 10 0 0 1 18-6 10 10 0 0 1 12 0 10 10 0 0 1 18 6c0 16-24 30-24 30Z"
            fill="none" stroke="currentColor" strokeWidth="3" />
        <circle cx="23" cy="25" r="2.2" fill="currentColor" />
        <circle cx="41" cy="25" r="2.2" fill="currentColor" />
        <path d="M29 31c2 2 4 2 6 0" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
);

const items = [
    {
        id: "adoption",
        title: "PET ADOPTION",
        desc:
            "Adopt instead! We try out best to always vet and find proper owners!",
        Icon: HeartHandsIcon,
    },
    {
        id: "release",
        title: "PET RELEASE",
        desc:
            "Please release pets to us! We ensure their health and care before putting them up for adoption!.",
        Icon: CatBoxIcon,
    },
    {
        id: "health",
        title: "HEALTH & REHABILITATION",
        desc:
            "Every pet in our care receives proper medical attention, vaccinations, and behavioral support.",
        Icon: StethoIcon,
    },
    {
        id: "awareness",
        title: "COMMUNITY AWARENESS",
        desc:
            "We try out best to educate and give the resources needed for this. We try our best to reduce abandonment by working to re-educate the community!",
        Icon: HeartPetsIcon,
    },
];

export default function Blogs() {
    const clickStub = (e) => {
        e.preventDefault();
        // intentionally does nothing
    };

    return (
        <section className="ph-blogs" aria-labelledby="ph-blogs-title">
            <h2 id="ph-blogs-title" className="sr-only">Latest from our blog</h2>

            <div className="ph-blogs__grid">
                {items.map(({ id, title, desc, Icon }) => (
                    <article key={id} className="ph-card">
                        <div className="ph-card__icon">
                            <Icon className="ph-icon" />
                        </div>

                        <header className="ph-card__head">
                            <h3>
                                {title}
                            </h3>
                        </header>

                        <p className="ph-card__desc">{desc}</p>

                        <button
                            type="button"
                            className="ph-card__cta ph-card__cta--linklike"
                            onClick={clickStub}
                        >
                            LEARN MORE &raquo;
                        </button>
                    </article>
                ))}
            </div>
        </section>
    );
}
