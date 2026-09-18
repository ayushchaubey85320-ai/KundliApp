import React, { useState } from 'react';
import { calculateKundli } from '../astrology/kundliEngine';
import { calculateMilan, MilanResult } from '../astrology/milanEngine';
import { BirthDetailsForm, BirthFormData } from './BirthDetailsForm';
import confetti from 'canvas-confetti';
import { Heart, CheckCircle2, AlertTriangle, Sparkles, Award } from 'lucide-react';

export const KundliMilanView: React.FC = () => {
  const [boyData, setBoyData] = useState<BirthFormData>({
    name: 'आयुष (वर)',
    gender: 'Male',
    date: '1996-05-12',
    time: '08:30',
    cityName: 'Varanasi (Kashi)',
    latitude: 25.3176,
    longitude: 82.9739,
    timezoneOffset: 5.5,
  });

  const [girlData, setGirlData] = useState<BirthFormData>({
    name: 'प्रिया (कन्या)',
    gender: 'Female',
    date: '1998-09-20',
    time: '14:15',
    cityName: 'Prayagraj (Allahabad)',
    latitude: 25.4358,
    longitude: 81.8463,
    timezoneOffset: 5.5,
  });

  const [activeTab, setActiveTab] = useState<'boy' | 'girl' | 'result'>('result');
  const [milanResult, setMilanResult] = useState<MilanResult | null>(() => {
    const boyK = calculateKundli(
      boyData.name,
      boyData.gender,
      boyData.date,
      boyData.time,
      boyData.cityName,
      boyData.latitude,
      boyData.longitude,
      boyData.timezoneOffset
    );
    const girlK = calculateKundli(
      girlData.name,
      girlData.gender,
      girlData.date,
      girlData.time,
      girlData.cityName,
      girlData.latitude,
      girlData.longitude,
      girlData.timezoneOffset
    );
    return calculateMilan(boyK, girlK);
  });

  const handleComputeMilan = () => {
    const boyK = calculateKundli(
      boyData.name,
      boyData.gender,
      boyData.date,
      boyData.time,
      boyData.cityName,
      boyData.latitude,
      boyData.longitude,
      boyData.timezoneOffset
    );
    const girlK = calculateKundli(
      girlData.name,
      girlData.gender,
      girlData.date,
      girlData.time,
      girlData.cityName,
      girlData.latitude,
      girlData.longitude,
      girlData.timezoneOffset
    );
    const res = calculateMilan(boyK, girlK);
    setMilanResult(res);
    setActiveTab('result');

    if (res.isAuspicious) {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#F59E0B', '#FCD34D', '#EF4444', '#10B981'],
      });
    }
  };

  return (
    <div className="space-y-4">
      {/* Top Toggle Switch between Boy Form, Girl Form, and Result */}
      <div className="flex bg-slate-900/90 p-1 rounded-xl border border-slate-800">
        <button
          onClick={() => setActiveTab('result')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
            activeTab === 'result'
              ? 'bg-amber-500 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          अष्टकूट मिलान परिणाम
        </button>
        <button
          onClick={() => setActiveTab('boy')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
            activeTab === 'boy'
              ? 'bg-amber-500 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          वर विवरण (Boy)
        </button>
        <button
          onClick={() => setActiveTab('girl')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
            activeTab === 'girl'
              ? 'bg-amber-500 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          कन्या विवरण (Girl)
        </button>
      </div>

      {activeTab === 'boy' && (
        <BirthDetailsForm
          initialData={boyData}
          onSubmit={(data) => {
            setBoyData(data);
            handleComputeMilan();
          }}
          formTitle="वर (Boy) का जन्म विवरण"
          submitLabel="वर विवरण सुरक्षित करें एवं मिलान देखें"
        />
      )}

      {activeTab === 'girl' && (
        <BirthDetailsForm
          initialData={girlData}
          onSubmit={(data) => {
            setGirlData(data);
            handleComputeMilan();
          }}
          formTitle="कन्या (Girl) का जन्म विवरण"
          submitLabel="कन्या विवरण सुरक्षित करें एवं मिलान देखें"
        />
      )}

      {activeTab === 'result' && milanResult && (
        <div className="space-y-4">
          {/* Main Score Banner */}
          <div className="bg-gradient-to-b from-[#162032] to-[#0D1322] border border-amber-500/40 rounded-2xl p-5 shadow-2xl text-center relative overflow-hidden">
            <div className="flex items-center justify-between text-xs text-slate-300 mb-2 px-2">
              <span className="font-semibold text-amber-200">वर: {boyData.name}</span>
              <Heart className="text-red-400 fill-red-400 animate-pulse" size={16} />
              <span className="font-semibold text-amber-200">कन्या: {girlData.name}</span>
            </div>

            {/* Score Ring */}
            <div className="my-3 inline-flex flex-col items-center justify-center">
              <div className="w-24 h-24 rounded-full border-4 border-amber-400 flex flex-col items-center justify-center bg-slate-950/60 shadow-xl shadow-amber-500/20">
                <span className="text-3xl font-extrabold text-amber-300 font-serif">
                  {milanResult.totalPoints}
                </span>
                <span className="text-[10px] text-slate-400 font-medium">/ 36 गुण</span>
              </div>
              <span
                className={`mt-2 text-xs font-bold px-3 py-1 rounded-full ${
                  milanResult.totalPoints >= 18
                    ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                    : 'bg-red-500/20 text-red-300 border border-red-500/30'
                }`}
              >
                {milanResult.verdictEn} ({milanResult.percentage}%)
              </span>
            </div>

            <p className="text-xs text-amber-100/90 max-w-sm mx-auto leading-relaxed mt-1">
              {milanResult.verdictHi}
            </p>

            <button
              onClick={handleComputeMilan}
              className="mt-3 text-xs text-amber-300 hover:text-amber-200 underline flex items-center justify-center gap-1 mx-auto"
            >
              <Sparkles size={12} /> पुनः गणना करें
            </button>
          </div>

          {/* 8 Kootas Detailed Table */}
          <div className="bg-[#101726]/90 border border-amber-500/30 rounded-2xl p-4 shadow-2xl backdrop-blur-md">
            <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Award size={14} className="text-amber-400" /> अष्टकूट विस्तृत अंक तालिका (Ashtakoot Breakdown)
            </h4>

            <div className="space-y-2">
              {Object.entries(milanResult.kootas).map(([key, koota]) => {
                return (
                  <div
                    key={key}
                    className={`p-2.5 rounded-xl border flex items-center justify-between text-xs ${
                      koota.isDosha
                        ? 'bg-red-950/20 border-red-500/30'
                        : 'bg-slate-900/60 border-slate-800'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-slate-200">{koota.nameHi}</span>
                        {koota.isDosha && (
                          <AlertTriangle size={12} className="text-red-400" />
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400 block mt-0.5">
                        {koota.descriptionHi}
                      </span>
                    </div>

                    <div className="text-right pl-3">
                      <span
                        className={`text-xs font-bold px-2 py-0.5 rounded ${
                          koota.obtainedPoints === koota.maxPoints
                            ? 'bg-green-500/20 text-green-300'
                            : koota.obtainedPoints > 0
                            ? 'bg-amber-500/20 text-amber-300'
                            : 'bg-red-500/20 text-red-300'
                        }`}
                      >
                        {koota.obtainedPoints} / {koota.maxPoints}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Special Notes & Remedial Advice */}
            {milanResult.specialNotesHi.length > 0 && (
              <div className="mt-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs">
                <span className="text-amber-300 font-semibold block mb-1 flex items-center gap-1">
                  <CheckCircle2 size={13} /> विशेष शास्त्रीय निर्देश (Guidance):
                </span>
                <ul className="space-y-1 text-slate-300">
                  {milanResult.specialNotesHi.map((note, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-amber-400 mt-0.5">•</span>
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
