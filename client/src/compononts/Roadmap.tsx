// import { motion, useInView } from "framer-motion";
// import { useRef, useState, useEffect } from "react";
// import {
//   Sparkles,
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

// const ProcessingAnimation = ({ stage, isProcessing, enhancedImage }) => {
//   const containerSize = "w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20";
//   const iconSize = {
//     container: "w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14",
//     inner: "w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8",
//   };
//   const cloudSize = "w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16";
//   const cloudIconSize = "w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8";

//   if (!isProcessing) return null;

//   const displayImage =
//     stage >= 2 && enhancedImage ? enhancedImage : SAMPLE_IMAGE;

//   return (
//     <>
//       {stage === 0 && (
//         <motion.div className="absolute inset-0 flex items-center justify-center rounded-full">
//           <motion.div
//             className={`rounded-full flex items-center justify-center shadow-lg ${iconSize.container}`}
//             animate={{
//               scale: [1, 1.1, 1],
//             }}
//             transition={{
//               duration: 1.5,
//               repeat: Infinity,
//               ease: "easeInOut",
//             }}
//           >
//             <motion.div
//               animate={{
//                 scale: [1, 1.2, 1],
//               }}
//               transition={{
//                 duration: 2,
//                 repeat: Infinity,
//                 ease: "easeInOut",
//               }}
//             >
//               <Upload className={`text-white ${iconSize.inner}`} />
//             </motion.div>
//           </motion.div>
//         </motion.div>
//       )}

//       {stage === 1 && (
//         <motion.div className="absolute inset-0 flex items-center justify-center rounded-full">
//           <motion.div
//             className={`rounded-full flex items-center justify-center shadow-lg ${iconSize.container}`}
//             animate={{
//               scale: [1, 1.2, 1],
//             }}
//             transition={{
//               duration: 2,
//               repeat: Infinity,
//               ease: "easeInOut",
//             }}
//           >
//             <motion.div
//               animate={{
//                 scale: [1, 1.3, 1],
//               }}
//               transition={{
//                 duration: 1.5,
//                 repeat: Infinity,
//                 ease: "easeInOut",
//               }}
//             >
//               <ScanFace className={`text-white ${iconSize.inner}`} />
//             </motion.div>
//           </motion.div>
//         </motion.div>
//       )}

//       {stage === 2 && (
//         <>
//           {/* Original image that fades out completely */}
//           <motion.img
//             src={SAMPLE_IMAGE}
//             alt="Original"
//             className="w-full h-full object-cover"
//             initial={{ opacity: 0.3 }}
//             animate={{ opacity: [0.3, 0.1, 0] }}
//             transition={{
//               duration: 2,
//               times: [0, 0.5, 1],
//             }}
//           />

//           {/* Magic wand animation */}
//           <motion.div className="absolute inset-0 flex items-center justify-center rounded-full">
//             <motion.div
//               className={`rounded-full flex items-center justify-center shadow-lg ${iconSize.container}`}
//               initial={{ scale: 0, opacity: 0 }}
//               animate={{
//                 scale: [0, 1, 1, 0],
//                 opacity: [0, 1, 1, 0],
//               }}
//               transition={{
//                 duration: 2,
//                 times: [0, 0.3, 0.7, 1],
//                 ease: "easeInOut",
//               }}
//             >
//               <motion.div
//                 animate={{
//                   scale: [1, 1.2, 1],
//                   rotate: [0, 10, -10, 0],
//                 }}
//                 transition={{
//                   duration: 2,
//                   repeat: Infinity,
//                   ease: "easeInOut",
//                 }}
//               >
//                 <Wand2 className={`text-purple-600 ${iconSize.inner}`} />
//               </motion.div>
//             </motion.div>
//           </motion.div>

//           {/* Enhanced image - SIMPLIFIED VERSION that stays permanently */}
//           <motion.div
//             className="absolute inset-0 rounded-full overflow-hidden"
//             initial={{ scale: 0.8, opacity: 0 }}
//             animate={{
//               scale: 1,
//               opacity: 1,
//             }}
//             transition={{
//               delay: 1.5,
//               duration: 1,
//               ease: "easeOut",
//             }}
//           >
//             <motion.img
//               src={SAMPLE_IMAGE}
//               alt="Enhanced"
//               className="w-full h-full object-cover"
//               style={{
//                 filter: "brightness(1.2) contrast(1.3) saturate(1.4)",
//               }}
//             />
//           </motion.div>

