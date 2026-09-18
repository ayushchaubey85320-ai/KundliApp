// Vedic Astrology Constants

export interface Rashi {
  id: number; // 1 to 12
  nameEn: string;
  nameHi: string;
  lord: string;
  lordHi: string;
  element: 'Fire' | 'Earth' | 'Air' | 'Water';
  elementHi: string;
  symbol: string;
}

export const RASHIS: Rashi[] = [
  { id: 1, nameEn: 'Aries', nameHi: 'मेष', lord: 'Mars', lordHi: 'मंगल', element: 'Fire', elementHi: 'अग्नि', symbol: '♈' },
  { id: 2, nameEn: 'Taurus', nameHi: 'वृषभ', lord: 'Venus', lordHi: 'शुक्र', element: 'Earth', elementHi: 'पृथ्वी', symbol: '♉' },
  { id: 3, nameEn: 'Gemini', nameHi: 'मिथुन', lord: 'Mercury', lordHi: 'बुध', element: 'Air', elementHi: 'वायु', symbol: '♊' },
  { id: 4, nameEn: 'Cancer', nameHi: 'कर्क', lord: 'Moon', lordHi: 'चंद्र', element: 'Water', elementHi: 'जल', symbol: '♋' },
  { id: 5, nameEn: 'Leo', nameHi: 'सिंह', lord: 'Sun', lordHi: 'सूर्य', element: 'Fire', elementHi: 'अग्नि', symbol: '♌' },
  { id: 6, nameEn: 'Virgo', nameHi: 'कन्या', lord: 'Mercury', lordHi: 'बुध', element: 'Earth', elementHi: 'पृथ्वी', symbol: '♍' },
  { id: 7, nameEn: 'Libra', nameHi: 'तुला', lord: 'Venus', lordHi: 'शुक्र', element: 'Air', elementHi: 'वायु', symbol: '♎' },
  { id: 8, nameEn: 'Scorpio', nameHi: 'वृश्चिक', lord: 'Mars', lordHi: 'मंगल', element: 'Water', elementHi: 'जल', symbol: '♏' },
  { id: 9, nameEn: 'Sagittarius', nameHi: 'धनु', lord: 'Jupiter', lordHi: 'बृहस्पति', element: 'Fire', elementHi: 'अग्नि', symbol: '♐' },
  { id: 10, nameEn: 'Capricorn', nameHi: 'मकर', lord: 'Saturn', lordHi: 'शनि', element: 'Earth', elementHi: 'पृथ्वी', symbol: '♑' },
  { id: 11, nameEn: 'Aquarius', nameHi: 'कुंभ', lord: 'Saturn', lordHi: 'शनि', element: 'Air', elementHi: 'वायु', symbol: '♒' },
  { id: 12, nameEn: 'Pisces', nameHi: 'मीन', lord: 'Jupiter', lordHi: 'बृहस्पति', element: 'Water', elementHi: 'जल', symbol: '♓' },
];

export interface Nakshatra {
  id: number; // 1 to 27
  nameEn: string;
  nameHi: string;
  lord: string;
  lordHi: string;
  deity: string;
  deityHi: string;
  gana: 'Deva' | 'Manushya' | 'Rakshasa';
  ganaHi: string;
  yoni: string;
  yoniHi: string;
  nadi: 'Adi' | 'Madhya' | 'Antya';
  nadiHi: string;
  varna: 'Brahmin' | 'Kshatriya' | 'Vaishya' | 'Shudra';
  varnaHi: string;
  vashya: string;
}

