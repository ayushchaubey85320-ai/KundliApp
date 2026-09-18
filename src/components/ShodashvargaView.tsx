import React, { useState } from 'react';
import { KundliResult, calculateVargaHouses } from '../astrology/kundliEngine';
import { SHODASHVARGAS, VargaDef } from '../astrology/constants';
import { NorthIndianChart } from './NorthIndianChart';

interface ShodashvargaViewProps {
  kundli: KundliResult;
  onSelectHouse?: (houseNumber: number) => void;
}

export const ShodashvargaView: React.FC<ShodashvargaViewProps> = ({ kundli, onSelectHouse }) => {
  const [selectedVarga, setSelectedVarga] = useState<VargaDef>(SHODASHVARGAS[5]); // Default D9 Navamsha

  const houses = calculateVargaHouses(kundli, selectedVarga.division);

  return (
    <div className="space-y-3 max-w-[430px] mx-auto">
      {/* Varga Selector Pills */}
      <div className="bg-slate-900/90 p-2 rounded-2xl border border-slate-800">
        <div className="flex items-center justify-between mb-2 px-1">
          <span className="text-xs font-bold text-amber-300">
            षोडशवर्ग चक्र (16 Divisional Charts)
          </span>
          <span className="text-[11px] text-slate-400">जातक पारिजात पद्धति</span>
        </div>

        <div className="flex gap-1.5 overflow-x-auto pb-1.5 scrollbar-thin">
          {SHODASHVARGAS.map((v) => {
            const isSelected = selectedVarga.key === v.key;
            return (
              <button
                key={v.key}
                onClick={() => setSelectedVarga(v)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all border ${
                  isSelected
                    ? 'bg-amber-500 text-slate-950 font-bold border-amber-400 shadow-md'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                }`}
              >
                {v.key} ({v.nameHi})
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Varga Chart Title & Purpose */}
      <div className="text-center bg-slate-900/60 p-2 rounded-xl border border-slate-800">
        <h3 className="text-sm font-bold text-amber-200">
          {selectedVarga.nameHi} चक्र ({selectedVarga.nameEn})
        </h3>
        <p className="text-xs text-slate-400 mt-0.5">उद्देश्य: {selectedVarga.purposeHi}</p>
      </div>

      {/* Render North Indian Chart for this Varga */}
      <NorthIndianChart
        houses={houses}
        lagnaData={{
          displayTag: 'ल',
          deg: kundli.lagna.deg,
          degSuperscript: kundli.lagna.degSuperscript,
        }}
        onSelectHouse={onSelectHouse}
      />
    </div>
  );
};
