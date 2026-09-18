import React from 'react';

export type ActionTab = 'graha' | 'dasha' | 'phaladesh' | 'kp' | 'shodashvarga' | 'lalkitab';

interface NavigationGridProps {
  activeTab: ActionTab | null;
  onSelectTab: (tab: ActionTab) => void;
}

export const NavigationGrid: React.FC<NavigationGridProps> = ({ activeTab, onSelectTab }) => {
  const buttons: { id: ActionTab; label: string; subLabel: string; icon: string }[] = [
    { id: 'graha', label: 'ग्रह स्थिति', subLabel: 'Planets', icon: '☉' },
    { id: 'dasha', label: 'विंशोत्तरी दशा', subLabel: 'Dasha', icon: '⏳' },
    { id: 'phaladesh', label: 'फलादेश व योग', subLabel: 'Yogas', icon: '📜' },
    { id: 'kp', label: 'के.पी. पद्धति', subLabel: 'KP System', icon: '📐' },
    { id: 'shodashvarga', label: 'षोडशवर्ग', subLabel: 'D1 - D16', icon: '☸' },
    { id: 'lalkitab', label: 'दोष विचार', subLabel: 'Doshas', icon: '🔥' },
  ];

  return (
    <div className="w-full max-w-[430px] mx-auto py-2.5 select-none">
      <div className="grid grid-cols-3 gap-2">
        {buttons.map((btn) => {
          const isActive = activeTab === btn.id;
          return (
            <button
              key={btn.id}
              onClick={() => onSelectTab(btn.id)}
              className={`p-2 rounded-2xl border transition-all text-center flex flex-col items-center justify-center gap-0.5 ${
                isActive
                  ? 'bg-amber-500/15 border-amber-400 text-amber-300 shadow-[0_0_15px_rgba(212,175,55,0.2)]'
                  : 'bg-[#0E1424] border-slate-800/80 text-slate-300 hover:border-amber-500/30 hover:bg-[#131A2E]'
              }`}
            >
              <span className="text-sm opacity-90">{btn.icon}</span>
              <span className="text-xs font-bold leading-tight">{btn.label}</span>
              <span className="text-[9px] text-slate-500">{btn.subLabel}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
