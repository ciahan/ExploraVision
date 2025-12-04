import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Calendar from "react-calendar";
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

function usePlanner() {
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("plannerItems") || "[]");
    } catch {
      return [];
    }
  });
  useEffect(() => {
    localStorage.setItem("plannerItems", JSON.stringify(items));
  }, [items]);

  const add = (entry) => {
    setItems((prev) => {
      const idx = prev.findIndex((i) => i.key === entry.key);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], slots: next[idx].slots + entry.slots, checked: false };
        return next;
      }
      return [...prev, { ...entry, checked: false }];
    });
  };
  const remove = (key) => setItems((prev) => prev.filter((i) => i.key !== key));
  const toggle = (key) =>
    setItems((prev) => prev.map((i) => (i.key === key ? { ...i, checked: !i.checked } : i)));
  const setSlots = (key, slots) =>
    setItems((prev) => prev.map((i) => (i.key === key ? { ...i, slots } : i)));
  const setRemindAt = (key, remindAt) =>
    setItems((prev) => prev.map((i) => (i.key === key ? { ...i, remindAt } : i)));
  const clear = () => setItems([]);

  const signedFor = (sessionId) =>
    items.filter((i) => i.sessionId === sessionId).reduce((a, b) => a + b.slots, 0);

  const byDate = useMemo(() => {
    const m = new Map();
    for (const it of items) {
      const d = it.date || "Unscheduled";
      if (!m.has(d)) m.set(d, []);
      m.get(d).push(it);
    }
    return Array.from(m.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, items]) => ({ date, items }));
  }, [items]);

  return { items, add, remove, toggle, setSlots, setRemindAt, clear, signedFor, byDate };
}

function Header({ onHome, onScheduler, onPeerSupport, onResources, onDashboard }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const link =
    "cursor-pointer text-sm sm:text-base font-semibold hover:underline focus-visible:underline focus:outline-none";
  return (
    <div
      className={`sticky top-0 z-10 backdrop-blur transition-all ${scrolled ? "shadow-sm" : ""}`}
      style={{ background: theme.pink}}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between py-3">
        <div className="flex items-center gap-5">
          <button onClick={onHome} aria-label="Home" className="cursor-pointer hover:opacity-90">
            <img
              src="/assets/doodles/cell buddy logo.png"
              alt="Logo"
              className="h-10 w-auto"
            />
          </button>
          <button className={link} style={{ color: theme.darkPurple }} onClick={onScheduler}>
            History
          </button>
          <button className={link} style={{ color: theme.darkPurple }} onClick={onPeerSupport}>
            Our Solution
          </button>
          <button className={link} style={{ color: theme.darkPurple }} onClick={onResources}>
            Impact
          </button>
          <button className={link} style={{ color: theme.darkPurple }} onClick={onDashboard}>
            Bibliography
          </button>
        </div>
      </div>
    </div>
  );
}

function Welcome() {
  const prefersReducedMotion = useReducedMotion();
  return (
    <div
      className="overflow-hidden relative rounded-xl border mx-auto"
      style={{
        maxWidth: 900,
        borderColor: theme.ring,
        background: `linear-gradient(90deg, ${theme.lightGreen}, ${theme.lightBlue}, ${theme.yellow})`,
      }}
    >
      <motion.div
        aria-hidden="true"
        initial={{ backgroundPositionX: "0%" }}
        animate={prefersReducedMotion ? {} : { backgroundPositionX: "200%" }}
        transition={prefersReducedMotion ? {} : { duration: 28, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(255,255,255,0.0) 0%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0.0) 100%)",
          backgroundSize: "200% 100%",
        }}
      />
      <div className="relative px-4 py-6 sm:px-8 sm:py-8 text-center">
        <h1 className="text-2xl sm:text-4xl font-extrabold" style={{ color: theme.text }}>
          Welcome to CellBuddy! We look forwards to learning with you!
        </h1>
        <p className="mt-2 text-sm sm:text-base opacity-90" style={{ color: theme.text }}>
          Plan your study week by signing up for help sessions. Improve your skills by viewing and downloading resources. And, most importantly, communicate with your peers through our easy-to-use forums!
        </p>
      </div>
    </div>
  );
}

