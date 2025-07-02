import React, { useEffect, useState } from "react";
import {
  ChevronUp,
  Trophy,
  Star,
  Zap,
  Crown,
  Lock,
  Calendar,
  Target,
  LucideIcon,
} from "lucide-react";

import { LEVELS, getNextLevel } from "../../constants/levels";

type LevelType = (typeof LEVELS)[number];

interface LevelConfig {
  icon: LucideIcon;
  color: string;
  gradient: string;
  bgColor: string;
  borderColor: string;
}

const levelConfig: Record<LevelType, LevelConfig> = {
  beginner: {
    icon: Star,
    color: "#10b981",
    gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    bgColor: "#ecfdf5",
    borderColor: "#10b981",
  },
  intermediate: {
    icon: Zap,
    color: "#f59e0b",
    gradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
    bgColor: "#fffbeb",
    borderColor: "#f59e0b",
  },
  advanced: {
    icon: Trophy,
    color: "#8b5cf6",
    gradient: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
    bgColor: "#faf5ff",
    borderColor: "#8b5cf6",
  },
  elite: {
    icon: Crown,
    color: "#ef4444",
    gradient: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
    bgColor: "#fef2f2",
    borderColor: "#ef4444",
  },
};

interface UpgradeLevelModalProps {
  currentLevel: string;
  show: boolean;
  testTakenToday: boolean;
  onClose: () => void;
  onTakeTest: () => void;
  buttonStyle: React.CSSProperties;
}

