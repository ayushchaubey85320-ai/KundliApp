// High-Precision Vedic Ephemeris & Astronomical Calculation Engine

export interface AstroCoordinates {
  year: number;
  month: number; // 1 to 12
  day: number;
  hours: number; // 0 to 23
  minutes: number;
  seconds: number;
  timezoneOffset: number; // in hours, e.g. +5.5 for IST
  latitude: number; // decimal degrees, North positive
  longitude: number; // decimal degrees, East positive
}

export interface RawPlanetPosition {
  key: string;
  longitude: number; // 0 to 360 degrees sidereal
  speed: number; // degrees per day, negative means retrograde
  isRetrograde: boolean;
}

// Convert degrees to radians and back
export const degToRad = (d: number) => (d * Math.PI) / 180.0;
export const radToDeg = (r: number) => (r * 180.0) / Math.PI;

// Normalize angle to 0 - 360 degrees
export const normalizeDeg = (deg: number): number => {
  let d = deg % 360;
  if (d < 0) d += 360;
  return d;
};

// Calculate Julian Day Number from UTC date and time
export const getJulianDay = (coords: AstroCoordinates): number => {
  // Convert local time to decimal hours UTC
  const decimalLocalHours = coords.hours + coords.minutes / 60.0 + coords.seconds / 3600.0;
  const decimalUTCHours = decimalLocalHours - coords.timezoneOffset;

  let y = coords.year;
  let m = coords.month;
  const d = coords.day + decimalUTCHours / 24.0;

  if (m <= 2) {
    y -= 1;
    m += 12;
  }

  const A = Math.floor(y / 100);
  const B = 2 - A + Math.floor(A / 4);

  const JD = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + d + B - 1524.5;
  return JD;
};

// Calculate Julian Centuries from J2000.0 (JD 2451545.0)
export const getJulianCenturies = (jd: number): number => {
  return (jd - 2451545.0) / 36525.0;
};

// Calculate Lahiri Ayanamsha (Chitra Paksha Ayanamsha)
// Standard formula accepted by Indian Astronomical Ephemeris
export const getLahiriAyanamsha = (T: number): number => {
  // At epoch J2000.0 (2000 Jan 1.5), Lahiri Ayanamsha was 23° 51' 25.53" = 23.857092°
  // Precession rate is approx 50.290966 arcseconds per year = 1.396971° per Julian century
  const baseAyanamsha = 23.857092;
  const precessionRate = 1.396971; // degrees per Julian century
  return normalizeDeg(baseAyanamsha + precessionRate * T);
};

// Calculate Mean Obliquity of the Ecliptic (eps)
export const getObliquity = (T: number): number => {
  // IAU formula in degrees
  const eps = 23.4392911 - 0.0130042 * T - 0.00000016 * T * T + 0.000000504 * T * T * T;
  return eps;
};

// Calculate Greenwich Mean Sidereal Time (GMST) in degrees
export const getGMST = (jd: number, T: number): number => {
  // In degrees: GMST = 280.46061837 + 360.98564736629 * (JD - 2451545.0) + 0.000387933 * T^2 - T^3 / 38710000
  const d = jd - 2451545.0;
  const gmst = 280.46061837 + 360.98564736629 * d + 0.000387933 * T * T - (T * T * T) / 38710000.0;
  return normalizeDeg(gmst);
};

// Calculate Ascendant (Lagna) in Sidereal Zodiac (using Lahiri Ayanamsha)
export const calculateAscendant = (coords: AstroCoordinates, jd: number, T: number, ayanamsha: number): number => {
  const gmst = getGMST(jd, T);
  // Local Sidereal Time = GMST + Geographic Longitude (East is positive)
  const lst = normalizeDeg(gmst + coords.longitude);
  const lstRad = degToRad(lst);

  const eps = degToRad(getObliquity(T));
  const latRad = degToRad(coords.latitude);

  // Tropical Ascendant formula:
  // tan(Asc) = (-cos(LST)) / (sin(LST)*cos(eps) + tan(lat)*sin(eps))
  const numerator = Math.cos(lstRad);
  const denominator = -Math.sin(lstRad) * Math.cos(eps) - Math.tan(latRad) * Math.sin(eps);

  let tropicalAsc = radToDeg(Math.atan2(numerator, denominator));
  tropicalAsc = normalizeDeg(tropicalAsc);

  // Sidereal Ascendant = Tropical Ascendant - Lahiri Ayanamsha
  const siderealAsc = normalizeDeg(tropicalAsc - ayanamsha);
  return siderealAsc;
};

