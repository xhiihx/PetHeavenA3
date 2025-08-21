import { useEffect, useRef, useState } from "react";
import img1 from "../assets/cat_dog_hero.jpg";
import img2 from "../assets/cat_dog_hero2.jpg";
import img3 from "../assets/cat_dog_hero3.webp";

export default function Hero({
  images = [img1, img2, img3],
  title = "Adopt, Donate, Support",
  subtitle = "Every adoption changes a life. Find your new best friend today. Or feel free to drop us a donation! Every cent counts!",
  interval = 5000,
}) {
  const [idx, setIdx] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    const next = () => setIdx((i) => (i + 1) % images.length);
    timerRef.current = setInterval(next, interval);
    return () => clearInterval(timerRef.current);
  }, [images.length, interval]);

  const goTo = (i) => {
    clearInterval(timerRef.current);
    setIdx(i);
    timerRef.current = setInterval(
      () => setIdx((n) => (n + 1) % images.length),
      interval
    );
  };

  return (
    <section className="hero" aria-roledescription="carousel">
      <div className="hero-slides">
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            className={`hero-slide ${i === idx ? "is-active" : ""}`}
          />
        ))}
        <div className="hero-overlay" aria-hidden="true" />
      </div>

      <div className="hero-content">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>

      <div className="hero-dots" role="group" aria-label="Hero slides">
        {images.map((_, i) => (
          <button
            key={i}
            className={`hero-dot ${i === idx ? "active" : ""}`}
            aria-label={`Go to slide ${i + 1}`}
            aria-pressed={i === idx}
            type="button"
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </section>
  );
}
