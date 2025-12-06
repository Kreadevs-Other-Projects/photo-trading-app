import { useEffect, useState } from "react";
import camera from "../assets/portraits/camera_2.gif";

const LoadingSpinner = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleLoad = () => setIsVisible(false);

    const timer = setTimeout(() => setIsVisible(false), 1000);

    window.addEventListener("load", handleLoad);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black backdrop-blur-sm z-50">
      <div className="flex flex-col items-center gap-4 bg-transparent w-100 h-100 bg-red-500">
        <img
          src={camera}
          alt="camera spinner"
          className="w-[150px] h-[150px] object-contain"
        />
      </div>
    </div>
  );
};

export default LoadingSpinner;
