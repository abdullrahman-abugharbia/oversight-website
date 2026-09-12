/**
 * English content tree.
 *
 * Typed as `Content`, which is derived from the Arabic tree — so if a key is
 * missing or misspelled here, `tsc` fails. Images are reused from the Arabic
 * tree rather than re-imported, since artwork is language-independent.
 */

import { ar } from './ar';
import type { Content } from './ar';

const img = ar.home;
const aboutImg = ar.about;
const workImg = ar.work;

export const en: Content = {
  /* ------------------------------------------------------------------ site */
  site: {
    navItems: [
      { label: 'Home', to: '/' },
      { label: 'About Us', to: '/about' },
      { label: 'Our Work', to: '/work' },
      { label: 'Services', to: '/services' },
      { label: 'Contact Us', to: '/contact' },
    ],
    contact: {
      phone: '0599399368',
      phoneArabic: '0599399368',
      phoneHref: 'tel:+966599399368',
      whatsappHref: 'https://wa.me/966599399368',
      email: 'info@oversight-sa.com',
      hours: 'Working hours: Saturday to Thursday (9 AM – 8 PM)',
      hoursShort: 'Available Saturday to Thursday, 9 AM to 8 PM',
      address: 'Riyadh, Al Rawdah District, Khurais Branch Road, Al Hassan Ibn Ali Street, 13211.',
      hqLabel: 'Head office: Riyadh, Kingdom of Saudi Arabia',
      mapCaption: 'Modern Building Standards Engineering Inspection (Oversight) — Riyadh',
    },
    footer: {
      blurb:
        'Precise engineering inspection — for trust and safety that lasts. Your licensed partner in the Kingdom for inspecting residential and commercial buildings and verifying compliance with the Saudi Building Code.',
      quickLinksTitle: 'Quick Links',
      contactTitle: 'Contact Information',
      quickLinks: [
        { label: 'Home', to: '/' },
        { label: 'About the Company', to: '/about' },
        { label: 'Our Services', to: '/services' },
        { label: 'Blog', to: '/work' },
        { label: 'FAQ', to: '/services#faq' },
      ],
      copyright: 'All rights reserved to Oversight',
      legalName: 'Modern Building Standards Company Ltd.',
    },
    ctaLabels: {
      freeConsult: 'Free Phone Consultation',
      bookInspection: 'Book Your Inspection Now',
      callUs: 'Call Us',
      whatsapp: 'Contact Us on WhatsApp',
      callDirect: 'Call Us by Phone',
    },
    ui: {
      navAria: 'Main navigation',
      langAria: 'Change language',
      menuOpen: 'Open menu',
      menuClose: 'Close menu',
      menuLabel: 'Menu',
      diagnosticsAria: 'Choose your situation',
      serviceTabsAria: 'Inspection types',
      partnersFilterAria: 'Filter partners',
      partnersEmpty: 'No partners in this category yet.',
      sliderAria: 'Compare the naked eye view with the thermal camera view',
      prev: 'Previous',
      next: 'Next',
      testimonialNth: 'Testimonial',
      phoneLabel: 'Phone',
      emailLabel: 'Email',
      mapAlt: 'Map of the Oversight head office — Riyadh, Al Rawdah District',
      openInMaps: 'Open in Google Maps',
      form: {
        sending: 'Sending…',
        successTitle: 'Your request has been received',
        successBody:
          'One of our engineers will contact you within minutes to confirm the details and set the inspection date.',
        sendAnother: 'Send another request',
        errName: 'Please enter your full name',
        errPhone: 'A Saudi phone number of 10 digits starting with 0',
        errEmail: 'Please enter a valid email address',
        failed:
        'We could not send your message. Check your connection and try again, or call us directly.',
      mockNotice: 'Demo mode: no email was actually sent (no delivery key configured).',
      errMessage: 'Please write your message',
      },
      notFound: {
        title: 'Page not found',
        body: 'Sorry, we could not find the page you are looking for. The link may be outdated or the page may have moved.',
        cta: 'Back to the home page',
      },
    },
  },

  /* ------------------------------------------------------------------ home */
  home: {
    hero: {
      image: img.hero.image,
      titleLead: 'Your property deserves protection..',
      titleAccent: 'We see what you cannot',
      titleTail: 'so you can live with peace of mind.',
      body: 'Comprehensive engineering inspection and assessment for residential and commercial buildings, using the latest non-destructive testing (NDT) equipment and a certified engineering team that safeguards your investment.',
    },
    aboutBlock: {
      eyebrow: 'About Us',
      title: 'Uncovering our construction solutions',
      paragraphs: [
        'At Oversight Engineering Inspection, we are committed to turning your property vision into a safe and stable investment with unmatched precision. Our reputation rests on integrity, neutrality and innovation, making us the right choice for a wide range of buildings and facilities.',
        'With years of experience in this field, our engineering team brings a wealth of knowledge and field expertise to every inspection project, ensuring high-quality results and accurate reports that give you complete confidence.',
      ],
      more: 'Learn more',
    },
    stats: [
      { value: '350+', label: 'Clients and companies who trust us to assess and inspect their property assets' },
      { value: '$250K+', label: 'Total value of assets and projects inspected, protected and verified as sound' },
      { value: '100+', label: 'Consultants and engineers overseeing inspections after using our services' },
    ],
    diagnosticHeader: {
      title: 'Where do your property concerns lie today?',
      sub: 'Choose the case that describes your situation and we will point you straight to the right engineering solution:',
    },
    diagnostics: [
      {
        id: 'structural',
        title: 'Full Structural Inspection',
        lead: 'I need a complete inspection and a compliance certificate',
        body: 'For investors, developers and organisations that want to assess an entire facility, or obtain certified periodic reports for various financing bodies.',
        cta: 'Request a full structural inspection',
        image: img.diagnostics[0].image,
        tint: img.diagnostics[0].tint,
        accent: img.diagnostics[0].accent,
        bodyColor: img.diagnostics[0].bodyColor,
      },
      {
        id: 'prepurchase',
        title: 'Pre-Purchase Inspection',
        lead: 'I want to buy or rent a new property',
        body: 'If you are about to buy the home of a lifetime and want complete certainty about the plumbing, electrics, insulation and structural frame of the building.',
        cta: 'Protect your investment — inspect before buying',
        image: img.diagnostics[1].image,
        tint: img.diagnostics[1].tint,
        accent: img.diagnostics[1].accent,
        bodyColor: img.diagnostics[1].bodyColor,
      },
      {
        id: 'moisture',
        title: 'Leak & Moisture Detection',
        lead: 'I notice damp or a hidden water leak',
        body: 'If you are dealing with cracked paint, water stains, or an unexplained rise in your water bill without knowing the real cause behind it.',
        cta: 'Request a moisture inspection now',
        image: img.diagnostics[2].image,
        tint: img.diagnostics[2].tint,
        accent: img.diagnostics[2].accent,
        bodyColor: img.diagnostics[2].bodyColor,
      },
    ],
    stepsHeader: {
      title: '4 simple steps between you and a secure property with peace of mind',
      sub: 'A clear, fast inspection journey that starts with your phone request and ends with your certified technical report.',
      cta: 'Start your inspection journey now',
    },
    steps: [
      {
        num: '01',
        title: 'Request a Consultation',
        body: 'Fill in the quick request form with your basic property details in under a minute — no payment details or credit card required.',
      },
      {
        num: '02',
        title: 'Schedule the Appointment',
        body: 'One of our consulting engineers calls you to answer your questions and confirm the inspection cost and the most convenient date for our site visit.',
      },
      {
        num: '03',
        title: 'Site Visit & Inspection',
        body: 'Our certified engineering team visits your property equipped with the latest devices and techniques to carry out a complete survey and record precise findings with photos and video.',
      },
      {
        num: '04',
        title: 'Receive Your Certified Report',
        body: 'You receive a comprehensive, well-organised engineering report (PDF) supported by photos, findings and proposed technical solutions within just 24 to 48 hours of the inspection.',
      },
    ],
    detailedHeader: {
      title: 'How exactly do our services protect your property?',
      sub: 'We deliver precise engineering inspections covering every structural, architectural and mechanical aspect, to ensure your property is sound and your investment endures.',
    },
    detailedServices: [
      {
        num: '01',
        code: 'SRV_CIVIL',
        title: 'Structural (Civil) Inspection',
        body: 'A comprehensive assessment of the building’s structural integrity, including foundations, columns and slabs, to confirm they can carry their loads and resist environmental factors.',
        bullets: [
          { title: 'Concrete Testing', body: 'Testing concrete strength and detecting cracks using NDT techniques.' },
          { title: 'Reinforcement & Corrosion', body: 'Locating reinforcement bars and measuring corrosion or rust levels.' },
        ],
        linkLabel: 'Structural inspection details',
        image: img.detailedServices[0].image,
      },
      {
        num: '02',
        code: 'SRV_ELEC',
        title: 'Electrical Inspection',
        body: 'A precise inspection of electrical systems to identify potential hazards such as overloads and damaged wiring, ensuring a safe, code-compliant environment.',
        bullets: [
          { title: 'Distribution Board Inspection', body: 'Verifying connection integrity and correct load distribution.' },
          { title: 'Thermal Imaging of Circuits', body: 'Detecting hot spots that could lead to fires.' },
        ],
        linkLabel: 'Electrical inspection details',
        image: img.detailedServices[1].image,
      },
      {
        num: '03',
        code: 'SRV_MECH',
        title: 'Mechanical Inspection (HVAC)',
        body: 'Assessing the efficiency of heating, ventilation and air-conditioning (HVAC) systems, along with plumbing systems, for optimal performance and lower energy consumption.',
        bullets: [
          { title: 'Air-Conditioning Performance', body: 'Measuring airflow and refrigerant levels to ensure effective cooling.' },
          { title: 'Air Duct Inspection', body: 'Confirming there are no duct leaks, to preserve air quality.' },
        ],
        linkLabel: 'Mechanical inspection details',
        image: img.detailedServices[2].image,
      },
      {
        num: '04',
        code: 'SRV_ENV',
        title: 'Environmental & Air Quality Inspection',
        body: 'Measuring the quality of the building’s indoor environment to confirm it is free of pollutants, providing a healthy and safe space for occupants or staff.',
        bullets: [
          { title: 'Humidity & Mould Levels', body: 'Early detection of mould growth and moisture-related microbes.' },
          { title: 'Gas & Particulate Measurement', body: 'Analysing carbon monoxide levels and airborne particulates.' },
        ],
        linkLabel: 'Environmental inspection details',
        image: img.detailedServices[3].image,
      },
      {
        num: '05',
        code: 'SRV_LEAK',
        title: 'Water Leak & Waterproofing Inspection',
        body: 'Using the latest non-destructive detection equipment to pinpoint water leak sources precisely, and to assess the effectiveness of waterproofing and thermal insulation systems.',
        bullets: [
          { title: 'Thermal Imaging for Leaks', body: 'Identifying hidden damp behind walls and ceilings without breaking anything.' },
          { title: 'Waterproofing Inspection', body: 'Verifying the integrity of insulation layers on roofs and in bathrooms.' },
        ],
        linkLabel: 'Leak inspection details',
        image: img.detailedServices[4].image,
      },
    ],
    demo: {
      title: 'Our devices reveal what layers of paint and concrete hide',
      sub: 'Drag the handle left and right to see the real difference between the naked eye and advanced thermal inspection equipment:',
      normal: {
        image: img.demo.normal.image,
        chip: 'Your naked eye sees a sound wall',
        caption: 'Your naked eye sees a sound wall, completely free of any visible defects or leaks beneath the paint',
      },
      thermal: {
        image: img.demo.thermal.image,
        chip: 'The thermal camera sees the hidden danger',
        caption:
          'The thermal camera reveals a hidden, spreading water leak damaging the structural frame from within, long before it fails',
      },
      note: 'Insulation and damp problems can be masked by fresh paint for a while, fooling anyone who looks — but our devices detect them early so you avoid urgent, expensive repairs later.',
    },
    labHeader: {
      eyebrow: 'NDT LAB / EQUIPMENT & TECHNOLOGY',
      title: 'Our mobile technical lab: precise devices that replace demolition and guesswork',
      sub: 'We do not rely on visual inspection; we measure durability and safety with the latest licensed inspection equipment in the world.',
    },
    devices: [
      {
        code: '01 / THRM',
        name: 'Advanced Thermal Cameras',
        body: 'Pinpoint water leak sources, hidden damp patches and thermal differences in pipework and concrete behind tiles and paint, without compromising the wall.',
        status: 'CALIBRATED',
        image: img.devices[0].image,
      },
      {
        code: '02 / MSTR',
        name: 'Digital Moisture Meter',
        body: 'Measures instantaneous humidity and the level of hidden water saturation inside walls, floors and concrete to millimetre accuracy, tracing the leak back to its source.',
        status: 'SCAN_READY',
        image: img.devices[1].image,
      },
      {
        code: '03 / BRSCOPE',
        name: 'Plumbing & Narrow Pipe Camera',
        body: 'Penetrates plumbing networks, tight spaces and critical corners to film pipes and valves from the inside, capturing cracks or damage in sound and vision with no demolition.',
        status: 'PROBE_ACTIVE',
        image: img.devices[2].image,
      },
      {
        code: '04 / SWR_CAM',
        name: 'Main Drainage Network Camera',
        body: 'Designed to travel through drainage lines and main water networks to locate breaks, blockages and leaks with high precision, backed by a photographic report of the lines.',
        status: 'HD_FEED',
        image: img.devices[3].image,
      },
      {
        code: '05 / AIR_QUAL',
        name: 'Air Quality & Ventilation Tester',
        body: 'Measures air speed and flow, indoor temperature and humidity, and environmental purity, to confirm HVAC systems work efficiently and spaces are free of damp and mould.',
        status: 'SENSORS_ON',
        image: img.devices[4].image,
      },
      {
        code: '06 / LSR_LVL',
        name: 'Laser Level & Alignment Device',
        body: 'Projects precise laser lines to verify that floors, walls and ceilings are level, exposing architectural defects, settlement or slope in tiling and surfaces.',
        status: 'ALIGNING',
        image: img.devices[5].image,
      },
      {
        code: '07 / ELEC_TEST',
        name: 'Electrical Socket & Earthing Testers',
        body: 'Inspect and test the efficiency of connections, distribution boards, safety breakers, and current and earthing resistance, to prevent short-circuit hazards in your home.',
        status: 'TESTING_CIRCUIT',
        image: img.devices[6].image,
      },
      {
        code: '08 / LUX_MTR',
        name: 'Light Intensity & Brightness Meter',
        body: 'A handheld device with a light-sensitive white dome sensor and a digital display showing the illuminance reading.',
        status: 'METERING',
        image: img.devices[7].image,
      },
    ],
    mapCta: {
      title: 'Talk directly to the specialist engineer',
      body: 'Do not leave the decision to buy the home of a lifetime — or the safety of your facility — to guesswork. Our engineers are ready to answer your questions and schedule inspection visits as quickly as possible.',
    },
  },

  /* ----------------------------------------------------------------- about */
  about: {
    aboutHero: {
      titleLead: 'Oversight..',
      titleAccent: 'your impartial engineering eye',
      titleTail: 'protecting your property',
      body: 'We provide precise, reliable engineering inspection services to guarantee the quality and safety of properties, backed by the latest technology and the best engineers.',
    },
    pillars: [
      {
        num: '01/',
        title: 'Origins & Experience',
        body: 'Years of practical experience in the Saudi market, combining academic knowledge with hands-on application.',
      },
      {
        num: '02/',
        title: 'Technical Leadership',
        body: 'Using the latest non-destructive testing (NDT) equipment to deliver precise digital reports.',
      },
      {
        num: '03/',
        title: 'Official Accreditation',
        body: 'Engineers accredited by the Saudi Council of Engineers, committed to the Saudi Building Code.',
      },
    ],
    oath: {
      title: 'The Oversight engineering integrity charter',
      sub: 'Because we understand that your property decisions are the investment of a lifetime, our entire engineering team commits to three professional pledges we will never compromise on.',
      items: [
        {
          title: 'Absolute neutrality and complete independence',
          body: 'We do not work with developers or sellers. Our report serves you alone and is subject to no outside influence. We are your independent inspecting eye, ensuring a safe and trustworthy investment.',
          image: aboutImg.oath.items[0].image,
          wide: true,
        },
        {
          title: 'Digital inspection with no demolition',
          body: 'We use non-destructive testing (NDT) equipment to see behind walls without any breaking or damage. Advanced technology for assessing infrastructure with extreme precision.',
          image: aboutImg.oath.items[1].image,
          wide: false,
        },
        {
          title: 'Respecting your time and meeting the deadline',
          body: 'We keep to the agreed visit time and deliver your complete technical report when promised — 24 to 48 hours. Precision in inspection, speed in delivery.',
          image: aboutImg.oath.items[2].image,
          wide: false,
        },
      ],
    },
    whyUs: {
      title: 'Why do owners and developers choose Oversight?',
      items: [
        {
          title: 'Full Neutrality & Integrity',
          body: 'We are a 100% independent and impartial inspection body; our aim is to record the property’s actual condition without favouring any party',
          image: aboutImg.whyUs.items[0].image,
          featured: false,
        },
        {
          title: 'Extreme Precision',
          body: 'We inspect with the latest equipment in the world to reveal what walls and ceilings hide, through imaging and thermal analysis',
          image: aboutImg.whyUs.items[1].image,
          featured: true,
        },
        {
          title: 'Protection & Negotiating Power',
          body: 'We protect you from sudden maintenance costs and give you a strong engineering document that helps you negotiate a fair purchase price',
          image: aboutImg.whyUs.items[2].image,
          featured: false,
        },
      ],
    },
    sectors: {
      title: 'Specialisations covering every facility and property sector',
      items: [
        {
          num: '01',
          code: 'SBC 1101 / SBC 1102',
          title: 'Residential Sector',
          body: 'Detached villas, residential apartments, compounds and family homes.',
          tag: '250+ integrated inspection points',
          image: aboutImg.sectors.items[0].image,
        },
        {
          num: '02',
          code: 'SBC 201 / SBC 801',
          title: 'Commercial & Hospitality Sector',
          body: 'Malls and shopping centres, administrative offices, hotels and serviced apartments.',
          tag: 'Full MEP and safety systems inspection',
          image: aboutImg.sectors.items[1].image,
        },
        {
          num: '03',
          code: 'SBC 304 / OSHA Standards',
          title: 'Industrial & Logistics Sector',
          body: 'Warehouses and stores, operating factories, and logistics distribution centres.',
          tag: 'Concrete stress and truss inspection',
          image: aboutImg.sectors.items[2].image,
        },
        {
          num: '04',
          code: 'SBC 801 / WHO IAQ',
          title: 'Education & Services Sector',
          body: 'Schools and universities, kindergartens, and cultural and community centres.',
          tag: 'Environmental safety, ventilation and alarms',
          image: aboutImg.sectors.items[3].image,
        },
      ],
    },
    partners: {
      title: 'Partners who trust the accuracy of our reports',
      filters: ['All', 'Government', 'Commercial', 'Residential'],
      items: [
        { name: 'NEOM', logo: aboutImg.partners.items[0].logo, category: 'Commercial' },
        { name: 'SABIC', logo: aboutImg.partners.items[1].logo, category: 'Commercial' },
        { name: 'Emaar', logo: aboutImg.partners.items[2].logo, category: 'Residential' },
        { name: 'Almarai', logo: aboutImg.partners.items[3].logo, category: 'Commercial' },
        { name: 'Government', logo: aboutImg.partners.items[4].logo, category: 'Government' },
        { name: 'Ministry of Education', logo: aboutImg.partners.items[5].logo, category: 'Government' },
      ],
    },
    aboutCta: {
      image: aboutImg.aboutCta.image,
      title: 'Start inspecting your property today and secure your rights',
      body: 'Do not leave your investment to chance. Contact us now for an engineering consultation and a full inspection of your property.',
      primary: 'Book your full property inspection now',
      secondary: 'WhatsApp',
    },
  },

  /* -------------------------------------------------------------- services */
  services: {
    servicesHero: {
      title: 'We see what you cannot: explore the smart inspection map of your property',
      body: 'Click any part of the building to see how our engineers inspect it with the latest equipment, and what you will receive in your report within 24 to 48 hours.',
    },
    serviceTabs: [
      {
        id: 'civil',
        tabLabel: '01 Civil & Structural Inspection',
        title: 'Civil & Structural Inspection',
        whatTitle: 'What and how do we inspect?',
        what: [
          'Assessment of structural elements (columns, load-bearing walls, concrete slabs)',
          'Detecting and analysing hairline and structural cracks',
          'Inspecting structural insulation systems and corrosion resistance',
          'Testing material and plaster quality and compliance with the Saudi Building Code (SBC)',
        ],
        whoTitle: 'Who is this inspection for?',
        who: [
          'Buyers of villas and family homes',
          'Property developers and contracting companies',
          'Established companies and commercial facilities',
        ],
        metaTitle: 'Tooling, impact and speed',
        metaSub: '(Tech, Value & Delivery)',
        chips: ['NDT Devices', 'Investment Value', '24-48hr PDF', 'Laser Level'],
        cta: 'Book a structural inspection for your property',
      },
      {
        id: 'electrical',
        tabLabel: '02 Electrical Inspection',
        title: 'Electrical Inspection',
        whatTitle: 'What and how do we inspect?',
        what: [
          'Inspecting distribution boards, connection integrity and load distribution',
          'Thermal imaging of circuits to detect hot spots',
          'Testing safety breaker efficiency and earthing resistance',
          'Detecting overloads, damaged wiring and code compliance',
        ],
        whoTitle: 'Who is this inspection for?',
        who: [
          'Owners of residential and commercial property',
          'Industrial facilities and warehouses',
          'Organisations needing an electrical safety certificate',
        ],
        metaTitle: 'Tooling, impact and speed',
        metaSub: '(Tech, Value & Delivery)',
        chips: ['Thermal Camera', 'Safety Report', '24-48hr PDF', 'Circuit Test'],
        cta: 'Book an electrical inspection for your property',
      },
      {
        id: 'mechanical',
        tabLabel: '03 Mechanical Inspection — Plumbing & HVAC',
        title: 'Mechanical Inspection — Plumbing & HVAC',
        whatTitle: 'What and how do we inspect?',
        what: [
          'Measuring air-conditioning performance, airflow and refrigerant levels',
          'Inspecting air ducts and confirming there are no leaks',
          'Inspecting plumbing networks with digital pipe borescopes',
          'Assessing HVAC efficiency and reducing energy consumption',
        ],
        whoTitle: 'Who is this inspection for?',
        who: [
          'Villa and apartment owners before handover',
          'Hotels and commercial complexes',
          'Facilities suffering from high energy bills',
        ],
        metaTitle: 'Tooling, impact and speed',
        metaSub: '(Tech, Value & Delivery)',
        chips: ['Borescope', 'HVAC Audit', '24-48hr PDF', 'Airflow Meter'],
        cta: 'Book a mechanical inspection for your property',
      },
      {
        id: 'environment',
        tabLabel: '04 Indoor Environment & Air Health',
        title: 'Indoor Environment & Air Health',
        whatTitle: 'What and how do we inspect?',
        what: [
          'Measuring humidity levels and early detection of mould and microbes',
          'Analysing carbon monoxide levels and airborne particulates',
          'Measuring air speed, flow and ventilation efficiency',
          'Assessing indoor environmental quality against WHO IAQ standards',
        ],
        whoTitle: 'Who is this inspection for?',
        who: [
          'Schools and kindergartens',
          'Administrative offices and health centres',
          'Families experiencing recurring health problems',
        ],
        metaTitle: 'Tooling, impact and speed',
        metaSub: '(Tech, Value & Delivery)',
        chips: ['Air Quality', 'Health Report', '24-48hr PDF', 'Lux Meter'],
        cta: 'Book an environmental inspection for your property',
      },
      {
        id: 'waterproof',
        tabLabel: '05 Floor Waterproofing Test',
        title: 'Floor Waterproofing Test',
        whatTitle: 'What and how do we inspect?',
        what: [
          'Thermal imaging to locate hidden damp behind walls and ceilings',
          'Inspecting the integrity of insulation layers on roofs and in bathrooms',
          'Measuring water saturation inside floors and concrete',
          'Tracing the leak back to its source with no demolition',
        ],
        whoTitle: 'Who is this inspection for?',
        who: [
          'Owners of properties suffering from leaks',
          'Buyers before signing a purchase contract',
          'Developers before handing over units',
        ],
        metaTitle: 'Tooling, impact and speed',
        metaSub: '(Tech, Value & Delivery)',
        chips: ['Thermal Scan', 'Leak Trace', '24-48hr PDF', 'Moisture Meter'],
        cta: 'Book a waterproofing inspection',
      },
    ],
    processSteps: [
      {
        num: '1',
        title: 'Instant, easy request',
        body: 'Fill in the quick request form with your property details in under a minute — no payment details or credit card required.',
      },
      {
        num: '2',
        title: 'Coordination & scheduling',
        body: 'Our consulting engineer calls you to coordinate and confirm the details and date of the most convenient site inspection visit.',
      },
      {
        num: '3',
        title: 'Inspection with the latest technology',
        body: 'Our engineering team visits equipped with the latest NDT devices and techniques to carry out a complete, precise survey of your property with no demolition.',
      },
      {
        num: '4',
        title: 'Your report in 24-48 hours',
        body: 'You receive a detailed digital engineering report (PDF) supported by photos, findings and technical solutions within just 24 to 48 hours of the inspection.',
      },
    ],
    servicesCta: { title: 'Contact us now' },
  },

  /* ------------------------------------------------------------------ work */
  work: {
    workHero: {
      title: 'Our work and inspection projects we are proud of',
      body: 'Real examples showing how our engineering reports have helped individuals and companies uncover defects, save costs, and protect their property investments.',
    },
    impact: {
      title: 'The Oversight engineering impact',
      stats: [
        { prefix: 'More than', value: '+2,400', label: 'properties inspected and protected', icon: 'building' },
        { prefix: 'More than', value: '18 mil', label: 'SAR saved for our clients', icon: 'money' },
        { value: '0%', label: 'random demolition', icon: 'warning' },
        { value: '24 to 48h', label: 'average report delivery time', icon: 'clock' },
      ],
    },
    caseHeader: {
      title: 'Every case starts with a question and ends with a clearer decision',
      sub: 'We present "our work" as simplified "case studies" showing: the problem ➔ the technical detection ➔ the outcome and financial saving.',
    },
    caseStudies: [
      {
        id: 'c1',
        title: 'Full inspection of a luxury residential villa - Riyadh',
        tags: ['#villa_inspection', '#thermal_scan', '#electrical_loads'],
        points: [
          'Complete assessment of mechanical and electrical systems (MEP) to ensure efficiency and safety.',
          'Inspection of thermal and water insulation on roofs and facades to avoid future problems.',
          'Comprehensive inspection of every building component before purchase.',
        ],
        value: '45,000',
        valueLabel: 'Value added for the owner',
        valueNote: 'SAR (deducted from the property price for repairs)',
        image: workImg.caseStudies[0].image,
      },
      {
        id: 'c2',
        title: 'Complex moisture detection in a commercial complex - Jeddah',
        tags: ['#leak_detection', '#flexible_pipes', '#marble_protection'],
        points: [
          'Using advanced thermal cameras to map hidden moisture paths beneath luxury finishes.',
          'Inspecting the flexible pipe network to confirm there are no hidden leaks causing future damage.',
          'Pinpointing the moisture source to millimetre accuracy with no demolition.',
        ],
        value: '120,000',
        valueLabel: 'Value added for the owner',
        valueNote: 'SAR (saved in restoration costs)',
        image: workImg.caseStudies[1].image,
      },
      {
        id: 'c3',
        title: 'Structural inspection of a commercial tower - Dammam',
        tags: ['#SBC_building_code', '#NDT_inspection', '#bank_financing'],
        points: [
          'Verifying the integrity of the concrete frame using non-destructive testing (NDT) techniques.',
          'Matching the engineering drawings against the actual construction to ensure compliance with Saudi Building Code requirements.',
          'Preparing the technical report within just 48 hours.',
        ],
        value: '12,000,000',
        valueLabel: 'Value added for the owner',
        valueNote: 'SAR (securing deal financing)',
        image: workImg.caseStudies[2].image,
      },
    ],
    workCta: {
      title: 'Book the engineering inspection for your property now',
      body: 'A comprehensive, documented engineering report covering all of these items within just 24 to 48 hours and with no demolition.',
      primary: 'Book your inspection now',
      secondary: 'Contact us on WhatsApp',
      badges: ['Officially accredited', 'Fast delivery (24-48 hours)', 'No demolition'],
    },
  },

  /* --------------------------------------------------------------- contact */
  contact: {
    contactHero: {
      title: 'Contact us.. our engineers are waiting to help you',
      body: 'We are glad to answer your questions and arrange the inspection date that suits you best. Contact us directly through our quick channels, or leave your details and we will call you within minutes.',
    },
    channels: [
      {
        id: 'phone',
        label: 'Quick phone line (for urgent cases):',
        value: '(0599399368)',
        note: 'Available Saturday to Thursday, 9 AM to 8 PM',
        href: 'tel:+966599399368',
      },
      {
        id: 'whatsapp',
        label: 'Instant support and messaging via WhatsApp:',
        value: 'START CHAT',
        note: 'Tap to start an instant chat to book an appointment, or send photos and drawings of your property to the service engineer.',
        href: 'https://wa.me/966599399368',
      },
      {
        id: 'email',
        label: 'Email for developers and major projects (B2B):',
        value: 'info@oversight-sa.com',
        note: 'We will reply with the technical proposal within 24 hours.',
        href: 'mailto:info@oversight-sa.com',
      },
      {
        id: 'address',
        label: 'Head office and directions:',
        value: 'Riyadh, Al Rawdah District, Khurais Branch Road, Al Hassan Ibn Ali Street, 13211.',
        note: '',
        href: '',
      },
    ],
    form: {
      title: 'Request your free consultation now',
      sub: 'Fill in your details in seconds and a certified engineer will contact you to review your request and set the inspection date.',
      fields: {
        name: { label: 'Full Name', placeholder: 'Ahmed Ali' },
        phone: { label: 'Phone Number', placeholder: '059XXXXXXX' },
        email: { label: 'Email Address', placeholder: 'ahmed@gmail.com' },
        subject: { label: 'Subject', placeholder: 'Related to the service' },
        reason: { label: 'Reason for Message', placeholder: 'General enquiry' },
        message: { label: 'Message', placeholder: 'Your message goes here...' },
      },
      reasonOptions: [
        'General enquiry',
        'Book a property inspection',
        'Quote for major projects (B2B)',
        'Enquiry about a previous report',
        'Complaint or feedback',
      ],
      optIn: 'Receive updates from Oversight',
      submit: 'Send',
    },
    mapBlock: {
      title: 'Head office map and field coverage',
      sub: 'Location of Modern Building Standards Engineering Inspection (Oversight) — Riyadh',
    },
  },

  /* ------------------------------------------------------------------- faq */
  faq: {
    faqHeader: {
      eyebrow: 'FAQ',
      title: 'Find answers to common questions',
    },
    faqItems: [
      {
        id: 'f1',
        q: 'Does the engineering inspection require any demolition or damage to the property?',
        a: 'Absolutely not! We rely 100% on non-destructive testing (NDT) techniques, the latest thermal cameras, electromagnetic moisture sensors and digital pipe borescopes, which let us see precisely behind walls and under tiles without any breaking or damage.',
      },
      {
        id: 'f2',
        q: 'Do I need to be present at the property during the inspection?',
        a: 'You do not need to stay for the whole site inspection. What matters is arranging access for our engineers in advance (providing a key or coordinating with the caretaker). Our team will carry out the full inspection independently and document every finding with photos and video, delivered to you in a detailed report.',
      },
      {
        id: 'f3',
        q: 'Do Oversight inspection services cover older and second-hand homes, or only new ones?',
        a: 'We cover every type of property: new builds before handover, second-hand homes before purchase, and existing buildings needing periodic assessment. Each case has a different inspection protocol accounting for the building’s age, structural condition and type of use.',
      },
      {
        id: 'f4',
        q: 'What is the difference between a visual inspection and an inspection with Oversight’s technical equipment?',
        a: 'A visual inspection only catches defects that are already visible, after they have worsened. Our thermal cameras, moisture sensors and pipe borescopes see behind walls and under tiles, revealing leaks and defects in their early stages before they become costly structural damage.',
      },
      {
        id: 'f5',
        q: 'Which cities and regions do Oversight inspection services cover?',
        a: 'Our head office is in Riyadh and we cover the main cities of the Kingdom of Saudi Arabia. For major projects and developers we provide extended field coverage by arrangement — contact us to confirm coverage in your area.',
      },
      {
        id: 'f6',
        q: 'How does the report help me negotiate the property price?',
        a: 'The report is a documented, impartial engineering record setting out the defects and their estimated repair cost. That gives you strong negotiating power to reduce the purchase price by the cost of repairs, or to require the seller to fix the defects before completing the deal.',
      },
    ],
  },

  /* ---------------------------------------------------------- testimonials */
  testimonials: {
    testimonialsTitle: 'Hear what our clients say',
    testimonials: [
      {
        id: 't1',
        quote:
          'An Oversight inspection saved me before I signed to buy a new villa in Riyadh. Their engineers used their equipment to uncover a hidden water leak under the roof waterproofing that would have cost me a fortune to repair later. Their well-organised technical report was the tool I used to adjust the price with the developer and protect my rights.',
        name: 'Customer name and details',
        city: 'Riyadh',
      },
      {
        id: 't2',
        quote:
          'For years I suffered from paint constantly peeling off the bathroom walls, and every plumber I called talked about demolishing the tiles and guessing. The Oversight engineer identified the problem wall for me within minutes using his thermal device, without touching a single wall.',
        name: 'Customer name and details',
        city: 'Riyadh',
      },
      {
        id: 't3',
        quote:
          'At Nama Real Estate Development we rely on Oversight reports, compliant with the Saudi Building Code, for all our residential and commercial buildings before handing units over to owners. Their average 24-hour report delivery and high technical accuracy are a cornerstone supporting our credibility with our clients.',
        name: 'Customer name and details',
        city: 'Riyadh',
      },
    ],
  },
};
