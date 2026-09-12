/** Our Work page content — Figma frame `our work` (186:3761). */

import caseA from '@/assets/images/img-449x633.webp';
import caseB from '@/assets/images/img-449x633-2.webp';
import caseC from '@/assets/images/img-449x633-3.webp';

export const workHero = {
  title: 'أعمالنا ومشاريع فحص نفخر بها',
  body: 'نماذج واقعية تبرز كيف ساعدت تقاريرنا الهندسية الأفراد والشركات في كشف العيوب، وتوفير التكاليف، وحماية استثماراتهم العقارية.',
};

export interface ImpactStat {
  prefix?: string;
  value: string;
  label: string;
  /** Figma icon name: buildings-2 / moneys / warning_amber / Clock */
  icon: 'building' | 'money' | 'warning' | 'clock';
}

export const impact = {
  title: 'أثر Oversight الهندسي',
  stats: [
    { prefix: 'اكثر من', value: '+2,400', label: 'عقار تم فحصها وحمايتها', icon: 'building' },
    { prefix: 'اكثر من', value: '18 mil', label: 'ريال وفورات مالية لعملائنا', icon: 'money' },
    { value: '0%', label: 'تكسير عشوائي', icon: 'warning' },
    { value: '24 إلى 48h', label: 'ساعة كمتوسط لتسليم التقارير', icon: 'clock' },
  ] as ImpactStat[],
};

export const caseHeader = {
  title: 'كل حالة تبدأ بسؤال وتنتهي بقرار أوضح',
  sub: 'نعرض "أعمالنا" على شكل "حالات دراسية" مبسطة توضح: المشكلة ➔ الكشف التقني ➔ النتيجة والوفر المالي.',
};

export interface CaseStudy {
  id: string;
  title: string;
  tags: string[];
  points: string[];
  value: string;
  valueLabel: string;
  valueNote: string;
  image: string;
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'c1',
    title: 'فحص شامل لفيلا سكنية فاخرة - الرياض',
    tags: ['#فحص_فلل', '#كشف_حراري', '#أحمال_كهربائية'],
    points: [
      'تقييم كامل للأنظمة الميكانيكية والكهربائية (MEP) لضمان الكفاءة والسلامة.',
      'فحص العزل الحراري والمائي للأسطح والواجهات لتجنب المشاكل المستقبلية.',
      'فحص شامل لكافة مكونات المبنى قبل الشراء.',
    ],
    value: '45,000',
    valueLabel: 'القيمة المضافة للمالك',
    valueNote: 'ريال (خصم من قيمة العقار للإصلاح)',
    image: caseA,
  },
  {
    id: 'c2',
    title: 'كشف رطوبة معقد في مجمع تجاري - جدة',
    tags: ['#كشف_تسريبات', '#أنابيب_مرنة', '#حماية_الرخام'],
    points: [
      'استخدام الكاميرات الحرارية المتقدمة لتحديد مسارات الرطوبة المخفية تحت التشطيبات الفاخرة.',
      'فحص شبكة الأنابيب المرنة للتأكد من عدم وجود تسريبات خفية تسبب تلفيات مستقبلية.',
      'تحديد مصدر الرطوبة بدقة مليمترية دون تكسير.',
    ],
    value: '120,000',
    valueLabel: 'القيمة المضافة للمالك',
    valueNote: 'ريال (وفر في نفقات الترميم)',
    image: caseB,
  },
  {
    id: 'c3',
    title: 'فحص هيكلي لبرج تجاري - الدمام',
    tags: ['#كود_البناء_SBC', '#فحص_NDT', '#تمويل_بنكي'],
    points: [
      'التحقق من سلامة الهيكل الخرساني باستخدام تقنيات الاختبار غير الإتلافي (NDT).',
      'مطابقة المخططات الهندسية مع التنفيذ الفعلي لضمان التوافق مع متطلبات كود البناء السعودي.',
      'إعداد التقرير الفني خلال 48 ساعة فقط.',
    ],
    value: '12,000,000',
    valueLabel: 'القيمة المضافة للمالك',
    valueNote: 'ريال (تأمين تمويل الصفقة)',
    image: caseC,
  },
];

export const workCta = {
  title: 'احجز الفحص الهندسي لعقارك الآن',
  body: 'تقرير هندسي شامل وموثق يغطي كافة هذه البنود خلال 24 إلى 48 ساعة فقط وبدون أي تكسير.',
  primary: 'احجز فحصك الآن',
  secondary: 'تواصل معنا عبر واتساب',
  badges: ['معتمد رسمياً', 'إنجاز سريع (24-48 ساعة)', 'بدون تكسير'],
};
