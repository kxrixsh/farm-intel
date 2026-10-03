"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, Search, Truck, Scale, TrendingUp, ShieldCheck } from "lucide-react";

interface MandiData {
  id: string;
  name: string;
  district: string;
  state: string;
  distanceKm: number;
  spotPricePerKg: number;
  arrivalTons: number;
  grade: string;
}

const ALL_MANDIS: MandiData[] = [
  { id: "m1", name: "Baramati APMC", district: "Pune", state: "Maharashtra", distanceKm: 68, spotPricePerKg: 26.2, arrivalTons: 420, grade: "FAQ" },
  { id: "m2", name: "Pune APMC (Market Yard)", district: "Pune", state: "Maharashtra", distanceKm: 24, spotPricePerKg: 24.5, arrivalTons: 1100, grade: "Super" },
  { id: "m3", name: "Lasalgaon APMC", district: "Nashik", state: "Maharashtra", distanceKm: 185, spotPricePerKg: 27.8, arrivalTons: 2850, grade: "Super Extra" },
  { id: "m4", name: "Pimpalgaon Baswant", district: "Nashik", state: "Maharashtra", distanceKm: 198, spotPricePerKg: 27.4, arrivalTons: 1940, grade: "Super Extra" },
  { id: "m5", name: "Manchar Sub-Yard", district: "Pune", state: "Maharashtra", distanceKm: 58, spotPricePerKg: 24.1, arrivalTons: 310, grade: "FAQ" },
  { id: "m6", name: "Khed (Chakan) APMC", district: "Pune", state: "Maharashtra", distanceKm: 34, spotPricePerKg: 24.8, arrivalTons: 540, grade: "FAQ" },
  { id: "m7", name: "Shirur Mandi", district: "Pune", state: "Maharashtra", distanceKm: 62, spotPricePerKg: 24.0, arrivalTons: 280, grade: "Average" },
  { id: "m8", name: "Ahmednagar APMC", district: "Ahmednagar", state: "Maharashtra", distanceKm: 122, spotPricePerKg: 25.9, arrivalTons: 1450, grade: "Super" },
  { id: "m9", name: "Sangamner APMC", district: "Ahmednagar", state: "Maharashtra", distanceKm: 138, spotPricePerKg: 25.5, arrivalTons: 780, grade: "FAQ" },
  { id: "m10", name: "Yeola Sub-Market", district: "Nashik", state: "Maharashtra", distanceKm: 215, spotPricePerKg: 27.1, arrivalTons: 1320, grade: "Super" },
  { id: "m11", name: "Solapur APMC", district: "Solapur", state: "Maharashtra", distanceKm: 245, spotPricePerKg: 26.8, arrivalTons: 1680, grade: "Super" },
  { id: "m12", name: "Dindori APMC", district: "Nashik", state: "Maharashtra", distanceKm: 210, spotPricePerKg: 26.5, arrivalTons: 640, grade: "FAQ" },
  { id: "m13", name: "Rahata APMC", district: "Ahmednagar", state: "Maharashtra", distanceKm: 175, spotPricePerKg: 25.8, arrivalTons: 920, grade: "FAQ" },
  { id: "m14", name: "Kopargaon APMC", district: "Ahmednagar", state: "Maharashtra", distanceKm: 188, spotPricePerKg: 25.6, arrivalTons: 810, grade: "FAQ" },
  { id: "m15", name: "Satara APMC", district: "Satara", state: "Maharashtra", distanceKm: 112, spotPricePerKg: 23.9, arrivalTons: 380, grade: "FAQ" },
  { id: "m16", name: "Karad Mandi", district: "Satara", state: "Maharashtra", distanceKm: 164, spotPricePerKg: 24.2, arrivalTons: 490, grade: "FAQ" },
  { id: "m17", name: "Kolhapur (Shahu Market)", district: "Kolhapur", state: "Maharashtra", distanceKm: 232, spotPricePerKg: 25.1, arrivalTons: 950, grade: "Super" },
  { id: "m18", name: "Indapur Sub-Yard", district: "Pune", state: "Maharashtra", distanceKm: 132, spotPricePerKg: 24.9, arrivalTons: 410, grade: "FAQ" },
  { id: "m19", name: "Barsi APMC", district: "Solapur", state: "Maharashtra", distanceKm: 218, spotPricePerKg: 26.0, arrivalTons: 590, grade: "FAQ" },
  { id: "m20", name: "Junnar Mandi (Alephata)", district: "Pune", state: "Maharashtra", distanceKm: 86, spotPricePerKg: 25.2, arrivalTons: 870, grade: "Super" },
  { id: "m21", name: "Sinnar APMC", district: "Nashik", state: "Maharashtra", distanceKm: 172, spotPricePerKg: 26.3, arrivalTons: 710, grade: "FAQ" },
  { id: "m22", name: "Shrirampur APMC", district: "Ahmednagar", state: "Maharashtra", distanceKm: 160, spotPricePerKg: 25.4, arrivalTons: 630, grade: "FAQ" },
  { id: "m23", name: "Kalvan Mandi", district: "Nashik", state: "Maharashtra", distanceKm: 255, spotPricePerKg: 26.9, arrivalTons: 520, grade: "Super" },
  { id: "m24", name: "Malegaon APMC", district: "Nashik", state: "Maharashtra", distanceKm: 268, spotPricePerKg: 26.7, arrivalTons: 1150, grade: "Super" },
  { id: "m25", name: "Dhule APMC", district: "Dhule", state: "Maharashtra", distanceKm: 320, spotPricePerKg: 27.2, arrivalTons: 1420, grade: "Super" },
];

