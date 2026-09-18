import React from 'react';
import { KundliResult } from '../astrology/kundliEngine';
import { Sparkles } from 'lucide-react';

interface PlanetaryTableProps {
  kundli: KundliResult;
}

export const PlanetaryTable: React.FC<PlanetaryTableProps> = ({ kundli }) => {
  const { lagna, planets } = kundli;

  return (
    <div className="bg-[#101726]/90 border border-amber-500/30 rounded-2xl p-4 shadow-2xl backdrop-blur-md">
      <div className="flex items-center justify-between pb-3 border-b border-amber-500/20 mb-3">
        <h3 className="text-sm font-bold text-amber-300 font-serif flex items-center gap-2">
          <Sparkles size={15} className="text-amber-400" /> ग्रह स्थिति एवं स्पष्ट मान (Planetary Positions)
        </h3>
        <span className="text-[11px] text-slate-400">लाहिरी अयनांश: {kundli.ayanamsha.toFixed(2)}°</span>
      </div>

      {/* Lagna Highlight Card */}
      <div className="mb-3 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between">
        <div>
          <span className="text-[11px] text-amber-300/80 font-medium block">लग्न (Ascendant)</span>
          <span className="text-sm font-bold text-amber-200">
            {lagna.rashi.nameHi} राशि ({lagna.rashi.id})
          </span>
          <span className="text-[11px] text-slate-400 block mt-0.5">
            {lagna.deg}° {lagna.min}' {lagna.sec}" | {lagna.nakshatra.nameHi} (पद {lagna.pada})
          </span>
        </div>
        <div className="text-right">
          <span className="text-[10px] text-slate-400 block">नवमांश लग्न</span>
          <span className="text-xs font-semibold text-amber-300">{lagna.d9Rashi.nameHi} (D9)</span>
        </div>
      </div>

      {/* Planets List (Mobile-Optimized Cards) */}
      <div className="space-y-2">
        {planets.map((p) => {
          return (
            <div
              key={p.key}
              className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between hover:border-amber-500/40 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                {/* Planet Glyph Circle */}
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: `1px solid ${p.isRetrograde ? '#EF4444' : '#F59E0B'}`,
                  }}
                >
                  {p.symbol}
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-amber-200">{p.nameHi}</span>
                    <span className="text-[10px] text-slate-400">({p.abbr})</span>
                    {p.isRetrograde && (
                      <span className="text-[9px] px-1 py-0.2 bg-red-500/20 text-red-400 border border-red-500/40 rounded">
                        वक्री
                      </span>
                    )}
                    {p.isCombust && (
                      <span className="text-[9px] px-1 py-0.2 bg-amber-600/20 text-amber-400 border border-amber-600/40 rounded">
                        अस्त
                      </span>
                    )}
                  </div>

                  <div className="text-[10.5px] text-slate-400 mt-0.5">
                    <span className="text-slate-200 font-medium">{p.rashi.nameHi}</span> • {p.deg}° {p.min}' {p.sec}"
                  </div>
                </div>
              </div>

              {/* Right Side: Nakshatra, House, Dignity */}
              <div className="text-right">
                <div className="flex items-center justify-end gap-1 mb-0.5">
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                    भाव {p.d1House}
                  </span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                      p.dignity === 'Exalted'
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                        : p.dignity === 'Debilitated'
                        ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                        : 'bg-amber-500/10 text-amber-300'
                    }`}
                  >
                    {p.dignityHi}
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 block">
                  {p.nakshatra.nameHi} (पद {p.pada})
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
