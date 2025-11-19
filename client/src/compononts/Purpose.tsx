import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Lock, ArrowUp, ArrowLeft } from "lucide-react";
import portrait1 from "../assets/portraits/portrait-1.jpeg";
import portrait2 from "../assets/portraits/portrait-2.JPG";
import portrait3 from "../assets/portraits/portrait-3.jpeg";
import portrait4 from "../assets/portraits/portrait-4.jpeg";

export function Purpose() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const size = 370;

  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section
      ref={ref}
      className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[800px] h-[800px] bg-neon-blue/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="text-foreground">Want your </span>
            <span className="text-gradient">shot?</span>
          </h2>
          <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Trade one back. Fair photography that respects everyone's lens.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <div className="grid md:grid-cols-3 gap-8 items-center">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={isInView ? { x: 0, opacity: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="glass-morphism rounded-3xl p-6 space-y-4"
            >
              <div className="aspect-[9/16] bg-gradient-to-br from-card to-muted rounded-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-background/0 backdrop-blur-md flex items-center justify-center">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-full h-full flex items-center justify-center"
                  >
                    <img
                      src={portrait2}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover filter blur-md opacity-30"
                    />
                    <div className="flex items-center justify-center">
                      <Lock className="w-10 h-10 text-primary drop-shadow-[0_0_10px_rgba(34,211,238,0.8)] cursor-pointer transition-all" />
                    </div>
                  </motion.div>
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-center">
                  <p className="text-sm font-medium text-foreground">
                    Your Photo (Locked)
                  </p>
                </div>
              </div>
              <p className="text-xs text-center text-muted-foreground">
                Face recognition keeps it smart
              </p>
            </motion.div>

            <div className="flex flex-col items-center justify-center">
              <motion.div
                initial={{ translateX: 0, opacity: 1 }}
                animate={
                  isInView && isMobileView
                    ? {
                        opacity: 1,
                        translateY: [0, -10, 0, -10, 0],
                      }
                    : { opacity: 1, translateX: [0, -10, 0, -10, 0] }
                }
                transition={{
                  delay: 0.1,
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center glow-cyan mb-4"
              >
                {isMobileView ? (
                  <ArrowUp className="w-8 h-8 text-primary " />
                ) : (
                  <ArrowLeft className="w-8 h-8 text-primary" />
                )}
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 1, duration: 0.6 }}
                className="text-sm font-semibold text-primary"
              >
                Trade to Unlock
              </motion.p>
            </div>

            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={isInView ? { x: 0, opacity: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="glass-morphism rounded-3xl p-6 space-y-4"
            >
              <div className="aspect-[9/16] bg-gradient-to-br from-card to-muted rounded-2xl relative overflow-hidden">
                <div className="grid grid-cols-2 gap-2 p-3">
                  {[portrait1, portrait2, portrait3, portrait4].map(
                    (img, i) => (
                      <motion.div
                        key={i}
                        initial={{ rotateY: 90, opacity: 0 }}
                        animate={
                          isInView
                            ? {
                                rotateY: 0,
                                opacity: 1,
                                y: [0, -3, 0],
                                rotateZ: [0, -1, 0, 1, 0],
                              }
                            : {}
                        }
                        transition={{
                          delay: 0.8 + i * 0.15,
                          duration: 0.6,
                          type: "spring",
                          stiffness: 80,
                          y: {
                            duration: 3,
                            repeat: Infinity,
                            delay: i * 0.7,
                          },
                          rotateZ: {
                            duration: 4,
                            repeat: Infinity,
                            delay: i * 0.3,
                          },
                        }}
                        whileHover={{
                          scale: 1.05,
                          rotateY: 5,
                          zIndex: 10,
                          y: -5,
                          transition: { type: "spring", stiffness: 400 },
                        }}
                        className="aspect-square rounded-lg cursor-pointer overflow-hidden relative group [transform-style:preserve-3d]"
                      >
                        <motion.img
                          src={img}
                          alt={`Gallery photo ${i + 1}`}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.4 }}
                        />
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-br from-primary/30 to-purple-500/30 opacity-0 "
                          whileHover={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.div>
                    )
                  )}
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-center">
                  <p className="text-sm font-medium text-foreground">
                    Your Gallery
                  </p>
                </div>
              </div>
              <p className="text-xs text-center text-muted-foreground">
                Pick one to unlock theirs
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-3 mt-12"
          >
            {[
              "Face Recognition",
              "Smart Tagging",
              "Photo Trades",
              "Privacy First",
            ].map((tag, i) => (
              <motion.div
                key={tag}
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{
                  delay: 1.3 + i * 0.1,
                  type: "spring",
                  stiffness: 200,
                }}
                className="px-4 py-2 glass-morphism rounded-full text-sm font-medium"
              >
                {tag}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
