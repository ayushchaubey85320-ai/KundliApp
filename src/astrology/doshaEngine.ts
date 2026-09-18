// Vedic Dosha Analysis Engine: Manglik, Kaal Sarp, and Sade Sati
import { KundliResult } from './kundliEngine';

export interface ManglikResult {
  isManglik: boolean;
  intensity: 'None' | 'Mild (Anshik)' | 'Full (Purna)';
  intensityHi: string;
  affectedFrom: string[]; // 'Lagna', 'Moon', 'Venus'
  cancellationReasons: string[];
  cancellationReasonsHi: string[];
  remediesHi: string[];
}

export interface KaalSarpResult {
  hasKaalSarp: boolean;
  typeEn: string;
  typeHi: string;
  isPartial: boolean;
  descriptionHi: string;
  remediesHi: string[];
}

export interface SadeSatiResult {
  isInSadeSati: boolean;
  phase: 'Rising (चढ़ती)' | 'Peak (शिखर)' | 'Setting (उतरती)' | 'Dhaiya (ढैय्या)' | 'None';
  moonSignNameHi: string;
  saturnSignNameHi: string;
  descriptionHi: string;
  remediesHi: string[];
}

export interface DoshaAnalysis {
  manglik: ManglikResult;
  kaalSarp: KaalSarpResult;
  sadeSati: SadeSatiResult;
}

// 1. Manglik Dosha Analysis
export const checkManglikDosha = (kundli: KundliResult): ManglikResult => {
  const mars = kundli.planets.find((p) => p.key === 'Mars');
  const moon = kundli.planets.find((p) => p.key === 'Moon');
  const venus = kundli.planets.find((p) => p.key === 'Venus');
  const jupiter = kundli.planets.find((p) => p.key === 'Jupiter');

  if (!mars || !moon || !venus) {
    return {
      isManglik: false,
      intensity: 'None',
      intensityHi: 'दोष मुक्त',
      affectedFrom: [],
      cancellationReasons: [],
      cancellationReasonsHi: [],
      remediesHi: [],
    };
  }

  // Manglik houses from reference: 1, 2, 4, 7, 8, 12
  const manglikHouses = [1, 2, 4, 7, 8, 12];
  const affectedFrom: string[] = [];

  // From Lagna
  if (manglikHouses.includes(mars.d1House)) {
    affectedFrom.push('लग्न (Lagna)');
  }

  // From Moon
  const houseFromMoon = ((mars.rashi.id - moon.rashi.id + 12) % 12) + 1;
  if (manglikHouses.includes(houseFromMoon)) {
    affectedFrom.push('चन्द्र (Moon)');
  }

  // From Venus
  const houseFromVenus = ((mars.rashi.id - venus.rashi.id + 12) % 12) + 1;
  if (manglikHouses.includes(houseFromVenus)) {
    affectedFrom.push('शुक्र (Venus)');
  }

  const cancellationReasons: string[] = [];
  const cancellationReasonsHi: string[] = [];

  // Cancellation rule 1: Mars in own sign (Aries or Scorpio)
  if (mars.rashi.id === 1 || mars.rashi.id === 8) {
    cancellationReasons.push('Mars in own sign (Aries/Scorpio)');
    cancellationReasonsHi.push('मंगल स्वराशि (मेष/वृश्चिक) में स्थित होने से दोष भंग होता है।');
  }

  // Cancellation rule 2: Mars in exaltation (Capricorn)
  if (mars.rashi.id === 10) {
    cancellationReasons.push('Mars exalted in Capricorn');
    cancellationReasonsHi.push('मंगल उच्च राशि मकर में स्थित होने से दोष निष्प्रभावी होता है।');
  }

  // Cancellation rule 3: Jupiter aspect or conjunction
  if (jupiter) {
    const diffJup = Math.abs(jupiter.d1House - mars.d1House);
    if (diffJup === 0 || diffJup === 4 || diffJup === 8) {
      cancellationReasons.push('Jupiter aspecting or conjunct Mars');
      cancellationReasonsHi.push('देवगुरु बृहस्पति की दृष्टि या युति से मांगलिक दोष शांत होता है।');
    }
  }

  let intensity: 'None' | 'Mild (Anshik)' | 'Full (Purna)' = 'None';
  let intensityHi = 'मांगलिक दोष नहीं है';

  if (affectedFrom.length === 0) {
    intensity = 'None';
    intensityHi = 'दोष मुक्त (कोई दोष नहीं)';
  } else if (cancellationReasons.length > 0) {
    intensity = 'Mild (Anshik)';
    intensityHi = 'आंशिक मांगलिक (दोष भंग / परिहार युक्त)';
  } else if (affectedFrom.length === 1) {
    intensity = 'Mild (Anshik)';
    intensityHi = 'आंशिक मांगलिक';
  } else {
    intensity = 'Full (Purna)';
    intensityHi = 'पूर्ण मांगलिक दोष';
  }

  const remediesHi = [
    'नित्य प्रातः हनुमान चालीसा अथवा सुंदरकांड का पाठ करें।',
    'मंगलवार के दिन लाल मसूर की दाल, लाल पुष्प अथवा गुड़ का दान करें।',
    'विवाह पूर्व कुंभ विवाह या अर्क विवाह का शास्त्रीय अनुष्ठान योग्य ब्राह्मण से कराएं।',
    'शिव मंदिर में शिवलिंग पर जल व लाल चंदन अर्पित करें।',
  ];

  return {
    isManglik: intensity !== 'None',
    intensity,
    intensityHi,
    affectedFrom,
    cancellationReasons,
    cancellationReasonsHi,
    remediesHi,
  };
};

