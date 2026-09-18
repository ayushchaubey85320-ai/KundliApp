// Ashtakoot Gun Milan Engine (36 Points Vedic Matchmaking)
import { KundliResult } from './kundliEngine';

export interface KootaScore {
  nameEn: string;
  nameHi: string;
  maxPoints: number;
  obtainedPoints: number;
  descriptionHi: string;
  isDosha: boolean;
}

export interface MilanResult {
  totalPoints: number;
  maxPoints: 36;
  percentage: number;
  verdictHi: string;
  verdictEn: string;
  isAuspicious: boolean;
  kootas: {
    varna: KootaScore;
    vashya: KootaScore;
    tara: KootaScore;
    yoni: KootaScore;
    grahaMaitri: KootaScore;
    gana: KootaScore;
    bhakoot: KootaScore;
    nadi: KootaScore;
  };
  specialNotesHi: string[];
}

export const calculateMilan = (boyKundli: KundliResult, girlKundli: KundliResult): MilanResult => {
  const boyMoon = boyKundli.planets.find((p) => p.key === 'Moon')!;
  const girlMoon = girlKundli.planets.find((p) => p.key === 'Moon')!;

  const boyNak = boyMoon.nakshatra;
  const girlNak = girlMoon.nakshatra;
  const boyRashi = boyMoon.rashi;
  const girlRashi = girlMoon.rashi;

  // 1. Varna (1 Point)
  // Brahmin (4,8,12), Kshatriya (1,5,9), Vaishya (2,6,10), Shudra (3,7,11)
  const varnaOrder: Record<string, number> = { Brahmin: 4, Kshatriya: 3, Vaishya: 2, Shudra: 1 };
  const boyVarnaScore = varnaOrder[boyNak.varna] || 1;
  const girlVarnaScore = varnaOrder[girlNak.varna] || 1;
  const varnaPoints = boyVarnaScore >= girlVarnaScore ? 1 : 0;
  const varna: KootaScore = {
    nameEn: 'Varna',
    nameHi: 'वर्ण (अहंकार एवं कार्य प्रकृति)',
    maxPoints: 1,
    obtainedPoints: varnaPoints,
    descriptionHi: varnaPoints === 1 ? 'वर और कन्या के कार्य स्वभाव में उत्तम सामंजस्य है।' : 'वर्ण में भिन्नता है, आपसी समझ आवश्यक है।',
    isDosha: varnaPoints === 0,
  };

  // 2. Vashya (2 Points)
  let vashyaPoints = 1;
  if (boyNak.vashya === girlNak.vashya) {
    vashyaPoints = 2;
  } else if (
    (boyNak.vashya === 'Manava' && girlNak.vashya === 'Chatushpada') ||
    (boyNak.vashya === 'Chatushpada' && girlNak.vashya === 'Manava')
  ) {
    vashyaPoints = 1;
  } else {
    vashyaPoints = 0.5;
  }
  const vashya: KootaScore = {
    nameEn: 'Vashya',
    nameHi: 'वश्य (परस्पर आकर्षण एवं नियंत्रण)',
    maxPoints: 2,
    obtainedPoints: vashyaPoints,
    descriptionHi: vashyaPoints >= 1.5 ? 'आपसी आकर्षण और समर्पण का स्तर श्रेष्ठ है।' : 'एक-दूसरे पर नियंत्रण करने की प्रवृत्ति से बचें।',
    isDosha: vashyaPoints < 1,
  };

  // 3. Tara (3 Points)
  // Distance from girl nakshatra to boy nakshatra % 9
  const taraFromGirl = (((boyNak.id - girlNak.id + 27) % 9) + 1);
  const taraFromBoy = (((girlNak.id - boyNak.id + 27) % 9) + 1);
  const inauspiciousTaras = [3, 5, 7]; // Vipat, Pratyak, Vadha
  const boyOk = !inauspiciousTaras.includes(taraFromGirl);
  const girlOk = !inauspiciousTaras.includes(taraFromBoy);

  let taraPoints = 0;
  if (boyOk && girlOk) taraPoints = 3;
  else if (boyOk || girlOk) taraPoints = 1.5;
  else taraPoints = 0;

  const tara: KootaScore = {
    nameEn: 'Tara',
    nameHi: 'तारा (भाग्य, स्वास्थ्य एवं दीर्घायु)',
    maxPoints: 3,
    obtainedPoints: taraPoints,
    descriptionHi: taraPoints === 3 ? 'दोनों का तारा बल पूर्णतः शुभ और अनुकूल है।' : 'तारा मध्यम है, स्वास्थ्य का ध्यान रखें।',
    isDosha: taraPoints === 0,
  };

  // 4. Yoni (4 Points)
  let yoniPoints = 2;
  if (boyNak.yoni === girlNak.yoni) {
    yoniPoints = 4;
  } else {
    const enemyYonis: [string, string][] = [
      ['Horse', 'Buffalo'],
      ['Elephant', 'Lion'],
      ['Sheep', 'Monkey'],
      ['Serpent', 'Mongoose'],
      ['Dog', 'Deer'],
      ['Cat', 'Rat'],
      ['Cow', 'Tiger'],
    ];
    const isEnemy = enemyYonis.some(
      ([a, b]) => (boyNak.yoni === a && girlNak.yoni === b) || (boyNak.yoni === b && girlNak.yoni === a)
    );
    if (isEnemy) yoniPoints = 0;
    else yoniPoints = 2;
  }
  const yoni: KootaScore = {
    nameEn: 'Yoni',
    nameHi: 'योनि (शारीरिक व मानसिक अनुकूलता)',
    maxPoints: 4,
    obtainedPoints: yoniPoints,
    descriptionHi: yoniPoints === 4 ? 'शारीरिक और मानसिक अनुकूलता सर्वोत्तम है।' : yoniPoints === 0 ? 'योनि वैर है, परस्पर धैर्य रखें।' : 'योनि अनुकूलता सामान्य है।',
    isDosha: yoniPoints === 0,
  };

  // 5. Graha Maitri (5 Points)
  let grahaPoints = 3;
  if (boyRashi.lord === girlRashi.lord) {
    grahaPoints = 5;
  } else {
    const friends: Record<string, string[]> = {
      Sun: ['Moon', 'Mars', 'Jupiter'],
      Moon: ['Sun', 'Mercury'],
      Mars: ['Sun', 'Moon', 'Jupiter'],
      Mercury: ['Sun', 'Venus'],
      Jupiter: ['Sun', 'Moon', 'Mars'],
      Venus: ['Mercury', 'Saturn'],
      Saturn: ['Mercury', 'Venus'],
    };
    const bFriend = friends[boyRashi.lord]?.includes(girlRashi.lord);
    const gFriend = friends[girlRashi.lord]?.includes(boyRashi.lord);

    if (bFriend && gFriend) grahaPoints = 5;
    else if (bFriend || gFriend) grahaPoints = 4;
    else grahaPoints = 1;
  }
  const grahaMaitri: KootaScore = {
    nameEn: 'Graha Maitri',
    nameHi: 'ग्रह मैत्री (मित्रता एवं वैचारिक तालमेल)',
    maxPoints: 5,
    obtainedPoints: grahaPoints,
    descriptionHi: grahaPoints >= 4 ? 'राशियों के स्वामियों में उत्तम मित्रता है, विचार मिलेंगे।' : 'ग्रह मैत्री मध्यम है, विचारों का सम्मान करें।',
    isDosha: grahaPoints <= 1,
  };

  // 6. Gana (6 Points)
  let ganaPoints = 0;
  if (boyNak.gana === girlNak.gana) {
    ganaPoints = 6;
  } else if (
    (boyNak.gana === 'Deva' && girlNak.gana === 'Manushya') ||
    (boyNak.gana === 'Manushya' && girlNak.gana === 'Deva')
  ) {
    ganaPoints = 5;
  } else {
    ganaPoints = 0; // Rakshasa with Deva/Manushya
  }
  const gana: KootaScore = {
    nameEn: 'Gana',
    nameHi: 'गण (स्वभाव, आचरण एवं चरित्र)',
    maxPoints: 6,
    obtainedPoints: ganaPoints,
    descriptionHi: ganaPoints >= 5 ? 'गण मैत्री उत्तम है, स्वभाव में मधुरता रहेगी।' : 'गण दोष विद्यमान है (देव/राक्षस भिन्नता)।',
    isDosha: ganaPoints === 0,
  };

  // 7. Bhakoot (7 Points)
  const rashiDist = ((boyRashi.id - girlRashi.id + 12) % 12) + 1;
  let bhakootPoints = 7;
  let isBhakootDosha = false;

  // Inauspicious rashi positions: 2/12, 6/8, 9/5
  if (rashiDist === 2 || rashiDist === 12 || rashiDist === 6 || rashiDist === 8 || rashiDist === 9 || rashiDist === 5) {
    // Cancellation: if same lord (e.g. Aries-Scorpio, Taurus-Libra)
    if (boyRashi.lord === girlRashi.lord) {
      bhakootPoints = 7;
      isBhakootDosha = false;
    } else {
      bhakootPoints = 0;
      isBhakootDosha = true;
    }
  }
  const bhakoot: KootaScore = {
    nameEn: 'Bhakoot',
    nameHi: 'भकूट (पारिवारिक कल्याण एवं समृद्धि)',
    maxPoints: 7,
    obtainedPoints: bhakootPoints,
    descriptionHi: !isBhakootDosha ? 'भकूट शुभ है, दांपत्य जीवन में सुख-समृद्धि रहेगी।' : 'भकूट दोष (षडाष्टक/द्विर्द्वादश) उपस्थित है।',
    isDosha: isBhakootDosha,
  };

  // 8. Nadi (8 Points)
  let nadiPoints = 8;
  let isNadiDosha = false;
  if (boyNak.nadi === girlNak.nadi) {
    // Same Nadi = Nadi Dosha
    nadiPoints = 0;
    isNadiDosha = true;
  }
  const nadi: KootaScore = {
    nameEn: 'Nadi',
    nameHi: 'नाड़ी (संतान सुख, वंश वृद्धि एवं स्वास्थ्य)',
    maxPoints: 8,
    obtainedPoints: nadiPoints,
    descriptionHi: !isNadiDosha ? 'नाड़ी दोष रहित है, संतान व स्वास्थ्य के लिए श्रेष्ठ।' : `समान नाड़ी (${boyNak.nadiHi}) होने से नाड़ी दोष है।`,
    isDosha: isNadiDosha,
  };

  const totalPoints = varnaPoints + vashyaPoints + taraPoints + yoniPoints + grahaPoints + ganaPoints + bhakootPoints + nadiPoints;
  const percentage = Math.round((totalPoints / 36) * 100);

  let verdictHi = '';
  let verdictEn = '';
  let isAuspicious = false;

  if (totalPoints >= 28) {
    verdictHi = 'सर्वोत्कृष्ट मिलान - वैवाहिक जीवन अत्यंत सुखद, समृद्ध एवं कल्याणकारी रहेगा।';
    verdictEn = 'Excellent Match';
    isAuspicious = true;
  } else if (totalPoints >= 18) {
    verdictHi = 'उत्तम एवं अनुकूल मिलान - गृहस्थ जीवन सुखमय रहेगा। दोष परिहार कर विवाह शुभ है।';
    verdictEn = 'Good Match';
    isAuspicious = true;
  } else {
    verdictHi = 'मध्यम / विचारणीय मिलान - 18 से कम गुण प्राप्त हुए हैं। ज्योतिषाचार्य से परामर्श आवश्यक है।';
    verdictEn = 'Below Average';
    isAuspicious = false;
  }

  const specialNotesHi: string[] = [];
  if (isNadiDosha) {
    specialNotesHi.push('नाड़ी दोष: वर-कन्या दोनों की नाड़ी समान है। विवाह पूर्व महामृत्युंजय जप व स्वर्ण दान अनुशंसित है।');
  }
  if (isBhakootDosha) {
    specialNotesHi.push('भकूट दोष: वर-कन्या की राशि में भकूट दोष बनता है। भगवान शिव व माता पार्वती की संयुक्त आराधना करें।');
  }
  if (totalPoints >= 18 && !isNadiDosha && !isBhakootDosha) {
    specialNotesHi.push('यह कुंडली मिलान शास्त्रीय दृष्टि से दोष मुक्त एवं अत्यंत शुभ है।');
  }

  return {
    totalPoints,
    maxPoints: 36,
    percentage,
    verdictHi,
    verdictEn,
    isAuspicious,
    kootas: {
      varna,
      vashya,
      tara,
      yoni,
      grahaMaitri,
      gana,
      bhakoot,
      nadi,
    },
    specialNotesHi,
  };
};
