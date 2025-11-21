// import { motion, useInView } from "framer-motion";
// import { useRef, useState, useEffect } from "react";
// import {
//   Camera,
//   Sparkles,
//   Tag,
//   UserCircle,
//   Cloud,
//   Footprints,
//   Upload,
//   ScanFace,
//   Wand2,
// } from "lucide-react";
// import portrait15 from "../assets/portraits/portrait-3.jpeg";

// const milestones = [
//   {
//     title: "Photo Upload",
//     status: "Now",
//     description: "Uploading your photo to our system",
//     icon: Upload,
//     color: "cyan",
//     process: "uploading",
//   },
//   {
//     title: "Face Recognition",
//     status: "Next",
//     description: "AI-powered smart tagging",
//     icon: ScanFace,
//     color: "blue",
//     process: "faceDetection",
//   },
//   {
//     title: "AI Enhancement",
//     status: "Soon",
//     description: "Professional editing tools",
//     icon: Wand2,
//     color: "purple",
//     process: "enhancement",
//   },
//   {
//     title: "User Profiles",
//     status: "Coming",
//     description: "Personal photo galleries",
//     icon: UserCircle,
//     color: "cyan",
//     process: "profiling",
//   },
//   {
//     title: "Cloud Storage",
//     status: "Future",
//     description: "Premium tools & storage",
//     icon: Cloud,
//     color: "blue",
//     process: "cloudStorage",
//   },
// ];

// const SAMPLE_IMAGE = portrait15;

// export function Roadmap() {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, amount: 0.2 });
//   const [currentStage, setCurrentStage] = useState(0);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [showImage, setShowImage] = useState(false);

//   useEffect(() => {
//     if (!isInView) return;

//     const animateStages = async () => {
//       setShowImage(true);

//       for (let stage = 0; stage < milestones.length; stage++) {
//         setCurrentStage(stage);
//         setIsProcessing(true);

//         await new Promise((resolve) => setTimeout(resolve, 3000));
//         setIsProcessing(false);

//         if (stage < milestones.length - 1) {
//           await new Promise((resolve) => setTimeout(resolve, 800));
//         }
//       }

//       // Loop
//       setTimeout(() => {
//         if (isInView) animateStages();
//       }, 2000);
//     };

//     animateStages();
//   }, [isInView]);

//   return (
//     <section
//       ref={ref}
//       className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
//     >
//       <div className="absolute inset-0 bg-gradient-to-b from-background via-card/10 to-background" />

//       <div className="relative z-10 max-w-7xl mx-auto">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={isInView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.8 }}
//           className="text-center mb-20"
//         >
//           <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
//             Our <span className="text-gradient">Roadmap</span>
//           </h2>
//           <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
//             The journey ahead: building the future of social photography
//           </p>
//         </motion.div>

//         <div className="relative">
//           <div className="hidden lg:block">
//             <div className="flex justify-between items-start gap-4 relative px-8 pt-40">
//               {milestones.map((milestone, index) => {
//                 const Icon = milestone.icon;
//                 const glowClass =
//                   milestone.color === "cyan"
//                     ? "glow-cyan"
//                     : milestone.color === "blue"
//                     ? "glow-blue"
//                     : "glow-purple";
//                 const isActive = currentStage === index;

//                 return (
//                   <div key={milestone.title} className="relative flex-1">
//                     <motion.div
//                       initial={{ opacity: 0, y: 50, scale: 0.8 }}
//                       animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
//                       transition={{
//                         delay: index * 0.2 + 0.5,
//                         duration: 0.6,
//                         type: "spring",
//                         stiffness: 100,
//                       }}
//                       className="relative"
//                     >
//                       <motion.div
//                         className="relative z-10 mb-6 mx-auto w-fit"
//                         animate={
//                           isInView && isActive && isProcessing
//                             ? {
//                                 scale: [1, 1.1, 1],
//                                 opacity: [0.8, 1, 0.8],
//                               }
//                             : {}
//                         }
//                         transition={{
//                           duration: 2,
//                           repeat: isActive && isProcessing ? Infinity : 0,
//                         }}
//                       >
//                         <div
//                           className={`w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center ${glowClass} border-4 ${
//                             isActive ? "border-primary/80" : "border-primary/40"
//                           } transition-all duration-300 relative overflow-hidden`}
//                         >
//                           {(!showImage || !isActive) && (
//                             <Icon
//                               className={`w-10 h-10 ${
//                                 isActive ? "text-primary" : "text-primary/70"
//                               } transition-all duration-300`}
//                             />
//                           )}
//                           {showImage && isActive && (
//                             <motion.div
//                               initial={{ scale: 0, opacity: 0, y: -50 }}
//                               animate={{ scale: 1, opacity: 1, y: 0 }}
//                               transition={{
//                                 type: "spring",
//                                 stiffness: 200,
//                                 damping: 15,
//                                 delay: index === 0 ? 0.2 : 0,
//                               }}
//                               className="absolute inset-0 rounded-full overflow-hidden"
//                             >
//                               <motion.img
//                                 src={SAMPLE_IMAGE}
//                                 alt="Processing Demo"
//                                 className="w-full h-full object-cover"
//                                 animate={{
//                                   scale:
//                                     currentStage === 1 && isProcessing
//                                       ? [1, 1.2, 1]
//                                       : 1,
//                                   filter:
//                                     currentStage === 2 && isProcessing
//                                       ? [
//                                           "brightness(1) contrast(1)",
//                                           "brightness(1.2) contrast(1.3)",
//                                           "brightness(1) contrast(1.1)",
//                                         ]
//                                       : "none",
//                                 }}
//                                 transition={{
//                                   duration: currentStage === 1 ? 2 : 0.5,
//                                   repeat:
//                                     (currentStage === 1 ||
//                                       currentStage === 2) &&
//                                     isProcessing
//                                       ? Infinity
//                                       : 0,
//                                 }}
//                               />
//                               {currentStage === 0 && isProcessing && (
//                                 <>
//                                   {/* Dark overlay with reduced opacity */}
//                                   <motion.div
//                                     className="absolute inset-0 bg-black/40 rounded-full"
//                                     initial={{ opacity: 0 }}
//                                     animate={{ opacity: 1 }}
//                                     transition={{ duration: 0.3 }}
//                                   />

