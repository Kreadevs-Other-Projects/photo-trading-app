import { Suspense, useRef, useState, useMemo, useEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { motion, useInView } from "framer-motion";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { Check } from "lucide-react";
import { useGlobe } from "../store/context";

import portrait1 from "../assets/portraits/portrait-1.jpeg";
import portrait2 from "../assets/portraits/portrait-2.JPG";
import portrait3 from "../assets/portraits/portrait-3.jpeg";
import portrait4 from "../assets/portraits/portrait-4.jpeg";
import portrait5 from "../assets/portraits/portrait-5.jpeg";
import portrait6 from "../assets/portraits/portrait-6.jpeg";
import portrait7 from "../assets/portraits/portrait-7.JPG";
import portrait8 from "../assets/portraits/portrait-8.jpeg";
import portrait9 from "../assets/portraits/portrait-9.JPG";
import portrait10 from "../assets/portraits/portrait-10.JPG";
import portrait11 from "../assets/portraits/portrait-11.JPG";
import portrait12 from "../assets/portraits/portrait-12.JPG";
import portrait13 from "../assets/portraits/portrait-13.JPG";
import portrait14 from "../assets/portraits/portrait-14.jpeg";
import portrait15 from "../assets/portraits/portrait-15.jpeg";
import { set } from "date-fns";

export const portraits = [
  portrait1,
  portrait2,
  portrait3,
  portrait4,
  portrait5,
  portrait6,
  portrait7,
  portrait8,
  portrait9,
  portrait10,
  portrait11,
  portrait12,
  portrait13,
  portrait14,
  portrait15,
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
    if (meshRef.current) {
      meshRef.current.lookAt(0, 0, 0);

      if (hovered) {
        meshRef.current.scale.lerp(new THREE.Vector3(1.3, 1.3, 1.3), 0.1);
        const direction = new THREE.Vector3()
          .copy(meshRef.current.position)
          .normalize();
        meshRef.current.position.lerp(
          new THREE.Vector3(
            position[0] + direction.x * 0.2,
            position[1] + direction.y * 0.2,
            position[2] + direction.z * 0.2
          ),
          0.1
        );
      } else {
        meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
        meshRef.current.position.lerp(
          new THREE.Vector3(position[0], position[1], position[2]),
          0.1
        );
      }
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <planeGeometry args={[0.5, 0.5]} />
      <meshStandardMaterial
        map={texture}
        transparent
        opacity={hovered ? 1 : 0.9}
        emissive={hovered ? "#00D9FF" : "#000000"}
        emissiveIntensity={hovered ? 0.3 : 0}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function Globe({ images }: { images: string[] }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.0008;
    }
  });

  const positions = useMemo(() => {
    const radius = 2.5;
    const tiles: [number, number, number][] = [];
    const numRings = 10;
    const tilesPerRing = 20;

    tiles.push([0, radius, 0]);

    for (let ring = 1; ring < numRings - 1; ring++) {
      const phi = Math.PI * (ring / (numRings - 1));
      const y = radius * Math.cos(phi);
      const ringRadius = radius * Math.sin(phi);

      const circumference = 2 * Math.PI * ringRadius;
      const optimalTiles = Math.max(8, Math.floor(circumference / 0.6));

      for (let i = 0; i < optimalTiles; i++) {
        const theta = (2 * Math.PI * i) / optimalTiles;
        const x = ringRadius * Math.cos(theta);
        const z = ringRadius * Math.sin(theta);
        tiles.push([x, y, z]);
      }
    }
    tiles.push([0, -radius, 0]);

    return tiles;
  }, []);

  return (
    <group ref={groupRef}>
      <ambientLight intensity={1} />
      <pointLight position={[6, 6, 6]} intensity={1.2} color="#00D9FF" />
      <pointLight position={[-6, -6, -6]} intensity={0.9} color="#9D4EDD" />
      <pointLight position={[0, 6, 0]} intensity={0.7} color="#FFFFFF" />

      {positions.map((pos, index) => (
        <PhotoTile
          key={index}
          position={pos}
          image={images[index % images.length]}
          index={index}
        />
      ))}

      <OrbitControls
        enableZoom={true}
        enablePan={false}
        autoRotate
        autoRotateSpeed={1.2}
        minDistance={1} // Reduced from 3 to allow zooming inside
        maxDistance={15}
        minPolarAngle={0} // Allow viewing from top and bottom
        maxPolarAngle={Math.PI} // Allow viewing from top and bottom
        minAzimuthAngle={-Infinity}
        maxAzimuthAngle={Infinity}
        enableDamping={true}
        dampingFactor={0.05}
        rotateSpeed={1}
      />
    </group>
  );
}

export function ImageGlobeHero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { globeImages } = useGlobe();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:4000/api/users/sendEmail",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (!result.success) {
        toast.error(result.message || "Something went wrong");
      } else {
        setIsSubmitted(true);
        toast.success("You're on the list! We'll be in touch soon.", {
          icon: "🎉",
        });
        setEmail("");
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
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
                    disabled={loading}
                  />
                  <Button
                    type="submit"
                    size="lg"
                    className="h-14 lg:h-14 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold glow-cyan hover:glow-blue transition-all duration-300 hover:scale-105"
                    disabled={loading}
                  >
                    {loading ? "Joining..." : "Join Early Access"}
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
            animate={isInView ? { opacity: 1, scale: 1.1 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="h-[500px] md:h-[500px] relative rounded-full"
          >
            <Suspense
              fallback={
                <div className="w-full h-full flex items-center justify-center rounded-full ">
                  <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin " />
                </div>
              }
            >
              <Canvas
                camera={{
                  position: [0, 0, 6],
                  fov: 60,
                  near: 0.01,
                  far: 120,
                }}
                gl={{
                  antialias: true,
                  alpha: true,
                }}
                style={{ background: "transparent" }}
              >
                <Globe images={globeImages} />
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
