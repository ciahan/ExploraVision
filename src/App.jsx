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
      <h1 className="text-3xl font-extrabold">
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
  return (
    <div
      className="max-w-5xl mx-auto px-4"
    >
      <h1 className="text-3xl font-extrabold">
        History
      </h1>
      <h2>
        MYASTHENIA GRAVIS:
        1672 - Thomas Willis first describes Myasthenia Gravis
          1920 - Otto Lewis nerve, discover and identify acetylcholine
        DNA ORAGAMI:
          1959 - Conceptual foundation of nanotechnology by Richard Feynman
          1990 - Scanning Tunneling Microscope (STM) capable of manipulating individual xenon atoms
          2001 - Molecular motor with nanoscale silicon devices developed by Carlo Montemagno
          2006 - DNA Origami developed by Paul Ruthemund
      </h2>
    </div>
  );
}

function OurSolution() {
  return(
    <div
      className="max-w-5xl mx-auto px-4"
    >
      <h1 className="text-3xl font-extrabold">
        Our Solution
      </h1>
    </div>
  )
}

function Impact() {
  return (
    <div className="max-w-5xl mx-auto px-4">
      <h2 className="text-3xl font-extrabold mb-2" style={{ color: theme.text }}>
        Impact
      </h2>
    </div>
  );
}

function Bibliography() {
  const sources = [
    {citation: "Combes, G. F. et al. (2021, August 21). Nanotechnology in Tumor Biomarker Detection: The Potential of Liganded Nanoclusters as Nonlinear Optical Contrast Agents for Molecular Diagnostics of Cancer. Cancers, 13(16). 10.3390/cancers13164206"},
    {citation: "Custom-Designed Nanostructures Developed Using DNA Origami. (2024, November 29). Technology Networks. Retrieved December 8, 2025, from https://www.technologynetworks.com/genomics/news/custom-designed-nanostructures-developed-using-dna-origami-393808"},
    {citation: "Deymeer, F. (2020, November 7). History of Myasthenia Gravis Revisited. Archive of Neuropsychiatry, 58(2), 154-162. https://pmc.ncbi.nlm.nih.gov/articles/PMC8214743/"},
    {citation: "DNA Robots Find and Tag Blood Cells. (2013, August 7). Columbia University Irving Medical Center. Retrieved December 9, 2025, from https://www.cuimc.columbia.edu/news/dna-robots-find-and-tag-blood-cells"},
    {citation: "Hair Loss (Alopecia). (2024, December 20). American Cancer Society. Retrieved December 9, 2025, from https://www.cancer.org/cancer/managing-cancer/side-effects/hair-skin-nails/hair-loss/coping-with-hair-loss.html"},
    {citation: "Kooshesh, K. A. et al. (2023, August 2). Health Consequences of Thymus Removal in Adults. The New England Journal of Medicine, 389(5). DOI: 10.1056/NEJMoa2302892"},
    {citation: "Myasthenia Gravis (MG). (2025, June). Muscular Dystrophy Association. Retrieved December 9, 2025, from https://www.mda.org/disease/myasthenia-gravis/causes-inheritance"},
    {citation: "Myasthenia gravis - Symptoms and causes. (2025, August 22). Mayo Clinic. Retrieved December 9, 2025, from https://www.mayoclinic.org/diseases-conditions/myasthenia-gravis/symptoms-causes/syc-20352036"},
    {citation: "Myasthenia gravis - Treatment. (n.d.). NHS. Retrieved December 8, 2025, from https://www.nhs.uk/conditions/myasthenia-gravis/treatment/"},
    {citation: "Myasthenia Gravis: What It Is, Causes, Symptoms & Treatment. (2023, 11 10). Cleveland Clinic. Retrieved December 9, 2025, from https://my.clevelandclinic.org/health/diseases/17252-myasthenia-gravis-mg"},
    {citation: "Ponnuswamy, N. et al. (2017, May 31). Oligolysine-based coating protects DNA nanostructures from low-salt denaturation and nuclease degradation. Nature Communications, 8. https://doi.org/10.1038/ncomms15654"},
    {citation: "Shigemori, K. (2025, August 7). Plasma Cell Markers. Antibodies.com. Retrieved December 9, 2025, from https://www.antibodies.com/primary-antibodies/cell-markers/immune-cell-markers/plasma-cell-markers"},
    {citation: "Veneziano, R. et al. (2020, Jun 29). Role of nanoscale antigen organization on B-cell activation probed using DNA origami. Author Manuscript, 15(8), 716-723. 10.1038/s41565-020-0719-0"},
    {citation: "Yi, J. S. et al. (2017, Sep 30). B cells in the pathophysiology of myasthenia gravis. Author Manuscript, 57(2), 172-184. 10.1002/mus.25973"},
    {citation: "Zhang, Y. et al. (2023, August 7). Advanced applications of DNA nanostructures dominated by DNA origami in antitumor drug delivery. Frontiers in Molecular Biosciences. 10.3389/fmolb.2023.1239952"}
  ]
  return (
    <div
      className="max-w-5xl mx-auto px-4"
    >
      <h1 className="text-3xl font-extrabold">
        Bibliography
      </h1>
      <h2>
        
      </h2>
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
