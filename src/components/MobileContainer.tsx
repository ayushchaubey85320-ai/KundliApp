import React, { useState } from 'react';
import { AppUser } from '../services/dbConfig';
import { Language, TRANSLATIONS } from '../i18n/translations';
import {
  Smartphone,
  Monitor,
  Bookmark,
  PlusCircle,
  Share2,
  LogIn,
  LogOut,
  Home,
  Globe,
  Award,
  PhoneCall,
} from 'lucide-react';

interface MobileContainerProps {
  children: React.ReactNode;
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
  onOpenSaved: () => void;
  onNewKundli: () => void;
  onShareOrPrint: () => void;
  language: Language;
  onToggleLanguage: () => void;
  currentUser: AppUser | null;
  onOpenLogin: () => void;
  onLogout: () => void;
  onGoHome: () => void;
  onOpenPanditProfile?: () => void;
  activeScreen: 'login' | 'home' | 'make_kundli' | 'match_kundli' | 'pandit_profile';
}

export const MobileContainer: React.FC<MobileContainerProps> = ({
  children,
  activeTab: _activeTab,
  onTabChange: _onTabChange,
  onOpenSaved,
  onNewKundli,
  onShareOrPrint,
  language,
  onToggleLanguage,
  currentUser,
  onOpenLogin,
  onLogout,
  onGoHome,
  onOpenPanditProfile,
  activeScreen,
}) => {
  const t = TRANSLATIONS[language];
  const [isPhoneFrame, setIsPhoneFrame] = useState(true);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const isGuest = !currentUser || currentUser.isGuest;

  return (
    <div className="min-h-screen bg-[#06080F] text-slate-100 flex flex-col items-center justify-start p-0 sm:p-4 selection:bg-amber-500 selection:text-black">
      {/* Top Desktop Controls Bar (No duplicate logo) */}
      <div className="w-full max-w-md hidden sm:flex items-center justify-between py-1.5 px-2 text-xs text-slate-400">
        <div className="flex items-center gap-1.5">
          <span className="text-amber-400 font-bold tracking-wide">VedicKundli</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPhoneFrame(!isPhoneFrame)}
            className="px-2.5 py-1 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-amber-300 flex items-center gap-1 transition-colors border border-slate-800"
            title="Toggle Frame"
          >
            {isPhoneFrame ? <Monitor size={13} /> : <Smartphone size={13} />}
            <span>{isPhoneFrame ? 'फुल स्क्रीन' : 'मोबाइल दृश्य'}</span>
          </button>
        </div>
      </div>

      {/* Main Mobile Frame */}
      <div
        className={`w-full transition-all duration-300 flex flex-col bg-[#0A0E1A] ${
          isPhoneFrame
            ? 'max-w-[440px] sm:my-3 sm:rounded-[36px] sm:border-[8px] sm:border-[#161D2F] sm:shadow-[0_0_60px_rgba(212,175,55,0.12)] min-h-[92vh] sm:overflow-hidden relative'
            : 'max-w-4xl rounded-2xl border border-slate-800 my-4'
        }`}
      >
        {/* App Header Bar - SINGLE AND ONLY OFFICIAL LOGO */}
        <header className="sticky top-0 z-40 bg-[#0A0E1A]/95 backdrop-blur-md border-b border-amber-500/20 px-3.5 py-2.5">
          <div className="flex items-center justify-between">
            {/* Logo with USER-PROVIDED RED OM IMAGE */}
            <div
              onClick={onGoHome}
              className="flex items-center gap-2.5 cursor-pointer select-none group"
            >
              <div className="app-header-logo-box group-hover:scale-105 transition-transform" style={{ width: '36px', height: '36px', minWidth: '36px', minHeight: '36px' }}>
                <img
                  src="/om_logo.png"
                  alt="VedicKundli Om Logo"
                  className="app-header-logo-img"
                  style={{ width: '26px', height: '26px', maxWidth: '26px', maxHeight: '26px', objectFit: 'contain' }}
                />
              </div>
              <div>
                <h1 className="text-base font-extrabold text-amber-200 font-serif tracking-wide leading-tight">
                  VedicKundli
                </h1>
                <p className="text-[10px] text-amber-300/85 font-medium">
                  मार्गदर्शन: <span className="text-amber-100 font-semibold">पं. संजय चौबे</span>
                </p>
              </div>
            </div>

            {/* Right Header Controls: Language Switch + Contact + Login/Profile */}
            <div className="flex items-center gap-1.5">
              {/* Quick Call Icon Button */}
              <a
                href="tel:+918979838449"
                className="p-1.5 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-400 border border-emerald-500/30 flex items-center justify-center transition-all"
                title="पं. संजय चौबे जी को कॉल करें (+91 89798 38449)"
              >
                <PhoneCall size={13} />
              </a>

              {/* Language Switcher */}
              <button
                onClick={onToggleLanguage}
                className="px-2 py-1 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-amber-300 text-[11px] font-bold border border-amber-500/25 flex items-center gap-1 transition-all"
                title="भाषा बदलें (Switch Language)"
              >
                <Globe size={12} className="text-amber-400" />
                <span>{language === 'hi' ? 'ENG' : 'हिन्दी'}</span>
              </button>

              {/* Login / Profile */}
              {isGuest ? (
                <button
                  onClick={onOpenLogin}
                  className="px-2.5 py-1 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 text-xs font-bold shadow-md shadow-amber-500/20 flex items-center gap-1 transition-all active:scale-95"
                >
                  <LogIn size={13} />
                  <span>{t.loginBtn}</span>
                </button>
              ) : (
                <div className="relative">
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center gap-1.5 py-1 px-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-amber-500/30 transition-all text-xs font-semibold text-amber-200"
                  >
                    <div className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-bold flex items-center justify-center text-[10px]">
                      {currentUser?.name ? currentUser.name.charAt(0) : 'U'}
                    </div>
                    <span className="max-w-[70px] truncate text-[11px]">
                      {currentUser?.name || 'User'}
                    </span>
                  </button>

                  {/* Profile Dropdown */}
                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-52 bg-[#0F1424] border border-amber-500/30 rounded-2xl shadow-2xl p-3 z-50 text-xs space-y-2.5">
                      <div className="border-b border-slate-800 pb-2">
                        <div className="font-bold text-amber-100">{currentUser?.name}</div>
                        <div className="text-[10px] text-slate-400 truncate">
                          {currentUser?.email || 'Logged in user'}
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setShowProfileMenu(false);
                          onLogout();
                        }}
                        className="w-full py-1.5 px-3 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 font-semibold flex items-center gap-2 transition-colors text-left"
                      >
                        <LogOut size={13} />
                        <span>{t.logoutBtn}</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Scrollable Main Content */}
        <main className="flex-1 p-3.5 sm:p-4 overflow-y-auto">{children}</main>

        {/* Bottom Navigation Bar */}
        {activeScreen !== 'login' && (
          <footer className="sticky bottom-0 z-30 bg-[#0A0E1A]/96 backdrop-blur-md border-t border-amber-500/20 px-3 py-2 flex items-center justify-around text-xs">
            <button
              onClick={onGoHome}
              className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition-all ${
                activeScreen === 'home' ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Home size={17} />
              <span className="text-[10px]">मुख्य पृष्ठ</span>
            </button>

            <button
              onClick={onOpenSaved}
              className="flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl text-slate-400 hover:text-amber-300 transition-all"
            >
              <Bookmark size={17} />
              <span className="text-[10px]">सुरक्षित</span>
            </button>

            <button
              onClick={onNewKundli}
              className="flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl text-slate-400 hover:text-amber-300 transition-all"
            >
              <PlusCircle size={17} />
              <span className="text-[10px]">नई कुंडली</span>
            </button>

            {onOpenPanditProfile && (
              <button
                onClick={onOpenPanditProfile}
                className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition-all ${
                  activeScreen === 'pandit_profile' ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Award size={17} />
                <span className="text-[10px]">पंडित जी</span>
              </button>
            )}

            <button
              onClick={onShareOrPrint}
              className="flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl text-slate-400 hover:text-amber-300 transition-all"
            >
              <Share2 size={17} />
              <span className="text-[10px]">शेयर</span>
            </button>
          </footer>
        )}
      </div>

      {/* Footer Branding */}
      <footer className="py-2 text-center text-[11px] text-slate-500">
        वैदिक ज्योतिष अनुसंधान एवं परामर्श संस्थान • पं. संजय चौबे (+91 89798 38449)
      </footer>
    </div>
  );
};
