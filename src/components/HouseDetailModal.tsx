import React from 'react';
import { HouseData, CalculatedPlanet } from '../astrology/kundliEngine';
import { BHAVAS } from '../astrology/constants';
import { X, Sparkles, Shield, Compass } from 'lucide-react';

interface HouseDetailModalProps {
  houseData: HouseData;
  allPlanets: CalculatedPlanet[];
  onClose: () => void;
}

export const HouseDetailModal: React.FC<HouseDetailModalProps> = ({ houseData, allPlanets, onClose }) => {
  const bhava = BHAVAS[houseData.houseNumber - 1];

  // Calculate planetary aspects casting on this house
  const aspectingPlanets: { planet: CalculatedPlanet; aspectType: string }[] = [];

  allPlanets.forEach((p) => {
    // Distance from planet to this house
    const dist = ((houseData.houseNumber - p.d1House + 12) % 12) + 1;

    // All planets cast 7th aspect
    if (dist === 7) {
      aspectingPlanets.push({ planet: p, aspectType: '7वीं पूर्ण दृष्टि' });
    }
    // Mars has special 4th and 8th aspects
    if (p.key === 'Mars' && (dist === 4 || dist === 8)) {
      aspectingPlanets.push({ planet: p, aspectType: `${dist}वीं विशेष दृष्टि` });
    }
    // Jupiter has special 5th and 9th aspects
    if (p.key === 'Jupiter' && (dist === 5 || dist === 9)) {
      aspectingPlanets.push({ planet: p, aspectType: `${dist}वीं विशेष दृष्टि (अमृत दृष्टि)` });
    }
    // Saturn has special 3rd and 10th aspects
    if (p.key === 'Saturn' && (dist === 3 || dist === 10)) {
      aspectingPlanets.push({ planet: p, aspectType: `${dist}वीं विशेष दृष्टि` });
    }
  });

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-0 sm:p-4">
      <div className="w-full sm:max-w-md bg-gradient-to-b from-[#111827] to-[#0B0E17] border border-amber-500/30 rounded-t-3xl sm:rounded-2xl p-5 shadow-2xl animate-in fade-in slide-in-from-bottom-6 duration-200">
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-amber-500/20">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                भाव {houseData.houseNumber}
              </span>
              <h3 className="text-lg font-bold text-amber-200 font-serif">{bhava.nameHi}</h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">{bhava.nameEn}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="mt-4 space-y-3.5 max-h-[70vh] overflow-y-auto pr-1">
          {/* Rashi & Lord */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
              <span className="text-[11px] text-slate-400 block mb-0.5">विद्यमान राशि</span>
              <span className="text-sm font-semibold text-amber-300">
                {houseData.rashi.nameHi} ({houseData.rashi.id})
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5">तत्व: {houseData.rashi.elementHi}</span>
            </div>
            <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
              <span className="text-[11px] text-slate-400 block mb-0.5">भाव स्वामी (भावेश)</span>
              <span className="text-sm font-semibold text-amber-300">{houseData.rashi.lordHi}</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">कारक: {bhava.karakaHi}</span>
            </div>
          </div>

          {/* Significance */}
          <div className="bg-amber-500/10 p-3 rounded-xl border border-amber-500/20">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-300 mb-1">
              <Compass size={14} /> भाव का कारकत्व (फल)
            </div>
            <p className="text-xs text-amber-100/80 leading-relaxed">{bhava.significanceHi}</p>
          </div>

          {/* Occupying Planets */}
          <div>
            <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-2">
              <Sparkles size={13} className="text-amber-400" /> भाव में स्थित ग्रह (Occupants)
            </span>
            {houseData.planets.length === 0 ? (
              <div className="p-3 text-center rounded-xl bg-slate-900/40 border border-slate-800 text-xs text-slate-400">
                इस भाव में कोई ग्रह उपस्थित नहीं है (रिक्त भाव)।
              </div>
            ) : (
              <div className="space-y-2">
                {houseData.planets.map((p) => (
                  <div
                    key={p.key}
                    className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{p.symbol}</span>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-amber-200">{p.nameHi}</span>
                          {p.isRetrograde && (
                            <span className="text-[10px] px-1.5 py-0.2 bg-red-500/20 text-red-400 border border-red-500/30 rounded">
                              वक्री
                            </span>
                          )}
                          {p.isCombust && (
                            <span className="text-[10px] px-1.5 py-0.2 bg-amber-600/20 text-amber-400 border border-amber-600/30 rounded">
                              अस्त
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-400">
                          {p.deg}° {p.min}' {p.sec}" | {p.nakshatra.nameHi} (पद {p.pada})
                        </span>
                      </div>
                    </div>
                    <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-800 text-amber-300">
                      {p.dignityHi}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Aspecting Planets */}
          <div>
            <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-2">
              <Shield size={13} className="text-blue-400" /> इस भाव पर ग्रहों की दृष्टियां
            </span>
            {aspectingPlanets.length === 0 ? (
              <div className="p-2.5 text-center rounded-xl bg-slate-900/40 border border-slate-800 text-[11px] text-slate-400">
                कोई सीधी पूर्ण दृष्टि नहीं है।
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {aspectingPlanets.map((item, idx) => (
                  <div key={idx} className="p-2 rounded-lg bg-slate-900/60 border border-slate-800 text-xs">
                    <span className="font-semibold text-amber-200">{item.planet.nameHi}</span>
                    <span className="text-[10px] text-slate-400 block">{item.aspectType}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
