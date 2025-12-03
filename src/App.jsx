
import React, { useMemo, useState, useEffect, useRef } from "react";

function useFredoka() {
  useEffect(() => {
    if (document.getElementById("gf-fredoka")) return;
    const link = document.createElement("link");
    link.id = "gf-fredoka";
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Fredoka:wght@300;400;500;600;700&display=swap";
    document.head.appendChild(link);
  }, []);
}

const theme = {
  bg: "bg-[#fff7f0]",
  pink: "#ff5fa2",
  yellow: "#ffd166",
  text: "#402a2c",
  soft: "#ffe8f1",
  ring: "#ffb3c7",
};

const demoShelters = [
  {
    id: "stepping-stones-shelter",
    name: "Stepping Stones Shelter",
    type: "Family Shelter",
    phone: "(301) 251-0567",
    email: "",
    address: "1070 Copperstone Ct, Rockville, MD 20852",
    city: "Rockville",
    needs: [
      // Critical
      { id: "full-size-toiletries", name: "Full-size toiletries (for ~25 people)", urgency: "critical", qty: 25 },
      { id: "new-bedding",          name: "New bedding",                          urgency: "critical", qty: 50 },
      { id: "pillows",              name: "Pillows",                               urgency: "critical", qty: 50 },
      { id: "new-sheet-sets",       name: "New sheet sets",                        urgency: "critical", qty: 50 },
      { id: "water-bottles",        name: "Disposable water bottles",              urgency: "critical", qty: 50 },
      { id: "laundry-pods",         name: "Laundry pods",                          urgency: "critical", qty: 50 },

      // High
      { id: "nonperishable-foods",  name: "Non-perishable foods",                  urgency: "high",     qty: 50 },
      { id: "mattress-protectors",  name: "Queen & twin mattress protectors",      urgency: "high",     qty: 40 },

      // Medium
      { id: "lysol-multi-surface",  name: "Lysol multi-surface cleaner",           urgency: "medium",   qty: 50 },
      { id: "multi-surface-wipes",  name: "Multi-surface wipes",                   urgency: "medium",   qty: 50 },
    ],
  },

  {
    id: "sscrc-food-pantry",
    name: "Silver Spring Christian Reformed Church (Food Pantry)",
    type: "Food Bank",
    phone: "(301) 284-8401",
    email: "foodpantry@sscrc.org",
    address: "1501 Arcola Ave, Silver Spring, MD 20902",
    city: "Silver Spring",
    needs: [
      // Critical (100+)
      { id: "hygiene-donations", name: "Hygiene donations (general)", urgency: "critical", qty: 100 },
      { id: "soap",              name: "Bar/Body soap",               urgency: "critical", qty: 100 },
      { id: "toilet-paper",      name: "Toilet paper",                 urgency: "critical", qty: 100 },
      { id: "womens-hygiene",    name: "Women’s hygiene products",     urgency: "critical", qty: 100 },
      { id: "tissues",           name: "Tissues",                      urgency: "critical", qty: 100 },
      { id: "hand-soap",         name: "Hand soap",                    urgency: "critical", qty: 100 },
      { id: "laundry-detergent", name: "Laundry detergent",            urgency: "critical", qty: 100 },

      // High
      { id: "pancake-mix",       name: "Pancake mix",                   urgency: "high",   qty: 100 },
      { id: "cooking-oil",       name: "Cooking oil",                   urgency: "high",   qty: 100 },
      { id: "rice-bags",         name: "Rice (bags)",                   urgency: "high",   qty: 100 },
      { id: "beans",             name: "Beans",                         urgency: "high",   qty: 100 },
      { id: "mac-cheese",        name: "Mac & cheese (just add water)", urgency: "high",   qty: 150 },
      { id: "oatmeal",           name: "Oatmeal",                       urgency: "high",   qty: 100 },
      { id: "add-water-meals",   name: "Other ‘add-water’ meal items",  urgency: "high",   qty: 100 },

      // Medium
      { id: "bread-products",    name: "Bread products",                urgency: "medium", qty: 50 },
    ],
  },

  {
    id: "donation-nation",
    name: "Donation Nation",
    type: "Donation Center",
    phone: "(855) 362-9253",
    email: "",
    address: "9137 Industrial Ct, Gaithersburg, MD 20877",
    city: "Gaithersburg",
    needs: [
      // Critical
      { id: "vacuums",   name: "Vacuums", urgency: "critical", qty: 10 },
      { id: "dresser",   name: "Dressers", urgency: "critical", qty: 10 },
      { id: "beds",      name: "Beds",     urgency: "critical", qty: 10 },
      { id: "lamps",     name: "Lamps",    urgency: "critical", qty: 10 },

      // High
      { id: "night-stands", name: "Night stands", urgency: "high", qty: 10 },

      // Medium
      { id: "desks",     name: "Desks",    urgency: "medium", qty: 10 },
    ],
  },

  {
    id: "promise-place",
    name: "Promise Place (Emergency Youth Shelter)",
    type: "Youth Shelter",
    phone: "(240) 764-8253",
    email: "",
    address: "1400 Doewood Ln, Capitol Heights, MD 20743",
    city: "Capitol Heights",
    needs: [
      // Critical (35+ each)17
      { id: "towels",        name: "Towels",               urgency: "critical", qty: 35 },
      { id: "wash-cloths",   name: "Wash cloths",          urgency: "critical", qty: 35 },
      { id: "sheet-sets",    name: "Sheet sets (twin)",    urgency: "critical", qty: 35 },
      { id: "pillow-cases",  name: "Pillow cases",         urgency: "critical", qty: 35 },
      { id: "flip-flops",    name: "Flip flops",           urgency: "critical", qty: 35 },
      { id: "blankets",      name: "Blankets",             urgency: "critical", qty: 35 },

      // High (35+ each)
      { id: "toiletries",    name: "Toiletries (assorted)", urgency: "high", qty: 35 },
      { id: "toothbrushes",  name: "Toothbrushes",          urgency: "high", qty: 35 },
      { id: "toothpaste",    name: "Toothpaste",            urgency: "high", qty: 35 },
      { id: "mouthwash",     name: "Mouthwash",             urgency: "high", qty: 35 },
      { id: "deodorant",     name: "Deodorant",             urgency: "high", qty: 35 },
      { id: "feminine-prod", name: "Feminine hygiene products", urgency: "high", qty: 35 },

      // Medium
      { id: "underwear-f",   name: "Underwear (S/M/L, females)", urgency: "medium", qty: 10 },
      { id: "underwear-m",   name: "Underwear (S/M/L, males)",   urgency: "medium", qty: 10 },
      { id: "hoodies",       name: "Hoodies (assorted sizes)",   urgency: "medium", qty: 10 },
    ],
  },
];

