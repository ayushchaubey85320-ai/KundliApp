import React, { useState } from 'react';
import { calculateKundli } from '../astrology/kundliEngine';
import { calculateMilan, MilanResult } from '../astrology/milanEngine';
import { BirthDetailsForm, BirthFormData } from './BirthDetailsForm';
import { PanditProfileCard } from './PanditProfileCard';
import { Language, TRANSLATIONS } from '../i18n/translations';
import { dbService } from '../services/dbService';
import confetti from 'canvas-confetti';
import {
  Heart,
  CheckCircle2,
  Sparkles,
  Award,
  ShieldAlert,
  ArrowLeft,
} from 'lucide-react';

interface KundliMilanViewProps {
  language?: Language;
  onBackToHome?: () => void;
}

export const KundliMilanView: React.FC<KundliMilanViewProps> = ({
  language = 'hi',
  onBackToHome,
}) => {
  const t = TRANSLATIONS[language];

  // Groom (वर) and Bride (कन्या) states - clean default values
  const [boyData, setBoyData] = useState<BirthFormData | null>(null);
  const [girlData, setGirlData] = useState<BirthFormData | null>(null);

  // Tab state: 'boy' | 'girl' | 'result'
  const [currentStep, setCurrentStep] = useState<'boy' | 'girl' | 'result'>('boy');
  const [milanResult, setMilanResult] = useState<MilanResult | null>(null);

  // When groom form submitted
  const handleBoySubmit = (data: BirthFormData) => {
    setBoyData(data);
    setCurrentStep('girl');
  };

  // When bride form submitted
  const handleGirlSubmit = (data: BirthFormData) => {
    setGirlData(data);
    if (boyData) {
      computeMilanResult(boyData, data);
    }
  };

  const computeMilanResult = (boy: BirthFormData, girl: BirthFormData) => {
    const boyK = calculateKundli(
      boy.name,
      boy.gender,
      boy.date,
      boy.time,
      boy.cityName,
      boy.latitude,
      boy.longitude,
      boy.timezoneOffset
    );

    const girlK = calculateKundli(
      girl.name,
      girl.gender,
      girl.date,
      girl.time,
      girl.cityName,
      girl.latitude,
      girl.longitude,
      girl.timezoneOffset
    );

    const res = calculateMilan(boyK, girlK);
    setMilanResult(res);
    setCurrentStep('result');

    // Save match to database service
    dbService.saveMatch({
      maleName: boy.name,
      maleDate: boy.date,
      femaleName: girl.name,
      femaleDate: girl.date,
      totalScore: res.totalPoints,
      maxScore: 36,
      resultDetails: res,
    });

    if (res.isAuspicious) {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#F59E0B', '#FCD34D', '#EF4444', '#10B981'],
      });
    }
  };

  // Koota metadata descriptions in Hindi and English
  const KOOTA_INFO = [
    {
      key: 'varna',
      nameHi: 'वर्ण (कार्य स्वभाव व अहंकार)',
      nameEn: 'Varna (Spiritual & Work Compatibility)',
      max: 1,
      purposeHi: 'वर और कन्या के मानसिक अहंकार एवं सामाजिक कार्य स्वभाव का सामंजस्य।',
      purposeEn: 'Mental ego, spiritual inclination, and occupational nature harmony.',
    },
    {
      key: 'vashya',
      nameHi: 'वश्य (परस्पर आकर्षण एवं समर्पण)',
      nameEn: 'Vashya (Mutual Attraction & Control)',
      max: 2,
      purposeHi: 'दांपत्य में आपसी आकर्षण, निष्ठा एवं एक-दूसरे के प्रति समर्पण भाव।',
      purposeEn: 'Mutual affection, emotional control, and natural bonding.',
    },
    {
      key: 'tara',
      nameHi: 'तारा (भाग्य, स्वास्थ्य एवं आयु)',
      nameEn: 'Tara (Destiny, Health & Longevity)',
      max: 3,
      purposeHi: 'दोनों के जन्मनक्षत्रों के मध्य अनुकूलता तथा स्वास्थ्य व सौभाग्य।',
      purposeEn: 'Birth constellation alignment for mutual fortune and physical well-being.',
    },
    {
      key: 'yoni',
      nameHi: 'योनि (जैविक आकर्षण एवं अनुकूलता)',
      nameEn: 'Yoni (Biological Affinity & Harmony)',
      max: 4,
      purposeHi: 'शारीरिक आकर्षण, अंतरंगता एवं जैविक तालमेल का परिचायक।',
      purposeEn: 'Biological affinity, intimacy, and sexual compatibility.',
    },
    {
      key: 'grahaMaitri',
      nameHi: 'ग्रह मैत्री (मानसिक एवं बौद्धिक सामंजस्य)',
      nameEn: 'Graha Maitri (Mental & Intellectual Rapport)',
      max: 5,
      purposeHi: 'राशि स्वामियों के मध्य मित्रता, जिससे विचारों में समानता बनी रहे।',
      purposeEn: 'Friendship between Moon sign lords for intellectual and emotional rapport.',
    },
    {
      key: 'gana',
      nameHi: 'गण (स्वभाव एवं दृष्टिकोण - देव/मनुष्य/राक्षस)',
      nameEn: 'Gana (Temperament - Deva, Manushya, Rakshasa)',
      max: 6,
      purposeHi: 'मूल स्वभाव, जीवन शैली, व्यवहार एवं दृष्टिकोण की समानता।',
      purposeEn: 'Innate behavior, lifestyle temperament, and mutual expectations.',
    },
    {
      key: 'bhakoot',
      nameHi: 'भकूट (पारिवारिक समृद्धि, वंश व दीर्घायु)',
      nameEn: 'Bhakoot (Family Prosperity & Longevity)',
      max: 7,
      purposeHi: 'गृहस्थ जीवन में सुख, संतान सुख, आर्थिक उन्नति एवं दीर्घायु।',
      purposeEn: 'Family growth, financial prosperity, and marital longevity.',
    },
    {
      key: 'nadi',
      nameHi: 'नाड़ी (अनुवांशिकी, रक्त समूह व संतति स्वास्थ्य)',
      nameEn: 'Nadi (Genetics, Progeny & Health Compatibility)',
      max: 8,
      purposeHi: 'शारीरिक ऊर्जा, आनुवांशिक समानता तथा भविष्य की संतान का उत्तम स्वास्थ्य।',
      purposeEn: 'Genetic and biological energies ensuring healthy offspring and longevity.',
    },
  ];

  return (
    <div className="space-y-4 max-w-[440px] mx-auto pb-6">
      {/* Back to Home if provided */}
      {onBackToHome && (
        <button
          onClick={onBackToHome}
          className="py-1.5 px-3 rounded-xl bg-slate-800 text-amber-300 border border-slate-700 text-xs flex items-center gap-1.5 hover:bg-slate-700 transition-colors"
        >
          <ArrowLeft size={14} /> मुख्य पृष्ठ पर वापस लौटें (Home)
        </button>
      )}

      {/* Top Banner */}
      <div className="bg-[#121727] p-4 rounded-3xl border border-amber-500/30 text-center space-y-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 text-[11px] font-bold">
          <Heart size={13} className="text-rose-400 fill-rose-400" />
          <span>{t.milanTitle}</span>
        </div>
        <p className="text-xs text-slate-300 pt-1">
          {t.milanSubtitle}
        </p>
      </div>

      {/* STEP INDICATOR TABS */}
      <div className="grid grid-cols-3 gap-1.5 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 text-xs font-semibold">
        <button
          onClick={() => setCurrentStep('boy')}
          className={`py-2 px-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            currentStep === 'boy'
              ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <span>१. वर विवरण</span>
          {boyData && <CheckCircle2 size={12} className="text-slate-950" />}
        </button>

        <button
          onClick={() => setCurrentStep('girl')}
          className={`py-2 px-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            currentStep === 'girl'
              ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <span>२. कन्या विवरण</span>
          {girlData && <CheckCircle2 size={12} className="text-slate-950" />}
        </button>

        <button
          onClick={() => {
            if (boyData && girlData) setCurrentStep('result');
            else alert(language === 'hi' ? 'कृपया पहले वर एवं कन्या दोनों का विवरण भरें।' : 'Please enter both Groom and Bride details first.');
          }}
          className={`py-2 px-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            currentStep === 'result'
              ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <span>३. परिणाम (36 गुण)</span>
          {milanResult && <Sparkles size={12} className="text-slate-950" />}
        </button>
      </div>

      {/* STEP 1: GROOM FORM */}
      {currentStep === 'boy' && (
        <div className="space-y-3">
          <BirthDetailsForm
            initialData={
              boyData || {
                name: '',
                gender: 'Male',
                date: '1998-05-15',
                time: '08:30',
                cityName: 'Varanasi, Uttar Pradesh',
                latitude: 25.3176,
                longitude: 82.9739,
                timezoneOffset: 5.5,
              }
            }
            onSubmit={handleBoySubmit}
            formTitle="१. वर (Groom) का जन्म विवरण"
            submitLabel="सुरक्षित करें एवं कन्या का विवरण भरें ➔"
          />
        </div>
      )}

      {/* STEP 2: BRIDE FORM */}
      {currentStep === 'girl' && (
        <div className="space-y-3">
          <BirthDetailsForm
            initialData={
              girlData || {
                name: '',
                gender: 'Female',
                date: '2000-08-20',
                time: '14:15',
                cityName: 'Prayagraj, Uttar Pradesh',
                latitude: 25.4358,
                longitude: 81.8463,
                timezoneOffset: 5.5,
              }
            }
            onSubmit={handleGirlSubmit}
            formTitle="२. कन्या (Bride) का जन्म विवरण"
            submitLabel="३६ गुण मिलान गणना करें ➔"
          />
        </div>
      )}

      {/* STEP 3: DETAILED ASHTAKOOT MILAN RESULT */}
      {currentStep === 'result' && milanResult && boyData && girlData && (
        <div className="space-y-4">
          {/* Main Score & Verdict Card */}
          <div className="relative overflow-hidden rounded-3xl border border-amber-500/40 bg-gradient-to-b from-[#1E192B] via-[#141220] to-[#0D0B16] p-5 text-center shadow-xl">
            <div className="text-xs text-amber-300 font-bold uppercase tracking-wider mb-1">
              {t.milanScoreOutOf}
            </div>

            <div className="flex items-center justify-center gap-2 py-2">
              <span className="text-5xl font-black text-amber-300 font-serif tracking-tight">
                {milanResult.totalPoints}
              </span>
              <span className="text-2xl font-bold text-slate-400">/ 36</span>
            </div>

            {/* Verdict Badge */}
            <div className="inline-block my-2">
              <span
                className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider border shadow-md ${
                  milanResult.isAuspicious
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                }`}
              >
                {language === 'hi' ? milanResult.verdictHi : milanResult.verdictEn}
              </span>
            </div>

            {/* Groom vs Bride Quick Names */}
            <div className="flex items-center justify-around pt-3 border-t border-slate-800 text-xs text-slate-300">
              <div>
                <span className="text-[10px] text-slate-500 block">वर (Groom)</span>
                <span className="font-bold text-amber-200">{boyData.name || 'वर'}</span>
              </div>
              <Heart size={16} className="text-rose-400 fill-rose-400" />
              <div>
                <span className="text-[10px] text-slate-500 block">कन्या (Bride)</span>
                <span className="font-bold text-amber-200">{girlData.name || 'कन्या'}</span>
              </div>
            </div>
          </div>

          {/* SIDE-BY-SIDE ALL POINTS BREAKDOWN (AS REQUESTED) */}
          <div className="bg-slate-900/90 rounded-3xl border border-amber-500/30 p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <Award size={16} className="text-amber-400" />
                <h3 className="text-xs font-bold text-amber-200">
                  {t.gunaBreakdownTitle}
                </h3>
              </div>
              <span className="text-[11px] text-slate-400">८ कूट (36 गुण)</span>
            </div>

            {/* List of 8 Kootas with points side-by-side and details */}
            <div className="space-y-2.5">
              {KOOTA_INFO.map((k) => {
                const kScore = (milanResult.kootas as any)[k.key];
                const obtained = kScore?.obtainedPoints ?? 0;
                const isFull = obtained === k.max;
                const isZero = obtained === 0;

                return (
                  <div
                    key={k.key}
                    className={`rounded-2xl border p-3 transition-colors ${
                      isZero
                        ? 'bg-rose-950/20 border-rose-500/30'
                        : isFull
                        ? 'bg-slate-800/60 border-slate-700/60'
                        : 'bg-amber-950/20 border-amber-500/30'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-amber-100">
                          {language === 'hi' ? k.nameHi : k.nameEn}
                        </h4>
                      </div>

                      {/* SIDE-BY-SIDE POINTS PILL */}
                      <div className="flex items-center gap-1 bg-slate-950 px-2.5 py-1 rounded-xl border border-slate-700 shrink-0">
                        <span
                          className={`text-xs font-black ${
                            isZero ? 'text-rose-400' : isFull ? 'text-emerald-400' : 'text-amber-400'
                          }`}
                        >
                          {obtained}
                        </span>
                        <span className="text-[10px] text-slate-500">/ {k.max}</span>
                      </div>
                    </div>

                    {/* Explanatory description in Hindi or English */}
                    <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                      {language === 'hi' ? k.purposeHi : k.purposeEn}
                    </p>

                    {/* Specific result comment */}
                    <div className="mt-1.5 pt-1.5 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                      <span className="text-slate-400">
                        {language === 'hi' ? 'शास्त्रीय फल:' : 'Scriptural Verdict:'}
                      </span>
                      <span
                        className={`font-semibold ${
                          isZero ? 'text-rose-300' : 'text-amber-200'
                        }`}
                      >
                        {kScore?.descriptionHi || (isFull ? 'उत्तम सामंजस्य' : 'सामान्य फल')}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* DOSHA ANALYSIS & REMEDIES */}
          <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-4 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
              <ShieldAlert size={16} className="text-amber-400" />
              <span>{t.doshaRemediesTitle}</span>
            </div>

            <div className="space-y-2 text-xs">
              {/* Nadi Dosha */}
              <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-200">नाड़ी दोष विचार (Nadi Dosha):</span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      milanResult.kootas.nadi.obtainedPoints === 8
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : 'bg-rose-500/20 text-rose-300'
                    }`}
                  >
                    {milanResult.kootas.nadi.obtainedPoints === 8 ? 'दोष मुक्त (Clean)' : 'नाड़ी दोष विद्यमान'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 mt-1">
                  {milanResult.kootas.nadi.obtainedPoints === 8
                    ? 'वर और कन्या की नाड़ी भिन्न है, अतः आनुवांशिक व संतति सुख पूर्णतः शुभ है।'
                    : 'एक नाड़ी होने पर शास्त्रानुसार स्वर्ण दान, महामृत्युंजय जप एवं भगवान शिव का अभिषेक करने से दोष का शमन होता है।'}
                </p>
              </div>

              {/* Bhakoot Dosha */}
              <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-200">भकूट दोष विचार (Bhakoot Dosha):</span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      milanResult.kootas.bhakoot.obtainedPoints === 7
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : 'bg-amber-500/20 text-amber-300'
                    }`}
                  >
                    {milanResult.kootas.bhakoot.obtainedPoints === 7 ? 'शुभ भकूट' : 'मध्यम भकूट'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 mt-1">
                  {milanResult.kootas.bhakoot.obtainedPoints === 7
                    ? 'राशि स्वामियों की परस्पर स्थिति अनुकूल है। गृहस्थ जीवन में सुख-समृद्धि रहेगी।'
                    : 'षडाष्टक या द्विर्द्वादश होने पर राशि स्वामियों की मित्रता अथवा नवमेश की शुभ दृष्टि से परिहार माना जाता है।'}
                </p>
              </div>
            </div>
          </div>

          {/* PANDIT SANJAY CHAUBEY PROFILE IN HINDI UNDERNEATH (AS EXPLICITLY REQUESTED) */}
          <div className="space-y-1.5 pt-2">
            <div className="flex items-center gap-1.5 px-1 text-xs font-bold text-amber-300">
              <Sparkles size={14} className="text-amber-400" />
              <span>ज्योतिषाचार्य परामर्श एवं मार्गदर्शन</span>
            </div>
            <PanditProfileCard compact={false} />
          </div>
        </div>
      )}
    </div>
  );
};
