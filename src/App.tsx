import { useState, useEffect } from 'react';
import { calculateKundli, KundliResult } from './astrology/kundliEngine';
import { calculateVimshottariDasha, DashaOverview } from './astrology/dashaEngine';
import { getFullDoshaAnalysis, DoshaAnalysis } from './astrology/doshaEngine';
import { NorthIndianChart } from './components/NorthIndianChart';
import { ChartLegend } from './components/ChartLegend';
import { NavigationGrid, ActionTab } from './components/NavigationGrid';
import { HouseDetailModal } from './components/HouseDetailModal';
import { BirthDetailsForm, BirthFormData } from './components/BirthDetailsForm';
import { PlanetaryTable } from './components/PlanetaryTable';
import { DashaView } from './components/DashaView';
import { PhaladeshView } from './components/PhaladeshView';
import { KPView } from './components/KPView';
import { ShodashvargaView } from './components/ShodashvargaView';
import { DoshaCard } from './components/DoshaCard';
import { KundliMilanView } from './components/KundliMilanView';
import { SavedProfilesModal } from './components/SavedProfilesModal';
import { MobileContainer } from './components/MobileContainer';
import { Edit3, BookmarkPlus, ArrowLeft } from 'lucide-react';

const DEFAULT_PROFILE: BirthFormData = {
  name: 'आयुष चौबे',
  gender: 'Male',
  date: '1998-08-15',
  time: '06:30',
  cityName: 'Auraiya, Uttar Pradesh',
  latitude: 26.4674,
  longitude: 79.5135,
  timezoneOffset: 5.5,
};