//           {/* Sparkles effects - only show during enhancement phase */}
//           <motion.div
//             className="absolute w-3 h-3 sm:w-4 sm:h-4"
//             initial={{ scale: 0, opacity: 0 }}
//             animate={{
//               scale: [0, 1, 0],
//               opacity: [0, 1, 0],
//             }}
//             transition={{
//               duration: 1.5,
//               times: [0, 0.5, 1],
//               delay: 1.8,
//             }}
//             style={{ left: "25%", top: "30%" }}
//           >
//             <Sparkles className="w-full h-full text-yellow-400" />
//           </motion.div>
//           <motion.div
//             className="absolute w-2 h-2 sm:w-3 sm:h-3"
//             initial={{ scale: 0, opacity: 0 }}
//             animate={{
//               scale: [0, 1, 0],
//               opacity: [0, 1, 0],
//             }}
//             transition={{
//               duration: 1.5,
//               times: [0, 0.5, 1],
//               delay: 2.2,
//             }}
//             style={{ left: "65%", top: "60%" }}
//           >
//             <Sparkles className="w-full h-full text-cyan-400" />
//           </motion.div>
//         </>
//       )}

//       {stage === 3 && (
//         <motion.div className="absolute inset-0 flex items-center justify-center rounded-full">
//           <motion.img
//             src={displayImage}
//             alt="Enhanced Profile"
//             className="w-full h-full object-cover rounded-full"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 0.7 }}
//             transition={{ duration: 0.5 }}
//           />

//           <motion.div
//             className={`absolute rounded-full bg-white/90 flex items-center justify-center shadow-lg ${iconSize.container}`}
//             animate={{
//               scale: [1, 1.1, 1],
//             }}
//             transition={{
//               duration: 1.5,
//               repeat: Infinity,
//               ease: "easeInOut",
//             }}
//           >
//             <motion.div
//               animate={{
//                 scale: [1, 1.2, 1],
//               }}
//               transition={{
//                 duration: 2,
//                 repeat: Infinity,
//                 ease: "easeInOut",
//               }}
//             >
//               <UserCircle className={`text-cyan-600 ${iconSize.inner}`} />
//             </motion.div>
//           </motion.div>
//         </motion.div>
//       )}

//       {stage === 4 && (
//         <>
//           <motion.img
//             src={displayImage}
//             alt="Enhanced Cloud"
//             className="w-full h-full object-cover"
//             initial={{ opacity: 1, y: 0, scale: 1 }}
//             animate={{
//               opacity: [1, 0.8, 0],
//               y: [0, -20, -100],
//               scale: [1, 0.9, 0.8],
//             }}
//             transition={{
//               duration: 1.5,
//               times: [0, 0.5, 1],
//               ease: "easeInOut",
//             }}
//           />
//           <motion.div
//             className="absolute inset-0 flex items-center justify-center"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: [0, 1, 1, 0] }}
//             transition={{
//               delay: 0.5,
//               duration: 2,
//               times: [0, 0.2, 0.8, 1],
//             }}
//           >
//             <motion.div
//               className={`bg-white rounded-full flex items-center justify-center shadow-lg border border-blue-200 ${cloudSize}`}
//               animate={{
//                 scale: [1, 1.05, 1],
//                 y: [0, -2, 0],
//               }}
//               transition={{
//                 duration: 1.5,
//                 repeat: Infinity,
//                 ease: "easeInOut",
//               }}
//             >
//               <Cloud className={`text-blue-600 ${cloudIconSize}`} />
//             </motion.div>
//             {[0.3, 0.6, 0.9].map((delay, i) => (
//               <motion.div
//                 key={i}
//                 className="absolute w-2 h-2 sm:w-3 sm:h-3 bg-blue-500 rounded-full"
//                 initial={{
//                   scale: 0,
//                   opacity: 0,
//                   y: 30,
//                   x: i === 0 ? -12 : i === 1 ? 0 : 12,
//                 }}
//                 animate={{
//                   scale: [0, 1, 0],
//                   opacity: [0, 1, 0],
//                   y: [30, -20, -40],
//                 }}
//                 transition={{
//                   duration: 1.5,
//                   repeat: Infinity,
//                   delay,
//                 }}
//               />
//             ))}
//           </motion.div>
//           <motion.div
//             className="absolute inset-0 flex items-center justify-center"
//             initial={{ scale: 0, opacity: 0 }}
//             animate={{
//               scale: [0, 1.2, 1],
//               opacity: [0, 1, 1],
//             }}
//             transition={{
//               delay: 2,
//               duration: 0.6,
//               times: [0, 0.7, 1],
//             }}
//           >
//             <motion.div
//               className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
//               animate={{
//                 scale: [1, 1.1, 1],
//               }}
//               transition={{
//                 duration: 1.5,
//                 repeat: Infinity,
//               }}
//             >
//               <motion.div
//                 initial={{ scale: 0 }}
//                 animate={{ scale: 1 }}
//                 transition={{
//                   delay: 2.1,
//                   duration: 0.4,
//                   type: "spring",
//                   stiffness: 300,
//                 }}
//               >
//                 <svg
//                   className="w-4 h-4 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={3}
//                     d="M5 13l4 4L19 7"
//                   />
//                 </svg>
//               </motion.div>
//             </motion.div>
//           </motion.div>
//         </>
//       )}
//     </>
//   );
// };

