import React, { useState } from 'react';
import { DashaOverview, Mahadasha } from '../astrology/dashaEngine';
import { ChevronDown, ChevronUp, Clock, CheckCircle2 } from 'lucide-react';

interface DashaViewProps {
  dasha: DashaOverview;
}

export const DashaView: React.FC<DashaViewProps> = ({ dasha }) => {
  const [expandedMaha, setExpandedMaha] = useState<string | null>(
    dasha.activeMahadasha ? dasha.activeMahadasha.planetKey : dasha.allMahadashas[0].planetKey
  );

  const toggleExpand = (key: string) => {
    setExpandedMaha(expandedMaha === key ? null : key);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('hi-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-[#101726]/90 border border-amber-500/30 rounded-2xl p-4 shadow-2xl backdrop-blur-md">
      <div className="flex items-center justify-between pb-3 border-b border-amber-500/20 mb-3">
        <h3 className="text-sm font-bold text-amber-300 font-serif flex items-center gap-2">
          <Clock size={15} className="text-amber-400" /> विंशोत्तरी महादशा (120 वर्षीय चक्र)
        </h3>
      </div>

      {/* Birth Dasha Balance Banner */}
      <div className="mb-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
        <div>
          <span className="text-[11px] text-slate-400 block">जन्म समय शेष दशा</span>
          <span className="font-semibold text-amber-300">{dasha.birthDashaLord} महादशा</span>
        </div>
        <div className="text-right text-[11px] text-amber-200">
          {dasha.balanceYears} वर्ष, {dasha.balanceMonths} माह, {dasha.balanceDays} दिन
        </div>
      </div>

      {/* Currently Active Dasha Callout */}
      {dasha.activeMahadasha && (
        <div className="mb-4 p-3.5 rounded-xl bg-gradient-to-r from-amber-500/20 via-amber-600/10 to-transparent border border-amber-500/40">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300 mb-1">
            <CheckCircle2 size={14} className="text-amber-400" /> वर्तमान सक्रिय दशा (Active Period)
          </div>
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-base font-bold text-white">
                {dasha.activeMahadasha.nameHi} महादशा
              </span>
              {dasha.activeAntardasha && (
                <span className="text-xs text-amber-200 block">
                  प्रत्यंतर्गत: <strong className="text-amber-300">{dasha.activeAntardasha.nameHi}</strong> अंतर्दशा
                </span>
              )}
            </div>
            <div className="text-right text-[11px] text-slate-300">
              <span className="block">{formatDate(dasha.activeMahadasha.startDate)}</span>
              <span className="text-slate-400">से {formatDate(dasha.activeMahadasha.endDate)}</span>
            </div>
          </div>
        </div>
      )}

      {/* 9 Mahadashas Accordion */}
      <div className="space-y-2">
        {dasha.allMahadashas.map((md: Mahadasha) => {
          const isExpanded = expandedMaha === md.planetKey;
          const isCurrent = md.isActive;

          return (
            <div
              key={md.planetKey}
              className={`rounded-xl border transition-all overflow-hidden ${
                isCurrent
                  ? 'bg-slate-900/90 border-amber-500/60 shadow-lg shadow-amber-900/20'
                  : 'bg-slate-900/50 border-slate-800'
              }`}
            >
              {/* Mahadasha Header Row */}
              <div
                onClick={() => toggleExpand(md.planetKey)}
                className="p-3 flex items-center justify-between cursor-pointer hover:bg-slate-800/40"
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      isCurrent ? 'bg-amber-400 animate-pulse' : 'bg-slate-600'
                    }`}
                  />
                  <div>
                    <span className="text-xs font-bold text-amber-200">
                      {md.nameHi} ({md.totalYears} वर्ष)
                    </span>
                    {isCurrent && (
                      <span className="ml-2 text-[9px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        सक्रिय
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                  <span>
                    {formatDate(md.startDate)} - {formatDate(md.endDate)}
                  </span>
                  {isExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                </div>
              </div>

              {/* Nested Antardashas List */}
              {isExpanded && (
                <div className="px-3 pb-3 pt-1 border-t border-slate-800/80 bg-slate-950/40">
                  <div className="text-[10px] font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                    {md.nameHi} में 9 अंतर्दशाएं:
                  </div>
                  <div className="grid grid-cols-1 gap-1">
                    {md.antardashas.map((ad) => {
                      const isNow =
                        new Date() >= ad.startDate && new Date() <= ad.endDate;
                      return (
                        <div
                          key={ad.planetKey}
                          className={`px-2.5 py-1.5 rounded-lg flex items-center justify-between text-xs ${
                            isNow
                              ? 'bg-amber-500/20 border border-amber-500/40 text-amber-200'
                              : 'bg-slate-900/40 text-slate-300'
                          }`}
                        >
                          <div className="flex items-center gap-1.5">
                            <span className="font-medium">{ad.nameHi}</span>
                            {isNow && (
                              <span className="text-[9px] text-amber-300 font-bold">• अभी सक्रिय</span>
                            )}
                          </div>
                          <div className="text-[10px] text-slate-400">
                            {formatDate(ad.startDate)} - {formatDate(ad.endDate)}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