export function App() {
  const [activeBottomNav, setActiveBottomNav] = useState<string>('chart');
  const [activeActionTab, setActiveActionTab] = useState<ActionTab | null>(null);
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
        cityName: 'Ayodhya, Uttar Pradesh',
        latitude: 26.7922,
        longitude: 82.1998,
        timezoneOffset: 5.5,
      },
    ];
  });

  useEffect(() => {
    localStorage.setItem('saved_kundli_profiles', JSON.stringify(savedProfiles));
  }, [savedProfiles]);

  useEffect(() => {
    localStorage.setItem('current_kundli_profile', JSON.stringify(birthData));
  }, [birthData]);

  // Astrological Calculations
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

  const handleSelectActionTab = (tab: ActionTab) => {
    if (activeActionTab === tab) {
      setActiveActionTab(null); // toggle off to view main chart
    } else {
      setActiveActionTab(tab);
    }
  };

  return (
    <MobileContainer
      activeTab={activeBottomNav}
      onTabChange={(tabId) => {
        setActiveBottomNav(tabId);
        setActiveActionTab(null);
      }}
      onOpenSaved={() => setIsSavedModalOpen(true)}
      onNewKundli={() => setIsFormOpen(true)}
      onShareOrPrint={() => window.print()}
    >
      {/* If Form is Open */}
      {isFormOpen ? (
        <div className="space-y-4">
          <BirthDetailsForm
            initialData={birthData}
            onSubmit={(newData) => {
              setBirthData(newData);
              setIsFormOpen(false);
              setActiveActionTab(null);
            }}
            formTitle="जन्म विवरण प्रविष्ट करें (New Birth Chart)"
            submitLabel="कुंडली तैयार करें एवं देखें"
          />
          <button
            onClick={() => setIsFormOpen(false)}
            className="form-cancel-btn"
          >
            रद्द करें (Cancel)
          </button>
        </div>
      ) : (
        <div className="space-y-2.5">
          {/* Top Jatak Info Bar */}
          <div className="bg-[#121824] p-3 rounded-2xl border border-amber-500/30 flex items-center justify-between select-none">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-amber-200">{birthData.name}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30">
                  {kundli.lagna.rashi.nameHi} लग्न
                </span>
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                {birthData.date} • {birthData.time} | {birthData.cityName}
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handleSaveCurrent}
                className="p-1.5 rounded-xl bg-slate-800 hover:bg-amber-500/20 text-amber-300 border border-slate-700"
                title="सुरक्षित करें"
              >
                <BookmarkPlus size={15} />
              </button>
              <button
                onClick={() => setIsFormOpen(true)}
                className="p-1.5 rounded-xl bg-slate-800 hover:bg-amber-500/20 text-amber-300 border border-slate-700"
                title="विवरण बदलें"
              >
                <Edit3 size={15} />
              </button>
            </div>
          </div>

          {/* MAIN CHART SCREEN (Matching User's Reference Screenshot) */}
          {activeActionTab === null && activeBottomNav === 'chart' && (
            <div className="space-y-0">
              {/* 1. North Indian Kundli Chart */}
              <NorthIndianChart
                houses={kundli.d1Houses}
                lagnaData={{
                  displayTag: kundli.lagna.displayTag,
                  deg: kundli.lagna.deg,
                  degSuperscript: kundli.lagna.degSuperscript,
                }}
                onSelectHouse={(hNum) => setSelectedHouse(hNum)}
                selectedHouse={selectedHouse}
              />

              {/* 2. Peach Status Legend Bar */}
              <ChartLegend />

              {/* 3. Six-Button Navigation Action Grid */}
              <NavigationGrid
                activeTab={activeActionTab as any}
                onSelectTab={handleSelectActionTab}
              />
            </div>
          )}

          {/* DETAIL VIEWS TRIGGERED BY THE 6 ACTION BUTTONS */}
          {activeActionTab !== null && (
            <div className="space-y-3">
              {/* Back to Chart Button */}
              <button
                onClick={() => setActiveActionTab(null)}
                className="py-1.5 px-3 rounded-xl bg-slate-800 text-amber-300 border border-slate-700 text-xs flex items-center gap-1.5 hover:bg-slate-700 transition-colors"
              >
                <ArrowLeft size={14} /> मुख्य कुंडली चार्ट पर वापस लौटें
              </button>

              {/* 1. Graha (Planetary Details) */}
              {activeActionTab === 'graha' && <PlanetaryTable kundli={kundli} />}

              {/* 2. Dasha (Vimshottari Dasha) */}
              {activeActionTab === 'dasha' && <DashaView dasha={dasha} />}

              {/* 3. Phaladesh (Yogas & Jataka Parijata Analysis) */}
              {activeActionTab === 'phaladesh' && <PhaladeshView kundli={kundli} />}

              {/* 4. KP (Krishnamurti Padhdhati) */}
              {activeActionTab === 'kp' && <KPView kundli={kundli} />}

              {/* 5. Shodashvarga (16 Divisional Charts) */}
              {activeActionTab === 'shodashvarga' && (
                <ShodashvargaView
                  kundli={kundli}
                  onSelectHouse={(hNum) => setSelectedHouse(hNum)}
                />
              )}

              {/* 6. Lal Kitab / Doshas & Milan */}
              {activeActionTab === 'lalkitab' && (
                <div className="space-y-4">
                  <DoshaCard doshas={doshas} />
                  <KundliMilanView />
                </div>
              )}

              {/* Always keep the 6 Action buttons accessible at bottom */}
              <NavigationGrid
                activeTab={activeActionTab}
                onSelectTab={handleSelectActionTab}
              />
            </div>
          )}

          {/* OTHER BOTTOM NAV TABS (if clicked directly) */}
          {activeBottomNav === 'planets' && activeActionTab === null && (
            <PlanetaryTable kundli={kundli} />
          )}
          {activeBottomNav === 'dasha' && activeActionTab === null && (
            <DashaView dasha={dasha} />
          )}
          {activeBottomNav === 'doshas' && activeActionTab === null && (
            <DoshaCard doshas={doshas} />
          )}
          {activeBottomNav === 'milan' && activeActionTab === null && (
            <KundliMilanView />
          )}

          {/* House Detail Modal when any house is tapped */}
          {selectedHouse !== null && (
            <HouseDetailModal
              houseData={kundli.d1Houses[selectedHouse - 1]}
              allPlanets={kundli.planets}
              onClose={() => setSelectedHouse(null)}
            />
          )}
        </div>
      )}

      {/* Saved Profiles Modal */}
      {isSavedModalOpen && (
        <SavedProfilesModal
          savedProfiles={savedProfiles}
          onSelectProfile={(p) => {
            setBirthData(p);
            setIsFormOpen(false);
            setActiveActionTab(null);
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
