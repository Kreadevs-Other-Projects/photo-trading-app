import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useCallback, useEffect } from "react";
import { Button } from "./ui/button";
import {
  Camera,
  Video,
  VideoOff,
  AlertCircle,
  Globe,
  Check,
} from "lucide-react";
import { useGlobe } from "@/store/context";

interface SnapshotEffectProps {
  onAddToGlobe: (image: string) => void;
  addedImages: string[];
}

export function SnapshotEffect({
  onAddToGlobe,
  addedImages,
}: SnapshotEffectProps) {
  const ref = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const [isCapturing, setIsCapturing] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [capturedPhotos, setCapturedPhotos] = useState<string[]>([]);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [onScroll, setOnScroll] = useState<boolean>(false);
  const [addingToGlobe, setAddingToGlobe] = useState<string | null>(null);
  const { addImageToGlobe, globeImages } = useGlobe();

  // Function to add image to globe (you'll need to connect this to your actual globe state)
  const handleAddToGlobe = useCallback(
    async (imageDataUrl: string) => {
      setAddingToGlobe(imageDataUrl);
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Call context function to add to globe
      addImageToGlobe(imageDataUrl);
      setAddingToGlobe(null);
    },
    [addImageToGlobe]
  );

  useEffect(() => {
    if (isInView && isCameraOn && !onScroll) {
      const timer = setTimeout(() => {
        handleCapture();
        setOnScroll(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isInView, isCameraOn, onScroll]);

  useEffect(() => {
    if (isInView && !isCameraOn && !onScroll) {
      startCamera();
    }
  }, [isInView]);

  const startCamera = useCallback(async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: "user",
        },
        audio: false,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsCameraOn(true);
    } catch (err: any) {
      console.error("Error accessing webcam:", err);

      if (err.name === "NotAllowedError") {
        setError(
          "Camera permission denied. Please allow camera access and try again."
        );
      } else if (err.name === "NotFoundError") {
        setError("No camera found on this device.");
      } else if (err.name === "NotSupportedError") {
        setError("Camera access is not supported in this browser.");
      } else {
        setError(
          "Cannot access camera. Please check permissions and try again."
        );
      }
      setIsCameraOn(false);
    }
  }, []);

  useEffect(() => {
    if (isClicked) {
      startCamera();
    } else if (isCameraOn) {
      startCamera();
    } else if (onScroll) {
      startCamera();
    }
  }, [isClicked, isCameraOn]);

  const stopCamera = useCallback(() => {
    const stream = videoRef.current?.srcObject as MediaStream;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    }
    setIsCameraOn(false);
    setIsClicked(false);
    setOnScroll(false);
  }, []);

  const handleCapture = useCallback(() => {
    if (!videoRef.current || !canvasRef.current || !isCameraOn) return;

    setIsCapturing(true);

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (!context) {
      setIsCapturing(false);
      return;
    }

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageDataUrl = canvas.toDataURL("image/jpeg");

    setTimeout(() => {
      setCapturedPhotos((prev) => [imageDataUrl, ...prev]);
      setIsCapturing(false);
    }, 800);
  }, [isCameraOn]);

  useEffect(() => {
    return () => {
      const stream = videoRef.current?.srcObject as MediaStream;
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <section
      ref={ref}
      className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
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

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="glass-morphism rounded-3xl p-8 md:p-12 relative"
        >
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
            <div className="relative w-full max-w-2xl aspect-video bg-black rounded-2xl overflow-hidden">
              {isCameraOn && isClicked ? (
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
                  <div className="text-center p-8">
                    {error ? (
                      <>
                        <AlertCircle className="w-12 h-10 lg:w-16 lg:h-16 text-destructive mx-auto mb-4 mt-3" />
                        <p className="text-muted-foreground mb-4 text-sm">
                          {error}
                        </p>
                        <Button
                          onClick={startCamera}
                          className="mb-4"
                          variant="outline"
                        >
                          Try Again
                        </Button>
                      </>
                    ) : (
                      <>
                        <VideoOff className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">
                          Camera is ready to start
                        </p>
                      </>
                    )}
                  </div>
                </div>
              )}

              {isCameraOn && isClicked && (
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

            <canvas ref={canvasRef} style={{ display: "none" }} />

            <div className="flex gap-4 flex-wrap justify-center">
              {!isCameraOn ? (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    onClick={() => setIsClicked(true)}
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
                        className="flex-shrink-0 relative"
                      >
                        <div className="bg-white p-3 rounded-lg shadow-2xl w-48">
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

                          {/* Add to Globe Button */}
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 2 }}
                            className="mt-2"
                          >
                            {globeImages.includes(photo) ? (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="flex items-center justify-center gap-1 text-xs text-green-600 bg-green-50 py-1 px-2 rounded-full"
                              >
                                <Check className="w-3 h-3" />
                                Added to Globe
                              </motion.div>
                            ) : (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleAddToGlobe(photo)}
                                disabled={addingToGlobe === photo}
                                className="w-full text-xs"
                              >
                                {addingToGlobe === photo ? (
                                  <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{
                                      duration: 1,
                                      repeat: Infinity,
                                      ease: "linear",
                                    }}
                                    className="flex items-center gap-1"
                                  >
                                    <Globe className="w-3 h-3" />
                                    Adding...
                                  </motion.div>
                                ) : (
                                  <div className="flex items-center gap-1">
                                    <Globe className="w-3 h-3" />
                                    Add to Globe
                                  </div>
                                )}
                              </Button>
                            )}
                          </motion.div>
                        </div>

                        {/* Animation for adding to globe */}
                        <AnimatePresence>
                          {addingToGlobe === photo && (
                            <motion.div
                              initial={{
                                opacity: 1,
                                scale: 1,
                                x: 0,
                                y: 0,
                              }}
                              animate={{
                                opacity: 0,
                                scale: 0.2,
                                x: 300, // Adjust based on your globe position
                                y: -200, // Adjust based on your globe position
                              }}
                              exit={{ opacity: 0 }}
                              transition={{
                                duration: 1.5,
                                ease: "easeInOut",
                              }}
                              className="absolute inset-0 pointer-events-none z-50"
                            >
                              <motion.img
                                src={photo}
                                alt="Adding to globe"
                                className="w-full h-full object-cover rounded-lg shadow-2xl"
                                style={{
                                  filter: "brightness(1.2) saturate(1.3)",
                                }}
                              />
                              <motion.div
                                className="absolute inset-0 bg-neon-blue/30 rounded-lg"
                                animate={{
                                  opacity: [0.3, 0.8, 0.3],
                                }}
                                transition={{
                                  duration: 0.8,
                                  repeat: Infinity,
                                }}
                              />
                            </motion.div>
                          )}
                        </AnimatePresence>
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