//                                   {/* Centered upload icon */}
//                                   <motion.div className="absolute inset-0 flex items-center justify-center rounded-full">
//                                     <motion.div
//                                       className="w-12 h-12 bg-gray-800/90 rounded-full flex items-center justify-center shadow-lg"
//                                       animate={{
//                                         scale: [1, 1.1, 1],
//                                       }}
//                                       transition={{
//                                         duration: 1.5,
//                                         repeat: Infinity,
//                                         ease: "easeInOut",
//                                       }}
//                                     >
//                                       <motion.div
//                                         animate={{
//                                           scale: [1, 1.2, 1],
//                                         }}
//                                         transition={{
//                                           duration: 2,
//                                           repeat: Infinity,
//                                           ease: "easeInOut",
//                                         }}
//                                       >
//                                         <Upload className="w-6 h-6 text-white" />
//                                       </motion.div>
//                                     </motion.div>
//                                   </motion.div>
//                                 </>
//                               )}

//                               {currentStage === 1 && isProcessing && (
//                                 <>
//                                   {/* Dark overlay to lower image opacity */}
//                                   <motion.div
//                                     className="absolute inset-0 bg-black/20 rounded-full"
//                                     initial={{ opacity: 0 }}
//                                     animate={{ opacity: 1 }}
//                                     transition={{ duration: 0.3 }}
//                                   />

//                                   {/* Subtle purple background pulse */}
//                                   <motion.div
//                                     className="absolute inset-0 bg-purple-500/20 rounded-full"
//                                     animate={{ opacity: [0.1, 0.3, 0.1] }}
//                                     transition={{
//                                       duration: 2,
//                                       repeat: Infinity,
//                                     }}
//                                   />

//                                   {/* Main centered face recognition icon */}
//                                   <motion.div className="absolute inset-0 flex items-center justify-center rounded-full">
//                                     <motion.div
//                                       className="w-14 h-14 bg-gray-800/90 rounded-full flex items-center justify-center shadow-lg"
//                                       animate={{
//                                         scale: [1, 1.2, 1],
//                                       }}
//                                       transition={{
//                                         duration: 2,
//                                         repeat: Infinity,
//                                         ease: "easeInOut",
//                                       }}
//                                     >
//                                       <motion.div
//                                         animate={{
//                                           scale: [1, 1.3, 1],
//                                         }}
//                                         transition={{
//                                           duration: 1.5,
//                                           repeat: Infinity,
//                                           ease: "easeInOut",
//                                         }}
//                                       >
//                                         <ScanFace className="w-8 h-8 text-white" />
//                                       </motion.div>
//                                     </motion.div>
//                                   </motion.div>

//                                   {/* Optional: Small floating icons around the edges */}
//                                   <motion.div
//                                     className="absolute w-8 h-8 flex items-center justify-center"
//                                     initial={{ scale: 0, opacity: 0 }}
//                                     animate={{
//                                       scale: [0, 1, 1, 0],
//                                       opacity: [0, 1, 1, 0],
//                                     }}
//                                     transition={{
//                                       duration: 3,
//                                       repeat: Infinity,
//                                       times: [0, 0.2, 0.8, 1],
//                                     }}
//                                     style={{ left: "15%", top: "20%" }}
//                                   >
//                                     <ScanFace className="w-4 h-4 text-gray-600" />
//                                   </motion.div>
//                                   <motion.div
//                                     className="absolute w-8 h-8 flex items-center justify-center"
//                                     initial={{ scale: 0, opacity: 0 }}
//                                     animate={{
//                                       scale: [0, 1, 1, 0],
//                                       opacity: [0, 1, 1, 0],
//                                     }}
//                                     transition={{
//                                       duration: 3,
//                                       repeat: Infinity,
//                                       delay: 1,
//                                       times: [0, 0.2, 0.8, 1],
//                                     }}
//                                     style={{ left: "70%", top: "25%" }}
//                                   >
//                                     <ScanFace className="w-4 h-4 text-gray-600" />
//                                   </motion.div>
//                                 </>
//                               )}

