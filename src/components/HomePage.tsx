import React from 'react';
import { SavedKundliRecord } from '../services/dbConfig';
import { ChevronRight, Trash2, Calendar, MapPin, Award, ArrowRight } from 'lucide-react';

interface HomePageProps {
  onSelectMakeKundli: () => void;
  onSelectMatchKundli: () => void;
  onOpenPanditProfile: () => void;
  savedKundlis: SavedKundliRecord[];
  onOpenSavedKundli: (record: SavedKundliRecord) => void;
  onDeleteSavedKundli: (id: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onSelectMakeKundli,
  onSelectMatchKundli,
  onOpenPanditProfile,
  savedKundlis,
  onOpenSavedKundli,
  onDeleteSavedKundli,
}) => {
  return (
    <div className="space-y-4 max-w-[430px] mx-auto py-1">
      {/* Serene App Title Banner */}
      <div className="text-center space-y-1 py-1">
        <h2 className="text-lg font-bold text-amber-200 font-serif tracking-wide">
          वैदिक ज्योतिष अनुसंधान संस्थान
        </h2>
        <p className="text-xs text-slate-400">
          प्राचीन पराशर एवं जातक पारिजात पद्धति पर आधारित सटीक गणना
        </p>
      </div>

      {/* TWO PRIMARY ACTION CARDS (Using dedicated .action-card-kundli and .action-card-milan) */}
      <div className="space-y-3">
        {/* CARD 1: MAKE KUNDLI */}
        <button
          onClick={onSelectMakeKundli}
          className="action-card-kundli group"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-2xl text-amber-300 shrink-0">
              ☸
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-extrabold tracking-tight text-amber-100">
                जन्म कुंडली (Janam Kundli)
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                सटीक जन्मपत्री, ग्रह स्थिति, महादशा एवं सम्पूर्ण फलादेश
              </p>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-slate-900 text-amber-300 flex items-center justify-center shrink-0">
            <ChevronRight size={18} />
          </div>
        </button>

        {/* CARD 2: MATCH KUNDALI */}
        <button
          onClick={onSelectMatchKundli}
          className="action-card-milan group"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-2xl text-rose-300 shrink-0">
              💞
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-extrabold tracking-tight text-rose-100">
                कुंडली मिलान (Kundli Milan)
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                36 गुण अष्टकूट मिलान, नाड़ी व भकूट दोष परीक्षण
              </p>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-slate-900 text-rose-300 flex items-center justify-center shrink-0">
            <ChevronRight size={18} />
          </div>
        </button>
      </div>

      {/* DEDICATED BUTTON FOR PANDIT SANJAY CHAUBEY PROFILE (Using .action-card-pandit) */}
      <div className="pt-1">
        <button
          onClick={onOpenPanditProfile}
          className="action-card-pandit group"
        >
          <div className="flex items-center gap-3">
            <div className="pandit-badge-om-box" style={{ width: '40px', height: '40px', minWidth: '40px', minHeight: '40px' }}>
              <img
                src="/om_logo.png"
                alt="Om"
                className="pandit-badge-om-img"
                style={{ width: '28px', height: '28px', maxWidth: '28px', maxHeight: '28px', objectFit: 'contain' }}
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <Award size={13} className="text-amber-400" />
                <h4 className="text-sm font-bold text-amber-200">
                  पूज्य पं. संजय चौबे जी का परिचय
                </h4>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                30+ वर्षों का वैदिक ज्योतिष व वास्तु अनुभव • पूर्ण विवरण देखें
              </p>
            </div>
          </div>
          <div className="text-amber-400 shrink-0">
            <ArrowRight size={16} />
          </div>
        </button>
      </div>

      {/* RECENTLY SAVED KUNDLIS (IF ANY EXIST) */}
      {savedKundlis.length > 0 && (
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold text-amber-300">
              सहेजी गई कुंडलियां ({savedKundlis.length})
            </span>
          </div>

          <div className="space-y-2 max-h-56 overflow-y-auto pr-0.5">
            {savedKundlis.map((item) => (
              <div
                key={item.id}
                className="bg-[#0F1424] border border-slate-800 rounded-2xl p-3 flex items-center justify-between hover:border-amber-500/40 transition-colors"
              >
                <div
                  onClick={() => onOpenSavedKundli(item)}
                  className="flex-1 cursor-pointer flex items-center gap-2.5"
                >
                  <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold text-xs">
                    {item.name ? item.name.charAt(0) : 'कु'}
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-amber-100">{item.name}</h5>
                    <div className="text-[10px] text-slate-400 flex items-center gap-2 mt-0.5">
                      <span className="flex items-center gap-1">
                        <Calendar size={10} /> {item.birthDate}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={10} /> {item.cityName ? item.cityName.split(',')[0] : ''}
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
