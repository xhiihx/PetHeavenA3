import Hero from "./Hero";
import About from "./About";
import Contact from "./Contact"
import Blogs from "./Blogs"
import { Link } from "react-router-dom";
import "./home.css"

export default function Home() {
  return (
    <div className="home-page">
      <main>
        <section id="hero">
          <Hero />
        </section>

        <Blogs />
        <About id="about" />

        <div className="home-cta">
          <Link to="/gallery" className="ph-btn ph-btn--primary">
            View Gallery
          </Link>
          <Link to="/adoption" className="ph-btn ph-btn--primary">
            View Adoption Gallery
          </Link>
        </div>

        <Contact />
      </main>

      <footer className="site-footer" aria-label="Site footer">
        <div className="footer-inner">
          <div className="footer-grid">
            <div className="footer-brand">
              <Link to="/" className="footer-logo">Pet Heaven</Link>
              <p className="footer-tagline">Adopt, don’t shop.</p>
            </div>

            <nav className="footer-nav" aria-label="Primary">
              <Link to="/">Home</Link>
              <Link to="/gallery">Gallery</Link>
              <Link to="/adoption">Adoption</Link>
              <a href="#about">About</a>
              <a href="#hero">Top</a>
            </nav>

            <div className="footer-legal">
              <a href="#!" aria-disabled="true">Privacy</a>
              <a href="#!" aria-disabled="true">Terms</a>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© 2024 Pet Heaven. All rights reserved.</p>
            <a className="back-to-top" href="#hero" aria-label="Back to top">↑ Back to top</a>
          </div>
        </div>
      </footer>
    </div>

  );
}