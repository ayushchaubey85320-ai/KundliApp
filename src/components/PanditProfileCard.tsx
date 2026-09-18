import { Award, Star, PhoneCall, Sparkles, MessageCircle } from 'lucide-react';

interface PanditProfileCardProps {
  compact?: boolean;
}

export const PanditProfileCard: React.FC<PanditProfileCardProps> = ({ compact = false }) => {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-amber-500/40 bg-gradient-to-b from-[#161C2C] via-[#0F1422] to-[#0A0D17] p-4 sm:p-5 shadow-[0_10px_35px_rgba(0,0,0,0.5)]">
      {/* Decorative Golden Light */}
      <div className="absolute -top-16 -right-16 w-36 h-36 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

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

      {/* Pandit Ji's Identity & Introduction with Om Logo */}
      <div className="flex items-start gap-3.5 mb-3.5">
        <div className="pandit-badge-om-box" style={{ width: '46px', height: '46px', minWidth: '46px', minHeight: '46px' }}>
          <img
            src="/om_logo.png"
            alt="Om"
            className="pandit-badge-om-img"
            style={{ width: '32px', height: '32px', maxWidth: '32px', maxHeight: '32px', objectFit: 'contain' }}
          />
        </div>
        <div>
          <h2 className="text-base sm:text-lg font-bold text-amber-100 font-serif leading-tight">
            पं. संजय चौबे
          </h2>
          <p className="text-xs text-amber-300/90 font-medium mt-0.5">
            वैदिक ज्योतिष, षोडशवर्ग चक्र एवं वास्तु मर्मज्ञ
          </p>
          <a
            href="tel:+918979838449"
            className="text-xs text-amber-400 font-mono font-bold mt-1 inline-block hover:underline"
          >
            संपर्क: +91 89798 38449
          </a>
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
              <span>सटीक जन्मपत्री एवं षोडशवर्ग चक्र</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-amber-400">❖</span>
              <span>36 गुण अष्टकूट मिलान व दोष उपाय</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-amber-400">❖</span>
              <span>विंशोत्तरी महादशा व राजयोग विचार</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-amber-400">❖</span>
              <span>गृह एवं व्यापारिक वास्तु दोष परीक्षण</span>
            </div>
          </div>
        </div>
      )}

      {/* Traditional Shloka */}
      <div className="bg-amber-950/20 border border-amber-500/20 rounded-xl p-2.5 my-2.5 text-center">
        <p className="text-[11px] text-amber-200/90 font-serif italic">
          “यथा शिखा मयूराणां नागानां मणयो यथा।<br />
          तद्वद्वेदाङ्गशास्त्राणां ज्योतिषं मूर्धनि स्थितम्॥”
        </p>
      </div>

      {/* Direct Call & WhatsApp Action Buttons */}
      <div className="grid grid-cols-2 gap-2 pt-1">
        <a
          href="tel:+918979838449"
          className="py-2 px-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all shadow-md shadow-amber-500/20 flex items-center justify-center gap-1"
        >
          <PhoneCall size={13} />
          <span>कॉल करें</span>
        </a>

        <a
          href="https://wa.me/918979838449?text=%E0%A4%AA%E0%A5%8D%E0%A4%B0%E0%A4%A3%E0%A4%BE%E0%A4%AE%20%E0%A4%AA%E0%A4%82.%20%E0%A4%B8%E0%A4%82%E0%A4%9C%E0%A4%AF%20%E0%A4%9A%E0%A5%8C%E0%A4%AC%E0%A5%87%20%E0%A4%9C%E0%A5%80,%20%E0%A4%AE%E0%A5%81%E0%A4%9D%E0%A5%87%20%E0%A4%95%E0%A5%81%E0%A4%82%E0%A4%A1%E0%A4%B2%E0%A5%80%20%E0%A4%B5%20%E0%A4%9C%E0%A5%8D%E0%A4%AF%E0%A5%8B%E0%A4%A4%E0%A4%BF%E0%A4%B7%20%E0%A4%AA%E0%A4%B0%E0%A4%BE%E0%A4%AE%E0%A4%B0%E0%A5%8D%E0%A4%Parse%E0%A4%B9%E0%A5%87%E0%A4%A4%E0%A5%81%20%E0%A4%AE%E0%A4%BE%E0%A4%B0%E0%A5%8D%E0%A4%97%E0%A4%A6%E0%A4%B0%E0%A5%8D%E0%A4%B6%E0%A4%A8%20%E0%A4%9A%E0%A4%BE%E0%A4%B9%E0%A4%BF%E0%A4%8F%E0%A5%A4"
          target="_blank"
          rel="noreferrer"
          className="py-2 px-2.5 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-500/40 text-xs font-bold transition-all flex items-center justify-center gap-1"
        >
          <MessageCircle size={13} className="text-emerald-400" />
          <span>व्हाट्सएप</span>
        </a>
      </div>
    </div>
  );
};
