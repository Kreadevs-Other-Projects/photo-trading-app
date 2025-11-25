import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

interface ContactButtonProps {
  onClick?: () => void;
  className?: string;
}

export function ContactButton({ onClick, className = "" }: ContactButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`
        group relative
        px-4 py-2 rounded-lg
        bg-primary/10 hover:bg-primary/20
        dark:bg-primary/10 dark:hover:bg-primary/20
        border border-primary/20 hover:border-primary/30
        dark:border-primary/20 dark:hover:border-primary/30
        text-foreground
        flex items-center gap-2
        transition-all duration-300
        glow-cyan-hover
        dark:glow-cyan-hover
        shadow-sm hover:shadow-md
        dark:shadow-cyan-500/10 dark:hover:shadow-cyan-500/20
        ${className}
      `}
    >
      <motion.div
        animate={{ rotate: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 5 }}
      >
        <MessageCircle className="w-4 h-4 text-primary" />
      </motion.div>

      <span className="font-medium text-sm">Contact</span>

      <motion.div
        className="absolute inset-0 rounded-lg bg-primary/5 dark:bg-primary/5"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.button>
  );
}
