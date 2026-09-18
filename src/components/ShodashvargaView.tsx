import React, { useState } from 'react';
import { KundliResult, calculateVargaHouses } from '../astrology/kundliEngine';
import { SHODASHVARGAS, VargaDef } from '../astrology/constants';
import { NorthIndianChart } from './NorthIndianChart';
import { Language, VEDIC_RASHI_NAMES, VEDIC_GRAHA_NAMES } from '../i18n/translations';
import { BookOpen, Sparkles } from 'lucide-react';

interface ShodashvargaViewProps {
  kundli: KundliResult;
  language?: Language;
  onSelectHouse?: (houseNumber: number) => void;
}

// Classical interpretations for each primary divisional chart
const VARGA_INTERPRETATIONS: Record<string, { hi: string; en: string; focusHi: string; focusEn: string }> = {
  D1: {
    focusHi: 'सम्पूर्ण व्यक्तित्व, जीवन पथ, देह एवं समग्र भाग्य',
    focusEn: 'Overall Destiny, Physical Body, Temperament & Life Path',
    hi: 'लग्न चक्र (D1) जातक के जन्म काल का आधार स्तम्भ है। प्रथम भाव (लग्न) से देह यष्टि, स्वास्थ्य और सम्मान का विचार किया जाता है।',
    en: 'The Lagna Chart (D1) forms the bedrock of the entire horoscope. It signifies the physical body, innate constitution, vitality, and general life trajectory.'
  },
  D2: {
    focusHi: 'धन संचय, तरल संपदा, वाणी एवं पैतृक कोष',
    focusEn: 'Accumulated Wealth, Treasury, Speech & Family Prosperity',
    hi: 'होरा चक्र (D2) विशेष रूप से जातक की आर्थिक स्थिति एवं धन संचय का विश्लेषण करता है। सूर्य और चन्द्रमा की होरा में ग्रहों का प्रभाव देखा जाता है।',
    en: 'The Hora Chart (D2) evaluates liquid wealth, economic security, and financial accumulation. Planets placed in Surya Hora bestow self-earned fortune, while Chandra Hora bestows prosperity through harmony and inheritance.'
  },
  D3: {
    focusHi: 'सहोदर भाई-बहन, शौर्य, पराक्रम एवं उद्यमशीलता',
    focusEn: 'Siblings, Courage, Valor, Enterprise & Vitality',
    hi: 'द्रेष्काण चक्र (D3) से जातक का पराक्रम, भाई-बहनों का सुख तथा कठिन परिस्थितियों से जूझने का सामर्थ्य ज्ञात होता है।',
    en: 'The Drekkana Chart (D3) signifies brothers, sisters, valor, personal initiatives, and one’s inner courage to overcome adversities.'
  },
  D4: {
    focusHi: 'भूमि, भवन, अचल संपत्ति, गृह सुख एवं मातृ स्नेह',
    focusEn: 'Fixed Assets, Land, Real Estate, Vehicles & Domestic Happiness',
    hi: 'चतुर्थांश चक्र (D4) जातक के स्वयं के मकान, अचल संपदा, भूखंड तथा गृहस्थ जीवन की शांति को प्रकट करता है।',
    en: 'The Chaturthamsa Chart (D4) reveals home ownership, real estate prosperity, landed property, and long-term domestic tranquility.'
  },
  D7: {
    focusHi: 'संतान सुख, संतति की उन्नति, वंश वृद्धि एवं पौत्र सुख',
    focusEn: 'Progeny, Children Well-Being, Lineage & Descendants',
    hi: 'सप्तांश चक्र (D7) से संतान प्राप्ति का योग, उनकी प्रतिभा, संस्कार तथा वंश परंपरा का विस्तृत विचार किया जाता है।',
    en: 'The Saptamsha Chart (D7) provides deep insight into progeny, children’s talents, family lineage continuation, and mutual bond with offspring.'
  },
  D9: {
    focusHi: 'विवाह, जीवनसाथी का स्वरूप, दांपत्य सामंजस्य व धर्म',
    focusEn: 'Marriage, Spouse Nature, Marital Harmony & Innate Dharma',
    hi: 'नवांश चक्र (D9) वैदिक ज्योतिष की आत्मा है। 28 वर्ष की आयु के पश्चात तथा विवाह के उपरांत नवांश का प्रभाव सर्वाधिक प्रभावी होता है।',
    en: 'The Navamsha Chart (D9) is the celestial mirror of your inner potential, marital destiny, spouse characteristics, and Dharmic inclinations.'
  },
  D10: {
    focusHi: 'आजीविका, व्यवसाय, प्रशासनिक पद, अधिकार व कीर्ति',
    focusEn: 'Profession, Career Prestige, Authority & Public Recognition',
    hi: 'दशमांश चक्र (D10) से कार्यक्षेत्र, पदोन्नति, व्यापारिक सफलता और समाज में प्राप्त होने वाली प्रतिष्ठा का अचूक आकलन होता है।',
    en: 'The Dashamsha Chart (D10) decodes your career zenith, professional leadership, government favors, executive authority, and reputation.'
  },
  D12: {
    focusHi: 'माता-पिता का सुख, स्वास्थ्य, पैतृक संस्कार व पितृ ऋण',
    focusEn: 'Parents Well-being, Ancestral Heritage & Past Karmic Bonds',
    hi: 'द्वादशांश चक्र (D12) माता-पिता के स्वास्थ्य, उनकी दीर्घायु तथा पूर्वजों से प्राप्त आशीष व संस्कारों का दर्पण है।',
    en: 'The Dwadasamsha Chart (D12) examines paternal and maternal karma, parents’ longevity, ancestral heritage, and blessings.'
  },
  D16: {
    focusHi: 'वाहन सुख, विलासिता, मानसिक संतोष व आमोद-प्रमोद',
    focusEn: 'Vehicles, Conveyances, Luxuries & Inner Contentment',
    hi: 'षोडशांश चक्र (D16) जातक के भौतिक सुख-साधनों, वाहनों के क्रय-विक्रय तथा मानसिक संतुष्टि को दर्शाता है।',
    en: 'The Shodashamsha Chart (D16) evaluates conveyances, luxury vehicles, travel comforts, and overall inner peace of mind.'
  },
};

