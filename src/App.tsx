import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import About from "./pages/About";
import Patients from "./pages/Patients";
import DentalOffice from "./pages/DentalOffice";
import Distributions from "./pages/Distributions";
import FindLocationPage from "./pages/FindLocationPage";
import NotFound from "./pages/NotFound";
import HomeKit20 from "./pages/products/HomeKit20";
import WhiteAngelExtra46 from "./pages/products/WhiteAngelExtra46";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/dental-office" element={<DentalOffice />} />
            <Route path="/distributions" element={<Distributions />} />
            <Route path="/find-location" element={<FindLocationPage />} />
            <Route path="/products/home-kit-20" element={<HomeKit20 />} />
            <Route path="/products/white-angel-extra-46" element={<WhiteAngelExtra46 />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