//                               {currentStage === 2 && isProcessing && (
//                                 <motion.div
//                                   className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 rounded-full"
//                                   animate={{ opacity: [0.2, 0.4, 0.2] }}
//                                   transition={{ duration: 2, repeat: Infinity }}
//                                 />
//                               )}
//                               {currentStage === 3 && isProcessing && (
//                                 <motion.div
//                                   className="absolute inset-0 border-4 border-cyan-400/50 rounded-full"
//                                   initial={{ scale: 1.1 }}
//                                   animate={{ scale: 1 }}
//                                 />
//                               )}
//                               {currentStage === 4 && isProcessing && (
//                                 <motion.div
//                                   className="absolute inset-0 bg-white/20 rounded-full"
//                                   animate={{ opacity: [0.1, 0.3, 0.1] }}
//                                   transition={{ duration: 2, repeat: Infinity }}
//                                 />
//                               )}
//                             </motion.div>
//                           )}
//                         </div>
//                       </motion.div>

//                       <motion.div
//                         initial={{ opacity: 0 }}
//                         animate={isInView ? { opacity: 1 } : {}}
//                         transition={{ delay: index * 0.2 + 0.8 }}
//                         whileHover={{ y: -8, scale: 1.05 }}
//                         className={`glass-morphism rounded-2xl p-6 transition-all duration-300 shadow-xl mt-20 ${
//                           isActive
//                             ? "ring-2 ring-primary/50 bg-primary/5"
//                             : "hover:bg-card/70"
//                         }`}
//                       >
//                         <div
//                           className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 ${
//                             milestone.status === "Now"
//                               ? "bg-primary text-primary-foreground glow-cyan"
//                               : "bg-muted text-muted-foreground"
//                           }`}
//                         >
//                           {milestone.status}
//                         </div>
//                         <h3 className="text-lg font-bold mb-2 text-foreground">
//                           {milestone.title}
//                         </h3>
//                         <p className="text-sm text-muted-foreground leading-relaxed">
//                           {milestone.description}
//                         </p>

//                         {isActive && isProcessing && (
//                           <motion.div
//                             className="mt-3 w-full bg-primary/20 rounded-full h-1"
//                             initial={{ width: 0 }}
//                             animate={{ width: "100%" }}
//                             transition={{ duration: 3, ease: "linear" }}
//                           >
//                             <div className="h-1 bg-primary rounded-full" />
//                           </motion.div>
//                         )}
//                       </motion.div>
//                     </motion.div>

//                     {index < milestones.length - 1 && (
//                       <div className="absolute top-10 left-[60%] w-[80%] h-1 flex items-center justify-center">
//                         <motion.div
//                           initial={{ scaleX: 0 }}
//                           animate={isInView ? { scaleX: 1 } : {}}
//                           transition={{
//                             delay: index * 0.2 + 1,
//                             duration: 0.8,
//                             ease: "easeInOut",
//                           }}
//                           className="w-full h-0.5 bg-gradient-to-r from-primary/40 via-primary/60 to-primary/40 origin-left"
//                           style={{
//                             backgroundImage:
//                               "repeating-linear-gradient(90deg, hsl(var(--primary) / 0.4) 0px, hsl(var(--primary) / 0.4) 8px, transparent 8px, transparent 16px)",
//                           }}
//                         />

//                         <motion.div
//                           initial={{ x: "-100%", opacity: 0 }}
//                           animate={
//                             isInView
//                               ? {
//                                   x: "100%",
//                                   opacity: [0, 1, 1, 0],
//                                 }
//                               : {}
//                           }
//                           transition={{
//                             delay: index * 0.2 + 1.2,
//                             duration: 2,
//                             repeat: Infinity,
//                             repeatDelay: 3,
//                             ease: "linear",
//                           }}
//                           className="absolute"
//                         >
//                           <Footprints className="w-6 h-6 text-primary rotate-90" />
//                         </motion.div>
//                       </div>
//                     )}
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//           <div className="lg:hidden space-y-8 pt-48">
//             {milestones.map((milestone, index) => {
//               const Icon = milestone.icon;
//               const glowClass =
//                 milestone.color === "cyan"
//                   ? "glow-cyan"
//                   : milestone.color === "blue"
//                   ? "glow-blue"
//                   : "glow-purple";
//               const isActive = currentStage === index;

