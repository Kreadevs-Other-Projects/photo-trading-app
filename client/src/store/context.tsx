import { createContext, useContext, useState } from "react";
import { portraits } from "../compononts/ImageGlobeHero";

const GlobeContext = createContext({
  globeImages: [] as string[],
  userImages: [] as string[],
  addImageToGlobe: (image: string) => {},
});

export const useGlobe = () => useContext(GlobeContext);

export function GlobeProvider({ children }: { children: React.ReactNode }) {
  const [userImages, setUserImages] = useState<string[]>([]); // User's last 3 images only

  const addImageToGlobe = (imageDataUrl: string) => {
    setUserImages((prev) => {
      const updated = [imageDataUrl, ...prev];
      return updated.slice(0, 3); // Keep only latest 3
    });
  };

  // Combine user images + default portraits
  const globeImages = [...userImages, ...portraits];

  return (
    <GlobeContext.Provider value={{ globeImages, userImages, addImageToGlobe }}>
      {children}
    </GlobeContext.Provider>
  );
}
