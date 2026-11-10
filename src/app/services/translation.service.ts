import { Injectable, signal } from '@angular/core';

export type SupportedLang = 'en' | 'te' | 'hi';

export interface LangOption {
  code: SupportedLang;
  label: string;
  nativeLabel: string;
}

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  readonly supportedLanguages: LangOption[] = [
    { code: 'en', label: 'English', nativeLabel: 'English' },
    { code: 'te', label: 'Telugu', nativeLabel: 'తెలుగు' },
    { code: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी' },
  ];

  readonly currentLang = signal<SupportedLang>('en');

  private translations: Record<SupportedLang, Record<string, string>> = {
    en: {
      // Navigation
      'nav.brand': 'Yātrā Rail',
      'nav.brandSub': 'THE OVERLAND RAIL JOURNAL',
      'nav.search': 'Search Trains',
      'nav.pnr': 'PNR Status',
      'nav.myBookings': 'My Bookings',
      'nav.signIn': 'Sign In',
      'nav.register': 'Register',
      'nav.logout': 'Sign Out',
      'nav.welcome': 'Welcome',

      // Hero
      'hero.badge': 'ESTD. 1853 • INDIAN OVERLAND EXPEDITIONS',
      'hero.title': 'Slow Journeys, Timeless Tracks',
      'hero.subtitle': 'Experience the soul of Indian landscapes through vintage corridors, panoramic vista-domes, and seamless digital reservations.',
      'hero.exploreBtn': 'Explore Journeys',
      'hero.trackPnrBtn': 'Check PNR Status',
      'hero.statJourneys': 'Daily Departures across 15+ Heritage Corridors',
      'hero.statReliability': 'Verified Seat Availability & Instant PNR Confirmation',

      // Booking Panel
      'panel.title': 'Plan Your Expedition',
      'panel.from': 'From Station',
      'panel.to': 'To Station',
      'panel.date': 'Journey Date',
      'panel.class': 'Class (Optional)',
      'panel.allClasses': 'All Travel Classes',
      'panel.searchBtn': 'Search Available Trains',
      'panel.sameStationErr': 'Origin and destination cannot be the same station.',

      // Popular Destinations
      'dest.title': 'Curated Rail Expeditions',
      'dest.subtitle': 'Handpicked scenic routes weaving through mist-kissed hills, coastal cliffs, and royal heritage frontiers.',
      'dest.bookRoute': 'Reserve This Route',

      // Travel Info / Editorial
      'info.title': 'The Philosophy of Slow Overland Travel',
      'info.subtitle': 'A refined travel experience honoring heritage, gastronomy, and mindful exploration.',
      'info.card1Title': 'Panoramic Vista Domes',
      'info.card1Desc': 'Expansive glass domes and observation lounges designed to connect travelers directly to passing landscapes.',
      'info.card2Title': 'Regional Gastronomy',
      'info.card2Desc': 'Curated onboard dining celebrating authentic regional thalis, artisanal chai, and heritage pantry recipes.',
      'info.card3Title': 'Digital Paperless Pass',
      'info.card3Desc': 'Instant cryptographic PNR generation, digital boarding pass, and live SMS updates without paper tickets.',
      'info.card4Title': 'Low Carbon Footprint',
      'info.card4Desc': 'Railways produce up to 75% fewer greenhouse emissions per passenger kilometer compared to air travel.',

      // Search & Availability Page
      'search.pageTitle': 'Find Your Train Journey',
      'search.pageSubtitle': 'Select your departure and arrival stations to view live seat availability and fares.',
      'search.modify': 'Modify Journey',
      'search.resultsCount': 'Journeys Available',
      'search.filterTime': 'Departure Time',
      'search.filterMorning': 'Morning (06:00 - 12:00)',
      'search.filterAfternoon': 'Afternoon (12:00 - 18:00)',
      'search.filterEvening': 'Evening / Night (18:00 - 06:00)',
      'search.selectTrain': 'Book Selected Class',
      'search.duration': 'Duration',
      'search.runsOn': 'Runs On',
      'search.noTrainsFound': 'No direct trains found for this route on this date.',
      'search.viewAll': 'View all available heritage trains',

      // Booking Page
      'booking.title': 'Passenger Reservation',
      'booking.subtitle': 'Enter passenger details and confirm your digital railway ticket reservation.',
      'booking.trainSummary': 'Selected Train Summary',
      'booking.passengerInfo': 'Passenger Information',
      'booking.passengerNum': 'Passenger',
      'booking.fullName': 'Full Name (as per Govt ID)',
      'booking.age': 'Age (Years)',
      'booking.gender': 'Gender',
      'booking.male': 'Male',
      'booking.female': 'Female',
      'booking.other': 'Other',
      'booking.berth': 'Berth Preference',
      'booking.lower': 'Lower Berth',
      'booking.middle': 'Middle Berth',
      'booking.upper': 'Upper Berth',
      'booking.sideLower': 'Side Lower',
      'booking.sideUpper': 'Side Upper',
      'booking.window': 'Window Seat',
      'booking.noPref': 'No Preference',
      'booking.addPassenger': '+ Add Another Passenger',
      'booking.removePassenger': 'Remove Passenger',
      'booking.fareBreakdown': 'Fare Summary',
      'booking.baseFare': 'Base Ticket Fare',
      'booking.catering': 'Optional Regional Catering',
      'booking.convenienceFee': 'Reservation & Service Fee',
      'booking.totalPayable': 'Total Fare Payable',
      'booking.confirmBtn': 'Confirm Reservation & Generate PNR',
      'booking.maxPassengerAlert': 'Maximum 4 passengers per booking.',

      // Confirmation Page
      'confirm.congrats': 'Booking Confirmed!',
      'confirm.subtitle': 'Your electronic reservation pass is ready. Please retain your 10-digit PNR for verification.',
      'confirm.pnrLabel': '10-DIGIT PNR NUMBER',
      'confirm.ticketType': 'OFFICIAL DIGITAL TRAVEL PASS',
      'confirm.printBtn': 'Print / Download Ticket',
      'confirm.viewMyBookings': 'Go to My Bookings',
      'confirm.bookAnother': 'Book Another Route',
      'confirm.coach': 'Coach',
      'confirm.seat': 'Berth/Seat',
      'confirm.status': 'Booking Status',
      'confirm.platform': 'Expected Platform',

      // My Bookings
      'myBookings.title': 'My Travel Journal & Bookings',
      'myBookings.subtitle': 'Review your previous and upcoming rail expeditions, access digital passes, or manage cancellations.',
      'myBookings.empty': 'You have not reserved any railway journeys yet.',
      'myBookings.emptyCta': 'Explore Scenic Routes',
      'myBookings.viewTicket': 'View Digital Pass',
      'myBookings.cancelTicket': 'Cancel Ticket',
      'myBookings.confirmCancel': 'Are you sure you want to cancel ticket for PNR',
      'myBookings.refundPolicy': 'An 80% refund (minus cancellation fee) will be credited to your original payment method.',
      'myBookings.cancelSuccess': 'Ticket cancelled successfully. LocalStorage has been updated.',

      // PNR Status
      'pnr.title': 'PNR Enquiry & Journey Tracking',
      'pnr.subtitle': 'Enter your 10-digit PNR number to check current reservation status, coach allocation, and timetable.',
      'pnr.inputLabel': '10-Digit PNR Number',
      'pnr.inputPlaceholder': 'e.g. 4829104821',
      'pnr.checkBtn': 'Check PNR Status',
      'pnr.notFound': 'No booking record found for PNR',
      'pnr.notFoundTip': 'Please check if the 10-digit PNR is correct or make a test booking to generate a new PNR.',
      'pnr.samplePnrs': 'Quick demo PNRs in your system:',

      // Auth
      'auth.loginTitle': 'Sign In to Your Journal',
      'auth.loginSubtitle': 'Access your rail reservations, saved itineraries, and digital passes.',
      'auth.registerTitle': 'Create Your Traveler Account',
      'auth.registerSubtitle': 'Join the overland travel community and experience seamless rail journeys.',
      'auth.email': 'Email Address',
      'auth.password': 'Password',
      'auth.phone': '10-Digit Mobile Number',
      'auth.name': 'Full Name',
      'auth.confirmPassword': 'Confirm Password',
      'auth.loginBtn': 'Sign In',
      'auth.registerBtn': 'Create Account',
      'auth.demoBtn': 'Autofill Demo Credentials',
      'auth.hasAccount': 'Already have an account? Sign in here.',
      'auth.noAccount': "Don't have an account yet? Register here.",
      'auth.passMismatch': 'Passwords do not match.',
      'auth.invalidEmail': 'Please enter a valid email address.',
      'auth.invalidPhone': 'Please enter a valid 10-digit Indian phone number.',
      'auth.passMin': 'Password must be at least 6 characters.',
      'auth.required': 'This field is required.',

      // Footer
      'footer.about': 'An independent, modern academic railway reservation web platform engineered with Angular Standalone Components, Reactive Forms, and seamless multilingual accessibility.',
      'footer.routes': 'Iconic Corridors',
      'footer.links': 'Navigation',
      'footer.disclaimer': 'Academic Project Showcase • College Assignment Evaluation • Clean Architecture',
    },

    te: {
      // Navigation
      'nav.brand': 'యాత్రా రైల్',
      'nav.brandSub': 'ది ఓవర్‌ల్యాండ్ రైల్ జర్నల్',
      'nav.search': 'రైళ్లను వెతకండి',
      'nav.pnr': 'పీఎన్ఆర్ స్థితి',
      'nav.myBookings': 'నా బుకింగ్‌లు',
      'nav.signIn': 'లాగిన్',
      'nav.register': 'నమోదు చేసుకోండి',
      'nav.logout': 'లాగ్ అవుట్',
      'nav.welcome': 'స్వాగతం',

      // Hero
      'hero.badge': 'స్థాపితం 1853 • భారతీయ రైలు యాత్రలు',
      'hero.title': 'ప్రశాంతమైన ప్రయాణాలు, అద్భుతమైన మార్గాలు',
      'hero.subtitle': 'ప్రాచీన రైలు మార్గాలు, సుందరమైన దృశ్యాలు మరియు సులభమైన డిజిటల్ టిక్కెట్ రిజర్వేషన్లతో భారతదేశ అందాలను అనుభవించండి.',
      'hero.exploreBtn': 'యాత్రలను అన్వేషించండి',
      'hero.trackPnrBtn': 'పీఎన్ఆర్ స్థితిని తనిఖీ చేయండి',
      'hero.statJourneys': '15 కంటే ఎక్కువ మార్గాల్లో ప్రతిరోజూ రైళ్లు',
      'hero.statReliability': 'ఖచ్చితమైన సీట్ల లభ్యత & తక్షణ పీఎన్ఆర్ నిర్ధారణ',

      // Booking Panel
      'panel.title': 'మీ ప్రయాణాన్ని ప్లాన్ చేసుకోండి',
      'panel.from': 'బయలుదేరే స్టేషన్',
      'panel.to': 'చేరుకునే స్టేషన్',
      'panel.date': 'ప్రయాణ తేదీ',
      'panel.class': 'తరగతి (ఐచ్ఛికం)',
      'panel.allClasses': 'అన్ని తరగతులు',
      'panel.searchBtn': 'లభ్యతలో ఉన్న రైళ్లను వెతకండి',
      'panel.sameStationErr': 'బయలుదేరే మరియు చేరుకునే స్టేషన్లు ఒకేలా ఉండకూడదు.',

      // Popular Destinations
      'dest.title': 'ప్రసిద్ధ సుందరమైన రైలు మార్గాలు',
      'dest.subtitle': 'మంచు కొండలు, సముద్ర తీరాలు మరియు చారిత్రక నగరాల గుండా సాగే అద్భుతమైన ప్రయాణాలు.',
      'dest.bookRoute': 'ఈ మార్గాన్ని బుక్ చేయండి',

      // Travel Info
      'info.title': 'రైలు ప్రయాణ అనుభవం మరియు విశేషాలు',
      'info.subtitle': 'సురక్షితమైన, ఆహ్లాదకరమైన మరియు పర్యావరణహితమైన ప్రయాణ పద్ధతి.',
      'info.card1Title': 'విస్టాడోమ్ కోచ్‌లు',
      'info.card1Desc': 'సుందరమైన ప్రకృతి దృశ్యాలను వీక్షించేందుకు ప్రత్యేకమైన గాజు పైకప్పు గల కోచ్‌లు.',
      'info.card2Title': 'ప్రాంతీయ రుచికరమైన భోజనం',
      'info.card2Desc': 'రైలు ప్రయాణంలో తాజా మరియు పరిశుభ్రమైన సాంప్రదాయ ఆహార సదుపాయాలు.',
      'info.card3Title': 'డిజిటల్ పేపర్‌లెస్ టికెట్',
      'info.card3Desc': 'కాగితం అవసరం లేకుండా మొబైల్ ద్వారా తక్షణ పీఎన్ఆర్ మరియు డిజిటల్ బోర్డింగ్ పాస్.',
      'info.card4Title': 'పర్యావరణ హితం',
      'info.card4Desc': 'విమాన ప్రయాణంతో పోలిస్తే రైలు ప్రయాణం 75% తక్కువ కర్బన ఉద్గారాలను కలిగిస్తుంది.',

      // Search & Availability Page
      'search.pageTitle': 'మీ రైలు ప్రయాణాన్ని కనుగొనండి',
      'search.pageSubtitle': 'సీట్ల లభ్యత మరియు టికెట్ ధరలను తెలుసుకోవడానికి స్టేషన్లను ఎంచుకోండి.',
      'search.modify': 'శోధనను మార్చండి',
      'search.resultsCount': 'రైళ్లు అందుబాటులో ఉన్నాయి',
      'search.filterTime': 'బయలుదేరే సమయం',
      'search.filterMorning': 'ఉదయం (06:00 - 12:00)',
      'search.filterAfternoon': 'మధ్యాహ్నం (12:00 - 18:00)',
      'search.filterEvening': 'సాయంత్రం / రాత్రి (18:00 - 06:00)',
      'search.selectTrain': 'ఎంచుకున్న తరగతిని బుక్ చేయండి',
      'search.duration': 'ప్రయాణ సమయం',
      'search.runsOn': 'నడిచే రోజులు',
      'search.noTrainsFound': 'ఈ తేదీన ఈ మార్గంలో రైళ్లు లభించలేదు.',
      'search.viewAll': 'అన్ని రైళ్లను చూడండి',

      // Booking Page
      'booking.title': 'ప్రయాణికుల రిజర్వేషన్',
      'booking.subtitle': 'ప్రయాణికుల వివరాలను నమోదు చేసి మీ డిజిటల్ రైల్వే టికెట్‌ను నిర్ధారించండి.',
      'booking.trainSummary': 'ఎంచుకున్న రైలు వివరాలు',
      'booking.passengerInfo': 'ప్రయాణికుల సమాచారం',
      'booking.passengerNum': 'ప్రయాణికుడు',
      'booking.fullName': 'పూర్తి పేరు (గుర్తింపు కార్డు ప్రకారం)',
      'booking.age': 'వయస్సు (సంవత్సరాలు)',
      'booking.gender': 'లింగం',
      'booking.male': 'పురుషుడు',
      'booking.female': 'స్త్రీ',
      'booking.other': 'ఇతర',
      'booking.berth': 'బెర్త్ ప్రాధాన్యత',
      'booking.lower': 'క్రింది బెర్త్ (Lower)',
      'booking.middle': 'మధ్య బెర్త్ (Middle)',
      'booking.upper': 'పై బెర్త్ (Upper)',
      'booking.sideLower': 'సైడ్ లోయర్',
      'booking.sideUpper': 'సైడ్ అప్పర్',
      'booking.window': 'కిటికీ సీటు',
      'booking.noPref': 'ప్రాధాన్యత లేదు',
      'booking.addPassenger': '+ మరొక ప్రయాణికుడిని చేర్చండి',
      'booking.removePassenger': 'ప్రయాణికుడిని తొలగించండి',
      'booking.fareBreakdown': 'టికెట్ ఛార్జీల వివరాలు',
      'booking.baseFare': 'ప్రాథమిక టికెట్ ధర',
      'booking.catering': 'భోజన ఛార్జీలు (ఐచ్ఛికం)',
      'booking.convenienceFee': 'రిజర్వేషన్ & సర్వీస్ ఫీజు',
      'booking.totalPayable': 'మొత్తం చెల్లించవలసిన మొత్తం',
      'booking.confirmBtn': 'బుకింగ్ నిర్ధారించి పీఎన్ఆర్ పొందండి',
      'booking.maxPassengerAlert': 'ఒక బుకింగ్‌కు గరిష్టంగా 4 మంది ప్రయాణికులు మాత్రమే అనుమతించబడతారు.',

      // Confirmation Page
      'confirm.congrats': 'బుకింగ్ విజయవంతంగా పూర్తయింది!',
      'confirm.subtitle': 'మీ ఎలక్ట్రానిక్ రిజర్వేషన్ పాస్ సిద్ధంగా ఉంది. దయచేసి మీ 10-అంకెల పీఎన్ఆర్ నంబర్‌ను భద్రపరచండి.',
      'confirm.pnrLabel': '10-అంకెల పీఎన్ఆర్ నంబర్',
      'confirm.ticketType': 'అధికారిక డిజిటల్ రైలు పాస్',
      'confirm.printBtn': 'టికెట్‌ను ముద్రించండి / సేవ్ చేయండి',
      'confirm.viewMyBookings': 'నా బుకింగ్‌లకు వెళ్లండి',
      'confirm.bookAnother': 'మరొక టికెట్ బుక్ చేయండి',
      'confirm.coach': 'కోచ్',
      'confirm.seat': 'బెర్త్ / సీటు',
      'confirm.status': 'బుకింగ్ స్థితి',
      'confirm.platform': 'ప్లాట్‌ఫారం నంబర్',

      // My Bookings
      'myBookings.title': 'నా ప్రయాణ టికెట్లు & బుకింగ్‌లు',
      'myBookings.subtitle': 'మీ గత మరియు రాబోయే ప్రయాణాల వివరాలను చూడండి లేదా టికెట్‌లను రద్దు చేసుకోండి.',
      'myBookings.empty': 'మీరు ఇంకా ఎటువంటి రైలు టిక్కెట్లను బుక్ చేసుకోలేదు.',
      'myBookings.emptyCta': 'రైలు మార్గాలను చూడండి',
      'myBookings.viewTicket': 'డిజిటల్ పాస్ చూడండి',
      'myBookings.cancelTicket': 'టికెట్ రద్దు చేయండి',
      'myBookings.confirmCancel': 'మీరు ఖచ్చితంగా ఈ పీఎన్ఆర్ టికెట్‌ను రద్దు చేయాలనుకుంటున్నారా?',
      'myBookings.refundPolicy': 'రద్దు ఛార్జీలు మినహాయించి 80% మొత్తం మీ ఖాతాకు తిరిగి చెల్లించబడుతుంది.',
      'myBookings.cancelSuccess': 'టికెట్ విజయవంతంగా రద్దు చేయబడింది. LocalStorage అప్‌డేట్ చేయబడింది.',

      // PNR Status
      'pnr.title': 'పీఎన్ఆర్ స్థితి విచారణ',
      'pnr.subtitle': 'మీ రిజర్వేషన్ స్థితి, కోచ్ వివరాలు మరియు సమయాన్ని తెలుసుకోవడానికి 10-అంకెల పీఎన్ఆర్ నంబర్‌ను నమోదు చేయండి.',
      'pnr.inputLabel': '10-అంకెల పీఎన్ఆర్ నంబర్',
      'pnr.inputPlaceholder': 'ఉదాహరణ: 4829104821',
      'pnr.checkBtn': 'స్థితిని తనిఖీ చేయండి',
      'pnr.notFound': 'ఈ పీఎన్ఆర్ నంబర్‌తో ఎటువంటి టికెట్ రికార్డు లభించలేదు:',
      'pnr.notFoundTip': 'దయచేసి సరైన పీఎన్ఆర్ నంబర్‌ను నమోదు చేయండి లేదా కొత్తగా బుకింగ్ చేసుకోండి.',
      'pnr.samplePnrs': 'సిస్టమ్‌లోని నమూనా పీఎన్ఆర్ నంబర్లు:',

      // Auth
      'auth.loginTitle': 'మీ ఖాతాలోకి లాగిన్ అవ్వండి',
      'auth.loginSubtitle': 'మీ రైలు రిజర్వేషన్లు మరియు డిజిటల్ పాస్‌లను యాక్సెస్ చేయండి.',
      'auth.registerTitle': 'కొత్త ఖాతాను సృష్టించుకోండి',
      'auth.registerSubtitle': 'సులభమైన రైల్వే రిజర్వేషన్ల కోసం నమోదు చేసుకోండి.',
      'auth.email': 'ఈమెయిల్ చిరునామా',
      'auth.password': 'పాస్‌వర్డ్',
      'auth.phone': '10-అంకెల మొబైల్ నంబర్',
      'auth.name': 'పూర్తి పేరు',
      'auth.confirmPassword': 'పాస్‌వర్డ్‌ను నిర్ధారించండి',
      'auth.loginBtn': 'లాగిన్',
      'auth.registerBtn': 'ఖాతా సృష్టించండి',
      'auth.demoBtn': 'డెమో ఖాతా వివరాలు నింపండి',
      'auth.hasAccount': 'ఇప్పటికే ఖాతా ఉందా? ఇక్కడ లాగిన్ అవ్వండి.',
      'auth.noAccount': 'ఖాతా లేదా? ఇక్కడ నమోదు చేసుకోండి.',
      'auth.passMismatch': 'పాస్‌వర్డ్‌లు సరిపోలడం లేదు.',
      'auth.invalidEmail': 'సరైన ఈమెయిల్ చిరునామాను నమోదు చేయండి.',
      'auth.invalidPhone': 'సరైన 10-అంకెల మొబైల్ నంబర్‌ను నమోదు చేయండి.',
      'auth.passMin': 'పాస్‌వర్డ్ కనీసం 6 అక్షరాలు ఉండాలి.',
      'auth.required': 'ఈ ఫీల్డ్ తప్పనిసరి.',

      // Footer
      'footer.about': 'యాంగ్యులర్ స్టాండలోన్ కాంపోనెంట్స్ మరియు రియాక్టివ్ ఫారమ్‌లతో రూపొందించబడిన ఆధునిక స్వతంత్ర రైల్వే రిజర్వేషన్ వెబ్ ప్లాట్‌ఫారమ్.',
      'footer.routes': 'ముఖ్యమైన మార్గాలు',
      'footer.links': 'లింకులు',
      'footer.disclaimer': 'కళాశాల ప్రాజెక్ట్ మూల్యాంకనం కోసం రూపొందించబడింది.',
    },

    hi: {
      // Navigation
      'nav.brand': 'यात्रा रेल',
      'nav.brandSub': 'द ओवरलैंड रेल जर्नल',
      'nav.search': 'ट्रेन खोजें',
      'nav.pnr': 'पीएनआर स्थिति',
      'nav.myBookings': 'मेरी बुकिंग',
      'nav.signIn': 'साइन इन',
      'nav.register': 'पंजीकरण करें',
      'nav.logout': 'लॉग आउट',
      'nav.welcome': 'स्वागत है',

      // Hero
      'hero.badge': 'स्थापना 1853 • भारतीय रेल यात्राएं',
      'hero.title': 'शांत यात्राएं, अविस्मरणीय मार्ग',
      'hero.subtitle': 'विस्टाडोम डिब्बों, सुरम्य दृश्यों और आसान डिजिटल टिकट आरक्षण के साथ भारतीय रेल की सुंदरता का अनुभव करें।',
      'hero.exploreBtn': 'यात्राएं देखें',
      'hero.trackPnrBtn': 'पीएनआर स्थिति जांचें',
      'hero.statJourneys': '15 से अधिक मार्गों पर प्रतिदिन यात्राएं',
      'hero.statReliability': 'सटीक सीट उपलब्धता और तुरंत पीएनआर पुष्टिकरण',

      // Booking Panel
      'panel.title': 'अपनी यात्रा की योजना बनाएं',
      'panel.from': 'प्रस्थान स्टेशन',
      'panel.to': 'गंतव्य स्टेशन',
      'panel.date': 'यात्रा की तिथि',
      'panel.class': 'श्रेणी (वैकल्पिक)',
      'panel.allClasses': 'सभी यात्रा श्रेणियां',
      'panel.searchBtn': 'उपलब्ध ट्रेनें खोजें',
      'panel.sameStationErr': 'प्रस्थान और गंतव्य स्टेशन समान नहीं हो सकते।',

      // Popular Destinations
      'dest.title': 'विशेष दर्शनीय रेल मार्ग',
      'dest.subtitle': 'पहाड़ों, तटीय घाटियों और ऐतिहासिक धरोहरों से होकर गुजरने वाली खूबसूरत रेल यात्राएं।',
      'dest.bookRoute': 'यह मार्ग आरक्षित करें',

      // Travel Info
      'info.title': 'सुलभ और सुखद रेल यात्रा का अनुभव',
      'info.subtitle': 'सुरक्षित, पर्यावरण अनुकूल और आधुनिक रेल यात्रा की विशेषताएं।',
      'info.card1Title': 'विस्टाडोम कोच',
      'info.card1Desc': 'प्राकृतिक दृश्यों के मनमोहक दर्शन हेतु विशेष पारदर्शी कांच की छत वाले डिब्बे।',
      'info.card2Title': 'स्वादिष्ट क्षेत्रीय भोजन',
      'info.card2Desc': 'यात्रा के दौरान स्वच्छ और ताजे प्रामाणिक क्षेत्रीय व्यंजनों का आनंद लें।',
      'info.card3Title': 'डिजिटल पेपरलेस पास',
      'info.card3Desc': 'बिना कागज के मोबाइल से तुरंत पीएनआर और डिजिटल बोर्डिंग पास प्राप्त करें।',
      'info.card4Title': 'पर्यावरण हितैषी',
      'info.card4Desc': 'हवाई यात्रा की तुलना में ट्रेन यात्रा 75% तक कम कार्बन उत्सर्जन करती है।',

      // Search & Availability Page
      'search.pageTitle': 'अपनी ट्रेन यात्रा खोजें',
      'search.pageSubtitle': 'सीट उपलब्धता और किराया देखने के लिए स्टेशन चुनें।',
      'search.modify': 'खोज में बदलाव करें',
      'search.resultsCount': 'ट्रेनें उपलब्ध हैं',
      'search.filterTime': 'प्रस्थान समय',
      'search.filterMorning': 'सुबह (06:00 - 12:00)',
      'search.filterAfternoon': 'दोपहर (12:00 - 18:00)',
      'search.filterEvening': 'शाम / रात (18:00 - 06:00)',
      'search.selectTrain': 'चुनी गई श्रेणी बुक करें',
      'search.duration': 'यात्रा अवधि',
      'search.runsOn': 'चलने के दिन',
      'search.noTrainsFound': 'इस तिथि पर इस मार्ग के लिए कोई सीधी ट्रेन नहीं मिली।',
      'search.viewAll': 'सभी उपलब्ध ट्रेनें देखें',

      // Booking Page
      'booking.title': 'यात्री टिकट आरक्षण',
      'booking.subtitle': 'यात्री विवरण दर्ज करें और अपना डिजिटल टिकट सुरक्षित करें।',
      'booking.trainSummary': 'चयनित ट्रेन विवरण',
      'booking.passengerInfo': 'यात्री की जानकारी',
      'booking.passengerNum': 'यात्री',
      'booking.fullName': 'पूरा नाम (सरकारी पहचान पत्र अनुसार)',
      'booking.age': 'आयु (वर्ष)',
      'booking.gender': 'लिंग',
      'booking.male': 'पुरुष',
      'booking.female': 'महिला',
      'booking.other': 'अन्य',
      'booking.berth': 'बर्थ प्राथमिकता',
      'booking.lower': 'निचली बर्थ (Lower)',
      'booking.middle': 'मध्यम बर्थ (Middle)',
      'booking.upper': 'ऊपरी बर्थ (Upper)',
      'booking.sideLower': 'साइड लोअर',
      'booking.sideUpper': 'साइड अपर',
      'booking.window': 'खिड़की वाली सीट',
      'booking.noPref': 'कोई प्राथमिकता नहीं',
      'booking.addPassenger': '+ अन्य यात्री जोड़ें',
      'booking.removePassenger': 'यात्री हटाएं',
      'booking.fareBreakdown': 'किराया विवरण',
      'booking.baseFare': 'मूल टिकट किराया',
      'booking.catering': 'खानपान शुल्क (वैकल्पिक)',
      'booking.convenienceFee': 'आरक्षण एवं सेवा शुल्क',
      'booking.totalPayable': 'कुल देय राशि',
      'booking.confirmBtn': 'आरक्षण की पुष्टि करें और पीएनआर प्राप्त करें',
      'booking.maxPassengerAlert': 'एक बुकिंग में अधिकतम 4 यात्री अनुमत हैं।',

      // Confirmation Page
      'confirm.congrats': 'आरक्षण सफल रहा!',
      'confirm.subtitle': 'आपका इलेक्ट्रॉनिक यात्रा पास तैयार है। कृपया अपने 10-अंकों के पीएनआर को सुरक्षित रखें।',
      'confirm.pnrLabel': '10-अंकों का पीएनआर नंबर',
      'confirm.ticketType': 'आधिकारिक डिजिटल रेल पास',
      'confirm.printBtn': 'टिकट प्रिंट / डाउनलोड करें',
      'confirm.viewMyBookings': 'मेरी बुकिंग पर जाएं',
      'confirm.bookAnother': 'अन्य यात्रा बुक करें',
      'confirm.coach': 'कोच',
      'confirm.seat': 'बर्थ / सीट',
      'confirm.status': 'बुकिंग स्थिति',
      'confirm.platform': 'संभावित प्लेटफॉर्म',

      // My Bookings
      'myBookings.title': 'मेरी यात्रा टिकटें एवं बुकिंग',
      'myBookings.subtitle': 'अपनी पिछली और आगामी यात्राओं का विवरण देखें अथवा टिकट रद्द करें।',
      'myBookings.empty': 'आपने अभी तक कोई ट्रेन टिकट आरक्षित नहीं किया है।',
      'myBookings.emptyCta': 'रेल मार्ग खोजें',
      'myBookings.viewTicket': 'डिजिटल पास देखें',
      'myBookings.cancelTicket': 'टिकट रद्द करें',
      'myBookings.confirmCancel': 'क्या आप सचमुच इस पीएनआर टिकट को रद्द करना चाहते हैं?',
      'myBookings.refundPolicy': 'रद्दीकरण शुल्क काटकर 80% राशि आपके मूल खाते में वापस भेज दी जाएगी।',
      'myBookings.cancelSuccess': 'टिकट सफलतापूर्वक रद्द कर दिया गया है। LocalStorage अपडेट हुआ।',

      // PNR Status
      'pnr.title': 'पीएनआर स्थिति पूछताछ',
      'pnr.subtitle': 'अपनी आरक्षण स्थिति, कोच और समय सारिणी देखने हेतु 10-अंकों का पीएनआर नंबर दर्ज करें।',
      'pnr.inputLabel': '10-अंकों का पीएनआर नंबर',
      'pnr.inputPlaceholder': 'उदाहरण: 4829104821',
      'pnr.checkBtn': 'पीएनआर स्थिति जांचें',
      'pnr.notFound': 'इस पीएनआर नंबर के लिए कोई रिकॉर्ड नहीं मिला:',
      'pnr.notFoundTip': 'कृपया 10-अंकों का सही पीएनआर दर्ज करें या एक नई बुकिंग करें।',
      'pnr.samplePnrs': 'सिस्टम में उपलब्ध नमूना पीएनआर:',

      // Auth
      'auth.loginTitle': 'अपने खाते में साइन इन करें',
      'auth.loginSubtitle': 'अपने रेल टिकट और डिजिटल यात्रा पास तक पहुंचें।',
      'auth.registerTitle': 'नया यात्री खाता बनाएं',
      'auth.registerSubtitle': 'सरल और आधुनिक रेलवे आरक्षण का अनुभव लें।',
      'auth.email': 'ईमेल पता',
      'auth.password': 'पासवर्ड',
      'auth.phone': '10-अंकों का मोबाइल नंबर',
      'auth.name': 'पूरा नाम',
      'auth.confirmPassword': 'पासवर्ड की पुष्टि करें',
      'auth.loginBtn': 'साइन इन',
      'auth.registerBtn': 'खाता बनाएं',
      'auth.demoBtn': 'डेमो क्रेडेंशियल भरें',
      'auth.hasAccount': 'पहले से खाता है? यहां साइन इन करें।',
      'auth.noAccount': 'खाता नहीं है? यहां पंजीकरण करें।',
      'auth.passMismatch': 'पासवर्ड मेल नहीं खाते।',
      'auth.invalidEmail': 'कृपया वैध ईमेल पता दर्ज करें।',
      'auth.invalidPhone': 'कृपया वैध 10-अंकों का मोबाइल नंबर दर्ज करें।',
      'auth.passMin': 'पासवर्ड कम से कम 6 अक्षरों का होना चाहिए।',
      'auth.required': 'यह फ़ील्ड आवश्यक है।',

      // Footer
      'footer.about': 'एंगुलर स्टैंडअलोन घटकों और रिएक्टिव फॉर्म्स के साथ निर्मित एक आधुनिक रेलवे आरक्षण वेब प्लेटफॉर्म।',
      'footer.routes': 'प्रमुख रेल मार्ग',
      'footer.links': 'त्वरित लिंक',
      'footer.disclaimer': 'कॉलेज अकादमिक असाइनमेंट मूल्यांकन हेतु विशेष रूप से विकसित।',
    },
  };

  constructor() {
    const saved = localStorage.getItem('railway_lang') as SupportedLang;
    if (saved && (saved === 'en' || saved === 'te' || saved === 'hi')) {
      this.currentLang.set(saved);
    }
  }

  setLanguage(lang: SupportedLang): void {
    this.currentLang.set(lang);
    localStorage.setItem('railway_lang', lang);
  }

  t(key: string): string {
    const lang = this.currentLang();
    const dictionary = this.translations[lang] || this.translations.en;
    return dictionary[key] ?? this.translations.en[key] ?? key;
  }

  formatDate(dateStr: string): string {
    if (!dateStr) return '';
    try {
      const date = new Date(dateStr);
      const lang = this.currentLang();
      const locale = lang === 'te' ? 'te-IN' : lang === 'hi' ? 'hi-IN' : 'en-IN';
      return new Intl.DateTimeFormat(locale, {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }).format(date);
    } catch {
      return dateStr;
    }
  }

  formatCurrency(amount: number): string {
    const lang = this.currentLang();
    const locale = lang === 'te' ? 'te-IN' : lang === 'hi' ? 'hi-IN' : 'en-IN';
    try {
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
      }).format(amount);
    } catch {
      return `₹${amount}`;
    }
  }

  formatTime(timeStr: string): string {
    return timeStr;
  }
}
