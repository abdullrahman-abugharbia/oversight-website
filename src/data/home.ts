/** Home page content — verbatim from Figma frame `home` (20:266). */

import heroImg from '@/assets/images/hero-construction.webp';
import srvCivil from '@/assets/images/srv-civil.webp';
import srvElectrical from '@/assets/images/srv-electrical.webp';
import srvMechanical from '@/assets/images/srv-mechanical.webp';
import srvEnvironmental from '@/assets/images/srv-environmental.webp';
import srvLeak from '@/assets/images/srv-leak.webp';
import normalPanel from '@/assets/images/normal-panel.webp';
import thermalPanel from '@/assets/images/thermal-panel.webp';
import devThermal from '@/assets/images/dev-thermal-camera.webp';
import devMoisture from '@/assets/images/dev-moisture-meter.webp';
import devPipe from '@/assets/images/dev-pipe-camera.webp';
import devSewer from '@/assets/images/dev-sewer-camera.webp';
import devAir from '@/assets/images/dev-air-quality.webp';
import devLaser from '@/assets/images/dev-laser-level.webp';
import devElec from '@/assets/images/dev-electrical-tester.webp';
import devLux from '@/assets/images/dev-lux-meter.webp';

export const hero = {
  image: heroImg,
  titleLead: 'عقارك يستحق الحماية..',
  titleAccent: 'نرى ما لا تراه',
  titleTail: 'لتسكن مطمئناً.',
  body: '"فحص وتقييم هندسي متكامل للمباني السكنية والتجارية، بأحدث أجهزة الكشف غير الإتلافي (NDT) وبأيدي فريق هندسي معتمد يضمن لك سلامة استثمارك.',
};

export const aboutBlock = {
  eyebrow: 'من نحن',
  title: 'الكشف عن حلولنا للإنشاءات',
  paragraphs: [
    'في شركتنا أوفيرسايت للفحص الهندسي، نلتزم بتحويل رؤيتكم العقارية إلى استثمار آمن ومستقر بإتقان لا مثيل له. تستند سمعتنا إلى أسس النزاهة والحياد والابتكار، مما يجعلنا الخيار الأمثل لمجموعة واسعة من المباني والمنشآت.',
    'بفضل سنوات من الخبرة في هذا المجال، يقدم فريقنا الهندسي ثروة من المعرفة والمهارة الميدانية لكل مشروع فحص، مما يضمن نتائج عالية الجودة وتقارير دقيقة تمنحك الثقة التامة.',
  ],
  more: 'المزيد',
};

export interface Stat {
  value: string;
  label: string;
}

export const stats: Stat[] = [
  { value: '350+', label: 'جميع العملاء أو الشركات الذين يثقون بنا في تقييم وفحص أصولهم العقارية' },
  { value: '$250K+', label: 'إجمالي قيمة الأصول والمشاريع التي تم فحصها وحمايتها وتأكيد سلامتها' },
  { value: '100+', label: 'إجمالي الاستشاريين والمهندسين الذين يشرفون على الفحص بعد تجربة خدماتنا' },
];

/* ---------- Interactive diagnostic (stacked card selector) ---------- */

export interface Diagnostic {
  id: string;
  title: string;
  lead: string;
  body: string;
  cta: string;
  image: string;
  /** Card background tint. */
  tint: string;
  /** Heading + CTA colour — each card has its own accent in the design. */
  accent: string;
  /** Body-copy colour for this card. */
  bodyColor: string;
}

export const diagnosticHeader = {
  title: 'أين تكمن مخاوفك في العقار اليوم؟',
  sub: 'اختر الحالة التي تصف وضعك الحالي، وسنوجهك مباشرة للحل الهندسي المناسب لها:',
};

