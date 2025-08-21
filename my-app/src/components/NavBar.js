// src/components/NavBar.js
import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import AuthModal, { getCurrentUser, clearCurrentUser } from "./Login";
import ReleaseModal from "./ReleaseModal";
import AdoptionModal from "./AdoptionModal";

const NavBar = () => {
  const [open, setOpen] = useState(false);        // hamburger menu
  const [userOpen, setUserOpen] = useState(false); // user dropdown
  const [authOpen, setAuthOpen] = useState(false); // modal open

  const [authMode, setAuthMode] = useState("login"); // "login" | "register"
  const [currentUser, setCurrentUser] = useState(getCurrentUser()); // {name,email} | null
  const [servicesOpen, setServicesOpen] = useState(false);
  const [adoptOpen, setAdoptOpen] = useState(false);
  const [releaseOpen, setReleaseOpen] = useState(false);

  const servicesRef = useRef(null);

  const location = useLocation();
  const onHome = location.pathname === "/";
  const activeSection = location.state?.scrollTo || (location.hash ? location.hash.slice(1) : "");

  //const isHomeActive = location.pathname === "/" && (!activeSection || activeSection === "top");

  const isHomeActive = onHome && activeSection === "";
  const isAboutActive = onHome && activeSection === "about";
  const isContactActive = onHome && activeSection === "contact";

  const navigate = useNavigate();

  const goHomeTop = (e) => {
    e.preventDefault();
    closeAllMenus();
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: "top" } });
    } else {
      navigate(".", { replace: true, state: { scrollTo: "" } });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goSection = (id) => (e) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: id } });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      navigate(".", { replace: true, state: { scrollTo: id } });
    }
  };


  const userRef = useRef(null);
  const closeAllMenus = () => { setOpen(false); setUserOpen(false); setServicesOpen(false); };

  useEffect(() => {
    setOpen(false);
    setUserOpen(false);
    setServicesOpen(false);

    // 2) Close dropdowns on outside click
    const onDocClick = (e) => {
      if (userRef.current && !userRef.current.contains(e.target)) {
        setUserOpen(false);
      }
      if (servicesRef.current && !servicesRef.current.contains(e.target)) {
        setServicesOpen(false);
      }
    };

    const onStorage = (e) => {
      if (e.key === "phs_currentUser" || e.key === null) {
        setCurrentUser(getCurrentUser());
      }
    };

    document.addEventListener("mousedown", onDocClick);
    window.addEventListener("storage", onStorage);

    return () => {
      document.removeEventListener("mousedown", onDocClick);
      window.removeEventListener("storage", onStorage);
    };
  }, [location]);

  const openLogin = () => { setAuthMode("login"); setAuthOpen(true); setUserOpen(false); };
  const openRegister = () => { setAuthMode("register"); setAuthOpen(true); setUserOpen(false); };

  const handleLogout = () => {
    clearCurrentUser();
    setCurrentUser(null);
    setUserOpen(false);
  };

  const inServices =
    location.pathname.startsWith("/adopt") ||
    location.pathname.startsWith("/release");

  return (
    <nav className="nav" aria-label="Main">
      <div className="nav-inner">
        <Link to="/" className="brand" onClick={closeAllMenus}>Pet Heaven</Link>

        <button
          className="nav-toggle"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen(v => !v)}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
          </svg>
        </button>

        <ul className={`nav-links ${open ? "open" : ""}`}>
          {/* Home is only active when we are on "/" AND not targeting a section */}
          <li>
            <a href="/#/" className={isHomeActive ? "active" : undefined} onClick={goHomeTop}>Home</a>
          </li>
           <li>
            <NavLink
              to="/adoption"
              className={({ isActive }) => (isActive ? "active" : undefined)}>
              Adoption
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/gallery"
              className={({ isActive }) => (isActive ? "active" : undefined)}>
              Gallery
            </NavLink>
          </li>
          {/* About Us → scroll to section on Home, manual active */}
          <li>
            <Link to="/" state={{ scrollTo: "about" }} className={isAboutActive ? "active" : undefined}
              onClick={goSection("about")}>About Us</Link>
          </li>

          {/* Service is a real page → normal NavLink */}
          <li className="has-menu" ref={servicesRef}>
            <button
              type="button"
              className={`nav-link ${servicesOpen || inServices ? "active" : ""}`}
              aria-haspopup="menu"
              aria-expanded={servicesOpen}
              onClick={() => {
                setServicesOpen(v => !v);
                setUserOpen(false);
              }}
            >
              Service
            </button>

            <div className={`user-menu ${servicesOpen ? "open" : ""}`} role="menu">
              <NavLink to="/adopt" className="user-menu-item" role="menuitem" onClick={(e) => {
                e.preventDefault();
                setAdoptOpen(true);
                setServicesOpen(false);
                closeAllMenus();
              }}>Adopt</NavLink>
              <NavLink to="/release" className="user-menu-item" role="menuitem" onClick={(e) => {
                e.preventDefault();
                setReleaseOpen(true);
                setServicesOpen(false);
                closeAllMenus();
              }}>Release</NavLink>
            </div>
          </li>

          {/* Contact Us → scroll to section on Home, manual active */}
          <li>
            <Link to="/" state={{ scrollTo: "contact" }}
              className={isContactActive ? "active" : undefined}
              onClick={goSection("contact")}>Contact Us</Link>
          </li>
        </ul>

        {/* User icon + dropdown */}
        <div className="nav-user" ref={userRef}>
          <button
            className="nav-login"
            aria-haspopup="menu"
            aria-expanded={userOpen}
            aria-label="Open user menu"
            onClick={() => setUserOpen(v => !v)}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5zm0 2c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5z" fill="currentColor" />
            </svg>
          </button>

          <div className={`user-menu ${userOpen ? "open" : ""}`} role="menu">
            {currentUser ? (
              <>
                <div className="user-menu-item" style={{ cursor: "default" }}>
                  Logged in as <strong>{currentUser.name}</strong>
                </div>
                <button className="user-menu-item" onClick={handleLogout} role="menuitem">
                  Logout
                </button>
              </>
            ) : (
              <>
                <button className="user-menu-item" onClick={openLogin} role="menuitem">
                  Member Login
                </button>
                <button className="user-menu-item" onClick={openRegister} role="menuitem">
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Auth modal (mounted inside navbar so it's easy) */}
      <AuthModal
        open={authOpen}
        mode={authMode}
        onClose={() => setAuthOpen(false)}
        onAuthed={(user) => { setCurrentUser(user); }}
      />
      <AdoptionModal
        open={adoptOpen}
        onClose={() => setAdoptOpen(false)}
      />
      <ReleaseModal
        open={releaseOpen}
        onClose={() => setReleaseOpen(false)}
      />
    </nav>
  );
};

export default NavBar;
