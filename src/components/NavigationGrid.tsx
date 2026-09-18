import React from 'react';

export type ActionTab = 'graha' | 'dasha' | 'phaladesh' | 'kp' | 'shodashvarga' | 'lalkitab';

interface NavigationGridProps {
  activeTab: ActionTab;
  onSelectTab: (tab: ActionTab) => void;
}

export const NavigationGrid: React.FC<NavigationGridProps> = ({ activeTab, onSelectTab }) => {
  const buttons: { id: ActionTab; label: string; icon: string }[] = [
    { id: 'graha', label: 'ग्रह', icon: '☉' },
    { id: 'dasha', label: 'दशा', icon: '⏳' },
    { id: 'phaladesh', label: 'फलादेश', icon: '📜' },
    { id: 'kp', label: 'केपी', icon: '📐' },
    { id: 'shodashvarga', label: 'षोडशवर्ग', icon: '☸' },
    { id: 'lalkitab', label: 'लाल किताब', icon: '📖' },
  ];

  return (
    <div className="w-full max-w-[430px] mx-auto py-2 select-none">
      <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
        {buttons.map((btn) => {
          const isActive = activeTab === btn.id;
          return (
            <button
              key={btn.id}
              onClick={() => onSelectTab(btn.id)}
              className={`nav-action-btn ${isActive ? 'active' : ''}`}
            >
              <span className="mr-1 opacity-80 text-xs">{btn.icon}</span>
              <span>{btn.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
