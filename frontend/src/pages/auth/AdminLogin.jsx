import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowRight, Eye, EyeOff, Shield } from "lucide-react";
import Spinner from "../../components/common/Spinner";
import { useAuth } from "../../contexts/AuthContext";
import { useToast } from "../../contexts/ToastContext";
import { getErrorMessage, validateEmail } from "../../utils/errorHandler";
import whiteLogo from "../../assets/images/white_logo_with_text.png";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { adminLogin } = useAuth();
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");

  // Add this useEffect to handle any initialization logging
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.log("AdminLogin component mounted");
    }
  }, []);

  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    if (rememberedEmail) {
      setFormData((prev) => ({ ...prev, email: rememberedEmail }));
      setRememberMe(true);
    }
  }, []);

  useEffect(()=>{

  },[])

  const validateField = (name, value) => {
    switch (name) {
      case "email":
        return validateEmail(value);
      case "password":
        return value.length < 6
          ? "Password must be at least 6 characters"
          : null;
      default:
        return null;
    }
  };

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;

      // Prevent leading spaces for all fields except password
      if (name !== "password" && value.startsWith(" ")) {
        return;
      }

      // Handle email validation - no spaces allowed
      if (name === "email" && value.includes(" ")) {
        return;
      }

      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));

      // Clear submit error when user starts typing
      if (submitError) {
        setSubmitError("");
      }

      // Validate field
      const error = validateField(name, value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: error,
      }));
    },
    [submitError]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    const emailError = validateEmail(formData.email);
    const passwordError =
      formData.password.trim() === "" ? "Password is required" : null;

    if (emailError || passwordError) {
      setErrors({
        email: emailError,
        password: passwordError,
      });
      return;
    }

    try {
      setIsLoading(true);
      setErrors({}); // Clear any previous errors
      setTimeout(async () => {}, 3000);
      const result = await adminLogin(formData.email, formData.password);

      if (result.success) {
        // Handle remember me functionality
        if (rememberMe) {
          localStorage.setItem("rememberedEmail", formData.email);
        } else {
          localStorage.removeItem("rememberedEmail");
        }

        showToast("Login successful!", "success");
        // Clear form data after successful login
        setFormData({
          email: "",
          password: "",
        });

        // Only navigate on successful login
        navigate("/admin/dashboard");
      } else {
        // Set form errors for invalid credentials
        setErrors({
          email: "Invalid email or password",
          password: "Invalid email or password",
        });
        showToast(result.message, "error");
      }
    } catch (error) {
      // Set form errors for invalid credentials
      setErrors({
        email: "Invalid email or password",
        password: "Invalid email or password",
      });
      showToast(error.message,+'afd' || "Login failed. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const renderFieldError = (fieldName) => {
    return (
      errors[fieldName] && (
        <p className="mt-1 text-sm text-red-600">{errors[fieldName]}</p>
      )
    );
  };

  return (
    <>
      {isLoading && <Spinner />}
      <section className="min-h-screen bg-gradient-to-b from-gray-50 to-white relative overflow-hidden flex items-center">
        {/* Brand Logo */}
        <div className="absolute top-4 sm:top-8 left-4 sm:left-8 lg:left-24 z-10">
          <Link
            to="/"
            className="block hover:opacity-90 transition-all duration-300"
          >
            <img src={whiteLogo} alt="EZI Property" className="h-8" />
          </Link>
        </div>

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, rgba(0,0,0,0.05) 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-24 w-full py-8 sm:py-12">
          <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12">
            {/* Left Side - Content */}
            <motion.div
              className="w-full lg:w-1/2 text-center lg:text-left"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-[#F3703A]/5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6">
                <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-[#F3703A] rounded-full animate-pulse" />
                <span className="text-[#F3703A] text-xs sm:text-sm font-medium tracking-wider uppercase">
                  Admin Portal
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
                Welcome to{" "}
                <span className="text-[#F3703A]">Admin Dashboard</span>
              </h1>
              <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">
                Access the admin portal to manage properties, users, and system
                settings.
              </p>

              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center gap-3 sm:gap-4 text-gray-600">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#F3703A]/10 flex items-center justify-center">
                    <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-[#F3703A]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                      Secure Access
                    </h3>
                    <p className="text-sm text-gray-600">
                      Protected admin portal with enhanced security
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Login Form */}
            <motion.div
              className="w-full lg:w-1/2 max-w-md"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Admin Login
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email Field */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#F3703A] focus:border-transparent ${
                          errors.email ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    {renderFieldError("email")}
                  </div>

                  {/* Password Field */}
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-[#F3703A] focus:border-transparent ${
                          errors.password ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    {renderFieldError("password")}
                  </div>

                  {/* Remember Me */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="rememberMe"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="h-4 w-4 text-[#F3703A] focus:ring-[#F3703A] border-gray-300 rounded"
                      />
                      <label
                        htmlFor="rememberMe"
                        className="ml-2 block text-sm text-gray-700"
                      >
                        Remember me
                      </label>
                    </div>
                    <Link
                      to="/forgot-password"
                      className="text-sm font-medium text-[#F3703A] hover:text-[#E65A2A]"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#F3703A] text-white py-2 px-4 rounded-lg hover:bg-[#E65A2A] transition-colors duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer relative"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Signing in...</span>
                      </>
                    ) : (
                      <>
                        <span>Sign in</span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>

                  {/* Error Message */}
                  {submitError && (
                    <p className="text-sm text-red-600 text-center">
                      {submitError}
                    </p>
                  )}
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminLogin;
