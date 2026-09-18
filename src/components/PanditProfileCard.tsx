import React from 'react';
import { Award, Star, Compass, PhoneCall, Sparkles } from 'lucide-react';

interface PanditProfileCardProps {
  compact?: boolean;
}

export const PanditProfileCard: React.FC<PanditProfileCardProps> = ({ compact = false }) => {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-amber-500/40 bg-gradient-to-b from-[#161C2C] via-[#0F1422] to-[#0A0D17] p-4 sm:p-5 shadow-[0_10px_35px_rgba(0,0,0,0.5)]">
      {/* Decorative Aura / Background Glow */}
      <div className="absolute -top-16 -right-16 w-36 h-36 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-orange-600/10 rounded-full blur-2xl pointer-events-none" />

      {/* Top Header Badge */}
      <div className="flex items-center justify-between mb-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[11px] font-bold tracking-wide">
          <Award size={13} className="text-amber-400" />
          <span>पूज्य ज्योतिषाचार्य एवं वास्तु मर्मज्ञ</span>
        </div>
        <div className="flex items-center gap-1 text-amber-400 text-xs">
          <Star size={12} fill="currentColor" />
          <Star size={12} fill="currentColor" />
          <Star size={12} fill="currentColor" />
          <Star size={12} fill="currentColor" />
          <Star size={12} fill="currentColor" />
        </div>
      </div>

      {/* Pandit Ji's Identity & Introduction */}
      <div className="flex items-start gap-3.5 mb-3.5">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-600 via-yellow-500 to-amber-300 p-0.5 shadow-lg shadow-amber-500/20 shrink-0">
          <div className="w-full h-full bg-[#111625] rounded-[14px] flex items-center justify-center text-2xl font-bold text-amber-300">
            🕉️
          </div>
        </div>
        <div>
          <h2 className="text-base sm:text-lg font-bold text-amber-100 font-serif leading-tight">
            पं. संजय चौबे
          </h2>
          <p className="text-xs text-amber-300/90 font-medium mt-0.5">
            वैदिक ज्योतिष, षोडशवर्ग चक्र एवं वास्तु मर्मज्ञ
          </p>
          <p className="text-[11px] text-slate-300 mt-1">
            30+ वर्षों का सतत अनुसंधान एवं सहस्रों जन्मपत्रियों का सटीक शास्त्रीय फलादेश
          </p>
        </div>
      </div>

      {/* Specialties & Guidance Points */}
      {!compact && (
        <div className="space-y-1.5 my-3 bg-slate-900/60 p-3 rounded-2xl border border-slate-800/80 text-xs text-slate-200">
          <div className="text-[11px] font-bold text-amber-300 flex items-center gap-1.5 mb-1">
            <Sparkles size={12} className="text-amber-400" />
            <span>विशेष शास्त्रीय परामर्श क्षेत्र:</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px] text-slate-300">
            <div className="flex items-center gap-1.5">
              <span className="text-amber-400">❖</span>
              <span>सटीक जन्मपत्री एवं षोडशवर्ग (D1-D16) चक्र</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-amber-400">❖</span>
              <span>36 गुण अष्टकूट मिलान व नाड़ी/भकूट दोष उपाय</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-amber-400">❖</span>
              <span>विंशोत्तरी महादशा, गोचर व राजयोग विश्लेषण</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-amber-400">❖</span>
              <span>गृह एवं व्यापारिक वास्तु दोष परीक्षण</span>
            </div>
          </div>
        </div>
      )}

      {/* Traditional Shloka / Vedic Quote */}
      <div className="bg-amber-950/20 border border-amber-500/20 rounded-xl p-2.5 my-2.5 text-center">
        <p className="text-[11px] text-amber-200/90 font-serif italic">
          “यथा शिखा मयूराणां नागानां मणयो यथा।<br />
          तद्वद्वेदाङ्गशास्त्राणां ज्योतिषं मूर्धनि स्थितम्॥”
        </p>
      </div>

      {/* Consultation Action Footer */}
      <div className="flex items-center justify-between pt-1">
        <div className="text-[11px] text-slate-400 flex items-center gap-1">
          <Compass size={13} className="text-amber-400" />
          <span>पवित्र वैदिक परंपरा एवं प्रामाणिक मार्गदर्शन</span>
        </div>
        <button
          onClick={() => {
            alert('पूज्य पं. संजय चौबे जी से व्यक्तिगत परामर्श हेतु संपर्क सूत्र शीघ्र उपलब्ध कराया जाएगा।');
          }}
          className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all shadow-md shadow-amber-500/20 flex items-center gap-1"
        >
          <PhoneCall size={12} />
          <span>परामर्श लें</span>
        </button>
      </div>
    </div>
  );
};