//               return (
//                 <motion.div
//                   key={milestone.title}
//                   initial={{ opacity: 0, x: -50 }}
//                   animate={isInView ? { opacity: 1, x: 0 } : {}}
//                   transition={{
//                     delay: index * 0.15,
//                     duration: 0.6,
//                   }}
//                   className="relative flex gap-6"
//                 >
//                   <div className="flex flex-col items-center">
//                     <motion.div
//                       animate={
//                         isInView && isActive && isProcessing
//                           ? {
//                               scale: [1, 1.1, 1],
//                               opacity: [0.8, 1, 0.8],
//                             }
//                           : {}
//                       }
//                       transition={{
//                         delay: index * 0.15 + 0.5,
//                         duration: 2,
//                         repeat: isActive && isProcessing ? Infinity : 0,
//                       }}
//                     >
//                       <div
//                         className={`w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center ${glowClass} border-4 ${
//                           isActive ? "border-primary/80" : "border-primary/40"
//                         } transition-all duration-300 relative overflow-hidden`}
//                       >
//                         {(!showImage || !isActive) && (
//                           <Icon
//                             className={`w-8 h-8 ${
//                               isActive ? "text-primary" : "text-primary/70"
//                             } transition-all duration-300`}
//                           />
//                         )}
//                         {showImage && isActive && (
//                           <motion.div
//                             initial={{ scale: 0, opacity: 0, y: -50 }}
//                             animate={{ scale: 1, opacity: 1, y: 0 }}
//                             transition={{
//                               type: "spring",
//                               stiffness: 200,
//                               damping: 15,
//                               delay: index === 0 ? 0.2 : 0,
//                             }}
//                             className="absolute inset-0 rounded-full overflow-hidden"
//                           >
//                             <motion.img
//                               src={SAMPLE_IMAGE}
//                               alt="Processing Demo"
//                               className="w-full h-full object-cover"
//                               animate={{
//                                 scale:
//                                   currentStage === 1 && isProcessing
//                                     ? [1, 1.2, 1]
//                                     : 1,
//                                 filter:
//                                   currentStage === 2 && isProcessing
//                                     ? [
//                                         "brightness(1) contrast(1)",
//                                         "brightness(1.2) contrast(1.3)",
//                                         "brightness(1) contrast(1.1)",
//                                       ]
//                                     : "none",
//                               }}
//                               transition={{
//                                 duration: currentStage === 1 ? 2 : 0.5,
//                                 repeat:
//                                   (currentStage === 1 || currentStage === 2) &&
//                                   isProcessing
//                                     ? Infinity
//                                     : 0,
//                               }}
//                             />

//                             {currentStage === 0 && isProcessing && (
//                               <motion.div
//                                 className="absolute inset-0 bg-blue-500/30 flex items-center justify-center rounded-full"
//                                 animate={{ opacity: [0.3, 0.6, 0.3] }}
//                                 transition={{ duration: 1.5, repeat: Infinity }}
//                               >
//                                 <motion.div
//                                   animate={{
//                                     scale: [1, 1.2, 1],
//                                     rotate: [0, 180, 360],
//                                   }}
//                                   transition={{ duration: 2, repeat: Infinity }}
//                                 >
//                                   <Upload className="w-4 h-4 text-white" />
//                                 </motion.div>
//                               </motion.div>
//                             )}

//                             {currentStage === 1 && isProcessing && (
//                               <motion.div
//                                 className="absolute inset-0 bg-purple-500/10 rounded-full"
//                                 animate={{ opacity: [0.1, 0.3, 0.1] }}
//                                 transition={{ duration: 2, repeat: Infinity }}
//                               />
//                             )}

//                             {currentStage === 2 && isProcessing && (
//                               <motion.div
//                                 className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 rounded-full"
//                                 animate={{ opacity: [0.2, 0.4, 0.2] }}
//                                 transition={{ duration: 2, repeat: Infinity }}
//                               />
//                             )}
//                           </motion.div>
//                         )}
//                       </div>
//                     </motion.div>

//                     {index < milestones.length - 1 && (
//                       <div className="relative w-1 flex-1 my-4">
//                         <motion.div
//                           initial={{ scaleY: 0 }}
//                           animate={isInView ? { scaleY: 1 } : {}}
//                           transition={{
//                             delay: index * 0.15 + 0.6,
//                             duration: 0.6,
//                             ease: "easeInOut",
//                           }}
//                           className="w-full h-full origin-top"
//                           style={{
//                             backgroundImage:
//                               "repeating-linear-gradient(180deg, hsl(var(--primary) / 0.4) 0px, hsl(var(--primary) / 0.4) 8px, transparent 8px, transparent 16px)",
//                           }}
//                         />

//                         <motion.div
//                           initial={{ y: "-100%", opacity: 0 }}
//                           animate={
//                             isInView
//                               ? {
//                                   y: "200%",
//                                   opacity: [0, 1, 1, 0],
//                                 }
//                               : {}
//                           }
//                           transition={{
//                             delay: index * 0.15 + 0.8,
//                             duration: 2,
//                             repeat: Infinity,
//                             repeatDelay: 2,
//                             ease: "linear",
//                           }}
//                           className="absolute left-1/2 -translate-x-1/2"
//                         >
//                           <Footprints className="w-5 h-5 text-primary" />
//                         </motion.div>
//                       </div>
//                     )}
//                   </div>

//                   <motion.div
//                     whileHover={{ x: 8, scale: 1.02 }}
//                     className={`glass-morphism rounded-2xl p-5 flex-1 transition-all duration-300 shadow-xl ${
//                       isActive
//                         ? "ring-2 ring-primary/50 bg-primary/5"
//                         : "hover:bg-card/70"
//                     }`}
//                   >
//                     <div
//                       className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 ${
//                         milestone.status === "Now"
//                           ? "bg-primary text-primary-foreground glow-cyan"
//                           : "bg-muted text-muted-foreground"
//                       }`}
//                     >
//                       {milestone.status}
//                     </div>
//                     <h3 className="text-lg font-bold mb-2 text-foreground">
//                       {milestone.title}
//                     </h3>
//                     <p className="text-sm text-muted-foreground leading-relaxed">
//                       {milestone.description}
//                     </p>

