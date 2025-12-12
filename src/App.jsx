import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { div, link } from "framer-motion/client";

function usePoppins() {
  useEffect(() => {
    if (document.getElementById("gf-poppins")) return;
    const link = document.createElement("link");
    link.id = "gf-poppins";
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap";
    document.head.appendChild(link);
  }, []);
}

const theme = {
  bg: "bg-[#F7FFF9]",
  text: "#223349",
  ring: "#A9D7E2",
  soft: "#E8F7FA",
  red: "#FFDED9",
  yellow: "#F9E27D",
  lightBlue: "#BEE8F1",
  lightGreen: "#CFF3D9",
  accent: "#64B6C8",
  darkPurple: "#2E294E",
  pink: "#EFBCD5",
  purple: "#BE97C6",
  lightPurple: "#F9F7FF"
};

const Slideshow = ({ slides }) => {
  const [index, setIndex] = useState(0);
  const nextSlide = () => {
    setIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    )
  };
  const prevSlide = () => {
    setIndex((prevIndex) =>
      prevIndex === 0? slides.length - 1 : prevIndex - 1
    )
  };
  return (
    <div className = "slideshow-container">
      <div
        className = "slides-wrapper"
        style = {{ transform: `translateX(-${index * 100}%)`}}
      >
        {slides.map((Slide, index) => (
          <div className="slide-page">
            <Slide />
          </div>
        ))}
      </div>
      <div className="prev" onClick={prevSlide}>&#10094;</div>
      <div className="next" onClick={nextSlide}>&#10095;</div>
    </div>
  )
}

function Header({ onHome, onHistoryMG, onHistoryNano, onTheProblem, onOurSolution, onImpact, onBibliography }) {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const link =
    "cursor-pointer text-base font-semibold hover:underline underline-offset-[6px] focus-visible:underline focus:outline-none transition-all duration-300 ease-in-out";
  const dropdownItemStyle = 
    "cursor-pointer block w-full text-left px-4 py-2 text-sm font-medium hover:bg-opacity-20 transition-colors hover:underline underline-offset-[6px] focus-visible:underline focus:outline-none transition-all duration-300 ease-in-out";
  
    return (
    <div
      className={`sticky top-0 z-10 backdrop-blur transition-all ${scrolled ? "shadow-sm" : ""}`}
      style={{ background: theme.pink}}
    >
      <div className="h-20 max-w-6xl mx-auto px-4 sm:px-6 flex items-center gap-10 py-3">
          <button className={link} style={{ color: theme.darkPurple }} onClick={onHome}>
            Home
          </button>
          <div 
            className="relative group"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
          <button className="font-semibold cursor-pointer" style={{ color: theme.darkPurple }}>
            History
          </button>
            {dropdownOpen && (
              <div 
                className="rounded-sm absolute left-0 mt-0- w-48 py-1 z-30"
                style={{ backgroundColor: theme.pink }}
              >
                <button
                  onClick={() => { onHistoryMG(); setDropdownOpen(false); }}
                  className={`${dropdownItemStyle} mt-3`}
                  style={{ color: theme.darkPurple, hover: { backgroundColor: theme.purple } }}
                >
                  Myasthenia Gravis
                </button>
                <button
                  onClick={() => { onHistoryNano(); setDropdownOpen(false); }}
                  className={`${dropdownItemStyle} mb-2`}
                  style={{ color: theme.darkPurple }}
                >
                  Nanotechnology
                </button>
              </div>
            )}
          </div>
          <button className={link} style={{ color: theme.darkPurple }} onClick={onTheProblem}>
            The Problem
          </button>
          <button className={link} style={{ color: theme.darkPurple }} onClick={onOurSolution}>
            Our Solution
          </button>
          <button className={link} style={{ color: theme.darkPurple }} onClick={onImpact}>
            Impact
          </button>
          <button className={link} style={{ color: theme.darkPurple }} onClick={onBibliography}>
            Bibliography
          </button>
        </div>
      </div>
  );
}

