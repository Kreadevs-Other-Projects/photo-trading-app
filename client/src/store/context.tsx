// // import { createContext, useContext, useState } from "react";
// // import { portraits } from "../compononts/ImageGlobeHero";

// // const GlobeContext = createContext({
// //   globeImages: [] as string[],
// //   userImages: [] as string[],
// //   addImageToGlobe: (image: string) => {},
// // });

// // export const useGlobe = () => useContext(GlobeContext);

// // export function GlobeProvider({ children }: { children: React.ReactNode }) {
// //   const [userImages, setUserImages] = useState<string[]>([]);

// //   const addImageToGlobe = (imageDataUrl: string) => {
// //     setUserImages((prev) => {
// //       const updated = [imageDataUrl, ...prev];
// //       return updated.slice(0, 3);
// //     });
// //   };

// //   const globeImages = [...userImages, ...portraits];

// //   return (
// //     <GlobeContext.Provider value={{ globeImages, userImages, addImageToGlobe }}>
// //       {children}
// //     </GlobeContext.Provider>
// //   );
// // }

// import { createContext, useContext, useState, useEffect } from "react";
// import { portraits } from "../compononts/ImageGlobeHero";

// const GlobeContext = createContext({
//   globeImages: [] as string[],
//   userImages: [] as string[],
//   addImageToGlobe: (image: string) => {},
//   loading: true,
// });

// export const useGlobe = () => useContext(GlobeContext);

// export function GlobeProvider({ children }: { children: React.ReactNode }) {
//   const [userImages, setUserImages] = useState<string[]>([]);
//   const [loading, setLoading] = useState(true);

//   const addImageToGlobe = (imageDataUrl: string) => {
//     setUserImages((prev) => {
//       const updated = [imageDataUrl, ...prev];
//       return updated.slice(0, 3);
//     });
//   };

//   const globeImages = [...userImages, ...portraits];

//   /** 🔥 Wait until ALL images are fully loaded before hiding spinner */
//   useEffect(() => {
//     const allImages = [...portraits]; // add more images if needed

//     let loadedCount = 0;

//     allImages.forEach((src) => {
//       const img = new Image();
//       img.src = src;

//       img.onload = () => {
//         loadedCount++;
//         if (loadedCount === allImages.length) {
//           setLoading(false); // All images ready!
//         }
//       };

//       img.onerror = () => {
//         // even if one fails, still count it as loaded
//         loadedCount++;
//         if (loadedCount === allImages.length) {
//           setLoading(false);
//         }
//       };
//     });
//   }, []);

//   return (
//     <GlobeContext.Provider
//       value={{ globeImages, userImages, addImageToGlobe, loading }}
//     >
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
  setLoading: (loading: boolean) => {}, // Add this to control loading externally
});

export const useGlobe = () => useContext(GlobeContext);

export function GlobeProvider({ children }: { children: React.ReactNode }) {
  const [userImages, setUserImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [criticalImagesLoaded, setCriticalImagesLoaded] = useState(false);

  // Load user images from localStorage on mount
  useEffect(() => {
    const savedImages = localStorage.getItem('snaptrade_user_images');
    if (savedImages) {
      try {
        const parsed = JSON.parse(savedImages);
        if (Array.isArray(parsed)) {
          setUserImages(parsed.slice(0, 3));
        }
      } catch (e) {
        console.error('Failed to load saved images:', e);
      }
    }
  }, []);

  const addImageToGlobe = (imageDataUrl: string) => {
    setUserImages((prev) => {
      const updated = [imageDataUrl, ...prev].slice(0, 3);
      // Save to localStorage
      localStorage.setItem('snaptrade_user_images', JSON.stringify(updated));
      return updated;
    });
  };

  // Preload only critical images (first few)
  useEffect(() => {
    const criticalImages = portraits.slice(0, 6); // Only preload first 6 images
    
    if (criticalImages.length === 0) {
      setCriticalImagesLoaded(true);
      return;
    }

    let loadedCount = 0;
    let hasError = false;

    const onImageLoad = () => {
      loadedCount++;
      // Don't wait for all, just enough to show something
      if (loadedCount >= Math.min(3, criticalImages.length)) {
        setCriticalImagesLoaded(true);
      }
    };

    const onImageError = () => {
      hasError = true;
      loadedCount++;
      // Continue even if some images fail
      if (loadedCount >= Math.min(3, criticalImages.length)) {
        setCriticalImagesLoaded(true);
      }
    };

    criticalImages.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = onImageLoad;
      img.onerror = onImageError;
    });

    // Fallback timeout in case images take too long
    const timeoutId = setTimeout(() => {
      setCriticalImagesLoaded(true);
    }, 1000); // Max 1 second wait

    return () => clearTimeout(timeoutId);
  }, []);

  // Combine loading states
  const globeImages = [...userImages, ...portraits];

  // Start with loading true, then update based on critical images
  useEffect(() => {
    if (criticalImagesLoaded) {
      // Small delay for smooth transition
      const timer = setTimeout(() => {
        setLoading(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [criticalImagesLoaded]);

  return (
    <GlobeContext.Provider
      value={{ globeImages, userImages, addImageToGlobe, loading, setLoading }}
    >
      {children}
    </GlobeContext.Provider>
  );
}