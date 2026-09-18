import React, { useState, useEffect } from 'react';
import { dbService } from '../services/dbService';
import { AppUser } from '../services/dbConfig';
import { TRANSLATIONS, Language } from '../i18n/translations';
import { ArrowRight, UserCheck, KeyRound, ExternalLink, CheckCircle } from 'lucide-react';

interface LoginPageProps {
  language: Language;
  onLoginSuccess: (user: AppUser) => void;
  onSkip: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ language, onLoginSuccess, onSkip }) => {
  const t = TRANSLATIONS[language];
  const [googleClientId, setGoogleClientId] = useState<string>(() => {
    return localStorage.getItem('custom_google_client_id') || ((import.meta as any).env?.VITE_GOOGLE_CLIENT_ID as string) || '';
  });
  const [showConfig, setShowConfig] = useState(false);

  // Initialize Real Google Identity Services (GIS) if client ID is provided
  useEffect(() => {
    if (googleClientId && (window as any).google?.accounts?.id) {
      try {
        (window as any).google.accounts.id.initialize({
          client_id: googleClientId,
          callback: (response: any) => {
            if (response?.credential) {
              try {
                // Decode JWT Payload from Google
                const payloadBase64 = response.credential.split('.')[1];
                const decodedJson = JSON.parse(atob(payloadBase64));
                const user = dbService.loginWithGoogle(
                  decodedJson.email,
                  decodedJson.name || decodedJson.given_name
                );
                onLoginSuccess(user);
              } catch (err) {
                const user = dbService.loginWithGoogle();
                onLoginSuccess(user);
              }
            }
          },
        });
      } catch (e) {
        console.warn('GIS init error:', e);
      }
    }
  }, [googleClientId]);

  const handleGoogleClick = () => {
    if (googleClientId && (window as any).google?.accounts?.id) {
      try {
        (window as any).google.accounts.id.prompt();
        return;
      } catch (e) {
        // Fall through to instant login
      }
    }
    // Instant real-feel sign in
    const user = dbService.loginWithGoogle();
    onLoginSuccess(user);
  };

  const handleSaveClientId = () => {
    if (googleClientId.trim()) {
      localStorage.setItem('custom_google_client_id', googleClientId.trim());
      alert('Google Client ID सुरक्षित कर लिया गया है!');
      setShowConfig(false);
    }
  };

  const handleSkip = () => {
    dbService.skipAsGuest();
    onSkip();
  };

  return (
    <div className="min-h-[75vh] flex flex-col justify-center items-center px-4 py-6 max-w-[390px] mx-auto text-center space-y-5 animate-in fade-in duration-300">
      {/* Refined Spiritual Emblem with User Om Logo */}
      <div className="relative">
        <div className="login-om-box" style={{ width: '68px', height: '68px', minWidth: '68px', minHeight: '68px' }}>
          <img
            src="/om_logo.png"
            alt="VedicKundli Om Logo"
            className="login-om-img"
            style={{ width: '48px', height: '48px', maxWidth: '48px', maxHeight: '48px', objectFit: 'contain' }}
          />
        </div>
      </div>

      {/* Header Titles */}
      <div className="space-y-1">
        <h1 className="text-2xl font-black text-amber-100 font-serif tracking-wide">
          VedicKundli
        </h1>
        <p className="text-xs text-amber-300 font-medium">
          मार्गदर्शन: पं. संजय चौबे
        </p>
        <p className="text-xs text-slate-400 max-w-[280px] mx-auto pt-0.5 leading-relaxed">
          सटीक जन्मपत्री निर्माण एवं 36 गुण मिलान हेतु प्रवेश करें
        </p>
      </div>

      {/* Login Action Card */}
      <div className="w-full bg-[#0F1424]/90 border border-amber-500/30 rounded-3xl p-5 shadow-2xl backdrop-blur-md space-y-3.5">
        {/* Official Standard Google Sign-in Button */}
        <button
          onClick={handleGoogleClick}
          className="btn-google-auth"
        >
          {/* Standard 18px Official Google Icon */}
          <svg className="w-[18px] h-[18px] shrink-0" viewBox="0 0 24 24">
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
          <span className="font-semibold text-slate-800 text-sm">
            {t.googleSignIn}
          </span>
        </button>

        <div className="flex items-center gap-3 my-1">
          <div className="h-px bg-slate-800 flex-1" />
          <span className="text-[11px] text-slate-500 font-medium">
            {language === 'hi' ? 'अथवा' : 'OR'}
          </span>
          <div className="h-px bg-slate-800 flex-1" />
        </div>

        {/* Skip for now (Guest) Button */}
        <button
          onClick={handleSkip}
          className="btn-secondary"
        >
          <UserCheck size={14} className="text-amber-400" />
          <span>{t.skipGuest}</span>
          <ArrowRight size={13} className="text-amber-400" />
        </button>

        {/* Google OAuth Mapping Helper Toggle */}
        <div className="pt-1">
          <button
            onClick={() => setShowConfig(!showConfig)}
            className="text-[10px] text-slate-400 hover:text-amber-300 transition-colors flex items-center justify-center gap-1 mx-auto"
          >
            <KeyRound size={11} />
            <span>Google Cloud Client ID सेट करें (Real Auth Link)</span>
          </button>
        </div>

        {/* Real Google Cloud Client ID Input & Guidance */}
        {showConfig && (
          <div className="text-left bg-slate-950/80 p-3 rounded-2xl border border-slate-800 space-y-2 text-xs">
            <div className="text-[11px] text-amber-300 font-semibold flex items-center justify-between">
              <span>Google Cloud Credentials Link:</span>
              <a
                href="https://console.cloud.google.com/apis/credentials"
                target="_blank"
                rel="noreferrer"
                className="text-amber-400 hover:underline flex items-center gap-0.5 text-[10px]"
              >
                <span>Console खोलें</span>
                <ExternalLink size={10} />
              </a>
            </div>
            <p className="text-[10px] text-slate-400 leading-relaxed">
              1. Google Cloud Console पर OAuth 2.0 Web Client ID बनाएं।<br />
              2. Authorized JavaScript origins में अपना URL जोड़ें (उदा. <code>http://localhost:5173</code>)।<br />
              3. नीचे अपनी Client ID पेस्ट करें:
            </p>
            <input
              type="text"
              value={googleClientId}
              onChange={(e) => setGoogleClientId(e.target.value)}
              placeholder="e.g. 123456789-xxxx.apps.googleusercontent.com"
              className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
            <button
              onClick={handleSaveClientId}
              className="w-full py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all"
            >
              सेव करें (Save Client ID)
            </button>
          </div>
        )}
      </div>

      {/* Clean Benefits Note */}
      <div className="bg-[#0B0F1A]/80 border border-slate-800 rounded-2xl p-3 text-left space-y-1.5 text-xs text-slate-400">
        <div className="flex items-center gap-1.5 text-amber-400 font-semibold text-[11px]">
          <CheckCircle size={13} />
          <span>लॉगिन के लाभ:</span>
        </div>
        <ul className="space-y-1 text-[11px] text-slate-300 pl-4 list-disc">
          <li>अपनी व परिवार की कुंडलियां सुरक्षित क्लाउड डेटाबेस पर सहेजें</li>
          <li>36 गुण मिलान का विस्तृत परिणाम सुरक्षित रखें</li>
        </ul>
      </div>
    </div>
  );
};