export const diagnostics: Diagnostic[] = [
  {
    id: 'structural',
    title: 'الفحص الهيكلي الشامل',
    lead: 'أحتاج فحصاً متكاملاً وشهادة مطابقة',
    body: 'للمستثمرين والمطورين والجهات التي ترغب في تقييم المنشأة بالكامل، أو الحصول على تقارير دورية معتمدة للجهات التمويلية المختلفة.',
    cta: 'اطلب الفحص الهيكلي الكامل',
    image: srvCivil,
    tint: '#ffecea',
    accent: '#4d1c1b',
    bodyColor: '#000000',
  },
  {
    id: 'prepurchase',
    title: 'فحص ما قبل الشراء',
    lead: 'أرغب بشراء أو استئجار عقار جديد',
    body: 'إذا كنت مقبلاً على قرار شراء بيت العمر، وتريد التأكد التام من سلامة السباكة، الكهرباء، العزل، والهيكل الإنشائي للمبنى.',
    cta: 'احم استثمارك وافحص قبل الشراء',
    image: srvMechanical,
    tint: '#edefff',
    accent: '#273879',
    bodyColor: '#151517',
  },
  {
    id: 'moisture',
    title: 'كشف تسريبات ورطوبة',
    lead: 'ألاحظ رطوبة أو تسريباً خفياً للمياه',
    body: 'إذا كنت تعاني من تصدع الدهانات، ظهور بقع مياه، أو ارتفاع غير مبرر في فاتورة المياه دون معرفة السبب الحقيقي خلف ذلك.',
    cta: 'اطلب فحص الرطوبة الآن',
    image: srvLeak,
    tint: '#f2f9eb',
    accent: '#345612',
    bodyColor: '#718096',
  },
];

/* ---------- 4-step journey ---------- */

export interface Step {
  num: string;
  title: string;
  body: string;
}

export const stepsHeader = {
  title: '4 خطوات بسيطة تفصلك عن تأمين عقارك والحصول على راحة البال',
  sub: 'رحلة فحص واضحة وسريعة تبدأ بطلبك الهاتفي وتنتهي بتقريرك الفني المعتمد.',
  cta: 'ابدأ رحلة الفحص الآن',
};

export const steps: Step[] = [
  {
    num: '01',
    title: 'طلب الاستشارة',
    body: 'أملأ نموذج الطلب السريع ببيانات عقارك الأساسية في أقل من دقيقة، دون الحاجة لإدخال أي تفاصيل دفع أو بطاقة ائتمانية.',
  },
  {
    num: '02',
    title: 'جدولة الموعد',
    body: 'يتواصل معك أحد مهندسينا الاستشاريين هاتفياً للإجابة عن أسئلتك، وتأكيد تكلفة الفحص والموعد الأنسب لزيارتنا الميدانية.',
  },
  {
    num: '03',
    title: 'الزيارة والفحص الميداني',
    body: 'يزورك فريقنا الهندسي المعتمد في عقارك مجهزاً بأحدث الأجهزة والتقنيات لإجراء الكشف المتكامل وتسجيل أدق الملاحظات بالصور والفيديو.',
  },
  {
    num: '04',
    title: 'استلام تقريرك المعتمد',
    body: 'تستلم تقريراً هندسياً شاملاً ومنظماً (ملف PDF) مدعماً بالصور والنتائج والحلول الفنية المقترحة خلال 24 إلى 48 ساعة فقط من عملية الفحص.',
  },
];

/* ---------- Detailed services ---------- */

export interface DetailedService {
  num: string;
  code: string;
  title: string;
  body: string;
  bullets: { title: string; body: string }[];
  linkLabel: string;
  image: string;
}

export const detailedHeader = {
  title: 'كيف نحمي عقارك بالتفصيل من خلال خدماتنا؟',
  sub: 'نقدم فحوصات هندسية دقيقة تشمل كافة الجوانب الإنشائية والمعمارية والميكانيكية، لضمان سلامة عقارك واستدامة استثمارك.',
};

