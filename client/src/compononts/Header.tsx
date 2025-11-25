import { motion } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";
import { Camera } from "lucide-react";
import { ContactButton } from "../compononts/ui/contactBtn";
import { Link, useLocation } from "react-router-dom";

export function Header() {
  const location = useLocation();

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 glass-morphism border-b border-border/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center glow-cyan">
                <Camera className="w-6 h-6 text-primary" />
              </div>
              <span className="text-xl font-bold text-foreground">
                Snap<span className="text-primary">Trade</span>
              </span>
            </motion.div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === "/"
                  ? "text-primary"
                  : "text-foreground/80"
              }`}
            >
              Home
            </Link>
            <Link
              to="/contact"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === "/contact"
                  ? "text-primary"
                  : "text-foreground/80"
              }`}
            >
              Contact
            </Link>
          </nav>

          <ThemeToggle />
        </div>
      </div>
    </motion.header>
  );
}
