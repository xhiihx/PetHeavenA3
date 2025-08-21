import React from "react";
import "./about.css";
import imgAbout from "../assets/aboutus_hero.jpg";

export default function About({
  id = "about",                         // ← anchor target
  imageSrc = imgAbout,
  imageAlt = "Puppy cuddling a kitten on a couch",
}) {
  return (
    <section id={id} className="ph-about-hero" aria-labelledby="ph-about-title">
      <div className="ph-about-hero__media">
        <img src={imageSrc} alt={imageAlt} />
      </div>

      <div className="ph-about-hero__copy">
        <p className="ph-eyebrow">About Us</p>
        <h1 id="ph-about-title">
          Pet Heaven —— <span className="nowrap"> Care &amp; Responsibility</span>
        </h1>
        <p>
          Pet Heaven is equipped with the resources and space to help abandoned cats and
          dogs find their forever loving homes. We have clincs, volunteers and different shelters to 
          accomodate the big number of adoptees.
        </p>
        <p>
          We are dedicated to helping with all request, adoption or release, to ensure the animals gets 
          a second chance in life. To you, it is a chapter in their lives, to them, it's their whole life.
          Please feel free to submit any inquires you have to us!
        </p>
      </div>
    </section>
  );
}
