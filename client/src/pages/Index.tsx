import { ActivityTicker } from "@/compononts/ActivityTracker";
import { FeaturePeek } from "@/compononts/FeaturePeek";
import { FinalCTA } from "@/compononts/FinalCTA";
import { Header } from "../compononts/Header.tsx";
import { HowItWorks } from "@/compononts/HowItWorks";
import { ImageGlobeHero } from "@/compononts/ImageGlobeHero";
import { Purpose } from "@/compononts/Purpose";
import { Roadmap } from "@/compononts/Roadmap";
import { SnapshotEffect } from "@/compononts/SnapshotEffect";
import { useEffect } from "react";
const Index = () => {
  useEffect(() => {
    if (!localStorage.getItem("vite-ui-theme")) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <ImageGlobeHero />
        <Purpose />
        <HowItWorks />
        <SnapshotEffect />
        <FeaturePeek />
        <ActivityTicker />
        <Roadmap />
        <FinalCTA />
      </main>
      <footer className="py-8 px-4 text-center text-sm text-muted-foreground border-t border-border/50">
        <p>© 2025 SnapTrade. Reimagining photography together.</p>
      </footer>
    </div>
  );
};

export default Index;
