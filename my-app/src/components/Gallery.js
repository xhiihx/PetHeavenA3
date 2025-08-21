import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import "./gallery.css";

import { dogs, cats } from "./Data.js";

const DOG_API = "https://api.thedogapi.com/v1/images/search";
const CAT_API = "https://api.thecatapi.com/v1/images/search";

const isGoodImage = (url) =>
    typeof url === "string" &&
    !/\.mp4($|\?)/i.test(url) &&
    !/\.gif($|\?)/i.test(url); // keep jpg/png/webp, ignore videos/gifs

async function fetchNImages(apiBase, n, maxAttempts = 5) {
    const urls = new Set();
    let attempts = 0;

    while (urls.size < n && attempts < maxAttempts) {
        attempts++;
        const left = n - urls.size;
        const limit = Math.min(left, 20); // per-request batch
        const params = { limit, order: "RAND" };
        const res = await axios.get(apiBase, { params });
        const batch = (res.data || [])
            .map((x) => x?.url)
            .filter(isGoodImage);
        batch.forEach((u) => urls.add(u));
    }

    // If still short, cycle what we have to fill to n (so we ALWAYS render 20)
    const out = Array.from(urls);
    if (out.length === 0) return Array(n).fill(null);
    while (out.length < n) out.push(out[out.length % urls.size]);
    return out.slice(0, n);
}

export default function Gallery() {
    const [items, setItems] = useState(null); // null until ready
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        species: "all",
        gender: "all",
        age: "all",
    });

    const inAgeRange = (years, token) => {
        if (token === "all") return true;
        const [min, max] = token.split("-").map(Number);
        return years >= min && years <= max;
    };

    const filteredItems = useMemo(() => {
        if (!items) return [];
        return items.filter(p =>
            (filters.species === "all" || p.species === filters.species) &&
            (filters.gender === "all" || p.gender === filters.gender) &&
            inAgeRange(p.age, filters.age)
        );
    }, [items, filters]);


    const onChange = (e) => setFilters(f => ({ ...f, [e.target.name]: e.target.value }));
    const resetFilters = () => setFilters({ species: "all", gender: "all", age: "all" });

    useEffect(() => {
        let alive = true;
        (async () => {
            try {
                // 1) FIRST: fetch 20 dog + 20 cat images
                const [dogUrls, catUrls] = await Promise.all([
                    fetchNImages(DOG_API, 10),
                    fetchNImages(CAT_API, 10),
                ]);

                if (!alive) return;

                // 2) THEN: build the 40 cards from your data
                const dogCards = dogs.slice(0, 10).map((p, i) => ({
                    ...p,
                    species: "dog",
                    photo: dogUrls[i],
                }));
                const catCards = cats.slice(0, 10).map((p, i) => ({
                    ...p,
                    species: "cat",
                    photo: catUrls[i],
                }));

                setItems([...dogCards, ...catCards]); // ALWAYS 40 entries
            } catch (e) {
                if (alive) setError(e?.message || "Failed to load gallery");
            }
        })();
        return () => { alive = false; };
    }, []);

    if (error) {
        return <section className="pet-gallery"><p className="pet-error">Oops: {error}</p></section>;
    }

    if (!items) {
        // loading skeleton while we fetch BOTH sets first
        return (
            <section className="pet-gallery">
                <h2 className="pet-count">Preparing cards…</h2>
                <div className="pet-grid">
                    {Array.from({ length: 40 }).map((_, i) => <div className="pet-card skeleton" key={i} />)}
                </div>
            </section>
        );
    }

    return (
        <section className="pet-gallery" aria-labelledby="pet-gallery-title">
            <h1 id="pet-gallery-title" className="sr-only">Adoptee Gallery</h1>

            <div className="pet-filters">
                <div className="pet-filters__row">
                    <label>
                        <span>Species</span>
                        <select name="species" value={filters.species} onChange={onChange}>
                            <option value="all">All</option>
                            <option value="dog">Dogs</option>
                            <option value="cat">Cats</option>
                        </select>
                    </label>

                    <label>
                        <span>Gender</span>
                        <select name="gender" value={filters.gender} onChange={onChange}>
                            <option value="all">All</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </label>

                    <label>
                        <span>Age</span>
                        <select name="age" value={filters.age} onChange={onChange}>
                            <option value="all">All</option>
                            <option value="0-2">0–2 years</option>
                            <option value="3-5">3–5 years</option>
                            <option value="6-9">6–9 years</option>
                            <option value="10-16">10–16 years</option>
                        </select>
                    </label>

                    <button className="ph-btn" type="button" onClick={resetFilters}>Reset</button>

                    <span className="pet-count">Showing {filteredItems.length} of 20</span>
                </div>
            </div>

            <div className="pet-grid">
                {filteredItems.map((pet) => (
                    <article className="pet-card" key={pet.id}>
                        <img
                            src={pet.photo || ""}
                            alt={`${pet.name} the ${pet.species}`}
                            onError={(e) => {
                                //if an image 404s after pairing
                                e.currentTarget.style.background =
                                    "linear-gradient(135deg,#edf2ff,#f8fafc)";
                                e.currentTarget.style.opacity = "0"; // hide broken icon but keep space
                            }}
                        />
                        <div className="pet-overlay">
                            <p><span className="k">Name:</span> <span className="v">{pet.name}</span></p>
                            <p><span className="k">Age:</span> <span className="v">
                                {pet.age} {pet.age === 1 ? "year" : "years"}
                            </span></p>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}