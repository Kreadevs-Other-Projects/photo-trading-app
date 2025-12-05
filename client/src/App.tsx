import { Toaster } from "./compononts/ui/toaster";
import { Toaster as Sonner } from "./compononts/ui/sooner";
import { TooltipProvider } from "./compononts/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./compononts/ThemeProvider";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import WebcamCapture from "./compononts/WebcamCapture";
import { GlobeProvider } from "./store/context.js";
import ContactUs from "./pages/ContactUs.js";
import LoadingSpinner from "./compononts/LoadingSpinner";

const queryClient = new QueryClient();

const App = () => (
  <GlobeProvider>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <TooltipProvider>
          <LoadingSpinner />
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/contact" element={<ContactUs />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </GlobeProvider>
);

export default App;