function Home() {
  return (
    <div
      className="max-w-5xl mx-auto px-4 w-full h-full p-5"
    >
      <h1 className="py-5">B-Bots</h1>
      <h2 pt-5>Mysthenia Gravis is caused by an overactive Thymus that produces an excess of antibodies. These specific antibodies inhibit acetylcholine from binding to their receptors, impairing muscle function</h2>
      <h2 className="pt-10">Diagram of the Acetylcholine Mechanism that is inhibited by specific antibodies:</h2>
      <img className="pt-5" src="/AChR.png" alt="" />
      <h1 className="text-3xl font-extrabold py-6">
        Nanotechnology expanded. 
      </h1>

      <h2 className="pt-5">
      
      Our B-Bots are DNA Origami nanobots that can recognize specific B-cells. The nanobots then release molecules incapsuled in the DNA package to induce apoptosis.


      </h2>

      <h2>They induce apoptosis into these cells </h2>
      
      
    </div>
  );
}



function HistoryNano() {
  const slide1 = () => 
    <div className="h-screen w-screen" style={{ backgroundColor: theme.lightPurple }}>
      <div className="flex flex-col justify-center items-center">
      <h1 class="text-6xl p-10">1959</h1>
      <h1 class=" text-6xl p-5">Nanotechnology</h1>
      <h1 class="text-6xl">Conceptual foundation by Richard Feynman</h1>
      <img class="p-5" src="newman-lab_xlk90v.webp" alt="" />
      </div>
    </div>;

  const slide2 = () =>
    <div className="h-screen w-screen" style={{ backgroundColor: theme.lightPurple }}>
      <div className="flex flex-col justify-center items-center">
        <h1 class="text-6xl p-10">1990</h1>
        <h1 class=" text-6xl p-5">STM</h1>
        <h1 class="text-6xl">
          Scanning Tunneling Microscope (STM) capable of manipulating individual xenon atoms
        </h1>
        <img class="p-5 size-100" src="IBM_in_atoms.gif" alt="" />
      </div>
    </div>;

  const slide3 = () =>
    <div className="h-screen w-screen" style={{ backgroundColor: theme.lightPurple }}>
      <div className="flex flex-col justify-center items-center">
        <h1 class="text-6xl p-10">2001</h1>
        <h1 class=" text-6xl p-5">Nanomachines</h1>
        <h1 class="text-6xl">Molecular motor with nanoscale silicon devices by Carlo Montemagno
        </h1>
        <img class="p-5" src="CMFig1.72.jpg" alt="" />
      </div>
    </div>;

  const slide4 = () =>
    <div className="h-screen w-screen" style={{ backgroundColor: theme.lightPurple }}>
      <div className="flex flex-col justify-center items-center">
        <h1 class="text-6xl p-10">2006</h1>
        <h1 class=" text-6xl p-5">DNA Origami
        </h1>
        <h1 class="text-6xl">Developed by Paul Rothemund
        </h1>
        <img class="p-5" src="DNAOrgi.jpeg" alt="" />
      </div>
    </div>;

  const slides = [slide1, slide2, slide3, slide4]

  return (
    <div>
      <Slideshow slides={slides} />
    </div>
  );
}

