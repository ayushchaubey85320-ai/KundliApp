import React from 'react';
import { KundliResult } from '../astrology/kundliEngine';
import { analyzeYogas } from '../astrology/yogasEngine';
import { Sparkles, Award, Compass, TrendingUp, CheckCircle2 } from 'lucide-react';

interface PhaladeshViewProps {
  kundli: KundliResult;
}

export const PhaladeshView: React.FC<PhaladeshViewProps> = ({ kundli }) => {
  const report = analyzeYogas(kundli);

  return (
    <div className="space-y-3.5 max-w-[430px] mx-auto text-slate-200 select-none">
      {/* Active Yogas Banner */}
      <div className="bg-[#101726]/90 border border-amber-500/30 rounded-2xl p-4 shadow-xl">
        <div className="flex items-center justify-between pb-2.5 border-b border-amber-500/20 mb-3">
          <h3 className="text-sm font-bold text-amber-300 flex items-center gap-1.5 font-serif">
            <Award size={16} className="text-amber-400" /> सक्रिय शुभ राजयोग एवं धनयोग
          </h3>
          <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30">
            {report.activeYogas.length} योग सक्रिय
          </span>
        </div>

        {report.activeYogas.length === 0 ? (
          <p className="text-xs text-slate-400 py-2">
            सामान्य योग उपस्थित हैं। केंद्र व त्रिकोण के स्वामियों के आधार पर सामान्य फल प्राप्त होगा।
          </p>
        ) : (
          <div className="space-y-2.5">
            {report.activeYogas.map((yoga) => (
              <div
                key={yoga.id}
                className="p-3 rounded-xl bg-slate-900/80 border border-amber-500/20 space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-200 flex items-center gap-1">
                    <Sparkles size={12} className="text-amber-400" /> {yoga.nameHi}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-300">
                    {yoga.categoryHi}
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">{yoga.descriptionHi}</p>
                <div className="p-2 rounded-lg bg-amber-500/10 text-[11px] text-amber-100/90 leading-relaxed">
                  <strong>फल:</strong> {yoga.effectsHi}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lagna & Personality Analysis */}
      <div className="bg-[#101726]/90 border border-slate-800 rounded-2xl p-4 shadow-xl">
        <h4 className="text-xs font-bold text-amber-300 mb-2 flex items-center gap-1.5">
          <Compass size={14} className="text-amber-400" /> लग्न व व्यक्तित्व फल (जातक पारिजात)
        </h4>
        <p className="text-xs text-slate-300 leading-relaxed">{report.lagnaResultHi}</p>
      </div>

      {/* Career & Profession Analysis (10th house) */}
      <div className="bg-[#101726]/90 border border-slate-800 rounded-2xl p-4 shadow-xl">
        <h4 className="text-xs font-bold text-amber-300 mb-2 flex items-center gap-1.5">
          <TrendingUp size={14} className="text-amber-400" /> आजीविका, कर्म व प्रतिष्ठा (दशम भाव)
        </h4>
        <p className="text-xs text-slate-300 leading-relaxed">{report.careerKarmaResultHi}</p>
      </div>

      {/* Wealth & Prosperity Analysis */}
      <div className="bg-[#101726]/90 border border-slate-800 rounded-2xl p-4 shadow-xl">
        <h4 className="text-xs font-bold text-amber-300 mb-2 flex items-center gap-1.5">
          <CheckCircle2 size={14} className="text-amber-400" /> धन, संचित संपत्ति व लाभ
        </h4>
        <p className="text-xs text-slate-300 leading-relaxed">{report.wealthResultHi}</p>
      </div>
    </div>
  );
};
