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
      }, 800);
    }
  };

  const handleSkip = () => {
    setIsNavigating(true);
    setTimeout(() => {
      navigate("/home");
    }, 800);
  };

  const steps = [
    {
      icon: Building2,
      title: "Premium Properties",
      description: "Discover luxury homes and exclusive properties in prime locations worldwide.",
      illustration: (
        <div className="relative w-full h-64 md:h-96">
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <div className="w-40 h-40 bg-[#F3703A]/20 rounded-full flex items-center justify-center">
              <Building2 className="w-20 h-20 text-[#F3703A]" />
            </div>
          </motion.div>
          <motion.div
            className="absolute top-1/4 left-1/4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center">
              <Home className="w-10 h-10 text-white" />
            </div>
          </motion.div>
          <motion.div
            className="absolute bottom-1/4 right-1/4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center">
              <MapPin className="w-12 h-12 text-white" />
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
        <div className="relative w-full h-64 md:h-96">
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <div className="w-40 h-40 bg-[#F3703A]/20 rounded-full flex items-center justify-center">
              <Shield className="w-20 h-20 text-[#F3703A]" />
            </div>
          </motion.div>
          <motion.div
            className="absolute top-1/3 right-1/3"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center">
              <Award className="w-10 h-10 text-white" />
            </div>
          </motion.div>
          <motion.div
            className="absolute bottom-1/3 left-1/3"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center">
              <Users className="w-12 h-12 text-white" />
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
        <div className="relative w-full h-64 md:h-96">
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <div className="w-48 h-48 bg-[#F3703A]/20 rounded-full flex items-center justify-center">
              <Home className="w-24 h-24 text-[#F3703A]" />
            </div>
          </motion.div>
          {[...Array(6)].map((_, index) => (
            <motion.div
              key={index}
              className="absolute"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 }}
              style={{
                top: `${50 + 30 * Math.sin((index * 2 * Math.PI) / 6)}%`,
                left: `${50 + 30 * Math.cos((index * 2 * Math.PI) / 6)}%`,
              }}
            >
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-[#F3703A] rounded-full" />
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
          className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
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
          <div className="flex-1 flex items-center justify-center p-4">
            <AnimatePresence mode="wait" custom={currentStep}>
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="max-w-4xl w-full text-center"
              >
                {steps[currentStep].illustration}

                <motion.h1
                  className="text-4xl md:text-5xl font-bold text-white mt-8 mb-4"
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
          <div className="p-8">
            <div className="max-w-4xl mx-auto flex items-center justify-between">
              {/* Progress Dots */}
              <div className="flex gap-2">
                {steps.map((_, index) => (
                  <motion.div
                    key={index}
                    className={`w-3 h-3 rounded-full ${
                      index === currentStep ? "bg-[#F3703A]" : "bg-gray-600"
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
                className="px-8 py-3 bg-[#F3703A] text-white rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNext}
              >
                {currentStep === steps.length - 1 ? "Get Started" : "Next"}
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Onboarding; 