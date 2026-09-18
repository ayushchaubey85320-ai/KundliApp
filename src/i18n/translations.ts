export type Language = 'hi' | 'en';

export const TRANSLATIONS = {
  hi: {
    // App & Header
    appTitle: 'VedicKundli',
    appSubtitle: 'वैदिक ज्योतिष एवं जन्मपत्री',
    guidanceBy: 'मार्गदर्शन: पं. संजय चौबे',
    loginBtn: 'लॉगिन करें',
    logoutBtn: 'लॉगआउट',
    guestUser: 'अतिथि (Guest)',
    toggleLanguage: 'English',

    // Home Screen Action Cards
    homeTitle: 'वैदिक ज्योतिष अनुसंधान संस्थान',
    homeSubtitle: 'प्राचीन पराशर एवं जातक पारिजात पद्धति पर आधारित सटीक गणना',
    actionMakeKundliTitle: '1. जन्म कुंडली बनाएं',
    actionMakeKundliSub: 'लग्न, नवमेश, षोडशवर्ग (D1-D16) व महादशा का सम्पूर्ण विवरण',
    actionMatchKundliTitle: '2. कुंडली मिलान (गुण मिलान)',
    actionMatchKundliSub: '36 गुण अष्टकूट मिलान, नाड़ी/भकूट दोष व वैदिक उपाय',

    // Pandit Profile Card
    panditCardBadge: 'पूज्य ज्योतिषाचार्य',
    panditName: 'पं. संजय चौबे',
    panditTitle: 'वैदिक ज्योतिष, षोडशवर्ग चक्र एवं वास्तु मर्मज्ञ',
    panditExp: '30+ वर्षों का गहन अनुभव एवं सहस्रों जन्मपत्रियों का सफल विश्लेषण',
    panditSpecialties: [
      'सटीक जन्मपत्री एवं षोडशवर्ग (D1-D16) चक्र विश्लेषण',
      'विवाह हेतु 36 गुण अष्टकूट मिलान एवं दोष निवारण',
      'विंशोत्तरी महादशा एवं गोचर फलकथन',
      'गृह एवं व्यापारिक वास्तु दोष परीक्षण',
      'शास्त्रोक्त रत्न, रुद्राक्ष एवं वैदिक अनुष्ठान परामर्श',
    ],
    panditBlessing: '“यथा शिखा मयूराणां नागानां मणयो यथा। तद्वद्वेदाङ्गशास्त्राणां ज्योतिषं मूर्धनि स्थितम्॥”',
    panditConsultBtn: 'परामर्श एवं मार्गदर्शन प्राप्त करें',

    // Login Page
    loginHeading: 'दिव्य वैदिक ज्योतिष में आपका स्वागत है',
    loginSubheading: 'सटीक जन्मपत्री निर्माण एवं 36 गुण मिलान हेतु प्रवेश करें',
    googleSignIn: 'Google के साथ लॉगिन करें',
    skipGuest: 'छोड़ें (अतिथि के रूप में आगे बढ़ें)',
    whyLoginTitle: 'लॉगिन करने के लाभ:',
    whyLoginPoints: [
      'अपनी व परिवार की कुंडलियां सुरक्षित रूप से क्लाउड पर सहेजें',
      'किसी भी फोन या कंप्यूटर से कभी भी एक्सेस करें',
      '36 गुण मिलान का विस्तृत विश्लेषण व परिणाम सहेजें',
    ],

    // Make Kundli Screen
    formHeading: 'जन्म विवरण प्रविष्ट करें',
    formName: 'जातक का नाम',
    formGender: 'लिंग',
    formMale: 'पुरुष (Male)',
    formFemale: 'स्त्री (Female)',
    formDate: 'जन्म तिथि',
    formTime: 'जन्म समय',
    formPlace: 'जन्म स्थान (शहर / गांव)',
    formSubmit: 'कुंडली तैयार करें एवं देखें',
    formCancel: 'रद्द करें',

    // Detailed Kundli Views
    chartTitle: 'लग्न कुंडली (D1 Lagna Chart)',
    divisionalChartsTitle: 'षोडशवर्ग चक्र (D1 से D16)',
    grahaTitle: 'ग्रह स्थिति',
    dashaTitle: 'विंशोत्तरी महादशा',
    phaladeshTitle: 'फलादेश व योग',
    kpTitle: 'के.पी. पद्धति',
    doshasTitle: 'दोष विचार (मांगलिक/कालसर्प)',

    // Milan Screen
    milanTitle: 'वैदिक अष्टकूट कुंडली मिलान (36 गुण)',
    milanSubtitle: 'वर एवं कन्या का सूक्ष्म गुण मिलान व शास्त्रोक्त फल',
    groomDetails: 'वर का जन्म विवरण',
    brideDetails: 'कन्या का जन्म विवरण',
    calculateMilanBtn: 'गुण मिलान गणना करें',
    milanScoreOutOf: 'कुल प्राप्त गुण (36 में से)',
    gunaBreakdownTitle: 'अष्टकूट गुण विवरण (8 Kootas Breakdown)',
    doshaRemediesTitle: 'दोष विचार एवं पं. संजय चौबे द्वारा सुझाए गए उपाय',
  },

  en: {
    // App & Header
    appTitle: 'VedicKundli',
    appSubtitle: 'Vedic Astrology & Janampatri',
    guidanceBy: 'Guidance: Pt. Sanjay Chaubey',
    loginBtn: 'Login',
    logoutBtn: 'Logout',
    guestUser: 'Guest',
    toggleLanguage: 'हिन्दी',

    // Home Screen Action Cards
    homeTitle: 'Vedic Astrology Research Portal',
    homeSubtitle: 'Authentic Parashara & Jataka Parijata Astronomical Calculations',
    actionMakeKundliTitle: '1. Make Kundli (Janam Kundali)',
    actionMakeKundliSub: 'Detailed Lagna, Navamsha, Shodashvarga (D1-D16) & Vimshottari Dasha',
    actionMatchKundliTitle: '2. Match Kundli (Guna Milan)',
    actionMatchKundliSub: '36 Guna Ashtakoot Matching, Nadi/Bhakoot Dosha & Vedic Remedies',

    // Pandit Profile Card
    panditCardBadge: 'Revered Jyotishacharya',
    panditName: 'Pt. Sanjay Chaubey',
    panditTitle: 'Vedic Astrologer, Shodashvarga & Vastu Expert',
    panditExp: '30+ Years of profound experience analyzing thousands of horoscopes',
    panditSpecialties: [
      'Accurate Janampatri & Shodashvarga (D1 to D16) Analysis',
      '36 Guna Ashtakoot Kundli Matching & Dosha Nivaran',
      'Vimshottari Mahadasha & Gochara Phala predictions',
      'Residential & Commercial Vastu Dosha assessment',
      'Scriptural Gemstone, Rudraksha & Vedic Anushthan guidance',
    ],
    panditBlessing: '“Just as the crest adorns the peacock and jewels crown the serpent, Astrology stands supreme atop all Vedic sciences.”',
    panditConsultBtn: 'Seek Consultation & Guidance',

    // Login Page
    loginHeading: 'Welcome to Divine Vedic Kundli',
    loginSubheading: 'Sign in to generate authentic horoscopes & 36 Guna Ashtakoot matching',
    googleSignIn: 'Continue with Google',
    skipGuest: 'Skip for now (Continue as Guest)',
    whyLoginTitle: 'Benefits of Signing In:',
    whyLoginPoints: [
      'Save your & family birth charts securely to the cloud',
      'Access saved Kundlis across your phone and tablet',
      'Retain matching records with detailed remedies',
    ],

    // Make Kundli Screen
    formHeading: 'Enter Birth Details',
    formName: 'Full Name',
    formGender: 'Gender',
    formMale: 'Male',
    formFemale: 'Female',
    formDate: 'Date of Birth',
    formTime: 'Time of Birth',
    formPlace: 'Place of Birth (City / Town)',
    formSubmit: 'Generate & View Kundli',
    formCancel: 'Cancel',

    // Detailed Kundli Views (Retaining Sacred Vedic Terminology)
    chartTitle: 'Lagna Kundli (D1 Lagna Chart)',
    divisionalChartsTitle: 'Shodashvarga Charts (D1 to D16)',
    grahaTitle: 'Graha Sthiti (Planets)',
    dashaTitle: 'Vimshottari Dasha',
    phaladeshTitle: 'Phaladesh & Raj Yogas',
    kpTitle: 'KP System',
    doshasTitle: 'Dosha Vichar (Mangal / Kalsarpa)',

    // Milan Screen
    milanTitle: 'Vedic Ashtakoot Kundli Milan (36 Gunas)',
    milanSubtitle: 'Accurate Matchmaking for Groom & Bride with Detailed Koota Scores',
    groomDetails: 'Groom (Var) Birth Details',
    brideDetails: 'Bride (Kanya) Birth Details',
    calculateMilanBtn: 'Calculate Ashtakoot Milan',
    milanScoreOutOf: 'Total Gunas Scored (Out of 36)',
    gunaBreakdownTitle: 'Ashtakoot Guna Breakdown (Side-by-Side)',
    doshaRemediesTitle: 'Dosha Assessment & Remedies by Pt. Sanjay Chaubey',
  },
};

