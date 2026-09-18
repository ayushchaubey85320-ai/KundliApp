import React, { useState, useRef } from 'react';
import { searchLocations, GeocodingResult } from '../services/geocodingService';
import { MapPin, Calendar, Clock, User, Compass, Sparkles, Search, Loader2 } from 'lucide-react';

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
}

export const BirthDetailsForm: React.FC<BirthDetailsFormProps> = ({
  initialData,
  onSubmit,
  formTitle = 'जन्म विवरण प्रविष्ट करें (Enter Birth Details)',
  submitLabel = 'कुंडली बनाएं (Generate Kundli)',
}) => {
  const [name, setName] = useState(initialData?.name || 'आयुष चौबे');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>(initialData?.gender || 'Male');
  const [date, setDate] = useState(initialData?.date || '1998-08-15');
  const [time, setTime] = useState(initialData?.time || '06:30');
  const [citySearch, setCitySearch] = useState(initialData?.cityName || 'Auraiya, Uttar Pradesh');
  const [selectedCoords, setSelectedCoords] = useState<{
    latitude: number;
    longitude: number;
    timezone: number;
    displayName: string;
  }>({
    latitude: initialData?.latitude || 26.4674,
    longitude: initialData?.longitude || 79.5135,
    timezone: initialData?.timezoneOffset || 5.5,
    displayName: initialData?.cityName || 'Auraiya, Uttar Pradesh',
  });

  const [searchResults, setSearchResults] = useState<GeocodingResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [gpsLoading, setGpsLoading] = useState(false);

  const searchTimerRef = useRef<any>(null);

  // Handle text change with debounced dynamic geocoding
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

  // GPS Geolocation auto-detection
  const handleUseGPS = () => {
    if (!navigator.geolocation) {
      alert('आपके ब्राउज़र में जीपीएस लोकेशन उपलब्ध नहीं है।');
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
        setCitySearch(`जीपीएस: ${lat}°, ${lng}°`);
      },
      (err) => {
        setGpsLoading(false);
        alert('जीपीएस लोकेशन प्राप्त नहीं हो सकी: ' + err.message);
      },
      { timeout: 10000 }
    );
  };

  // Quick preset loader
  const loadPreset = (preset: 'auraiya' | 'kashi' | 'ayodhya') => {
    if (preset === 'auraiya') {
      setName('आयुष चौबे');
      setDate('1998-08-15');
      setTime('06:30');
      setSelectedCoords({
        latitude: 26.4674,
        longitude: 79.5135,
        timezone: 5.5,
        displayName: 'Auraiya, Uttar Pradesh',
      });
      setCitySearch('Auraiya, Uttar Pradesh');
    } else if (preset === 'kashi') {
      setName('काशी जातक');
      setDate('1995-10-24');
      setTime('14:45');
      setSelectedCoords({
        latitude: 25.3176,
        longitude: 82.9739,
        timezone: 5.5,
        displayName: 'Varanasi (Kashi), Uttar Pradesh',
      });
      setCitySearch('Varanasi (Kashi), Uttar Pradesh');
    } else if (preset === 'ayodhya') {
      setName('राम जन्म लग्न');
      setDate('2024-01-22');
      setTime('12:29');
      setSelectedCoords({
        latitude: 26.7922,
        longitude: 82.1998,
        timezone: 5.5,
        displayName: 'Ayodhya, Uttar Pradesh',
      });
      setCitySearch('Ayodhya, Uttar Pradesh');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('कृपया जातक का नाम दर्ज करें।');
      return;
    }
    onSubmit({
      name,
      gender,
      date,
      time,
      cityName: citySearch || selectedCoords.displayName,
      latitude: selectedCoords.latitude,
      longitude: selectedCoords.longitude,
      timezoneOffset: selectedCoords.timezone,
    });
  };

  return (
    <div className="bg-[#101726]/95 border border-amber-500/30 rounded-2xl p-4 sm:p-5 shadow-2xl backdrop-blur-md max-w-[430px] mx-auto select-none">
      <div className="flex items-center justify-between pb-3 border-b border-amber-500/20 mb-4">
        <h2 className="text-sm sm:text-base font-bold text-amber-300 font-serif flex items-center gap-1.5">
          <Sparkles size={16} className="text-amber-400" /> {formTitle}
        </h2>
        {/* Quick Location Chips */}
        <div className="flex items-center gap-1.5 text-[11px]">
          <span
            className="cursor-pointer px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 font-semibold"
            onClick={() => loadPreset('auraiya')}
          >
            औरैया
          </span>
          <span
            className="cursor-pointer px-2 py-0.5 rounded bg-slate-800 text-slate-300 hover:bg-slate-700"
            onClick={() => loadPreset('kashi')}
          >
            काशी
          </span>
          <span
            className="cursor-pointer px-2 py-0.5 rounded bg-slate-800 text-slate-300 hover:bg-slate-700"
            onClick={() => loadPreset('ayodhya')}
          >
            अयोध्या
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3.5">
        {/* Name & Gender */}
        <div className="grid grid-cols-3 gap-2.5">
          <div className="col-span-2">
            <label className="block text-xs text-slate-300 mb-1 flex items-center gap-1">
              <User size={12} className="text-amber-400" /> जातक का नाम
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="नाम दर्ज करें..."
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 focus:border-amber-400 rounded-xl text-xs sm:text-sm text-slate-100 placeholder-slate-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs text-slate-300 mb-1">लिंग</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value as any)}
              className="w-full px-2 py-2 bg-slate-900 border border-slate-700 focus:border-amber-400 rounded-xl text-xs sm:text-sm text-slate-100 outline-none"
            >
              <option value="Male">पुरुष</option>
              <option value="Female">स्त्री</option>
              <option value="Other">अन्य</option>
            </select>
          </div>
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <label className="block text-xs text-slate-300 mb-1 flex items-center gap-1">
              <Calendar size={12} className="text-amber-400" /> जन्म तिथि
            </label>
            <input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 focus:border-amber-400 rounded-xl text-xs sm:text-sm text-slate-100 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs text-slate-300 mb-1 flex items-center gap-1">
              <Clock size={12} className="text-amber-400" /> जन्म समय
            </label>
            <input
              type="time"
              required
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 focus:border-amber-400 rounded-xl text-xs sm:text-sm text-slate-100 outline-none"
            />
          </div>
        </div>

        {/* Dynamic Location Search */}
        <div className="relative">
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs text-slate-300 flex items-center gap-1">
              <MapPin size={12} className="text-amber-400" /> जन्म स्थान (जिला/तहसील/गांव)
            </label>
            <button
              type="button"
              onClick={handleUseGPS}
              className="text-[11px] text-amber-300 hover:text-amber-200 flex items-center gap-1 underline"
            >
              <Compass size={11} /> {gpsLoading ? 'स्थान खोज रहे...' : 'जीपीएस'}
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
              placeholder="स्थान खोजें (उदा. Auraiya, Bidhuna, Dibiyapur)..."
              className="w-full pl-8 pr-8 py-2 bg-slate-900 border border-slate-700 focus:border-amber-400 rounded-xl text-xs sm:text-sm text-slate-100 placeholder-slate-500 outline-none"
            />
            <Search size={14} className="absolute left-2.5 top-3 text-slate-400" />
            {isSearching && (
              <Loader2 size={14} className="absolute right-2.5 top-3 text-amber-400 animate-spin" />
            )}
          </div>

          {/* Autocomplete Dropdown */}
          {isDropdownOpen && searchResults.length > 0 && (
            <div className="absolute z-30 left-0 right-0 mt-1 bg-[#0F172A] border border-amber-500/40 rounded-xl shadow-2xl max-h-52 overflow-y-auto">
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

          {/* Coords indicator */}
          <div className="mt-1 flex items-center justify-between text-[10px] text-slate-400 px-1">
            <span>अक्षांश: {selectedCoords.latitude}° N</span>
            <span>देशांतर: {selectedCoords.longitude}° E</span>
            <span>समय: UTC+{selectedCoords.timezone}</span>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="form-gold-btn"
        >
          <span className="text-base">☸</span> {submitLabel}
        </button>
      </form>
    </div>
  );
};