/* helpers */
function pill(level) {
  const map = {
    critical: "bg-[#ff5fa210] text-[#b3125a] border border-[#ff5fa250]",
    high: "bg-[#ffd16620] text-[#8a5a00] border border-[#ffd16670]",
    medium: "bg-white text-[#2f5130] border border-[#b7e4c7]",
  };
  return `rounded-full px-2.5 py-1 text-xs font-semibold ${map[level]}`;
}

/* ===== Local notebook (no backend) ===== */
function useNotebook() {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem("myPledges") || "[]"); } catch { return []; }
  });
  useEffect(() => localStorage.setItem("myPledges", JSON.stringify(items)), [items]);

  // item: { key, shelterId, shelterName, needId, needName, urgency, qty, checked }
  const addItem = (entry) => {
    setItems(prev => {
      const idx = prev.findIndex(i => i.shelterId === entry.shelterId && i.needId === entry.needId);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + entry.qty, checked: false };
        return next;
      }
      return [...prev, { ...entry, checked: false }];
    });
  };
  const removeItem    = (key) => setItems(prev => prev.filter(i => i.key !== key));
  const toggleChecked = (key) => setItems(prev => prev.map(i => i.key === key ? ({ ...i, checked: !i.checked }) : i));
  const setQty        = (key, qty) => setItems(prev => prev.map(i => i.key === key ? ({ ...i, qty }) : i));
  const clearAll      = () => setItems([]);

  // how many the user pledged locally for a given need
  const getQty = (shelterId, needId) =>
    items.find(i => i.shelterId === shelterId && i.needId === needId)?.qty || 0;

  const byShelter = useMemo(() => {
    const m = new Map();
    for (const it of items) {
      if (!m.has(it.shelterId)) m.set(it.shelterId, { shelterName: it.shelterName, items: [] });
      m.get(it.shelterId).items.push(it);
    }
    return Array.from(m.entries()).map(([shelterId, v]) => ({ shelterId, ...v }));
  }, [items]);

  return { items, byShelter, addItem, removeItem, toggleChecked, setQty, clearAll, getQty };
}

/* UI */
function Header({ onHome, onPledges, onAbout, onInsights }) {
  return (
    <div className="sticky top-0 z-10 backdrop-blur border-b border-[#ffd16655]" style={{background:"rgba(255,247,240,0.85)"}}>
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="font-extrabold tracking-tight" style={{color:theme.text}} onClick={onHome}>
            Maryland Donates
          </button>
          <button className="text-sm font-semibold" style={{color:theme.pink}} onClick={onPledges}>
            My Pledges
          </button>
          <button className="text-sm font-semibold" style={{color:theme.pink}} onClick={onInsights}>
            Insights
          </button>
          <button className="text-sm font-semibold" style={{color:theme.pink}} onClick={onAbout}>
            About
          </button>
        </div>
        <span className="text-sm font-semibold" style={{color:theme.pink}}> marylanddonates@gmail.com</span>
      </div>
    </div>
  );
}


