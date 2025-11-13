import { Suspense, useRef, useState, useMemo } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { motion, useInView } from "framer-motion";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { Check } from "lucide-react";

import portrait1 from "../assets/portraits/portrait-1.jpg";
import portrait2 from "../assets/portraits/portrait-2.jpg";
import portrait3 from "../assets/portraits/portrait-3.jpg";
import portrait4 from "../assets/portraits/portrait-4.jpg";
import portrait5 from "../assets/portraits/portrait-5.jpg";
import portrait6 from "../assets/portraits/portrait-6.jpg";

const portraits = [
  portrait1,
  portrait2,
  portrait3,
  portrait4,
  portrait5,
  portrait6,
];

function PhotoTile({
  position,
  image,
  index,
}: {
  position: [number, number, number];
  image: string;
  index: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const texture = useLoader(THREE.TextureLoader, image);

  useFrame((state) => {
    if (meshRef.current && hovered) {
      meshRef.current.scale.lerp(new THREE.Vector3(1.2, 1.2, 1.2), 0.1);
    } else if (meshRef.current) {
      meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <planeGeometry args={[0.8, 0.8]} />
      <meshStandardMaterial
        map={texture}
        transparent
        opacity={hovered ? 1 : 0.9}
        emissive={hovered ? "#00D9FF" : "#000000"}
        emissiveIntensity={hovered ? 0.3 : 0}
      />
    </mesh>
  );
}

function Globe() {
  const groupRef = useRef<THREE.Group>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
    }
  });

  // Create icosahedron-like distribution of photos
  const positions = useMemo(() => {
    const radius = 3;
    const tiles: [number, number, number][] = [];
    const numRings = 6;
    const tilesPerRing = 12;

    for (let ring = 0; ring < numRings; ring++) {
      const phi = Math.PI * (ring / (numRings - 1));
      const y = radius * Math.cos(phi);
      const ringRadius = radius * Math.sin(phi);

      for (let i = 0; i < tilesPerRing; i++) {
        const theta = (2 * Math.PI * i) / tilesPerRing;
        const x = ringRadius * Math.cos(theta);
        const z = ringRadius * Math.sin(theta);
        tiles.push([x, y, z]);
      }
    }
    return tiles;
  }, []);

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00D9FF" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#9D4EDD" />

      {positions.map((pos, index) => (
        <PhotoTile
          key={index}
          position={pos}
          image={portraits[index % portraits.length]}
          index={index}
        />
      ))}

      <OrbitControls
        enableZoom={true}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.3}
        minDistance={5}
        maxDistance={15}
      />
    </group>
  );
}

export function ImageGlobeHero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }
    setIsSubmitted(true);
    toast.success("You're on the list! We'll be in touch soon.", {
      icon: "🎉",
    });
  };

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        <motion.div
          className="absolute top-20 left-1/4 w-96 h-96 bg-neon-cyan/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-1/4 w-96 h-96 bg-neon-purple/20 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-block mb-6 px-4 py-2 glass-morphism rounded-full text-sm font-medium text-primary glow-cyan"
            >
              ✨ Trade Photos. Unlock Moments.
            </motion.div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-6 tracking-tight">
              <span className="block text-foreground">Get the photos</span>
              <span className="block text-gradient animate-glow-pulse">
                your friends took—
              </span>
              <span className="block text-foreground">
                by sharing one back.
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xs sm:text-2xl text-muted-foreground mb-12 line-clamp-2"
            >
              Two-sided engagement. Social photography. Real moments.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="max-w-md mx-auto lg:mx-0 justify-center items-center"
            >
              {!isSubmitted ? (
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col lg:flex-row md:flex-row gap-5 lg:gap-3 md:gap-3 items-center"
                >
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex h-14 bg-card/50 backdrop-blur-sm border-border/50 focus:border-primary text-lg"
                    required
                  />
                  <Button
                    type="submit"
                    size="lg"
                    className="h-14 lg:h-14 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold glow-cyan hover:glow-blue transition-all duration-300 hover:scale-105"
                  >
                    Join Early Access
                  </Button>
                </form>
              ) : (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="flex items-center justify-center gap-3 glass-morphism p-6 rounded-2xl"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center glow-cyan"
                  >
                    <Check className="w-6 h-6 text-primary" />
                  </motion.div>
                  <div className="text-left">
                    <p className="font-semibold text-foreground">You're in!</p>
                    <p className="text-sm text-muted-foreground">
                      Check your email for updates
                    </p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="h-[500px] md:h-[700px] relative"
          >
            <Suspense
              fallback={
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
              }
            >
              <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
                <Globe />
              </Canvas>
            </Suspense>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 glass-morphism px-6 py-3 rounded-full">
              <p className="text-sm text-muted-foreground">
                Drag to rotate • Scroll to zoom • Hover to pop
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-primary/50 rounded-full flex items-start justify-center p-2"
        >
          <motion.div className="w-1.5 h-1.5 bg-primary rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