// 2. Kaal Sarp Dosha Analysis
export const checkKaalSarpDosha = (kundli: KundliResult): KaalSarpResult => {
  const rahu = kundli.planets.find((p) => p.key === 'Rahu');
  const ketu = kundli.planets.find((p) => p.key === 'Ketu');

  if (!rahu || !ketu) {
    return {
      hasKaalSarp: false,
      typeEn: 'None',
      typeHi: 'दोष मुक्त',
      isPartial: false,
      descriptionHi: 'कुंडली में कालसर्प दोष उपस्थित नहीं है।',
      remediesHi: [],
    };
  }

  const otherPlanets = kundli.planets.filter((p) => p.key !== 'Rahu' && p.key !== 'Ketu');

  // Check if all planets lie on one side of Rahu-Ketu axis
  let sideA = 0;
  let sideB = 0;

  for (const p of otherPlanets) {
    const diff = (p.longitude - rahu.longitude + 360) % 360;
    if (diff > 0 && diff < 180) {
      sideA++;
    } else if (diff > 180 && diff < 360) {
      sideB++;
    }
  }

  const hasFull = sideA === 0 || sideB === 0;
  const hasPartial = sideA === 1 || sideB === 1;

  if (!hasFull && !hasPartial) {
    return {
      hasKaalSarp: false,
      typeEn: 'None',
      typeHi: 'दोष मुक्त',
      isPartial: false,
      descriptionHi: 'ग्रह राहु-केतु अक्ष के दोनों ओर व्यवस्थित हैं, अतः कालसर्प योग नहीं है।',
      remediesHi: [],
    };
  }

  // Determine type based on Rahu's house (1 to 12)
  const typesMap: { en: string; hi: string }[] = [
    { en: 'Anant Kaal Sarp', hi: 'अनंत कालसर्प योग (प्रथम भाव)' },
    { en: 'Kulik Kaal Sarp', hi: 'कुलिक कालसर्प योग (द्वितीय भाव)' },
    { en: 'Vasuki Kaal Sarp', hi: 'वासुकी कालसर्प योग (तृतीय भाव)' },
    { en: 'Shankhpal Kaal Sarp', hi: 'शंखपाल कालसर्प योग (चतुर्थ भाव)' },
    { en: 'Padma Kaal Sarp', hi: 'पद्म कालसर्प योग (पंचम भाव)' },
    { en: 'Mahapadma Kaal Sarp', hi: 'महापद्म कालसर्प योग (षष्ठ भाव)' },
    { en: 'Takshak Kaal Sarp', hi: 'तक्षक कालसर्प योग (सप्तम भाव)' },
    { en: 'Karkotak Kaal Sarp', hi: 'कर्कोटक कालसर्प योग (अष्टम भाव)' },
    { en: 'Shankhanaad Kaal Sarp', hi: 'शंखनाद कालसर्प योग (नवम भाव)' },
    { en: 'Ghatak Kaal Sarp', hi: 'घातक कालसर्प योग (दशम भाव)' },
    { en: 'Vishdhar Kaal Sarp', hi: 'विषधर कालसर्प योग (एकादश भाव)' },
    { en: 'Sheshnag Kaal Sarp', hi: 'शेषनाग कालसर्प योग (द्वादश भाव)' },
  ];

  const type = typesMap[rahu.d1House - 1] || typesMap[0];

  return {
    hasKaalSarp: true,
    typeEn: type.en,
    typeHi: type.hi,
    isPartial: !hasFull && hasPartial,
    descriptionHi: hasFull
      ? `कुंडली में पूर्ण ${type.hi} विद्यमान है। समस्त मुख्य ग्रह राहु-केतु की परिधि में हैं।`
      : `कुंडली में आंशिक ${type.hi} विद्यमान है।`,
    remediesHi: [
      'प्रतिदिन "ॐ नमः शिवाय" अथवा महामृत्युंजय मंत्र का 108 बार जप करें।',
      'नागपंचमी के दिन चांदी के नाग-नागिन के जोड़े का बहते जल में विसर्जन करें।',
      'शिवलिंग पर कच्चा दूध, काले तिल व बेलपत्र अर्पित करें।',
      'राहु काल में पक्षियों को बाजरा या सप्तधान्य डालें।',
    ],
  };
};