export const ShodashvargaView: React.FC<ShodashvargaViewProps> = ({
  kundli,
  language = 'hi',
  onSelectHouse,
}) => {
  // Key divisional charts requested: D1 to D16
  const keyVargas = SHODASHVARGAS.filter((v) =>
    ['D1', 'D2', 'D3', 'D4', 'D7', 'D9', 'D10', 'D12', 'D16'].includes(v.key)
  );

  const [selectedVarga, setSelectedVarga] = useState<VargaDef>(keyVargas[5]); // Default D9 Navamsha

  const houses = calculateVargaHouses(kundli, selectedVarga.division);
  const interpretation = VARGA_INTERPRETATIONS[selectedVarga.key] || {
    focusHi: selectedVarga.purposeHi,
    focusEn: selectedVarga.nameEn,
    hi: `यह ${selectedVarga.nameHi} चक्र जातक के जीवन के विशिष्ट पक्ष का विश्लेषण करता है।`,
    en: `This ${selectedVarga.nameEn} divisional chart evaluates specific dimensions of the native’s destiny.`
  };

  return (
    <div className="space-y-4 max-w-[430px] mx-auto pb-4">
      {/* Top Header & Selector */}
      <div className="bg-[#101524] p-3 rounded-2xl border border-amber-500/30">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Sparkles size={15} className="text-amber-400" />
            <h3 className="text-xs font-bold text-amber-200">
              {language === 'hi' ? 'षोडशवर्ग चक्र (D1 से D16)' : 'Shodashvarga Divisional Charts (D1-D16)'}
            </h3>
          </div>
          <span className="text-[10px] text-amber-300 font-semibold px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/30">
            {selectedVarga.key}
          </span>
        </div>

        {/* Scrollable Pills for D1 to D16 */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
          {keyVargas.map((v) => {
            const isSelected = selectedVarga.key === v.key;
            return (
              <button
                key={v.key}
                onClick={() => setSelectedVarga(v)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                  isSelected
                    ? 'bg-amber-500 text-slate-950 font-bold border-amber-400 shadow-md shadow-amber-500/20 scale-105'
                    : 'bg-slate-800/90 text-slate-300 border-slate-700 hover:bg-slate-700'
                }`}
              >
                {v.key} • {language === 'hi' ? v.nameHi : v.nameEn}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Varga Highlights Card */}
      <div className="bg-slate-900/90 border border-amber-500/25 rounded-2xl p-3.5 space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-bold text-amber-200">
              {selectedVarga.key}: {language === 'hi' ? selectedVarga.nameHi : selectedVarga.nameEn}
            </h4>
            <p className="text-[11px] text-amber-300/90 font-medium mt-0.5">
              {language === 'hi' ? interpretation.focusHi : interpretation.focusEn}
            </p>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-slate-400 block">विभाजन (Division)</span>
            <span className="text-xs font-bold text-amber-400">1/{selectedVarga.division} भाग</span>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed pt-1 border-t border-slate-800">
          {language === 'hi' ? interpretation.hi : interpretation.en}
        </p>
      </div>

      {/* Full North Indian Chart SVG for this Varga */}
      <div className="bg-[#0B0E17] rounded-2xl border border-slate-800 p-2 shadow-lg">
        <div className="text-center py-1 text-xs font-bold text-amber-300">
          {language === 'hi'
            ? `${selectedVarga.nameHi} चक्र रेखाचित्र (North Indian Diagram)`
            : `${selectedVarga.nameEn} Chart Diagram`}
        </div>
        <NorthIndianChart
          houses={houses}
          lagnaData={{
            displayTag: 'ल',
            deg: kundli.lagna.deg,
            degSuperscript: kundli.lagna.degSuperscript,
          }}
          onSelectHouse={onSelectHouse}
        />
      </div>

      {/* Planetary Placements in this Varga */}
      <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-3 space-y-2">
        <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
          <BookOpen size={14} className="text-amber-400" />
          <span>
            {language === 'hi'
              ? `${selectedVarga.nameHi} चक्र में ग्रहों की स्थिति`
              : `Planetary Positions in ${selectedVarga.nameEn}`}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {houses.flatMap((h) =>
            h.planets.map((p) => {
              const rashiNum = h.rashi.id;
              const rashiData = VEDIC_RASHI_NAMES[rashiNum];
              const rashiName = language === 'hi' ? rashiData?.hi : rashiData?.en;
              const planetName = language === 'hi' ? p.nameHi : (VEDIC_GRAHA_NAMES[p.key]?.en || p.nameEn);

              return (
                <div
                  key={p.key + '-' + selectedVarga.key}
                  className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-2 text-left"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-200">{planetName}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-semibold">
                      भाव {h.houseNumber}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-300 mt-1">
                    {rashiName}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
