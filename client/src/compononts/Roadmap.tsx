import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Camera,
  Sparkles,
  Tag,
  UserCircle,
  Cloud,
  Footprints,
} from "lucide-react";

const milestones = [
  {
    title: "Photo Trading MVP",
    status: "Now",
    description: "Core trade-to-unlock functionality",
    icon: Camera,
    color: "cyan",
  },
  {
    title: "Face Recognition",
    status: "Next",
    description: "AI-powered smart tagging",
    icon: Tag,
    color: "blue",
  },
  {
    title: "AI Enhancement",
    status: "Soon",
    description: "Professional editing tools",
    icon: Sparkles,
    color: "purple",
  },
  {
    title: "User Profiles",
    status: "Coming",
    description: "Personal photo galleries",
    icon: UserCircle,
    color: "cyan",
  },
  {
    title: "Cloud Storage",
    status: "Future",
    description: "Premium tools & storage",
    icon: Cloud,
    color: "blue",
  },
];

export function Roadmap() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={ref}
      className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/10 to-background" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            Our <span className="text-gradient">Roadmap</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The journey ahead: building the future of social photography
          </p>
        </motion.div>
        <div className="relative">
          <div className="hidden lg:block">
            <div className="flex justify-between items-start gap-4 relative px-8">
              {milestones.map((milestone, index) => {
                const Icon = milestone.icon;
                const glowClass =
                  milestone.color === "cyan"
                    ? "glow-cyan"
                    : milestone.color === "blue"
                    ? "glow-blue"
                    : "glow-purple";

                return (
                  <div key={milestone.title} className="relative flex-1">
                    <motion.div
                      initial={{ opacity: 0, y: 50, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                      transition={{
                        delay: index * 0.2 + 0.5,
                        duration: 0.6,
                        type: "spring",
                        stiffness: 100,
                      }}
                      className="relative"
                    >
                      <motion.div
                        className="relative z-10 mb-6 mx-auto w-fit"
                        animate={
                          isInView
                            ? {
                                scale: [1, 1.1, 1],
                                opacity: [0.8, 1, 0.8],
                              }
                            : {}
                        }
                        transition={{
                          delay: index * 0.2 + 1,
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 1,
                        }}
                      >
                        <div
                          className={`w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center ${glowClass} border-4 border-primary/40`}
                        >
                          <Icon className="w-10 h-10 text-primary" />
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ delay: index * 0.2 + 0.8 }}
                        whileHover={{ y: -8, scale: 1.05 }}
                        className="glass-morphism rounded-2xl p-6 hover:bg-card/70 transition-all duration-300 shadow-xl"
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
                      </motion.div>
                    </motion.div>

                    {index < milestones.length - 1 && (
                      <div className="absolute top-10 left-[60%] w-[80%] h-1 flex items-center justify-center">
                        <motion.div
                          initial={{ scaleX: 0 }}
                          animate={isInView ? { scaleX: 1 } : {}}
                          transition={{
                            delay: index * 0.2 + 1,
                            duration: 0.8,
                            ease: "easeInOut",
                          }}
                          className="w-full h-0.5 bg-gradient-to-r from-primary/40 via-primary/60 to-primary/40 origin-left"
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
                                  x: "100%",
                                  opacity: [0, 1, 1, 0],
                                }
                              : {}
                          }
                          transition={{
                            delay: index * 0.2 + 1.2,
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: 3,
                            ease: "linear",
                          }}
                          className="absolute"
                        >
                          <Footprints className="w-6 h-6 text-primary rotate-90" />
                        </motion.div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lg:hidden space-y-8">
            {milestones.map((milestone, index) => {
              const Icon = milestone.icon;
              const glowClass =
                milestone.color === "cyan"
                  ? "glow-cyan"
                  : milestone.color === "blue"
                  ? "glow-blue"
                  : "glow-purple";

              return (
                <motion.div
                  key={milestone.title}
                  initial={{ opacity: 0, x: -50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    delay: index * 0.15,
                    duration: 0.6,
                  }}
                  className="relative flex gap-6"
                >
                  <div className="flex flex-col items-center">
                    <motion.div
                      animate={
                        isInView
                          ? {
                              scale: [1, 1.1, 1],
                              opacity: [0.8, 1, 0.8],
                            }
                          : {}
                      }
                      transition={{
                        delay: index * 0.15 + 0.5,
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 1,
                      }}
                    >
                      <div
                        className={`w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center ${glowClass} border-4 border-primary/40`}
                      >
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                    </motion.div>

                    {index < milestones.length - 1 && (
                      <div className="relative w-1 flex-1 my-4">
                        <motion.div
                          initial={{ scaleY: 0 }}
                          animate={isInView ? { scaleY: 1 } : {}}
                          transition={{
                            delay: index * 0.15 + 0.6,
                            duration: 0.6,
                            ease: "easeInOut",
                          }}
                          className="w-full h-full origin-top"
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
                                  y: "200%",
                                  opacity: [0, 1, 1, 0],
                                }
                              : {}
                          }
                          transition={{
                            delay: index * 0.15 + 0.8,
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: 2,
                            ease: "linear",
                          }}
                          className="absolute left-1/2 -translate-x-1/2"
                        >
                          <Footprints className="w-5 h-5 text-primary" />
                        </motion.div>
                      </div>
                    )}
                  </div>

                  <motion.div
                    whileHover={{ x: 8, scale: 1.02 }}
                    className="glass-morphism rounded-2xl p-5 flex-1 hover:bg-card/70 transition-all duration-300 shadow-xl"
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
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
