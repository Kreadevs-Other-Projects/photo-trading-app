import { createContext, useContext, useState } from "react";
import { portraits } from "../compononts/ImageGlobeHero";

const GlobeContext = createContext({
  globeImages: [] as string[],
  addImageToGlobe: (image: string) => {},
});

export const useGlobe = () => useContext(GlobeContext);

export function GlobeProvider({ children }: { children: React.ReactNode }) {
  const [globeImages, setGlobeImages] = useState([...portraits]);

  const addImageToGlobe = (imageDataUrl: string) => {
    setGlobeImages((prev) => [imageDataUrl, ...prev]);
  };

  return (
    <GlobeContext.Provider value={{ globeImages, addImageToGlobe }}>
      {children}
    </GlobeContext.Provider>
  );
}
