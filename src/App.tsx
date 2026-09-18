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
import { LoginPage } from './components/LoginPage';
import { HomePage } from './components/HomePage';
import { dbService } from './services/dbService';
import { AppUser, SavedKundliRecord } from './services/dbConfig';
import { Language, TRANSLATIONS, VEDIC_RASHI_NAMES } from './i18n/translations';
import { Edit3, BookmarkPlus, ArrowLeft } from 'lucide-react';

export function App() {
  // Authentication State
  const [currentUser, setCurrentUser] = useState<AppUser | null>(() => dbService.getCurrentUser());

  // Screen State: 'login' | 'home' | 'make_kundli' | 'match_kundli'
  const [activeScreen, setActiveScreen] = useState<'login' | 'home' | 'make_kundli' | 'match_kundli'>(() => {
    const user = dbService.getCurrentUser();
    return user ? 'home' : 'login';
  });

  // Language State: 'hi' | 'en'
  const [language, setLanguage] = useState<Language>(() => dbService.getLanguage());

  const handleToggleLanguage = () => {
    const nextLang = language === 'hi' ? 'en' : 'hi';
    setLanguage(nextLang);
    dbService.setLanguage(nextLang);
  };

  // Bottom Navigation in Chart Screen
  const [activeBottomNav, setActiveBottomNav] = useState<string>('chart');
  const [activeActionTab, setActiveActionTab] = useState<ActionTab | null>(null);
  const [selectedHouse, setSelectedHouse] = useState<number | null>(null);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);

  // Saved Kundli Records (Starts completely clean - ZERO mock/predefined profiles)
  const [savedRecords, setSavedRecords] = useState<SavedKundliRecord[]>(() => dbService.getSavedKundlis());

  // Current Birth Profile for Make Kundli
  const [birthData, setBirthData] = useState<BirthFormData | null>(() => {
    const local = localStorage.getItem('current_kundli_profile');
    if (local) {
      try {
        return JSON.parse(local);
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  useEffect(() => {
    if (birthData) {
      localStorage.setItem('current_kundli_profile', JSON.stringify(birthData));
    }
  }, [birthData]);

  // Handle Login and Skip
  const handleLoginSuccess = (user: AppUser) => {
    setCurrentUser(user);
    setActiveScreen('home');
  };

  const handleSkipLogin = () => {
    const guest = dbService.getCurrentUser();
    setCurrentUser(guest);
    setActiveScreen('home');
  };

  const handleLogout = () => {
    dbService.logout();
    setCurrentUser(null);
    setActiveScreen('login');
  };

  // Convert SavedKundliRecord to BirthFormData for modal display
  const savedProfilesForModal: BirthFormData[] = savedRecords.map((r) => ({
    name: r.name,
    gender: r.gender as any,
    date: r.birthDate,
    time: r.birthTime,
    cityName: r.cityName,
    latitude: r.latitude,
    longitude: r.longitude,
    timezoneOffset: r.timezoneOffset,
  }));

  const handleSaveCurrentKundli = () => {
    if (!birthData) return;
    const exists = savedRecords.some(
      (r) => r.name === birthData.name && r.birthDate === birthData.date && r.birthTime === birthData.time
    );
    if (exists) {
      alert(language === 'hi' ? 'यह कुंडली पहले से सुरक्षित है।' : 'This Kundli is already saved.');
      return;
    }
    dbService.saveKundli({
      userId: currentUser?.id,
      name: birthData.name,
      gender: birthData.gender,
      birthDate: birthData.date,
      birthTime: birthData.time,
      cityName: birthData.cityName,
      latitude: birthData.latitude,
      longitude: birthData.longitude,
      timezoneOffset: birthData.timezoneOffset,
    });
    setSavedRecords(dbService.getSavedKundlis());
    alert(
      language === 'hi'
        ? `"${birthData.name}" की कुंडली डेटाबेस में सुरक्षित कर ली गई है।`
        : `"${birthData.name}" Kundli successfully saved to database.`
    );
  };

  const handleDeleteProfile = (index: number) => {
    const target = savedRecords[index];
    if (target) {
      dbService.deleteKundli(target.id);
      setSavedRecords(dbService.getSavedKundlis());
    }
  };

  const handleDeleteSavedRecordById = (id: string) => {
    dbService.deleteKundli(id);
    setSavedRecords(dbService.getSavedKundlis());
  };

  const handleOpenSavedKundliRecord = (record: SavedKundliRecord) => {
    setBirthData({
      name: record.name,
      gender: record.gender as any,
      date: record.birthDate,
      time: record.birthTime,
      cityName: record.cityName,
      latitude: record.latitude,
      longitude: record.longitude,
      timezoneOffset: record.timezoneOffset,
    });
    setActiveScreen('make_kundli');
    setIsFormOpen(false);
    setActiveActionTab(null);
  };

  // Astrological Calculations (Calculated only when birthData is present)
  let kundli: KundliResult | null = null;
  let dasha: DashaOverview | null = null;
  let doshas: DoshaAnalysis | null = null;

  if (birthData) {
    kundli = calculateKundli(
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
    dasha = calculateVimshottariDasha(moonPlanet, birthData.date, birthData.time);
    doshas = getFullDoshaAnalysis(kundli);
  }

  const handleSelectActionTab = (tab: ActionTab) => {
    if (activeActionTab === tab) {
      setActiveActionTab(null);
    } else {
      setActiveActionTab(tab);
    }
  };

  const t = TRANSLATIONS[language];

  return (
    <MobileContainer
      language={language}
      onToggleLanguage={handleToggleLanguage}
      currentUser={currentUser}
      onOpenLogin={() => setActiveScreen('login')}
      onLogout={handleLogout}
      onGoHome={() => {
        setActiveScreen('home');
        setActiveActionTab(null);
      }}
      activeScreen={activeScreen}
      activeTab={activeBottomNav}
      onTabChange={(tabId) => {
        setActiveBottomNav(tabId);
        setActiveActionTab(null);
      }}
      onOpenSaved={() => setIsSavedModalOpen(true)}
      onNewKundli={() => {
        setActiveScreen('make_kundli');
        setIsFormOpen(true);
      }}
      onShareOrPrint={() => window.print()}
    >
      {/* 1. SCREEN: LOGIN PAGE */}
      {activeScreen === 'login' && (
        <LoginPage
          language={language}
          onLoginSuccess={handleLoginSuccess}
          onSkip={handleSkipLogin}
        />
      )}

      {/* 2. SCREEN: HOME PAGE WITH 2 ACTION BUTTONS & PANDIT SHOWCASE */}
      {activeScreen === 'home' && (
        <HomePage
          language={language}
          onSelectMakeKundli={() => {
            setActiveScreen('make_kundli');
            if (!birthData) setIsFormOpen(true);
          }}
          onSelectMatchKundli={() => {
            setActiveScreen('match_kundli');
          }}
          savedKundlis={savedRecords}
          onOpenSavedKundli={handleOpenSavedKundliRecord}
          onDeleteSavedKundli={handleDeleteSavedRecordById}
        />
      )}

      {/* 3. SCREEN: DEDICATED SEPARATED MATCH KUNDALI (36 GUNA MILAN) */}
      {activeScreen === 'match_kundli' && (
        <KundliMilanView
          language={language}
          onBackToHome={() => setActiveScreen('home')}
        />
      )}

      {/* 4. SCREEN: DEDICATED SEPARATED MAKE KUNDALI */}
      {activeScreen === 'make_kundli' && (
        <div>
          {/* If no profile yet or edit form requested */}
          {(!birthData || isFormOpen) ? (
            <div className="space-y-4">
              <BirthDetailsForm
                initialData={birthData || undefined}
                language={language}
                onLanguageChange={(lang) => {
                  setLanguage(lang);
                  dbService.setLanguage(lang);
                }}
                onSubmit={(newData) => {
                  setBirthData(newData);
                  setIsFormOpen(false);
                  setActiveActionTab(null);
                }}
                formTitle={language === 'hi' ? '१. जन्म कुंडली निर्माण' : '1. Make Janam Kundli'}
                submitLabel={language === 'hi' ? 'कुंडली तैयार करें एवं देखें' : 'Generate & View Kundli'}
              />
              {birthData && (
                <button
                  onClick={() => setIsFormOpen(false)}
                  className="form-cancel-btn"
                >
                  {t.formCancel}
                </button>
              )}
            </div>
          ) : (
            kundli && dasha && doshas && (
              <div className="space-y-2.5">
                {/* Back to Home button */}
                <button
                  onClick={() => setActiveScreen('home')}
                  className="py-1 px-3 rounded-xl bg-slate-800 text-amber-300 border border-slate-700 text-xs flex items-center gap-1.5 hover:bg-slate-700 transition-colors mb-1"
                >
                  <ArrowLeft size={13} /> {language === 'hi' ? 'मुख्य पृष्ठ (Home)' : 'Home'}
                </button>

                {/* Top Jatak Info Header Card */}
                <div className="bg-[#121824] p-3 rounded-2xl border border-amber-500/30 flex items-center justify-between select-none">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-amber-200">{birthData.name}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30">
                        {language === 'hi'
                          ? `${kundli.lagna.rashi.nameHi} लग्न`
                          : `${VEDIC_RASHI_NAMES[kundli.lagna.rashi.id]?.en || kundli.lagna.rashi.nameEn} Lagna`}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      {birthData.date} • {birthData.time} | {birthData.cityName.split(',')[0]}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={handleSaveCurrentKundli}
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

                {/* MAIN CHART SCREEN (D1 Lagna View) */}
                {activeActionTab === null && activeBottomNav === 'chart' && (
                  <div className="space-y-0">
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

                    {/* Status Legend Bar */}
                    <ChartLegend />

                    {/* Six-Button Navigation Action Grid */}
                    <NavigationGrid
                      activeTab={activeActionTab as any}
                      onSelectTab={handleSelectActionTab}
                    />
                  </div>
                )}

                {/* DETAIL VIEWS TRIGGERED BY THE 6 ACTION BUTTONS */}
                {activeActionTab !== null && (
                  <div className="space-y-3">
                    <button
                      onClick={() => setActiveActionTab(null)}
                      className="py-1.5 px-3 rounded-xl bg-slate-800 text-amber-300 border border-slate-700 text-xs flex items-center gap-1.5 hover:bg-slate-700 transition-colors"
                    >
                      <ArrowLeft size={14} /> {language === 'hi' ? 'मुख्य लग्न कुंडली पर वापस लौटें' : 'Back to Main Lagna Chart'}
                    </button>

                    {/* 1. Graha (Planetary Details) */}
                    {activeActionTab === 'graha' && <PlanetaryTable kundli={kundli} />}

                    {/* 2. Dasha (Vimshottari Dasha) */}
                    {activeActionTab === 'dasha' && <DashaView dasha={dasha} />}

                    {/* 3. Phaladesh (Yogas & Jataka Parijata Analysis) */}
                    {activeActionTab === 'phaladesh' && <PhaladeshView kundli={kundli} />}

                    {/* 4. KP (Krishnamurti Padhdhati) */}
                    {activeActionTab === 'kp' && <KPView kundli={kundli} />}

                    {/* 5. Shodashvarga (Detailed Individual Pages for D1 to D16 Charts) */}
                    {activeActionTab === 'shodashvarga' && (
                      <ShodashvargaView
                        kundli={kundli}
                        language={language}
                        onSelectHouse={(hNum) => setSelectedHouse(hNum)}
                      />
                    )}

                    {/* 6. Doshas */}
                    {activeActionTab === 'lalkitab' && (
                      <div className="space-y-4">
                        <DoshaCard doshas={doshas} />
                      </div>
                    )}

                    {/* Always keep 6 buttons available below */}
                    <NavigationGrid
                      activeTab={activeActionTab}
                      onSelectTab={handleSelectActionTab}
                    />
                  </div>
                )}

                {/* Bottom Navigation Direct Tabs */}
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
                  <KundliMilanView
                    language={language}
                    onBackToHome={() => setActiveScreen('home')}
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
              </div>
            )
          )}
        </div>
      )}

      {/* Saved Profiles Modal */}
      {isSavedModalOpen && (
        <SavedProfilesModal
          savedProfiles={savedProfilesForModal}
          onSelectProfile={(p) => {
            setBirthData(p);
            setActiveScreen('make_kundli');
            setIsFormOpen(false);
            setActiveActionTab(null);
          }}
          onDeleteProfile={handleDeleteProfile}
          onClose={() => setIsSavedModalOpen(false)}
          onNewProfile={() => {
            setActiveScreen('make_kundli');
            setIsFormOpen(true);
            setIsSavedModalOpen(false);
          }}
        />
      )}
    </MobileContainer>
  );
}

export default App;
