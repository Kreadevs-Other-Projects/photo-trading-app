// import { createContext, useContext, useState } from "react";
// import { portraits } from "../compononts/ImageGlobeHero";

// const GlobeContext = createContext({
//   globeImages: [] as string[],
//   userImages: [] as string[],
//   addImageToGlobe: (image: string) => {},
// });

// export const useGlobe = () => useContext(GlobeContext);

// export function GlobeProvider({ children }: { children: React.ReactNode }) {
//   const [userImages, setUserImages] = useState<string[]>([]);

//   const addImageToGlobe = (imageDataUrl: string) => {
//     setUserImages((prev) => {
//       const updated = [imageDataUrl, ...prev];
//       return updated.slice(0, 3);
//     });
//   };

//   const globeImages = [...userImages, ...portraits];

//   return (
//     <GlobeContext.Provider value={{ globeImages, userImages, addImageToGlobe }}>
//       {children}
//     </GlobeContext.Provider>
//   );
// }

import { createContext, useContext, useState, useEffect } from "react";
import { portraits } from "../compononts/ImageGlobeHero";

const GlobeContext = createContext({
  globeImages: [] as string[],
  userImages: [] as string[],
  addImageToGlobe: (image: string) => {},
  loading: true,
});

export const useGlobe = () => useContext(GlobeContext);

export function GlobeProvider({ children }: { children: React.ReactNode }) {
  const [userImages, setUserImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const addImageToGlobe = (imageDataUrl: string) => {
    setUserImages((prev) => {
      const updated = [imageDataUrl, ...prev];
      return updated.slice(0, 3);
    });
  };

  const globeImages = [...userImages, ...portraits];

  /** 🔥 Wait until ALL images are fully loaded before hiding spinner */
  useEffect(() => {
    const allImages = [...portraits]; // add more images if needed

    let loadedCount = 0;

    allImages.forEach((src) => {
      const img = new Image();
      img.src = src;

      img.onload = () => {
        loadedCount++;
        if (loadedCount === allImages.length) {
          setLoading(false); // All images ready!
        }
      };

      img.onerror = () => {
        // even if one fails, still count it as loaded
        loadedCount++;
        if (loadedCount === allImages.length) {
          setLoading(false);
        }
      };
    });
  }, []);

  return (
    <GlobeContext.Provider
      value={{ globeImages, userImages, addImageToGlobe, loading }}
    >
      {children}
    </GlobeContext.Provider>
  );
}
