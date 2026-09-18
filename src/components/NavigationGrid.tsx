import React from 'react';

export type ActionTab = 'graha' | 'dasha' | 'phaladesh' | 'kp' | 'shodashvarga' | 'lalkitab';

interface NavigationGridProps {
  activeTab: ActionTab;
  onSelectTab: (tab: ActionTab) => void;
}

export const NavigationGrid: React.FC<NavigationGridProps> = ({ activeTab, onSelectTab }) => {
  const buttons: { id: ActionTab; label: string }[] = [
    { id: 'graha', label: 'ग्रह' },
    { id: 'dasha', label: 'दशा' },
    { id: 'phaladesh', label: 'फलादेश' },
    { id: 'kp', label: 'केपी' },
    { id: 'shodashvarga', label: 'षोडशवर्ग' },
    { id: 'lalkitab', label: 'लाल किताब' },
  ];

  return (
    <div className="w-full max-w-[430px] mx-auto bg-[#181A1B] p-3 select-none">
      <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
        {buttons.map((btn) => {
          const isActive = activeTab === btn.id;
          return (
            <button
              key={btn.id}
              onClick={() => onSelectTab(btn.id)}
              className={`py-2.5 px-2 rounded-xl text-xs sm:text-sm font-semibold tracking-wide transition-all border ${
                isActive
                  ? 'bg-[#C05621] text-white border-[#ED8936] shadow-lg shadow-orange-950/40 font-bold scale-[1.02]'
                  : 'bg-[#181A1B] text-slate-200 border-[#C05621]/90 hover:border-[#ED8936] hover:bg-slate-900'
              }`}
            >
              {btn.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
