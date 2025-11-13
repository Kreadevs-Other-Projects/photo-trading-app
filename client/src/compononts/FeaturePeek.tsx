import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Lock, Repeat2, Sparkles, UserCircle } from "lucide-react";

const features = [
  {
    icon: Lock,
    title: "Smart Tagging",
    description:
      "AI-powered face recognition automatically tags your friends and organizes your gallery.",
    color: "cyan",
    iconTransform: { hover: { rotate: [0, -10, 10, 0], scale: 1.1 } },
  },
  {
    icon: Repeat2,
    title: "Trade-to-Unlock",
    description:
      "Fair exchange system: want a photo of you? Trade one back. Everyone wins.",
    color: "blue",
    iconTransform: { hover: { rotate: 360, scale: 1.1 } },
  },
  {
    icon: Sparkles,
    title: "AI Enhancements",
    description:
      "Automatic photo enhancement, filters, and editing tools powered by AI.",
    color: "purple",
    iconTransform: { hover: { y: [-5, 5, -5, 0], scale: 1.1 } },
  },
  {
    icon: UserCircle,
    title: "Beautiful Profiles",
    description:
      "Showcase your best moments in a stunning, customizable photo gallery.",
    color: "cyan",
    iconTransform: { hover: { scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] } },
  },
];

export function FeaturePeek() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={ref}
      className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            Powerful <span className="text-gradient">Features</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need for social photography that trades back
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const glowClass =
              feature.color === "cyan"
                ? "glow-cyan"
                : feature.color === "blue"
                ? "glow-blue"
                : "glow-purple";

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <motion.div className="glass-morphism rounded-3xl p-6 h-full hover:bg-card/60 transition-all duration-300 border border-border/0 hover:border-primary/30 relative overflow-hidden">
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className={`absolute inset-0 rounded-3xl ${glowClass} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                    style={{ filter: "blur(20px)", zIndex: -1 }}
                  />

                  <motion.div
                    className={`w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 ${glowClass} transition-all duration-300`}
                  >
                    <motion.div
                      whileHover={feature.iconTransform.hover}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                      <Icon className="w-8 h-8 text-primary" />
                    </motion.div>
                  </motion.div>

                  <h3 className="text-xl font-bold mb-3 text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {feature.description}
                  </p>

                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileHover={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="absolute top-4 right-4 w-2 h-2 bg-primary rounded-full"
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
