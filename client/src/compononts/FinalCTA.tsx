import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { Camera, Sparkles, Check } from "lucide-react";
import portrait1 from "../assets/portraits/portrait-1.jpeg";
import portrait2 from "../assets/portraits/portrait-2.JPG";
import portrait3 from "../assets/portraits/portrait-3.jpeg";
import portrait4 from "../assets/portraits/portrait-4.jpeg";
import portrait5 from "../assets/portraits/portrait-5.jpeg";

const portraits = [portrait1, portrait2, portrait3, portrait4, portrait5];

export function FinalCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }
    setIsSubmitted(true);
    toast.success("Welcome to the future of photography! 🎉");
  };

  return (
    <section
      ref={ref}
      className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-card/30 to-background" />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-cyan/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-purple/20 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="flex justify-center gap-8 mb-8">
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2, type: "spring" }}
              whileHover={{ y: -10, rotate: 15 }}
              className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center glow-cyan"
            >
              <Camera className="w-8 h-8 text-primary" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3, type: "spring" }}
              whileHover={{ y: -10, rotate: -15 }}
              className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center glow-purple"
            >
              <Sparkles className="w-8 h-8 text-accent" />
            </motion.div>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-bold mb-6">
            Be The First to Try{" "}
            <span className="text-gradient">Social Photography</span>
          </h2>

          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Join the waitlist and get exclusive early access when we launch
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="max-w-md mx-auto"
          >
            {!isSubmitted ? (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3"
              >
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 h-14 bg-card/50 backdrop-blur-sm border-border/50 focus:border-primary text-lg"
                  required
                />
                <Button
                  type="submit"
                  size="lg"
                  className="h-14 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold glow-cyan hover:glow-blue transition-all duration-300 hover:scale-105 whitespace-nowrap"
                >
                  Join Waitlist
                </Button>
              </form>
            ) : (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="glass-morphism p-8 rounded-2xl"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center glow-cyan"
                >
                  <Check className="w-8 h-8 text-primary" />
                </motion.div>
                <h3 className="text-2xl font-bold mb-2 text-foreground">
                  You're on the list!
                </h3>
                <p className="text-muted-foreground">
                  We'll email you when we're ready to launch
                </p>
              </motion.div>
            )}
          </motion.div>

          {!isSubmitted && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground"
            >
              <div className="flex -space-x-2">
                {portraits.map((i, img) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 border-2 border-background"
                  >
                    <img
                      src={i}
                      alt={`portrait-${img + 1}`}
                      className="rounded-full object-fill w-full h-full"
                    />
                  </div>
                ))}
              </div>
              <span>Join 1,000+ people on the waitlist</span>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
