"use client";

import React, { useState } from "react";
import Link from "next/link";

interface Scheme {
  id: string;
  name: string;
  tag: string;
  category: "all" | "direct-income" | "equipment" | "irrigation" | "insurance";
  subsidyPct: string;
  benefit: string;
  description: string;
  documents: string[];
  portalName: string;
  portalUrl: string;
}

const SCHEMES: Scheme[] = [
  {
    id: "pm-kisan",
    name: "PM Kisan Samman Nidhi",
    tag: "Direct Benefit Transfer",
    category: "direct-income",
    subsidyPct: "100% Direct Aid",
    benefit: "₹6,000 / year (3 equal installments of ₹2,000)",
    description: "Central sector financial support credited directly to Aadhaar-seeded accounts to manage immediate sowing input requirements.",
    documents: ["Government Identity Card", "Land 7/12 & 8A Extract", "DBT Enabled Bank Passbook"],
    portalName: "Open PM-Kisan Portal",
    portalUrl: "https://pmkisan.gov.in/",
  },
  {
    id: "smam-mechanization",
    name: "SMAM Farm Mechanization",
    tag: "Tractors & Implements",
    category: "equipment",
    subsidyPct: "Up to 50% Grant",
    benefit: "Max ₹1,25,000 on Tillers, Rotavators & Custom Hiring Centres",
    description: "Subsidies targeting small and marginal farmers to modernize field prep, reduce heavy physical labor, and procure machinery.",
    documents: ["Farmer Identity Document", "Land Ownership Record", "Tractor RC (if implement-based)", "Authorized Dealer Quotation"],
    portalName: "Open AgriMachinery Portal",
    portalUrl: "https://agrimachinery.nic.in/",
  },
  {
    id: "pmksy-micro-irrigation",
    name: "PMKSY - Per Drop More Crop",
    tag: "Micro-Irrigation Grants",
    category: "irrigation",
    subsidyPct: "55% Composite Grant",
    benefit: "55% subsidy for Small/Marginal & 45% for Other farmers",
    description: "State-assisted drip and sprinkler installation grants to minimize water waste, increase fertilizer dispersion, and save power.",
    documents: ["7/12 Extract with crop entry", "Water source proof (Well/Borewell)", "Approved Micro-Irrigation Estimate"],
    portalName: "Apply on MahaDBT Portal",
    portalUrl: "https://mahadbt.maharashtra.gov.in/",
  },
  {
    id: "pmfby-insurance",
    name: "PMFBY Crop Insurance",
    tag: "Maharashtra ₹1 Scheme",
    category: "insurance",
    subsidyPct: "Comprehensive Cover",
    benefit: "Full Sum Insured Claim against localized losses",
    description: "Protection covering unpredictable monsoon breaks, unseasonal heavy rain, hailstorms, and post-harvest damage.",
    documents: ["e-Pik Pahani Crop Certificate", "Land Title (7/12 & 8A)", "Aadhaar-Linked Bank Proof"],
    portalName: "Open PMFBY Portal",
    portalUrl: "https://pmfby.gov.in/",
  },
];

