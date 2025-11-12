import { useRef, useState, useEffect } from "react";
const WebcamCapture = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [photo, setPhoto] = useState(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing webcam:", err);
      alert("Could not access camera. Please allow permission.");
    }
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    const context = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = canvas.toDataURL("image/png");
    setPhoto(imageData);
  };

  const stopCamera = () => {
    const stream = videoRef.current?.srcObject;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="rounded-lg w-80 h-auto border"
      />
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>

      <div className="flex gap-2">
        <button
          onClick={capturePhoto}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Capture
        </button>
        <button
          onClick={stopCamera}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Stop
        </button>
      </div>

      {photo && (
        <div>
          <h3 className="mt-4 text-center">Snapshot:</h3>
          <img
            src={photo}
            alt="Snapshot"
            className="rounded-lg mt-2 w-80 border"
          />
        </div>
      )}
    </div>
  );
};

export default WebcamCapture;