// Authentic Vedic Rashi names preserved in English
export const VEDIC_RASHI_NAMES: Record<number, { hi: string; en: string }> = {
  1: { hi: 'मेष राशि', en: 'Mesha Rashi' },
  2: { hi: 'वृषभ राशि', en: 'Vrishabha Rashi' },
  3: { hi: 'मिथुन राशि', en: 'Mithuna Rashi' },
  4: { hi: 'कर्क राशि', en: 'Karka Rashi' },
  5: { hi: 'सिंह राशि', en: 'Simha Rashi' },
  6: { hi: 'कन्या राशि', en: 'Kanya Rashi' },
  7: { hi: 'तुला राशि', en: 'Tula Rashi' },
  8: { hi: 'वृश्चिक राशि', en: 'Vrishchika Rashi' },
  9: { hi: 'धनु राशि', en: 'Dhanu Rashi' },
  10: { hi: 'मकर राशि', en: 'Makara Rashi' },
  11: { hi: 'कुम्भ राशि', en: 'Kumbha Rashi' },
  12: { hi: 'मीन राशि', en: 'Meena Rashi' },
};

// Authentic Vedic Graha names preserved in English
export const VEDIC_GRAHA_NAMES: Record<string, { hi: string; en: string }> = {
  Sun: { hi: 'सूर्य (Surya)', en: 'Surya' },
  Moon: { hi: 'चन्द्र (Chandra)', en: 'Chandra' },
  Mars: { hi: 'मंगल (Mangal)', en: 'Mangal' },
  Mercury: { hi: 'बुध (Budha)', en: 'Budha' },
  Jupiter: { hi: 'बृहस्पति / गुरु (Guru)', en: 'Guru (Jupiter)' },
  Venus: { hi: 'शुक्र (Shukra)', en: 'Shukra (Venus)' },
  Saturn: { hi: 'शनि (Shani)', en: 'Shani' },
  Rahu: { hi: 'राहु (Rahu)', en: 'Rahu' },
  Ketu: { hi: 'केतु (Ketu)', en: 'Ketu' },
};