// 3. Sade Sati Analysis
// Saturn's current sidereal position in 2026: Aquarius / Pisces transition (Saturn in Pisces ~ 330°-360°)
export const checkSadeSati = (kundli: KundliResult): SadeSatiResult => {
  const moon = kundli.planets.find((p) => p.key === 'Moon');
  if (!moon) {
    return {
      isInSadeSati: false,
      phase: 'None',
      moonSignNameHi: 'अज्ञात',
      saturnSignNameHi: 'कुंभ/मीन',
      descriptionHi: 'चंद्रमा की स्थिति अनुपलब्ध है।',
      remediesHi: [],
    };
  }

  // Transiting Saturn approximate sidereal sign in 2026: Pisces (Rashi 12)
  const currentTransitSaturnRashiId = 12; // Meena / Pisces
  const moonRashiId = moon.rashi.id;

  const diff = ((currentTransitSaturnRashiId - moonRashiId + 12) % 12) + 1;

  let isInSadeSati = false;
  let phase: 'Rising (चढ़ती)' | 'Peak (शिखर)' | 'Setting (उतरती)' | 'Dhaiya (ढैय्या)' | 'None' = 'None';
  let descriptionHi = 'वर्तमान समय में आप पर शनि की साढ़ेसाती या ढैय्या का प्रभाव नहीं है।';

  if (diff === 12) {
    isInSadeSati = true;
    phase = 'Rising (चढ़ती)';
    descriptionHi = 'शनि की साढ़ेसाती का प्रथम चरण (चढ़ती साढ़ेसाती) सक्रिय है। वित्तीय सतर्कता अपेक्षित है।';
  } else if (diff === 1) {
    isInSadeSati = true;
    phase = 'Peak (शिखर)';
    descriptionHi = 'शनि की साढ़ेसाती का द्वितीय चरण (शिखर काल) सक्रिय है। मानसिक शांति व संयम बनाए रखें।';
  } else if (diff === 2) {
    isInSadeSati = true;
    phase = 'Setting (उतरती)';
    descriptionHi = 'शनि की साढ़ेसाती का तृतीय चरण (उतरती साढ़ेसाती) सक्रिय है। धीरे-धीरे लाभ की प्राप्ति होगी।';
  } else if (diff === 4 || diff === 8) {
    isInSadeSati = true;
    phase = 'Dhaiya (ढैय्या)';
    descriptionHi = diff === 4
      ? 'शनि की चतुर्थ ढैय्या (कंटक शनि) सक्रिय है।'
      : 'शनि की अष्टम ढैय्या सक्रिय है। स्वास्थ्य का विशेष ध्यान रखें।';
  }

  const remediesHi = [
    'शनिवार को सूर्यास्त के बाद पीपल वृक्ष के नीचे सरसों के तेल का दीपक प्रज्वलित करें।',
    'प्रत्येक शनिवार को शनि चालीसा का पाठ करें और काले वस्त्र या उड़द दाल का दान करें।',
    'हनुमान जी के चरणों का सिंदूर मस्तक पर धारण करें।',
    'मजदूरों, असहायों व वृद्धजनों का आदर करें और उनकी सेवा करें।',
  ];

  return {
    isInSadeSati,
    phase,
    moonSignNameHi: moon.rashi.nameHi,
    saturnSignNameHi: 'मीन (Pisces)',
    descriptionHi,
    remediesHi,
  };
};

export const getFullDoshaAnalysis = (kundli: KundliResult): DoshaAnalysis => {
  return {
    manglik: checkManglikDosha(kundli),
    kaalSarp: checkKaalSarpDosha(kundli),
    sadeSati: checkSadeSati(kundli),
  };
};
