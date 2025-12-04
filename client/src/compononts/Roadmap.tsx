import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

import cloud from "../assets/portraits/cloud.gif";
import enhance from "../assets/portraits/enhance.gif";
import profiles from "../assets/portraits/profiles.gif";
import recognize from "../assets/portraits/recognize.gif";
import upload from "../assets/portraits/upload.gif";

import { Upload, ScanFace, Wand2, UserCircle, Cloud } from "lucide-react";
import { Footprints } from "lucide-react";

const milestones = [
  {
    id: 1,
    title: "Photo Upload",
    status: "Now",
    description: "Uploading your photo to our system",
    color: "cyan",
    gif: upload,
    icon: Upload,
  },
  {
    id: 2,
    title: "Face Recognition",
    status: "Next",
    description: "AI-powered smart tagging",
    color: "blue",
    gif: recognize,
    icon: ScanFace,
  },
  {
    id: 3,
    title: "AI Enhancement",
    status: "Soon",
    description: "Professional editing tools",
    color: "purple",
    gif: enhance,
    icon: Wand2,
  },
  {
    id: 4,
    title: "User Profiles",
    status: "Coming",
    description: "Personal photo galleries",
    color: "cyan",
    gif: profiles,
    icon: UserCircle,
  },
  {
    id: 5,
    title: "Cloud Storage",
    status: "Future",
    description: "Premium tools & storage",
    color: "blue",
    gif: cloud,
    icon: Cloud,
  },
];

const GifAnimation = ({ gifSrc, isActive, alt = "Animation" }) => {
  if (!isActive) return null;

  return (
    <motion.div
      className="absolute inset-0 overflow-hidden rounded-full"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
    >
      <img
        src={gifSrc}
        alt={alt}
        className="w-full h-full object-cover"
        style={{ imageRendering: "auto" }}
      />
    </motion.div>
  );
};

