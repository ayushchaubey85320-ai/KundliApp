import React from 'react';
import { TRANSLATIONS, Language } from '../i18n/translations';
import { PanditProfileCard } from './PanditProfileCard';
import { SavedKundliRecord } from '../services/dbConfig';
import { Sparkles, ChevronRight, Trash2, Calendar, MapPin } from 'lucide-react';

interface HomePageProps {
  language: Language;
  onSelectMakeKundli: () => void;
  onSelectMatchKundli: () => void;
  savedKundlis: SavedKundliRecord[];
  onOpenSavedKundli: (record: SavedKundliRecord) => void;
  onDeleteSavedKundli: (id: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  language,
  onSelectMakeKundli,
  onSelectMatchKundli,
  savedKundlis,
  onOpenSavedKundli,
  onDeleteSavedKundli,
}) => {
  const t = TRANSLATIONS[language];

  return (
    <div className="space-y-5 max-w-[430px] mx-auto py-1">
      {/* Welcome Banner */}
      <div className="text-center space-y-1">
        <h2 className="text-lg sm:text-xl font-bold text-amber-200 font-serif">
          {t.homeTitle}
        </h2>
        <p className="text-xs text-slate-400">
          {t.homeSubtitle}
        </p>
      </div>

      {/* TWO PRIMARY ACTION BUTTONS AS REQUESTED */}
      <div className="space-y-3">
        {/* BUTTON 1: MAKE KUNDLI */}
        <button
          onClick={onSelectMakeKundli}
          className="w-full text-left p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 text-slate-950 shadow-xl shadow-amber-500/25 border border-amber-300 transition-all hover:scale-[1.01] active:scale-[0.98] group relative overflow-hidden"
        >
          {/* Subtle animated background circle */}
          <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-slate-950/15 backdrop-blur-md flex items-center justify-center text-2xl shadow-inner">
                ☸
              </div>
              <div>
                <span className="inline-block text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-slate-950/20 text-slate-950 mb-0.5">
                  विकल्प 1 (Option 1)
                </span>
                <h3 className="text-base sm:text-lg font-black tracking-tight text-slate-950">
                  {t.actionMakeKundliTitle}
                </h3>
                <p className="text-[11px] text-slate-900/90 font-medium line-clamp-1">
                  {t.actionMakeKundliSub}
                </p>
              </div>
            </div>
            <div className="w-9 h-9 rounded-full bg-slate-950/15 flex items-center justify-center text-slate-950 group-hover:translate-x-1 transition-transform">
              <ChevronRight size={20} />
            </div>
          </div>
        </button>

        {/* BUTTON 2: MATCH KUNDALI */}
        <button
          onClick={onSelectMatchKundli}
          className="w-full text-left p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-rose-600 via-pink-600 to-amber-600 text-white shadow-xl shadow-rose-600/25 border border-rose-400/40 transition-all hover:scale-[1.01] active:scale-[0.98] group relative overflow-hidden"
        >
          <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-black/20 backdrop-blur-md flex items-center justify-center text-2xl shadow-inner">
                💞
              </div>
              <div>
                <span className="inline-block text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-black/25 text-rose-100 mb-0.5">
                  विकल्प 2 (Option 2)
                </span>
                <h3 className="text-base sm:text-lg font-black tracking-tight text-white">
                  {t.actionMatchKundliTitle}
                </h3>
                <p className="text-[11px] text-rose-100/90 font-medium line-clamp-1">
                  {t.actionMatchKundliSub}
                </p>
              </div>
            </div>
            <div className="w-9 h-9 rounded-full bg-black/20 flex items-center justify-center text-white group-hover:translate-x-1 transition-transform">
              <ChevronRight size={20} />
            </div>
          </div>
        </button>
      </div>

      {/* PANDIT SANJAY CHAUBEY PROFILE CARD SHOWCASE IN HINDI (UNDER THE BUTTONS) */}
      <div className="space-y-1 pt-1">
        <div className="flex items-center gap-2 px-1">
          <Sparkles size={14} className="text-amber-400" />
          <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">
            मुख्य संरक्षक एवं ज्योतिषाचार्य परिचय
          </h4>
        </div>
        <PanditProfileCard compact={false} />
      </div>

      {/* RECENTLY SAVED KUNDLIS (IF ANY EXIST) */}
      {savedKundlis.length > 0 && (
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold text-amber-300">
              {language === 'hi' ? 'सहेजी गई कुंडलियां' : 'Saved Kundlis'} ({savedKundlis.length})
            </span>
          </div>

          <div className="space-y-2 max-h-56 overflow-y-auto pr-0.5">
            {savedKundlis.map((item) => (
              <div
                key={item.id}
                className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3 flex items-center justify-between hover:border-amber-500/40 transition-colors"
              >
                <div
                  onClick={() => onOpenSavedKundli(item)}
                  className="flex-1 cursor-pointer flex items-center gap-2.5"
                >
                  <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold text-sm">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-amber-100">{item.name}</h5>
                    <div className="text-[10px] text-slate-400 flex items-center gap-2 mt-0.5">
                      <span className="flex items-center gap-1">
                        <Calendar size={10} /> {item.birthDate}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={10} /> {item.cityName.split(',')[0]}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onDeleteSavedKundli(item.id)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                  title="हटाएं"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
