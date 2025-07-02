import React from "react";
import { Sparkles, ArrowRight, Rocket } from "lucide-react";
import ResponsiveContainer from "./ResponsiveContainer";

const HeroSection = ({
  stats,
  animateStats,
}: {
  stats: any[];
  animateStats: boolean;
}) => (
  <section
    style={{
      background:
        "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
      color: "white",
      padding: "clamp(60px, 10vw, 120px) 0 clamp(50px, 8vw, 100px)",
      position: "relative",
      overflow: "hidden",
      width: "100%",
    }}
  >
    {/* Animated background elements - hidden on mobile */}
    <div
      style={{
        position: "absolute",
        top: "10%",
        right: "10%",
        width: "clamp(100px, 15vw, 200px)",
        height: "clamp(100px, 15vw, 200px)",
        background:
          "radial-gradient(circle, rgba(37, 99, 235, 0.2) 0%, transparent 70%)",
        borderRadius: "50%",
        animation: "float 6s ease-in-out infinite",
      }}
    ></div>
    <div
      style={{
        position: "absolute",
        bottom: "20%",
        left: "5%",
        width: "clamp(80px, 12vw, 150px)",
        height: "clamp(80px, 12vw, 150px)",
        background:
          "radial-gradient(circle, rgba(124, 58, 237, 0.2) 0%, transparent 70%)",
        borderRadius: "50%",
        animation: "float 8s ease-in-out infinite reverse",
      }}
    ></div>

    <ResponsiveContainer>
      <div
        style={{
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            backgroundColor: "rgba(37, 99, 235, 0.2)",
            padding: "clamp(6px, 2vw, 8px) clamp(12px, 4vw, 20px)",
            borderRadius: "50px",
            border: "1px solid rgba(37, 99, 235, 0.3)",
            marginBottom: "clamp(20px, 5vw, 32px)",
            fontSize: "clamp(12px, 3vw, 14px)",
            fontWeight: "500",
          }}
        >
          <Sparkles size={16} />
          <span>Join developers mastering code daily</span>
        </div>

        <h1
          style={{
            fontSize: "clamp(32px, 8vw, 72px)",
            fontWeight: "900",
            background: "linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            margin: "0 0 clamp(16px, 4vw, 24px) 0",
            lineHeight: "1.1",
            letterSpacing: "clamp(-1px, -0.2vw, -2px)",
          }}
        >
          Master Coding with
          <br />
          <span
            style={{
              background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Daily Streaks
          </span>
        </h1>

        <p
          style={{
            fontSize: "clamp(16px, 4vw, 24px)",
            color: "rgba(255, 255, 255, 0.8)",
            margin: "0 0 clamp(32px, 6vw, 48px) 0",
            maxWidth: "700px",
            marginLeft: "auto",
            marginRight: "auto",
            lineHeight: "1.5",
            padding: "0 clamp(16px, 4vw, 0px)",
          }}
        >
          Transform your coding skills with personalized daily challenges, track
          your progress, and level up from beginner to elite developer.
        </p>

        <div
          style={{
            display: "flex",
            gap: "clamp(12px, 3vw, 20px)",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            marginBottom: "clamp(40px, 8vw, 64px)",
          }}
        >
          <button
            style={{
              background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
              color: "white",
              border: "none",
              padding: "clamp(14px, 3vw, 18px) clamp(24px, 5vw, 36px)",
              borderRadius: "clamp(12px, 2vw, 16px)",
              fontSize: "clamp(16px, 3vw, 18px)",
              fontWeight: "600",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "clamp(8px, 2vw, 12px)",
              boxShadow: "0 8px 24px rgba(37, 99, 235, 0.4)",
              transition: "all 0.3s ease",
              minWidth: "max-content",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow =
                "0 12px 32px rgba(37, 99, 235, 0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 8px 24px rgba(37, 99, 235, 0.4)";
            }}
          >
            <Rocket size={20} />
            Start Your Journey
            <ArrowRight size={20} />
          </button>
        </div>

        {/* Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "clamp(16px, 4vw, 32px)",
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                style={{
                  textAlign: "center",
                  opacity: animateStats ? 1 : 0,
                  transform: animateStats
                    ? "translateY(0)"
                    : "translateY(20px)",
                  transition: `all 0.6s ease ${index * 150}ms`,
                }}
              >
                <Icon
                  size={32}
                  color="#2563eb"
                  style={{ marginBottom: "12px" }}
                />
                <div
                  style={{
                    fontSize: "clamp(24px, 5vw, 36px)",
                    fontWeight: "800",
                    color: "white",
                    marginBottom: "8px",
                  }}
                >
                  {stat.number}
                </div>
                <div
                  style={{
                    fontSize: "clamp(12px, 3vw, 16px)",
                    color: "rgba(255, 255, 255, 0.7)",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </ResponsiveContainer>

    <style>{`
      @keyframes float {
        0%, 100% { transform: translateY(0) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(180deg); }
      }
    `}</style>
  </section>
);

export default HeroSection;
