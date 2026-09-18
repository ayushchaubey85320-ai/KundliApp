// Krishnamurti Padhdhati (KP System) Calculations
import { KundliResult, toDMS, toSuperscript } from './kundliEngine';
import { NAKSHATRAS, RASHIS, DASHA_ORDER } from './constants';

export interface KPCusp {
  houseNumber: number;
  rashiHi: string;
  degreeStr: string;
  rashiLordHi: string;
  nakshatraNameHi: string;
  nakshatraLordHi: string;
  subLordHi: string;
}

export interface KPPlanet {
  nameHi: string;
  shortCode: string;
  rashiHi: string;
  degreeStr: string;
  rashiLordHi: string;
  nakshatraLordHi: string;
  subLordHi: string;
}

// Calculate Sublord for any 0-360 degree sidereal longitude
export const getKPSubLord = (longitude: number): { nakLord: string; subLord: string } => {
  const nakIndex = Math.floor(longitude / (360 / 27));
  const nakshatra = NAKSHATRAS[nakIndex];
  const nakLord = nakshatra.lord;

  // Elapsed longitude in Nakshatra (0 to 13.33333 degrees)
  const elapsed = longitude % (360 / 27);
  const fraction = elapsed / (360 / 27);

  // KP Sublord divisions: 120 years Vimshottari span
  const dashaYearsMap: Record<string, number> = {
    Ketu: 7,
    Venus: 20,
    Sun: 6,
    Moon: 10,
    Mars: 7,
    Rahu: 18,
    Jupiter: 16,
    Saturn: 19,
    Mercury: 17,
  };

  const startIndex = DASHA_ORDER.indexOf(nakLord);
  let accumulatedRatio = 0;
  let subLord = nakLord;

  for (let i = 0; i < 9; i++) {
    const pKey = DASHA_ORDER[(startIndex + i) % 9];
    const pSpanRatio = dashaYearsMap[pKey] / 120.0;
    if (fraction >= accumulatedRatio && fraction < accumulatedRatio + pSpanRatio) {
      subLord = pKey;
      break;
    }
    accumulatedRatio += pSpanRatio;
  }

  return { nakLord, subLord };
};

const lordToHi: Record<string, string> = {
  Sun: 'सूर्य',
  Moon: 'चन्द्र',
  Mars: 'मंगल',
  Mercury: 'बुध',
  Jupiter: 'गुरु',
  Venus: 'शुक्र',
  Saturn: 'शनि',
  Rahu: 'राहु',
  Ketu: 'केतु',
};

export const calculateKPData = (kundli: KundliResult): { cusps: KPCusp[]; planets: KPPlanet[] } => {
  // 1. Cusps
  const cusps: KPCusp[] = [];
  for (let h = 1; h <= 12; h++) {
    // Placidus / Equal Cusp approximate sidereal longitude
    const cuspLong = (kundli.lagna.longitude + (h - 1) * 30) % 360;
    const rashiIndex = Math.floor(cuspLong / 30);
    const rashi = RASHIS[rashiIndex];
    const dms = toDMS(cuspLong % 30);
    const nakIndex = Math.floor(cuspLong / (360 / 27));
    const nakshatra = NAKSHATRAS[nakIndex];
    const { subLord } = getKPSubLord(cuspLong);

    cusps.push({
      houseNumber: h,
      rashiHi: rashi.nameHi,
      degreeStr: `${dms.deg}°${toSuperscript(dms.min)}'`,
      rashiLordHi: rashi.lordHi,
      nakshatraNameHi: nakshatra.nameHi,
      nakshatraLordHi: nakshatra.lordHi,
      subLordHi: lordToHi[subLord] || subLord,
    });
  }

  // 2. Planets
  const kpPlanets: KPPlanet[] = kundli.planets.map((p) => {
    const { subLord } = getKPSubLord(p.longitude);
    return {
      nameHi: p.nameHi,
      shortCode: p.shortCode,
      rashiHi: p.rashi.nameHi,
      degreeStr: `${p.deg}°${p.degSuperscript}'`,
      rashiLordHi: p.rashi.lordHi,
      nakshatraLordHi: p.nakshatra.lordHi,
      subLordHi: lordToHi[subLord] || subLord,
    };
  });

  return { cusps, planets: kpPlanets };
};
