// Vimshottari Dasha Engine (120-Year Cycle)
import { DASHA_ORDER, PLANETS } from './constants';
import { CalculatedPlanet } from './kundliEngine';

export interface Antardasha {
  planetKey: string;
  nameHi: string;
  nameEn: string;
  startDate: Date;
  endDate: Date;
  durationMonths: number;
}

export interface Mahadasha {
  planetKey: string;
  nameHi: string;
  nameEn: string;
  totalYears: number;
  startDate: Date;
  endDate: Date;
  antardashas: Antardasha[];
  isActive: boolean;
}

export interface DashaOverview {
  activeMahadasha: Mahadasha | null;
  activeAntardasha: Antardasha | null;
  birthDashaLord: string;
  balanceYears: number;
  balanceMonths: number;
  balanceDays: number;
  allMahadashas: Mahadasha[];
}

const getPlanetYears = (key: string): number => {
  const p = PLANETS.find((x) => x.key === key);
  return p ? p.dashaYears : 7;
};

const getPlanetNameHi = (key: string): string => {
  const p = PLANETS.find((x) => x.key === key);
  return p ? p.nameHi : key;
};

const getPlanetNameEn = (key: string): string => {
  const p = PLANETS.find((x) => x.key === key);
  return p ? p.nameEn : key;
};

// Add decimal years to a Date
const addYears = (date: Date, years: number): Date => {
  const result = new Date(date);
  const totalDays = years * 365.2425;
  result.setTime(result.getTime() + totalDays * 24 * 60 * 60 * 1000);
  return result;
};

export const calculateVimshottariDasha = (
  moonPlanet: CalculatedPlanet,
  birthDateStr: string,
  birthTimeStr: string,
  currentDate: Date = new Date()
): DashaOverview => {
  const [yearStr, monthStr, dayStr] = birthDateStr.split('-');
  const [hourStr, minStr] = birthTimeStr.split(':');
  const birthDate = new Date(
    parseInt(yearStr, 10),
    parseInt(monthStr, 10) - 1,
    parseInt(dayStr, 10),
    parseInt(hourStr || '0', 10),
    parseInt(minStr || '0', 10)
  );

  // Nakshatra span is 13° 20' = 13.333333°
  const nakshatraSpan = 360.0 / 27.0;
  const moonNakshatraLord = moonPlanet.nakshatra.lord;
  const elapsedInNakshatra = moonPlanet.longitude % nakshatraSpan;
  const fractionElapsed = elapsedInNakshatra / nakshatraSpan;
  const fractionRemaining = 1.0 - fractionElapsed;

  const initialYears = getPlanetYears(moonNakshatraLord);
  const balanceAtBirth = initialYears * fractionRemaining;

  const balYears = Math.floor(balanceAtBirth);
  const balMonths = Math.floor((balanceAtBirth - balYears) * 12);
  const balDays = Math.floor(((balanceAtBirth - balYears) * 12 - balMonths) * 30.4375);

  const startIndex = DASHA_ORDER.indexOf(moonNakshatraLord);
  const allMahadashas: Mahadasha[] = [];

  let currentStartDate = new Date(birthDate);

  // Generate 9 Mahadashas (covering full 120-year cycle)
  for (let i = 0; i < 9; i++) {
    const planetKey = DASHA_ORDER[(startIndex + i) % DASHA_ORDER.length];
    const fullYears = getPlanetYears(planetKey);
    const duration = i === 0 ? balanceAtBirth : fullYears;
    const endDate = addYears(currentStartDate, duration);

    // Compute Antardashas within this Mahadasha
    const antardashas: Antardasha[] = [];
    const mahaStartIndex = DASHA_ORDER.indexOf(planetKey);
    let antarStartDate = new Date(currentStartDate);

    for (let j = 0; j < 9; j++) {
      const antarKey = DASHA_ORDER[(mahaStartIndex + j) % DASHA_ORDER.length];
      const antarYears = getPlanetYears(antarKey);
      // Formula: Duration in years = (MahaYears * AntarYears) / 120
      // Scale if first dasha has balance
      const baseRatio = (fullYears * antarYears) / 120.0;
      const effectiveDuration = i === 0 ? baseRatio * fractionRemaining : baseRatio;
      const antarEndDate = addYears(antarStartDate, effectiveDuration);

      antardashas.push({
        planetKey: antarKey,
        nameHi: getPlanetNameHi(antarKey),
        nameEn: getPlanetNameEn(antarKey),
        startDate: new Date(antarStartDate),
        endDate: new Date(antarEndDate),
        durationMonths: Math.round(effectiveDuration * 12 * 10) / 10,
      });

      antarStartDate = new Date(antarEndDate);
    }

    const isActive = currentDate >= currentStartDate && currentDate < endDate;

    allMahadashas.push({
      planetKey,
      nameHi: getPlanetNameHi(planetKey),
      nameEn: getPlanetNameEn(planetKey),
      totalYears: fullYears,
      startDate: new Date(currentStartDate),
      endDate: new Date(endDate),
      antardashas,
      isActive,
    });

    currentStartDate = new Date(endDate);
  }

  // Identify currently active Mahadasha & Antardasha
  let activeMahadasha: Mahadasha | null = null;
  let activeAntardasha: Antardasha | null = null;

  for (const md of allMahadashas) {
    if (currentDate >= md.startDate && currentDate <= md.endDate) {
      activeMahadasha = md;
      for (const ad of md.antardashas) {
        if (currentDate >= ad.startDate && currentDate <= ad.endDate) {
          activeAntardasha = ad;
          break;
        }
      }
      break;
    }
  }

  return {
    activeMahadasha,
    activeAntardasha,
    birthDashaLord: moonNakshatraLord,
    balanceYears: balYears,
    balanceMonths: balMonths,
    balanceDays: balDays,
    allMahadashas,
  };
};
