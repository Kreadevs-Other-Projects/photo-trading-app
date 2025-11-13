import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Repeat2 } from "lucide-react";

const activities = [
  { user: "Sarah", traded: 3, time: "2m ago" },
  { user: "Mike", traded: 5, time: "5m ago" },
  { user: "Emma", traded: 2, time: "8m ago" },
  { user: "Alex", traded: 4, time: "12m ago" },
  { user: "Jordan", traded: 6, time: "15m ago" },
  { user: "Taylor", traded: 3, time: "20m ago" },
];

export function ActivityTicker() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const duplicatedActivities = [...activities, ...activities];

  return (
    <section
      ref={ref}
      className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h3 className="text-2xl font-bold text-foreground mb-2">
            Live Activity
          </h3>
          <p className="text-muted-foreground">
            See what others are trading right now
          </p>
        </motion.div>

        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

          <motion.div
            initial={{ x: 0 }}
            animate={{ x: "-50%" }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
            className="flex gap-4 py-4"
          >
            {duplicatedActivities.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                className="flex-shrink-0 glass-morphism rounded-2xl p-4 w-64 hover:bg-card/60 transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center">
                    <span className="text-sm font-bold">
                      {activity.user[0]}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-foreground">
                      {activity.user}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Repeat2 className="w-3 h-3" />
                      <span>
                        Traded {activity.traded} photo
                        {activity.traded > 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {activity.time}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