function Stat({ value, label }) {
  return (
    <div className="text-center rounded-none shadow-sm px-6 py-5" style={{background:theme.soft}}>
      <div className="text-4xl font-extrabold" style={{color:theme.pink}}>{value}</div>
      <div className="text-sm opacity-80" style={{color:theme.text}}>{label}</div>
    </div>
  );
}

function SearchBar({ text, setText, type, setType, city, setCity }) {
  const types = ["All", "Women’s Shelter", "Family Shelter", "Youth Shelter", "Food Bank", "Donation Center", "Outreach & Services"];
  const cities = ["All", ...Array.from(new Set(demoShelters.map(s => s.city)))];
  const box = "rounded-none border px-3 py-2 text-sm focus:outline-none";
  return (
    <div className="flex flex-wrap gap-4 items-center">
      <label className="text-sm font-semibold flex items-center gap-2" style={{color: theme.text}}>
        <span>Search</span>
        <input className={box} placeholder="Search organizations…" value={text} onChange={(e)=>setText(e.target.value)} />
      </label>
      <label className="text-sm font-semibold flex items-center gap-2" style={{color: theme.text}}>
        <span>Filter: Organization Service</span>
        <select className={box} value={type} onChange={(e)=>setType(e.target.value)}>{types.map(t => <option key={t}>{t}</option>)}</select>
      </label>
      <label className="text-sm font-semibold flex items-center gap-2" style={{color: theme.text}}>
        <span>Filter: Location</span>
        <select className={box} value={city} onChange={(e)=>setCity(e.target.value)}>{cities.map(c => <option key={c}>{c}</option>)}</select>
      </label>
    </div>
  );
}

/* Item row — local pledged starts at 0 and controls Left */
function NeedRow({ shelter, item, onAdd, getLocalQty }) {
  const pledgedLocal = getLocalQty(shelter.id, item.id);
  const left = Math.max(0, item.qty - pledgedLocal);
  return (
    <div className="flex items-center justify-between border rounded-none p-3 mb-2 bg-white">
      <div className="flex items-center gap-3">
        <span className={pill(item.urgency)}>{item.urgency}</span>
        <div className="font-medium">{item.name}</div>
      </div>
      <div className="flex items-center gap-3 text-sm">
        <span className="opacity-80">Need {item.qty}</span>
        <span className="opacity-80">Pledged {pledgedLocal}</span>
        <span className="font-semibold">Left {left}</span>
        <button
          onClick={() => onAdd(shelter, item)}
          className="px-2 py-1 rounded-none border"
          style={{borderColor:theme.ring}}
          aria-label={`Add ${item.name} to my list`}
        >
          + add to list
        </button>
      </div>
    </div>
  );
}

/* Org card with progress = local pledges only */
function ShelterCard({ s, onOpen, getLocalQty }) {
  const urgent = s.needs.find(n=>n.urgency==="critical");

  // total requested across needs
  const totalQty = s.needs.reduce((acc, n) => acc + n.qty, 0) || 1;

  // sum of local pledges, capped by each need's qty
  const pledgedLocalTotal = s.needs.reduce(
    (acc, n) => acc + Math.min(n.qty, getLocalQty(s.id, n.id)),
    0
  );

  const progress = Math.min(100, (pledgedLocalTotal / totalQty) * 100);

  return (
    <div onClick={()=>onOpen(s, "all")} className="cursor-pointer rounded-none p-4 shadow-sm border hover:shadow-md transition bg-white">
      <div className="text-lg font-bold mb-1" style={{color:theme.text}}>{s.name}</div>
      <div className="text-xs opacity-80 mb-3">{s.type} • {s.city}</div>
      <div className="flex items-center gap-2 mb-3">
        {urgent && <button onClick={(e)=>{ e.stopPropagation(); onOpen(s, "critical"); }} className={pill("critical")}>urgent</button>}
        <button onClick={(e)=>{ e.stopPropagation(); onOpen(s, "all"); }} className={pill("high")}>{s.needs.length} items</button>
      </div>
      <div className="h-2 w-full rounded-none" style={{background:theme.soft}}>
        <div className="h-2 rounded-none" style={{width: `${progress}%`, background: theme.pink}}/>
      </div>
      <div className="mt-2 text-xs opacity-70">
        {pledgedLocalTotal}/{totalQty} pledged locally
      </div>
    </div>
  );
}

