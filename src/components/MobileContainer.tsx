import React, { useState } from 'react';
import { AppUser } from '../services/dbConfig';
import { Language, TRANSLATIONS } from '../i18n/translations';
import {
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
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const isGuest = !currentUser || currentUser.isGuest;

  return (
    <div className="min-h-screen bg-[#06080F] text-slate-100 flex flex-col items-center justify-start w-full selection:bg-amber-500 selection:text-black" style={{ width: '100%', minHeight: '100vh' }}>
      {/* Main Container: Native full-screen on mobile devices, centered on desktop */}
      <div className="w-full max-w-md min-h-screen flex flex-col bg-[#0A0E1A] shadow-2xl relative" style={{ width: '100%', maxWidth: '448px', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* App Header Bar - STRICT 100% FULL WIDTH WITH SPACE-BETWEEN */}
        <header className="app-header-bar" style={{ width: '100%', boxSizing: 'border-box' }}>
          <div className="app-header-content w-full" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', boxSizing: 'border-box' }}>
            {/* Left: Logo with USER-PROVIDED RED OM IMAGE */}
            <div
              onClick={onGoHome}
              style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', userSelect: 'none' }}
              className="group"
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
                <h1 style={{ fontSize: '16px', fontWeight: 800, color: '#FDE68A', fontFamily: 'Cinzel, Georgia, serif', lineHeight: 1.2, margin: 0 }}>
                  VedicKundli
                </h1>
                <p style={{ fontSize: '11px', color: 'rgba(252, 211, 77, 0.85)', fontWeight: 500, margin: 0 }}>
                  मार्गदर्शन: <span style={{ color: '#FEF3C7', fontWeight: 600 }}>पं. संजय चौबे</span>
                </p>
              </div>
            </div>

            {/* Right: Contact + Language Switch + Login/Profile */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {/* Quick Call Icon Button */}
              <a
                href="tel:+918979838449"
                className="p-1.5 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-400 border border-emerald-500/30 flex items-center justify-center transition-all"
                style={{ padding: '6px 8px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                title="पं. संजय चौबे जी को कॉल करें (+91 89798 38449)"
              >
                <PhoneCall size={14} />
              </a>

              {/* Language Switcher */}
              <button
                onClick={onToggleLanguage}
                className="px-2 py-1 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-amber-300 text-[11px] font-bold border border-amber-500/25 flex items-center gap-1 transition-all"
                style={{ padding: '5px 8px', borderRadius: '10px', fontSize: '11.5px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}
                title="भाषा बदलें (Switch Language)"
              >
                <Globe size={13} className="text-amber-400" />
                <span>{language === 'hi' ? 'ENG' : 'हिन्दी'}</span>
              </button>

              {/* Login / Profile */}
              {isGuest ? (
                <button
                  onClick={onOpenLogin}
                  className="px-2.5 py-1 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 text-xs font-bold shadow-md shadow-amber-500/20 flex items-center gap-1 transition-all active:scale-95"
                  style={{ padding: '6px 10px', borderRadius: '10px', fontSize: '12px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '4px', background: 'linear-gradient(135deg, #F59E0B, #EAB308)', color: '#090D17' }}
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

                  {/* Profile Dropdown (100% Solid Opaque Background) */}
                  {showProfileMenu && (
                    <div className="app-profile-dropdown space-y-2.5">
                      <div className="border-b border-slate-700/80 pb-2">
                        <div className="font-bold text-amber-200 text-xs">{currentUser?.name}</div>
                        <div className="text-[11px] text-slate-400 truncate mt-0.5">
                          {currentUser?.email || 'Logged in user'}
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setShowProfileMenu(false);
                          onLogout();
                        }}
                        className="w-full py-2 px-3 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 font-bold flex items-center gap-2 transition-colors text-left text-xs"
                      >
                        <LogOut size={14} />
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
        <main className="flex-1 p-3.5 sm:p-4 overflow-y-auto w-full" style={{ width: '100%', boxSizing: 'border-box' }}>{children}</main>

        {/* Bottom Navigation Bar - MATCHES HEADER 100% FULL WIDTH */}
        {activeScreen !== 'login' && (
          <footer className="bottom-nav-bar" style={{ width: '100%', boxSizing: 'border-box' }}>
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