// const MilestoneItem = ({
//   milestone,
//   index,
//   isInView,
//   isActive,
//   isProcessing,
//   showImage,
//   totalMilestones,
//   isDesktop,
//   enhancedImage,
// }) => {
//   const Icon = milestone.icon;
//   const glowClass = `glow-${milestone.color}`;

//   const containerSize = "w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20";
//   const iconSize = "w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10";
//   const cardPadding = "p-4 sm:p-5 lg:p-6";

//   const displayImage =
//     index >= 2 && enhancedImage ? enhancedImage : SAMPLE_IMAGE;

//   return (
//     <motion.div
//       initial={{
//         opacity: 0,
//         [isDesktop ? "y" : "x"]: isDesktop ? 50 : -50,
//         scale: 0.8,
//       }}
//       animate={
//         isInView
//           ? {
//               opacity: 1,
//               [isDesktop ? "y" : "x"]: 0,
//               scale: 1,
//             }
//           : {}
//       }
//       transition={{
//         delay: index * (isDesktop ? 0.2 : 0.15) + 0.5,
//         duration: 0.6,
//         type: "spring",
//         stiffness: 100,
//       }}
//       className={`relative ${isDesktop ? "flex-1" : "flex gap-4 sm:gap-6"}`}
//     >
//       {!isDesktop && (
//         <div className="flex flex-col items-center">
//           <motion.div
//             animate={
//               isInView && isActive && isProcessing
//                 ? {
//                     scale: [1, 1.1, 1],
//                     opacity: [0.8, 1, 0.8],
//                   }
//                 : {}
//             }
//             transition={{
//               delay: index * 0.15 + 0.5,
//               duration: 2,
//               repeat: isActive && isProcessing ? Infinity : 0,
//             }}
//           >
//             <div
//               className={`rounded-full bg-primary/20 flex items-center justify-center ${glowClass} border-4 ${
//                 isActive ? "border-primary/80" : "border-primary/40"
//               } transition-all duration-300 relative overflow-hidden ${containerSize}`}
//             >
//               {(!showImage || !isActive) && (
//                 <Icon
//                   className={`${
//                     isActive ? "text-primary" : "text-primary/70"
//                   } transition-all duration-300 ${iconSize}`}
//                 />
//               )}
//               {showImage && isActive && (
//                 <motion.div
//                   initial={{ scale: 0, opacity: 0, y: -50 }}
//                   animate={{ scale: 1, opacity: 1, y: 0 }}
//                   transition={{
//                     type: "spring",
//                     stiffness: 200,
//                     damping: 15,
//                     delay: index === 0 ? 0.2 : 0,
//                   }}
//                   className="absolute inset-0 rounded-full overflow-hidden"
//                 >
//                   <motion.img
//                     src={displayImage}
//                     alt="Processing Demo"
//                     className="w-full h-full object-cover"
//                     style={{
//                       opacity: isProcessing ? 0.3 : 1,
//                     }}
//                   />
//                   <ProcessingAnimation
//                     stage={index}
//                     isProcessing={isProcessing}
//                     enhancedImage={enhancedImage}
//                   />
//                 </motion.div>
//               )}
//             </div>
//           </motion.div>

