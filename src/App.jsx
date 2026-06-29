import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Layout } from "./components/Layout";
import { PageTransitionOverlay } from "./components/ui/PageTransitionOverlay";
import { Loading } from "./pages/Loading";

const Home = lazy(() =>
  import("./pages/Home").then((module) => ({
    default: module.Home,
  })),
);

const Buy = lazy(() =>
  import("./pages/Buy").then((module) => ({
    default: module.Buy,
  })),
);

const Schedule = lazy(() =>
  import("./pages/Schedule").then((module) => ({
    default: module.Schedule,
  })),
);

const Events = lazy(() =>
  import("./pages/Events").then((module) => ({
    default: module.Events,
  })),
);

const EventDetails = lazy(() =>
  import("./pages/EventDetails").then((module) => ({
    default: module.EventDetails,
  })),
);

const AdminAuth = lazy(() =>
  import("./pages/AdminAuth").then((module) => ({
    default: module.AdminAuth,
  })),
);

const AdminDashboard = lazy(() =>
  import("./pages/AdminDashboard").then((module) => ({
    default: module.AdminDashboard,
  })),
);

const Sponsors = lazy(() =>
  import("./pages/Sponsors").then((module) => ({
    default: module.Sponsors,
  })),
);

const Team = lazy(() =>
  import("./pages/Team").then((module) => ({
    default: module.Team,
  })),
);

const NotFound = lazy(() =>
  import("./pages/NotFound").then((module) => ({
    default: module.NotFound,
  })),
);

export function App() {
  return (
    <BrowserRouter>
      <PageTransitionOverlay />
      <Layout>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/buy" element={<Buy />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/events" element={<Events />} />
            <Route path="/sponsors" element={<Sponsors />} />
            <Route path="/team" element={<Team />} />
            <Route path="/event/:slug" element={<EventDetails />} />
            <Route path="/admin" element={<AdminAuth />} />
            <Route path="/admin/malikKiKursi" element={<AdminDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
}