// Solar coordinates (Tropical to Sidereal)
const getSunPosition = (T: number, ayanamsha: number): RawPlanetPosition => {
  const L0 = normalizeDeg(280.46646 + 36000.76983 * T + 0.0003032 * T * T);
  const M = normalizeDeg(357.52911 + 35999.05029 * T - 0.0001537 * T * T);
  const Mrad = degToRad(M);

  // Equation of center
  const C = (1.914602 - 0.004817 * T - 0.000014 * T * T) * Math.sin(Mrad)
          + (0.019993 - 0.000101 * T) * Math.sin(2 * Mrad)
          + 0.000289 * Math.sin(3 * Mrad);

  const trueTropicalLongitude = normalizeDeg(L0 + C);
  const siderealLong = normalizeDeg(trueTropicalLongitude - ayanamsha);

  return {
    key: 'Sun',
    longitude: siderealLong,
    speed: 0.9856, // Sun is always direct ~1 deg/day
    isRetrograde: false,
  };
};

// Lunar coordinates (Meeus algorithm simplified for high Vedic accuracy)
const getMoonPosition = (T: number, ayanamsha: number): RawPlanetPosition => {
  // Mean Moon longitude
  const Lp = normalizeDeg(218.3164477 + 481267.88123421 * T - 0.0015786 * T * T);
  // Mean elongation of Moon
  const D = normalizeDeg(297.8501921 + 445267.1114034 * T - 0.0018819 * T * T);
  // Sun's mean anomaly
  const M = normalizeDeg(357.5291092 + 35999.0502909 * T - 0.0001536 * T * T);
  // Moon's mean anomaly
  const Mp = normalizeDeg(134.9633964 + 477198.8675055 * T + 0.0087414 * T * T);
  // Moon's argument of latitude
  const F = normalizeDeg(93.2720950 + 483202.0175233 * T - 0.0036539 * T * T);

  const Drad = degToRad(D);
  const Mrad = degToRad(M);
  const Mprad = degToRad(Mp);
  const Frad = degToRad(F);

  // Principal periodic terms in Moon's longitude
  const dLong = 6.288774 * Math.sin(Mprad)
              + 1.274027 * Math.sin(2 * Drad - Mprad)
              + 0.658314 * Math.sin(2 * Drad)
              + 0.213618 * Math.sin(2 * Mprad)
              - 0.185116 * Math.sin(Mrad)
              - 0.114332 * Math.sin(2 * Frad)
              + 0.058793 * Math.sin(2 * Drad - 2 * Mprad)
              + 0.057066 * Math.sin(2 * Drad - Mrad - Mprad)
              + 0.053322 * Math.sin(2 * Drad + Mprad);

  const tropicalMoon = normalizeDeg(Lp + dLong);
  const siderealMoon = normalizeDeg(tropicalMoon - ayanamsha);

  return {
    key: 'Moon',
    longitude: siderealMoon,
    speed: 13.176, // Moon moves ~13.2 deg/day direct
    isRetrograde: false,
  };
};

// Lunar Nodes: Rahu (True/Mean North Node) & Ketu (South Node)
const getNodes = (T: number, ayanamsha: number): { rahu: RawPlanetPosition; ketu: RawPlanetPosition } => {
  // Mean longitude of the ascending node
  const Omega = normalizeDeg(125.04452 - 1934.136261 * T + 0.0020708 * T * T);
  const siderealRahu = normalizeDeg(Omega - ayanamsha);
  const siderealKetu = normalizeDeg(siderealRahu + 180.0);

  return {
    rahu: {
      key: 'Rahu',
      longitude: siderealRahu,
      speed: -0.0529, // Rahu/Ketu always move retrograde in mean motion
      isRetrograde: true,
    },
    ketu: {
      key: 'Ketu',
      longitude: siderealKetu,
      speed: -0.0529,
      isRetrograde: true,
    },
  };
};

// Planetary orbital elements structure
interface OrbitalElements {
  a: number; // semi-major axis (AU)
  e0: number; e_rate: number; // eccentricity
  i0: number; i_rate: number; // inclination (deg)
  l0: number; l_rate: number; // mean longitude (deg)
  w0: number; w_rate: number; // longitude of perihelion (deg)
  node0: number; node_rate: number; // longitude of ascending node (deg)
}