//           {index < totalMilestones - 1 && (
//             <div className="relative w-1 flex-1 my-4">
//               <motion.div
//                 initial={{ scaleY: 0 }}
//                 animate={isInView ? { scaleY: 1 } : {}}
//                 transition={{
//                   delay: index * 0.15 + 0.6,
//                   duration: 0.6,
//                   ease: "easeInOut",
//                 }}
//                 className="w-full h-full origin-top"
//                 style={{
//                   backgroundImage:
//                     "repeating-linear-gradient(180deg, hsl(var(--primary) / 0.4) 0px, hsl(var(--primary) / 0.4) 8px, transparent 8px, transparent 16px)",
//                 }}
//               />
//               <motion.div
//                 initial={{ y: "-100%", opacity: 0 }}
//                 animate={
//                   isInView
//                     ? {
//                         y: "200%",
//                         opacity: [0, 1, 1, 0],
//                       }
//                     : {}
//                 }
//                 transition={{
//                   delay: index * 0.15 + 0.8,
//                   duration: 2,
//                   repeat: Infinity,
//                   repeatDelay: 2,
//                   ease: "linear",
//                 }}
//                 className="absolute left-1/2 -translate-x-1/2"
//               >
//                 <Footprints className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
//               </motion.div>
//             </div>
//           )}
//         </div>
//       )}

//       {isDesktop && (
//         <motion.div
//           className="relative z-10 mb-6 mx-auto w-fit"
//           animate={
//             isInView && isActive && isProcessing
//               ? {
//                   scale: [1, 1.1, 1],
//                   opacity: [0.8, 1, 0.8],
//                 }
//               : {}
//           }
//           transition={{
//             duration: 2,
//             repeat: isActive && isProcessing ? Infinity : 0,
//           }}
//         >
//           <div
//             className={`rounded-full bg-primary/20 flex items-center justify-center ${glowClass} border-4 ${
//               isActive ? "border-primary/80" : "border-primary/40"
//             } transition-all duration-300 relative overflow-hidden ${containerSize}`}
//           >
//             {(!showImage || !isActive) && (
//               <Icon
//                 className={`${
//                   isActive ? "text-primary" : "text-primary/70"
//                 } transition-all duration-300 ${iconSize}`}
//               />
//             )}
//             {showImage && isActive && (
//               <motion.div
//                 initial={{ scale: 0, opacity: 0, y: -50 }}
//                 animate={{ scale: 1, opacity: 1, y: 0 }}
//                 transition={{
//                   type: "spring",
//                   stiffness: 200,
//                   damping: 15,
//                   delay: index === 0 ? 0.2 : 0,
//                 }}
//                 className="absolute inset-0 rounded-full overflow-hidden"
//               >
//                 <motion.img
//                   src={displayImage}
//                   alt="Processing Demo"
//                   className="w-full h-full object-cover"
//                   style={{
//                     opacity: isProcessing ? 0.8 : 1,
//                   }}
//                 />
//                 <ProcessingAnimation
//                   stage={index}
//                   isProcessing={isProcessing}
//                   enhancedImage={enhancedImage}
//                 />
//               </motion.div>
//             )}
//           </div>
//         </motion.div>
//       )}

//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={isInView ? { opacity: 1 } : {}}
//         transition={{ delay: index * (isDesktop ? 0.2 : 0.15) + 0.8 }}
//         whileHover={{
//           [isDesktop ? "y" : "x"]: isDesktop ? -8 : 8,
//           scale: isDesktop ? 1.05 : 1.02,
//         }}
//         className={`glass-morphism rounded-2xl transition-all duration-300 shadow-xl ${
//           isActive ? "ring-2 ring-primary/50 bg-primary/5" : "hover:bg-card/70"
//         } ${isDesktop ? "mt-20" : "flex-1"} ${cardPadding}`}
//       >
//         <div
//           className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 ${
//             milestone.status === "Now"
//               ? "bg-primary text-primary-foreground glow-cyan"
//               : "bg-muted text-muted-foreground"
//           }`}
//         >
//           {milestone.status}
//         </div>
//         <h3 className="text-base sm:text-lg font-bold mb-2 text-foreground">
//           {milestone.title}
//         </h3>
//         <p className="text-sm text-muted-foreground leading-relaxed">
//           {milestone.description}
//         </p>

