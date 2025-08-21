import NavBar from "./components/NavBar";
import About from "./components/About";
import Home from "./components/Home";
import Gallery from "./components/Gallery";
import AdoptionGallery from "./components/AdoptionGallery";

// import ShowCat from "./components/ShowCat"
// import ShowDog from "./components/ShowDog";
// import Form from "./components/Form"

import ScrollToSection from "./components/ScrollToSection";

import { HashRouter as Router, Route, Routes } from "react-router-dom";

import "./style2.css";

const Services = () => <main className="page"><h1>Services</h1></main>;
const Contact = () => <main className="page"><h1>Contact Us</h1></main>;


export default function App() {
    return (

        <>
            <Router>
                <ScrollToSection />
                <NavBar />

                <div className="container">
                    <Routes>
                        <Route path="/" exact element={<Home />} />
                        <Route path="/aboutus" element={<About />} />
                        <Route path="/gallery" element={<Gallery />} />
                        <Route path="/services" element={<Services />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/adoption" element={<AdoptionGallery/>}/>
                    </Routes>
                </div>
            </Router>


        </>
    );
}