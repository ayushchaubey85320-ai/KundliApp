import React from 'react';
import { ArrowLeft, Award, Star, PhoneCall, Sparkles, CheckCircle2, MessageCircle } from 'lucide-react';
import { Language } from '../i18n/translations';

interface PanditProfilePageProps {
  language: Language;
  onBack: () => void;
}

export const PanditProfilePage: React.FC<PanditProfilePageProps> = ({ onBack }) => {
  return (
    <div className="space-y-4 max-w-[430px] mx-auto pb-8 animate-in fade-in duration-200">
      {/* Back to Home Button */}
      <button
        onClick={onBack}
        className="py-1.5 px-3 rounded-xl bg-slate-900 text-amber-300 border border-slate-800 text-xs flex items-center gap-1.5 hover:bg-slate-800 transition-colors"
      >
        <ArrowLeft size={14} /> मुख्य पृष्ठ पर वापस लौटें (Back)
      </button>

      {/* Main Prestigious Profile Header Card */}
      <div className="relative overflow-hidden rounded-3xl border border-amber-500/40 bg-gradient-to-b from-[#161D2F] via-[#0E1322] to-[#080B14] p-5 shadow-2xl text-center">
        {/* Decorative Golden Aura */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* User-provided Red Om Logo Emblem */}
        <div className="login-om-box mb-3" style={{ width: '68px', height: '68px', minWidth: '68px', minHeight: '68px' }}>
          <img
            src="/om_logo.png"
            alt="VedicKundli Om"
            className="login-om-img"
            style={{ width: '48px', height: '48px', maxWidth: '48px', maxHeight: '48px', objectFit: 'contain' }}
          />
        </div>

        {/* Title & Honorifics */}
        <div className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[11px] font-bold border border-amber-500/30 mb-2">
          <Award size={12} className="text-amber-400" />
          <span>पूज्य ज्योतिषाचार्य एवं वास्तु मर्मज्ञ</span>
        </div>

        <h1 className="text-xl sm:text-2xl font-black text-amber-100 font-serif tracking-wide">
          पं. संजय चौबे
        </h1>

        <p className="text-xs text-amber-300/90 font-medium mt-1">
          वैदिक ज्योतिष, षोडशवर्ग चक्र, कर्मकांड एवं वास्तु मर्मज्ञ
        </p>

        <p className="text-xs text-slate-300 mt-2 max-w-[320px] mx-auto leading-relaxed">
          30+ वर्षों का अनवरत साधना एवं वैदिक ज्योतिष अनुसंधान। सहस्रों जातकों को जीवन, विवाह, आजीविका व स्वास्थ्य में सटीक मार्गदर्शन।
        </p>

        {/* Rating Stars */}
        <div className="flex items-center justify-center gap-1 text-amber-400 text-sm mt-3">
          <Star size={14} fill="currentColor" />
          <Star size={14} fill="currentColor" />
          <Star size={14} fill="currentColor" />
          <Star size={14} fill="currentColor" />
          <Star size={14} fill="currentColor" />
          <span className="text-xs text-slate-400 font-bold ml-1.5">(4.9/5 • 10,000+ परामर्श)</span>
        </div>
      </div>

      {/* DIRECT CONTACT & BOOKING ACTION BOX */}
      <div className="bg-gradient-to-r from-amber-500/15 via-[#101524] to-emerald-500/15 border border-amber-500/40 rounded-3xl p-4 text-center space-y-3 shadow-xl">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300">
          <PhoneCall size={14} className="text-amber-400" />
          <span>सीधा संपर्क एवं परामर्श सूत्र</span>
        </div>

        <div className="bg-[#0A0D17] border border-slate-800 rounded-2xl p-3 text-center space-y-1">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">
            पं. संजय चौबे का आधिकारिक मोबाइल नंबर:
          </span>
          <a
            href="tel:+918979838449"
            className="text-lg font-black text-amber-300 hover:text-amber-200 tracking-wider font-mono block"
          >
            +91 89798 38449
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
          {/* Direct Call Button */}
          <a
            href="tel:+918979838449"
            className="btn-gold-primary text-xs py-3"
          >
            <PhoneCall size={14} />
            <span>कॉल करें (+91 89798 38449)</span>
          </a>

          {/* Direct WhatsApp Button */}
          <a
            href="https://wa.me/918979838449?text=%E0%A4%AA%E0%A5%8D%E0%A4%B0%E0%A4%A3%E0%A4%BE%E0%A4%AE%20%E0%A4%AA%E0%A4%82.%20%E0%A4%B8%E0%A4%82%E0%A4%9C%E0%A4%AF%20%E0%A4%9A%E0%A5%8C%E0%A4%AC%E0%A5%87%20%E0%A4%9C%E0%A5%80,%20%E0%A4%AE%E0%A5%81%E0%A4%9D%E0%A5%87%20%E0%A4%95%E0%A5%81%E0%A4%82%E0%A4%A1%E0%A4%B2%E0%A5%80%20%E0%A4%B5%20%E0%A4%9C%E0%A5%8D%E0%A4%AF%E0%A5%8B%E0%A4%A4%E0%A4%BF%E0%A4%B7%20%E0%A4%AA%E0%A4%B0%E0%A4%BE%E0%A4%AE%E0%A4%B0%E0%A5%8D%E0%A4%Parse%E0%A4%B9%E0%A5%87%E0%A4%A4%E0%A5%81%20%E0%A4%AE%E0%A4%BE%E0%A4%B0%E0%A5%8D%E0%A4%97%E0%A4%A6%E0%A4%B0%E0%A5%8D%E0%A4%B6%E0%A4%A8%20%E0%A4%9A%E0%A4%BE%E0%A4%B9%E0%A4%BF%E0%A4%8F%E0%A5%A4"
            target="_blank"
            rel="noreferrer"
            className="btn-secondary text-xs py-3 border-emerald-500/40 text-emerald-300 hover:bg-emerald-950/30"
          >
            <MessageCircle size={14} className="text-emerald-400" />
            <span>व्हाट्सएप संदेश भेजें</span>
          </a>
        </div>
      </div>

      {/* Areas of Expertise / Shastric Specializations */}
      <div className="bg-[#0F1424] border border-amber-500/25 rounded-3xl p-4 sm:p-5 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-300 border-b border-slate-800 pb-2">
          <Sparkles size={15} className="text-amber-400" />
          <span>विशिष्ट शास्त्रीय परामर्श क्षेत्र (Core Expertise)</span>
        </div>

        <div className="space-y-2.5 text-xs">
          <div className="flex items-start gap-2.5 p-2.5 rounded-2xl bg-slate-900/70 border border-slate-800">
            <CheckCircle2 size={16} className="text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-amber-200">सटीक जन्मपत्री एवं षोडशवर्ग चक्र (D1-D16)</h3>
              <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">
                लग्न, नवमांश, दशमांश, होरा व सप्तांश चक्रों का सूक्ष्म गणितीय विश्लेषण जिससे जीवन की प्रत्येक दिशा स्पष्ट होती है।
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-2.5 rounded-2xl bg-slate-900/70 border border-slate-800">
            <CheckCircle2 size={16} className="text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-amber-200">विवाह हेतु 36 गुण अष्टकूट मिलान व दोष परिहार</h3>
              <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">
                नाड़ी दोष, भकूट दोष व गण दोष का शास्त्रीय परीक्षण तथा प्रामाणिक वैदिक उपायों द्वारा दांपत्य शांति विधान।
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-2.5 rounded-2xl bg-slate-900/70 border border-slate-800">
            <CheckCircle2 size={16} className="text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-amber-200">विंशोत्तरी महादशा, गोचर एवं राजयोग फलकथन</h3>
              <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">
                आजीविका, व्यवसाय, नौकरी व पदोन्नति के शुभ समय का निर्धारण तथा प्रतिकूल समय में रक्षा हेतु मार्गदर्शन।
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-2.5 rounded-2xl bg-slate-900/70 border border-slate-800">
            <CheckCircle2 size={16} className="text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-amber-200">गृह एवं व्यावसायिक वास्तु दोष निवारण</h3>
              <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">
                बिना तोड़-फोड़ के ऊर्जा संतुलन, मुख्य द्वार, रसोई व धन स्थान की वैदिक वास्तु अनुकूलता।
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Traditional Shloka / Blessing */}
      <div className="bg-amber-950/20 border border-amber-500/20 rounded-2xl p-4 text-center space-y-1">
        <p className="text-xs text-amber-200 font-serif italic leading-relaxed">
          “यथा शिखा मयूराणां नागानां मणयो यथा।<br />
          तद्वद्वेदाङ्गशास्त्राणां ज्योतिषं मूर्धनि स्थितम्॥”
        </p>
        <p className="text-[10px] text-slate-400 pt-1">
          — वेदांग ज्योतिष (जिस प्रकार मयूरों में शिखा और नागों में मणि का स्थान सर्वोच्च है, उसी प्रकार समस्त वेदों में ज्योतिष शास्त्र शिरोधार्य है।)
        </p>
      </div>
    </div>
  );
};