//                     {isActive && isProcessing && (
//                       <motion.div
//                         className="mt-3 w-full bg-primary/20 rounded-full h-1"
//                         initial={{ width: 0 }}
//                         animate={{ width: "100%" }}
//                         transition={{ duration: 3, ease: "linear" }}
//                       >
//                         <div className="h-1 bg-primary rounded-full" />
//                       </motion.div>
//                     )}
//                   </motion.div>
//                 </motion.div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  Sparkles,
  UserCircle,
  Cloud,
  Footprints,
  Upload,
  ScanFace,
  Wand2,
} from "lucide-react";
import portrait15 from "../assets/portraits/portrait-3.jpeg";

const milestones = [
  {
    title: "Photo Upload",
    status: "Now",
    description: "Uploading your photo to our system",
    icon: Upload,
    color: "cyan",
    process: "uploading",
  },
  {
    title: "Face Recognition",
    status: "Next",
    description: "AI-powered smart tagging",
    icon: ScanFace,
    color: "blue",
    process: "faceDetection",
  },
  {
    title: "AI Enhancement",
    status: "Soon",
    description: "Professional editing tools",
    icon: Wand2,
    color: "purple",
    process: "enhancement",
  },
  {
    title: "User Profiles",
    status: "Coming",
    description: "Personal photo galleries",
    icon: UserCircle,
    color: "cyan",
    process: "profiling",
  },
  {
    title: "Cloud Storage",
    status: "Future",
    description: "Premium tools & storage",
    icon: Cloud,
    color: "blue",
    process: "cloudStorage",
  },
];

const SAMPLE_IMAGE = portrait15;