//         {isActive && isProcessing && (
//           <motion.div
//             className="mt-3 w-full bg-primary/20 rounded-full h-1"
//             initial={{ width: 0 }}
//             animate={{ width: "100%" }}
//             transition={{ duration: 3, ease: "linear" }}
//           >
//             <div className="h-1 bg-primary rounded-full" />
//           </motion.div>
//         )}
//       </motion.div>

//       {isDesktop && index < totalMilestones - 1 && (
//         <div className="absolute top-10 left-[60%] w-[80%] h-1 flex items-center justify-center">
//           <motion.div
//             initial={{ scaleX: 0 }}
//             animate={isInView ? { scaleX: 1 } : {}}
//             transition={{
//               delay: index * 0.2 + 1,
//               duration: 0.8,
//               ease: "easeInOut",
//             }}
//             className="w-full h-0.5 bg-gradient-to-r from-primary/40 via-primary/60 to-primary/40 origin-left"
//             style={{
//               backgroundImage:
//                 "repeating-linear-gradient(90deg, hsl(var(--primary) / 0.4) 0px, hsl(var(--primary) / 0.4) 8px, transparent 8px, transparent 16px)",
//             }}
//           />
//           <motion.div
//             initial={{ x: "-100%", opacity: 0 }}
//             animate={
//               isInView
//                 ? {
//                     x: "100%",
//                     opacity: [0, 1, 1, 0],
//                   }
//                 : {}
//             }
//             transition={{
//               delay: index * 0.2 + 1.2,
//               duration: 2,
//               repeat: Infinity,
//               repeatDelay: 3,
//               ease: "linear",
//             }}
//             className="absolute"
//           >
//             <Footprints className="w-5 h-5 sm:w-6 sm:h-6 text-primary rotate-90" />
//           </motion.div>
//         </div>
//       )}
//     </motion.div>
//   );
// };

// export function Roadmap() {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, amount: 0.2 });
//   const [currentStage, setCurrentStage] = useState(0);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [showImage, setShowImage] = useState(false);
//   const [enhancedImage, setEnhancedImage] = useState(null);

//   useEffect(() => {
//     if (!isInView) return;

//     const animateStages = async () => {
//       setShowImage(true);

//       for (let stage = 0; stage < milestones.length; stage++) {
//         setCurrentStage(stage);
//         setIsProcessing(true);

//         if (stage === 2) {
//           setEnhancedImage(enhancedImage);
//         }

//         await new Promise((resolve) => setTimeout(resolve, 3000));
//         setIsProcessing(false);

//         if (stage < milestones.length - 1) {
//           await new Promise((resolve) => setTimeout(resolve, 800));
//         }
//       }

//       setTimeout(() => {
//         if (isInView) animateStages();
//       }, 2000);
//     };

//     animateStages();
//   }, [isInView]);

//   return (
//     <section
//       ref={ref}
//       className="relative py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
//     >
//       <div className="absolute inset-0 bg-gradient-to-b from-background via-card/10 to-background" />

//       <div className="relative z-10 max-w-7xl mx-auto">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={isInView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.8 }}
//           className="text-center mb-12 sm:mb-16 lg:mb-20"
//         >
//           <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
//             Our <span className="text-gradient">Roadmap</span>
//           </h2>
//           <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
//             The journey ahead: building the future of social photography
//           </p>
//         </motion.div>

//         <div className="relative">
//           <div className="hidden lg:block">
//             <div className="flex justify-between items-start gap-4 relative px-4 sm:px-8 pt-32 lg:pt-40">
//               {milestones.map((milestone, index) => (
//                 <MilestoneItem
//                   key={milestone.title}
//                   milestone={milestone}
//                   index={index}
//                   isInView={isInView}
//                   isActive={currentStage === index}
//                   isProcessing={isProcessing}
//                   showImage={showImage}
//                   totalMilestones={milestones.length}
//                   isDesktop={true}
//                   enhancedImage={enhancedImage}
//                 />
//               ))}
//             </div>
//           </div>

