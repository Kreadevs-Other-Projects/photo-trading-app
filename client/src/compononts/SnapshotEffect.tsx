import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useCallback, useEffect } from "react";
import { Button } from "./ui/button";
import { Camera, Video, VideoOff } from "lucide-react";

export function SnapshotEffect() {
  const ref = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const [isCapturing, setIsCapturing] = useState(false);
  const [capturedPhotos, setCapturedPhotos] = useState<string[]>([]);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Start camera function
  const startCamera = useCallback(async () => {
    try {
      setError(null);
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: "user",
        },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setStream(mediaStream);
      setIsCameraOn(true);
    } catch (err) {
      console.error("Error accessing camera:", err);
      setError("Cannot access camera. Please check permissions.");
      setIsCameraOn(false);
    }
  }, []);

  // Stop camera function
  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
      setIsCameraOn(false);
    }
  }, [stream]);

  // Capture photo from webcam
  const handleCapture = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;

    setIsCapturing(true);

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // Set canvas size to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw current video frame to canvas
    context?.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Get image as data URL
    const imageDataUrl = canvas.toDataURL("image/jpeg");

    // Flash and shutter animation delay
    setTimeout(() => {
      setCapturedPhotos((prev) => [imageDataUrl, ...prev]);
      setIsCapturing(false);
    }, 800);
  }, []);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  return (
    <section
      ref={ref}
      className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-blue/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            Capture the <span className="text-gradient">Moment</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Every snapshot creates a connection. Take a photo, trade it, unlock
            memories.
          </p>
        </motion.div>

        {/* Capture Area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="glass-morphism rounded-3xl p-8 md:p-12 relative"
        >
          {/* Flash Effect */}
          <AnimatePresence>
            {isCapturing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-white rounded-3xl z-50 pointer-events-none"
              />
            )}
          </AnimatePresence>

          {/* Shutter Effect */}
          <AnimatePresence>
            {isCapturing && (
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: [0, 1, 0] }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="absolute inset-0 bg-background/90 rounded-3xl z-40 origin-center"
                style={{ transformOrigin: "center" }}
              />
            )}
          </AnimatePresence>

          <div className="flex flex-col items-center gap-8">
            {/* Webcam Feed */}
            <div className="relative w-full max-w-2xl aspect-video bg-black rounded-2xl overflow-hidden">
              {isCameraOn ? (
                <motion.video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-muted/20">
                  <div className="text-center">
                    <VideoOff className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      {error ? error : "Camera is off"}
                    </p>
                    {error && (
                      <Button
                        onClick={startCamera}
                        className="mt-4"
                        variant="outline"
                      >
                        Try Again
                      </Button>
                    )}
                  </div>
                </div>
              )}

              {/* Camera controls overlay */}
              {isCameraOn && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute bottom-4 left-1/2 -translate-x-1/2"
                >
                  <Button
                    onClick={stopCamera}
                    variant="secondary"
                    size="sm"
                    className="bg-background/80 backdrop-blur-sm"
                  >
                    <VideoOff className="w-4 h-4 mr-2" />
                    Stop Camera
                  </Button>
                </motion.div>
              )}
            </div>

            {/* Hidden canvas for capturing */}
            <canvas ref={canvasRef} style={{ display: "none" }} />

            {/* Camera Control Buttons */}
            <div className="flex gap-4 flex-wrap justify-center">
              {!isCameraOn ? (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    onClick={startCamera}
                    className="h-16 px-8 bg-primary hover:bg-primary/90 text-primary-foreground glow-cyan"
                  >
                    <Video className="w-5 h-5 mr-2" />
                    Start Camera
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    onClick={handleCapture}
                    disabled={isCapturing}
                    className="h-16 w-16 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground glow-cyan relative group"
                  >
                    <motion.div
                      animate={isCapturing ? { rotate: 360 } : {}}
                      transition={{ duration: 0.8 }}
                      className="absolute inset-2 border-4 border-primary-foreground/30 rounded-full"
                    />
                    <Camera className="w-6 h-6" />
                  </Button>
                </motion.div>
              )}
            </div>

            <p className="text-muted-foreground text-lg text-center">
              {isCameraOn
                ? "Click the camera button to capture a moment"
                : "Start your camera to begin capturing photos"}
            </p>

            {/* Polaroid Carousel */}
            <div className="w-full mt-8">
              <AnimatePresence mode="popLayout">
                {capturedPhotos.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-4 overflow-x-auto pb-4 justify-center"
                  >
                    {capturedPhotos.map((photo, index) => (
                      <motion.div
                        key={`${photo}-${index}`}
                        initial={{
                          opacity: 0,
                          y: -100,
                          rotate: -10,
                          scale: 0.8,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          rotate: Math.random() * 6 - 3,
                          scale: 1,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          damping: 20,
                          delay: 0.5,
                        }}
                        className="flex-shrink-0"
                      >
                        {/* Polaroid Frame */}
                        <div className="bg-white p-3 rounded-lg shadow-2xl w-48">
                          {/* Photo with developing effect */}
                          <motion.div
                            initial={{ filter: "blur(20px)", opacity: 0.3 }}
                            animate={{ filter: "blur(0px)", opacity: 1 }}
                            transition={{ duration: 1.5, delay: 0.8 }}
                            className="aspect-square bg-muted rounded-sm overflow-hidden mb-3"
                          >
                            <img
                              src={photo}
                              alt={`Captured moment ${
                                capturedPhotos.length - index
                              }`}
                              className="w-full h-full object-cover"
                            />
                          </motion.div>
                          {/* Polaroid text area */}
                          <div className="h-8 flex items-center justify-center">
                            <motion.p
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 1.5 }}
                              className="text-xs text-gray-500"
                            >
                              Moment #{capturedPhotos.length - index}
                            </motion.p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {capturedPhotos.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    Your captured moments will appear here
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
