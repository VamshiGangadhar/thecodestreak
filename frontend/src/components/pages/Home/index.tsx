import React, { useState, useEffect } from "react";
import {
  Trophy,
  Users,
  CheckCircle,
  TrendingUp,
  Sparkles,
  Calendar,
  BarChart3,
} from "lucide-react";
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
// import TestimonialsSection from "./TestimonialsSection";
import CTASection from "./CTASection";

const HomePage = () => {
  const [animateStats, setAnimateStats] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setAnimateStats(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { number: "10+", label: "Active Coders", icon: Users },
    { number: "100+", label: "Problems Solved", icon: CheckCircle },
    { number: "95%", label: "Success Rate", icon: TrendingUp },
    { number: "24/7", label: "Learning Support", icon: Sparkles },
  ];

  const features = [
    {
      icon: Calendar,
      title: "Daily Challenges",
      description:
        "Fresh coding problems every day to keep your skills sharp and maintain your coding streak.",
      color: "#2563eb",
      bgColor: "#eff6ff",
    },
    {
      icon: Trophy,
      title: "Skill Progression",
      description:
        "Level up from beginner to elite with our structured learning path and achievement system.",
      color: "#7c3aed",
      bgColor: "#faf5ff",
    },
    {
      icon: BarChart3,
      title: "Performance Analytics",
      description:
        "Track your progress with detailed insights, performance metrics, and personalized recommendations.",
      color: "#059669",
      bgColor: "#ecfdf5",
    },
    {
      icon: Users,
      title: "Community Learning",
      description:
        "Join thousands of developers, share solutions, and learn from the coding community.",
      color: "#dc2626",
      bgColor: "#fef2f2",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Software Engineer at Google",
      content:
        "TheCodeStreak transformed my coding journey. The daily challenges kept me motivated and the progression system made learning addictive!",
      avatar: "SC",
      rating: 5,
    },
    {
      name: "Alex Rodriguez",
      role: "Full Stack Developer",
      content:
        "I went from beginner to landing my dream job in 6 months. The structured approach and community support were game-changers.",
      avatar: "AR",
      rating: 5,
    },
    {
      name: "Priya Sharma",
      role: "Frontend Lead at Meta",
      content:
        "The performance analytics helped me identify weak areas and improve systematically. Best coding platform I've used!",
      avatar: "PS",
      rating: 5,
    },
  ];

  const containerStyle: React.CSSProperties = {
    width: "100vw",
    minHeight: "100vh",
    backgroundColor: "#f8fafc",
    paddingTop: "70px",
    fontFamily: "system-ui, -apple-system, sans-serif",
    overflowX: "hidden",
  };

  return (
    <div style={containerStyle}>
      <HeroSection stats={stats} animateStats={animateStats} />
      <FeaturesSection features={features} />
      {/* <TestimonialsSection
        testimonials={testimonials}
        currentTestimonial={currentTestimonial}
        setCurrentTestimonial={setCurrentTestimonial}
      /> */}
      <CTASection />
    </div>
  );
};

export default HomePage;