export const NAKSHATRAS: Nakshatra[] = [
  { id: 1, nameEn: 'Ashwini', nameHi: 'अश्विनी', lord: 'Ketu', lordHi: 'केतु', deity: 'Ashwini Kumaras', deityHi: 'अश्विनी कुमार', gana: 'Deva', ganaHi: 'देव', yoni: 'Horse', yoniHi: 'अश्व', nadi: 'Adi', nadiHi: 'आदि', varna: 'Kshatriya', varnaHi: 'क्षत्रिय', vashya: 'Chatushpada' },
  { id: 2, nameEn: 'Bharani', nameHi: 'भरणी', lord: 'Venus', lordHi: 'शुक्र', deity: 'Yama', deityHi: 'यम', gana: 'Manushya', ganaHi: 'मनुष्य', yoni: 'Elephant', yoniHi: 'गज', nadi: 'Madhya', nadiHi: 'मध्य', varna: 'Kshatriya', varnaHi: 'क्षत्रिय', vashya: 'Chatushpada' },
  { id: 3, nameEn: 'Krittika', nameHi: 'कृत्तिका', lord: 'Sun', lordHi: 'सूर्य', deity: 'Agni', deityHi: 'अग्नि', gana: 'Rakshasa', ganaHi: 'राक्षस', yoni: 'Sheep', yoniHi: 'मेष', nadi: 'Antya', nadiHi: 'अंत्य', varna: 'Brahmin', varnaHi: 'ब्राह्मण', vashya: 'Chatushpada' },
  { id: 4, nameEn: 'Rohini', nameHi: 'रोहिणी', lord: 'Moon', lordHi: 'चंद्र', deity: 'Brahma', deityHi: 'ब्रह्मा', gana: 'Manushya', ganaHi: 'मनुष्य', yoni: 'Serpent', yoniHi: 'सर्प', nadi: 'Antya', nadiHi: 'अंत्य', varna: 'Shudra', varnaHi: 'शूद्र', vashya: 'Chatushpada' },
  { id: 5, nameEn: 'Mrigashira', nameHi: 'मृगशिरा', lord: 'Mars', lordHi: 'मंगल', deity: 'Soma', deityHi: 'सोम', gana: 'Deva', ganaHi: 'देव', yoni: 'Serpent', yoniHi: 'सर्प', nadi: 'Madhya', nadiHi: 'मध्य', varna: 'Vaishya', varnaHi: 'वैश्य', vashya: 'Chatushpada' },
  { id: 6, nameEn: 'Ardra', nameHi: 'आर्द्रा', lord: 'Rahu', lordHi: 'राहु', deity: 'Rudra', deityHi: 'रुद्र', gana: 'Manushya', ganaHi: 'मनुष्य', yoni: 'Dog', yoniHi: 'श्वान', nadi: 'Adi', nadiHi: 'आदि', varna: 'Shudra', varnaHi: 'शूद्र', vashya: 'Manava' },
  { id: 7, nameEn: 'Punarvasu', nameHi: 'पुनर्वसु', lord: 'Jupiter', lordHi: 'बृहस्पति', deity: 'Aditi', deityHi: 'अदिति', gana: 'Deva', ganaHi: 'देव', yoni: 'Cat', yoniHi: 'मार्जार', nadi: 'Adi', nadiHi: 'आदि', varna: 'Vaishya', varnaHi: 'वैश्य', vashya: 'Manava' },
  { id: 8, nameEn: 'Pushya', nameHi: 'पुष्य', lord: 'Saturn', lordHi: 'शनि', deity: 'Brihaspati', deityHi: 'बृहस्पति', gana: 'Deva', ganaHi: 'देव', yoni: 'Goat', yoniHi: 'मेष', nadi: 'Madhya', nadiHi: 'मध्य', varna: 'Kshatriya', varnaHi: 'क्षत्रिय', vashya: 'Jalachara' },
  { id: 9, nameEn: 'Ashlesha', nameHi: 'अश्लेषा', lord: 'Mercury', lordHi: 'बुध', deity: 'Nagas', deityHi: 'नाग', gana: 'Rakshasa', ganaHi: 'राक्षस', yoni: 'Cat', yoniHi: 'मार्जार', nadi: 'Antya', nadiHi: 'अंत्य', varna: 'Shudra', varnaHi: 'शूद्र', vashya: 'Jalachara' },
  { id: 10, nameEn: 'Magha', nameHi: 'मघा', lord: 'Ketu', lordHi: 'केतु', deity: 'Pitris', deityHi: 'पितृ', gana: 'Rakshasa', ganaHi: 'राक्षस', yoni: 'Rat', yoniHi: 'मूषक', nadi: 'Antya', nadiHi: 'अंत्य', varna: 'Shudra', varnaHi: 'शूद्र', vashya: 'Vanchara' },
  { id: 11, nameEn: 'Purva Phalguni', nameHi: 'पूर्वा फाल्गुनी', lord: 'Venus', lordHi: 'शुक्र', deity: 'Bhaga', deityHi: 'भग', gana: 'Manushya', ganaHi: 'मनुष्य', yoni: 'Rat', yoniHi: 'मूषक', nadi: 'Madhya', nadiHi: 'मध्य', varna: 'Brahmin', varnaHi: 'ब्राह्मण', vashya: 'Vanchara' },
  { id: 12, nameEn: 'Uttara Phalguni', nameHi: 'उत्तरा फाल्गुनी', lord: 'Sun', lordHi: 'सूर्य', deity: 'Aryaman', deityHi: 'अर्यमन्', gana: 'Manushya', ganaHi: 'मनुष्य', yoni: 'Cow', yoniHi: 'गौ', nadi: 'Adi', nadiHi: 'आदि', varna: 'Kshatriya', varnaHi: 'क्षत्रिय', vashya: 'Manava' },
  { id: 13, nameEn: 'Hasta', nameHi: 'हस्त', lord: 'Moon', lordHi: 'चंद्र', deity: 'Savitr', deityHi: 'सवितृ', gana: 'Deva', ganaHi: 'देव', yoni: 'Buffalo', yoniHi: 'महिष', nadi: 'Adi', nadiHi: 'आदि', varna: 'Vaishya', varnaHi: 'वैश्य', vashya: 'Manava' },
  { id: 14, nameEn: 'Chitra', nameHi: 'चित्रा', lord: 'Mars', lordHi: 'मंगल', deity: 'Vishvakarma', deityHi: 'विश्वकर्मा', gana: 'Rakshasa', ganaHi: 'राक्षस', yoni: 'Tiger', yoniHi: 'व्याघ्र', nadi: 'Madhya', nadiHi: 'मध्य', varna: 'Shudra', varnaHi: 'शूद्र', vashya: 'Manava' },
  { id: 15, nameEn: 'Swati', nameHi: 'स्वाति', lord: 'Rahu', lordHi: 'राहु', deity: 'Vayu', deityHi: 'वायु', gana: 'Deva', ganaHi: 'देव', yoni: 'Buffalo', yoniHi: 'महिष', nadi: 'Antya', nadiHi: 'अंत्य', varna: 'Shudra', varnaHi: 'शूद्र', vashya: 'Manava' },
  { id: 16, nameEn: 'Vishakha', nameHi: 'विशाखा', lord: 'Jupiter', lordHi: 'बृहस्पति', deity: 'Indragni', deityHi: 'इंद्राग्नि', gana: 'Rakshasa', ganaHi: 'राक्षस', yoni: 'Tiger', yoniHi: 'व्याघ्र', nadi: 'Antya', nadiHi: 'अंत्य', varna: 'Brahmin', varnaHi: 'ब्राह्मण', vashya: 'Manava' },
  { id: 17, nameEn: 'Anuradha', nameHi: 'अनुराधा', lord: 'Saturn', lordHi: 'शनि', deity: 'Mitra', deityHi: 'मित्र', gana: 'Deva', ganaHi: 'देव', yoni: 'Deer', yoniHi: 'मृग', nadi: 'Madhya', nadiHi: 'मध्य', varna: 'Kshatriya', varnaHi: 'क्षत्रिय', vashya: 'Keeta' },
  { id: 18, nameEn: 'Jyeshtha', nameHi: 'ज्येष्ठा', lord: 'Mercury', lordHi: 'बुध', deity: 'Indra', deityHi: 'इंद्र', gana: 'Rakshasa', ganaHi: 'राक्षस', yoni: 'Deer', yoniHi: 'मृग', nadi: 'Adi', nadiHi: 'आदि', varna: 'Vaishya', varnaHi: 'वैश्य', vashya: 'Keeta' },
  { id: 19, nameEn: 'Mula', nameHi: 'मूल', lord: 'Ketu', lordHi: 'केतु', deity: 'Nirriti', deityHi: 'निर्ऋति', gana: 'Rakshasa', ganaHi: 'राक्षस', yoni: 'Dog', yoniHi: 'श्वान', nadi: 'Adi', nadiHi: 'आदि', varna: 'Shudra', varnaHi: 'शूद्र', vashya: 'Manava' },
  { id: 20, nameEn: 'Purva Ashadha', nameHi: 'पूर्वाषाढ़ा', lord: 'Venus', lordHi: 'शुक्र', deity: 'Apas', deityHi: 'आपः', gana: 'Manushya', ganaHi: 'मनुष्य', yoni: 'Monkey', yoniHi: 'वानर', nadi: 'Madhya', nadiHi: 'मध्य', varna: 'Brahmin', varnaHi: 'ब्राह्मण', vashya: 'Manava' },
  { id: 21, nameEn: 'Uttara Ashadha', nameHi: 'उत्तराषाढ़ा', lord: 'Sun', lordHi: 'सूर्य', deity: 'Vishvedevas', deityHi: 'विश्वेदेव', gana: 'Manushya', ganaHi: 'मनुष्य', yoni: 'Mongoose', yoniHi: 'नकुल', nadi: 'Antya', nadiHi: 'अंत्य', varna: 'Kshatriya', varnaHi: 'क्षत्रिय', vashya: 'Manava' },
  { id: 22, nameEn: 'Shravana', nameHi: 'श्रवण', lord: 'Moon', lordHi: 'चंद्र', deity: 'Vishnu', deityHi: 'विष्णु', gana: 'Deva', ganaHi: 'देव', yoni: 'Monkey', yoniHi: 'वानर', nadi: 'Antya', nadiHi: 'अंत्य', varna: 'Shudra', varnaHi: 'शूद्र', vashya: 'Chatushpada' },
  { id: 23, nameEn: 'Dhanishta', nameHi: 'धनिष्ठा', lord: 'Mars', lordHi: 'मंगल', deity: 'Vasus', deityHi: 'वसु', gana: 'Rakshasa', ganaHi: 'राक्षस', yoni: 'Lion', yoniHi: 'सिंह', nadi: 'Madhya', nadiHi: 'मध्य', varna: 'Vaishya', varnaHi: 'वैश्य', vashya: 'Chatushpada' },
  { id: 24, nameEn: 'Shatabhisha', nameHi: 'शतभिषा', lord: 'Rahu', lordHi: 'राहु', deity: 'Varuna', deityHi: 'वरुण', gana: 'Rakshasa', ganaHi: 'राक्षस', yoni: 'Horse', yoniHi: 'अश्व', nadi: 'Adi', nadiHi: 'आदि', varna: 'Shudra', varnaHi: 'शूद्र', vashya: 'Manava' },
  { id: 25, nameEn: 'Purva Bhadrapada', nameHi: 'पूर्वाभाद्रपद', lord: 'Jupiter', lordHi: 'बृहस्पति', deity: 'Aja Ekapada', deityHi: 'अज एकपाद', gana: 'Manushya', ganaHi: 'मनुष्य', yoni: 'Lion', yoniHi: 'सिंह', nadi: 'Adi', nadiHi: 'आदि', varna: 'Brahmin', varnaHi: 'ब्राह्मण', vashya: 'Manava' },
  { id: 26, nameEn: 'Uttara Bhadrapada', nameHi: 'उत्तराभाद्रपद', lord: 'Saturn', lordHi: 'शनि', deity: 'Ahirbudhnya', deityHi: 'अहिर्बुध्न्य', gana: 'Manushya', ganaHi: 'मनुष्य', yoni: 'Cow', yoniHi: 'गौ', nadi: 'Madhya', nadiHi: 'मध्य', varna: 'Kshatriya', varnaHi: 'क्षत्रिय', vashya: 'Jalachara' },
  { id: 27, nameEn: 'Revati', nameHi: 'रेवती', lord: 'Mercury', lordHi: 'बुध', deity: 'Pushan', deityHi: 'पूषन', gana: 'Deva', ganaHi: 'देव', yoni: 'Elephant', yoniHi: 'गज', nadi: 'Antya', nadiHi: 'अंत्य', varna: 'Shudra', varnaHi: 'शूद्र', vashya: 'Jalachara' },
];