//           <div className="lg:hidden space-y-6 sm:space-y-8 pt-32 sm:pt-40">
//             {milestones.map((milestone, index) => (
//               <MilestoneItem
//                 key={milestone.title}
//                 milestone={milestone}
//                 index={index}
//                 isInView={isInView}
//                 isActive={currentStage === index}
//                 isProcessing={isProcessing}
//                 showImage={showImage}
//                 totalMilestones={milestones.length}
//                 isDesktop={false}
//                 enhancedImage={enhancedImage}
//               />
//             ))}
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

const ProcessingAnimation = ({
  stage,
  isProcessing,
  enhancedImage,
  displayImage, // Use displayImage instead of enhancedImage directly
  onEnhancementComplete, // New callback for when enhancement finishes
}) => {
  const containerSize = "w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20";
  const iconSize = {
    container: "w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14",
    inner: "w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8",
  };
  const cloudSize = "w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16";
  const cloudIconSize = "w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8";

  // For stage 2, show permanent enhanced image if enhancement is complete
  if (stage === 2 && !isProcessing && enhancedImage) {
    return (
      <motion.img
        src={displayImage} // Use displayImage which should now be the enhanced version
        alt="Enhanced"
        className="w-full h-full object-cover"
        style={{
          filter: "brightness(1.2) contrast(1.3) saturate(1.4)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
    );
  }

  if (!isProcessing) return null;

  return (
    <>
      {stage === 0 && (
        <motion.div className="absolute inset-0 flex items-center justify-center rounded-full">
          <motion.div
            className={`rounded-full flex items-center justify-center shadow-lg ${iconSize.container}`}
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
              <Upload className={`text-white ${iconSize.inner}`} />
            </motion.div>
          </motion.div>
        </motion.div>
      )}

      {stage === 1 && (
        <motion.div className="absolute inset-0 flex items-center justify-center rounded-full">
          <motion.div
            className={`rounded-full flex items-center justify-center shadow-lg ${iconSize.container}`}
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
              <ScanFace className={`text-white ${iconSize.inner}`} />
            </motion.div>
          </motion.div>
        </motion.div>
      )}

      {stage === 2 && (
        <>
          <motion.img
            src={displayImage} // Use current display image (original at this point)
            alt="Original"
            className="w-full h-full object-cover"
            initial={{ opacity: 0.3 }}
            animate={{ opacity: [0.3, 0.1, 0] }}
            transition={{
              duration: 2,
              times: [0, 0.5, 1],
            }}
          />

          <motion.div className="absolute inset-0 flex items-center justify-center rounded-full">
            <motion.div
              className={`rounded-full flex items-center justify-center shadow-lg ${iconSize.container}`}
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
                <Wand2 className={`text-purple-600 ${iconSize.inner}`} />
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            className="absolute inset-0 rounded-full overflow-hidden"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            transition={{
              delay: 1.5,
              duration: 1,
              ease: "easeOut",
            }}
            onAnimationComplete={() => {
              // When enhancement animation completes, notify parent to update displayImage
              if (onEnhancementComplete && enhancedImage) {
                onEnhancementComplete(enhancedImage);
              }
            }}
          >
            <motion.img
              src={enhancedImage}
              alt="Enhanced"
              className="w-full h-full object-cover"
              style={{
                filter: "brightness(1.2) contrast(1.3) saturate(1.4)",
              }}
            />
          </motion.div>

          <motion.div
            className="absolute w-3 h-3 sm:w-4 sm:h-4"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 1.5,
              times: [0, 0.5, 1],
              delay: 1.8,
            }}
            style={{ left: "25%", top: "30%" }}
          >
            <Sparkles className="w-full h-full text-yellow-400" />
          </motion.div>
          <motion.div
            className="absolute w-2 h-2 sm:w-3 sm:h-3"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 1.5,
              times: [0, 0.5, 1],
              delay: 2.2,
            }}
            style={{ left: "65%", top: "60%" }}
          >
            <Sparkles className="w-full h-full text-cyan-400" />
          </motion.div>
        </>
      )}

      {stage === 3 && (
        <motion.div className="absolute inset-0 flex items-center justify-center rounded-full">
          <motion.img
            src={displayImage}
            alt="Enhanced Profile"
            className="w-full h-full object-cover rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ duration: 0.5 }}
          />

          <motion.div
            className={`absolute rounded-full flex items-center justify-center shadow-lg ${iconSize.container}`}
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              delay: 0.5,
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
              <UserCircle className={`text-cyan-600 ${iconSize.inner}`} />
            </motion.div>
          </motion.div>
        </motion.div>
      )}

      {stage === 4 && (
        <>
          <motion.img
            src={displayImage} // Use the current display image
            alt="Enhanced Cloud"
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
            <motion.div
              className={`rounded-full flex items-center justify-center shadow-lg border border-blue-200 ${cloudSize}`}
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
              <Cloud className={`text-blue-600 ${cloudIconSize}`} />
            </motion.div>
            {[0.3, 0.6, 0.9].map((delay, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 sm:w-3 sm:h-3 bg-blue-500 rounded-full"
                initial={{
                  scale: 0,
                  opacity: 0,
                  y: 30,
                  x: i === 0 ? -12 : i === 1 ? 0 : 12,
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                  y: [30, -20, -40],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay,
                }}
              />
            ))}
          </motion.div>
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 1.2, 1],
              opacity: [0, 1, 1],
            }}
            transition={{
              delay: 2,
              duration: 0.6,
              times: [0, 0.7, 1],
            }}
          >
            <motion.div
              className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
            >
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
                  className="w-4 h-4 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white"
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
    </>
  );
};

