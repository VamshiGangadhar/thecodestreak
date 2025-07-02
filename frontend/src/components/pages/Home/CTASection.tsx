import React from "react";
import { Crown, CheckCircle, Timer, Brain, Trophy } from "lucide-react";
import ResponsiveContainer from "./ResponsiveContainer";

const CTASection = () => (
  <section
    style={{
      background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
      color: "white",
      padding: "clamp(60px, 10vw, 100px) 0",
      position: "relative",
      overflow: "hidden",
    }}
  >
    <div
      style={{
        position: "absolute",
        top: "20%",
        right: "10%",
        width: "clamp(150px, 20vw, 300px)",
        height: "clamp(150px, 20vw, 300px)",
        background:
          "radial-gradient(circle, rgba(124, 58, 237, 0.2) 0%, transparent 70%)",
        borderRadius: "50%",
        animation: "float 8s ease-in-out infinite",
      }}
    ></div>

    <ResponsiveContainer>
      <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
        <h2
          style={{
            fontSize: "clamp(36px, 7vw, 56px)",
            fontWeight: "900",
            marginBottom: "clamp(16px, 3vw, 24px)",
            letterSpacing: "clamp(-1px, -0.2vw, -2px)",
            background: "linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            lineHeight: "1.2",
          }}
        >
          Ready to Start Your
          <br />
          <span
            style={{
              background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Coding Journey?
          </span>
        </h2>

        <p
          style={{
            fontSize: "clamp(16px, 4vw, 24px)",
            color: "rgba(255, 255, 255, 0.8)",
            marginBottom: "clamp(32px, 6vw, 48px)",
            maxWidth: "700px",
            margin: "0 auto clamp(32px, 6vw, 48px)",
            lineHeight: "1.5",
            padding: "0 clamp(16px, 4vw, 0px)",
          }}
        >
          Join thousands of developers who are already mastering their coding
          skills. Start your free journey today!
        </p>

        <div
          style={{
            display: "flex",
            gap: "clamp(16px, 4vw, 24px)",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <button
            style={{
              background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
              color: "white",
              border: "none",
              padding: "clamp(16px, 3vw, 20px) clamp(32px, 6vw, 48px)",
              borderRadius: "clamp(12px, 2vw, 16px)",
              fontSize: "clamp(16px, 3vw, 20px)",
              fontWeight: "700",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "clamp(8px, 2vw, 12px)",
              boxShadow: "0 8px 24px rgba(37, 99, 235, 0.4)",
              transition: "all 0.3s ease",
              minWidth: "max-content",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px) scale(1.05)";
              e.currentTarget.style.boxShadow =
                "0 12px 32px rgba(37, 99, 235, 0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow =
                "0 8px 24px rgba(37, 99, 235, 0.4)";
            }}
          >
            <Crown size={24} />
            Get Started Free
          </button>

          <div
            style={{
              fontSize: "clamp(14px, 3vw, 16px)",
              color: "rgba(255, 255, 255, 0.7)",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <CheckCircle size={20} color="#10b981" />
            <span>No credit card required</span>
          </div>
        </div>

        <div
          style={{
            marginTop: "clamp(48px, 8vw, 64px)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "clamp(24px, 5vw, 48px)",
            maxWidth: "600px",
            margin: "clamp(48px, 8vw, 64px) auto 0",
          }}
        >
          {[
            { icon: Timer, text: "Start immediately" },
            { icon: Brain, text: "AI-powered learning" },
            { icon: Trophy, text: "Track progress" },
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "12px",
                  color: "rgba(255, 255, 255, 0.8)",
                }}
              >
                <Icon size={20} color="#2563eb" />
                <span
                  style={{
                    fontSize: "clamp(14px, 3vw, 16px)",
                    fontWeight: "500",
                    textAlign: "center",
                  }}
                >
                  {item.text}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </ResponsiveContainer>
  </section>
);

export default CTASection;
