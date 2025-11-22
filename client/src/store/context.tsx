import { createContext, useContext, useState } from "react";
import { portraits } from "../compononts/ImageGlobeHero";

const GlobeContext = createContext({
  globeImages: [] as string[],
  userImages: [] as string[],
  addImageToGlobe: (image: string) => {},
});

export const useGlobe = () => useContext(GlobeContext);

export function GlobeProvider({ children }: { children: React.ReactNode }) {
  const [userImages, setUserImages] = useState<string[]>([]);

  const addImageToGlobe = (imageDataUrl: string) => {
    setUserImages((prev) => {
      const updated = [imageDataUrl, ...prev];
      return updated.slice(0, 3);
    });
  };

  const globeImages = [...userImages, ...portraits];

  return (
    <GlobeContext.Provider value={{ globeImages, userImages, addImageToGlobe }}>
      {children}
    </GlobeContext.Provider>
  );
}