const MilestoneItem = ({
  milestone,
  index,
  isInView,
  isActive,
  isProcessing,
  showImage,
  totalMilestones,
  isDesktop,
  enhancedImage,
  displayImage, // Receive displayImage from parent
  onEnhancementComplete, // Receive callback from parent
}) => {
  const Icon = milestone.icon;
  const glowClass = `glow-${milestone.color}`;

  const containerSize = "w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20";
  const iconSize = "w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10";
  const cardPadding = "p-4 sm:p-5 lg:p-6";

  return (
    <motion.div
      initial={{
        opacity: 0,
        [isDesktop ? "y" : "x"]: isDesktop ? 50 : -50,
        scale: 0.8,
      }}
      animate={
        isInView
          ? {
              opacity: 1,
              [isDesktop ? "y" : "x"]: 0,
              scale: 1,
            }
          : {}
      }
      transition={{
        delay: index * (isDesktop ? 0.2 : 0.15) + 0.5,
        duration: 0.6,
        type: "spring",
        stiffness: 100,
      }}
      className={`relative ${isDesktop ? "flex-1" : "flex gap-4 sm:gap-6"}`}
    >
      {!isDesktop && (
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
              className={`rounded-full bg-primary/20 flex items-center justify-center ${glowClass} border-4 ${
                isActive ? "border-primary/80" : "border-primary/40"
              } transition-all duration-300 relative overflow-hidden ${containerSize}`}
            >
              {(!showImage || !isActive) && (
                <Icon
                  className={`${
                    isActive ? "text-primary" : "text-primary/70"
                  } transition-all duration-300 ${iconSize}`}
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
                  {/* Always use displayImage which contains the current version */}
                  <motion.img
                    src={displayImage}
                    alt="Processing Demo"
                    className="w-full h-full object-cover"
                    style={{
                      opacity: isProcessing && index !== 2 ? 0.3 : 1,
                      filter:
                        index >= 2
                          ? "brightness(1.2) contrast(1.3) saturate(1.4)"
                          : "none",
                    }}
                  />
                  <ProcessingAnimation
                    stage={index}
                    isProcessing={isProcessing}
                    enhancedImage={enhancedImage}
                    displayImage={displayImage}
                    onEnhancementComplete={onEnhancementComplete}
                  />
                </motion.div>
              )}
            </div>
          </motion.div>

          {index < totalMilestones - 1 && (
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
                <Footprints className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              </motion.div>
            </div>
          )}
        </div>
      )}

      {isDesktop && (
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
            className={`rounded-full bg-primary/20 flex items-center justify-center ${glowClass} border-4 ${
              isActive ? "border-primary/80" : "border-primary/40"
            } transition-all duration-300 relative overflow-hidden ${containerSize}`}
          >
            {(!showImage || !isActive) && (
              <Icon
                className={`${
                  isActive ? "text-primary" : "text-primary/70"
                } transition-all duration-300 ${iconSize}`}
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
                {/* Always use displayImage which contains the current version */}
                <motion.img
                  src={displayImage}
                  alt="Processing Demo"
                  className="w-full h-full object-cover"
                  style={{
                    opacity: isProcessing && index !== 2 ? 0.8 : 1,
                    filter:
                      index >= 2
                        ? "brightness(1.2) contrast(1.3) saturate(1.4)"
                        : "none",
                  }}
                />
                <ProcessingAnimation
                  stage={index}
                  isProcessing={isProcessing}
                  enhancedImage={enhancedImage}
                  displayImage={displayImage}
                  onEnhancementComplete={onEnhancementComplete}
                />
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: index * (isDesktop ? 0.2 : 0.15) + 0.8 }}
        whileHover={{
          [isDesktop ? "y" : "x"]: isDesktop ? -8 : 8,
          scale: isDesktop ? 1.05 : 1.02,
        }}
        className={`glass-morphism rounded-2xl transition-all duration-300 shadow-xl ${
          isActive ? "ring-2 ring-primary/50 bg-primary/5" : "hover:bg-card/70"
        } ${isDesktop ? "mt-20" : "flex-1"} ${cardPadding}`}
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
        <h3 className="text-base sm:text-lg font-bold mb-2 text-foreground">
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

      {isDesktop && index < totalMilestones - 1 && (
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
            <Footprints className="w-5 h-5 sm:w-6 sm:h-6 text-primary rotate-90" />
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export function Roadmap() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [currentStage, setCurrentStage] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [enhancedImage, setEnhancedImage] = useState(null);
  const [displayImage, setDisplayImage] = useState(SAMPLE_IMAGE); // New state for current display image

  // Update displayImage when enhanced image is available and stage 2 completes
  const handleEnhancementComplete = (newEnhancedImage) => {
    setDisplayImage(newEnhancedImage);
  };

  useEffect(() => {
    if (!isInView) return;

    const animateStages = async () => {
      setShowImage(true);

      for (let stage = 0; stage < milestones.length; stage++) {
        setCurrentStage(stage);
        setIsProcessing(true);

        // Set enhanced image when we reach stage 2
        if (stage === 2) {
          // This would typically come from your enhancement process
          // For now, using a sample enhanced image
          setEnhancedImage(SAMPLE_IMAGE); // In real app, this would be your actual enhanced image
        }

        await new Promise((resolve) => setTimeout(resolve, 3000));
        setIsProcessing(false);

        if (stage < milestones.length - 1) {
          await new Promise((resolve) => setTimeout(resolve, 800));
        }
      }

      setTimeout(() => {
        if (isInView) animateStages();
      }, 2000);
    };

    animateStages();
  }, [isInView]);

  return (
    <section
      ref={ref}
      className="relative py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/10 to-background" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            Our <span className="text-gradient">Roadmap</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            The journey ahead: building the future of social photography
          </p>
        </motion.div>

        <div className="relative">
          <div className="hidden lg:block">
            <div className="flex justify-between items-start gap-4 relative px-4 sm:px-8 pt-32 lg:pt-40">
              {milestones.map((milestone, index) => (
                <MilestoneItem
                  key={milestone.title}
                  milestone={milestone}
                  index={index}
                  isInView={isInView}
                  isActive={currentStage === index}
                  isProcessing={isProcessing}
                  showImage={showImage}
                  totalMilestones={milestones.length}
                  isDesktop={true}
                  enhancedImage={enhancedImage}
                  displayImage={displayImage} // Pass displayImage down
                  onEnhancementComplete={handleEnhancementComplete} // Pass callback down
                />
              ))}
            </div>
          </div>

          <div className="lg:hidden space-y-6 sm:space-y-8 pt-32 sm:pt-40">
            {milestones.map((milestone, index) => (
              <MilestoneItem
                key={milestone.title}
                milestone={milestone}
                index={index}
                isInView={isInView}
                isActive={currentStage === index}
                isProcessing={isProcessing}
                showImage={showImage}
                totalMilestones={milestones.length}
                isDesktop={false}
                enhancedImage={enhancedImage}
                displayImage={displayImage} // Pass displayImage down
                onEnhancementComplete={handleEnhancementComplete} // Pass callback down
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