function Home({ onOpen, getLocalQty }) {
  const [text, setText] = useState("");
  const [type, setType] = useState("All");
  const [city, setCity] = useState("All");

  const list = useMemo(() =>
    demoShelters.filter(s =>
      (type === "All" || s.type === type) &&
      (city === "All" || s.city === city) &&
      s.name.toLowerCase().includes(text.toLowerCase())
    ), [text, type, city]
  );

  const activeNeeds = demoShelters.reduce((a,s)=>a+s.needs.length,0);
  const critical = demoShelters.reduce((a,s)=>a+s.needs.filter(n=>n.urgency==="critical").length,0);

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="text-center py-10">

      <div className="text-center mb-0 mt-0">
        <img
          src="/assets/doodles/fruit.png"
          alt="Fruit banner"
          className="mx-auto w-60 mb-0 opacity-100 pointer-events-none select-none"
        />
      </div>


        <h1 className="text-5xl font-extrabold leading-tight mb-2" style={{color:theme.text}}>Maryland Donates to Make a Difference!</h1>
        <p className="opacity-80" style={{color:theme.text}}>Maryland families need their communities to step up. Demand for food assistance is currently outpacing supply. Donations are needed more than ever to keep our communities fed. Maryland Donates works with local food banks, women’s shelters, family shelters, and donation centers to make it easier for donors to get the right items to the right places. </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
          <Stat value={demoShelters.length} label="Organizations"/>
          <Stat value={activeNeeds} label="Active Needs"/>
          <Stat value={critical} label="Critical Items"/>
        </div>
      </div>

      <div className="rounded-0.2 p-4 border mb-6" style={{background:theme.soft}}>
        <SearchBar text={text} setText={setText} type={type} setType={setType} city={city} setCity={setCity}/>
      </div>

      <h2 className="text-xl font-bold mb-3" style={{color:theme.text}}>Organizations Near You</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map(s => <ShelterCard key={s.id} s={s} onOpen={onOpen} getLocalQty={getLocalQty} />) }
      </div>
    </div>
  );
}
/* Personalized About text per organization */
function getAboutText(s) {
  switch (s.id) {
    case "stepping-stones-shelter":
      return (
        "Stepping Stones Shelter provides emergency food and shelter to " +
        "Montgomery County families experiencing homelessness. The shelter is currently " +
        "supporting about six families and needs linens, pillows, toiletries, " +
        "and everyday cleaning supplies to keep rooms ready and families stable."
      );

    case "sscrc-food-pantry":
      return (
        "The SSCRC Food Pantry in Silver Spring reduces food insecurity by " +
        "serving 600–700 families through community-wide distributions and " +
        "a referral choice program that reaches 90–150 families. High-need " +
        "items are hygiene essentials and shelf-stable foods that can be " +
        "prepared with water, helping households stretch limited budgets."
      );

    case "donation-nation":
      return (
        "Donation Nation is a 501(c)(3) that diverts usable household goods from landfills " +
        "and redistributes them to nonprofits and families. "
      );

    case "promise-place":
      return (
        "Promise Place is an emergency youth shelter in Prince George’s County " +
        "serving coed youth ages 12–17, with wraparound services like crisis " +
        "intervention and counseling; the 18–24 population is the largest. "
      );

    default:
      return (
        ""
      );
  }
}
/* Organization logos / photos */
const orgImages = {
  "stepping-stones-shelter": "public/assets/doodles/chinchilla_carrot.png",
  "sscrc-food-pantry": "public/assets/doodles/chinchilla_carrot.png",
  "donation-nation": "public/assets/doodles/chinchilla_carrot.png",
  "promise-place": "public/assets/doodles/chinchilla_carrot.png",
  "hartford-family-house": "public/assets/doodles/chinchilla_carrot.png",
  "anne-arundel-food-bank": "public/assets/doodles/chinchilla_carrot.png",
  "st-anns-center": "public/assets/doodles/chinchilla_carrot.png",
  "nourish-now": "public/assets/doodles/chinchilla_carrot.png",
};


