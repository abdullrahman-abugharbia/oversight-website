/**
 * Site-wide content: navigation, contact details, footer.
 * All copy is taken verbatim from the Figma design.
 * Replace with API calls later — the UI reads only from these exports.
 */

export interface NavItem {
  label: string;
  to: string;
}

export const navItems: NavItem[] = [
  { label: 'الرئيسية', to: '/' },
  { label: 'من نحن', to: '/about' },
  { label: 'اعمالنا', to: '/work' },
  { label: 'خدمات', to: '/services' },
  { label: 'تواصل معنا', to: '/contact' },
];

export const contact = {
  phone: '0599399368',
  phoneArabic: '٠٥٩٩٣٩٩٣٦٨',
  phoneHref: 'tel:+966599399368',
  whatsappHref: 'https://wa.me/966599399368',
  email: 'info@oversight-sa.com',
  hours: 'ساعات العمل: من السبت للخميس (٩ صباحاً - ٨ مساءً)',
  hoursShort: 'متاح من السبت إلى الخميس، من 9 صباحاً حتى 8 مساءً',
  address: 'الرياض، حي الروضة، طريق خريص الفرعي، شارع الحسن بن علي، 13211.',
  hqLabel: 'مقرنا الرئيسي: الرياض، المملكة العربية السعودية',
  mapCaption: 'موقع شركة معايير البناء الحديثة للفحص الهندسي (Oversight) — الرياض',
};

export const footer = {
  blurb:
    'فحص هندسي دقيق.. لثقة وأمان يدوم طويلاً. شريكك المرخص في المملكة لفحص المباني السكنية والتجارية ومطابقة كود البناء السعودي.',
  quickLinksTitle: 'روابط سريعة',
  contactTitle: 'معلومات التواصل',
  quickLinks: [
    { label: 'الرئيسية', to: '/' },
    { label: 'عن الشركة', to: '/about' },
    { label: 'خدماتنا', to: '/services' },
    { label: 'المدونة', to: '/work' },
    { label: 'الأسئلة الشائعة', to: '/services#faq' },
  ],
  copyright: 'جميع الحقوق محفوظة لاوفرسايت (Oversight)',
  legalName: 'شركة معايير البناء الحديثة المحدودة',
};

export const ctaLabels = {
  freeConsult: 'استشارة هاتفية مجانية',
  bookInspection: 'احجز فحص عقارك الآن',
  callUs: 'اتصل بنا',
  whatsapp: 'تواصل معنا عبر واتساب',
  callDirect: 'اتصل بنا هاتفياً',
};

/**
 * UI chrome strings — aria-labels, validation messages, empty/loading/error
 * states and alt text. Kept here (rather than hardcoded in JSX) so every
 * user-visible string has a translation.
 */
export const ui = {
  navAria: 'التنقل الرئيسي',
  langAria: 'تغيير اللغة',
  menuOpen: 'فتح القائمة',
  menuClose: 'إغلاق القائمة',
  menuLabel: 'القائمة',
  diagnosticsAria: 'اختر حالتك',
  serviceTabsAria: 'أنواع الفحص',
  partnersFilterAria: 'تصفية الشركاء',
  partnersEmpty: 'لا يوجد شركاء في هذا التصنيف حالياً.',
  sliderAria: 'مقارنة بين الرؤية بالعين المجردة والكاميرا الحرارية',
  prev: 'السابق',
  next: 'التالي',
  testimonialNth: 'الشهادة',
  phoneLabel: 'الهاتف',
  emailLabel: 'الإيميل',
  mapAlt: 'خريطة مقر أوفرسايت — الرياض، حي الروضة',
  openInMaps: 'فتح في خرائط Google',
  form: {
    sending: 'جارٍ الإرسال…',
    successTitle: 'تم استلام طلبك بنجاح',
    successBody: 'سيتواصل معك أحد مهندسينا خلال دقائق لتأكيد التفاصيل وتحديد موعد الفحص.',
    sendAnother: 'إرسال طلب آخر',
    errName: 'الرجاء إدخال الاسم الكامل',
    errPhone: 'رقم هاتف سعودي مكوّن من 10 أرقام يبدأ بـ 0',
    errEmail: 'الرجاء إدخال بريد إلكتروني صحيح',
    errMessage: 'الرجاء كتابة رسالتك',
    failed: 'تعذّر إرسال رسالتك. تحقق من اتصالك بالإنترنت وحاول مرة أخرى، أو اتصل بنا مباشرة.',
    mockNotice: 'وضع تجريبي: لم يتم إرسال بريد فعلي (لم يتم ضبط مفتاح الإرسال).',
  },
  notFound: {
    title: 'الصفحة غير موجودة',
    body: 'عذراً، لم نتمكن من العثور على الصفحة التي تبحث عنها. قد يكون الرابط قديماً أو تم نقل الصفحة.',
    cta: 'العودة للصفحة الرئيسية',
  },
};
