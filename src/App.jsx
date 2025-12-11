import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import "react-calendar/dist/Calendar.css";

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

function Header({ onHome, onHistory, onOurSolution, onImpact, onBibliography }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const link =
    "cursor-pointer text-base font-semibold hover:underline underline-offset-[6px] focus-visible:underline focus:outline-none transition-all duration-300 ease-in-out";
  return (
    <div
      className={`sticky top-0 z-10 backdrop-blur transition-all ${scrolled ? "shadow-sm" : ""}`}
      style={{ background: theme.pink}}
    >
      <div className="h-20 max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between py-3">
        <div className="flex items-center gap-5">
          <button className={link} style={{ color: theme.darkPurple }} onClick={onHome}>
            Home
          </button>
          <button className={link} style={{ color: theme.darkPurple }} onClick={onHistory}>
            History
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
    </div>
  );
}

function Formatting() {
  return(
    <div
      className="max-w-5xl mx-auto px-4"
    >
    </div>
  )
}

function Home() {
  return (
    <div
      className="max-w-5xl max-w-5xl mx-auto px-4"
    >
      <h1 className="text-3xl font-extrabold py-6">
        B-Bots
      </h1>
      <h2>
        B-Bots
      </h2>
      <img src="/AChR.png" alt="" />
      <img src="DNAOrigami.png" alt="" />
    </div>
  );
}

function History() {
  const slide1 = () => <div>slide1</div>;
  const slide2 = () => <div>slide2</div>;
  const slide3 = () => <div>slide3</div>;
  const slides = [slide1, slide2, slide3]
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
      <div className = "slideshow-cointainer">
        <div
          className = "slides-wrapper"
          style = {{ transform: `translateX(-${index * 100}%)`}}
        >
          {slides.map((slide, index) => (
            <div>
              <slide />
            </div>
          ))}
        </div>
        <a className="prev" onClick={prevSlide}>&#10094;</a>
        <a className="next" onClick={nextSlide}>&#10095;</a>
      </div>
    )
  }
  return (
    <div
      className="max-w-5xl mx-auto px-4"
    >
      <h1 className="text-3xl font-extrabold py-6">
        History
      </h1>
      <Slideshow slides={slides} />
    </div>
  );
}

function OurSolution() {
  return(
    <div
      className="max-w-5xl mx-auto px-4"
    >
      <h1 className="text-3xl font-extrabold py-6">
        Our Solution
      </h1>
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
        Our goal is for our device to significantly improve the quality-of-life burdens that myasthenia gravis imposes on thoe afflicted with the disease.
      </p>
    </div>
  );
}

function Bibliography() {
  const sources = [
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
      onHistory={() => setPage({ name: "history" })}
      onOurSolution={() => setPage({ name: "our solution" })}
      onImpact={() => setPage({ name: "impact" })}
      onBibliography={() => {
        setPadVisible(true);
        setPage({ name: "bibliography" });
      }}
    />

      <main className="pt-3 pb-10">
        {page.name === "home" && (
          <Home/>
        )}
      {page.name === "history" && <History />}
      {page.name === "our solution" && <OurSolution />}
      {page.name === "impact" && <Impact />}
      {page.name === "bibliography" && <Bibliography/>}
      </main>
    </div>
  );
}