export const detailedServices: DetailedService[] = [
  {
    num: '01',
    code: 'SRV_CIVIL',
    title: 'الفحص الإنشائي (المدني)',
    body: 'تقييم شامل لسلامة الهيكل الإنشائي للمبنى، بما في ذلك الأساسات والأعمدة والأسقف، لضمان قدرتها على تحمل الأحمال ومقاومة العوامل البيئية.',
    bullets: [
      { title: 'فحص الخرسانة', body: 'اختبار قوة الخرسانة واكتشاف التشققات باستخدام تقنيات NDT.' },
      { title: 'التسليح والصدأ', body: 'تحديد مواقع حديد التسليح وقياس مستوى التآكل أو الصدأ.' },
    ],
    linkLabel: 'تفاصيل الفحص الإنشائي',
    image: srvCivil,
  },
  {
    num: '02',
    code: 'SRV_ELEC',
    title: 'الفحص الكهربائي',
    body: 'تفتيش دقيق للأنظمة الكهربائية لتحديد المخاطر المحتملة مثل الأحمال الزائدة، والأسلاك التالفة، لضمان بيئة آمنة ومطابقة للكود.',
    bullets: [
      { title: 'فحص اللوحات الكهربائية', body: 'التأكد من سلامة التوصيلات وتوزيع الأحمال بشكل صحيح.' },
      { title: 'التصوير الحراري للدوائر', body: 'الكشف عن النقاط الساخنة التي قد تؤدي إلى حرائق.' },
    ],
    linkLabel: 'تفاصيل الفحص الكهربائي',
    image: srvElectrical,
  },
  {
    num: '03',
    code: 'SRV_MECH',
    title: 'الفحص الميكانيكي (التكييف والتهوية)',
    body: 'تقييم كفاءة أنظمة التدفئة والتهوية وتكييف الهواء (HVAC)، بالإضافة إلى أنظمة السباكة لضمان الأداء الأمثل وتقليل استهلاك الطاقة.',
    bullets: [
      { title: 'أداء أجهزة التكييف', body: 'قياس تدفق الهواء ومستويات غاز التبريد لضمان التبريد الفعال.' },
      { title: 'فحص مجاري الهواء', body: 'التأكد من عدم وجود تسريبات في الدكت للحفاظ على جودة الهواء.' },
    ],
    linkLabel: 'تفاصيل الفحص الميكانيكي',
    image: srvMechanical,
  },
  {
    num: '04',
    code: 'SRV_ENV',
    title: 'الفحص البيئي وجودة الهواء',
    body: 'قياس جودة البيئة الداخلية للمبنى للتأكد من خلوها من الملوثات، مما يوفر بيئة صحية وآمنة للساكنين أو العاملين.',
    bullets: [
      { title: 'مستويات الرطوبة والعفن', body: 'الكشف المبكر عن نمو العفن والميكروبات المرتبطة بالرطوبة.' },
      { title: 'قياس الغازات والجسيمات', body: 'تحليل مستويات أول أكسيد الكربون والجسيمات العالقة في الهواء.' },
    ],
    linkLabel: 'تفاصيل الفحص البيئي',
    image: srvEnvironmental,
  },
  {
    num: '05',
    code: 'SRV_LEAK',
    title: 'فحص تسربات المياه والعزل',
    body: 'استخدام أحدث أجهزة الكشف غير الإتلافي لتحديد مصادر تسرب المياه بدقة، وتقييم كفاءة أنظمة العزل المائي والحراري.',
    bullets: [
      { title: 'التصوير الحراري للتسربات', body: 'تحديد أماكن الرطوبة المخفية خلف الجدران والأسقف دون تكسير.' },
      { title: 'فحص العزل المائي', body: 'التأكد من سلامة طبقات العزل في الأسطح ودورات المياه.' },
    ],
    linkLabel: 'تفاصيل فحص التسربات',
    image: srvLeak,
  },
];

/* ---------- Thermal before/after demo ---------- */

export const demo = {
  title: 'أجهزتنا تكشف ما تخفيه طبقات الدهان والخرسانة',
  sub: 'اسحب المؤشر لليمين واليسار لترى الفارق الحقيقي بين الرؤية بالعين المجردة والرؤية بأجهزة الفحص الحرارية المتقدمة:',
  normal: {
    image: normalPanel,
    chip: 'عينك المجردة ترى جداراً سليماً',
    caption: 'عينك المجردة ترى جداراً سليماً وخالياً تماماً من أي عيوب أو تسربات ظاهرة بالدهانات',
  },
  thermal: {
    image: thermalPanel,
    chip: 'رؤية الكاميرا الحرارية للأخطار الخفية',
    caption:
      'الكاميرا الحرارية تظهر لك بؤرة تسريب مياه خفية ممتدة تتلف الهيكل الإنشائي من الداخل قبل انهياره',
  },
  note: 'مشاكل العزل والرطوبة قد تخفيها الدهانات الحديثة لفترة مؤقتة وتخدع الناظرين إليها، لكن أجهزتنا تكشفها مبكراً لتتفادى تكاليف صيانة طارئة ومرتفعة لاحقاً.',
};