function HistoryMG() {
  const slide1 = () => 
  <div className="h-screen w-screen" style={{ backgroundColor: theme.lightPurple }}>
    <div className="flex flex-col justify-center items-center">
    <h1 class="text-6xl p-10">1672</h1>
    <h1 class=" text-6xl p-5">First Clinical Description</h1>
    <p lass="text-m px-35">The historical record of MG begins with Thomas Willis, a famous English physician.</p>
    <ul className="text-m px-35 py-5">
      <li>Significance: Willis provided the first account of a patient with fluctuating muscle weakness that recovered after rest.</li>
      <li>Early Case: He specifically described a woman who temporarily lost her power of speech, becoming "mute as a fish".</li>
      <li>Impact: While highly accurate, this account was largely unnoticed in medical literature until 1903.</li>
    </ul>
    




    <img class="p-5 size-60" src="Healthline_7-Common-Symptoms-of-H51Myasthenia-Gravis_1296x1740.png.avif" alt="" />
    </div>
  
  </div>;
  const slide2 = () => <div className="h-screen w-screen" style={{ backgroundColor: theme.lightPurple }}>
  <div className="flex flex-col justify-center items-center">
  <h1 class="text-6xl p-10">1895</h1>
  <h1 class=" text-6xl p-5">The Naming of Myasthenia Gravis</h1>
  <p class="text-m px-35">In the late 19th century, German physicians formalized the condition as a distinct medical entity.</p>
  <ul className="text-m px-35 py-5">
    <li>Significance: Friedrich Jolly coined the term "myasthenia gravis pseudoparalytica".</li>
    <li>Etymology: The name combined the Greek mya (muscle) and asthenia (weakness) with the Latin gravis (severe).</li>
    <li>Context: Jolly's work built upon observations by Wilhelm Erb (1879) and Samuel Goldflam (1893), which were previously known as the "Erb-Goldflam symptom complex".</li>
  </ul>

  
  </div>

</div>;
  const slide3 = () => <div className="h-screen w-screen" style={{ backgroundColor: theme.lightPurple }}>
  <div className="flex flex-col justify-center items-center">
  <h1 class="text-6xl p-10">1934</h1>
  <h1 class=" text-6xl p-5">The "Miracle at St. Alfege's"</h1>
  <p class="text-m px-35">Treatment for MG was virtually non-existent until a major breakthrough by Mary Broadfoot Walker.</p>
  <ul className="text-m px-35 py-5">
    <li>Significance: Walker recognized that MG symptoms resembled curare poisoning and successfully treated a patient using physostigmine, a cholinesterase inhibitor.</li>
    <li>Discovery: This trial proved that the symptoms could be promptly improved by pharmacological intervention.</li>
    <li>Outcome: Her work established the first effective treatment for the disease and led to the widespread use of acetylcholinesterase inhibitors.</li>
  </ul>
  
  </div>

</div>;
const slide4 = () => <div className="h-screen w-screen" style={{ backgroundColor: theme.lightPurple }}>
<div className="flex flex-col justify-center items-center">
<h1 class="text-6xl p-10">1960</h1>
<h1 class=" text-6xl p-5">Establishing the Autoimmune Theory
</h1>
<p class="text-m px-35">While researchers suspected an immune link for decades, the 1960s marked the definitive shift toward understanding MG's true cause.

</p>
<ul className="text-m px-35 py-5">
  
  <li>Significance: John Simpson proposed that MG was an autoimmune disease caused by antibodies blocking nerve signaling at the motor end plate.</li>
  <li>Scientific Proof: His hypothesis, alongside work by Nastuk, was later confirmed in 1973 by Patrick and Lindstrom, who demonstrated that an autoimmune response against acetylcholine receptors caused MG-like weakness in rabbits.</li>
  <li>Legacy: This discovery revolutionized management, leading to the use of immunosuppressants, corticosteroids, and plasma exchange as standard therapies.
</li>
</ul>

</div>

</div>;
  const slides = [slide1, slide2, slide3, slide4]
  
  return (
    <div>
      <Slideshow slides={slides} />
    </div>
  );
}




