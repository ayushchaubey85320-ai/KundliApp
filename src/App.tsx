import { useState, useEffect } from 'react';
import { calculateKundli, KundliResult } from './astrology/kundliEngine';
import { calculateVimshottariDasha, DashaOverview } from './astrology/dashaEngine';
import { getFullDoshaAnalysis, DoshaAnalysis } from './astrology/doshaEngine';
import { NorthIndianChart } from './components/NorthIndianChart';
import { SouthIndianChart } from './components/SouthIndianChart';
import { HouseDetailModal } from './components/HouseDetailModal';
import { BirthDetailsForm, BirthFormData } from './components/BirthDetailsForm';
import { PlanetaryTable } from './components/PlanetaryTable';
import { DashaView } from './components/DashaView';
import { DoshaCard } from './components/DoshaCard';
import { KundliMilanView } from './components/KundliMilanView';
import { SavedProfilesModal } from './components/SavedProfilesModal';
import { MobileContainer } from './components/MobileContainer';
import { Sparkles, Edit3, BookmarkPlus } from 'lucide-react';

const DEFAULT_PROFILE: BirthFormData = {
  name: 'आयुष चौबे',
  gender: 'Male',
  date: '1998-08-15',
  time: '06:30',
  cityName: 'Varanasi (Kashi)',
  latitude: 25.3176,
  longitude: 82.9739,
  timezoneOffset: 5.5,
};

