import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Layout } from "./components/Layout";
import { PageTransitionOverlay } from "./components/ui/PageTransitionOverlay";
import { Home } from "./pages/Home";
import { Buy } from "./pages/Buy";
import { Schedule } from "./pages/Schedule";
import { Events } from "./pages/Events";
import { EventDetails } from "./pages/EventDetails";
import { AdminAuth } from "./pages/AdminAuth";
import { AdminDashboard } from "./pages/AdminDashboard";
import { Sponsors } from "./pages/Sponsors";
import { Team } from "./pages/Team";
import { NotFound } from "./pages/NotFound";

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <PageTransitionOverlay />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/buy" element={<Buy />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/events" element={<Events />} />
            <Route path="/sponsors" element={<Sponsors />} />
            <Route path="/team" element={<Team />} />
            <Route path="/event/:slug" element={<EventDetails />} />
            <Route path="/admin" element={<AdminAuth />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
