import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Building2, Home, Shield, Award, ArrowRight, MapPin, Users } from "lucide-react";

const Onboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = React.useState(0);
  const [isNavigating, setIsNavigating] = React.useState(false);

  const handleNext = () => {
    if (currentStep < 2) {
      setCurrentStep(prev => prev + 1);
    } else {
      setIsNavigating(true);
      setTimeout(() => {
        navigate("/home");
      }, 1000);
    }
  };

  const handleSkip = () => {
    setIsNavigating(true);
    setTimeout(() => {
      navigate("/home");
    }, 1000);
  };

  const revealVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  const steps = [
    {
      icon: Building2,
      title: "Premium Properties",
      description: "Discover luxury homes and exclusive properties in prime locations worldwide.",
      illustration: (
        <div className="relative w-full h-64 md:h-[500px]">
          {/* Background circles */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-transparent rounded-full blur-xl" />
            <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-gradient-to-br from-blue-500/20 to-transparent rounded-full blur-xl" />
          </motion.div>

          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            variants={revealVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="w-48 h-48 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center backdrop-blur-3xl">
              <Building2 className="w-24 h-24 text-white" />
            </div>
          </motion.div>

          <motion.div
            className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
          >
            <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center shadow-lg">
              <Home className="w-12 h-12 text-white" />
            </div>
          </motion.div>

          <motion.div
            className="absolute bottom-1/4 right-1/4 transform translate-x-1/2 translate-y-1/2"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, type: "spring" }}
          >
            <div className="w-32 h-32 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full flex items-center justify-center shadow-lg">
              <MapPin className="w-16 h-16 text-white" />
            </div>
          </motion.div>
        </div>
      )
    },
    {
      icon: Shield,
      title: "Expert Guidance",
      description: "Get professional advice from our experienced real estate specialists.",
      illustration: (
        <div className="relative w-full h-64 md:h-[500px]">
          {/* Background circles */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="absolute top-1/3 left-1/3 w-40 h-40 bg-gradient-to-br from-emerald-500/20 to-transparent rounded-full blur-xl" />
            <div className="absolute bottom-1/3 right-1/3 w-48 h-48 bg-gradient-to-br from-teal-500/20 to-transparent rounded-full blur-xl" />
          </motion.div>

          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            variants={revealVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="w-48 h-48 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center backdrop-blur-3xl">
              <Shield className="w-24 h-24 text-white" />
            </div>
          </motion.div>

          <motion.div
            className="absolute top-1/3 right-1/3"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
          >
            <div className="w-24 h-24 bg-gradient-to-br from-teal-400 to-emerald-400 rounded-full flex items-center justify-center shadow-lg">
              <Award className="w-12 h-12 text-white" />
            </div>
          </motion.div>

          <motion.div
            className="absolute bottom-1/3 left-1/3"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, type: "spring" }}
          >
            <div className="w-32 h-32 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-full flex items-center justify-center shadow-lg">
              <Users className="w-16 h-16 text-white" />
            </div>
          </motion.div>
        </div>
      )
    },
    {
      icon: Home,
      title: "Find Your Dream Home",
      description: "Start your journey to finding the perfect property that matches your lifestyle.",
      illustration: (
        <div className="relative w-full h-64 md:h-[500px]">
          {/* Background circles */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="absolute top-1/4 right-1/4 w-48 h-48 bg-gradient-to-br from-amber-500/20 to-transparent rounded-full blur-xl" />
            <div className="absolute bottom-1/4 left-1/4 w-40 h-40 bg-gradient-to-br from-orange-500/20 to-transparent rounded-full blur-xl" />
          </motion.div>

          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            variants={revealVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="w-56 h-56 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center backdrop-blur-3xl">
              <Home className="w-32 h-32 text-white" />
            </div>
          </motion.div>

          {[...Array(8)].map((_, index) => (
            <motion.div
              key={index}
              className="absolute"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1, type: "spring" }}
              style={{
                top: `${50 + 35 * Math.sin((index * 2 * Math.PI) / 8)}%`,
                left: `${50 + 35 * Math.cos((index * 2 * Math.PI) / 8)}%`,
              }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-amber-400 rounded-full flex items-center justify-center shadow-lg">
                <div className="w-4 h-4 bg-white rounded-full" />
              </div>
            </motion.div>
          ))}
        </div>
      )
    }
  ];

  return (
    <AnimatePresence mode="wait">
      {!isNavigating && (
        <motion.div
          className="min-h-screen bg-[#0A0F1C] overflow-hidden relative flex flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-emerald-900/20" />

          {/* Animated background shapes */}
          <motion.div
            className="absolute inset-0 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ duration: 1 }}
          >
            <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/30 rounded-full mix-blend-overlay filter blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/30 rounded-full mix-blend-overlay filter blur-3xl" />
          </motion.div>

          {/* Skip Button */}
          <motion.button
            className="absolute top-8 right-8 text-gray-400 hover:text-white transition-colors duration-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={handleSkip}
          >
            Skip
          </motion.button>

          {/* Content */}
          <div className="flex-1 flex items-center justify-center p-4 relative z-10">
            <AnimatePresence mode="wait" custom={currentStep}>
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="max-w-4xl w-full text-center"
              >
                {steps[currentStep].illustration}

                <motion.h1
                  className="text-4xl md:text-6xl font-bold text-white mt-8 mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {steps[currentStep].title}
                </motion.h1>

                <motion.p
                  className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {steps[currentStep].description}
                </motion.p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom Navigation */}
          <div className="p-8 relative z-10">
            <div className="max-w-4xl mx-auto flex items-center justify-between">
              {/* Progress Dots */}
              <div className="flex gap-3">
                {steps.map((_, index) => (
                  <motion.div
                    key={index}
                    className={`w-3 h-3 rounded-full ${
                      index === currentStep 
                        ? "bg-gradient-to-r from-purple-500 to-blue-500"
                        : "bg-gray-600"
                    }`}
                    initial={false}
                    animate={{
                      scale: index === currentStep ? 1.2 : 1,
                      opacity: index === currentStep ? 1 : 0.5
                    }}
                  />
                ))}
              </div>

              {/* Next Button */}
              <motion.button
                className="px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl flex items-center gap-2 relative overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNext}
              >
                <span className="relative z-10">
                  {currentStep === steps.length - 1 ? "Get Started" : "Next"}
                </span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500"
                  initial={{ x: "100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Onboarding; 