export interface PlanetDef {
  key: string;
  nameEn: string;
  nameHi: string;
  shortCode: string; // Exact Hindi glyph for chart: सू, च, मं, etc.
  abbr: string;
  symbol: string;
  dashaYears: number;
  exaltedSign: number; // 1 to 12
  exaltedDegree: number;
  debilitatedSign: number;
  debilitatedDegree: number;
  ownSigns: number[];
  chartColor: string; // Vibrant color matching classical chart screenshot
  isBenefic: boolean;
}

export const PLANETS: PlanetDef[] = [
  { key: 'Sun', nameEn: 'Sun', nameHi: 'सूर्य', shortCode: 'सू', abbr: 'Su', symbol: '☉', dashaYears: 6, exaltedSign: 1, exaltedDegree: 10, debilitatedSign: 7, debilitatedDegree: 10, ownSigns: [5], chartColor: '#EF4444', isBenefic: true },
  { key: 'Moon', nameEn: 'Moon', nameHi: 'चन्द्र', shortCode: 'च', abbr: 'Mo', symbol: '☽', dashaYears: 10, exaltedSign: 2, exaltedDegree: 3, debilitatedSign: 8, debilitatedDegree: 3, ownSigns: [4], chartColor: '#DC2626', isBenefic: true },
  { key: 'Mars', nameEn: 'Mars', nameHi: 'मंगल', shortCode: 'मं', abbr: 'Ma', symbol: '♂', dashaYears: 7, exaltedSign: 10, exaltedDegree: 28, debilitatedSign: 4, debilitatedDegree: 28, ownSigns: [1, 8], chartColor: '#10B981', isBenefic: false },
  { key: 'Mercury', nameEn: 'Mercury', nameHi: 'बुध', shortCode: 'बु', abbr: 'Me', symbol: '☿', dashaYears: 17, exaltedSign: 6, exaltedDegree: 15, debilitatedSign: 12, debilitatedDegree: 15, ownSigns: [3, 6], chartColor: '#38BDF8', isBenefic: true },
  { key: 'Jupiter', nameEn: 'Jupiter', nameHi: 'बृहस्पति', shortCode: 'गु', abbr: 'Ju', symbol: '♃', dashaYears: 16, exaltedSign: 4, exaltedDegree: 5, debilitatedSign: 10, debilitatedDegree: 5, ownSigns: [9, 12], chartColor: '#C084FC', isBenefic: true },
  { key: 'Venus', nameEn: 'Venus', nameHi: 'शुक्र', shortCode: 'शु', abbr: 'Ve', symbol: '♀', dashaYears: 20, exaltedSign: 12, exaltedDegree: 27, debilitatedSign: 6, debilitatedDegree: 27, ownSigns: [2, 7], chartColor: '#4ADE80', isBenefic: true },
  { key: 'Saturn', nameEn: 'Saturn', nameHi: 'शनि', shortCode: 'श', abbr: 'Sa', symbol: '♄', dashaYears: 19, exaltedSign: 7, exaltedDegree: 20, debilitatedSign: 1, debilitatedDegree: 20, ownSigns: [10, 11], chartColor: '#F97316', isBenefic: false },
  { key: 'Rahu', nameEn: 'Rahu', nameHi: 'राहु', shortCode: 'रा', abbr: 'Ra', symbol: '☊', dashaYears: 18, exaltedSign: 2, exaltedDegree: 20, debilitatedSign: 8, debilitatedDegree: 20, ownSigns: [11], chartColor: '#FBBF24', isBenefic: false },
  { key: 'Ketu', nameEn: 'Ketu', nameHi: 'केतु', shortCode: 'के', abbr: 'Ke', symbol: '☋', dashaYears: 7, exaltedSign: 8, exaltedDegree: 20, debilitatedSign: 2, debilitatedDegree: 20, ownSigns: [8], chartColor: '#F59E0B', isBenefic: false },
];

