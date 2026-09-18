import { CITIES } from '../data/cities';

export interface GeocodingResult {
  name: string;
  state: string;
  country: string;
  latitude: number;
  longitude: number;
  timezone: number;
  displayName: string;
}

// Estimate standard timezone from longitude
export const estimateTimezoneFromLongitude = (lng: number, country: string): number => {
  if (country.toLowerCase().includes('india') || (lng >= 68.0 && lng <= 97.5)) {
    return 5.5; // Indian Standard Time (IST)
  }
  // Standard solar zone approx: 15 degrees per hour
  const rawOffset = lng / 15.0;
  return Math.round(rawOffset * 2) / 2; // round to nearest half-hour
};

// Search cities: combines local instant database + live OpenStreetMap Nominatim API
export const searchLocations = async (query: string): Promise<GeocodingResult[]> => {
  const trimmed = query.trim();
  if (!trimmed || trimmed.length < 2) return [];

  const results: GeocodingResult[] = [];
  const qLower = trimmed.toLowerCase();

  // 1. Search local high-speed database first
  const localMatches = CITIES.filter(
    (c) =>
      c.name.toLowerCase().includes(qLower) ||
      c.state.toLowerCase().includes(qLower) ||
      c.country.toLowerCase().includes(qLower)
  );

  for (const c of localMatches) {
    results.push({
      name: c.name,
      state: c.state,
      country: c.country,
      latitude: c.latitude,
      longitude: c.longitude,
      timezone: c.timezone,
      displayName: `${c.name}, ${c.state}, ${c.country}`,
    });
  }

  // 2. Fetch live from OpenStreetMap Nominatim for any village, town, tehsil, or district
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      trimmed
    )}&format=json&addressdetails=1&limit=6`;

    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        'Accept-Language': 'hi,en',
      },
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      for (const item of data) {
        const addr = item.address || {};
        const placeName =
          addr.village ||
          addr.town ||
          addr.city ||
          addr.county ||
          addr.district ||
          item.name ||
          trimmed;
        const stateName = addr.state || '';
        const countryName = addr.country || 'India';
        const lat = parseFloat(parseFloat(item.lat).toFixed(4));
        const lon = parseFloat(parseFloat(item.lon).toFixed(4));

        // Avoid duplicates if coordinates are very close
        const isDuplicate = results.some(
          (r) => Math.abs(r.latitude - lat) < 0.05 && Math.abs(r.longitude - lon) < 0.05
        );

        if (!isDuplicate) {
          results.push({
            name: placeName,
            state: stateName,
            country: countryName,
            latitude: lat,
            longitude: lon,
            timezone: estimateTimezoneFromLongitude(lon, countryName),
            displayName: item.display_name.split(',').slice(0, 3).join(', '),
          });
        }
      }
    }
  } catch (e) {
    // Network or abort error; return local matches gracefully
  }

  return results;
};