export function Roadmap() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [currentStage, setCurrentStage] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    if (!isInView) return;

    const animateStages = async () => {
      setShowImage(true);

      for (let stage = 0; stage < milestones.length; stage++) {
        setCurrentStage(stage);
        setIsProcessing(true);

        await new Promise((resolve) => setTimeout(resolve, 3000));
        setIsProcessing(false);

        if (stage < milestones.length - 1) {
          await new Promise((resolve) => setTimeout(resolve, 800));
        }
      }

      // Loop
      setTimeout(() => {
        if (isInView) animateStages();
      }, 2000);
    };

    animateStages();
  }, [isInView]);

  return (
    <section
      ref={ref}
      className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/10 to-background" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
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
            <div className="flex justify-between items-start gap-4 relative px-8 pt-40">
              {milestones.map((milestone, index) => {
                const Icon = milestone.icon;
                const glowClass =
                  milestone.color === "cyan"
                    ? "glow-cyan"
                    : milestone.color === "blue"
                    ? "glow-blue"
                    : "glow-purple";
                const isActive = currentStage === index;

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
                          isInView && isActive && isProcessing
                            ? {
                                scale: [1, 1.1, 1],
                                opacity: [0.8, 1, 0.8],
                              }
                            : {}
                        }
                        transition={{
                          duration: 2,
                          repeat: isActive && isProcessing ? Infinity : 0,
                        }}
                      >
                        <div
                          className={`w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center ${glowClass} border-4 ${
                            isActive ? "border-primary/80" : "border-primary/40"
                          } transition-all duration-300 relative overflow-hidden`}
                        >
                          {(!showImage || !isActive) && (
                            <Icon
                              className={`w-10 h-10 ${
                                isActive ? "text-primary" : "text-primary/70"
                              } transition-all duration-300`}
                            />
                          )}
                          {showImage && isActive && (
                            <motion.div
                              initial={{ scale: 0, opacity: 0, y: -50 }}
                              animate={{ scale: 1, opacity: 1, y: 0 }}
                              transition={{
                                type: "spring",
                                stiffness: 200,
                                damping: 15,
                                delay: index === 0 ? 0.2 : 0,
                              }}
                              className="absolute inset-0 rounded-full overflow-hidden"
                            >
                              <motion.img
                                src={SAMPLE_IMAGE}
                                alt="Processing Demo"
                                className="w-full h-full object-cover"
                                style={{
                                  opacity: isProcessing ? 0.8 : 1,
                                }}
                              />

                              {currentStage === 0 && isProcessing && (
                                <motion.div className="absolute inset-0 flex items-center justify-center rounded-full">
                                  <motion.div
                                    className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
                                    animate={{
                                      scale: [1, 1.1, 1],
                                    }}
                                    transition={{
                                      duration: 1.5,
                                      repeat: Infinity,
                                      ease: "easeInOut",
                                    }}
                                  >
                                    <motion.div
                                      animate={{
                                        scale: [1, 1.2, 1],
                                      }}
                                      transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                      }}
                                    >
                                      <Upload className="w-7 h-7 text-white" />
                                    </motion.div>
                                  </motion.div>
                                </motion.div>
                              )}

                              {currentStage === 1 && isProcessing && (
                                <>
                                  {/* Main centered face recognition icon */}
                                  <motion.div className="absolute inset-0 flex items-center justify-center rounded-full">
                                    <motion.div
                                      className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg"
                                      animate={{
                                        scale: [1, 1.2, 1],
                                      }}
                                      transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                      }}
                                    >
                                      <motion.div
                                        animate={{
                                          scale: [1, 1.3, 1],
                                        }}
                                        transition={{
                                          duration: 1.5,
                                          repeat: Infinity,
                                          ease: "easeInOut",
                                        }}
                                      >
                                        <ScanFace className="w-8 h-8 text-white" />
                                      </motion.div>
                                    </motion.div>
                                  </motion.div>
                                </>
                              )}

                              {currentStage === 2 && isProcessing && (
                                <>
                                  {/* Base image with reduced opacity */}
                                  <motion.img
                                    src={SAMPLE_IMAGE}
                                    alt="Original"
                                    className="w-full h-full object-cover"
                                    style={{
                                      opacity: 0.3,
                                    }}
                                  />

                                  {/* Enhancement icon - appears first then disappears */}
                                  <motion.div className="absolute inset-0 flex items-center justify-center rounded-full">
                                    <motion.div
                                      className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
                                      initial={{ scale: 0, opacity: 0 }}
                                      animate={{
                                        scale: [0, 1, 1, 0],
                                        opacity: [0, 1, 1, 0],
                                      }}
                                      transition={{
                                        duration: 2,
                                        times: [0, 0.3, 0.7, 1],
                                        ease: "easeInOut",
                                      }}
                                    >
                                      <motion.div
                                        animate={{
                                          scale: [1, 1.2, 1],
                                          rotate: [0, 10, -10, 0],
                                        }}
                                        transition={{
                                          duration: 2,
                                          repeat: Infinity,
                                          ease: "easeInOut",
                                        }}
                                      >
                                        <Wand2 className="w-7 h-7 text-purple-600" />
                                      </motion.div>
                                    </motion.div>
                                  </motion.div>

                                  {/* Enhanced version sliding in after icon disappears */}
                                  <motion.div
                                    className="absolute inset-0 rounded-full overflow-hidden"
                                    initial={{ x: "100%" }}
                                    animate={{ x: 0 }}
                                    transition={{
                                      delay: 2, // Wait for icon to disappear first
                                      duration: 1.2,
                                      ease: "easeOut",
                                    }}
                                  >
                                    <motion.img
                                      src={SAMPLE_IMAGE}
                                      alt="Enhanced"
                                      className="w-full h-full object-cover"
                                      style={{
                                        filter:
                                          "brightness(1.2) contrast(1.3) saturate(1.4)",
                                      }}
                                    />
                                  </motion.div>

                                  {/* Floating sparkles - appear with enhanced image */}
                                  <motion.div
                                    className="absolute w-4 h-4"
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{
                                      scale: [0, 1, 0],
                                      opacity: [0, 1, 0],
                                    }}
                                    transition={{
                                      duration: 2,
                                      repeat: Infinity,
                                      delay: 2, // Start after enhanced image appears
                                    }}
                                    style={{ left: "25%", top: "30%" }}
                                  >
                                    <Sparkles className="w-4 h-4 text-yellow-400" />
                                  </motion.div>
                                  <motion.div
                                    className="absolute w-3 h-3"
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{
                                      scale: [0, 1, 0],
                                      opacity: [0, 1, 0],
                                    }}
                                    transition={{
                                      duration: 2,
                                      repeat: Infinity,
                                      delay: 2.5, // Slightly later
                                    }}
                                    style={{ left: "65%", top: "60%" }}
                                  >
                                    <Sparkles className="w-3 h-3 text-cyan-400" />
                                  </motion.div>
                                </>
                              )}

                              {currentStage === 3 && isProcessing && (
                                <motion.div className="absolute inset-0 flex items-center justify-center rounded-full">
                                  <motion.div
                                    className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
                                    animate={{
                                      scale: [1, 1.1, 1],
                                    }}
                                    transition={{
                                      duration: 1.5,
                                      repeat: Infinity,
                                      ease: "easeInOut",
                                    }}
                                  >
                                    <motion.div
                                      animate={{
                                        scale: [1, 1.2, 1],
                                      }}
                                      transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                      }}
                                    >
                                      <UserCircle className="w-7 h-7 text-cyan-600" />
                                    </motion.div>
                                  </motion.div>
                                </motion.div>
                              )}

                              {currentStage === 4 && isProcessing && (
                                <>
                                  {/* Base image that moves up and disappears */}
                                  <motion.img
                                    src={SAMPLE_IMAGE}
                                    alt="Original"
                                    className="w-full h-full object-cover"
                                    initial={{ opacity: 1, y: 0, scale: 1 }}
                                    animate={{
                                      opacity: [1, 0.8, 0],
                                      y: [0, -20, -100],
                                      scale: [1, 0.9, 0.8],
                                    }}
                                    transition={{
                                      duration: 1.5,
                                      times: [0, 0.5, 1],
                                      ease: "easeInOut",
                                    }}
                                  />

                                  {/* Cloud upload effect - starts immediately */}
                                  <motion.div
                                    className="absolute inset-0 flex items-center justify-center"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: [0, 1, 1, 0] }}
                                    transition={{
                                      delay: 0.5,
                                      duration: 2,
                                      times: [0, 0.2, 0.8, 1],
                                    }}
                                  >
                                    {/* Main cloud icon */}
                                    <motion.div
                                      className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg border border-blue-200"
                                      animate={{
                                        scale: [1, 1.05, 1],
                                        y: [0, -2, 0],
                                      }}
                                      transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                      }}
                                    >
                                      <Cloud className="w-8 h-8 text-blue-600" />
                                    </motion.div>

                                    {/* Uploading particles moving from bottom to cloud */}
                                    <motion.div
                                      className="absolute w-3 h-3 bg-blue-500 rounded-full"
                                      initial={{
                                        scale: 0,
                                        opacity: 0,
                                        y: 30,
                                        x: -15,
                                      }}
                                      animate={{
                                        scale: [0, 1, 0],
                                        opacity: [0, 1, 0],
                                        y: [30, -20, -40],
                                      }}
                                      transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        delay: 0.3,
                                      }}
                                    />

                                    <motion.div
                                      className="absolute w-2 h-2 bg-cyan-400 rounded-full"
                                      initial={{
                                        scale: 0,
                                        opacity: 0,
                                        y: 30,
                                        x: 0,
                                      }}
                                      animate={{
                                        scale: [0, 1, 0],
                                        opacity: [0, 1, 0],
                                        y: [30, -15, -35],
                                      }}
                                      transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        delay: 0.6,
                                      }}
                                    />

                                    <motion.div
                                      className="absolute w-2 h-2 bg-blue-300 rounded-full"
                                      initial={{
                                        scale: 0,
                                        opacity: 0,
                                        y: 30,
                                        x: 15,
                                      }}
                                      animate={{
                                        scale: [0, 1, 0],
                                        opacity: [0, 1, 0],
                                        y: [30, -25, -45],
                                      }}
                                      transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        delay: 0.9,
                                      }}
                                    />
                                  </motion.div>

                                  {/* Success checkmark appears much earlier */}
                                  <motion.div
                                    className="absolute inset-0 flex items-center justify-center"
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{
                                      scale: [0, 1.2, 1],
                                      opacity: [0, 1, 1],
                                    }}
                                    transition={{
                                      delay: 2, // Much earlier - appears at 2 seconds
                                      duration: 0.6,
                                      times: [0, 0.7, 1],
                                    }}
                                  >
                                    <motion.div
                                      className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
                                      animate={{
                                        scale: [1, 1.1, 1],
                                      }}
                                      transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                      }}
                                    >
                                      {/* Simple tick icon */}
                                      <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{
                                          delay: 2.1,
                                          duration: 0.4,
                                          type: "spring",
                                          stiffness: 300,
                                        }}
                                      >
                                        <svg
                                          className="w-7 h-7 text-white"
                                          fill="none"
                                          stroke="currentColor"
                                          viewBox="0 0 24 24"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={3}
                                            d="M5 13l4 4L19 7"
                                          />
                                        </svg>
                                      </motion.div>
                                    </motion.div>
                                  </motion.div>
                                </>
                              )}
                            </motion.div>
                          )}
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ delay: index * 0.2 + 0.8 }}
                        whileHover={{ y: -8, scale: 1.05 }}
                        className={`glass-morphism rounded-2xl p-6 transition-all duration-300 shadow-xl mt-20 ${
                          isActive
                            ? "ring-2 ring-primary/50 bg-primary/5"
                            : "hover:bg-card/70"
                        }`}
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

                        {isActive && isProcessing && (
                          <motion.div
                            className="mt-3 w-full bg-primary/20 rounded-full h-1"
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 3, ease: "linear" }}
                          >
                            <div className="h-1 bg-primary rounded-full" />
                          </motion.div>
                        )}
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
          <div className="lg:hidden space-y-8 pt-48">
            {milestones.map((milestone, index) => {
              const Icon = milestone.icon;
              const glowClass =
                milestone.color === "cyan"
                  ? "glow-cyan"
                  : milestone.color === "blue"
                  ? "glow-blue"
                  : "glow-purple";
              const isActive = currentStage === index;

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
                        isInView && isActive && isProcessing
                          ? {
                              scale: [1, 1.1, 1],
                              opacity: [0.8, 1, 0.8],
                            }
                          : {}
                      }
                      transition={{
                        delay: index * 0.15 + 0.5,
                        duration: 2,
                        repeat: isActive && isProcessing ? Infinity : 0,
                      }}
                    >
                      <div
                        className={`w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center ${glowClass} border-4 ${
                          isActive ? "border-primary/80" : "border-primary/40"
                        } transition-all duration-300 relative overflow-hidden`}
                      >
                        {(!showImage || !isActive) && (
                          <Icon
                            className={`w-8 h-8 ${
                              isActive ? "text-primary" : "text-primary/70"
                            } transition-all duration-300`}
                          />
                        )}
                        {showImage && isActive && (
                          <motion.div
                            initial={{ scale: 0, opacity: 0, y: -50 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            transition={{
                              type: "spring",
                              stiffness: 200,
                              damping: 15,
                              delay: index === 0 ? 0.2 : 0,
                            }}
                            className="absolute inset-0 rounded-full overflow-hidden"
                          >
                            {/* Base image with reduced opacity for mobile */}
                            <motion.img
                              src={SAMPLE_IMAGE}
                              alt="Processing Demo"
                              className="w-full h-full object-cover"
                              style={{
                                opacity: isProcessing ? 0.3 : 1,
                              }}
                            />

                            {currentStage === 0 && isProcessing && (
                              <motion.div className="absolute inset-0 flex items-center justify-center rounded-full">
                                <motion.div
                                  className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg"
                                  animate={{
                                    scale: [1, 1.1, 1],
                                  }}
                                  transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                  }}
                                >
                                  <motion.div
                                    animate={{
                                      scale: [1, 1.2, 1],
                                    }}
                                    transition={{
                                      duration: 2,
                                      repeat: Infinity,
                                      ease: "easeInOut",
                                    }}
                                  >
                                    <Upload className="w-6 h-6 text-gray-800" />
                                  </motion.div>
                                </motion.div>
                              </motion.div>
                            )}

                            {currentStage === 1 && isProcessing && (
                              <motion.div className="absolute inset-0 flex items-center justify-center rounded-full">
                                <motion.div
                                  className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg"
                                  animate={{
                                    scale: [1, 1.2, 1],
                                  }}
                                  transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                  }}
                                >
                                  <motion.div
                                    animate={{
                                      scale: [1, 1.3, 1],
                                    }}
                                    transition={{
                                      duration: 1.5,
                                      repeat: Infinity,
                                      ease: "easeInOut",
                                    }}
                                  >
                                    <ScanFace className="w-6 h-6 text-gray-800" />
                                  </motion.div>
                                </motion.div>
                              </motion.div>
                            )}

                            {currentStage === 2 && isProcessing && (
                              <>
                                <motion.div
                                  className="absolute inset-0 rounded-full overflow-hidden"
                                  initial={{ x: "100%" }}
                                  animate={{ x: 0 }}
                                  transition={{
                                    duration: 1.5,
                                    ease: "easeOut",
                                  }}
                                >
                                  <motion.img
                                    src={SAMPLE_IMAGE}
                                    alt="Enhanced"
                                    className="w-full h-full object-cover"
                                    style={{
                                      filter:
                                        "brightness(1.2) contrast(1.3) saturate(1.4)",
                                    }}
                                  />
                                </motion.div>
                                <motion.div className="absolute inset-0 flex items-center justify-center rounded-full">
                                  <motion.div
                                    className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg"
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{
                                      delay: 0.8,
                                      duration: 0.6,
                                      type: "spring",
                                    }}
                                  >
                                    <motion.div
                                      animate={{
                                        scale: [1, 1.2, 1],
                                      }}
                                      transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                      }}
                                    >
                                      <Wand2 className="w-6 h-6 text-purple-600" />
                                    </motion.div>
                                  </motion.div>
                                </motion.div>
                              </>
                            )}

                            {currentStage === 3 && isProcessing && (
                              <motion.div className="absolute inset-0 flex items-center justify-center rounded-full">
                                <motion.div
                                  className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg"
                                  animate={{
                                    scale: [1, 1.1, 1],
                                  }}
                                  transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                  }}
                                >
                                  <motion.div
                                    animate={{
                                      scale: [1, 1.2, 1],
                                    }}
                                    transition={{
                                      duration: 2,
                                      repeat: Infinity,
                                      ease: "easeInOut",
                                    }}
                                  >
                                    <UserCircle className="w-6 h-6 text-cyan-600" />
                                  </motion.div>
                                </motion.div>
                              </motion.div>
                            )}

                            {currentStage === 4 && isProcessing && (
                              <motion.div className="absolute inset-0 flex items-center justify-center rounded-full">
                                <motion.div
                                  className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg"
                                  animate={{
                                    scale: [1, 1.1, 1],
                                  }}
                                  transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                  }}
                                >
                                  <motion.div
                                    animate={{
                                      scale: [1, 1.2, 1],
                                    }}
                                    transition={{
                                      duration: 2,
                                      repeat: Infinity,
                                      ease: "easeInOut",
                                    }}
                                  >
                                    <Cloud className="w-6 h-6 text-blue-600" />
                                  </motion.div>
                                </motion.div>
                              </motion.div>
                            )}
                          </motion.div>
                        )}
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
                    className={`glass-morphism rounded-2xl p-5 flex-1 transition-all duration-300 shadow-xl ${
                      isActive
                        ? "ring-2 ring-primary/50 bg-primary/5"
                        : "hover:bg-card/70"
                    }`}
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

                    {isActive && isProcessing && (
                      <motion.div
                        className="mt-3 w-full bg-primary/20 rounded-full h-1"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 3, ease: "linear" }}
                      >
                        <div className="h-1 bg-primary rounded-full" />
                      </motion.div>
                    )}
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