export const DASHA_ORDER = ['Ketu', 'Venus', 'Sun', 'Moon', 'Mars', 'Rahu', 'Jupiter', 'Saturn', 'Mercury'];

export interface BhavaInfo {
  houseNumber: number;
  nameHi: string;
  nameEn: string;
  karaka: string;
  karakaHi: string;
  significanceEn: string;
  significanceHi: string;
}

export const BHAVAS: BhavaInfo[] = [
  { houseNumber: 1, nameHi: 'तनु भाव (लग्न)', nameEn: 'Lagna / Ascendant', karaka: 'Sun', karakaHi: 'सूर्य', significanceEn: 'Self, Body, Health, Personality, Vitality', significanceHi: 'शरीर, रूप, स्वास्थ्य, स्वभाव, आत्मविश्वास' },
  { houseNumber: 2, nameHi: 'धन भाव', nameEn: 'Dhana Bhava', karaka: 'Jupiter', karakaHi: 'बृहस्पति', significanceEn: 'Wealth, Family, Speech, Assets, Food', significanceHi: 'धन, कुटुंब, वाणी, संचित संपत्ति, खानपान' },
  { houseNumber: 3, nameHi: 'सहज भाव (पराक्रम)', nameEn: 'Sahaja Bhava', karaka: 'Mars', karakaHi: 'मंगल', significanceEn: 'Siblings, Courage, Valor, Short Journeys, Communication', significanceHi: 'छोटे भाई-बहन, पराक्रम, साहस, छोटी यात्राएं, कला' },
  { houseNumber: 4, nameHi: 'सुख भाव (मातृ)', nameEn: 'Sukha Bhava', karaka: 'Moon', karakaHi: 'चंद्र', significanceEn: 'Mother, Home, Vehicles, Comforts, Happiness, Property', significanceHi: 'माता, घर, भूमि, वाहन, मानसिक शांति, सुख-सुविधाएं' },
  { houseNumber: 5, nameHi: 'पुत्र भाव (संतान/विद्या)', nameEn: 'Putra Bhava', karaka: 'Jupiter', karakaHi: 'बृहस्पति', significanceEn: 'Children, Intelligence, Education, Past Merits, Speculation', significanceHi: 'संतान, उच्च विद्या, बुद्धि, पूर्व पुण्य, मंत्र, रचनात्मकता' },
  { houseNumber: 6, nameHi: 'रिपु/शत्रु भाव (रोग/ऋण)', nameEn: 'Ari Bhava', karaka: 'Mars / Saturn', karakaHi: 'मंगल/शनि', significanceEn: 'Enemies, Debts, Diseases, Obstacles, Daily Work, Competition', significanceHi: 'शत्रु, रोग, ऋण, कोर्ट-कचहरी, प्रतियोगिता, सेवा भाव' },
  { houseNumber: 7, nameHi: 'युवति/कलत्र भाव (विवाह/साझेदारी)', nameEn: 'Yuvati Bhava', karaka: 'Venus', karakaHi: 'शुक्र', significanceEn: 'Spouse, Marriage, Business Partnerships, Public Relations', significanceHi: 'जीवनसाथी, वैवाहिक सुख, व्यापारिक साझेदारी, जनसंपर्क' },
  { houseNumber: 8, nameHi: 'आयु/रन्ध्र भाव', nameEn: 'Randhra Bhava', karaka: 'Saturn', karakaHi: 'शनि', significanceEn: 'Longevity, Sudden Events, Occult, Research, Transformations', significanceHi: 'आयु, मृत्यु, गुप्त विद्या, अचानक लाभ-हानि, रहस्य, शोध' },
  { houseNumber: 9, nameHi: 'धर्म/भाग्य भाव', nameEn: 'Dharma Bhava', karaka: 'Jupiter', karakaHi: 'बृहस्पति', significanceEn: 'Fortune, Father, Dharma, Higher Wisdom, Long Travels, Guru', significanceHi: 'भाग्य, धर्म, पिता, गुरु, तीर्थ यात्रा, उच्च ज्ञान' },
  { houseNumber: 10, nameHi: 'कर्म भाव (व्यवसाय/कीर्ति)', nameEn: 'Karma Bhava', karaka: 'Sun / Mercury', karakaHi: 'सूर्य/बुध', significanceEn: 'Career, Profession, Fame, Social Status, Authority', significanceHi: 'कर्म, आजीविका, प्रतिष्ठा, मान-सम्मान, पदोन्नति, पिता' },
  { houseNumber: 11, nameHi: 'लाभ भाव (आय/मित्र)', nameEn: 'Labha Bhava', karaka: 'Jupiter', karakaHi: 'बृहस्पति', significanceEn: 'Gains, Income, Elder Siblings, Desires, Social Network', significanceHi: 'आय, लाभ, बड़े भाई-बहन, इच्छा पूर्ति, मित्र मंडली' },
  { houseNumber: 12, nameHi: 'व्यय भाव (मोक्ष/विदेश)', nameEn: 'Vyaya Bhava', karaka: 'Saturn', karakaHi: 'शनि', significanceEn: 'Expenditures, Foreign Lands, Losses, Spirituality, Moksha, Sleep', significanceHi: 'व्यय, विदेश यात्रा, मोक्ष, अस्पताल, दान, शय्या सुख' },
];

