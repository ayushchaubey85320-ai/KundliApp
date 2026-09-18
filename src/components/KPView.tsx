import React, { useState } from 'react';
import { KundliResult } from '../astrology/kundliEngine';
import { calculateKPData } from '../astrology/kpEngine';

interface KPViewProps {
  kundli: KundliResult;
}

export const KPView: React.FC<KPViewProps> = ({ kundli }) => {
  const [subTab, setSubTab] = useState<'cusps' | 'planets'>('cusps');
  const kp = calculateKPData(kundli);

  return (
    <div className="space-y-3 max-w-[430px] mx-auto select-none">
      {/* Subtab Toggle */}
      <div className="flex bg-slate-900/90 p-1 rounded-xl border border-slate-800">
        <button
          onClick={() => setSubTab('cusps')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
            subTab === 'cusps'
              ? 'bg-amber-500 text-slate-950 font-bold shadow'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          केपी भाव स्पष्ट (Cusps)
        </button>
        <button
          onClick={() => setSubTab('planets')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
            subTab === 'planets'
              ? 'bg-amber-500 text-slate-950 font-bold shadow'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          केपी ग्रह स्पष्ट (Planets)
        </button>
      </div>

      {/* Cusps Table */}
      {subTab === 'cusps' && (
        <div className="bg-[#101726]/90 border border-slate-800 rounded-2xl p-3 shadow-xl overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-[11px]">
                <th className="pb-2">भाव</th>
                <th className="pb-2">राशि</th>
                <th className="pb-2">डिग्री</th>
                <th className="pb-2">राशि स्वामी</th>
                <th className="pb-2">नक्षत्र</th>
                <th className="pb-2">उप-स्वामी</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {kp.cusps.map((c) => (
                <tr key={c.houseNumber} className="hover:bg-slate-800/40">
                  <td className="py-2 font-bold text-amber-300">भाव {c.houseNumber}</td>
                  <td className="py-2 text-slate-200">{c.rashiHi}</td>
                  <td className="py-2 text-slate-400 font-mono text-[10px]">{c.degreeStr}</td>
                  <td className="py-2 text-slate-300">{c.rashiLordHi}</td>
                  <td className="py-2 text-slate-400 text-[10px]">{c.nakshatraNameHi}</td>
                  <td className="py-2 font-bold text-amber-400">{c.subLordHi}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Planets Table */}
      {subTab === 'planets' && (
        <div className="bg-[#101726]/90 border border-slate-800 rounded-2xl p-3 shadow-xl overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-[11px]">
                <th className="pb-2">ग्रह</th>
                <th className="pb-2">राशि</th>
                <th className="pb-2">डिग्री</th>
                <th className="pb-2">राशि स्वामी</th>
                <th className="pb-2">नक्षत्र स्वामी</th>
                <th className="pb-2">उप-स्वामी</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {kp.planets.map((p) => (
                <tr key={p.nameHi} className="hover:bg-slate-800/40">
                  <td className="py-2 font-bold text-amber-200">{p.nameHi}</td>
                  <td className="py-2 text-slate-200">{p.rashiHi}</td>
                  <td className="py-2 text-slate-400 font-mono text-[10px]">{p.degreeStr}</td>
                  <td className="py-2 text-slate-300">{p.rashiLordHi}</td>
                  <td className="py-2 text-slate-400">{p.nakshatraLordHi}</td>
                  <td className="py-2 font-bold text-amber-400">{p.subLordHi}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