function TheProblem() {
  const pyridostigmine = () =>
    <div
      className = "p-10 px-20 flex gap-9"
    >
      <div className="flex items-center">
        <img src="/pyridostigmine.png" alt="pyridostigmine" className="w-[500px] h-auto"/>
      </div>
      <div className = "space-y-5">
        <h1>
          Pyridostigmine
        </h1>
        <div className="space-y-4">
          <p>
            Works by increasing the level of ACh in the body. Pridostigmine prevents breakdown of ACh in the neuromuscular junction.
          </p>
          <p>
            Side effects:
            <ul className="list-disc pl-10">
              <li> Stomach cramps </li>
              <li> Diarrhea </li>
              <li> Muscle twitching </li>
              <li> Nausea </li>
            </ul>
          </p>
          <p>
            The effects of the medicine are also short-lived, lasting only a few hours and requiring patients to take the medication multiple times a day.
          </p>
        </div>
      </div>
    </div>
    const prednisone = () =>
    <div
      className = "p-10 px-20 flex gap-9"
    >
      <div className="flex items-center">
        <img src="public/Prednisone-removebg-preview.png" alt="pyridostigmine" className="w-[500px] h-auto"/>
      </div>
      <div className = "space-y-5">
        <h1>
          Prednisone
        </h1>
        <div className="space-y-4">
          <p>
            Works by mimicing the effects of cortisol, a natural hormone produced by the adrenal glands. This significantly reduces the activity of the immune system.
          </p>
          <p>
            Side effects:
            <ul className="list-disc pl-10">
              <li> Weight Gain </li>
              <li> Sleep disturbances </li>
              <li> Mood and behavioral changes </li>
              <li> Gastrointestinal issues </li>
              <li> Osteoporosis/bone issues</li>
            </ul>
          </p>
          <p>
            The effects of the medicine initally can also worsen sypmtoms enough to require hospitalization or respiratory support.
          </p>
        </div>
      </div>
    </div>
    const thymectomy = () =>
    <div
      className = "p-10 px-20 flex gap-9"
    >
      <div className="flex items-center">
        <img src="/thymus.png" alt="pyridostigmine" className="w-[500px] h-auto"/>
      </div>
      <div className = "space-y-5">
        <h1>
          Thymectomy
        </h1>
        <div className="space-y-4">
          <p>
            Surgical removal of the thymus gland, performed through traditional open surgery or minimally invasive techniques (like VATS or robotic)
          </p>
          <p>
            Side effects:
            <ul className="list-disc pl-10">
              <li> Infection and Breathing Issues </li>
              <li> Bleeding </li>
              <li> Tissue Damage </li>
              <li> Myasthenic Crisis </li>
            </ul>
          </p>
          <p>
            Long term effects of this surgery have been debated, but include potential increased risks for other autoimmune diseases, cancers, and infections.
          </p>
        </div>
      </div>
    </div>
  const slides = [pyridostigmine, prednisone, thymectomy]
  
  return(
    <div
      className="max-w-5xl mx-auto px-4"
    >
      <h1 className="text-3xl font-extrabold py-6">
        The Problem
      </h1>
      <div className="space-y-10">
        <div className="space-y-4">
          <p>
            Myasthenia gravis (MG) is an autoimmune disease in which voluntary muscles—such as those in the face, throat, arms, and legs—feel weak and tire easily. 
            About 20 per 100,000 people are afflicted with the disease globally.
          </p>
          <p>
            Current treatment options are limited and are often accompanied by a range of side effects.
          </p>
        </div>
        <div
          className = "rounded-3xl overflow-hidden"
          style = {{ backgroundColor: theme.purple, height: '500px'}}
        >
          <Slideshow slides = {slides}/>
        </div>
      </div>
    </div>
  )
}

function OurSolution() {
  return(
    <div
      className="max-w-5xl mx-auto px-4 w-screen h-screen "
    >
      <h1 className="text-3xl font-extrabold py-6">
        Our Solution
      </h1>
      <p className="text-m">Our B-Bots, made using DNA Origami, will target B-Cells that produce acetylcholine receptor (AChR) antibodies </p>
      <p className="text-m pb-5">The Nanobots will destroy these B-Cells by inducing apoptosis</p>
      <img className="" src="DNAOrigami.png" alt="" />
    </div>
  )
}

function Impact() {
  return (
    <div className="max-w-5xl mx-auto px-4">
      <h1 className="text-3xl font-extrabold py-6" style={{ color: theme.darkPurple }}>
        Impact
      </h1>
      <p>
        Our goal is for our device to significantly improve the quality-of-life burdens that myasthenia gravis imposes on those afflicted with the disease.
      </p>
    </div>
  );
}
// Add this new component function near the bottom of your file:

