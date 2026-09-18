import React from 'react';
import { BirthFormData } from './BirthDetailsForm';
import { X, Trash2, UserCheck, PlusCircle } from 'lucide-react';

interface SavedProfilesModalProps {
  savedProfiles: BirthFormData[];
  onSelectProfile: (profile: BirthFormData) => void;
  onDeleteProfile: (index: number) => void;
  onClose: () => void;
  onNewProfile: () => void;
}

export const SavedProfilesModal: React.FC<SavedProfilesModalProps> = ({
  savedProfiles,
  onSelectProfile,
  onDeleteProfile,
  onClose,
  onNewProfile,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-0 sm:p-4">
      <div className="w-full sm:max-w-md bg-[#101726] border border-amber-500/30 rounded-t-3xl sm:rounded-2xl p-5 shadow-2xl animate-in fade-in slide-in-from-bottom-6 duration-200">
        <div className="flex items-center justify-between pb-3 border-b border-amber-500/20">
          <div>
            <h3 className="text-base font-bold text-amber-200 font-serif">सुरक्षित कुंडलियां (Saved Profiles)</h3>
            <p className="text-xs text-slate-400">परिवार एवं यजमानों की पूर्व सुरक्षित कुंडलियां</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full bg-slate-800 text-slate-400 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-4 max-h-[60vh] overflow-y-auto space-y-2.5">
          {savedProfiles.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-400">
              कोई सुरक्षित कुंडली नहीं मिली। नई कुंडली बनाकर सुरक्षित करें।
            </div>
          ) : (
            savedProfiles.map((p, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between hover:border-amber-500/40 transition-colors"
              >
                <div
                  className="flex-1 cursor-pointer"
                  onClick={() => {
                    onSelectProfile(p);
                    onClose();
                  }}
                >
                  <div className="flex items-center gap-2">
                    <UserCheck size={14} className="text-amber-400" />
                    <span className="text-sm font-bold text-amber-200">{p.name}</span>
                    <span className="text-[10px] text-slate-400">({p.gender === 'Male' ? 'पुरुष' : 'स्त्री'})</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    {p.date} • {p.time} | {p.cityName}
                  </div>
                </div>

                <button
                  onClick={() => onDeleteProfile(idx)}
                  className="p-2 text-slate-500 hover:text-red-400 transition-colors"
                  title="हटाएं"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))
          )}
        </div>

        <div className="mt-4 pt-3 border-t border-slate-800">
          <button
            onClick={() => {
              onNewProfile();
              onClose();
            }}
            className="w-full py-2.5 px-3 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <PlusCircle size={14} /> नई जन्म कुंडली बनाएं
          </button>
        </div>
      </div>
    </div>
  );
};
