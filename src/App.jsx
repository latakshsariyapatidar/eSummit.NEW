import { Toaster } from "sonner";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Layout } from "./components/Shared/Layout";
import { PageTransitionOverlay } from "./components/ui/PageTransitionOverlay";
import { Loading } from "./components/SkeletonLoader/SkeletonLoader";

const Home = lazy(() =>
  import("./pages/Home/Home").then((module) => ({
    default: module.Home,
  })),
);

const Buy = lazy(() =>
  import("./pages/PassBuy/Buy").then((module) => ({
    default: module.Buy,
  })),
);

const Schedule = lazy(() =>
  import("./pages/EventsSchedule/Schedule").then((module) => ({
    default: module.Schedule,
  })),
);

const Events = lazy(() =>
  import("./pages/Event/Events").then((module) => ({
    default: module.Events,
  })),
);

const EventDetails = lazy(() =>
  import("./pages/Event/EventDetails").then((module) => ({
    default: module.EventDetails,
  })),
);

const AdminAuth = lazy(() =>
  import("./pages/Admin/AdminAuth").then((module) => ({
    default: module.AdminAuth,
  })),
);

const AdminDashboard = lazy(() =>
  import("./pages/Admin/AdminDashboard").then((module) => ({
    default: module.AdminDashboard,
  })),
);

const AdminOrderDetails = lazy(() =>
  import("./pages/Admin/AdminOrderDetails").then((module) => ({
    default: module.AdminOrderDetails,
  })),
);

const Sponsors = lazy(() =>
  import("./pages/Sponsors/Sponsors").then((module) => ({
    default: module.Sponsors,
  })),
);

const Team = lazy(() =>
  import("./pages/Team/Team").then((module) => ({
    default: module.Team,
  })),
);

const NotFound = lazy(() =>
  import("./pages/404/NotFound").then((module) => ({
    default: module.NotFound,
  })),
);

const AdminLayout = lazy(() =>
  import("./pages/Admin/AdminLayout").then((module) => ({
    default: module.AdminLayout,
  })),
);

export function App() {
  return (
    <BrowserRouter basename="/esummit">
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
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminAuth />} />
              <Route path="malikKiKursi" element={<AdminDashboard />} />

              <Route path=":orderId" element={<AdminOrderDetails />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
}
