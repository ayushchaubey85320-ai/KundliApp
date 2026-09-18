import React from 'react';
import { DoshaAnalysis } from '../astrology/doshaEngine';
import { ShieldAlert, Flame, Moon, Sparkles } from 'lucide-react';

interface DoshaCardProps {
  doshas: DoshaAnalysis;
}

export const DoshaCard: React.FC<DoshaCardProps> = ({ doshas }) => {
  const { manglik, kaalSarp, sadeSati } = doshas;

  return (
    <div className="space-y-4">
      {/* 1. Manglik Dosha Card */}
      <div className="bg-[#101726]/90 border border-amber-500/30 rounded-2xl p-4 shadow-2xl backdrop-blur-md">
        <div className="flex items-center justify-between pb-3 border-b border-amber-500/20 mb-3">
          <div className="flex items-center gap-2">
            <Flame className="text-red-400" size={18} />
            <h3 className="text-sm font-bold text-amber-200 font-serif">मांगलिक दोष विचार (Manglik Dosha)</h3>
          </div>
          <span
            className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${
              manglik.isManglik
                ? 'bg-red-500/20 text-red-300 border-red-500/40'
                : 'bg-green-500/20 text-green-300 border-green-500/40'
            }`}
          >
            {manglik.intensityHi}
          </span>
        </div>

        {manglik.isManglik ? (
          <div className="space-y-2.5 text-xs text-slate-300">
            <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">दोष का स्रोत (Affecting Reference):</span>
              <span className="font-semibold text-amber-300">{manglik.affectedFrom.join(', ')}</span>
            </div>

            {manglik.cancellationReasonsHi.length > 0 && (
              <div className="p-2.5 rounded-xl bg-green-500/10 border border-green-500/20">
                <span className="text-green-300 font-semibold block mb-1">दोष परिहार / निरस्तीकरण:</span>
                <ul className="list-disc list-inside space-y-0.5 text-slate-300">
                  {manglik.cancellationReasonsHi.map((reason, i) => (
                    <li key={i}>{reason}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <span className="text-amber-300 font-semibold block mb-1.5 flex items-center gap-1">
                <Sparkles size={13} /> शास्त्रोक्त निवारण एवं उपाय:
              </span>
              <ul className="space-y-1 text-slate-300">
                {manglik.remediesHi.map((r, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-amber-400 mt-0.5">•</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className="p-3 text-center rounded-xl bg-green-500/10 border border-green-500/20 text-xs text-green-200">
            ✓ यह कुंडली मांगलिक दोष से पूर्णतः मुक्त है।
          </div>
        )}
      </div>

      {/* 2. Kaal Sarp Dosha Card */}
      <div className="bg-[#101726]/90 border border-amber-500/30 rounded-2xl p-4 shadow-2xl backdrop-blur-md">
        <div className="flex items-center justify-between pb-3 border-b border-amber-500/20 mb-3">
          <div className="flex items-center gap-2">
            <ShieldAlert className="text-purple-400" size={18} />
            <h3 className="text-sm font-bold text-amber-200 font-serif">कालसर्प योग विश्लेषण (Kaal Sarp)</h3>
          </div>
          <span
            className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${
              kaalSarp.hasKaalSarp
                ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                : 'bg-green-500/20 text-green-300 border-green-500/40'
            }`}
          >
            {kaalSarp.hasKaalSarp ? kaalSarp.typeHi : 'दोष मुक्त'}
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed mb-3">{kaalSarp.descriptionHi}</p>

        {kaalSarp.hasKaalSarp && (
          <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs">
            <span className="text-purple-300 font-semibold block mb-1.5 flex items-center gap-1">
              <Sparkles size={13} /> अनुशंसित उपाय:
            </span>
            <ul className="space-y-1 text-slate-300">
              {kaalSarp.remediesHi.map((r, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-purple-400 mt-0.5">•</span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* 3. Sade Sati Card */}
      <div className="bg-[#101726]/90 border border-amber-500/30 rounded-2xl p-4 shadow-2xl backdrop-blur-md">
        <div className="flex items-center justify-between pb-3 border-b border-amber-500/20 mb-3">
          <div className="flex items-center gap-2">
            <Moon className="text-blue-400" size={18} />
            <h3 className="text-sm font-bold text-amber-200 font-serif">शनि साढ़ेसाती एवं ढैय्या</h3>
          </div>
          <span
            className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${
              sadeSati.isInSadeSati
                ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                : 'bg-slate-800 text-slate-300 border-slate-700'
            }`}
          >
            {sadeSati.phase}
          </span>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs mb-3 flex items-center justify-between">
          <div>
            <span className="text-slate-400 block text-[10px]">आपकी जन्म चंद्र राशि:</span>
            <span className="font-bold text-amber-200">{sadeSati.moonSignNameHi}</span>
          </div>
          <div className="text-right">
            <span className="text-slate-400 block text-[10px]">गोचर शनि स्थिति:</span>
            <span className="font-bold text-blue-300">{sadeSati.saturnSignNameHi}</span>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed mb-3">{sadeSati.descriptionHi}</p>

        {sadeSati.isInSadeSati && (
          <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs">
            <span className="text-blue-300 font-semibold block mb-1.5 flex items-center gap-1">
              <Sparkles size={13} /> शनि शांति उपाय:
            </span>
            <ul className="space-y-1 text-slate-300">
              {sadeSati.remediesHi.map((r, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-blue-400 mt-0.5">•</span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
