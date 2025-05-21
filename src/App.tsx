
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ClerkProvider } from "./integrations/clerk/ClerkProvider";
import Index from "./pages/Index";
import Search from "./pages/Search";
import HostelDetail from "./pages/HostelDetail";
import ListHostel from "./pages/ListHostel";
import EditHostel from "./pages/EditHostel";
import Documentation from "./pages/Documentation";
import AboutUs from "./pages/AboutUs";
import OwnerDashboard from "./pages/OwnerDashboard";
import SavedHostels from "./pages/SavedHostels";
import NotFound from "./pages/NotFound";
import AuthPage from "./pages/AuthPage";
import Resources from "./pages/Resources";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import { AnimatePresence } from "framer-motion";

const queryClient = new QueryClient();

// AnimatedRoutes component to handle framer-motion page transitions
const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Index />} />
        <Route path="/search" element={<Search />} />
        <Route path="/hostel/:id" element={<HostelDetail />} />
        <Route path="/list-hostel" element={<ListHostel />} />
        <Route path="/edit-hostel/:id" element={<EditHostel />} />
        <Route path="/docs" element={<Documentation />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/owner-dashboard" element={<OwnerDashboard />} />
        <Route path="/saved" element={<SavedHostels />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ClerkProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnimatedRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </ClerkProvider>
  </QueryClientProvider>
);

export default App;
