import React, { useState } from 'react';
import { CITIES, City } from '../data/cities';
import { MapPin, Calendar, Clock, User, Compass, Sparkles } from 'lucide-react';

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
  const [name, setName] = useState(initialData?.name || '');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>(initialData?.gender || 'Male');
  const [date, setDate] = useState(initialData?.date || '2000-01-01');
  const [time, setTime] = useState(initialData?.time || '12:00');
  const [citySearch, setCitySearch] = useState(initialData?.cityName || 'Varanasi (Kashi)');
  const [selectedCity, setSelectedCity] = useState<City>(() => {
    return (
      CITIES.find((c) => c.name.toLowerCase().includes(initialData?.cityName.toLowerCase() || 'varanasi')) ||
      CITIES[0]
    );
  });
  const [filteredCities, setFilteredCities] = useState<City[]>([]);
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [gpsLoading, setGpsLoading] = useState(false);

  // Handle city search input
  const handleCitySearchChange = (query: string) => {
    setCitySearch(query);
    if (query.trim().length > 0) {
      const q = query.toLowerCase();
      const matches = CITIES.filter(
        (c) => c.name.toLowerCase().includes(q) || c.state.toLowerCase().includes(q)
      ).slice(0, 7);
      setFilteredCities(matches);
      setIsCityDropdownOpen(true);
    } else {
      setFilteredCities([]);
      setIsCityDropdownOpen(false);
    }
  };

  const selectCity = (city: City) => {
    setSelectedCity(city);
    setCitySearch(`${city.name}, ${city.state}`);
    setIsCityDropdownOpen(false);
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
        const customCity: City = {
          name: 'वर्तमान स्थान (GPS)',
          state: 'Auto-Detected',
          country: 'Local',
          latitude: lat,
          longitude: lng,
          timezone: 5.5,
        };
        setSelectedCity(customCity);
        setCitySearch(`GPS: ${lat}°, ${lng}°`);
      },
      (err) => {
        setGpsLoading(false);
        alert('जीपीएस लोकेशन प्राप्त नहीं हो सकी: ' + err.message);
      },
      { timeout: 10000 }
    );
  };

  // Load Preset Profile
  const loadPreset = (presetName: string) => {
    if (presetName === 'varanasi') {
      setName('आयुष चौबे');
      setDate('1998-08-15');
      setTime('06:30');
      const c = CITIES.find((x) => x.name.includes('Varanasi')) || CITIES[0];
      selectCity(c);
    } else if (presetName === 'delhi') {
      setName('राहुल शर्मा');
      setDate('1995-10-24');
      setTime('14:45');
      const c = CITIES.find((x) => x.name.includes('New Delhi')) || CITIES[0];
      selectCity(c);
    } else if (presetName === 'ayodhya') {
      setName('राम जन्म लग्न');
      setDate('2024-01-22');
      setTime('12:29');
      const c = CITIES.find((x) => x.name.includes('Ayodhya')) || CITIES[0];
      selectCity(c);
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
      cityName: selectedCity.name,
      latitude: selectedCity.latitude,
      longitude: selectedCity.longitude,
      timezoneOffset: selectedCity.timezone,
    });
  };

  return (
    <div className="bg-[#101726]/90 border border-amber-500/30 rounded-2xl p-5 shadow-2xl backdrop-blur-md">
      <div className="flex items-center justify-between pb-3 border-b border-amber-500/20 mb-4">
        <h2 className="text-base font-bold text-amber-300 font-serif flex items-center gap-2">
          <Sparkles size={16} className="text-amber-400" /> {formTitle}
        </h2>
        <div className="flex items-center gap-1 text-[11px] text-amber-200/70">
          <span className="cursor-pointer underline hover:text-amber-300" onClick={() => loadPreset('varanasi')}>
            वाराणसी
          </span>
          <span>•</span>
          <span className="cursor-pointer underline hover:text-amber-300" onClick={() => loadPreset('ayodhya')}>
            अयोध्या
          </span>
          <span>•</span>
          <span className="cursor-pointer underline hover:text-amber-300" onClick={() => loadPreset('delhi')}>
            दिल्ली
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name & Gender */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="sm:col-span-2">
            <label className="block text-xs text-slate-300 mb-1 flex items-center gap-1">
              <User size={12} className="text-amber-400" /> जातक का नाम (Full Name)
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="उदा. आयुष चौबे"
              className="w-full px-3.5 py-2.5 bg-slate-900/90 border border-slate-700 focus:border-amber-400 rounded-xl text-sm text-slate-100 placeholder-slate-500 outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs text-slate-300 mb-1">लिंग (Gender)</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value as any)}
              className="w-full px-3 py-2.5 bg-slate-900/90 border border-slate-700 focus:border-amber-400 rounded-xl text-sm text-slate-100 outline-none cursor-pointer"
            >
              <option value="Male">पुरुष (Male)</option>
              <option value="Female">स्त्री (Female)</option>
              <option value="Other">अन्य (Other)</option>
            </select>
          </div>
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-slate-300 mb-1 flex items-center gap-1">
              <Calendar size={12} className="text-amber-400" /> जन्म तिथि (Birth Date)
            </label>
            <input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-900/90 border border-slate-700 focus:border-amber-400 rounded-xl text-sm text-slate-100 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs text-slate-300 mb-1 flex items-center gap-1">
              <Clock size={12} className="text-amber-400" /> जन्म समय (Birth Time)
            </label>
            <input
              type="time"
              required
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-900/90 border border-slate-700 focus:border-amber-400 rounded-xl text-sm text-slate-100 outline-none"
            />
          </div>
        </div>

        {/* Birth City Autocomplete + GPS */}
        <div className="relative">
          <label className="block text-xs text-slate-300 mb-1 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <MapPin size={12} className="text-amber-400" /> जन्म स्थान (Birth City)
            </span>
            <button
              type="button"
              onClick={handleUseGPS}
              className="text-[11px] text-amber-300 hover:text-amber-200 flex items-center gap-1 underline"
            >
              <Compass size={11} /> {gpsLoading ? 'स्थान खोज रहे हैं...' : 'जीपीएस स्थान लें'}
            </button>
          </label>

          <input
            type="text"
            required
            value={citySearch}
            onChange={(e) => handleCitySearchChange(e.target.value)}
            onFocus={() => {
              if (citySearch.trim()) handleCitySearchChange(citySearch);
            }}
            placeholder="शहर खोजें (उदा. Varanasi, Delhi, Mumbai)..."
            className="w-full px-3.5 py-2.5 bg-slate-900/90 border border-slate-700 focus:border-amber-400 rounded-xl text-sm text-slate-100 placeholder-slate-500 outline-none"
          />

          {/* Autocomplete Dropdown */}
          {isCityDropdownOpen && filteredCities.length > 0 && (
            <div className="absolute z-30 left-0 right-0 mt-1 bg-slate-900 border border-amber-500/30 rounded-xl shadow-2xl max-h-48 overflow-y-auto">
              {filteredCities.map((city, idx) => (
                <div
                  key={idx}
                  onClick={() => selectCity(city)}
                  className="px-3 py-2 text-xs text-slate-200 hover:bg-amber-500/20 cursor-pointer border-b border-slate-800 last:border-0 flex items-center justify-between"
                >
                  <span className="font-medium text-amber-200">{city.name}</span>
                  <span className="text-slate-400 text-[10px]">
                    {city.state}, {city.country}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Display Coordinates summary */}
          <div className="mt-1.5 flex items-center justify-between text-[11px] text-slate-400 px-1">
            <span>अक्षांश: {selectedCity.latitude}° N</span>
            <span>देशांतर: {selectedCity.longitude}° E</span>
            <span>समय क्षेत्र: UTC+{selectedCity.timezone}</span>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3.5 px-4 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-slate-950 font-bold rounded-xl shadow-lg shadow-amber-500/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2 text-sm tracking-wide"
        >
          <span>☸</span> {submitLabel}
        </button>
      </form>
    </div>
  );
};