const PLANETARY_ELEMENTS: Record<string, OrbitalElements> = {
  Mercury: { a: 0.38709927, e0: 0.20563593, e_rate: 0.00001906, i0: 7.00497902, i_rate: -0.00594749, l0: 252.25032350, l_rate: 149472.67411175, w0: 77.45779628, w_rate: 0.16047689, node0: 48.33076593, node_rate: -0.12534081 },
  Venus:   { a: 0.72333566, e0: 0.00677672, e_rate: -0.00004107, i0: 3.39467605, i_rate: -0.00078890, l0: 181.97909950, l_rate: 58517.81538729, w0: 131.60246718, w_rate: 0.00268329, node0: 76.67984255, node_rate: -0.27769418 },
  Mars:    { a: 1.52371034, e0: 0.09339410, e_rate: 0.00007882, i0: 1.84969142, i_rate: -0.00813131, l0: -4.55343205, l_rate: 19140.30268499, w0: -23.94362959, w_rate: 0.44441088, node0: 49.55953891, node_rate: -0.29257343 },
  Jupiter: { a: 5.20288700, e0: 0.04838624, e_rate: -0.00013253, i0: 1.30439695, i_rate: -0.00183714, l0: 34.39644051, l_rate: 3034.74612775, w0: 14.72847983, w_rate: 0.21252668, node0: 100.47390909, node_rate: 0.20469106 },
  Saturn:  { a: 9.53667594, e0: 0.05386179, e_rate: -0.00050991, i0: 2.48599187, i_rate: 0.00193609, l0: 49.95424423, l_rate: 1222.49362201, w0: 92.59887831, w_rate: -0.41897216, node0: 113.66242448, node_rate: -0.28867794 },
};

// Calculate Geocentric Tropical Longitude for superior & inferior planets
const calculatePlanetGeocentric = (planetKey: string, T: number): number => {
  const elem = PLANETARY_ELEMENTS[planetKey];
  if (!elem) return 0;

  // Earth elements for geocentric conversion
  const aE = 1.00000261;
  const eE = 0.01671123 - 0.00004392 * T;
  const lE = normalizeDeg(100.46457166 + 35999.37244981 * T);
  const wE = normalizeDeg(102.93768193 + 0.32327364 * T);
  const ME = normalizeDeg(lE - wE);
  const MErad = degToRad(ME);

  // Earth true anomaly & heliocentric coords
  const vE = ME + (2 * eE - (eE * eE * eE) / 4) * Math.sin(MErad) * (180 / Math.PI)
                + (5 / 4) * eE * eE * Math.sin(2 * MErad) * (180 / Math.PI);
  const rE = aE * (1 - eE * eE) / (1 + eE * Math.cos(degToRad(vE)));
  const lEarth = normalizeDeg(vE + wE);
  const xEarth = rE * Math.cos(degToRad(lEarth));
  const yEarth = rE * Math.sin(degToRad(lEarth));

  // Planet elements
  const e = elem.e0 + elem.e_rate * T;
  const l = normalizeDeg(elem.l0 + elem.l_rate * T);
  const w = normalizeDeg(elem.w0 + elem.w_rate * T);
  const M = normalizeDeg(l - w);
  const Mrad = degToRad(M);

  // Planet true anomaly & heliocentric radius
  const v = M + (2 * e - (e * e * e) / 4) * Math.sin(Mrad) * (180 / Math.PI)
              + (5 / 4) * e * e * Math.sin(2 * Mrad) * (180 / Math.PI);
  const r = elem.a * (1 - e * e) / (1 + e * Math.cos(degToRad(v)));
  const lPlanet = normalizeDeg(v + w);
  const xPlanet = r * Math.cos(degToRad(lPlanet));
  const yPlanet = r * Math.sin(degToRad(lPlanet));

  // Geocentric coordinates (Planet minus Earth)
  const xGeo = xPlanet - xEarth;
  const yGeo = yPlanet - yEarth;

  let geoLong = radToDeg(Math.atan2(yGeo, xGeo));
  return normalizeDeg(geoLong);
};

// Calculate all 9 Grahas positions and retrograde status
export const calculateAllPlanets = (_coords: AstroCoordinates, _jd: number, T: number, ayanamsha: number): RawPlanetPosition[] => {
  const dt = 0.001; // small time step in centuries (~0.36 days) to determine velocity & retrograde
  const T2 = T + dt;
  const ayan2 = getLahiriAyanamsha(T2);

  const sun = getSunPosition(T, ayanamsha);
  const moon = getMoonPosition(T, ayanamsha);
  const { rahu, ketu } = getNodes(T, ayanamsha);

  const planets: RawPlanetPosition[] = [sun, moon];

  const taras = ['Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'];
  for (const key of taras) {
    const long1 = normalizeDeg(calculatePlanetGeocentric(key, T) - ayanamsha);
    const long2 = normalizeDeg(calculatePlanetGeocentric(key, T2) - ayan2);

    let delta = long2 - long1;
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;

    const speed = delta / (dt * 36525.0); // degrees per day
    const isRetrograde = speed < 0;

    planets.push({
      key,
      longitude: long1,
      speed,
      isRetrograde,
    });
  }

  planets.push(rahu);
  planets.push(ketu);

  return planets;
};
