import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Camera, Repeat2, UserCircle } from "lucide-react";

const steps = [
  {
    icon: Camera,
    title: "Snap Your Friends",
    description:
      "Take photos of your friends at events, parties, or everyday moments.",
    color: "cyan",
  },
  {
    icon: Repeat2,
    title: "Trade to Unlock",
    description:
      "Want the photo someone took of you? Trade one back to unlock it.",
    color: "blue",
  },
  {
    icon: UserCircle,
    title: "Build Your Profile",
    description:
      "Collect and curate your best moments in a stunning photo gallery.",
    color: "purple",
  },
];

export function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={ref}
      className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            How It <span className="text-gradient">Works</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Three simple steps to a more social photography experience
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const glowClass =
              step.color === "cyan"
                ? "glow-cyan"
                : step.color === "blue"
                ? "glow-blue"
                : "glow-purple";

            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                className="relative group"
              >
                {/* Step Number */}
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary z-10">
                  {index + 1}
                </div>

                {/* Card */}
                <div className="glass-morphism rounded-3xl p-8 h-full hover:bg-card/60 transition-all duration-300 group-hover:scale-105">
                  {/* Icon */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{
                      delay: index * 0.2 + 0.3,
                      type: "spring",
                      stiffness: 200,
                    }}
                    className={`w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 ${glowClass} group-hover:${glowClass} transition-all duration-300`}
                  >
                    <Icon className="w-10 h-10 text-primary" />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold mb-4 text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>

                  {/* Animated Line */}
                  {index < steps.length - 1 && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={isInView ? { scaleX: 1 } : {}}
                      transition={{ delay: index * 0.2 + 0.6, duration: 0.8 }}
                      className="hidden md:block absolute top-20 -right-6 lg:-right-12 w-6 lg:w-12 h-0.5 bg-gradient-to-r from-primary to-accent origin-left"
                    />
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-muted-foreground">
            Simple, fair, and fun for everyone involved
          </p>
        </motion.div>
      </div>
    </section>
  );
}
