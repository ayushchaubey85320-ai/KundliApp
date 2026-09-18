// Jataka Parijata Classical Astrological Yogas Engine
import { KundliResult } from './kundliEngine';

export interface VedicYoga {
  id: string;
  nameHi: string;
  nameEn: string;
  category: 'Pancha Mahapurusha' | 'Raja Yoga' | 'Dhana Yoga' | 'Auspicious' | 'Inauspicious';
  categoryHi: string;
  isActive: boolean;
  formingPlanets: string[];
  descriptionHi: string;
  effectsHi: string;
}

export interface PhaladeshReport {
  lagnaResultHi: string;
  careerKarmaResultHi: string;
  wealthResultHi: string;
  activeYogas: VedicYoga[];
  allYogas: VedicYoga[];
}

export const analyzeYogas = (kundli: KundliResult): PhaladeshReport => {
  const { lagna, planets } = kundli;

  const sun = planets.find((p) => p.key === 'Sun')!;
  const moon = planets.find((p) => p.key === 'Moon')!;
  const mars = planets.find((p) => p.key === 'Mars')!;
  const mercury = planets.find((p) => p.key === 'Mercury')!;
  const jupiter = planets.find((p) => p.key === 'Jupiter')!;
  const venus = planets.find((p) => p.key === 'Venus')!;
  const saturn = planets.find((p) => p.key === 'Saturn')!;

  const kendras = [1, 4, 7, 10];

  const allYogas: VedicYoga[] = [];

  // 1. Pancha Mahapurusha Yogas (Jataka Parijata Adhyaya 6)
  // Ruchaka Yoga: Mars in Kendra in own/exalted sign (1, 8, 10)
  const isRuchaka = kendras.includes(mars.d1House) && (mars.rashi.id === 1 || mars.rashi.id === 8 || mars.rashi.id === 10);
  allYogas.push({
    id: 'ruchaka',
    nameHi: 'रुचक महापुरुष योग',
    nameEn: 'Ruchaka Yoga',
    category: 'Pancha Mahapurusha',
    categoryHi: 'पंच महापुरुष योग',
    isActive: isRuchaka,
    formingPlanets: ['मंगल'],
    descriptionHi: 'मंगल केंद्र भाव (1, 4, 7, 10) में स्वराशि (मेष/वृश्चिक) अथवा उच्च राशि (मकर) में स्थित है।',
    effectsHi: 'जातक साहसी, पराक्रमी, नेतृत्व क्षमता से युक्त, भूमि-भवन का स्वामी तथा सेना/प्रशासन में उच्च पद प्राप्त करता है।',
  });

  // Bhadra Yoga: Mercury in Kendra in Gemini or Virgo
  const isBhadra = kendras.includes(mercury.d1House) && (mercury.rashi.id === 3 || mercury.rashi.id === 6);
  allYogas.push({
    id: 'bhadra',
    nameHi: 'भद्र महापुरुष योग',
    nameEn: 'Bhadra Yoga',
    category: 'Pancha Mahapurusha',
    categoryHi: 'पंच महापुरुष योग',
    isActive: isBhadra,
    formingPlanets: ['बुध'],
    descriptionHi: 'बुध केंद्र भाव में अपनी स्वराशि (मिथुन) अथवा उच्च राशि (कन्या) में स्थित है।',
    effectsHi: 'जातक कुशाग्र बुद्धि, वाक्पटु, व्यापार व गणित में निपुण, विद्वान और दीर्घायु होता है।',
  });

  // Hamsa Yoga: Jupiter in Kendra in Sagittarius, Pisces, or Cancer
  const isHamsa = kendras.includes(jupiter.d1House) && (jupiter.rashi.id === 9 || jupiter.rashi.id === 12 || jupiter.rashi.id === 4);
  allYogas.push({
    id: 'hamsa',
    nameHi: 'हंस महापुरुष योग',
    nameEn: 'Hamsa Yoga',
    category: 'Pancha Mahapurusha',
    categoryHi: 'पंच महापुरुष योग',
    isActive: isHamsa,
    formingPlanets: ['गुरु'],
    descriptionHi: 'देवगुरु बृहस्पति केंद्र भाव में स्वराशि (धनु/मीन) अथवा उच्च राशि (कर्क) में स्थित हैं।',
    effectsHi: 'जातक धार्मिक, सदाचारी, राजतुल्य सम्मान पाने वाला, समाज सुधारक एवं आध्यात्मिक गुरु होता है।',
  });

  // Malavya Yoga: Venus in Kendra in Taurus, Libra, or Pisces
  const isMalavya = kendras.includes(venus.d1House) && (venus.rashi.id === 2 || venus.rashi.id === 7 || venus.rashi.id === 12);
  allYogas.push({
    id: 'malavya',
    nameHi: 'मालव्य महापुरुष योग',
    nameEn: 'Malavya Yoga',
    category: 'Pancha Mahapurusha',
    categoryHi: 'पंच महापुरुष योग',
    isActive: isMalavya,
    formingPlanets: ['शुक्र'],
    descriptionHi: 'शुक्र केंद्र भाव में स्वराशि (वृषभ/तुला) अथवा उच्च राशि (मीन) में स्थित है।',
    effectsHi: 'जातक कला-प्रेमी, सुंदर, समस्त भौतिक सुख-सुविधाओं, वाहन, ऐश्वर्य व उत्तम जीवनसाथी से युक्त होता है।',
  });

  // Sasa Yoga: Saturn in Kendra in Capricorn, Aquarius, or Libra
  const isSasa = kendras.includes(saturn.d1House) && (saturn.rashi.id === 10 || saturn.rashi.id === 11 || saturn.rashi.id === 7);
  allYogas.push({
    id: 'sasa',
    nameHi: 'शश महापुरुष योग',
    nameEn: 'Sasa Yoga',
    category: 'Pancha Mahapurusha',
    categoryHi: 'पंच महापुरुष योग',
    isActive: isSasa,
    formingPlanets: ['शनि'],
    descriptionHi: 'शनि देव केंद्र भाव में स्वराशि (मकर/कुंभ) अथवा उच्च राशि (तुला) में स्थित हैं।',
    effectsHi: 'जातक जनसमर्थक, न्यायप्रिय, राजनीति व उच्च पदों पर आसीन, दृढ़ निश्चयी व दीर्घायु होता है।',
  });

  // 2. Gajakesari Yoga (Jupiter in Kendra from Moon)
  const distMoonJup = ((jupiter.rashi.id - moon.rashi.id + 12) % 12) + 1;
  const isGajakesari = distMoonJup === 1 || distMoonJup === 4 || distMoonJup === 7 || distMoonJup === 10;
  allYogas.push({
    id: 'gajakesari',
    nameHi: 'गजकेसरी योग',
    nameEn: 'Gajakesari Yoga',
    category: 'Raja Yoga',
    categoryHi: 'शुभ राजयोग',
    isActive: isGajakesari,
    formingPlanets: ['गुरु', 'चन्द्र'],
    descriptionHi: 'चंद्रमा से केंद्र में गुरु स्थित हैं (गज के समान बलवान व तेजस्वी)।',
    effectsHi: 'जातक तेजस्वी, प्रतापी, धनवान, राजदरबार में सम्मानित एवं दीर्घकाल तक यश-कीर्ति प्राप्त करता है।',
  });

  // 3. Budhaditya Yoga (Sun + Mercury conjunction)
  const isBudhaditya = sun.rashi.id === mercury.rashi.id;
  allYogas.push({
    id: 'budhaditya',
    nameHi: 'बुधादित्य योग',
    nameEn: 'Budhaditya Yoga',
    category: 'Auspicious',
    categoryHi: 'शुभ योग',
    isActive: isBudhaditya,
    formingPlanets: ['सूर्य', 'बुध'],
    descriptionHi: 'सूर्य और बुध की एक ही राशि में शुभ युति है।',
    effectsHi: 'जातक तीक्ष्ण बुद्धि, प्रशासनिक कुशलता, उच्च शिक्षा, उत्तम वाकपटुता एवं मान-सम्मान प्राप्त करता है।',
  });

  // 4. Chandra-Mangala Yoga (Moon + Mars conjunction)
  const isChandraMangala = moon.rashi.id === mars.rashi.id;
  allYogas.push({
    id: 'chandra_mangala',
    nameHi: 'चंद्र-मंगल महालक्ष्मी योग',
    nameEn: 'Chandra-Mangala Yoga',
    category: 'Dhana Yoga',
    categoryHi: 'धन योग',
    isActive: isChandraMangala,
    formingPlanets: ['चन्द्र', 'मंगल'],
    descriptionHi: 'चंद्रमा और मंगल की शुभ युति से धन आगमन के प्रचुर अवसर बनते हैं।',
    effectsHi: 'जातक स्वप्रयास से अपार धन-संपदा, अचल संपत्ति, उद्योग व व्यापार में विशेष सफलता अर्जित करता है।',
  });

  // 5. Vargottama Yoga (Lagna or Moon in same sign in D1 & D9)
  const isVargottamaLagna = lagna.isVargottama;
  allYogas.push({
    id: 'vargottama_lagna',
    nameHi: 'वर्गोत्तम लग्न योग (जातक पारिजात)',
    nameEn: 'Vargottama Lagna',
    category: 'Raja Yoga',
    categoryHi: 'परम शुभ योग',
    isActive: isVargottamaLagna,
    formingPlanets: ['लग्न'],
    descriptionHi: 'लग्न D1 (जन्म कुंडली) और D9 (नवमांश) दोनों में एक ही राशि में स्थित है।',
    effectsHi: 'जातक का शारीरिक स्वास्थ्य, मान-सम्मान और भाग्य अत्यंत दृढ़ होता है; कठिन परिस्थितियों में भी विजय मिलती है।',
  });

  // 6. Dhana Yoga (Lords of 1, 2, 5, 9, 11 sambandha)
  const activeYogas = allYogas.filter((y) => y.isActive);

  // Generate detailed Phaladesh text according to Jataka Parijata
  const lagnaResultHi = `आपके लग्न का स्वामी ${lagna.rashi.lordHi} है एवं लग्न राशि ${lagna.rashi.nameHi} है। जातक पारिजात के अनुसार यह ${lagna.rashi.elementHi} तत्व की राशि है, जो आपको ${
    lagna.rashi.element === 'Fire'
      ? 'साहसी, स्वाभिमानी, ऊर्जावान एवं स्पष्टवादी'
      : lagna.rashi.element === 'Earth'
      ? 'व्यावहारिक, धैर्यवान, स्थिर बुद्धि एवं परिश्रमी'
      : lagna.rashi.element === 'Air'
      ? 'कुशाग्र बुद्धि, सामाजिक, विचारशील एवं न्यायप्रिय'
      : 'भावुक, संवेदनशील, आध्यात्मिक एवं दयालु'
  } व्यक्तित्व प्रदान करती है।`;

  const karmaHouse = kundli.d1Houses[9]; // 10th house
  const karmaOccupants = karmaHouse.planets.map((p) => p.nameHi).join(', ');
  const careerKarmaResultHi = `दशम भाव (कर्म भाव) में ${karmaHouse.rashi.nameHi} राशि स्थित है जिसके स्वामी ${karmaHouse.rashi.lordHi} हैं। ${
    karmaOccupants
      ? `दशम भाव में ${karmaOccupants} ग्रह स्थित हैं जो आपको कार्यक्षेत्र में विशेष पहचान और अधिकार दिलाते हैं।`
      : `कर्मेश ${karmaHouse.rashi.lordHi} की स्थिति के अनुसार सेवा, व्यवसाय व स्वतंत्र निर्णय क्षमता में उत्तम प्रगति होगी।`
  }`;

  const dhanaHouse = kundli.d1Houses[1]; // 2nd house
  const labhaHouse = kundli.d1Houses[10]; // 11th house
  const wealthResultHi = `द्वितीय (धन) भाव के स्वामी ${dhanaHouse.rashi.lordHi} एवं एकादश (लाभ) भाव के स्वामी ${labhaHouse.rashi.lordHi} हैं। आय के स्रोत निरंतर बने रहेंगे और जातक अपनी मेहनत से संचित संपत्ति में निरंतर वृद्धि करेगा।`;

  return {
    lagnaResultHi,
    careerKarmaResultHi,
    wealthResultHi,
    activeYogas,
    allYogas,
  };
};
