import { AstroCoordinates, getJulianDay, getJulianCenturies, getLahiriAyanamsha, calculateAscendant, calculateAllPlanets } from './ephemeris';
import { RASHIS, NAKSHATRAS, PLANETS, Rashi, Nakshatra, PlanetDef } from './constants';

export interface CalculatedPlanet {
  key: string;
  nameEn: string;
  nameHi: string;
  abbr: string;
  symbol: string;
  longitude: number; // total sidereal 0-360
  rashi: Rashi;
  rashiDegree: number; // 0 to 30
  deg: number;
  min: number;
  sec: number;
  nakshatra: Nakshatra;
  pada: number; // 1 to 4
  speed: number;
  isRetrograde: boolean;
  isCombust: boolean;
  d1House: number; // 1 to 12
  d9Rashi: Rashi; // Navamsha Rashi
  d9House: number; // Navamsha House from D9 Lagna
  dignity: 'Exalted' | 'Debilitated' | 'Own Sign' | 'Friendly' | 'Neutral' | 'Enemy';
  dignityHi: string;
}

export interface HouseData {
  houseNumber: number; // 1 to 12
  rashi: Rashi;
  planets: CalculatedPlanet[];
}

export interface KundliResult {
  birthDetails: {
    name: string;
    gender: 'Male' | 'Female' | 'Other';
    date: string;
    time: string;
    cityName: string;
    latitude: number;
    longitude: number;
    timezoneOffset: number;
  };
  ayanamsha: number;
  julianDay: number;
  lagna: {
    longitude: number;
    rashi: Rashi;
    deg: number;
    min: number;
    sec: number;
    nakshatra: Nakshatra;
    pada: number;
    d9Rashi: Rashi;
  };
  planets: CalculatedPlanet[];
  d1Houses: HouseData[];
  d9Houses: HouseData[];
}

// Convert 0-30 decimal degrees to deg, min, sec
export const toDMS = (deg: number) => {
  const d = Math.floor(deg);
  const minFloat = (deg - d) * 60;
  const m = Math.floor(minFloat);
  const s = Math.round((minFloat - m) * 60);
  return { deg: d, min: m, sec: s };
};

// Calculate Navamsha sign (1 to 12) based on total longitude (0-360)
export const getNavamshaRashiId = (totalLongitude: number): number => {
  const rashiId = Math.floor(totalLongitude / 30) + 1; // 1 to 12
  const degInRashi = totalLongitude % 30;
  const padaInRashi = Math.floor(degInRashi / (3 + 20 / 60)); // 0 to 8

  let startNavamsha = 1; // Default Aries
  const fireSigns = [1, 5, 9];
  const earthSigns = [2, 6, 10];
  const airSigns = [3, 7, 11];
  const waterSigns = [4, 8, 12];

  if (fireSigns.includes(rashiId)) {
    startNavamsha = 1; // Aries
  } else if (earthSigns.includes(rashiId)) {
    startNavamsha = 10; // Capricorn
  } else if (airSigns.includes(rashiId)) {
    startNavamsha = 7; // Libra
  } else if (waterSigns.includes(rashiId)) {
    startNavamsha = 4; // Cancer
  }

  const finalNavamsha = ((startNavamsha - 1 + padaInRashi) % 12) + 1;
  return finalNavamsha;
};

// Calculate planetary dignity
const getPlanetDignity = (def: PlanetDef, rashiId: number, _degInRashi: number): { dignity: 'Exalted' | 'Debilitated' | 'Own Sign' | 'Friendly' | 'Neutral' | 'Enemy'; dignityHi: string } => {
  if (rashiId === def.exaltedSign) {
    return { dignity: 'Exalted', dignityHi: 'उच्च' };
  }
  if (rashiId === def.debilitatedSign) {
    return { dignity: 'Debilitated', dignityHi: 'नीच' };
  }
  if (def.ownSigns.includes(rashiId)) {
    return { dignity: 'Own Sign', dignityHi: 'स्वक्षेत्री' };
  }

  // Simplified Vedic friendships
  const friendsMap: Record<string, number[]> = {
    Sun: [4, 8, 9, 12],     // Moon, Mars, Jupiter signs
    Moon: [1, 5, 8, 9, 12], // Mars, Sun, Jupiter
    Mars: [5, 4, 9, 12],    // Sun, Moon, Jupiter
    Mercury: [5, 2, 7],     // Sun, Venus
    Jupiter: [5, 4, 1, 8],  // Sun, Moon, Mars
    Venus: [3, 6, 10, 11],  // Mercury, Saturn
    Saturn: [3, 6, 2, 7],   // Mercury, Venus
    Rahu: [3, 6, 2, 7],
    Ketu: [1, 8, 9, 12],
  };

  const enemiesMap: Record<string, number[]> = {
    Sun: [2, 7, 10, 11],
    Moon: [10, 11],
    Mars: [3, 6],
    Mercury: [4],
    Jupiter: [3, 6, 2, 7],
    Venus: [5, 4],
    Saturn: [5, 4, 1, 8],
    Rahu: [5, 4, 1, 8],
    Ketu: [5, 4],
  };

  if (friendsMap[def.key]?.includes(rashiId)) {
    return { dignity: 'Friendly', dignityHi: 'मित्र' };
  }
  if (enemiesMap[def.key]?.includes(rashiId)) {
    return { dignity: 'Enemy', dignityHi: 'शत्रु' };
  }
  return { dignity: 'Neutral', dignityHi: 'सम' };
};