function Footer() {
  return (
    <footer className={`mt-10 py-6 text-center text-sm`} style={{ backgroundColor: theme.pink, color: '#FFFFFF' }}>
      <div className="max-w-6xl mx-auto px-4">
        <p>
          &copy; 2025 B-Bots |  
          <a href="mailto:bbots@gmail.com" className="ml-1 text-white underline hover:text-gray-300 hover:no-underline transition duration-300">
             Contact Us: bbots@gmail.com
          </a>
        </p>
      </div>
    </footer>
  );
}


function Bibliography() {
  const sources = [
    {
      type: "journal",
      citation: "Arvidsson, R. et al. (2020, August 27). Environmental and health risks of nanorobots: an early review. Environmental Science: Nano, 7, 2875-2886. 10.1039/D0EN00570C",
      link: ""
    },
    {
      type: "journal",
      citation: "Combes, G. F. et al. (2021, August 21). Nanotechnology in Tumor Biomarker Detection: The Potential of Liganded Nanoclusters as Nonlinear Optical Contrast Agents for Molecular Diagnostics of Cancer. Cancers, 13(16). 10.3390/cancers13164206",
      link: ""
    },
    {
      type: "website",
      citation: "Custom-Designed Nanostructures Developed Using DNA Origami. (2024, November 29). Technology Networks. Retrieved December 8, 2025, from ",
      link: "https://www.technologynetworks.com/genomics/news/custom-designed-nanostructures-developed-using-dna-origami-393808"
    },
    {
      type: "journal",
      citation: "Deymeer, F. (2020, November 7). History of Myasthenia Gravis Revisited. Archive of Neuropsychiatry, 58(2), 154-162. https://pmc.ncbi.nlm.nih.gov/articlesDeymeer, F. (2020, November 7). History of Myasthenia Gravis Revisited. Archive of Neuropsychiatry, 58(2), 154-162. 10.29399/npa.27315/PMC8214743/", 
      link: ""
    },
    {
      type: "website",
      citation: "DNA Robots Find and Tag Blood Cells. (2013, August 7). Columbia University Irving Medical Center. Retrieved December 9, 2025, from ",
      link: "https://www.cuimc.columbia.edu/news/dna-robots-find-and-tag-blood-cells"
    },
    {
      type: "website",
      citation: "Hair Loss (Alopecia). (2024, December 20). American Cancer Society. Retrieved December 9, 2025, from ",
      link: "https://www.cancer.org/cancer/managing-cancer/side-effects/hair-skin-nails/hair-loss/coping-with-hair-loss.html"
    },
    {
      type: "website",
      citation: "How RITUXAN is Thought to Work. (n.d.). Rituxan. Retrieved December 11, 2025, from ",
      link: "https://www.rituxan.com/nhl/about-rituxan/how-it-works.html"
    },
    {
      type: "journal",
      citation: "Kooshesh, K. A. et al. (2023, August 2). Health Consequences of Thymus Removal in Adults. The New England Journal of Medicine, 389(5). DOI: 10.1056/NEJMoa2302892",
      link: ""
    },
    {
      type: "website",
      citation: "Myasthenia Gravis (MG). (2025, June). Muscular Dystrophy Association. Retrieved December 9, 2025, from ",
      link: "https://www.mda.org/disease/myasthenia-gravis/causes-inheritance"
    },
    {
      type: "website",
      citation: "Myasthenia gravis - Symptoms and causes. (2025, August 22). Mayo Clinic. Retrieved December 9, 2025, from ",
      link: "https://www.mayoclinic.org/diseases-conditions/myasthenia-gravis/symptoms-causes/syc-20352036"
    },
    {
      type: "website",
      citation: "Myasthenia gravis - Treatment. (n.d.). NHS. Retrieved December 8, 2025, from ",
      link: "https://www.nhs.uk/conditions/myasthenia-gravis/treatment/"
    },
    {
      type: "website",
      citation: "Myasthenia Gravis: What It Is, Causes, Symptoms & Treatment. (2023, 11 10). Cleveland Clinic. Retrieved December 9, 2025, from ",
      link: "https://my.clevelandclinic.org/health/diseases/17252-myasthenia-gravis-mg"
    },
    {
      type: "journal",
      citation: "Ponnuswamy, N. et al. (2017, May 31). Oligolysine-based coating protects DNA nanostructures from low-salt denaturation and nuclease degradation. Nature Communications, 8. 10.1038/ncomms15654",
      link: ""
    },
    {
      type: "website",
      citation: "Shigemori, K. (2025, August 7). Plasma Cell Markers. Antibodies.com. Retrieved December 9, 2025, from ",
      link: "https://www.antibodies.com/primary-antibodies/cell-markers/immune-cell-markers/plasma-cell-markers"
    },
    {
      type: "journal",
      citation: "Veneziano, R. et al. (2020, Jun 29). Role of nanoscale antigen organization on B-cell activation probed using DNA origami. Author Manuscript, 15(8), 716-723. 10.1038/s41565-020-0719-0",
      link: ""
    },
    {
      type: "journal",
      citation: "Yi, J. S. et al. (2017, Sep 30). B cells in the pathophysiology of myasthenia gravis. Author Manuscript, 57(2), 172-184. 10.1002/mus.25973",
      link: ""
    },
    {
      type: "journal",
      citation: "Zhang, Y. et al. (2023, August 7). Advanced applications of DNA nanostructures dominated by DNA origami in antitumor drug delivery. Frontiers in Molecular Biosciences. 10.3389/fmolb.2023.1239952",
      link: ""
    }
  ]
  return (
    <div
      className="max-w-5xl mx-auto px-4"
    >
      <h1
        className="text-3xl font-extrabold py-6"
        style={{ color: theme.darkPurple }}
      >
        Bibliography
      </h1>
      <div>
        <ul>
          {sources.map((source, index) => (
            <p key={index}
              className="hanging-indent"
              style={{ marginBottom: "20px", color: theme.darkPurple }}
            >
              {source.citation}
              {source.type == "website" ? 
                (
                  <a href={source.link}>{source.link}</a>
                ) : 
                (
                  <p></p>
                )
              }
            </p>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ---------------- app ---------------- */
export default function App() {
  usePoppins();

  const [page, setPage] = useState({ name: "home" });
  const [padVisible, setPadVisible] = useState(
  () => localStorage.getItem("padVis") !== "0"
);

useEffect(() => {
  localStorage.setItem("padVis", padVisible ? "1" : "0");
}, [padVisible]);

  return (
    <div
      className={`${theme.bg} min-h-screen`}
      style={{ 
        fontFamily: '"Poppins", ui-sans-serif, system-ui, -apple-system, sans-serif',
        backgroundColor: theme.lightPurple 
      }}
    >
      <Header
        onHome={() => setPage({ name: "home" })}
        onHistoryMG={() => setPage({ name: "history-mg" })}
        onHistoryNano={() => setPage({name: "history-nano"})}
        onTheProblem={() => setPage({ name: "the problem" })}
        onOurSolution={() => setPage({ name: "our solution" })}
        onImpact={() => setPage({ name: "impact" })}
        onBibliography={() => {
          setPadVisible(true);
          setPage({ name: "bibliography" });
        }}
      />

      <main className="pt-0 pb-0">
        {page.name === "home" && <Home/>}
        {page.name === "history-nano" && <HistoryNano />}
        {page.name === "history-mg" && <HistoryMG />}
        {page.name === "the problem" && <TheProblem />}
        {page.name === "our solution" && <OurSolution />}
        {page.name === "impact" && <Impact />}
        {page.name === "bibliography" && <Bibliography/>}
      </main>
      <Footer/>
    </div>
  );
}
