import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

/** Pages whose hero is dark — the navbar floats transparently over those. */
const OVERLAY_ROUTES = ['/', '/about', '/work'];

export default function SiteLayout() {
  const { pathname } = useLocation();
  const overlay = OVERLAY_ROUTES.includes(pathname);

  return (
    <div className={`site ${overlay ? 'site--overlay' : ''}`}>
      <Navbar overlay={overlay} />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
