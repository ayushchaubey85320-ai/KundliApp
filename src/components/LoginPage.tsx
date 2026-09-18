import React, { useState } from 'react';
import { dbService } from '../services/dbService';
import { AppUser } from '../services/dbConfig';
import { TRANSLATIONS, Language } from '../i18n/translations';
import { ShieldCheck, ArrowRight, UserCheck } from 'lucide-react';

interface LoginPageProps {
  language: Language;
  onLoginSuccess: (user: AppUser) => void;
  onSkip: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ language, onLoginSuccess, onSkip }) => {
  const t = TRANSLATIONS[language];
  const [customName, setCustomName] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  const handleGoogleLogin = () => {
    const name = customName.trim() || 'वैदिक साधक (Vedic Seeker)';
    const user = dbService.loginWithGoogle('vedic.user@gmail.com', name);
    onLoginSuccess(user);
  };

  const handleSkip = () => {
    dbService.skipAsGuest();
    onSkip();
  };

  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center px-4 py-8 max-w-[420px] mx-auto text-center space-y-6">
      {/* Divine Logo Aura */}
      <div className="relative">
        <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-2xl animate-pulse" />
        <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-600 via-yellow-500 to-amber-300 p-1 shadow-xl shadow-amber-500/25 flex items-center justify-center mx-auto">
          <div className="w-full h-full bg-[#0D121F] rounded-[22px] flex items-center justify-center text-4xl">
            🕉️
          </div>
        </div>
      </div>

      {/* Main Titles */}
      <div className="space-y-1.5">
        <h1 className="text-xl sm:text-2xl font-black text-amber-100 font-serif tracking-wide">
          {t.appTitle}
        </h1>
        <p className="text-xs text-amber-300 font-medium">
          {t.guidanceBy}
        </p>
        <p className="text-xs text-slate-400 max-w-[300px] mx-auto pt-1 leading-relaxed">
          {t.loginSubheading}
        </p>
      </div>

      {/* Login Action Card */}
      <div className="w-full bg-[#111625]/90 border border-amber-500/30 rounded-3xl p-5 shadow-2xl backdrop-blur-md space-y-4">
        {/* Google Sign-in Button */}
        <button
          onClick={handleGoogleLogin}
          className="w-full py-3.5 px-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm flex items-center justify-center gap-3 transition-all shadow-lg shadow-white/10 active:scale-[0.98]"
        >
          {/* Official Google SVG Icon */}
          <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
            />
          </svg>
          <span>{t.googleSignIn}</span>
        </button>

        {/* Optional Name prompt */}
        {!showCustomInput ? (
          <button
            onClick={() => setShowCustomInput(true)}
            className="text-[11px] text-slate-400 hover:text-amber-300 transition-colors underline"
          >
            {language === 'hi' ? 'अपना नाम दर्ज करके लॉगिन करना चाहते हैं?' : 'Prefer to enter your name first?'}
          </button>
        ) : (
          <div className="space-y-2 pt-1 text-left">
            <label className="text-[11px] text-amber-300 font-semibold block">
              {language === 'hi' ? 'आपका नाम:' : 'Your Name:'}
            </label>
            <input
              type="text"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              placeholder={language === 'hi' ? 'जैसे: राहुल शर्मा' : 'e.g., Rahul Sharma'}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>
        )}

        <div className="flex items-center gap-3 my-2">
          <div className="h-px bg-slate-800 flex-1" />
          <span className="text-[11px] text-slate-500 font-medium">
            {language === 'hi' ? 'अथवा' : 'OR'}
          </span>
          <div className="h-px bg-slate-800 flex-1" />
        </div>

        {/* Skip for now (Guest) Button */}
        <button
          onClick={handleSkip}
          className="w-full py-3 px-4 rounded-2xl bg-slate-800/80 hover:bg-slate-700 text-amber-300 font-semibold text-xs border border-amber-500/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
        >
          <UserCheck size={15} />
          <span>{t.skipGuest}</span>
          <ArrowRight size={14} className="text-amber-400" />
        </button>
      </div>

      {/* Security & Benefits Note */}
      <div className="bg-slate-900/40 border border-slate-800/60 rounded-2xl p-3 text-left space-y-1.5 text-xs text-slate-400">
        <div className="flex items-center gap-1.5 text-amber-400 font-semibold text-[11px]">
          <ShieldCheck size={14} />
          <span>{t.whyLoginTitle}</span>
        </div>
        <ul className="space-y-1 text-[11px] text-slate-300 pl-4 list-disc">
          {t.whyLoginPoints.map((pt, i) => (
            <li key={i}>{pt}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