function Home({ signed, onOpen }) {
  return (
    <div
      className="w-full min-h-screen relative"
      style={{
        backgroundColor: theme.lightPurple,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="max-w-6xl mx-auto px-5">
        <Welcome />
      </div>
    </div>
  );
}

function Scheduler1({ planner }) {
  const [date, setDate] = useState(new Date());
  const handleDayClick = (date) => {
    setDate(date);
  }
  const selectedKey = formatDateKey(date);
  const support = academSupport.filter(s => s.date === selectedKey)

  const [classFilter, setClassFilter] = useState("All");
  const classTypes = useMemo(
    () => ["All", "AP Bio", "CellPhys", "Neuroscience"],
    []
  );
  const filteredSessions = useMemo(
    () =>
      classFilter === "All"
        ? academSupport
        : academSupport.filter((s) => s.class === classFilter),
    [classFilter]
  );
  
  const teacherDates = filteredSessions
    .filter(s => s.type === "Teacher-Led")
    .map(s => s.date);
  const peerDates = filteredSessions
    .filter(s => s.type === "Peer-Tutored")
    .map(s => s.date);

 function FilterClass() {
    return(
    <div
      className="mb-4 rounded-xl border p-3 bg-white flex flex-wrap items-center gap-3 shadow-sm"
      style={{ borderColor: theme.accent }}
    >
      <label
        className="text-sm font-semibold flex items-center gap-2"
        style={{ color: theme.text}}
        >
          Class type:
          <select
            className="cursor-pointer rounded-md border px-3 py-1 text-sm"
            style={{ borderColor: theme.ring}}
            value={classFilter}
            onChange={(e) => setClassFilter(e.target.value)}
          >
            {classTypes.map((ct) => (
              <option key={ct} value={ct}>
                {ct}
              </option>
            ))}
          </select>
      </label>
    </div>
    )
  }

  function CreateCalendar(props) {
    return(
      <div className="sm:max-w-elg md:max-w-elg lg:max-w-[45rem] h-[470px]">
        <Calendar
          onClickDay={handleDayClick}
          onChange={props.onChange}
          value={props.value}
          className="mx auto h-full shadow-sm"
          tileClassName={({ date }) => {
            const iso = date.toISOString().split("T")[0];
            if (teacherDates.includes(iso)) return "teacher-led";
            if (peerDates.includes(iso)) return "peer-tutored";
            return null;
          }}
        />
      </div>
    )
  }

  function CalendarKey() {
    return(
      <div
        className="flex gap-4 mt-3 p-3 text-sm border rounded-xl shadow-sm"
        style = {{ background: "white", border: "1px solid #64B6C8" }}
      >
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded shadow-sm" style={{ background: "#F8FAE6" }} />
          Teacher-led
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded shadow-sm" style={{ background: "#EBFAE6"}} />
          Peer-to-Peer
        </div>
      </div>
    )
  }

  function SupportDetails() {
  const [slots, setSlots] = useState(1);
  const [note, setNote] = useState("");

  return (
    <div className="mt-6 text-sm">
      {support.length === 0 && (
        <p className="opacity-80 mb-6" style={{ color: theme.text }}>
          Click on a date with available support sessions to see details here:
        </p>
      )}

      {support.map((s, idx) => (
        <div
          key={idx}
          className="border rounded-2xl p-3 shadow-sm"
          style={{ borderColor: theme.accent, background: "#ffffff" }}
        >
          <div className="flex flex-col gap-6 p-3">
            <div>
              <div className="text-2xl font-extrabold" style={{ color: theme.text }}>
                {s.type} Support Session ({s.class})
              </div>
              <div className="text-sm opacity-80">
                {date.toDateString()} @ {s.start}-{s.end}
              </div>
            </div>

            <label className="text-sm" style={{ color: theme.text }}>
              Note (optional):
              <input
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Topics / accommodations"
                className="block mt-1 rounded-md border px-3 py-2 text-sm w-full"
                style={{ borderColor: theme.ring }}
              />
            </label>

            <button
              onClick={() => {
                planner.add({
                  key: `support:${idx}-${s.date}-${s.start}`,
                  sessionId: `support:${idx}`,
                  title: `${s.type} Support (${s.class})`,
                  slots: 1,
                  date: s.date,
                  note,
                });
                alert("Reserved! Added to your To-Dos & Scheduler.");
              }}
              className="cursor-pointer px-4 py-2 rounded-md font-semibold hover:opacity-90"
              style={{ background: theme.lightBlue, color: theme.text }}
            >
              + Reserve & Add to My To-D-Dos
            </button>
          </div>
        </div>
      ))}
    </div>
  );
  }

  return (
    <div
      className="w-full min-h-screen relative"
      style={{
        backgroundImage: "url('/assets/doodles/homepage.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="max-w-6xl mx-auto p-4">
        <h1 className="text-3xl font-extrabold px-4" style={{ color: theme.text }} >
          Scheduler
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 max-w-6xl mx-auto py-4">
          <div
            className="grid grid-row-none p-4"
          >
            <FilterClass />
            <CreateCalendar
              onChange={setDate}
              value={date}
            />
            <CalendarKey />
          </div>
          <div
            className="px-4"
          >
            <SupportDetails />
          </div>
        </div>
      </div>
    </div>
  )
}

function PeerSupport() {
  const [notes, setNotes] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("peerNotes") || "[]");
    } catch {
      return [];
    }
  });
  useEffect(() => {
    localStorage.setItem("peerNotes", JSON.stringify(notes));
  }, [notes]);

  const [text, setText] = useState("");
  const [topic, setTopic] = useState("General");

  const addNote = () => {
    if (!text.trim()) return;

    setNotes((n) => [
      ...n,
      {
        id: crypto.randomUUID(),
        topic,
        text: text.trim(),
        by: "Student",
        ts: Date.now(),
        replies: [],
      },
    ]);

    setText(""); // reset the input normally
  };

  const reply = (id) => {
    const body = prompt("Write a helpful reply:");
    if (!body) return;
    setNotes((n) =>
      n.map((x) =>
        x.id === id
          ? {
              ...x,
              replies: [
                ...x.replies,
                { id: crypto.randomUUID(), text: body.trim(), by: "Peer/Teacher", ts: Date.now() },
              ],
            }
          : x
      )
    );
  };

  const topics = ["General", "AP Biology", "CellPhys", "Neuroscience"];

  function PeerSupportDescription() {
    return (
      <div className="flex flex-col gap-3 mb-6">
        <h2 className="text-3xl font-extrabold" style={{ color: theme.text }}>
          Peer Support
        </h2>
        <p className="opacity-80" style={{ color: theme.text }}>
          Post questions here! Classmates and teachers can post their replies to give you helpful feedback.
        </p>
      </div>
    )
  }

  return (
    <div
      className="w-full min-h-screen relative"
      style={{
        backgroundImage: "url('/assets/doodles/homepage.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="max-w-6xl mx-auto p-4">
        <PeerSupportDescription />
        {/*PeerSupportBar -- don't put it in its own function, it breaks for some reason*/}
        <div
          className="rounded-xl border p-4 mb-6 grid gap-3 sm:grid-cols-[1fr_auto_auto] shadow-sm"
          style={{ borderColor: theme.accent, background: "#ffffff" }}
        >
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Ask a question or share a tip…"
            className="rounded-md border px-3 py-2 text-sm"
            style={{ borderColor: theme.ring }}
          />
          <select
            className="cursor-pointer rounded-md border px-3 py-2 text-sm"
            style={{ borderColor: theme.ring }}
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          >
            {topics.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
          <button
            onClick={addNote}
            className="cursor-pointer px-4 py-2 rounded-md border font-semibold"
            style={{ borderColor: theme.ring, background: theme.lightBlue, color: theme.text }}
          >
            Post
          </button>
        </div>
        {/* board */}
        <div className="grid gap-4 grid-cols-1">
          {notes
            .slice()
            .reverse()
            .map((n) => (
              <div
                key={n.id}
                className="rounded-xl border p-3 shadow-sm"
                style={{ borderColor: theme.accent, background: "#fff"}}
              >
                <div
                  className="text-xs font-semibold mb-1 rounded-md p-1"
                  style={{ color: theme.text, background: "#E0F7FA" }}
                >
                  {n.topic} • {new Date(n.ts).toLocaleString()}
                </div>
                <div className="text-sm mb-3" style={{ color: theme.text }}>
                  {n.text}
                </div>
                <button
                  onClick={() => reply(n.id)}
                  className="cursor-pointer text-xs px-2 py-1 rounded-md border"
                  style={{ borderColor: theme.ring, background: theme.lightBlue, color: theme.text }}
                >
                  Reply
                </button>
                <div className="mt-2 space-y-2">
                  {n.replies.map((r) => (
                    <div
                      key={r.id}
                      className="text-xs rounded-md border px-2 py-1 bg-white"
                      style={{ borderColor: theme.ring, color: theme.text }}
                    >
                      <div className="opacity-70 mb-0.5">
                        {r.by} • {new Date(r.ts).toLocaleString()}
                      </div>
                      {r.text}
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

function Resources( celebrate ) {
  const [classFilter, setClassFilter] = useState("AP Bio");
  const classTypes = useMemo(
    () => ["AP Bio", "CellPhys", "Neuroscience"],
    []
  );

  const [tab, setTab] = useState("2")
  const units = [
    {
      id: "1",
      name: "Chemistry of Life",
      topics: [
        {
          name: "Water",
          resources: []
        },
        {
          name: "Acids and Bases",
          resources: []
        },
        {
          name: "Organic Molecules",
          resources: []
        }
      ]
    },
    {
      id: "2",
      name: "Cell Structure & Function",
      topics: [
        {
          name: "Types of Cells",
          resources: [
            {
              type: "Notes",
              name: "Types of Cells (CellBuddy Online Notes)",
              link: "/assets/Online Notes/Types of Cells_CellBuddy Online Notes.pdf"
            },
            {
              type: "Video",
              name: "Prokaryotic vs. Eukaryotic Cells (Updated) [Amoeba Sister]",
              link: "https://www.youtube.com/watch?v=Pxujitlv8wc"
            },
            {
              type: "Quiz",
              name: "Types of Cells Quiz",
              questions: [
                {
                  id: 0,
                  q: 'Which of the following can be definied as "the semifluid substance that fills the inside of a cell"?',
                  choices: ["Cytoplasm", "Nucleoid", "Cell wall", "Cell membrane"],
                  answer: 0,
                  explain: "The Cytoplasm is the semifluid substance that fills the inside of a cell."
                },
              ]
            }
          ]
        },
        {
          name: "Cell Organelles",
          resources: [
            {
              type: "Notes",
              name: "Types of Organelles (CellBuddy Online Notes",
              link: "/assets/Online Notes/Types of Organelles_CellBuddy Online Notes.pdf"
            },
            {
              type: "Video",
              name: "Organelles: Structure and Function (AP BIOLOGY) [Another Youtube Tutor]",
              link: "https://www.youtube.com/watch?v=m35jZGyEDhI"
            },
            {
              type: "Quiz",
              name: "Types of Organelles Quiz",
              questions: [
                {
                  id: 0,
                  q: "Which of the following best describes the nucleus?",
                  choices: ["Stores DNA", "Manufactures proteins", "Transports proteins and lipids", "Converts energy from organic molecules"],
                  answer: 0,
                  explain: "The nucleus controlls the cell and contains genetic information."
                }
              ]
            }
          ]
        },
        {
          name: "Cell Transport",
          resources: [
            {
              type: "Notes",
              name: "Cell Transportation (CellBuddy Online Notes)",
              link: "/assets/Online Notes/Cell Transportation_CellBuddy Online Notes.pdf"
            },
            {
              type: "Video",
              name: "Cell Membrane Transport [Whats Up Dude]",
              link: "https://www.youtube.com/watch?v=J5pWH1r3pgU"
            },
            {
              type: "Quiz",
              name: "Cell Transport Quiz",
              questions: [
                {
                  id: 0,
                  q: 'Which of the following cell transportation methods can be described as "one-way movement of fluids brought about by pressure"?',
                  choices: ["Bulk flow", "Exocytosis", "Endocytosis", "Dialysis"],
                  answer: 0,
                  explain: "Bulk flow is the one-way movement of fluids brought about by pressure."
                }
              ]
            }
          ]
        },
        {
          name: "Unit 2 Review",
          resources: [
            {
              type: "Quiz",
              name: "Unit 2 Quiz",
              questions: [
                {
                  id: 1,
                  q: "Which organelle is primarily responsible for protein synthesis?",
                  choices: ["Golgi Apparatus", "Ribosome", "Lysosome", "Chloroplast"],
                  answer: 1,
                  explain:
                    "Ribosomes build polypeptides using mRNA — they are the main site of protein synthesis.",
                },
                {
                  id: 2,
                  q: "Which part of the membrane allows SMALL, NONPOLAR molecules to pass?",
                  choices: ["Protein channels", "Phospholipid tails", "Glycoproteins", "ATP pumps"],
                  answer: 1,
                  explain:
                    "Hydrophobic phospholipid tails allow small nonpolar molecules (like O₂) to diffuse easily.",
                },
                {
                  id: 3,
                  q: "During which phase of mitosis do sister chromatids separate?",
                  choices: ["Prophase", "Metaphase", "Anaphase", "Telophase"],
                  answer: 2,
                  explain:
                    "In anaphase, spindle fibers pull sister chromatids apart toward opposite poles.",
                },
                {
                  id: 4,
                  q: "Which process increases genetic variation during meiosis?",
                  choices: [
                    "Binary fission",
                    "Crossing over",
                    "Replication of DNA",
                    "Apoptosis",
                  ],
                  answer: 1,
                  explain:
                    "Crossing over during Prophase I swaps segments between homologous chromosomes, increasing variation.",
                }
              ]
            }
          ]
        }
      ],
    },
    {
      id: "3",
      name: "Cellular Energetics",
      topics: [
        {
          name: "Enzymes",
          resources: []
        },
        {
          name: "Reaction Coupling and ATP",
          resources: []
        },
        {
          name: "Photosynthesis",
          resources: []
        },
        {
          name: "Cellular Respiration",
          resources: []
        }
      ]
    },
    {
      id: "4",
      name: "Cell Communication & Cell Cycle",
      topics: [
        {
          name: "Cell Communication",
          resources: []
        },
        {
          name: "Cell Cycle",
          resources: []
        },
        {
          name: "Cell Cycle Regulation",
          resources: []
        },
        {
          name: "Cancer",
          resources: []
        }
      ]
    },
    {
      id: "5",
      name: "Heredity",
      topics: [
        {
          name: "Haploids vs. Diploids",
          resources: []
        },
        {
          name: "Mendelian Genetics (Fundamentals of Genetics)",
          resources: []
        },
        {
          name: "Non-Mendelian Genetics",
          resources: []
        },
        {
          name: "Envionmental Effects of Traits",
          resources: []
        },
        {
          name: "Meiosis",
          resources: []
        }
      ]
    },
    {
      id: "6",
      name: "Gene Expression and Regulation",
      topics: [
        {
          name: "DNA Structure",
          resources: []
        },
        {
          name: "DNA Replciation",
          resources: []
        },
        {
          name: "DNA Expression",
          resources: []
        },
        {
          name: "Mutations",
          resources: []
        },
        {
          name: "Pathogens",
          resources: []
        },
        {
          name: "Biotechnology",
          resources: []
        }
      ]
    },
    {
      id: "7",
      name: "Natural Selection",
      topics: [
        {
          name: "Evolution",
          resources: []
        },
        {
          name: "Common Ancenstry (Charts)",
          resources: []
        },
        {
          name: "Genetic Variability",
          resources: []
        },
        {
          name: "Species",
          resources: []
        },
        {
          name: "Population Genetics",
          resources: []
        },
        {
          name: "Origins of Life on Earth",
          resources: []
        }
      ]
    },
    {
      id: "8",
      name: "Ecology",
      topics: [
        {
          name: "Behavior",
          resources: []
        },
        {
          name: "Animal Communication",
          resources: []
        },
        {
          name: "Plant Behavior",
          resources: []
        },
        {
          name: "Ecology Hierarchies",
          resources: []
        },
        {
          name: "Ecological Succession",
          resources: []
        },
        {
          name: "Human Impact",
          resources: []
        }
      ]
    },
  ]

  const activeUnit = units.find(u => u.id === tab);
  const TabButton = ({ id, label }) => (
    <button
      onClick={() => setTab(id)}
      className={`
        min-w-[120px]
        px-2 py-3 text-sm font-semibold border-b-0 transition
        flex-1 mx-0 mr-0 gap-0 cursor-pointer rounded-t-3xl
        ${tab === id
          ? "border-3 border-[#64b6c8] bg-white shadow-sm"
          : "border-1 border-[#64b6c8] bg-white hover:bg-[#E0F7FA] shadow-sm"}
      `}
    >
      {label}
    </button>
  )

  const [openResource, setOpenResource] = useState(null)
  const closeResource = () => setOpenResource(null)

  function FilterClass() {
    return(
    <div
      className="mb-4 rounded-xl border p-3 bg-white flex flex-wrap items-center gap-3 shadow-sm"
      style={{ borderColor: theme.accent }}
    >
      <label
        className="text-sm font-semibold flex items-center gap-2"
        style={{ color: theme.text}}
        >
          Class type:
          <select
            className="cursor-pointer rounded-md border px-3 py-1 text-sm"
            style={{ borderColor: theme.ring}}
            value={classFilter}
            onChange={(e) => setClassFilter(e.target.value)}
          >
            {classTypes.map((ct) => (
              <option key={ct} value={ct}>
                {ct}
              </option>
            ))}
          </select>
      </label>
    </div>
    )
  }

  function ResourcesDescription() {
    return(
      <div
        className="text-3xl font-extrabold"
        style={{ color: theme.text }}
      >
        Resources
      </div>
    )
  }

  function ResourceTabs() {
    return(
      <div
          className="flex gap-0 overflow-x-auto whitespace-nowrap scrollbar-show scroll-smooth"
        >
          {units.map(u => (
            <TabButton key={u.id} id={u.id} label={`Unit ${u.id}`} />
          ))}
        </div>
    )
  }

  function ResourceRows() {
    return(
      <div className="rounded-b-xl border border-[#64b6c8] overflow-hidden ">
        <div className="overflow-hidden rounded-b-xl">
          <table
              className="w-full border-collapse"
            >
              <thead>
                <tr className="bg-white border-b border-[#64b6c8]">
                  <th className="py-3 px-4 text-left">
                    {classFilter} Unit {activeUnit.id}: {activeUnit.name}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#64b6c8]">
                {activeUnit.topics.map((topic, idx) => (
                  <React.Fragment key={idx}>
                  <tr className="bg-white">
                    <td className="py-3 px-4">{topic.name}</td>
                  </tr>
                  {topic.resources.map((r, i) => (
                    <tr
                      key={i}
                      className="cursor-pointer bg-white hover:bg-[#E0F7FA]"
                      onClick={() => setOpenResource(r)}
                    >
                      {r.type === "Video" && (
                        <td
                          className="py-3 px-4 pl-11"
                        >
                        <span className="font-bold"> Video - </span>

                        {r.name}
                        </td>
                      )}
                      {r.type === "Notes" && (
                        <td className="py-3 px-4 pl-11">
                        <span className="font-bold"> Notes - </span>

                        {r.name}
                        </td>
                      )}
                      {r.type === "Quiz" && (
                        <td className="py-3 px-4 pl-11">
                        <span className="font-bold"> Quiz - </span>

                        {r.name}
                        </td>
                      )}
                    </tr>
                  ))}
                </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
    )
  }

  function ResourceTable() {
    return(
      <div className = "">
        <ResourceTabs />
        <ResourceRows />
      </div>
    )
  }

  return(
    <div
      className="w-full min-h-screen relative"
      style={{
        backgroundImage: "url('/assets/doodles/homepage.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className="max-w-6xl mx-auto p-4"
      >
        <div className="flex flex-col gap-5">
          <ResourcesDescription />
          <FilterClass />
          <ResourceTable />
        </div>

        {openResource && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-3xl max-w-lg w-full shadow-lg relative">
              <button
                className="cursor-pointer absolute top-4 right-4 text-gray-600 hover:text-black hover:bg-[#E0F7FA]"
                onClick={closeResource}
              >
                ✕
              </button>

              <h2
                className="text-xl font-bold mb-4"
                style={{ color: theme.text}}
              >
                {openResource.name}
              </h2>

              {openResource.type === "Video" && (
                <div>
                  <p className="opacity-80 mb-6" style={{ color: theme.text }}>
                      Watch, pause, and take notes!
                    </p>
                  <div className="w-full aspect-video bg-black">
                    <iframe
                      src={openResource.link.replace("watch?v=", "embed/")}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                </div>
              )}
              {openResource.type === "Notes" && (
                <div className="space-y-4">
                  {/* Embedded PDF viewer */}
                  <div className="w-full h-[60vh] border rounded-md overflow-hidden">
                    <iframe
                      className="w-full h-full"
                      src={openResource.link}
                      title={openResource.name}
                    />
                  </div>

                  {/* Download button */}
                  <div className="flex justify-end">
                    <a
                      href={openResource.link}
                      download
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[#64b6c8] text-white font-semibold hover:bg-[#4c9bad]"
                    >
                      Click to Download
                    </a>
                  </div>
                </div>
              )}
              {openResource.type === "Quiz" && (
                <Quiz questions={openResource.questions}/>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

/* ---------------- scheduler ---------------- */
function formatDateKey(date) {
  // YYYY-MM-DD
  return date.toLocaleDateString("en-CA");
}



function Scheduler({ planner }) {
  return (
    <div className="max-w-5xl mx-auto px-4">
      <h2 className="text-3xl font-extrabold mb-2" style={{ color: theme.text }}>
        Scheduler
      </h2>
      <p className="opacity-80 mb-4" style={{ color: theme.text }}>
        reserved sessions and custom reminders grouped by date.
      </p>

      {planner.byDate.length === 0 && (
        <div
          className="text-sm opacity-80 border rounded-md p-3 bg-white"
          style={{ borderColor: theme.ring, color: theme.text }}
        >
          Empty. Reserve a session from Home or add a To-Do in the floating panel.
        </div>
      )}

      {planner.byDate.map((group) => (
        <section
          key={group.date}
          className="mb-6 border rounded-md bg-white"
          style={{ borderColor: theme.ring }}
        >
          <h3
            className="px-4 py-2 font-bold border-b"
            style={{ color: theme.text, borderColor: theme.ring }}
          >
            {group.date}
          </h3>
          <div className="p-3 space-y-2">
            {group.items.map((it) => (
              <div
                key={it.key}
                className="flex items-center justify-between border p-2 rounded-md"
                style={{ borderColor: theme.ring }}
              >
                <div className="min-w-0">
                  <div className="font-semibold" style={{ color: theme.text }}>
                    {it.title || it.note || "To-Do"}
                  </div>
                  <div className="text-xs opacity-70" style={{ color: theme.text }}>
                    {it.mentor ? `${it.mentor} • ` : ""}
                    {it.slots ? `${it.slots} × 30-min` : ""}
                    {it.remindAt ? ` • reminder: ${new Date(it.remindAt).toLocaleString()}` : ""}
                  </div>
                </div>
                <div className="text-sm flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      const when = prompt(
                        "Reminder time (YYYY-MM-DD HH:MM, 24h). Leave empty to clear:"
                      );
                      if (when == null) return;
                      const ms = when.trim()
                        ? Date.parse(when.replace(" ", "T"))
                        : null;
                      planner.setRemindAt(it.key, ms || undefined);
                      if (ms) alert("Reminder stored locally. (Browser only)");
                    }}
                    className="px-2 py-1 border rounded-md"
                    style={{ borderColor: theme.ring }}
                  >
                    set reminder
                  </button>
                  <button
                    onClick={() => planner.remove(it.key)}
                    className="px-2 py-1 border rounded-md"
                    style={{ borderColor: theme.ring, color: theme.accent }}
                  >
                    remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

/* ---------------- metrics (simple coverage dashboard) ---------------- */
function Metrics({ planner }) {
  const rows = sessions.map((s) => ({
    s,
    signed: planner.signedFor(s.id),
    left: Math.max(0, s.spots - planner.signedFor(s.id)),
  }));
  const totalSpots = rows.reduce((a, r) => a + r.s.spots, 0);
  const totalSigned = rows.reduce((a, r) => a + r.signed, 0);

  return (
    <div
      className="w-full min-h-screen relative"
      style={{
        backgroundImage: "url('/assets/doodles/homepage.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-extrabold mb-2" style={{ color: theme.text }}>
          Metrics
        </h2>
        <p className="opacity-80 mb-6" style={{ color: theme.text }}>
          Track sign-ups vs. available time slots.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="rounded-md p-4 border" style={{ background: theme.soft, borderColor: theme.ring }}>
            <div className="text-2xl font-extrabold" style={{ color: theme.accent }}>
              {sessions.length}
            </div>
            <div className="text-sm opacity-80" style={{ color: theme.text }}>
              Sessions Listed
            </div>
          </div>
          <div className="rounded-md p-4 border" style={{ background: theme.soft, borderColor: theme.ring }}>
            <div className="text-2xl font-extrabold" style={{ color: theme.accent }}>
              {totalSigned}
            </div>
            <div className="text-sm opacity-80" style={{ color: theme.text }}>
              30-min Slots Reserved
            </div>
          </div>
          <div className="rounded-md p-4 border" style={{ background: theme.soft, borderColor: theme.ring }}>
            <div className="text-2xl font-extrabold" style={{ color: theme.accent }}>
              {totalSpots - totalSigned}
            </div>
            <div className="text-sm opacity-80" style={{ color: theme.text }}>
              Slots Remaining
            </div>
          </div>
        </div>

        <div className="rounded-md border overflow-hidden" style={{ borderColor: theme.ring }}>
          <div className="grid" style={{ gridTemplateColumns: "minmax(220px,1fr) 120px 120px 1fr" }}>
            <div
              className="px-3 py-2 text-xs font-semibold bg-white border-b"
              style={{ color: theme.text, borderColor: theme.ring }}
            >
              Session
            </div>
            <div className="px-3 py-2 text-xs font-semibold bg-white border-b" style={{ borderColor: theme.ring }}>
              Total
            </div>
            <div className="px-3 py-2 text-xs font-semibold bg-white border-b" style={{ borderColor: theme.ring }}>
              Signed
            </div>
            <div className="px-3 py-2 text-xs font-semibold bg-white border-b" style={{ borderColor: theme.ring }}>
              Progress
            </div>

            {rows.map((r) => (
              <React.Fragment key={r.s.id}>
                <div className="px-3 py-2 text-sm border-b" style={{ borderColor: theme.ring }}>
                  <div className="font-semibold" style={{ color: theme.text }}>
                    {r.s.title}
                  </div>
                  <div className="text-[11px] opacity-70">
                    {r.s.mentor} • {r.s.date} {r.s.start}
                  </div>
                </div>
                <div className="px-3 py-2 text-sm border-b" style={{ borderColor: theme.ring }}>
                  {r.s.spots}
                </div>
                <div className="px-3 py-2 text-sm border-b" style={{ borderColor: theme.ring }}>
                  {r.signed}
                </div>
                <div className="px-3 py-2 text-sm border-b" style={{ borderColor: theme.ring }}>
                  <div className="h-2 w-full rounded bg-[#ECF7F9]">
                    <div
                      className="h-2 rounded"
                      style={{
                        width: `${(r.signed / r.s.spots) * 100}%`,
                        background: theme.lightGreen,
                      }}
                    />
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Dashboard({ planner, addCustomTodo }) {
  const total = planner.items.length;
  const completed = planner.items.filter((i) => i.checked).length;
  const remaining = total - completed;
  const completion = total ? Math.round((completed / total) * 100) : 0;

  // “Categories”: support sessions vs personal to-dos
  const supportCount = planner.items.filter((i) =>
    String(i.sessionId || "").startsWith("support:")
  ).length;
  const customCount = total - supportCount;
  const supportPct = total ? (supportCount / total) * 100 : 0;
  const customPct = total ? (customCount / total) * 100 : 0;

  return (
    <div
      className="w-full min-h-screen relative"
      style={{
        backgroundImage: "url('/assets/doodles/homepage.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-3 mb-3">
          <div>
            <h2 className="text-3xl font-extrabold" style={{ color: theme.text }}>
              Dashboard
            </h2>
            <p className="opacity-80" style={{ color: theme.text }}>
              See your homework and support sessions at a glance.
            </p>
          </div>
          <button
            onClick={addCustomTodo}
            className="bg-[#fff] hover:bg-[#E0F7FA] cursor-pointer px-4 py-2 rounded-xl border font-semibold text-sm"
            style={{
              borderColor: theme.accent, color: theme.text
            }}
          >
            + Add To-Do
          </button>
        </div>

        {/* TOP CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <div
            className="rounded-xl p-4 border shadow-sm"
            style={{ background: "#fff", borderColor: theme.accent }}
          >
            <div className="text-center text-2xl font-extrabold" style={{ color: theme.accent }}>
              {total}
            </div>
            <div className="text-center text-sm opacity-80" style={{ color: theme.text }}>
              Total To-Dos
            </div>
          </div>
          <div
            className="rounded-xl p-4 border shadow-sm"
            style={{ background: "#fff", borderColor: theme.accent }}
          >
            <div className="text-center text-2xl font-extrabold" style={{ color: theme.accent }}>
              {completed}
            </div>
            <div className="text-center text-sm opacity-80" style={{ color: theme.text }}>
              Completed
            </div>
          </div>
          <div
            className="rounded-xl p-4 border shadow-sm"
            style={{ background: "#fff", borderColor: theme.accent }}
          >
            <div className="text-center text-2xl font-extrabold" style={{ color: theme.accent }}>
              {remaining}
            </div>
            <div className="text-center text-sm opacity-80" style={{ color: theme.text }}>
              Remaining
            </div>
          </div>
        </div>

        {/* BIG PROGRESS BAR */}
        <div className="mb-6 rounded-xl border bg-white p-4 shadow-sm" style={{ borderColor: theme.accent }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold" style={{ color: theme.text }}>
              Overall progress
            </span>
            <span className="text-xs opacity-80" style={{ color: theme.text }}>
              {completion}% done
            </span>
          </div>
          <div className="h-3 w-full rounded-full bg-[#ECF7F9] overflow-hidden shadow-xs">
            <div
              className="h-3 rounded-full"
              style={{
                width: `${completion}%`,
                background: theme.lightGreen,
                transition: "width 0.3s ease",
              }}
            />
          </div>

          {/* tiny “bar chart” for support vs personal */}
          <div className="mt-4">
            <div className="text-sm font-semibold mb-2" style={{ color: theme.text }}>
              Session reservations vs. personal homework
            </div>
            <div className="flex h-3 w-full rounded-full overflow-hidden bg-[#ECF7F9] shadow-xs">
              <div
                style={{ width: `${supportPct}%`, background: theme.lightBlue }}
                className="h-3"
              />
              <div
                style={{ width: `${customPct}%`, background: theme.yellow }}
                className="h-3"
              />
            </div>
            <div
              className="flex justify-between mt-3 text-[11px] opacity-80"
              style={{ color: theme.text }}
            >
              <span>{supportCount} support session </span>
              <span>{customCount} personal to-dos</span>
            </div>
          </div>
        </div>

        {/* TO-DO LIST GROUPED BY DATE (basically your old Scheduler list) */}
        <h3 className="text-xl font-bold mb-2" style={{ color: theme.text }}>
          To-Do List (grouped by date)
        </h3>

        {planner.byDate.length === 0 && (
          <div
            className="text-sm opacity-80 border rounded-md p-3 bg-white"
            style={{ borderColor: theme.ring, color: theme.text }}
          >
            Empty. Reserve a session from Scheduler or add a To-Do using the button above.
          </div>
        )}

        {planner.byDate.map((group) => (
          <section
            key={group.date}
            className="mb-4 border rounded-xl bg-white shadow-sm"
            style={{ borderColor: theme.accent }}
          >
            <h4
              className="px-4 py-2 font-bold border-b rounded-t-xl"
              style={{ color: theme.text, borderColor: theme.ring, background: "#E0F7FA" }}
            >
              {group.date}
            </h4>
            <div className="p-3 space-y-2">
              {group.items.map((it) => (
                <div
                  key={it.key}
                  className="flex items-center justify-between border p-2 rounded-md"
                  style={{ borderColor: theme.ring }}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <input
                      type="checkbox"
                      checked={it.checked}
                      onChange={() => planner.toggle(it.key)}
                    />
                    <div className="min-w-0">
                      <div className="font-semibold truncate" style={{ color: theme.text }}>
                        {it.title || it.note || "To-Do"}
                      </div>
                      <div className="text-xs opacity-70" style={{ color: theme.text }}>
                      </div>
                    </div>
                  </div>
                  <div className="text-xs flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => {
                        const when = prompt(
                          "Reminder time (YYYY-MM-DD HH:MM, 24h). Leave empty to clear:"
                        );
                        if (when == null) return;
                        const ms = when.trim()
                          ? Date.parse(when.replace(" ", "T"))
                          : null;
                        planner.setRemindAt(it.key, ms || undefined);
                        if (ms) alert("Reminder stored locally (browser only).");
                      }}
                      className="font-semibold cursor-pointer px-2 py-1 border rounded-md shadow-sm"
                      style={{ borderColor: "transparent", background: theme.lightGreen }}
                    >
                      Reminder
                    </button>
                    <button
                      onClick={() => planner.remove(it.key)}
                      className="font-semibold cursor-pointer px-2 py-1 border rounded-md shadow-sm"
                      style={{ borderColor: "transparent", background: theme.red }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}


function FloatingPanel({ planner, openDashboard, visible, hide }) {
  const { items, toggle, remove } = planner;
  const [minimized, setMinimized] = useState(
    () => localStorage.getItem("padMin") === "1"
  );
  const padRef = useRef(null);
  const drag = useRef({
    x: Number(localStorage.getItem("padX") || 20),
    y: Number(localStorage.getItem("padY") || 80),
    dx: 0,
    dy: 0,
    dragging: false,
  });

  useEffect(() => {
    const el = padRef.current;
    if (el) {
      el.style.left = drag.current.x + "px";
      el.style.top = drag.current.y + "px";
    }
  }, []);
  useEffect(() => localStorage.setItem("padMin", minimized ? "1" : "0"), [minimized]);

  if (!visible) return null;

  const onMouseDown = (e) => {
    drag.current.dragging = true;
    drag.current.dx = e.clientX - drag.current.x;
    drag.current.dy = e.clientY - drag.current.y;
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };
  const onMouseMove = (e) => {
    if (!drag.current.dragging) return;
    drag.current.x = e.clientX - drag.current.dx;
    drag.current.y = e.clientY - drag.current.dy;
    localStorage.setItem("padX", String(drag.current.x));
    localStorage.setItem("padY", String(drag.current.y));
    const el = padRef.current;
    if (el) {
      el.style.left = drag.current.x + "px";
      el.style.top = drag.current.y + "px";
    }
  };
  const onMouseUp = () => {
    drag.current.dragging = false;
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
  };

  return (
    <div
      ref={padRef}
      className="fixed z-50 w-80 shadow-lg border rounded-md"
      style={{ left: 20, top: 80, background: "#fff", borderColor: theme.accent }}
    >
      <div
        className="border-transparent rounded-t-md cursor-move px-3 py-2 flex items-center justify-between"
        style={{ background: theme.soft, borderBottom: `1px solid ${theme.ring}` }}
        onMouseDown={onMouseDown}
      >
        <div className="font-semibold" style={{ color: theme.text }}>
          Quick To-Dos
        </div>
        <div className="flex items-center gap-2">
          <button className="cursor-pointer text-xs" style={{ color: theme.accent }} onClick={() => setMinimized((m) => !m)}>
            {minimized ? "Expand" : "Minimize"}
          </button>
          <button className="cursor-pointer text-xs" style={{ color: theme.accent }} onClick={openDashboard}>
            Open
          </button>
          <button className="cursor-pointer text-xs" style={{ color: theme.accent }} onClick={hide}>
            ✕
          </button>
        </div>
      </div>

      {!minimized && (
        <div className="max-h-72 overflow-auto p-2 space-y-2">
          {items.length === 0 && (
            <div className="text-xs opacity-70 px-1">Empty. Reserve a session or add a To-Do in Scheduler.</div>
          )}
          {items.map((it) => (
            <div key={it.key} className="flex items-center justify-between border rounded-sm px-2 py-1" style={{ borderColor: theme.ring }}>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={it.checked} onChange={() => toggle(it.key)} />
                <span className="text-xs">
                  {it.title || "To-Do"} {it.slots ? `(${it.slots}×30m)` : ""}
                </span>
              </label>
              <div className="text-xs flex items-center gap-2">
                <button
                  onClick={() => remove(it.key)}
                  className="cursor-pointer px-1 border rounded-sm"
                  style={{ borderColor: theme.ring, color: theme.accent }}
                >
                  x
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------------- app ---------------- */
export default function App() {
  usePoppins();

  const [page, setPage] = useState({ name: "home" });
  const planner = usePlanner();
  const [padVisible, setPadVisible] = useState(
  () => localStorage.getItem("padVis") !== "0"
);

useEffect(() => {
  localStorage.setItem("padVis", padVisible ? "1" : "0");
}, [padVisible]);

  const [confettiTrigger, setConfettiTrigger] = useState(0);

const celebrate = () => {
  setConfettiTrigger(confettiTrigger + 1);
};


  const openDetail = (s) => setPage({ name: "detail", data: s });
  const back = () => setPage({ name: "home" });

  // quick +custom todo from anywhere (optional helper)
  const addCustomTodo = () => {
    const title = prompt("Quick To-Do title:");
    if (!title) return;
    const date = prompt("Target date (YYYY-MM-DD), optional:");
    planner.add({
      key: `todo:${crypto.randomUUID()}`,
      sessionId: `todo:${Date.now()}`,
      title: title.trim(),
      mentor: "",
      slots: 0,
      date: date?.trim() || "",
      note: title.trim(),
    });
    alert("To-Do added.");
  };

  return (
    <div
      className={`${theme.bg} min-h-screen`}
      style={{ fontFamily: '"Poppins", ui-sans-serif, system-ui, -apple-system, sans-serif' }}
    >
    <Header
      onHome={back}
      onScheduler={() => setPage({ name: "scheduler" })}
      onPeerSupport={() => setPage({ name: "peer support" })}
      onResources={() => setPage({ name: "resources" })}
      onDashboard={() => {
        setPadVisible(true);
        setPage({ name: "dashboard" });
      }}
    />

      <main className="pt-3 pb-10">
        {page.name === "home" && (
          <Home signed={planner.signedFor} onOpen={openDetail} />
        )}

        {page.name === "detail" && (
          <Detail
            s={page.data}
            onBack={back}
            onSign={{ add: planner.add, signedFor: planner.signedFor }}
          />
        )}
      {page.name === "scheduler" && <Scheduler1 planner={planner} />}
      {page.name === "peer support" && <PeerSupport />}
      {page.name === "resources" && <Resources />}
      {page.name === "dashboard" && (
        <Dashboard planner={planner} addCustomTodo={addCustomTodo} />
      )}

      </main>

      <FloatingPanel
        planner={planner}
        openDashboard={() => {
          setPage({ name: "dashboard" });
        }}
        visible={padVisible}
        hide={() => setPadVisible(false)}
      />

    <EmojiConfetti trigger={confettiTrigger} />
    </div>
  );
}
