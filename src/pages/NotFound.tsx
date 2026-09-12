import Button from '@/components/Button';
import { ArrowLeftIcon } from '@/components/Icons';
import { useContent } from '@/i18n/LanguageProvider';
import './NotFound.css';

export default function NotFound() {
  const { ui } = useContent().site;

  return (
    <section className="nf">
      <div className="container nf__inner">
        <span className="nf__code">404</span>
        <h1 className="nf__title">{ui.notFound.title}</h1>
        <p className="nf__body">{ui.notFound.body}</p>
        <Button to="/" variant="primary" size="lg" iconAfter={<ArrowLeftIcon size={20} />}>
          {ui.notFound.cta}
        </Button>
      </div>
    </section>
  );
}
