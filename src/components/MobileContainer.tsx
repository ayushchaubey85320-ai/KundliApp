import React, { useState } from 'react';
import { Smartphone, Monitor, Bookmark, PlusCircle, Share2 } from 'lucide-react';

interface MobileContainerProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tabId: string) => void;
  onOpenSaved: () => void;
  onNewKundli: () => void;
  onShareOrPrint: () => void;
}

export const MobileContainer: React.FC<MobileContainerProps> = ({
  children,
  activeTab,
  onTabChange,
  onOpenSaved,
  onNewKundli,
  onShareOrPrint,
}) => {
  const [isPhoneFrame, setIsPhoneFrame] = useState(true);

  const navItems = [
    { id: 'chart', label: 'कुंडली', subLabel: 'D1/D9', icon: '☸' },
    { id: 'planets', label: 'ग्रह स्थिति', subLabel: 'Planets', icon: '☉' },
    { id: 'dasha', label: 'महादशा', subLabel: 'Dasha', icon: '⏳' },
    { id: 'doshas', label: 'दोष विचार', subLabel: 'Doshas', icon: '🔥' },
    { id: 'milan', label: 'गुण मिलान', subLabel: 'Milan', icon: '💖' },
  ];

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 flex flex-col items-center justify-start p-0 sm:p-4 selection:bg-amber-500 selection:text-black">
      {/* Top Desktop Controls bar */}
      <div className="w-full max-w-md hidden sm:flex items-center justify-between py-2 px-1 text-xs text-slate-400">
        <div className="flex items-center gap-1.5">
          <span className="text-amber-400 font-bold">🕉️ VedicKundli Mobile App</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPhoneFrame(!isPhoneFrame)}
            className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-amber-300 flex items-center gap-1 transition-colors"
            title="Toggle Phone Frame"
          >
            {isPhoneFrame ? <Monitor size={13} /> : <Smartphone size={13} />}
            <span>{isPhoneFrame ? 'फुल स्क्रीन' : 'मोबाइल दृश्य'}</span>
          </button>
        </div>
      </div>

      {/* Main Container / Mobile Frame */}
      <div
        className={`w-full transition-all duration-300 flex flex-col bg-[#0B0E17] ${
          isPhoneFrame
            ? 'max-w-[440px] sm:my-3 sm:rounded-[36px] sm:border-[8px] sm:border-[#1E293B] sm:shadow-[0_0_50px_rgba(245,158,11,0.12)] min-h-[92vh] sm:overflow-hidden relative'
            : 'max-w-4xl rounded-2xl border border-slate-800 my-4'
        }`}
      >
        {/* App Header */}
        <header className="sticky top-0 z-40 bg-[#0D121F]/95 backdrop-blur-md border-b border-amber-500/20 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-lg font-bold text-slate-950 shadow-md shadow-amber-500/30">
                🕉️
              </div>
              <div>
                <h1 className="text-base font-extrabold text-amber-300 font-serif tracking-wide leading-tight">
                  VedicKundli
                </h1>
                <p className="text-[11px] text-amber-200/80 font-medium">
                  मार्गदर्शन: <span className="text-amber-100 font-semibold">पं. संजय चौबे</span>
                </p>
              </div>
            </div>

            {/* Quick Action Icons */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={onOpenSaved}
                className="p-2 rounded-xl bg-slate-800/80 hover:bg-amber-500/20 text-amber-300 border border-slate-700/60 transition-colors"
                title="सुरक्षित कुंडलियां"
              >
                <Bookmark size={16} />
              </button>
              <button
                onClick={onNewKundli}
                className="p-2 rounded-xl bg-slate-800/80 hover:bg-amber-500/20 text-amber-300 border border-slate-700/60 transition-colors"
                title="नई कुंडली"
              >
                <PlusCircle size={16} />
              </button>
              <button
                onClick={onShareOrPrint}
                className="p-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-colors shadow-md shadow-amber-500/20"
                title="प्रिंट या शेयर करें"
              >
                <Share2 size={16} />
              </button>
            </div>
          </div>
        </header>

        {/* Scrollable Main Body */}
        <main className="flex-1 p-3.5 pb-24 overflow-y-auto">{children}</main>

        {/* Bottom Navigation Bar */}
        <nav className="sticky bottom-0 z-40 bg-[#0A0D15]/95 backdrop-blur-lg border-t border-amber-500/20 px-2 py-1.5 flex items-center justify-around">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`flex-1 py-1.5 px-1 rounded-xl flex flex-col items-center justify-center transition-all ${
                  isActive
                    ? 'text-amber-300 font-bold scale-105'
                    : 'text-slate-400 hover:text-slate-200 font-medium opacity-80'
                }`}
              >
                <span className={`text-base leading-none mb-1 ${isActive ? 'text-amber-400' : ''}`}>
                  {item.icon}
                </span>
                <span className="text-[10px] leading-tight">{item.label}</span>
                <span className="text-[8.5px] text-slate-400 opacity-60 leading-none">
                  {item.subLabel}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Branding */}
      <footer className="py-2 text-center text-xs text-slate-400">
        वैदिक ज्योतिष अनुसंधान एवं परामर्श संस्थान • पं. संजय चौबे
      </footer>
    </div>
  );
};