// Main Kundli Calculation function
export const calculateKundli = (
  name: string,
  gender: 'Male' | 'Female' | 'Other',
  birthDate: string, // YYYY-MM-DD
  birthTime: string, // HH:mm or HH:mm:ss
  cityName: string,
  latitude: number,
  longitude: number,
  timezoneOffset: number = 5.5
): KundliResult => {
  const [yearStr, monthStr, dayStr] = birthDate.split('-');
  const [hourStr, minStr, secStr] = birthTime.split(':');

  const coords: AstroCoordinates = {
    year: parseInt(yearStr, 10),
    month: parseInt(monthStr, 10),
    day: parseInt(dayStr, 10),
    hours: parseInt(hourStr, 10) || 0,
    minutes: parseInt(minStr, 10) || 0,
    seconds: parseInt(secStr || '0', 10) || 0,
    timezoneOffset,
    latitude,
    longitude,
  };

  const jd = getJulianDay(coords);
  const T = getJulianCenturies(jd);
  const ayanamsha = getLahiriAyanamsha(T);

  // Ascendant / Lagna
  const lagnaLong = calculateAscendant(coords, jd, T, ayanamsha);
  const lagnaRashiIndex = Math.floor(lagnaLong / 30); // 0 to 11
  const lagnaRashi = RASHIS[lagnaRashiIndex];
  const lagnaDegInRashi = lagnaLong % 30;
  const lagnaDMS = toDMS(lagnaDegInRashi);

  const lagnaNakshatraIndex = Math.floor(lagnaLong / (360 / 27)); // 0 to 26
  const lagnaNakshatra = NAKSHATRAS[lagnaNakshatraIndex];
  const lagnaPada = Math.floor((lagnaLong % (360 / 27)) / (360 / 108)) + 1;
  const lagnaD9RashiId = getNavamshaRashiId(lagnaLong);
  const lagnaD9Rashi = RASHIS[lagnaD9RashiId - 1];

  // Planets
  const rawPlanets = calculateAllPlanets(coords, jd, T, ayanamsha);
  const sunPos = rawPlanets.find((p) => p.key === 'Sun')?.longitude || 0;

  const calculatedPlanets: CalculatedPlanet[] = [];

  for (const raw of rawPlanets) {
    const def = PLANETS.find((p) => p.key === raw.key)!;
    const rashiIndex = Math.floor(raw.longitude / 30);
    const rashi = RASHIS[rashiIndex];
    const rashiDegree = raw.longitude % 30;
    const dms = toDMS(rashiDegree);

    const nakshatraIndex = Math.floor(raw.longitude / (360 / 27));
    const nakshatra = NAKSHATRAS[nakshatraIndex];
    const pada = Math.floor((raw.longitude % (360 / 27)) / (360 / 108)) + 1;

    // D1 House (1 to 12): Equal sign house system from Lagna sign
    const d1House = ((rashi.id - lagnaRashi.id + 12) % 12) + 1;

    // D9 Navamsha
    const d9RashiId = getNavamshaRashiId(raw.longitude);
    const d9Rashi = RASHIS[d9RashiId - 1];
    const d9House = ((d9Rashi.id - lagnaD9Rashi.id + 12) % 12) + 1;

    // Combustion check: within 8-10 degrees of Sun
    let diffWithSun = Math.abs(raw.longitude - sunPos);
    if (diffWithSun > 180) diffWithSun = 360 - diffWithSun;
    const isCombust = raw.key !== 'Sun' && raw.key !== 'Rahu' && raw.key !== 'Ketu' && diffWithSun < 8.5;

    const dignityInfo = getPlanetDignity(def, rashi.id, rashiDegree);

    calculatedPlanets.push({
      key: def.key,
      nameEn: def.nameEn,
      nameHi: def.nameHi,
      abbr: def.abbr,
      symbol: def.symbol,
      longitude: raw.longitude,
      rashi,
      rashiDegree,
      deg: dms.deg,
      min: dms.min,
      sec: dms.sec,
      nakshatra,
      pada,
      speed: raw.speed,
      isRetrograde: raw.isRetrograde,
      isCombust,
      d1House,
      d9Rashi,
      d9House,
      dignity: dignityInfo.dignity,
      dignityHi: dignityInfo.dignityHi,
    });
  }

  // Build D1 Houses structure (1 to 12)
  const d1Houses: HouseData[] = [];
  for (let h = 1; h <= 12; h++) {
    const houseRashiId = ((lagnaRashi.id - 1 + (h - 1)) % 12) + 1;
    const houseRashi = RASHIS[houseRashiId - 1];
    const housePlanets = calculatedPlanets.filter((p) => p.d1House === h);
    d1Houses.push({
      houseNumber: h,
      rashi: houseRashi,
      planets: housePlanets,
    });
  }

  // Build D9 Houses structure (1 to 12)
  const d9Houses: HouseData[] = [];
  for (let h = 1; h <= 12; h++) {
    const houseRashiId = ((lagnaD9Rashi.id - 1 + (h - 1)) % 12) + 1;
    const houseRashi = RASHIS[houseRashiId - 1];
    const housePlanets = calculatedPlanets.filter((p) => p.d9House === h);
    d9Houses.push({
      houseNumber: h,
      rashi: houseRashi,
      planets: housePlanets,
    });
  }

  return {
    birthDetails: {
      name,
      gender,
      date: birthDate,
      time: birthTime,
      cityName,
      latitude,
      longitude,
      timezoneOffset,
    },
    ayanamsha,
    julianDay: jd,
    lagna: {
      longitude: lagnaLong,
      rashi: lagnaRashi,
      deg: lagnaDMS.deg,
      min: lagnaDMS.min,
      sec: lagnaDMS.sec,
      nakshatra: lagnaNakshatra,
      pada: lagnaPada,
      d9Rashi: lagnaD9Rashi,
    },
    planets: calculatedPlanets,
    d1Houses,
    d9Houses,
  };
};
