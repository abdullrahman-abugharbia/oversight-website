/** About page content — Figma frame `about us` (90:2393). */

import neutrality from '@/assets/images/about-neutrality.webp';
import whyNeutral from '@/assets/images/img-364x303.webp';
import whyPrecision from '@/assets/images/img-330x330.webp';
import whyProtection from '@/assets/images/img-364x303-2.webp';
import secResidential from '@/assets/images/img-642x400.webp';
import secCommercial from '@/assets/images/img-642x400-2.webp';
import secIndustrial from '@/assets/images/img-642x400-3.webp';
import secEducation from '@/assets/images/img-642x400-4.webp';
import ctaBand from '@/assets/images/gradient-band.webp';
import digital from '@/assets/images/about-digital.webp';
import commitment from '@/assets/images/about-commitment.webp';
import neom from '@/assets/images/neom-logo.webp';
import sabic from '@/assets/images/sabic-logo.webp';
import emaar from '@/assets/images/emaar-logo.webp';
import almarai from '@/assets/images/almarai-logo.webp';
import gov from '@/assets/images/government-logo.webp';
import moe from '@/assets/images/ministry-of-education-logo.webp';

export const aboutHero = {
  /* Figma sets this as three explicit lines, the middle one in #46a39e */
  titleLead: 'Oversight..',
  titleAccent: 'عينك الهندسية',
  titleTail: 'المحايدة لحماية عقارك',
  body: 'نقدم خدمات فحص هندسي دقيقة وموثوقة لضمان جودة وسلامة العقارات، معتمدين على أحدث التقنيات وأفضل المهندسين.',
};

export interface Pillar {
  num: string;
  title: string;
  body: string;
}

export const pillars: Pillar[] = [
  {
    num: '01/',
    title: 'البداية والخبرة',
    body: 'سنوات من الخبرة العملية في السوق السعودي، نجمع بين المعرفة الأكاديمية والتطبيق العملي.',
  },
  {
    num: '02/',
    title: 'الريادة التقنية',
    body: 'استخدام أحدث أجهزة الفحص غير الإتلافي (NDT) لتقديم تقارير رقمية دقيقة.',
  },
  {
    num: '03/',
    title: 'الاعتماد الرسمي',
    body: 'مهندسون معتمدون من الهيئة السعودية للمهندسين، نلتزم بكود البناء السعودي.',
  },
];

export const oath = {
  title: 'ميثاق أمانة Oversight الهندسي',
  sub: 'لأننا ندرك أن قراراتكم العقارية هي استثمار العمر، فإن فريقنا الهندسي بالكامل يلتزم أمامكم بثلاثة عهود مهنية لا نساوم عليها أبدًا.',
  items: [
    {
      title: 'الحياد المطلق والاستقلالية التامة',
      body: 'لا نتعامل مع المطورين أو البائعين. تقريرنا يخدمك أنت فقط ولا يخضع لأي تأثير خارجي. نحن عينك الفاحصة المستقلة لضمان استثمار آمن وموثوق.',
      image: neutrality,
      wide: true,
    },
    {
      title: 'الفحص الرقمي بدون تكسير',
      body: 'نستخدم أجهزة الكشف غير الإتلافي (NDT) لرؤية ما خلف الجدران دون الحاجة إلى أي تكسير أو تخريب. تقنية متطورة لتقييم البنية التحتية بدقة متناهية.',
      image: digital,
      wide: false,
    },
    {
      title: 'احترام وقتك والوفاء بالموعد',
      body: 'نلتزم بالموعد المحدد للزيارة ونسلم تقريرك الفني الكامل في الوقت المتفق عليه — 24 إلى 48 ساعة. دقة في الفحص وسرعة في الإنجاز.',
      image: commitment,
      wide: false,
    },
  ],
};

/**
 * Figma lays these out right-to-left as: حياد (right) · الدقة (centre, raised
 * and taller) · حماية (left). Array order follows that RTL reading order.
 */
export const whyUs = {
  title: 'لماذا يختار الملاك والمطورون Oversight؟',
  items: [
    {
      title: 'حياد وأمانة كاملة',
      body: 'نحن جهة فحص مستقلة ومحايدة 100%؛ هدفنا رصد الواقع الفعلي للعقار دون مجاملة لأي طرف',
      image: whyNeutral,
      featured: false,
    },
    {
      title: 'الدقة المتناهية',
      body: 'نفحص بأحدث الأجهزة العالمية لنكشف لك ما تخفيه الجدران والأسقف بالصور والتحليل الحراري',
      image: whyPrecision,
      featured: true,
    },
    {
      title: 'حماية وقدرة تفاوضية',
      body: 'نحميك من نفقات الصيانة المفاجئة ونمنحك مستنداً هندسياً قوياً يساعدك على خفض سعر الشراء العادل',
      image: whyProtection,
      featured: false,
    },
  ],
};

export interface Sector {
  num: string;
  code: string;
  title: string;
  body: string;
  tag: string;
  /** Card background photo (Figma: 642x400 behind a dark gradient). */
  image: string;
}

export const sectors = {
  title: 'تخصصات تشمل كافة المنشآت والقطاعات العقارية',
  items: [
    {
      num: '01',
      code: 'SBC 1101 / SBC 1102',
      title: 'القطاع السكني',
      body: 'الفلل المستقلة، الشقق السكنية، والمجمعات والبيوت السكنية.',
      tag: '250+ نقطة فحص متكاملة',
      image: secResidential,
    },
    {
      num: '02',
      code: 'SBC 201 / SBC 801',
      title: 'القطاع التجاري والضيافة',
      body: 'المولات والمراكز التجارية، المكاتب الإدارية، الفنادق والشقق المفروشة.',
      tag: 'فحص MEP شامل وأنظمة أمان',
      image: secCommercial,
    },
    {
      num: '03',
      code: 'SBC 304 / OSHA Standards',
      title: 'القطاع الصناعي واللوجستي',
      body: 'المستودعات والمخازن، المصانع القائمة، ومراكز التوزيع اللوجستية.',
      tag: 'فحص الإجهاد الخرساني والجمالونات',
      image: secIndustrial,
    },
    {
      num: '04',
      code: 'SBC 801 / WHO IAQ',
      title: 'القطاع التعليمي والخدمي',
      body: 'المدارس والجامعات، دور رياض الأطفال، والمراكز الثقافية والاجتماعية.',
      tag: 'السلامة البيئية، التهوية والإنذار',
      image: secEducation,
    },
  ] as Sector[],
};

export interface Partner {
  name: string;
  logo: string;
  category: string;
}

export const partners = {
  title: 'شركاء يثقون بدقة تقاريرنا',
  filters: ['الكل', 'حكومي', 'تجاري', 'سكني'],
  items: [
    { name: 'NEOM', logo: neom, category: 'تجاري' },
    { name: 'SABIC', logo: sabic, category: 'تجاري' },
    { name: 'Emaar', logo: emaar, category: 'سكني' },
    { name: 'Almarai', logo: almarai, category: 'تجاري' },
    { name: 'Government', logo: gov, category: 'حكومي' },
    { name: 'Ministry of Education', logo: moe, category: 'حكومي' },
  ] as Partner[],
};

export const aboutCta = {
  image: ctaBand,
  title: 'ابدأ فحص عقارك اليوم واضمن حقك',
  body: 'لا تترك استثمارك للصدفة. تواصل معنا الآن للحصول على استشارة هندسية وفحص شامل لعقارك.',
  primary: 'احجز فحص عقارك الشامل الآن',
  secondary: 'WhatsApp',
};
