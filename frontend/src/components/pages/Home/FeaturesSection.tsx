import React from "react";
import { ChevronRight } from "lucide-react";
import ResponsiveContainer from "./ResponsiveContainer";

interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
  bgColor: string;
}

const FeaturesSection = ({ features }: { features: Feature[] }) => (
  <section
    style={{
      backgroundColor: "white",
      padding: "clamp(60px, 10vw, 80px) 0",
    }}
  >
    <ResponsiveContainer>
      <div
        style={{
          textAlign: "center",
          marginBottom: "clamp(60px, 10vw, 80px)",
        }}
      >
        <h2
          style={{
            fontSize: "clamp(32px, 6vw, 48px)",
            fontWeight: "800",
            color: "#1f2937",
            marginBottom: "clamp(16px, 3vw, 24px)",
            letterSpacing: "clamp(-0.5px, -0.1vw, -1px)",
            lineHeight: "1.2",
          }}
        >
          Why Developers Choose
          <span
            style={{
              background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              marginLeft: "12px",
            }}
          >
            TheCodeStreak
          </span>
        </h2>
        <p
          style={{
            fontSize: "clamp(16px, 3vw, 20px)",
            color: "#6b7280",
            maxWidth: "600px",
            margin: "0 auto",
            lineHeight: "1.6",
            padding: "0 clamp(16px, 4vw, 0px)",
          }}
        >
          Everything you need to accelerate your coding journey and build a
          successful tech career.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "clamp(24px, 5vw, 40px)",
        }}
      >
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div
              key={index}
              style={{
                background: "white",
                borderRadius: "clamp(16px, 3vw, 24px)",
                padding: "clamp(24px, 5vw, 40px) clamp(20px, 4vw, 32px)",
                border: "1px solid #e5e7eb",
                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.04)",
                transition: "all 0.3s ease",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow =
                  "0 12px 32px rgba(0, 0, 0, 0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 4px 16px rgba(0, 0, 0, 0.04)";
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: `linear-gradient(135deg, ${feature.color}05 0%, transparent 50%)`,
                  pointerEvents: "none",
                }}
              ></div>

              <div
                style={{
                  width: "clamp(48px, 10vw, 64px)",
                  height: "clamp(48px, 10vw, 64px)",
                  backgroundColor: feature.bgColor,
                  borderRadius: "clamp(12px, 2vw, 16px)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "clamp(16px, 4vw, 24px)",
                  position: "relative",
                }}
              >
                <Icon size={28} color={feature.color} />
              </div>

              <h3
                style={{
                  fontSize: "clamp(20px, 4vw, 24px)",
                  fontWeight: "700",
                  color: "#1f2937",
                  marginBottom: "clamp(12px, 2vw, 16px)",
                  lineHeight: "1.3",
                }}
              >
                {feature.title}
              </h3>

              <p
                style={{
                  fontSize: "clamp(14px, 3vw, 16px)",
                  color: "#6b7280",
                  lineHeight: "1.6",
                  marginBottom: "clamp(16px, 3vw, 24px)",
                }}
              >
                {feature.description}
              </p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  color: feature.color,
                  fontWeight: "600",
                  fontSize: "clamp(14px, 3vw, 16px)",
                }}
              >
                <span>Explore feature</span>
                <ChevronRight size={16} />
              </div>
            </div>
          );
        })}
      </div>
    </ResponsiveContainer>
  </section>
);

export default FeaturesSection;