export function App() {
  const [activeTab, setActiveTab] = useState<string>('chart');
  const [chartType, setChartType] = useState<'D1' | 'D9'>('D1');
  const [chartStyle, setChartStyle] = useState<'North' | 'South'>('North');
  const [selectedHouse, setSelectedHouse] = useState<number | null>(null);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);

  // Current Birth Profile
  const [birthData, setBirthData] = useState<BirthFormData>(() => {
    const local = localStorage.getItem('current_kundli_profile');
    if (local) {
      try {
        return JSON.parse(local);
      } catch (e) {
        // fallback
      }
    }
    return DEFAULT_PROFILE;
  });

  // Saved Profiles in localStorage
  const [savedProfiles, setSavedProfiles] = useState<BirthFormData[]>(() => {
    const local = localStorage.getItem('saved_kundli_profiles');
    if (local) {
      try {
        return JSON.parse(local);
      } catch (e) {
        // fallback
      }
    }
    return [
      DEFAULT_PROFILE,
      {
        name: 'श्री रामलला (अयोध्या)',
        gender: 'Male',
        date: '2024-01-22',
        time: '12:29',
        cityName: 'Ayodhya',
        latitude: 26.7922,
        longitude: 82.1998,
        timezoneOffset: 5.5,
      },
    ];
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('saved_kundli_profiles', JSON.stringify(savedProfiles));
  }, [savedProfiles]);

  useEffect(() => {
    localStorage.setItem('current_kundli_profile', JSON.stringify(birthData));
  }, [birthData]);

  // Compute Kundli, Dasha, Doshas
  const kundli: KundliResult = calculateKundli(
    birthData.name,
    birthData.gender,
    birthData.date,
    birthData.time,
    birthData.cityName,
    birthData.latitude,
    birthData.longitude,
    birthData.timezoneOffset
  );

  const moonPlanet = kundli.planets.find((p) => p.key === 'Moon') || kundli.planets[1];
  const dasha: DashaOverview = calculateVimshottariDasha(moonPlanet, birthData.date, birthData.time);
  const doshas: DoshaAnalysis = getFullDoshaAnalysis(kundli);

  // Save current profile
  const handleSaveCurrent = () => {
    const already = savedProfiles.find(
      (p) => p.name === birthData.name && p.date === birthData.date && p.time === birthData.time
    );
    if (already) {
      alert('यह कुंडली पहले से सुरक्षित है।');
      return;
    }
    setSavedProfiles([birthData, ...savedProfiles]);
    alert(`"${birthData.name}" की कुंडली सुरक्षित कर ली गई है।`);
  };

  const handleDeleteProfile = (index: number) => {
    const next = [...savedProfiles];
    next.splice(index, 1);
    setSavedProfiles(next);
  };

  const handlePrintOrShare = () => {
    window.print();
  };

  return (
    <MobileContainer
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onOpenSaved={() => setIsSavedModalOpen(true)}
      onNewKundli={() => setIsFormOpen(true)}
      onShareOrPrint={handlePrintOrShare}
    >
      {/* If Form is Open, show birth details entry */}
      {isFormOpen ? (
        <div className="space-y-4">
          <BirthDetailsForm
            initialData={birthData}
            onSubmit={(newData) => {
              setBirthData(newData);
              setIsFormOpen(false);
              setActiveTab('chart');
            }}
            formTitle="नई जन्म कुंडली बनाएं (New Birth Chart)"
            submitLabel="कुंडली तैयार करें एवं देखें"
          />
          <button
            onClick={() => setIsFormOpen(false)}
            className="w-full py-2.5 rounded-xl border border-slate-700 bg-slate-800 text-xs text-slate-300 hover:text-white"
          >
            रद्द करें (Cancel)
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Quick Jatak Profile Summary Card */}
          <div className="bg-gradient-to-r from-[#141C2E] via-[#101726] to-[#141C2E] p-3.5 rounded-2xl border border-amber-500/30 shadow-lg flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-extrabold text-amber-200">{birthData.name}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30">
                  {birthData.gender === 'Male' ? 'पुरुष' : 'स्त्री'}
                </span>
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                {birthData.date} • {birthData.time} | {birthData.cityName}
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handleSaveCurrent}
                className="p-2 rounded-xl bg-slate-800/80 hover:bg-amber-500/20 text-amber-300 border border-slate-700 transition-colors"
                title="सुरक्षित करें"
              >
                <BookmarkPlus size={15} />
              </button>
              <button
                onClick={() => setIsFormOpen(true)}
                className="p-2 rounded-xl bg-slate-800/80 hover:bg-amber-500/20 text-amber-300 border border-slate-700 transition-colors"
                title="विवरण बदलें"
              >
                <Edit3 size={15} />
              </button>
            </div>
          </div>

          {/* 4 Quick Vedic Badges (Lagna, Moon Sign, Nakshatra, Current Dasha) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
            <div className="bg-slate-900/80 p-2 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block">लग्न (Ascendant)</span>
              <span className="text-xs font-bold text-amber-300">{kundli.lagna.rashi.nameHi} लग्न</span>
            </div>
            <div className="bg-slate-900/80 p-2 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block">चंद्र राशि (Moon Sign)</span>
              <span className="text-xs font-bold text-amber-300">{moonPlanet.rashi.nameHi} राशि</span>
            </div>
            <div className="bg-slate-900/80 p-2 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block">नक्षत्र (Birth Star)</span>
              <span className="text-xs font-bold text-amber-300">
                {moonPlanet.nakshatra.nameHi} (पद {moonPlanet.pada})
              </span>
            </div>
            <div className="bg-slate-900/80 p-2 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block">वर्तमान दशा</span>
              <span className="text-xs font-bold text-amber-300">
                {dasha.activeMahadasha ? `${dasha.activeMahadasha.nameHi}` : '—'}
              </span>
            </div>
          </div>

          {/* TAB 1: CHART VIEW */}
          {activeTab === 'chart' && (
            <div className="space-y-3.5">
              {/* Toggles: D1 / D9 and North / South */}
              <div className="flex items-center justify-between gap-2">
                {/* D1 / D9 Toggle */}
                <div className="flex bg-slate-900/90 p-1 rounded-xl border border-slate-800 flex-1">
                  <button
                    onClick={() => setChartType('D1')}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                      chartType === 'D1'
                        ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    लग्न (D1)
                  </button>
                  <button
                    onClick={() => setChartType('D9')}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                      chartType === 'D9'
                        ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    नवमांश (D9)
                  </button>
                </div>

                {/* Style Toggle (North / South) */}
                <div className="flex bg-slate-900/90 p-1 rounded-xl border border-slate-800 flex-1">
                  <button
                    onClick={() => setChartStyle('North')}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                      chartStyle === 'North'
                        ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    उत्तर भारतीय
                  </button>
                  <button
                    onClick={() => setChartStyle('South')}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                      chartStyle === 'South'
                        ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    दक्षिण भारतीय
                  </button>
                </div>
              </div>

              {/* Chart Render */}
              {chartStyle === 'North' ? (
                <NorthIndianChart
                  houses={chartType === 'D1' ? kundli.d1Houses : kundli.d9Houses}
                  chartTitle={chartType === 'D1' ? 'लग्न कुंडली (D1 Chart)' : 'नवमांश कुंडली (D9 Chart)'}
                  onSelectHouse={(hNum) => setSelectedHouse(hNum)}
                  selectedHouse={selectedHouse}
                />
              ) : (
                <SouthIndianChart
                  houses={chartType === 'D1' ? kundli.d1Houses : kundli.d9Houses}
                  lagnaRashiId={chartType === 'D1' ? kundli.lagna.rashi.id : kundli.lagna.d9Rashi.id}
                  chartTitle={chartType === 'D1' ? 'दक्षिण भारतीय लग्न (D1)' : 'दक्षिण भारतीय नवमांश (D9)'}
                />
              )}

              {/* House Detail Modal */}
              {selectedHouse !== null && (
                <HouseDetailModal
                  houseData={kundli.d1Houses[selectedHouse - 1]}
                  allPlanets={kundli.planets}
                  onClose={() => setSelectedHouse(null)}
                />
              )}

              {/* Panchanga & Astrological Glance */}
              <div className="bg-[#101726]/80 p-3.5 rounded-2xl border border-slate-800 text-xs text-slate-300 space-y-2">
                <div className="text-amber-300 font-semibold flex items-center gap-1.5">
                  <Sparkles size={14} /> प्रमुख ज्योतिषीय अवलोकन:
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div>• तत्व: {kundli.lagna.rashi.elementHi}</div>
                  <div>• लग्न स्वामी: {kundli.lagna.rashi.lordHi}</div>
                  <div>• गण: {moonPlanet.nakshatra.ganaHi}</div>
                  <div>• नाड़ी: {moonPlanet.nakshatra.nadiHi}</div>
                  <div>• वर्ण: {moonPlanet.nakshatra.varnaHi}</div>
                  <div>• योनि: {moonPlanet.nakshatra.yoniHi}</div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PLANETARY POSITIONS */}
          {activeTab === 'planets' && <PlanetaryTable kundli={kundli} />}

          {/* TAB 3: VIMSHOTTARI DASHA */}
          {activeTab === 'dasha' && <DashaView dasha={dasha} />}

          {/* TAB 4: DOSHAS & REMEDIES */}
          {activeTab === 'doshas' && <DoshaCard doshas={doshas} />}

          {/* TAB 5: KUNDLI MILAN */}
          {activeTab === 'milan' && <KundliMilanView />}
        </div>
      )}

      {/* Saved Profiles Drawer */}
      {isSavedModalOpen && (
        <SavedProfilesModal
          savedProfiles={savedProfiles}
          onSelectProfile={(p) => {
            setBirthData(p);
            setIsFormOpen(false);
          }}
          onDeleteProfile={handleDeleteProfile}
          onClose={() => setIsSavedModalOpen(false)}
          onNewProfile={() => {
            setIsFormOpen(true);
            setIsSavedModalOpen(false);
          }}
        />
      )}
    </MobileContainer>
  );
}
export default App;