function Detail({ s, onBack, start = "all", onAdd, getLocalQty }) {
  const [tab, setTab] = useState(start);
  const view = s.needs.filter(n => (tab === "all" ? true : n.urgency === tab));

  const Tab = ({ id, label }) => (
    <button
      onClick={() => setTab(id)}
      className={`px-3 py-1 rounded-none text-sm border ${
        tab === id ? "bg-[#ff5fa2] text-white" : "bg-white"
      }`}
      style={{ borderColor: theme.ring }}
    >
      {label}
    </button>
  );

  return (
    <div className="max-w-4xl mx-auto px-4">
      <button
        onClick={onBack}
        className="mb-4 inline-flex items-center gap-2 text-sm"
        style={{ color: theme.pink }}
      >
        ← Back to Shelters
      </button>

      <div className="rounded-none border p-5 bg-white">
        <div className="flex items-center gap-4">
                <img
          src={orgImages[s.id] || "/assets/doodles/fruit.png"}
          alt={`${s.name} logo`}
          className="h-12 w-12 object-contain rounded-none"
        />

          <div>
            <div className="text-2xl font-extrabold" style={{ color: theme.text }}>
              {s.name}
            </div>
            <div className="text-sm opacity-80">
              {s.address} • {s.phone} {s.email ? `• ${s.email}` : ""}
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-bold mb-2" style={{ color: theme.text }}>
            About
          </h3>
          <p className="text-sm opacity-90" style={{ color: theme.text }}>
            {getAboutText(s)}
          </p>
        </div>

        <div className="mt-6">
          <div className="flex gap-2 mb-3">
            <Tab id="all" label="All" />
            <Tab id="critical" label="Critical" />
            <Tab id="high" label="High" />
            <Tab id="medium" label="Medium" />
          </div>

          {view.map(n => (
            <NeedRow
              key={n.id}
              shelter={s}
              item={n}
              onAdd={onAdd}
              getLocalQty={getLocalQty}
            />
          ))}
          {view.length === 0 && (
            <div className="text-sm opacity-70">No items in this category.</div>
          )}
        </div>
      </div>
    </div>
  );
}