const UpgradeLevelModal: React.FC<UpgradeLevelModalProps> = ({
  currentLevel,
  show,
  testTakenToday,
  onClose,
  onTakeTest,
  buttonStyle,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [animateContent, setAnimateContent] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      setTimeout(() => setAnimateContent(true), 50);
    } else {
      setAnimateContent(false);
      setTimeout(() => setIsVisible(false), 300);
    }
  }, [show]);

  if (!isVisible) return null;

  const nextLevel = getNextLevel(currentLevel);
  const currentConfig =
    levelConfig[currentLevel?.toLowerCase() as LevelType] ||
    levelConfig.beginner;
  const nextConfig = nextLevel
    ? levelConfig[nextLevel.toLowerCase() as LevelType]
    : null;
  const CurrentIcon = currentConfig.icon;
  const NextIcon = nextConfig?.icon || Crown;

  const isMaxLevel = !nextLevel;

  const overlayStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: animateContent ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0)",
    backdropFilter: animateContent ? "blur(8px)" : "blur(0px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    padding: "20px",
    transition: "all 0.3s ease",
  };

  const modalStyle: React.CSSProperties = {
    backgroundColor: "white",
    borderRadius: "20px",
    width: "100%",
    maxWidth: "420px",
    maxHeight: "85vh",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    transform: animateContent
      ? "scale(1) translateY(0)"
      : "scale(0.9) translateY(20px)",
    opacity: animateContent ? 1 : 0,
    transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
    position: "relative",
    overflow: "hidden",
  };

  const headerStyle: React.CSSProperties = {
    background: currentConfig.gradient,
    padding: "24px 24px 20px",
    textAlign: "center",
    position: "relative",
    overflow: "hidden",
    flexShrink: 0,
  };

  const iconContainerStyle: React.CSSProperties = {
    width: "64px",
    height: "64px",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 12px",
    backdropFilter: "blur(10px)",
    border: "2px solid rgba(255, 255, 255, 0.3)",
  };

  const contentStyle: React.CSSProperties = {
    padding: "24px",
    flex: 1,
    overflow: "auto",
    minHeight: 0,
  };

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        {/* Decorative background elements */}
        <div
          style={{
            position: "absolute",
            top: "-50%",
            right: "-50%",
            width: "200%",
            height: "200%",
            background:
              "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 50%)",
            pointerEvents: "none",
          }}
        ></div>

        {/* Header */}
        <div style={headerStyle}>
          <div style={iconContainerStyle}>
            <CurrentIcon size={32} color="white" />
          </div>
          <h2
            style={{
              color: "white",
              fontSize: "24px",
              fontWeight: "bold",
              margin: "0 0 6px 0",
              textShadow: "0 2px 4px rgba(0,0,0,0.2)",
            }}
          >
            Level Upgrade
          </h2>
          <p
            style={{
              color: "rgba(255, 255, 255, 0.9)",
              fontSize: "14px",
              margin: 0,
            }}
          >
            Ready to advance your skills?
          </p>
        </div>

        <div style={contentStyle}>
          {isMaxLevel ? (
            // Max level content
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  backgroundColor: "#fef3c7",
                  border: "2px solid #f59e0b",
                  borderRadius: "16px",
                  padding: "24px 20px",
                  marginBottom: "20px",
                }}
              >
                <Crown
                  size={40}
                  color="#f59e0b"
                  style={{ margin: "0 auto 12px", display: "block" }}
                />
                <h3
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "#92400e",
                    margin: "0 0 8px 0",
                  }}
                >
                  🎉 Elite Status Achieved!
                </h3>
                <p
                  style={{
                    color: "#78350f",
                    fontSize: "14px",
                    lineHeight: "1.5",
                    margin: 0,
                  }}
                >
                  Congratulations! You've reached the highest level -{" "}
                  <strong>{currentLevel.toUpperCase()}</strong>. You are now
                  among the coding elite!
                </p>
              </div>
            </div>
          ) : (
            // Upgrade content
            <div>
              {/* Level comparison */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "24px",
                  gap: "12px",
                }}
              >
                {/* Current Level */}
                <div
                  style={{
                    flex: 1,
                    backgroundColor: currentConfig.bgColor,
                    border: `2px solid ${currentConfig.color}40`,
                    borderRadius: "12px",
                    padding: "16px 12px",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      backgroundColor: "white",
                      borderRadius: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 8px",
                      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    }}
                  >
                    <CurrentIcon size={20} color={currentConfig.color} />
                  </div>
                  <p
                    style={{
                      fontSize: "10px",
                      fontWeight: "600",
                      color: "#6b7280",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      margin: "0 0 3px 0",
                    }}
                  >
                    Current
                  </p>
                  <p
                    style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      color: currentConfig.color,
                      margin: 0,
                      textTransform: "capitalize",
                    }}
                  >
                    {currentLevel}
                  </p>
                </div>

                {/* Arrow */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    color: "#9ca3af",
                  }}
                >
                  <ChevronUp
                    size={20}
                    style={{
                      animation: "bounce 2s infinite",
                    }}
                  />
                  <style>{`
                    @keyframes bounce {
                      0%, 20%, 53%, 80%, 100% { transform: translateY(0); }
                      40%, 43% { transform: translateY(-8px); }
                      70% { transform: translateY(-4px); }
                    }
                  `}</style>
                </div>

                {/* Next Level */}
                <div
                  style={{
                    flex: 1,
                    backgroundColor: nextConfig?.bgColor ?? currentConfig.bgColor,
                    border: `2px solid ${nextConfig?.color ?? currentConfig.color}`,
                    borderRadius: "12px",
                    padding: "16px 12px",
                    textAlign: "center",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: `linear-gradient(45deg, transparent 0%, ${(nextConfig?.color ?? currentConfig.color)}10 100%)`,
                    }}
                  ></div>
                  <div style={{ position: "relative" }}>
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        backgroundColor: "white",
                        borderRadius: "10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 8px",
                        boxShadow: `0 4px 12px ${(nextConfig?.color ?? currentConfig.color)}40`,
                      }}
                    >
                      {nextConfig && <NextIcon size={20} color={nextConfig.color} />}
                    </div>
                    <p
                      style={{
                        fontSize: "10px",
                        fontWeight: "600",
                        color: "#6b7280",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                        margin: "0 0 3px 0",
                      }}
                    >
                      Next Level
                    </p>
                    <p
                      style={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        color: (nextConfig?.color ?? currentConfig.color),
                        margin: 0,
                        textTransform: "capitalize",
                      }}
                    >
                      {nextLevel}
                    </p>
                  </div>
                </div>
              </div>

              {/* Info card */}
              <div
                style={{
                  backgroundColor: "#f0f9ff",
                  border: "2px solid #0ea5e9",
                  borderRadius: "12px",
                  padding: "16px",
                  marginBottom: "20px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "10px",
                  }}
                >
                  <Target
                    size={20}
                    color="#0ea5e9"
                    style={{ marginTop: "1px", flexShrink: 0 }}
                  />
                  <div>
                    <h4
                      style={{
                        fontSize: "16px",
                        fontWeight: "bold",
                        color: "#0c4a6e",
                        margin: "0 0 6px 0",
                      }}
                    >
                      Take the Assessment
                    </h4>
                    <p
                      style={{
                        color: "#075985",
                        fontSize: "13px",
                        lineHeight: "1.4",
                        margin: 0,
                      }}
                    >
                      Ready to advance to{" "}
                      <strong>{nextLevel?.toUpperCase()}</strong>? Take our
                      comprehensive assessment to demonstrate your skills and
                      unlock the next level.
                    </p>
                  </div>
                </div>
              </div>

              {/* Daily limit warning */}
              {testTakenToday && (
                <div
                  style={{
                    backgroundColor: "#fef3c7",
                    border: "2px solid #f59e0b",
                    borderRadius: "10px",
                    padding: "12px",
                    marginBottom: "20px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <Calendar size={18} color="#d97706" />
                  <div>
                    <p
                      style={{
                        fontWeight: "600",
                        color: "#92400e",
                        margin: "0 0 2px 0",
                        fontSize: "13px",
                      }}
                    >
                      Daily Limit Reached
                    </p>
                    <p
                      style={{
                        color: "#78350f",
                        fontSize: "12px",
                        margin: 0,
                      }}
                    >
                      You've already taken today's test. Come back tomorrow to
                      try again!
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Action buttons */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            {!isMaxLevel && (
              <button
                onClick={onTakeTest}
                disabled={testTakenToday}
                style={{
                  ...buttonStyle,
                  width: "100%",
                  padding: "14px 20px",
                  fontSize: "14px",
                  fontWeight: "600",
                  borderRadius: "10px",
                  background: testTakenToday
                    ? "#e5e7eb"
                    : nextConfig?.gradient ||
                      "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
                  color: testTakenToday ? "#9ca3af" : "white",
                  border: "none",
                  cursor: testTakenToday ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  boxShadow: testTakenToday
                    ? "none"
                    : "0 4px 12px rgba(0,0,0,0.15)",
                  transition: "all 0.2s ease",
                  transform: "translateY(0)",
                }}
                onMouseEnter={(e) => {
                  if (!testTakenToday) {
                    e.currentTarget.style.transform = "translateY(-1px)";
                    e.currentTarget.style.boxShadow =
                      "0 6px 20px rgba(0,0,0,0.2)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!testTakenToday) {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 12px rgba(0,0,0,0.15)";
                  }
                }}
              >
                {testTakenToday ? (
                  <>
                    <Lock size={16} />
                    Test Already Taken Today
                  </>
                ) : (
                  <>
                    <Zap size={16} />
                    Take{" "}
                    {nextLevel?.charAt(0).toUpperCase() +
                      nextLevel?.slice(1)}{" "}
                    Test
                  </>
                )}
              </button>
            )}

            <button
              onClick={onClose}
              style={{
                width: "100%",
                padding: "12px 20px",
                fontSize: "14px",
                fontWeight: "500",
                borderRadius: "10px",
                backgroundColor: "#f8fafc",
                color: "#64748b",
                border: "2px solid #e2e8f0",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#f1f5f9";
                e.currentTarget.style.borderColor = "#cbd5e1";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#f8fafc";
                e.currentTarget.style.borderColor = "#e2e8f0";
              }}
            >
              {isMaxLevel ? "Close" : "Maybe Later"}
            </button>
          </div>
        </div>

        {/* Floating decorative elements */}
        <div
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            width: "6px",
            height: "6px",
            backgroundColor: currentConfig.color,
            borderRadius: "50%",
            opacity: 0.6,
            animation: "pulse 2s infinite",
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            left: "20px",
            width: "4px",
            height: "4px",
            backgroundColor: nextConfig?.color || currentConfig.color,
            borderRadius: "50%",
            opacity: 0.4,
            animation: "pulse 3s infinite",
          }}
        ></div>

        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 0.4; }
            50% { opacity: 0.8; }
          }
        `}</style>
      </div>
    </div>
  );
};

export default UpgradeLevelModal;
