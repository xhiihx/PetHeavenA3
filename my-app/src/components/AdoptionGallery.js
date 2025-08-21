import "./gallery.css";
import { adoptionAll } from "./Data";
import React, { useMemo, useState } from "react";
import AdoptionModal from "./AdoptionModal";

export default function AdoptionGallery() {
  const [showAdopt, setShowAdopt] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);

  const openAdopt = (pet) => {
    if (pet?.adoptable === false) return;        // block if not adoptable
    // Normalize the fields the modal expects:
    setSelectedPet({
      id: pet.id,
      name: pet.name,
      breed: pet.breed,
      age: pet.age,               // string or number is fine
      type: pet.type || pet.species || (pet.cat ? "Cat" : "Dog"),
      adoptable: pet.adoptable !== false,
      image: pet.image,
    });
    setShowAdopt(true);
  };

  const [filters, setFilters] = useState({
    species: "all",   // "all" | "dog" | "cat"
    adoptable: "all", // "all" | "yes" | "no"
    age: "all",       // "all" | "0-2" | "3-5" | "6-9" | "10-16"
    breed: "all",     // dynamic options
  });

  const onChange = (e) =>
    setFilters((f) => ({ ...f, [e.target.name]: e.target.value }));

  const resetFilters = () =>
    setFilters({ species: "all", adoptable: "all", age: "all", breed: "all" });

  const inAgeRange = (years, token) => {
    if (token === "all") return true;
    const [min, max] = token.split("-").map(Number);
    return years >= min && years <= max;
  };
  const breedOptions = useMemo(() => {
    const src =
      filters.species === "all"
        ? adoptionAll
        : adoptionAll.filter((p) => p.species === filters.species);
    return Array.from(new Set(src.map((p) => p.breed))).sort();
  }, [filters.species]);

  // Final filtered list (does NOT mutate the original data)
  const filtered = useMemo(() => {
    return adoptionAll.filter((p) => {
      const speciesOK =
        filters.species === "all" || p.species === filters.species;

      const adoptOK =
        filters.adoptable === "all" ||
        (filters.adoptable === "yes" ? p.adoptable : !p.adoptable);

      const ageOK = inAgeRange(p.age, filters.age);

      const breedOK = filters.breed === "all" || p.breed === filters.breed;

      return speciesOK && adoptOK && ageOK && breedOK;
    });
  }, [filters]);

  return (
    <section className="pet-gallery" aria-labelledby="adopt-gallery-title">
      <h1 id="adopt-gallery-title" className="sr-only">Adoption Gallery</h1>

      {/* Filter bar */}
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
            <span>Adoptable</span>
            <select
              name="adoptable"
              value={filters.adoptable}
              onChange={onChange}
            >
              <option value="all">All</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
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

          <label>
            <span>Breed</span>
            <select name="breed" value={filters.breed} onChange={onChange}>
              <option value="all">All</option>
              {breedOptions.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </label>

          <button className="ph-btn" type="button" onClick={resetFilters}>
            Reset
          </button>

          <span className="pet-count">
            Showing {filtered.length} of {adoptionAll.length}
          </span>
        </div>
      </div>

      {/* Cards */}
      <div className="pet-grid">
        {filtered.map((pet) => (
          <article
            key={pet.id}
            className={`pet-card ${!pet.adoptable ? "pet-card--disabled" : ""}`}
            title={pet.adoptable ? "Adoptable" : "Currently not adoptable"}
            role="button"
            tabIndex={pet.adoptable ? 0 : -1}
            aria-disabled={!pet.adoptable}
            onClick={() => pet.adoptable && openAdopt(pet)}
            onKeyDown={(e) => {
              if (!pet.adoptable) return;
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openAdopt(pet);
              }
            }}
            style={{ cursor: pet.adoptable ? "pointer" : "not-allowed" }}
          >
            <img src={pet.image} alt={`${pet.name} — ${pet.breed}`} />

            <div className="pet-overlay">
              <p><span className="k">Name:</span> <span className="v">{pet.name}</span></p>
              <p><span className="k">Breed:</span> <span className="v">{pet.breed}</span></p>
              <p><span className="k">Age:</span> <span className="v">{pet.age} {pet.age === 1 ? "year" : "years"}</span></p>

              <span className={`pet-badge ${pet.adoptable ? "is-open" : "is-closed"}`}>
                {pet.adoptable ? "Adoptable" : "Not available"}
              </span>
            </div>
          </article>
        ))}
      </div>

      {/* Hook the modal here */}
      <AdoptionModal
        open={showAdopt}
        onClose={() => setShowAdopt(false)}
        selectedPet={selectedPet}
      />
    </section>
  );
}