const StageIcon = ({
  IconComponent,
  isActive,
  isProcessing,
  milestone,
  currentStage,
  index,
}) => {
  const shouldShow =
    !isActive || (isActive && !isProcessing) || currentStage > index;

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center z-10"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: shouldShow ? 1 : 0,
        scale: shouldShow ? 1 : 0.8,
      }}
      transition={{ duration: 0.3 }}
    >
      <IconComponent
        className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 ${
          isActive
            ? "text-primary"
            : currentStage > index
            ? "text-primary/70"
            : "text-primary/40"
        } transition-colors duration-300`}
      />
    </motion.div>
  );
};

export function Roadmap() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [currentStage, setCurrentStage] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    if (!isInView) return;

    const animateStages = async () => {
      setShowImage(true);

      while (isInView) {
        for (let stage = 0; stage < milestones.length; stage++) {
          setCurrentStage(stage);
          setIsProcessing(true);

          await new Promise((resolve) => setTimeout(resolve, 1500));

          setIsProcessing(false);
          if (stage < milestones.length - 1) {
            await new Promise((resolve) => setTimeout(resolve, 500));
          }
        }

        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    };

    animateStages();

    return () => {
      setIsProcessing(false);
    };
  }, [isInView]);

  return (
    <section
      ref={ref}
      className="relative py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/10 to-background" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            Our <span className="text-gradient">Roadmap</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            The journey ahead: building the future of social photography
          </p>
        </motion.div>

        <div className="hidden lg:block">
          <div className="relative pt-40 lg:pt-48">
            <div className="flex justify-between items-center relative z-20 px-4">
              {milestones.map((milestone, index) => (
                <div
                  key={milestone.id}
                  className="relative z-20 flex-1 flex justify-center"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{
                      delay: index * 0.2 + 0.5,
                      duration: 0.6,
                      type: "spring",
                    }}
                    className={`w-28 h-28 rounded-full bg-primary/20 flex items-center justify-center glow-${
                      milestone.color
                    } border-4 ${
                      currentStage === index
                        ? "border-primary/80"
                        : "border-primary/40"
                    } transition-all duration-300 relative overflow-hidden`}
                  >
                    <StageIcon
                      IconComponent={milestone.icon}
                      isActive={currentStage === index}
                      isProcessing={isProcessing}
                      milestone={milestone}
                      currentStage={currentStage}
                      index={index}
                    />

                    {showImage && currentStage === index && isProcessing && (
                      <GifAnimation
                        gifSrc={milestone.gif}
                        isActive={currentStage === index && isProcessing}
                        alt={`${milestone.title} Animation`}
                      />
                    )}
                  </motion.div>

                  {index < milestones.length - 1 && (
                    <div
                      className="absolute left-1/2 top-1/2 -translate-y-1/2 z-0"
                      style={{
                        left: "calc(50% + 56px)",
                        width: "calc(100% - 112px)",
                      }}
                    >
                      <div className="relative w-full">
                        <motion.div
                          initial={{ scaleX: 0 }}
                          animate={isInView ? { scaleX: 1 } : {}}
                          transition={{
                            delay: 0.8 + index * 0.1,
                            duration: 0.8,
                            ease: "easeInOut",
                          }}
                          className="h-0.5 w-full origin-left"
                          style={{
                            backgroundImage:
                              "repeating-linear-gradient(90deg, hsl(var(--primary) / 0.4) 0px, hsl(var(--primary) / 0.4) 8px, transparent 8px, transparent 16px)",
                          }}
                        />

                        <motion.div
                          initial={{ x: "-100%", opacity: 0 }}
                          animate={
                            isInView
                              ? {
                                  x: ["0%", "100%", "100%"],
                                  opacity: [0, 1, 1, 0],
                                }
                              : {}
                          }
                          transition={{
                            delay: 1.2 + index * 0.3,
                            duration: 4,
                            repeat: Infinity,
                            repeatDelay: 3,
                            ease: "easeInOut",
                          }}
                          className="absolute top-1/2 -translate-y-1/2"
                        >
                          <Footprints className="w-6 h-6 text-primary rotate-90" />
                        </motion.div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-between mt-32 gap-6">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={`card-${milestone.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.1 + 0.8 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className={`glass-morphism rounded-2xl transition-all duration-300 shadow-xl flex-1 min-w-0 p-6 ${
                    currentStage === index
                      ? "ring-2 ring-primary/50 bg-primary/5"
                      : "hover:bg-card/70"
                  }`}
                >
                  <div
                    className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 ${
                      milestone.status === "Now"
                        ? "bg-primary text-primary-foreground glow-cyan"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {milestone.status}
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-foreground">
                    {milestone.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {milestone.description}
                  </p>
                  {currentStage === index && isProcessing && (
                    <motion.div
                      className="mt-3 w-full bg-primary/20 rounded-full h-1"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1.5, ease: "linear" }}
                    >
                      <div className="h-1 bg-primary rounded-full" />
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:hidden pt-40 sm:pt-48">
          {milestones.map((milestone, index) => (
            <div key={milestone.id} className="flex items-start gap-6 mb-12">
              <div className="flex flex-col items-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{
                    delay: index * 0.15 + 0.5,
                    duration: 0.6,
                    type: "spring",
                  }}
                  className={`w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center glow-${
                    milestone.color
                  } border-4 ${
                    currentStage === index
                      ? "border-primary/80"
                      : "border-primary/40"
                  } transition-all duration-300 relative overflow-hidden`}
                >
                  <StageIcon
                    IconComponent={milestone.icon}
                    isActive={currentStage === index}
                    isProcessing={isProcessing}
                    milestone={milestone}
                    currentStage={currentStage}
                    index={index}
                  />

                  {showImage && currentStage === index && isProcessing && (
                    <GifAnimation
                      gifSrc={milestone.gif}
                      isActive={currentStage === index && isProcessing}
                      alt={`${milestone.title} Animation`}
                    />
                  )}
                </motion.div>

                {index < milestones.length - 1 && (
                  <div className="relative w-1 h-16 mt-2">
                    <motion.div
                      initial={{ scaleY: 0 }}
                      animate={isInView ? { scaleY: 1 } : {}}
                      transition={{
                        delay: index * 0.15 + 0.7,
                        duration: 0.6,
                        ease: "easeInOut",
                      }}
                      className="w-full h-full origin-top bg-transparent"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(180deg, hsl(var(--primary) / 0.4) 0px, hsl(var(--primary) / 0.4) 8px, transparent 8px, transparent 16px)",
                      }}
                    />
                    <motion.div
                      initial={{ y: "-100%", opacity: 0 }}
                      animate={
                        isInView
                          ? {
                              y: ["0%", "100%", "100%"],
                              opacity: [0, 1, 1, 0],
                            }
                          : {}
                      }
                      transition={{
                        delay: index * 0.15 + 0.9,
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 3,
                        ease: "easeInOut",
                      }}
                      className="absolute left-1/2 -translate-x-1/2"
                    >
                      <Footprints className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    </motion.div>
                  </div>
                )}
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.15 + 0.8 }}
                whileHover={{ x: 4, scale: 1.01 }}
                className={`glass-morphism rounded-2xl transition-all duration-300 shadow-xl flex-1 p-5 ${
                  currentStage === index
                    ? "ring-2 ring-primary/50 bg-primary/5"
                    : "hover:bg-card/70"
                }`}
              >
                <div
                  className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 ${
                    milestone.status === "Now"
                      ? "bg-primary text-primary-foreground glow-cyan"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {milestone.status}
                </div>
                <h3 className="text-base font-bold mb-2 text-foreground">
                  {milestone.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {milestone.description}
                </p>
                {currentStage === index && isProcessing && (
                  <motion.div
                    className="mt-3 w-full bg-primary/20 rounded-full h-1"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.5, ease: "linear" }}
                  >
                    <div className="h-1 bg-primary rounded-full" />
                  </motion.div>
                )}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
