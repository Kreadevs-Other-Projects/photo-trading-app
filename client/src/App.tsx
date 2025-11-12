import { Toaster } from "./compononts/ui/toaster";
import { Toaster as Sonner } from "./compononts/ui/sooner";
import { TooltipProvider } from "./compononts/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./compononts/ThemeProvider";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import WebcamCapture from "./compononts/WebcamCapture";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/cam" element={<WebcamCapture />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
