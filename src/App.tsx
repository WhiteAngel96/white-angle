import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { useEffect } from "react";
import Index from "./pages/Index";
import About from "./pages/About";
import Patients from "./pages/Patients";
import DentalOffice from "./pages/DentalOffice";
import Distributions from "./pages/Distributions";
import FindLocationPage from "./pages/FindLocationPage";
import NotFound from "./pages/NotFound";
import HomeKit20 from "./pages/products/HomeKit20";
import WhiteAngelExtra46 from "./pages/products/WhiteAngelExtra46";
import WhiteAngelPro from "./pages/products/WhiteAngelPro";
import Desensitiser from "./pages/products/Desensitiser";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Handle hash navigation with slight delay for content to load
      setTimeout(() => {
        const element = document.getElementById(hash.replace('#', ''));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // Scroll to top for regular navigation
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/dental-office" element={<DentalOffice />} />
            <Route path="/distributions" element={<Distributions />} />
            <Route path="/find-location" element={<FindLocationPage />} />
            <Route path="/products/home-kit-20" element={<HomeKit20 />} />
            <Route path="/products/white-angel-extra-46" element={<WhiteAngelExtra46 />} />
            <Route path="/products/white-angel-pro" element={<WhiteAngelPro />} />
            <Route path="/products/desensitiser" element={<Desensitiser />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
