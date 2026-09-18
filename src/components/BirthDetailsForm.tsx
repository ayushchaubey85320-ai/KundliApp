import React, { useState, useRef } from 'react';
import { searchLocations, GeocodingResult } from '../services/geocodingService';
import { Language, TRANSLATIONS } from '../i18n/translations';
import { MapPin, Calendar, Clock, User, Compass, Search, Loader2 } from 'lucide-react';

export interface BirthFormData {
  name: string;
  gender: 'Male' | 'Female' | 'Other';
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  cityName: string;
  latitude: number;
  longitude: number;
  timezoneOffset: number;
}

interface BirthDetailsFormProps {
  initialData?: BirthFormData;
  onSubmit: (data: BirthFormData) => void;
  formTitle?: string;
  submitLabel?: string;
  language?: Language;
  onLanguageChange?: (lang: Language) => void;
}

export const BirthDetailsForm: React.FC<BirthDetailsFormProps> = ({
  initialData,
  onSubmit,
  formTitle,
  submitLabel,
  language = 'hi',
  onLanguageChange,
}) => {
  const t = TRANSLATIONS[language];

  // ALWAYS START EMPTY if no explicit initialData provided
  const [name, setName] = useState(initialData?.name || '');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>(initialData?.gender || 'Male');
  const [date, setDate] = useState(initialData?.date || '');
  const [time, setTime] = useState(initialData?.time || '');
  const [citySearch, setCitySearch] = useState(initialData?.cityName || '');
  const [selectedCoords, setSelectedCoords] = useState<{
    latitude: number;
    longitude: number;
    timezone: number;
    displayName: string;
  }>({
    latitude: initialData?.latitude || 28.6139,
    longitude: initialData?.longitude || 77.2090,
    timezone: initialData?.timezoneOffset || 5.5,
    displayName: initialData?.cityName || '',
  });

  const [searchResults, setSearchResults] = useState<GeocodingResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [gpsLoading, setGpsLoading] = useState(false);

  const searchTimerRef = useRef<any>(null);

  // Handle location input debounced search
  const handleCityInput = (val: string) => {
    setCitySearch(val);
    if (searchTimerRef.current) clearTimeout(searchTimerRef.current);

    if (val.trim().length >= 2) {
      setIsSearching(true);
      searchTimerRef.current = setTimeout(async () => {
        const res = await searchLocations(val);
        setSearchResults(res);
        setIsSearching(false);
        setIsDropdownOpen(true);
      }, 350);
    } else {
      setSearchResults([]);
      setIsDropdownOpen(false);
      setIsSearching(false);
    }
  };

  const handleSelectLocation = (loc: GeocodingResult) => {
    setSelectedCoords({
      latitude: loc.latitude,
      longitude: loc.longitude,
      timezone: loc.timezone,
      displayName: loc.displayName,
    });
    setCitySearch(`${loc.name}${loc.state ? `, ${loc.state}` : ''}`);
    setIsDropdownOpen(false);
  };

  // GPS Geolocation
  const handleUseGPS = () => {
    if (!navigator.geolocation) {
      alert(language === 'hi' ? 'जीपीएस लोकेशन उपलब्ध नहीं है।' : 'GPS is not available on this device.');
      return;
    }
    setGpsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGpsLoading(false);
        const lat = parseFloat(pos.coords.latitude.toFixed(4));
        const lng = parseFloat(pos.coords.longitude.toFixed(4));
        setSelectedCoords({
          latitude: lat,
          longitude: lng,
          timezone: 5.5,
          displayName: `जीपीएस स्थान (${lat}°, ${lng}°)`,
        });
        setCitySearch(`जीपीएस स्थान (${lat}°, ${lng}°)`);
      },
      () => {
        setGpsLoading(false);
        alert(language === 'hi' ? 'जीपीएस स्थान प्राप्त नहीं हो सका।' : 'Unable to acquire GPS coordinates.');
      }
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert(language === 'hi' ? 'कृपया जातक का नाम दर्ज करें।' : 'Please enter the name.');
      return;
    }
    if (!date) {
      alert(language === 'hi' ? 'कृपया जन्म तिथि चुनें।' : 'Please select birth date.');
      return;
    }
    if (!time) {
      alert(language === 'hi' ? 'कृपया जन्म समय चुनें।' : 'Please select birth time.');
      return;
    }
    if (!citySearch.trim()) {
      alert(language === 'hi' ? 'कृपया जन्म स्थान दर्ज करें।' : 'Please select birth place.');
      return;
    }

    onSubmit({
      name: name.trim(),
      gender,
      date,
      time,
      cityName: citySearch.trim(),
      latitude: selectedCoords.latitude,
      longitude: selectedCoords.longitude,
      timezoneOffset: selectedCoords.timezone,
    });
  };

  return (
    <div className="bg-[#0F1424] border border-amber-500/30 rounded-3xl p-4 sm:p-5 shadow-2xl relative overflow-hidden">
      {/* Decorative Golden Light */}
      <div className="absolute top-0 right-0 w-36 h-36 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Form Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 flex items-center justify-center text-sm font-bold">
            ☸
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-amber-100 font-serif">
              {formTitle || 'जन्म विवरण (Birth Details)'}
            </h2>
            <p className="text-[10px] text-slate-400">
              {language === 'hi' ? 'सटीक ग्रह स्थिति एवं फलादेश हेतु' : 'For accurate astrological calculations'}
            </p>
          </div>
        </div>

        {/* Language Switch */}
        {onLanguageChange && (
          <div className="flex items-center bg-[#07090F] border border-slate-700/80 rounded-xl p-0.5">
            <button
              type="button"
              onClick={() => onLanguageChange('hi')}
              className={`px-2 py-1 text-[10px] font-bold rounded-lg transition-all ${
                language === 'hi'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              हिन्दी
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange('en')}
              className={`px-2 py-1 text-[10px] font-bold rounded-lg transition-all ${
                language === 'en'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              ENG
            </button>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-3.5">
        {/* Name & Gender Fields */}
        <div className="grid grid-cols-3 gap-2.5">
          <div className="col-span-2">
            <label className="block text-[11px] font-semibold text-slate-300 mb-1 flex items-center gap-1">
              <User size={12} className="text-amber-400" />
              <span>{t.formName}</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={language === 'hi' ? 'जातक का नाम दर्ज करें...' : 'Enter person name...'}
              className="w-full px-3 py-2.5 bg-[#090D17] border border-slate-700/80 focus:border-amber-400 rounded-xl text-xs sm:text-sm text-slate-100 placeholder-slate-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1">
              {t.formGender}
            </label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value as any)}
              className="w-full px-2 py-2.5 bg-[#090D17] border border-slate-700/80 focus:border-amber-400 rounded-xl text-xs sm:text-sm text-slate-100 outline-none cursor-pointer"
            >
              <option value="Male">{language === 'hi' ? 'पुरुष' : 'Male'}</option>
              <option value="Female">{language === 'hi' ? 'स्त्री' : 'Female'}</option>
              <option value="Other">अन्य (Other)</option>
            </select>
          </div>
        </div>

        {/* Date & Time Fields */}
        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1 flex items-center gap-1">
              <Calendar size={12} className="text-amber-400" />
              <span>{t.formDate}</span>
            </label>
            <input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2.5 bg-[#090D17] border border-slate-700/80 focus:border-amber-400 rounded-xl text-xs sm:text-sm text-slate-100 outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1 flex items-center gap-1">
              <Clock size={12} className="text-amber-400" />
              <span>{t.formTime}</span>
            </label>
            <input
              type="time"
              required
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-3 py-2.5 bg-[#090D17] border border-slate-700/80 focus:border-amber-400 rounded-xl text-xs sm:text-sm text-slate-100 outline-none"
            />
          </div>
        </div>

        {/* Place of Birth & Dynamic GPS Search */}
        <div className="relative">
          <div className="flex items-center justify-between mb-1">
            <label className="text-[11px] font-semibold text-slate-300 flex items-center gap-1">
              <MapPin size={12} className="text-amber-400" />
              <span>{t.formPlace}</span>
            </label>
            <button
              type="button"
              onClick={handleUseGPS}
              className="text-[10px] text-amber-300 hover:text-amber-200 flex items-center gap-1 underline"
            >
              <Compass size={11} />
              <span>{gpsLoading ? 'खोज रहे...' : (language === 'hi' ? 'जीपीएस से लें' : 'GPS')}</span>
            </button>
          </div>

          <div className="relative">
            <input
              type="text"
              required
              value={citySearch}
              onChange={(e) => handleCityInput(e.target.value)}
              onFocus={() => {
                if (citySearch.trim()) handleCityInput(citySearch);
              }}
              placeholder={language === 'hi' ? 'शहर या गांव खोजें (उदा. Varanasi, Lucknow)...' : 'Search city or town...'}
              className="w-full pl-8 pr-8 py-2.5 bg-[#090D17] border border-slate-700/80 focus:border-amber-400 rounded-xl text-xs sm:text-sm text-slate-100 placeholder-slate-500 outline-none"
            />
            <Search size={14} className="absolute left-2.5 top-3.5 text-slate-400" />
            {isSearching && (
              <Loader2 size={14} className="absolute right-2.5 top-3.5 text-amber-400 animate-spin" />
            )}
          </div>

          {/* Autocomplete Dropdown */}
          {isDropdownOpen && searchResults.length > 0 && (
            <div className="absolute z-30 left-0 right-0 mt-1 bg-[#090D17] border border-amber-500/40 rounded-xl shadow-2xl max-h-48 overflow-y-auto">
              {searchResults.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => handleSelectLocation(item)}
                  className="px-3 py-2 text-xs hover:bg-amber-500/20 cursor-pointer border-b border-slate-800 last:border-0"
                >
                  <div className="font-semibold text-amber-200">{item.name}</div>
                  <div className="text-[10px] text-slate-400">{item.displayName}</div>
                </div>
              ))}
            </div>
          )}

          {/* Location Coordinates Indicator */}
          {citySearch && (
            <div className="mt-1 flex items-center justify-between text-[10px] text-slate-400 px-1">
              <span>{selectedCoords.latitude}° N, {selectedCoords.longitude}° E</span>
              <span>UTC+{selectedCoords.timezone}</span>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn-gold-primary mt-2"
        >
          <span>☸</span>
          <span>{submitLabel || 'कुंडली तैयार करें एवं देखें'}</span>
        </button>
      </form>
    </div>
  );
};