export default function SchemesPage() {
  const [selectedSchemeId, setSelectedSchemeId] = useState<string>("pm-kisan");
  const [pumpHp, setPumpHp] = useState<number>(5);
  const [landArea, setLandArea] = useState<number>(2.4);

  const activeScheme = SCHEMES.find((s) => s.id === selectedSchemeId) || SCHEMES[0];

  const pumpCost = pumpHp * 64000;
  const subsidyAmount = Math.round(pumpCost * 0.6);
  const netFarmerShare = pumpCost - subsidyAmount;

  return (
    <div className="min-h-screen bg-[#070e0a] text-[#E0ECE4] font-sans antialiased selection:bg-[#25D366]/30">
      {/* Floating Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#070e0a]/40 backdrop-blur-md px-6 py-4 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="text-2xl">🌳</span>
            <span className="text-xl font-bold tracking-tight text-white">
              Farm<span className="text-[#25D366]">Intel</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm text-[#c5d6cc]">
            <Link href="/market" className="hover:text-white transition">Market Realization</Link>
            <Link href="/weather" className="hover:text-white transition">Weather & Radar</Link>
            <Link href="/schemes" className="text-white font-medium border-b border-[#25D366] pb-0.5">Subsidies & Claims</Link>
            <Link href="/" className="hover:text-white transition">About</Link>
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-xs bg-[#0b1710]/70 px-3 py-1.5 rounded-full border border-white/10 text-[#a2b7aa]">
              <span className="text-white font-semibold">English</span>
              <span>हिन्दी</span>
              <span>मराठी</span>
            </div>
            <a
              href="#simulator"
              className="text-xs font-semibold bg-[#25D366] hover:bg-[#22c35e] text-[#05140b] px-4 py-2 rounded-full transition"
            >
              Verify Schemes
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[580px] md:min-h-[640px] flex items-center pt-28 pb-16 px-6 overflow-hidden">
        {/* Crisp Farm Landscape Background */}
        <div
          className="absolute inset-0 bg-cover bg-center pointer-events-none"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=85&w=2000&auto=format&fit=crop')",
          }}
        />

        {/* Clear Horizon Mask */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070e0a] via-[#070e0a]/40 to-black/25 pointer-events-none" />

        <div className="relative max-w-5xl mx-auto w-full text-left">
          <p className="text-[12px] md:text-[13px] font-bold tracking-[0.22em] uppercase text-[#cfb670] mb-4 drop-shadow">
            KRISHI YOJANA &bull; VERIFIED CLAIMS
          </p>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-white leading-[1.05] mb-5 drop-shadow-md">
            Your entitlements, <br />
            <span className="text-[#25D366]">unlocked.</span>
          </h1>

          <p className="text-base sm:text-lg text-[#d8e8de] max-w-2xl font-normal leading-relaxed drop-shadow">
            A living intelligence portal for every farm — claim DBT payments, calculate 60% PM-KUSUM grants, and apply directly before deadlines close.
          </p>
        </div>
      </section>

      {/* Live Simulation Console */}
      <main className="max-w-6xl mx-auto px-6 pb-24 -mt-10 relative z-10" id="simulator">
        <div className="mb-6">
          <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#738e7d] mb-1.5">
            LIVE SIMULATION
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
                Try the Scheme Twin
              </h2>
              <p className="text-xs text-[#8da797] mt-1">
                Toggle schemes to inspect required filings, disbursements, and active portals.
              </p>
            </div>

            {/* Scheme Toggle Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {SCHEMES.map((scheme) => (
                <button
                  key={scheme.id}
                  onClick={() => setSelectedSchemeId(scheme.id)}
                  className={`flex items-center gap-1.5 text-xs px-3.5 py-1.5 rounded-full border transition ${
                    selectedSchemeId === scheme.id
                      ? "bg-[#112318] text-[#25D366] border-[#25D366]/60 shadow-sm"
                      : "bg-[#0b1610]/90 text-[#91aa9a] border-white/10 hover:border-white/20"
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]" />
                  <span>{scheme.name.split(" ")[0]} {scheme.name.split(" ")[1] || ""}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Scheme Detail Box */}
        <div className="rounded-2xl bg-[#0b1711] border border-[#162f22] p-6 sm:p-8 mb-12 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#14291e] pb-5 mb-6">
            <div>
              <div className="flex items-center gap-2.5">
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {activeScheme.name}
                </h3>
                <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#25D366]/15 text-[#25D366] border border-[#25D366]/30">
                  {activeScheme.tag}
                </span>
              </div>
              <p className="text-xs text-[#708c7c] mt-1">
                Maharashtra & Central Registry &bull; Verified Direct Endpoint
              </p>
            </div>

            <a
              href={activeScheme.portalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-semibold bg-[#25D366] hover:bg-[#20bd5a] text-[#06140b] transition px-4 py-2 rounded-full self-start sm:self-auto"
            >
              {activeScheme.portalName} ↗
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4 md:col-span-2">
              <div>
                <p className="text-xs uppercase font-semibold text-[#668572] tracking-wider mb-1">
                  Scheme Scope & Benefit Model
                </p>
                <p className="text-sm text-[#a8c4b4] leading-relaxed">
                  {activeScheme.description}
                </p>
              </div>

              <div className="pt-2">
                <p className="text-xs uppercase font-semibold text-[#668572] tracking-wider mb-2">
                  Document Checklist
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeScheme.documents.map((doc, idx) => (
                    <div
                      key={idx}
                      className="text-xs text-[#b8d4c3] bg-[#07110b] border border-[#14281e] px-3 py-2 rounded-lg flex items-center gap-2"
                    >
                      <span className="text-[#25D366] font-bold">&bull;</span>
                      <span>{doc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-[#061009] border border-[#14291e] p-5 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#25D366]">
                  ENTITLEMENT QUANTUM
                </span>
                <p className="text-2xl font-extrabold text-white mt-2">
                  {activeScheme.subsidyPct}
                </p>
                <p className="text-xs text-[#8aa696] mt-2 leading-relaxed">
                  {activeScheme.benefit}
                </p>
              </div>

              <div className="border-t border-[#12241b] pt-4 mt-6">
                <span className="text-[11px] text-[#63806e]">Target Cycle:</span>
                <p className="text-xs font-semibold text-[#a8c4b4] mt-0.5">
                  FY 2026-27 Active Window
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* PM-KUSUM Subsidy Sandbox Calculator */}
        <div className="mb-14 rounded-2xl bg-[#0b1711] border border-[#162f22] p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#14291e] pb-4 mb-6">
            <div>
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#25D366]">
                GRANT SANDBOX
              </span>
              <h3 className="text-xl font-bold text-white mt-1">
                PM-KUSUM Solar Pump Capital Estimator
              </h3>
            </div>
            <span className="text-xs font-mono text-[#7b9987] bg-[#061009] px-3 py-1 rounded border border-[#14291e]">
              60% CENTRAL + STATE GRANT
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-5">
              <div>
                <label className="text-xs font-semibold text-[#738e7e] uppercase tracking-wider block mb-2">
                  Motor Capacity
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[3, 5, 7.5].map((hp) => (
                    <button
                      key={hp}
                      onClick={() => setPumpHp(hp)}
                      className={`py-2 rounded-lg text-xs font-bold border transition ${
                        pumpHp === hp
                          ? "bg-[#25D366] text-[#05140b] border-[#25D366]"
                          : "bg-[#061009] text-[#8aa696] border-[#14291e] hover:border-[#25D366]/40"
                      }`}
                    >
                      {hp} HP
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center text-xs text-[#738e7e] mb-2 font-semibold uppercase">
                  <span>Land Parcel</span>
                  <span className="text-[#25D366] font-bold">{landArea} Hectares</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="10"
                  step="0.5"
                  value={landArea}
                  onChange={(e) => setLandArea(parseFloat(e.target.value))}
                  className="w-full accent-[#25D366] cursor-pointer"
                />
              </div>
            </div>

            <div className="p-5 rounded-xl bg-[#061009] border border-[#14291e] flex flex-col justify-between">
              <div>
                <p className="text-xs text-[#6e8a79] uppercase font-semibold">Benchmark System Cost</p>
                <p className="text-2xl font-bold text-white mt-1">₹{pumpCost.toLocaleString("en-IN")}</p>
              </div>
              <p className="text-[11px] text-[#556f60]">Standard MNRE benchmark for {pumpHp}HP DC Submersible Pump</p>
            </div>

            <div className="p-5 rounded-xl bg-[#0d2217] border border-[#25D366]/40 flex flex-col justify-between">
              <div>
                <p className="text-xs text-[#25D366] uppercase font-bold tracking-wider">Total Government Grant (60%)</p>
                <p className="text-3xl font-extrabold text-[#25D366] mt-1">₹{subsidyAmount.toLocaleString("en-IN")}</p>
              </div>
              <div className="border-t border-[#163625] pt-3 text-xs text-[#95b8a3] flex justify-between">
                <span>Farmer Share (10% + Bank Loan):</span>
                <span className="font-bold text-white">₹{netFarmerShare.toLocaleString("en-IN")}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Directory Card Selector Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {SCHEMES.map((scheme) => (
            <div
              key={scheme.id}
              onClick={() => {
                setSelectedSchemeId(scheme.id);
                document.getElementById("simulator")?.scrollIntoView({ behavior: "smooth" });
              }}
              className={`cursor-pointer rounded-2xl p-6 transition-all border ${
                selectedSchemeId === scheme.id
                  ? "bg-[#0e2117] border-[#25D366] shadow-lg shadow-[#25D366]/5"
                  : "bg-[#0b1711] border-[#162f22] hover:border-[#25D366]/50"
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-[11px] font-semibold text-[#25D366] tracking-wide">
                  {scheme.tag}
                </span>
                <span className="text-xs font-mono font-bold text-[#a0c2ad]">
                  {scheme.subsidyPct}
                </span>
              </div>

              <h4 className="text-lg font-bold text-white mb-1.5">{scheme.name}</h4>
              <p className="text-xs text-[#87a594] line-clamp-2 mb-4 leading-relaxed">
                {scheme.description}
              </p>

              <div className="flex items-center justify-between text-xs pt-3 border-t border-[#14291e]">
                <span className="text-[#617e6e] font-medium">Click to simulate</span>
                <span className="text-[#25D366] font-bold">View Breakdown &rarr;</span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}