/* My Pledges page */
function MyPledges({ notebook }) {
  const { byShelter, toggleChecked, removeItem, setQty, clearAll } = notebook;

  const editQty = (item) => {
    const v = prompt(`Change quantity for "${item.needName}"`, String(item.qty));
    if (v == null) return;
    const n = parseInt(v, 10);
    if (!Number.isFinite(n) || n <= 0) return;
    setQty(item.key, n);
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      {/* Title + subheading */}
      <div className="flex items-start justify-between mb-2">
        <h2 className="text-2xl font-extrabold" style={{ color: theme.text }}>
          My Pledges 
        </h2>
        <button
          onClick={clearAll}
          className="text-sm px-3 py-1 border rounded-none"
          style={{ borderColor: theme.ring, color: theme.pink }}
          aria-label="Clear all pledges"
        >
          Clear all
        </button>
      </div>
      <p className="mb-6 text-sm opacity-80" style={{ color: theme.text }}>
        Use this to help you organize and take notes on what your community needs most.
        It’s a way to identify the resources that are in short supply and track which
        items you can potentially donate. Your “My Pledges” list is stored only on your browser. 
      </p>

      {/* Empty state */}
      {byShelter.length === 0 && (
        <div
          className="text-sm opacity-80 border rounded-none p-3 bg-white"
          style={{ borderColor: theme.ring, color: theme.text }}
        >
          Your list is empty. Open an organization and click “+ add to list”.
        </div>
      )}

      {/* Groups by shelter */}
      {byShelter.map((group) => (
        <section
          key={group.shelterId}
          className="mb-6 border bg-white rounded-none"
          style={{ borderColor: theme.ring }}
        >
          <header
            className="px-4 py-3 font-bold border-b"
            style={{ color: theme.text, borderColor: theme.ring }}
          >
            {group.shelterName}
          </header>

          <div className="p-3 space-y-2">
            {group.items.map((item) => (
              <div
                key={item.key}
                className="flex items-center justify-between border p-2 rounded-none"
                style={{ borderColor: theme.ring }}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => toggleChecked(item.key)}
                    aria-label={`Mark ${item.needName} as done`}
                  />
                  <span className={pill(item.urgency)}>{item.urgency}</span>
                  <div className="font-medium truncate" style={{ color: theme.text }}>
                    {item.needName}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm shrink-0">
                  <span className="opacity-80" title="Quantity you pledged">
                    Qty {item.qty}
                  </span>
                  <button
                    onClick={() => editQty(item)}
                    className="px-2 py-1 border rounded-none"
                    style={{ borderColor: theme.ring }}
                    aria-label={`Edit quantity for ${item.needName}`}
                  >
                    edit
                  </button>
                  <button
                    onClick={() => removeItem(item.key)}
                    className="px-2 py-1 border rounded-none"
                    style={{ borderColor: theme.ring, color: theme.pink }}
                    aria-label={`Remove ${item.needName}`}
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

/* About page */
/* About page */
function About() {
  return (
    <div className="relative max-w-3xl mx-auto px-4">
      {/* Left side chinchilla with peach */}
      <img
        src="/assets/doodles/chinchilla_peach.png"
        alt="Chinchilla holding a peach"
        className="absolute left-[-150px] top-1/3 w-44 opacity-90 pointer-events-none select-none"
      />

      {/* Right side chinchilla with heart */}
      <img
        src="/assets/doodles/chinchilla_heart.png"
        alt="Chinchilla holding a heart"
        className="absolute right-[-150px] bottom-1/4 w-44 opacity-90 pointer-events-none select-none"
      />

      <h2 className="text-3xl font-extrabold mb-2" style={{ color: theme.text }}>
        About This Project
      </h2>

      <p className="mb-4 opacity-90" style={{ color: theme.text }}>
        Over 680,000 Marylanders depend on the Supplemental Nutrition Assistance
        Program (SNAP).
      </p>

      <p className="mb-4 opacity-90" style={{ color: theme.text }}>
        On Day 30 of the federal government shutdown, the Trump administration
        refused to release billions in emergency federal funding to sustain the
        SNAP program. SNAP is the nation’s largest food assistance program. It
        provides monthly grocery benefits to over 42 million low-income
        Americans. For millions across the nation, SNAP is the difference
        between eating and going hungry.
      </p>

      <p className="mb-4 opacity-90" style={{ color: theme.text }}>
        Food banks are the last safety net for working families, children,
        seniors, disabled people, veterans, and the homeless. Governor Wes Moore
        has declared a State of Emergency in Maryland. He has pledged $10
        million in emergency state funding to support local food banks and
        hunger relief partners.
      </p>

      <p className="mb-4 opacity-90" style={{ color: theme.text }}>
        For the month of November, the Trump 
        administration has announced it will partially fund the SNAP program. 
        However, this limited funding will not meet the full needs of the more 
        than 680,000 Marylanders who depend on SNAP each month and millions more 
        nationwide. Maryland families need their communities to step up. Demand for food
        assistance is currently outpacing supply. Donations are needed more than
        ever to keep our communities fed. 
      </p>

      <p className="mb-4 opacity-90" style={{ color: theme.text }}>
        Maryland Donates works with local food banks, women’s shelters, family
        shelters, and donation centers to make it easier for donors to get the
        right items to the right places. Donors can filter by organization type,
        target needs, and location to find nearby groups as well as the most
        urgently needed resources.
      </p>

      <p className="text-sm opacity-80 mt-4" style={{ color: theme.text }}>
        Your “My Pledges” list is stored only in your browser.
      </p>
    </div>
  );
}



/* ===== Insights (heat map) ===== */
function hexMix(a, b, t) {
  const ah = a.replace("#",""), bh = b.replace("#","");
  const an = [0,2,4].map(i=>parseInt(ah.slice(i,i+2),16));
  const bn = [0,2,4].map(i=>parseInt(bh.slice(i,i+2),16));
  const cn = an.map((x,i)=>Math.round(x + (bn[i]-x)*t));
  return "#" + cn.map(x=>x.toString(16).padStart(2,"0")).join("");
}

function Insights({ notebook }) {
  // Theme colors 
  const low = "#ffe3a3";        // low coverage (yellowy)
  const high = theme.pink;       // high coverage (pink)
  const empty = "#f5f5f5";       // no data cell

  // Build matrix: each shelter row, each need cell = fulfillment %
  const rows = demoShelters.map(shelter => {
    const cells = shelter.needs.map(n => {
      const pledged = notebook.getQty(shelter.id, n.id);
      const ratio = Math.max(0, Math.min(1, pledged / n.qty));
      return {
        needId: n.id,
        name: n.name,
        urgency: n.urgency,
        pledged,
        qty: n.qty,
        ratio,
      };
    });
    return { shelter, cells };
  });

  const maxCols = Math.max(...rows.map(r => r.cells.length), 0);

  // Totals for header stats
  const totals = rows.reduce((acc, r) => {
    for (const c of r.cells) {
      acc.need += c.qty;
      acc.pledged += c.pledged;
      acc.left += Math.max(0, c.qty - c.pledged);
      if (c.urgency === "critical") {
        acc.critNeed += c.qty; acc.critPledged += c.pledged;
      }
    }
    return acc;
  }, { need:0, pledged:0, left:0, critNeed:0, critPledged:0 });

  const pct = (num, den) => den > 0 ? Math.round((num/den)*100) : 0;

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="mb-6">
        <h2 className="text-3xl font-extrabold" style={{color: theme.text}}>Insights</h2>
        <p className="opacity-80" style={{color: theme.text}}>
          orange = fewer pledged, pink = closer to filled.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-6">
        <div className="rounded-none p-4 border" style={{background: theme.soft, borderColor: theme.ring}}>
          <div className="text-2xl font-extrabold" style={{color: theme.pink}}>
            {totals.pledged}
          </div>
          <div className="text-sm opacity-80" style={{color: theme.text}}>Pledged (your local)</div>
        </div>
        <div className="rounded-none p-4 border" style={{background: theme.soft, borderColor: theme.ring}}>
          <div className="text-2xl font-extrabold" style={{color: theme.pink}}>
            {totals.need}
          </div>
          <div className="text-sm opacity-80" style={{color: theme.text}}>Total Needed</div>
        </div>
        <div className="rounded-none p-4 border" style={{background: theme.soft, borderColor: theme.ring}}>
          <div className="text-2xl font-extrabold" style={{color: theme.pink}}>
            {totals.left}
          </div>
          <div className="text-sm opacity-80" style={{color: theme.text}}>Left to Fill</div>
        </div>
        <div className="rounded-none p-4 border" style={{background: theme.soft, borderColor: theme.ring}}>
          <div className="text-2xl font-extrabold" style={{color: theme.pink}}>
            {pct(totals.critPledged, totals.critNeed)}%
          </div>
          <div className="text-sm opacity-80" style={{color: theme.text}}>Critical Items Covered</div>
        </div>
      </div>

      {/* Legend */}
      <div className="mb-4">
        <div className="text-xs font-semibold mb-1" style={{color: theme.text}}>Coverage</div>
        <div className="h-2 w-full max-w-xs rounded" style={{
          background: `linear-gradient(90deg, ${low}, ${high})`
        }}/>
        <div className="flex justify-between max-w-xs text-[11px] opacity-70" style={{color: theme.text}}>
          <span>0%</span><span>50%</span><span>100%</span>
        </div>
      </div>

      {/* Heat map */}
      <div className="rounded-none border overflow-hidden" style={{borderColor: theme.ring}}>
        {/* Header row: need index labels */}
        <div className="grid" style={{
          gridTemplateColumns: `220px repeat(${maxCols}, minmax(36px, 1fr))`
        }}>
          <div className="px-3 py-2 text-xs font-semibold bg-white sticky left-0 z-10 border-b" style={{color: theme.text, borderColor: theme.ring}}>
            Organization / Items
          </div>
          {Array.from({length:maxCols}).map((_, i) => (
            <div key={`h-${i}`} className="px-1 py-2 text-[11px] text-center bg-white border-b" style={{borderColor: theme.ring, color: theme.text}}>
              {i+1}
            </div>
          ))}
          {/* Rows */}
          {rows.map(({ shelter, cells }) => (
            <React.Fragment key={shelter.id}>
              {/* Left label cell */}
              <div className="px-3 py-2 text-sm font-semibold bg-[#fff]" style={{borderColor: theme.ring, borderBottom: `1px solid ${theme.ring}`, color: theme.text}}>
                {shelter.name}
                <div className="text-[11px] opacity-70">{shelter.type} • {shelter.city}</div>
              </div>
              {/* Heat cells */}
              {Array.from({length:maxCols}).map((_, i) => {
                const c = cells[i];
                if (!c) {
                  return <div key={`e-${shelter.id}-${i}`} className="h-9 border-b" style={{background: empty, borderColor: theme.ring}}/>;
                }
                const bg = hexMix(low, high, c.ratio);
                const ring = c.urgency === "critical" ? `0 0 0 2px ${theme.ring}` : "none";
                const title = `${c.name}\nUrgency: ${c.urgency}\nPledged: ${c.pledged} / ${c.qty} (${Math.round(c.ratio*100)}%)`;
                return (
                  <div
                    key={`${shelter.id}-${c.needId}`}
                    title={title}
                    className="h-9 border-b border-l hover:opacity-90 transition"
                    style={{ background: bg, borderColor: theme.ring, boxShadow: ring }}
                  />
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Small helper note */}
      <div className="mt-3 text-xs opacity-70" style={{color: theme.text}}>
        Tip: Add items to <strong>My Pledges</strong> to organize the items you are able to donate. 
      </div>
    </div>
  );
}



/* Floating, draggable minimizable pad */
function FloatingPad({ notebook, openFull }) {
  const { items, toggleChecked, removeItem } = notebook;
  const [minimized, setMinimized] = useState(() => localStorage.getItem("padMin") === "1");
  const [visible, setVisible]     = useState(() => localStorage.getItem("padVis") !== "0");
  const padRef = useRef(null);
  const drag = useRef({
    x: Number(localStorage.getItem("padX") || 20),
    y: Number(localStorage.getItem("padY") || 80),
    dx: 0, dy: 0, dragging: false
  });

  useEffect(() => {
    const el = padRef.current;
    if (el) { el.style.left = drag.current.x + "px"; el.style.top = drag.current.y + "px"; }
  }, []);
  useEffect(() => localStorage.setItem("padMin", minimized ? "1" : "0"), [minimized]);
  useEffect(() => localStorage.setItem("padVis", visible ? "1" : "0"), [visible]);

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
    if (el) { el.style.left = drag.current.x + "px"; el.style.top = drag.current.y + "px"; }
  };
  const onMouseUp = () => {
    drag.current.dragging = false;
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
  };

  return (
    <div ref={padRef} className="fixed z-50 w-80 shadow-lg border rounded-md" style={{left:20, top:80, background:"#fff"}}>
      <div className="cursor-move px-3 py-2 flex items-center justify-between"
           style={{background: theme.soft, borderBottom: `1px solid ${theme.ring}`}}
           onMouseDown={onMouseDown}>
        <div className="font-semibold" style={{color:theme.text}}>My Pledges</div>
        <div className="flex items-center gap-2">
          <button className="text-xs" style={{color:theme.pink}} onClick={()=>setMinimized(m=>!m)}>
            {minimized ? "Expand" : "Minimize"}
          </button>
          <button className="text-xs" style={{color:theme.pink}} onClick={openFull}>Open</button>
          <button className="text-xs" style={{color:theme.pink}} onClick={()=>setVisible(false)}>✕</button>
        </div>
      </div>

      {!minimized && (
        <div className="max-h-72 overflow-auto p-2 space-y-2">
          {items.length === 0 && <div className="text-xs opacity-70 px-1">Empty. Add items from a shelter page.</div>}
          {items.map(it => (
            <div key={it.key} className="flex items-center justify-between border rounded-sm px-2 py-1">
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={it.checked} onChange={()=>toggleChecked(it.key)} />
                <span className="text-xs">{it.needName}</span>
              </label>
              <div className="text-xs flex items-center gap-2">
                <span>Qty {it.qty}</span>
                <button onClick={()=>removeItem(it.key)} className="px-1 border rounded-sm" style={{borderColor:theme.ring, color:theme.pink}}>x</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* app */
/* app */
export default function App() {
  // Load Chiron Sung HK font dynamically from Fontshare
  useEffect(() => {
    if (document.getElementById("fs-chiron")) return;
    const link = document.createElement("link");
    link.id = "fs-chiron";
    link.rel = "stylesheet";
    link.href =
      "https://api.fontshare.com/v2/css?f[]=chiron-sung-hk@400,500,600,700&display=swap";
    document.head.appendChild(link);
  }, []);

  const [page, setPage] = useState({ name: "home" });
  const notebook = useNotebook();

  const openShelter = (s, filter = "all") =>
    setPage({ name: "detail", data: s, filter });

  const back = () => setPage({ name: "home" });

  const addToNotebook = (shelter, item) => {
    const raw = prompt(`How many "${item.name}" would you like to add?`, "1");
    if (raw == null) return;
    const qty = parseInt(raw, 10);
    if (!Number.isFinite(qty) || qty <= 0) return;

    notebook.addItem({
      key: `${shelter.id}:${item.id}`,
      shelterId: shelter.id,
      shelterName: shelter.name,
      needId: item.id,
      needName: item.name,
      urgency: item.urgency,
      qty,
    });
    alert(`Added ${qty} × ${item.name} to your list.`);
  };

  return (
    <div
      className={`${theme.bg} min-h-screen`}
      style={{
        fontFamily:
          '"Chiron Sung HK", ui-serif, "Times New Roman", Georgia, serif',
      }}
    >
      {/* Add Insights tab handler */}
      <Header
        onHome={back}
        onPledges={() => setPage({ name: "pledges" })}
        onInsights={() => setPage({ name: "insights" })} // NEW
        onAbout={() => setPage({ name: "about" })}
      />

      <main className="pt-2 pb-8">

        {page.name === "home" && (
          <Home onOpen={openShelter} getLocalQty={notebook.getQty} />
        )}

        {page.name === "detail" && (
          <Detail
            s={page.data}
            start={page.filter}
            onBack={back}
            onAdd={addToNotebook}
            getLocalQty={notebook.getQty}
          />
        )}

        {page.name === "pledges" && <MyPledges notebook={notebook} />}

        {/* NEW: Insights page */}
        {page.name === "insights" && <Insights notebook={notebook} />}

        {page.name === "about" && <About />}
      </main>

      {/* floating notepad visible on all pages */}
      <FloatingPad
        notebook={notebook}
        openFull={() => setPage({ name: "pledges" })}
      />
    </div>
  );
}