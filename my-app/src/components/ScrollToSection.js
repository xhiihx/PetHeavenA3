import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Scrolls to a section
 */
export default function ScrollToSection() {
  const location = useLocation();

  useEffect(() => {
    const hashId = location.hash?.replace(/^#/, "");
    const stateId = location.state && location.state.scrollTo;
    const targetId = stateId || hashId;
    if (!targetId) return;

    const doScroll = () => {
      if (targetId === "top") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    const raf = requestAnimationFrame(doScroll);  // no setTimeout needed
    return () => cancelAnimationFrame(raf);
  }, [location]);

  return null;
}