/* ---------- NDT device lab ---------- */

export interface Device {
  code: string;
  name: string;
  body: string;
  status: string;
  image: string;
}

export const labHeader = {
  eyebrow: 'NDT LAB / مختبر الأجهزة والتقنيات',
  title: 'مختبرنا التقني المتنقل: أجهزة دقيقة تغنيك عن التكسير والتخمين',
  sub: 'لا نعتمد على التفتيش بالنظر؛ بل نقيس المتانة والسلامة بأحدث أجهزة الفحص العالمية المرخصة.',
};

export const devices: Device[] = [
  {
    code: '01 / THRM',
    name: 'كاميرات حرارية متطورة',
    body: 'تحدد بدقة متناهية بؤر تسريب المياه، بقع الرطوبة الخفية، والفروق الحرارية في التمديدات والخرسانة خلف السيراميك والدهانات دون المساس بسلامة الجدار.',
    status: 'CALIBRATED',
    image: devThermal,
  },
  {
    code: '02 / MSTR',
    name: 'جهاز قياس الرطوبة الرقمي',
    body: 'يقيس نسبة الرطوبة الفورية ومستوى تشبع المياه المخفية داخل الجدران، الأرضيات، والخرسانة بدقة مليمترية لتتبع مسار التسريب الأساسي',
    status: 'SCAN_READY',
    image: devMoisture,
  },
  {
    code: '03 / BRSCOPE',
    name: 'كاميرا السباكة والأنابيب الضيقة',
    body: 'تخترق شبكات السباكة والأماكن الضيقة والزوايا الحرجة لتصوير الأنابيب والمحابس من الداخل، ورصد الشقوق أو التلفيات بالصوت والصورة دون أي تكسير.',
    status: 'PROBE_ACTIVE',
    image: devPipe,
  },
  {
    code: '04 / SWR_CAM',
    name: 'كاميرا فحص شبكات الصرف الرئيسية',
    body: 'مصممة للمرور في خطوط الصرف وشبكات المياه الرئيسية لتحديد مواقع الكسور، الانسدادات، والتسريبات بدقة متناهية وبتقرير مصور يثبت حالة الخطوط.',
    status: 'HD_FEED',
    image: devSewer,
  },
  {
    code: '05 / AIR_QUAL',
    name: 'جهاز فحص جودة الهواء والتهوية',
    body: 'يقيس سرعة وتدفق الهواء، مستويات الحرارة والرطوبة الداخلية، ونقاء البيئة للتأكد من كفاءة عمل أنظمة التكييف والتهوية وخلو الفراغات من الرطوبة والعفن.',
    status: 'SENSORS_ON',
    image: devAir,
  },
  {
    code: '06 / LSR_LVL',
    name: 'جهاز الليزر لمطابقة الاستواء والارتفاع',
    body: 'يسقط خطوطاً ليزرية دقيقة للتحقق من استواء الأرضيات، الجدران، والأسقف، وكشف أي عيوب معمارية أو هبوط وميول في البلاط والأسطح.',
    status: 'ALIGNING',
    image: devLaser,
  },
  {
    code: '07 / ELEC_TEST',
    name: 'الأجهزة الكهربائية لفحص الأفياش والتأريض',
    body: 'تفحص وتختبر كفاءة التوصيلات، اللوحات، كفاءة قواطع الأمان، ومقاومة التيار والتأريض لمنع مخاطر الالتماس الكهربائي في منزلك.',
    status: 'TESTING_CIRCUIT',
    image: devElec,
  },
  {
    code: '08 / LUX_MTR',
    name: 'جهاز قياس شدة الإضاءة والسطوع',
    body: 'جهاز يدوي مزود بمستشعر كروي أبيض حساس للضوء وشاشة رقمية توضح قراءة شدة الإنارة.',
    status: 'METERING',
    image: devLux,
  },
];

/* ---------- Map CTA ---------- */

export const mapCta = {
  title: 'تواصل مباشرة مع المهندس المختص',
  body: 'لا تترك قرار شراء بيت العمر أو سلامة منشأتك للتخمين. مهندسونا على أتم الاستعداد لإجابة استفساراتكم وجدولة زيارات الفحص بأسرع وقت ممكن.',
};
