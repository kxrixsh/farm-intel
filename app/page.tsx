"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const [lang, setLang] = useState<"en" | "hi" | "mr">("en");

  return (
    <div className="min-h-screen bg-[#050b08] text-[#f4f7f3] relative font-sans selection:bg-[#66ee7f]/30 selection:text-[#050b08]">
      {/* ---------------- 1. NAVBAR ---------------- */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#050b08]/70 border-b border-white/5 transition-all">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <img
              src="/farm-intel-logo.jpg"
              alt="Farm Intel logo"
              className="h-9 w-9 rounded-lg object-cover transition-transform duration-300 group-hover:scale-105 border border-[#66ee7f]/30"
            />
            <span className="font-cine text-xl font-extrabold tracking-tight text-white">
              Farm<span className="text-[#66ee7f]">Intel</span>
            </span>
          </Link>

          {/* Center Links */}
          <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-white/70">
            <Link href="/market" className="hover:text-white transition-colors">
              Market Realization
            </Link>
            <Link href="/weather" className="hover:text-white transition-colors">
              Weather & Suitability
            </Link>
            <Link href="/schemes" className="hover:text-white transition-colors">
              Subsidies & Claims
            </Link>
            <Link href="#why" className="hover:text-white transition-colors">
              Why Farm Intel
            </Link>
          </div>

          {/* Right Action */}
          <div className="flex items-center gap-4">
            <div className="flex items-center rounded-full border border-white/15 bg-white/5 p-0.5 backdrop-blur-sm text-xs font-semibold">
              <button
                onClick={() => setLang("en")}
                className={`rounded-full px-2.5 py-1 transition-all ${
                  lang === "en" ? "bg-[#66ee7f] text-[#050b08]" : "text-white/60 hover:text-white"
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLang("hi")}
                className={`rounded-full px-2.5 py-1 transition-all ${
                  lang === "hi" ? "bg-[#66ee7f] text-[#050b08]" : "text-white/60 hover:text-white"
                }`}
              >
                हिन्दी
              </button>
              <button
                onClick={() => setLang("mr")}
                className={`rounded-full px-2.5 py-1 transition-all ${
                  lang === "mr" ? "bg-[#66ee7f] text-[#050b08]" : "text-white/60 hover:text-white"
                }`}
              >
                मराठी
              </button>
            </div>

            <Link
              href="/market"
              className="hidden sm:inline-flex rounded-full bg-[#66ee7f] px-6 py-2.5 text-sm font-semibold text-[#06150f] transition-transform duration-300 hover:scale-[1.04] active:scale-95"
            >
              Launch Console
            </Link>
          </div>
        </div>
      </nav>

      {/* ---------------- 2. HERO SECTION WITH CINEMATIC ZOOM & STAGGER ---------------- */}
      <section className="relative min-h-[100svh] flex flex-col justify-end overflow-hidden">
        {/* Parallax Zoom-out Background Photo */}
        <img
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2400&q=85"
          alt="Golden hour agricultural landscape"
          className="animate-cine-photo absolute inset-0 w-full h-full object-cover select-none"
        />
        <div className="cine-scrim" />
        <div className="cine-grain-layer" />

        {/* Hero Content with Staggered Fade Up */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 pb-[9vh] pt-40">
          <div className="animate-fade-up-1 font-mono text-[11px] sm:text-[12px] uppercase tracking-[0.32em] text-[#66ee7f]">
            BUILT FOR THE INDIAN FARMER
          </div>

          <h1
            className="animate-fade-up-2 mt-6 max-w-[15ch] font-cine font-extrabold leading-[0.92] tracking-[-0.03em] text-white"
            style={{ fontSize: "clamp(3rem, 8.5vw, 7.8rem)" }}
          >
            Farm Intel guides the <span className="italic text-[#66ee7f]">whole decision.</span>
          </h1>

          <div className="animate-fade-up-3 mt-8 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <p className="max-w-xl text-lg sm:text-xl leading-relaxed text-white/75 font-normal">
              Know where to sell. Know what to grow. Know what you can claim. Real-time net realization, weather horizon compatibility, and verified subsidy matching.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/market"
                className="inline-flex items-center gap-2 rounded-full bg-[#66ee7f] px-7 py-3.5 text-[15px] font-semibold text-[#06150f] transition-transform duration-300 hover:scale-[1.04] active:scale-95"
              >
                Where to sell <ArrowRight size={16} />
              </Link>
              <Link
                href="/weather"
                className="inline-flex items-center gap-2 text-[15px] font-medium text-white/85 hover:text-white transition-colors"
              >
                Explore Weather Window <ArrowRight size={15} className="opacity-60" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Hero Telemetry Strip */}
        <div className="relative z-10 border-t border-white/10 bg-[#050b08]/50 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 font-mono text-[11px] tracking-[0.16em] uppercase text-white/50">
            <span>3 PRACTICAL DECISIONS · DETERMINISTIC FREIGHT MODELING</span>
            <span>हिन्दी · मराठी · ENGLISH</span>
          </div>
        </div>
      </section>

      {/* ---------------- 3. THREE DECISIONS ARCHITECTURE ---------------- */}
      <section id="why" className="bg-[#050b08] py-24 lg:py-32 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid gap-12 lg:grid-cols-[0.8fr_1fr] lg:gap-24 items-start">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#66ee7f]">
              DECISION ENGINE
            </span>
            <h2 className="mt-4 font-cine text-4xl sm:text-5xl font-bold tracking-[-0.02em] leading-[1.04] text-white">
              Three decisions, working as one
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-white/65 max-w-md">
              Farm decisions shouldn't depend on guesswork. Farm Intel combines market logistics, atmospheric risk windows, and gazette entitlements into one focused layer.
            </p>
            <Link
              href="/market"
              className="mt-8 inline-flex items-center gap-2 font-semibold text-[#66ee7f] hover:text-white transition-colors"
            >
              Analyze Mandi Net Spread <ArrowRight size={15} />
            </Link>
          </div>

          <div className="divide-y divide-white/10 border-t border-b border-white/10">
            <div className="grid grid-cols-[auto_1fr_auto] items-baseline gap-6 py-7 hover:border-[#66ee7f]/40 transition-colors">
              <span className="font-mono text-sm text-[#66ee7f]/80">01</span>
              <div>
                <h3 className="font-cine text-2xl font-semibold text-white">Where should I sell?</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-white/55">
                  Calculates Mandi Price minus transport freight and APMC cess to show true estimated net realization.
                </p>
              </div>
              <span className="font-cine text-3xl font-bold text-[#66ee7f]/30">APMC</span>
            </div>

            <div className="grid grid-cols-[auto_1fr_auto] items-baseline gap-6 py-7 hover:border-[#66ee7f]/40 transition-colors">
              <span className="font-mono text-sm text-[#66ee7f]/80">02</span>
              <div>
                <h3 className="font-cine text-2xl font-semibold text-white">What should I grow?</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-white/55">
                  Evaluates crop suitability against upcoming 14-day deterministic and 30-day seasonal moisture horizons.
                </p>
              </div>
              <span className="font-cine text-3xl font-bold text-[#66ee7f]/30">89%</span>
            </div>

            <div className="grid grid-cols-[auto_1fr_auto] items-baseline gap-6 py-7 hover:border-[#66ee7f]/40 transition-colors">
              <span className="font-mono text-sm text-[#66ee7f]/80">03</span>
              <div>
                <h3 className="font-cine text-2xl font-semibold text-white">What can I claim?</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-white/55">
                  Discovers verified state and central subsidies matching your district, land size, and irrigation method.
                </p>
              </div>
              <span className="font-cine text-3xl font-bold text-[#66ee7f]/30">SCHEMES</span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- 4. DIGITAL TWIN TEASER ---------------- */}
      <section className="bg-[#050b08] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-[5/4] overflow-hidden rounded-[1.5rem] border border-white/10">
            <img
              src="https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1600&q=80"
              alt="Aerial view of crop field rows"
              className="w-full h-full object-cover transition-transform duration-[1.2s] hover:scale-105"
            />
            <div className="cine-grain-layer" />
          </div>

          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#66ee7f]">
              AGRONOMIC TELEMETRY
            </span>
            <h2
              className="mt-4 font-cine font-bold leading-[1.0] tracking-[-0.02em] text-white"
              style={{ fontSize: "clamp(2.25rem, 4.5vw, 3.75rem)" }}
            >
              A living picture of every field
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-white/70 max-w-md">
              Correlate satellite vegetation indices with on-ground soil moisture before selecting your sowing or harvest window.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <div className="flex items-baseline gap-2 rounded-2xl border border-[#66ee7f]/15 bg-[#66ee7f]/[0.06] px-5 py-4 backdrop-blur-sm">
                <span className="font-cine text-2xl font-bold text-white">6.8</span>
                <span className="font-mono text-[10px] uppercase tracking-wide text-[#66ee7f]/70">Soil pH</span>
              </div>
              <div className="flex items-baseline gap-2 rounded-2xl border border-[#66ee7f]/15 bg-[#66ee7f]/[0.06] px-5 py-4 backdrop-blur-sm">
                <span className="font-cine text-2xl font-bold text-white">0.72</span>
                <span className="font-mono text-[10px] uppercase tracking-wide text-[#66ee7f]/70">NDVI</span>
              </div>
              <div className="flex items-baseline gap-2 rounded-2xl border border-[#66ee7f]/15 bg-[#66ee7f]/[0.06] px-5 py-4 backdrop-blur-sm">
                <span className="font-cine text-2xl font-bold text-white">42%</span>
                <span className="font-mono text-[10px] uppercase tracking-wide text-[#66ee7f]/70">Moisture</span>
              </div>
              <div className="flex items-baseline gap-2 rounded-2xl border border-[#66ee7f]/15 bg-[#66ee7f]/[0.06] px-5 py-4 backdrop-blur-sm">
                <span className="font-cine text-2xl font-bold text-white">+18%</span>
                <span className="font-mono text-[10px] uppercase tracking-wide text-[#66ee7f]/70">Net Yield</span>
              </div>
            </div>

            <div className="mt-8">
              <Link
                href="/weather"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#66ee7f] hover:text-white transition-colors"
              >
                Inspect Agro-Meteorology Matrix <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- 5. IMPACT STATS SECTION ---------------- */}
      <section className="bg-[#050b08] border-y border-white/10 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-10 sm:divide-x sm:divide-white/10 text-center">
            <div className="px-4">
              <div className="font-cine text-5xl sm:text-6xl font-bold text-[#66ee7f]">+₹800</div>
              <div className="mt-2 font-mono text-[11px] uppercase tracking-wider text-white/50">Net/Quintal Spread</div>
            </div>
            <div className="px-4">
              <div className="font-cine text-5xl sm:text-6xl font-bold text-[#66ee7f]">−40%</div>
              <div className="mt-2 font-mono text-[11px] uppercase tracking-wider text-white/50">Logistics Leakage</div>
            </div>
            <div className="px-4">
              <div className="font-cine text-5xl sm:text-6xl font-bold text-[#66ee7f]">89%</div>
              <div className="mt-2 font-mono text-[11px] uppercase tracking-wider text-white/50">Thermal Fit Accuracy</div>
            </div>
            <div className="px-4">
              <div className="font-cine text-5xl sm:text-6xl font-bold text-[#66ee7f]">100%</div>
              <div className="mt-2 font-mono text-[11px] uppercase tracking-wider text-white/50">Gazette Sourced</div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- 6. DIRECTORY LISTING SECTION ---------------- */}
      <section className="bg-[#050b08] py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl">
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#66ee7f]">
              NAVIGATION LEDGER
            </span>
            <h2 className="mt-4 font-cine text-4xl sm:text-5xl font-bold leading-tight text-white">
              Launch your next decision
            </h2>
          </div>

          <div className="mt-14 border-t border-white/10">
            <Link
              href="/market"
              className="group grid grid-cols-[1fr_auto] sm:grid-cols-[0.4fr_1fr_auto] items-center gap-6 border-b border-white/10 py-7 hover:bg-white/[0.02] transition-colors sm:px-4"
            >
              <h3 className="font-cine text-2xl sm:text-3xl font-semibold text-white">Where to sell</h3>
              <p className="hidden sm:block text-white/55 text-sm">
                Rank mandis by true net revenue after freight deductions, not headline prices.
              </p>
              <ArrowRight size={22} className="text-[#66ee7f] transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>

            <Link
              href="/weather"
              className="group grid grid-cols-[1fr_auto] sm:grid-cols-[0.4fr_1fr_auto] items-center gap-6 border-b border-white/10 py-7 hover:bg-white/[0.02] transition-colors sm:px-4"
            >
              <h3 className="font-cine text-2xl sm:text-3xl font-semibold text-white">What to grow</h3>
              <p className="hidden sm:block text-white/55 text-sm">
                Evaluate crop varieties against localized thermal windows and rainfall uncertainty.
              </p>
              <ArrowRight size={22} className="text-[#66ee7f] transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>

            <Link
              href="/schemes"
              className="group grid grid-cols-[1fr_auto] sm:grid-cols-[0.4fr_1fr_auto] items-center gap-6 border-b border-white/10 py-7 hover:bg-white/[0.02] transition-colors sm:px-4"
            >
              <h3 className="font-cine text-2xl sm:text-3xl font-semibold text-white">What to claim</h3>
              <p className="hidden sm:block text-white/55 text-sm">
                Zero clutter directory: Discover verified income support and irrigation subsidies.
              </p>
              <ArrowRight size={22} className="text-[#66ee7f] transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------- 7. CALL TO ACTION PHOTO BANNER ---------------- */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden bg-[#050b08] border-t border-white/10">
        <img
          src="https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=2400&q=80"
          alt="Seedlings growing in nursery pots"
          className="absolute inset-0 w-full h-full object-cover select-none"
        />
        <div className="cine-scrim" />
        <div className="cine-grain-layer" />

        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 py-20">
          <div className="max-w-2xl">
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#66ee7f]">
              OPERATIONAL INTELLIGENCE
            </span>
            <h2
              className="mt-4 font-cine font-extrabold leading-[0.95] tracking-[-0.03em] text-white"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4.8rem)" }}
            >
              Run the <span className="italic text-[#66ee7f]">numbers first.</span>
            </h2>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/market"
                className="rounded-full bg-[#66ee7f] px-8 py-4 text-sm font-semibold text-[#06150f] hover:scale-105 active:scale-95 transition-all"
              >
                Launch Decision Matrix
              </Link>
              <Link
                href="/weather"
                className="rounded-full border border-white/25 px-8 py-4 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
              >
                Inspect Weather Horizon
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- 8. FOOTER ---------------- */}
      <footer className="border-t border-white/10 bg-[#050b08] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr_1fr] gap-12">
            <div>
              <div className="flex items-center gap-3">
                <img
                  src="/farm-intel-logo.jpg"
                  alt="Farm Intel logo"
                  className="h-8 w-8 rounded-lg object-cover border border-[#66ee7f]/30"
                />
                <span className="font-cine text-2xl font-extrabold text-white">
                  Farm<span className="text-[#66ee7f]">Intel</span>
                </span>
              </div>
              <p className="mt-4 max-w-xs font-mono text-xs uppercase tracking-[0.18em] text-white/40 leading-relaxed">
                KNOW WHERE TO SELL. KNOW WHAT TO GROW. KNOW WHAT YOU CAN CLAIM.
              </p>
            </div>

            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40 mb-4">DECISIONS</p>
              <ul className="space-y-2 text-sm text-white/70">
                <li><Link href="/market" className="hover:text-[#66ee7f] transition-colors">Market Realization</Link></li>
                <li><Link href="/weather" className="hover:text-[#66ee7f] transition-colors">Agro-Meteorology</Link></li>
                <li><Link href="/schemes" className="hover:text-[#66ee7f] transition-colors">Statutory Claims</Link></li>
              </ul>
            </div>

            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40 mb-4">SYSTEM</p>
              <ul className="space-y-2 text-sm text-white/70">
                <li><Link href="/privacy" className="hover:text-[#66ee7f] transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-[#66ee7f] transition-colors">Terms of Service</Link></li>
              </ul>
            </div>

            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40 mb-4">DATA ATTRIBUTION</p>
              <p className="text-xs text-white/40 leading-relaxed font-mono">
                Mandi rates cross-referenced from AGMARKNET portals. Meteorological horizons via IMD open feeds.
              </p>
            </div>
          </div>

          <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-white/40">
            <span>हिन्दी · मराठी · ENGLISH</span>
            <span>© 2026 FARM INTEL · ALL RIGHTS RESERVED</span>
          </div>
        </div>
      </footer>
    </div>
  );
}