import { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { RootLayout } from '@/layouts/RootLayout';
import { Home } from '@/pages/Home';

// Lazy-load supporting pages for optimal performance and chunk isolation
const Fleet = lazy(() => import('@/pages/Fleet').then((m) => ({ default: m.Fleet })));
const Destinations = lazy(() => import('@/pages/Destinations').then((m) => ({ default: m.Destinations })));
const Routes = lazy(() => import('@/pages/Routes').then((m) => ({ default: m.Routes })));
const About = lazy(() => import('@/pages/About').then((m) => ({ default: m.About })));
const Contact = lazy(() => import('@/pages/Contact').then((m) => ({ default: m.Contact })));
const Feedback = lazy(() => import('@/pages/Feedback').then((m) => ({ default: m.Feedback })));
const PrivacyPolicy = lazy(() => import('@/pages/PrivacyPolicy').then((m) => ({ default: m.PrivacyPolicy })));
const Terms = lazy(() => import('@/pages/Terms').then((m) => ({ default: m.Terms })));
const NotFound = lazy(() => import('@/pages/NotFound').then((m) => ({ default: m.NotFound })));

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'fleet',
        element: <Fleet />,
      },
      {
        path: 'destinations',
        element: <Destinations />,
      },
      {
        path: 'routes',
        element: <Routes />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      {
        path: 'feedback',
        element: <Feedback />,
      },
      {
        path: 'privacy-policy',
        element: <PrivacyPolicy />,
      },
      {
        path: 'terms',
        element: <Terms />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

export function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Analytics />
      <SpeedInsights />
    </>
  );
}

export default App;