export default function MarketPage() {
  const [lang, setLang] = useState<"en" | "hi" | "mr">("en");
  const [commodity, setCommodity] = useState("Onion (Kharif Red)");
  const [quantityQtl, setQuantityQtl] = useState(25);
  const [maxDistance, setMaxDistance] = useState(250);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("ALL");
  const [sortBy, setSortBy] = useState<"net" | "price" | "distance">("net");

  const calculateCosts = (mandi: MandiData) => {
    const qtyKg = quantityQtl * 100;
    const gross = qtyKg * mandi.spotPricePerKg;
    const baseFreight = 350;
    const distanceFreight = mandi.distanceKm * 18;
    const loadFactor = quantityQtl * 4;
    const freight = Math.round(baseFreight + distanceFreight + loadFactor);
    const handling = Math.round(gross * 0.015);
    const net = gross - freight - handling;
    const netPerKg = Number((net / qtyKg).toFixed(2));

    return { gross, freight, handling, net, netPerKg };
  };

  const processedMandis = useMemo(() => {
    return ALL_MANDIS.filter((m) => {
      const matchDist = m.distanceKm <= maxDistance;
      const matchSearch =
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.district.toLowerCase().includes(searchQuery.toLowerCase());
      const matchDistrict = selectedDistrict === "ALL" || m.district.toUpperCase() === selectedDistrict.toUpperCase();
      return matchDist && matchSearch && matchDistrict;
    })
      .map((m) => ({
        ...m,
        ...calculateCosts(m),
      }))
      .sort((a, b) => {
        if (sortBy === "net") return b.net - a.net;
        if (sortBy === "price") return b.spotPricePerKg - a.spotPricePerKg;
        if (sortBy === "distance") return a.distanceKm - b.distanceKm;
        return 0;
      });
  }, [quantityQtl, maxDistance, searchQuery, selectedDistrict, sortBy]);

  const topChoice = processedMandis[0];

  return (
    <div className="min-h-screen bg-[#050b08] text-[#f4f7f3] selection:bg-[#66ee7f]/30 selection:text-[#050b08]">
      {/* ---------------- 1. NAVBAR ---------------- */}
      <header className="absolute left-0 right-0 top-0 z-50 transition-all duration-500 border-b border-transparent bg-transparent">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <Link className="group flex items-center gap-3" href="/">
            <img
              src="/farm-intel-logo.jpg"
              alt="Farm Intel logo"
              className="h-9 w-9 rounded-lg object-cover transition-transform duration-300 group-hover:scale-105 border border-[#66ee7f]/30"
            />
            <span className="font-cine text-xl font-extrabold tracking-[-0.02em] text-white">
              Farm<span className="text-[#66ee7f]">Intel</span>
            </span>
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            <li className="relative">
              <Link className="relative rounded-lg px-4 py-2 text-sm font-medium transition-colors text-white" href="/market">
                Market Realization
              </Link>
              <div className="absolute -bottom-0.5 left-3 right-3 h-0.5 rounded-full bg-[#66ee7f]" />
            </li>
            <li className="relative">
              <Link className="relative rounded-lg px-4 py-2 text-sm font-medium text-white/65 hover:text-white" href="/weather">
                Weather & Suitability
              </Link>
            </li>
            <li className="relative">
              <Link className="relative rounded-lg px-4 py-2 text-sm font-medium text-white/65 hover:text-white" href="/schemes">
                Subsidies & Claims
              </Link>
            </li>
            <li className="relative">
              <Link className="relative rounded-lg px-4 py-2 text-sm font-medium text-white/65 hover:text-white" href="/#why">
                About
              </Link>
            </li>
          </ul>

          <div className="flex items-center gap-4">
            <div className="hidden lg:block">
              <div className="flex items-center rounded-full border border-white/15 bg-white/5 p-0.5 backdrop-blur-sm">
                <button
                  onClick={() => setLang("en")}
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold transition-all ${
                    lang === "en" ? "bg-[#66ee7f] text-[#06150f]" : "text-white/60 hover:text-white"
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => setLang("hi")}
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold transition-all ${
                    lang === "hi" ? "bg-[#66ee7f] text-[#06150f]" : "text-white/60 hover:text-white"
                  }`}
                >
                  हिन्दी
                </button>
                <button
                  onClick={() => setLang("mr")}
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold transition-all ${
                    lang === "mr" ? "bg-[#66ee7f] text-[#06150f]" : "text-white/60 hover:text-white"
                  }`}
                >
                  मराठी
                </button>
              </div>
            </div>

            <Link
              className="hidden rounded-full bg-[#66ee7f] px-6 py-2.5 text-sm font-semibold text-[#06150f] transition-transform duration-300 hover:scale-[1.04] active:scale-95 lg:inline-block"
              href="#matrix"
            >
              Scan 200+ Mandis
            </Link>
          </div>
        </nav>
      </header>

      <main>
        {/* ---------------- 2. HERO SECTION WITH TRANSITION ---------------- */}
        <section
          style={{
            position: "relative",
            display: "flex",
            minHeight: "64vh",
            flexDirection: "column",
            justifyContent: "flex-end",
            overflow: "hidden",
            backgroundColor: "#050b08",
          }}
        >
          <img
            alt="A hopeful Indian farmer at golden hour standing in a green field"
            src="/wellbeing-farmer.jpg"
            loading="eager"
            fetchPriority="high"
            className="animate-cine-photo"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "50% 12%",
              zIndex: 1,
            }}
          />

          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(5,11,8,0.2) 0%, rgba(5,11,8,0.15) 35%, rgba(5,11,8,0.65) 60%, rgba(5,11,8,0.92) 85%, #050b08 100%)",
              zIndex: 2,
              pointerEvents: "none",
            }}
          />
          <div className="cine-grain-layer" style={{ zIndex: 3 }} />

          <div
            style={{
              position: "relative",
              zIndex: 10,
              width: "100%",
              maxWidth: "80rem",
              margin: "0 auto",
              paddingLeft: "1.5rem",
              paddingRight: "1.5rem",
              paddingBottom: "8vh",
              paddingTop: "9rem",
            }}
          >
            <div className="animate-fade-up-1">
              <span className="font-mono text-[12px] font-medium uppercase tracking-[0.3em] text-[#66ee7f]">
                JEEVAN RAKSHAK · FARMER WELLBEING
              </span>
            </div>
            <h1
              className="animate-fade-up-2 mt-5 max-w-[16ch] font-cine font-extrabold leading-[0.94] tracking-[-0.03em] text-white"
              style={{ fontSize: "clamp(2.75rem, 7vw, 6rem)" }}
            >
              Sell where the net <span className="italic text-[#66ee7f]">pays more.</span>
            </h1>
            <p className="animate-fade-up-3 mt-6 max-w-2xl text-lg leading-relaxed text-white/75">
              A transparent arbitrage engine that subtracts real freight and mandi fees from gross prices — so you know your actual in-hand return before loading the truck.
            </p>
          </div>
        </section>

        {/* ---------------- 3. SUMMARY STRIP (TradingView Sans Font) ---------------- */}
        {topChoice && (
          <section className="border-y border-white/10 bg-[#07130d] py-5 font-trading">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
              <div>
                <span className="text-white/45 block font-medium">TOP RECOMMENDED DESTINATION</span>
                <span className="text-base font-bold text-white mt-0.5 block">{topChoice.name}</span>
                <span className="text-[#66ee7f] text-[11px] font-semibold">{topChoice.distanceKm} km away</span>
              </div>
              <div>
                <span className="text-white/45 block font-medium">BEST ESTIMATED NET REVENUE</span>
                <span className="text-2xl font-extrabold text-[#66ee7f] mt-0.5 block tabular-nums tracking-tight">
                  ₹{topChoice.net.toLocaleString()}
                </span>
                <span className="text-white/50 text-[11px] tabular-nums">₹{topChoice.netPerKg}/kg in-pocket</span>
              </div>
              <div>
                <span className="text-white/45 block font-medium">TOTAL FREIGHT & TOLL DEDUCTION</span>
                <span className="text-base font-bold text-[#f87171] mt-0.5 block tabular-nums">
                  - ₹{topChoice.freight.toLocaleString()}
                </span>
                <span className="text-white/50 text-[11px]">Dedicated LCV Rate</span>
              </div>
              <div>
                <span className="text-white/45 block font-medium">COMPARED OPTIONS AVAILABLE</span>
                <span className="text-base font-bold text-white mt-0.5 block tabular-nums">{processedMandis.length} Mandis</span>
                <span className="text-white/50 text-[11px]">Within {maxDistance} km radius</span>
              </div>
            </div>
          </section>
        )}

        {/* ---------------- 4. INTERACTIVE 200+ MANDI SCANNER ---------------- */}
        <section id="matrix" className="max-w-7xl mx-auto px-6 py-16 font-trading">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#66ee7f] block">
                REGIONAL ARBITRAGE SCANNER
              </span>
              <h2 className="mt-1 text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Live Mandi Net Realization Table
              </h2>
            </div>

            <div className="flex items-center gap-1.5 border border-white/10 bg-white/[0.03] p-1 rounded-lg text-xs font-medium">
              <span className="text-white/45 px-2">Sort By:</span>
              <button
                onClick={() => setSortBy("net")}
                className={`px-3 py-1 rounded transition-colors ${
                  sortBy === "net" ? "bg-[#66ee7f] text-[#050b08] font-semibold" : "text-white/70 hover:text-white"
                }`}
              >
                Highest Net
              </button>
              <button
                onClick={() => setSortBy("price")}
                className={`px-3 py-1 rounded transition-colors ${
                  sortBy === "price" ? "bg-[#66ee7f] text-[#050b08] font-semibold" : "text-white/70 hover:text-white"
                }`}
              >
                Spot Rate
              </button>
              <button
                onClick={() => setSortBy("distance")}
                className={`px-3 py-1 rounded transition-colors ${
                  sortBy === "distance" ? "bg-[#66ee7f] text-[#050b08] font-semibold" : "text-white/70 hover:text-white"
                }`}
              >
                Distance
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 rounded-xl border border-white/10 bg-[#09150e] mb-6 text-xs">
            <div>
              <label className="text-white/50 block mb-1 font-medium">Commodity</label>
              <select
                value={commodity}
                onChange={(e) => setCommodity(e.target.value)}
                className="w-full bg-[#050b08] border border-white/15 rounded-lg px-3 py-2 text-white font-medium focus:outline-none focus:border-[#66ee7f]"
              >
                <option value="Onion (Kharif Red)">Onion (Kharif Red)</option>
                <option value="Tomato (Hybrid)">Tomato (Hybrid)</option>
                <option value="Potato (Jyoti)">Potato (Jyoti)</option>
                <option value="Soybean (Yellow)">Soybean (Yellow)</option>
                <option value="Pomegranate (Bhagwa)">Pomegranate (Bhagwa)</option>
              </select>
            </div>

            <div>
              <label className="text-white/50 block mb-1 font-medium">Quantity ({quantityQtl * 100} kg)</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="5"
                  max="500"
                  value={quantityQtl}
                  onChange={(e) => setQuantityQtl(Number(e.target.value))}
                  className="w-full bg-[#050b08] border border-white/15 rounded-lg px-3 py-2 text-white font-medium focus:outline-none focus:border-[#66ee7f]"
                />
                <span className="text-white/50 font-medium">Quintals</span>
              </div>
            </div>

            <div>
              <label className="text-white/50 block mb-1 font-medium">
                Radius: {maxDistance} km
              </label>
              <input
                type="range"
                min="30"
                max="350"
                step="10"
                value={maxDistance}
                onChange={(e) => setMaxDistance(Number(e.target.value))}
                className="w-full accent-[#66ee7f] mt-2.5"
              />
            </div>

            <div>
              <label className="text-white/50 block mb-1 font-medium">Search Mandi / Taluka</label>
              <div className="relative">
                <Search size={14} className="absolute left-3 top-2.5 text-white/40" />
                <input
                  type="text"
                  placeholder="e.g. Lasalgaon, Baramati..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#050b08] border border-white/15 rounded-lg pl-9 pr-3 py-2 text-white placeholder:text-white/30 focus:outline-none focus:border-[#66ee7f]"
                />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#06100a] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/10 bg-[#0a1810] text-white/50 font-semibold uppercase tracking-wider text-[11px]">
                    <th className="py-3.5 px-5">Mandi / Yard</th>
                    <th className="py-3.5 px-4">Distance</th>
                    <th className="py-3.5 px-4 text-right">Spot Price</th>
                    <th className="py-3.5 px-4 text-right">Gross Value</th>
                    <th className="py-3.5 px-4 text-right">Freight (LCV)</th>
                    <th className="py-3.5 px-4 text-right">APMC Cess (1.5%)</th>
                    <th className="py-3.5 px-5 text-right text-[#66ee7f] font-bold">Net In-Pocket</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {processedMandis.map((m, idx) => {
                    const isTop = idx === 0 && sortBy === "net";
                    return (
                      <tr
                        key={m.id}
                        className={`transition-colors ${isTop ? "bg-[#0b2416] font-medium" : "hover:bg-white/[0.02]"}`}
                      >
                        <td className="py-3.5 px-5">
                          <div className="flex items-center gap-2.5">
                            <span className="font-semibold text-white text-sm">{m.name}</span>
                            <span className="text-[11px] text-white/50 bg-white/5 px-2 py-0.5 rounded">
                              {m.district}
                            </span>
                            {isTop && (
                              <span className="bg-[#66ee7f] text-[#050b08] font-bold text-[10px] px-2 py-0.5 rounded-full">
                                BEST NET
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-white/70 tabular-nums">{m.distanceKm} km</td>
                        <td className="py-3.5 px-4 text-right font-medium text-white tabular-nums">
                          ₹{m.spotPricePerKg.toFixed(2)}/kg
                        </td>
                        <td className="py-3.5 px-4 text-right text-white/80 tabular-nums">₹{m.gross.toLocaleString()}</td>
                        <td className="py-3.5 px-4 text-right text-[#f87171] tabular-nums">- ₹{m.freight.toLocaleString()}</td>
                        <td className="py-3.5 px-4 text-right text-[#f87171] tabular-nums">- ₹{m.handling.toLocaleString()}</td>
                        <td className="py-3.5 px-5 text-right">
                          <div className="text-base font-bold text-[#66ee7f] tabular-nums tracking-tight">
                            ₹{m.net.toLocaleString()}
                          </div>
                          <div className="text-[11px] text-white/45 tabular-nums">₹{m.netPerKg}/kg net</div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {processedMandis.length === 0 && (
              <div className="py-16 text-center text-white/40 text-sm">
                No mandis found matching the selected radius or search query. Increase search radius.
              </div>
            )}
          </div>
        </section>

        {/* ---------------- 5. 3-GRID EXPLANATION ---------------- */}
        <section className="mx-auto max-w-6xl px-6 pb-24 pt-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="font-mono text-[12px] font-medium uppercase tracking-[0.3em] text-[#66ee7f]">
              HOW MARKET REALIZATION HELPS
            </span>
            <h2 className="mt-5 font-cine text-4xl font-bold leading-[1.04] tracking-[-0.02em] text-white sm:text-5xl">
              Watching out, with dignity.
            </h2>
          </div>

          <div className="mt-14 grid gap-x-14 gap-y-10 md:grid-cols-3">
            <div className="border-t border-white/12 pt-6">
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm text-[#66ee7f]/60">01</span>
                <Truck className="text-[#66ee7f]" size={22} strokeWidth={1.6} />
              </div>
              <h3 className="mt-5 font-cine text-xl font-semibold text-white">Diesel & Freight Math</h3>
              <p className="mt-2 leading-relaxed text-white/60 text-sm">
                Dedicated LCV rates calculated per kilometer, preventing distance from eating headline market profits.
              </p>
            </div>

            <div className="border-t border-white/12 pt-6">
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm text-[#66ee7f]/60">02</span>
                <Scale className="text-[#66ee7f]" size={22} strokeWidth={1.6} />
              </div>
              <h3 className="mt-5 font-cine text-xl font-semibold text-white">Statutory APMC Fees</h3>
              <p className="mt-2 leading-relaxed text-white/60 text-sm">
                Pre-calculated 1.5% mandi cess, handling charges, and loading deductions deducted transparently.
              </p>
            </div>

            <div className="border-t border-white/12 pt-6">
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm text-[#66ee7f]/60">03</span>
                <TrendingUp className="text-[#66ee7f]" size={22} strokeWidth={1.6} />
              </div>
              <h3 className="mt-5 font-cine text-xl font-semibold text-white">True Net Realization</h3>
              <p className="mt-2 leading-relaxed text-white/60 text-sm">
                Ranks destinations by actual pocketed earnings, showing that nearer yards often beat distant high-spot mandis.
              </p>
            </div>
          </div>
        </section>

        {/* ---------------- 6. CONSENT STRIP ---------------- */}
        <section className="mx-auto max-w-5xl px-6 pb-12">
          <div className="flex flex-col items-start gap-5 border-y border-white/12 py-12 sm:flex-row sm:items-center sm:gap-8">
            <ShieldCheck className="flex-shrink-0 text-[#66ee7f]" size={36} strokeWidth={1.4} />
            <div>
              <h3 className="font-cine text-2xl font-semibold text-white">
                Consent-first. Confidential. Always.
              </h3>
              <p className="mt-2 max-w-3xl leading-relaxed text-white/65 text-sm">
                Farmers choose what to share. Their data is theirs — handled with dignity and DPDP-aligned consent, never sold, never used against them.
              </p>
            </div>
          </div>
        </section>

        {/* ---------------- 7. BOTTOM CALLOUT CARD ---------------- */}
        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div
            className="relative overflow-hidden rounded-[2rem] border border-white/10 px-8 py-16 text-center sm:py-24"
            style={{
              background: "linear-gradient(155deg, rgb(10, 29, 19) 0%, rgb(18, 53, 36) 60%, rgb(13, 42, 28) 100%)",
            }}
          >
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background: "radial-gradient(45% 60% at 50% 0%, rgba(102, 238, 127, 0.16) 0%, transparent 70%)",
              }}
            />
            <div className="cine-grain-layer" />

            <h2 className="relative mx-auto max-w-3xl font-cine text-4xl font-extrabold leading-[1.0] tracking-[-0.02em] text-white sm:text-5xl">
              No one should face the hard seasons alone.
            </h2>

            <div className="relative mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                className="group inline-flex items-center gap-2 rounded-full bg-[#66ee7f] px-7 py-3.5 text-sm font-semibold text-[#06150f] transition-transform duration-300 hover:scale-[1.04] active:scale-95"
                href="/weather"
              >
                Next: Weather Horizon <ArrowRight size={15} />
              </Link>
              <Link
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-sm font-medium text-white/85 transition-colors duration-300 hover:bg-white/5"
                href="/schemes"
              >
                View Scheme Entitlements
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* ---------------- 8. FOOTER ---------------- */}
      <footer className="relative bg-[#050b08] border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
            <div>
              <p className="font-cine text-[clamp(2.25rem,5vw,3.5rem)] font-extrabold leading-none tracking-[-0.03em] text-white">
                Farm<span className="text-[#66ee7f]">Intel</span>
              </p>
              <p className="mt-4 max-w-xs font-mono text-xs uppercase tracking-[0.18em] text-white/40">
                The Farm Thinks For Itself
              </p>
            </div>

            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">Platform</p>
              <ul className="mt-4 space-y-2.5">
                <li><Link className="text-sm text-white/65 hover:text-[#66ee7f]" href="/market">Market Realization</Link></li>
                <li><Link className="text-sm text-white/65 hover:text-[#66ee7f]" href="/weather">Weather & Suitability</Link></li>
                <li><Link className="text-sm text-white/65 hover:text-[#66ee7f]" href="/schemes">Subsidies & Claims</Link></li>
              </ul>
            </div>

            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">Company</p>
              <ul className="mt-4 space-y-2.5">
                <li><Link className="text-sm text-white/65 hover:text-[#66ee7f]" href="/#why">Why Farm Intel</Link></li>
                <li><Link className="text-sm text-white/65 hover:text-[#66ee7f]" href="/privacy">Privacy Policy</Link></li>
                <li><Link className="text-sm text-white/65 hover:text-[#66ee7f]" href="/terms">Terms of Service</Link></li>
              </ul>
            </div>

            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">Data Feeds</p>
              <p className="mt-4 text-xs font-mono text-white/40 leading-relaxed">
                Mandi rates cross-referenced from AGMARKNET portals. Meteorological horizons via IMD open feeds.
              </p>
            </div>
          </div>

          <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/40">
              हिन्दी · मराठी · English
            </p>
            <p className="text-sm text-white/40">
              © 2026 Farm Intel · <span className="text-white/25">All rights reserved.</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}