// Shodashvarga (16 Divisional Charts in Jataka Parijata)
export interface VargaDef {
  key: string;
  division: number;
  nameHi: string;
  nameEn: string;
  purposeHi: string;
}

export const SHODASHVARGAS: VargaDef[] = [
  { key: 'D1', division: 1, nameHi: 'लग्न / राशि', nameEn: 'Rashi (D1)', purposeHi: 'शरीर, व्यक्तित्व व संपूर्ण जीवन' },
  { key: 'D2', division: 2, nameHi: 'होरा', nameEn: 'Hora (D2)', purposeHi: 'धन, संपत्ति व वित्तीय स्थिति' },
  { key: 'D3', division: 3, nameHi: 'द्रेष्काण', nameEn: 'Drekkana (D3)', purposeHi: 'भाई-बहन, पराक्रम व ऊर्जा' },
  { key: 'D4', division: 4, nameHi: 'चतुर्थांश', nameEn: 'Chaturthamsha (D4)', purposeHi: 'भूमि, भवन, वाहन व अचल संपत्ति' },
  { key: 'D7', division: 7, nameHi: 'सप्तांश', nameEn: 'Saptamsha (D7)', purposeHi: 'संतान, वंश वृद्धि व सुख' },
  { key: 'D9', division: 9, nameHi: 'नवमांश', nameEn: 'Navamsha (D9)', purposeHi: 'दांपत्य, भाग्य व आंतरिक बल' },
  { key: 'D10', division: 10, nameHi: 'दशांश', nameEn: 'Dashamsha (D10)', purposeHi: 'कर्म, पद, प्रतिष्ठा व व्यापार' },
  { key: 'D12', division: 12, nameHi: 'द्वादशांश', nameEn: 'Dwadashamsha (D12)', purposeHi: 'माता-पिता व पूर्वज' },
  { key: 'D16', division: 16, nameHi: 'षोडशांश', nameEn: 'Shodashamsha (D16)', purposeHi: 'वाहन, सुख व यात्राएं' },
  { key: 'D20', division: 20, nameHi: 'विंशांश', nameEn: 'Vimshamsha (D20)', purposeHi: 'उपासना, भक्ति व आध्यात्मिक बल' },
  { key: 'D24', division: 24, nameHi: 'चतुर्विंशांश', nameEn: 'Chaturvimshamsha (D24)', purposeHi: 'विद्या, बुद्धि व ज्ञान' },
  { key: 'D27', division: 27, nameHi: 'सप्तविंशांश', nameEn: 'Saptavimshamsha (D27)', purposeHi: 'शारीरिक सामर्थ्य व बल' },
  { key: 'D30', division: 30, nameHi: 'त्रिंशांश', nameEn: 'Trimshamsha (D30)', purposeHi: 'अरिष्ट, कष्ट व चरित्र' },
  { key: 'D40', division: 40, nameHi: 'खवेदांश', nameEn: 'Khavedamsha (D40)', purposeHi: 'शुभ-अशुभ फल' },
  { key: 'D45', division: 45, nameHi: 'अक्षवेदांश', nameEn: 'Akshavedamsha (D45)', purposeHi: 'चरित्र शुद्धि व आचार' },
  { key: 'D60', division: 60, nameHi: 'षष्ट्यंश', nameEn: 'Shashtiamsha (D60)', purposeHi: 'पूर्व जन्म के संचित कर्म व सूक्ष्म फल' },
];
