import { useEffect, useState } from "react";
import camera from "../assets/portraits/camera_2.gif";

const LoadingSpinner = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleLoad = () => setIsVisible(false);

    const timer = setTimeout(() => setIsVisible(false), 3000);

    window.addEventListener("load", handleLoad);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black backdrop-blur-sm z-50">
      <div className="flex flex-col items-center gap-4 bg-transparent">
        {/* Spinner circle */}
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 border-4 border-gray-500 rounded-full" />
          <div className="absolute inset-0 border-4 border-transparent border-t-white rounded-full animate-spin" />
        </div>

        {/* GIF with proper size */}
        <img
          src={camera}
          alt="camera spinner"
          className="w-50 h-50 object-contain"
        />
      </div>
    </div>
  );
};

export default LoadingSpinner;

// const LoadingSpinner = () => {
//   return (
//     <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90">
//       <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
//     </div>
//   );
// };

// export default LoadingSpinner;
