// import { useEffect, useState } from "react";
// import camera from "../assets/portraits/camera_2.gif";

// const LoadingSpinner = () => {
//   const [isVisible, setIsVisible] = useState(true)

//   useEffect(() => {
//     const handleLoad = () => setIsVisible(false);

//     const timer = setTimeout(() => setIsVisible(false), 1000);

//     window.addEventListener("load", handleLoad);
//     return () => {
//       clearTimeout(timer);
//       window.removeEventListener("load", handleLoad);
//     };
//   }, []);

//   if (!isVisible) return null;

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black backdrop-blur-sm z-50">
//       <div className="flex flex-col items-center gap-4 bg-transparent w-100 h-100 bg-red-500">
//         <img
//           src={camera}
//           alt="camera spinner"
//           className="w-[150px] h-[150px] object-contain"
//         />
//       </div>
//     </div>
//   );
// };

// export default LoadingSpinner;



import { useEffect, useState } from "react";
import camera from "../assets/portraits/camera_2.gif";

const LoadingSpinner = () => {
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check if all critical assets are loaded
    const checkAssetsLoaded = () => {
      const images = document.images;
      let loadedCount = 0;
      const totalImages = images.length;
      
      // Count already loaded images
      for (let i = 0; i < totalImages; i++) {
        if (images[i].complete) loadedCount++;
      }
      
      // If all images loaded or 70% loaded, consider it ready
      if (loadedCount >= totalImages || loadedCount >= totalImages * 0.7) {
        setLoading(false);
      }
    };

    // Listen for window load
    const handleLoad = () => {
      setLoading(false);
    };

    // Initial check
    checkAssetsLoaded();

    // Check every 500ms
    const interval = setInterval(checkAssetsLoaded, 500);
    
    // Also listen for window load
    window.addEventListener('load', handleLoad);

    // Fallback timeout
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 3000); // Max 3 seconds

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  // Hide spinner when loading is complete
  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  // Prevent scrolling
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.style.overflow = "auto";
      document.body.style.position = "static";
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-[9999]">
      <div className="flex flex-col items-center gap-4">
        <img
          src={camera}
          alt="camera spinner"
          className="w-[150px] h-[150px] object-contain"
          style={{ animationDuration: '2s' }}
        />
      </div>
    </div>
  );
};

export default LoadingSpinner;