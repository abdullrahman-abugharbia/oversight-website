/** Contact page content — Figma frame `contact us` (120:4095). */

export const contactHero = {
  title: 'تواصل معنا.. مهندسونا بانتظار مساعدتك',
  body: 'نسعد بالإجابة عن استفساراتك وتنسيق موعد الفحص الأنسب لك. تواصل معنا مباشرة عبر قنوات الاتصال السريع أو اترك بياناتك وسنتصل بك خلال دقائق.',
};

export const channels = [
  {
    id: 'phone',
    label: 'الاتصال الهاتفي السريع (للحالات الطارئة):',
    value: '(0599399368)',
    note: 'متاح من السبت إلى الخميس، من 9 صباحاً حتى 8 مساءً',
    href: 'tel:+966599399368',
  },
  {
    id: 'whatsapp',
    label: 'الدعم الفوري والمراسلة عبر واتساب:',
    value: 'START CHAT',
    note: 'اضغط لبدء محادثة فورية لحجز موعد، أو إرسال صور ومخططات عقارك لمهندس الخدمة.',
    href: 'https://wa.me/966599399368',
  },
  {
    id: 'email',
    label: 'بريد المطورين والمشاريع الكبرى (B2B):',
    value: 'info@oversight-sa.com',
    note: 'سنقوم بالرد عليك بملف العرض الفني خلال 24 ساعة.',
    href: 'mailto:info@oversight-sa.com',
  },
  {
    id: 'address',
    label: 'مقرنا الرئيسي والوصول:',
    value: 'الرياض، حي الروضة، طريق خريص الفرعي، شارع الحسن بن علي، 13211.',
    note: '',
    href: '',
  },
];

export const form = {
  title: 'اطلب استشارتك المجانية الآن',
  sub: 'املأ بياناتك في ثوانٍ وسيتواصل معك مهندس معتمد لمراجعة طلبك وتحديد موعد الفحص.',
  fields: {
    name: { label: 'الاسم الكامل', placeholder: 'أحمد علي' },
    phone: { label: 'رقم الهاتف', placeholder: '059XXXXXXX' },
    email: { label: 'البريد الإلكتروني', placeholder: 'ahmed@gmail.com' },
    subject: { label: 'الموضوع', placeholder: 'المتعلق بالمنتج' },
    reason: { label: 'سبب الرسالة', placeholder: 'استفسار عام' },
    message: { label: 'رسالة', placeholder: 'هنا تذهب الرسالة...' },
  },
  reasonOptions: [
    'استفسار عام',
    'حجز فحص عقار',
    'عرض سعر للمشاريع الكبرى (B2B)',
    'استفسار عن تقرير سابق',
    'شكوى أو ملاحظة',
  ],
  optIn: 'تلقي تحديثات من Oversight',
  submit: 'إرسال',
};

export const mapBlock = {
  title: 'خريطة المقر الرئيسي والتغطية الميدانية',
  sub: 'موقع شركة معايير البناء الحديثة للفحص الهندسي (Oversight) — الرياض',
};
