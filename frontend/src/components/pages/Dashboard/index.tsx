import React, { useState } from "react";
import {
  Trophy,
  Flame,
  Code,
  PlayCircle,
  BarChart3,
  BookOpen,
  Settings,
} from "lucide-react";
import { useUser } from "../../../context/UserContext";
import UpgradeLevelModal from "../../UpgradeLevelModal";
import { LEVELS } from "../../../constants/levels";

interface UserData {
  id: string;
  first_name: string;
  last_name: string;
  display_name: string;
  created_at: string;
  email: string;
  avatar_url: string | null;
  level: string;
  points: number;
  streak: number;
}

const Dashboard = () => {
  const { user } = useUser();
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [testTakenToday, setTestTakenToday] = useState(false); // Placeholder for daily test logic

  const currentLevel = user?.level || LEVELS[0];

  const dsaStats = {
    problems_solved: 0,
    total_problems: 500,
    weekly_goal: 10,
    current_topic: "Arrays & Strings",
    preferred_difficulty: "Easy",
    study_time_today: 0,
    rank: 12450,
    certificates: 0,
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const progressPercentage =
    (dsaStats.problems_solved / dsaStats.total_problems) * 100;

  const containerStyle: React.CSSProperties = {
    minHeight: "100vh",
    backgroundColor: "#f8fafc",
    padding: "80px",
    fontFamily: "system-ui, -apple-system, sans-serif",
    width: "100vw", // Use only available width
    boxSizing: "border-box",
  };

  const headerStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "32px",
    flexWrap: "wrap",
    gap: "16px",
  };

  const titleStyle: React.CSSProperties = {
    fontSize: "32px",
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: "8px",
  };

  const subtitleStyle: React.CSSProperties = {
    color: "#6b7280",
    fontSize: "16px",
  };

  const buttonStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "12px 16px",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: "white",
    borderRadius: "12px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    border: "1px solid #e5e7eb",
    overflow: "hidden",
  };

  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "24px",
    marginBottom: "32px",
  };

  const wideGridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "24px",
  };

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <div>
          <h1 style={titleStyle}>DSA Mastery Hub</h1>
          <p style={subtitleStyle}>
            Code your way to success, one algorithm at a time
          </p>
        </div>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <button
            style={{
              ...buttonStyle,
              backgroundColor: "white",
              color: "#374151",
              border: "1px solid #d1d5db",
            }}
          >
            <Settings size={16} />
            Settings
          </button>
          <button style={buttonStyle}>
            <PlayCircle size={16} />
            Start Coding
          </button>
        </div>
      </div>

      {user && (
        <div style={gridStyle}>
          <div style={cardStyle}>
            <div
              style={{
                background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
                padding: "24px",
                color: "white",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "16px" }}
              >
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                >
                  {getInitials(user.first_name, user.last_name)}
                </div>
                <div style={{ flex: 1 }}>
                  <h2
                    style={{
                      fontSize: "24px",
                      fontWeight: "bold",
                      margin: "0 0 4px 0",
                    }}
                  >
                    {user.display_name}
                  </h2>
                  <p
                    style={{
                      color: "rgba(255, 255, 255, 0.8)",
                      fontSize: "14px",
                      margin: "0 0 8px 0",
                    }}
                  >
                    {user.email}
                  </p>
                  <span
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
                      padding: "4px 12px",
                      borderRadius: "20px",
                      fontSize: "12px",
                      fontWeight: "500",
                      marginRight: "8px",
                    }}
                  >
                    {(user.level ?? "").toUpperCase()}
                  </span>
                  <button
                    style={{
                      background: "#fff",
                      color: "#2563eb",
                      border: "none",
                      borderRadius: "20px",
                      padding: "4px 12px",
                      fontSize: "12px",
                      fontWeight: 500,
                      cursor: "pointer",
                      marginLeft: "4px",
                    }}
                    onClick={() => setShowUpgradeModal(true)}
                  >
                    Upgrade Level
                  </button>
                </div>
              </div>
            </div>

            <div style={{ padding: "24px" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "16px",
                  marginBottom: "16px",
                }}
              >
                <div
                  style={{
                    textAlign: "center",
                    padding: "16px",
                    backgroundColor: "#dbeafe",
                    borderRadius: "12px",
                  }}
                >
                  <Trophy
                    size={32}
                    color="#2563eb"
                    style={{ margin: "0 auto 8px" }}
                  />
                  <p
                    style={{
                      fontSize: "24px",
                      fontWeight: "bold",
                      color: "#2563eb",
                      margin: "0",
                    }}
                  >
                    {user.points}
                  </p>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#6b7280",
                      margin: "4px 0 0 0",
                    }}
                  >
                    Total Points
                  </p>
                </div>
                <div
                  style={{
                    textAlign: "center",
                    padding: "16px",
                    backgroundColor: "#fed7aa",
                    borderRadius: "12px",
                  }}
                >
                  <Flame
                    size={32}
                    color="#ea580c"
                    style={{ margin: "0 auto 8px" }}
                  />
                  <p
                    style={{
                      fontSize: "24px",
                      fontWeight: "bold",
                      color: "#ea580c",
                      margin: "0",
                    }}
                  >
                    {user.streak}
                  </p>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#6b7280",
                      margin: "4px 0 0 0",
                    }}
                  >
                    Day Streak
                  </p>
                </div>
              </div>
              <div
                style={{
                  textAlign: "center",
                  fontSize: "12px",
                  color: "#6b7280",
                }}
              >
                Member since {formatDate(user.created_at)}
              </div>
            </div>
          </div>

          {/* Problems Solved Card */}
          <div style={{ ...cardStyle, padding: "24px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "16px",
              }}
            >
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#1f2937",
                  margin: 0,
                }}
              >
                Problems Solved
              </h3>
              <Code size={20} color="#059669" />
            </div>
            <div style={{ marginBottom: "12px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "8px",
                }}
              >
                <span
                  style={{
                    fontSize: "32px",
                    fontWeight: "bold",
                    color: "#059669",
                  }}
                >
                  {dsaStats.problems_solved}
                </span>
                <span style={{ color: "#6b7280" }}>
                  / {dsaStats.total_problems}
                </span>
              </div>
              <div
                style={{
                  width: "100%",
                  backgroundColor: "#e5e7eb",
                  borderRadius: "6px",
                  height: "8px",
                }}
              >
                <div
                  style={{
                    width: `${progressPercentage}%`,
                    backgroundColor: "#059669",
                    height: "8px",
                    borderRadius: "6px",
                    transition: "width 0.5s ease",
                  }}
                ></div>
              </div>
              <p
                style={{
                  fontSize: "14px",
                  color: "#6b7280",
                  margin: "8px 0 0 0",
                }}
              >
                {progressPercentage.toFixed(1)}% Complete
              </p>
            </div>
          </div>

          {/* Global Rank Card */}
          <div style={{ ...cardStyle, padding: "24px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "16px",
              }}
            >
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#1f2937",
                  margin: 0,
                }}
              >
                Global Rank
              </h3>
              <BarChart3 size={20} color="#7c3aed" />
            </div>
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: "32px",
                  fontWeight: "bold",
                  color: "#7c3aed",
                  marginBottom: "8px",
                }}
              >
                #{dsaStats.rank.toLocaleString()}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  marginBottom: "8px",
                }}
              >
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    backgroundColor: "#10b981",
                    borderRadius: "50%",
                  }}
                ></div>
                <span style={{ fontSize: "14px", color: "#6b7280" }}>
                  Active learner
                </span>
              </div>
              <p style={{ fontSize: "12px", color: "#9ca3af", margin: 0 }}>
                Keep solving to climb up!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Upgrade Level Modal */}
      <UpgradeLevelModal
        currentLevel={currentLevel}
        show={showUpgradeModal}
        testTakenToday={testTakenToday}
        onClose={() => setShowUpgradeModal(false)}
        onTakeTest={() => {
          setTestTakenToday(true);
          alert("Test started! (Placeholder)");
          setShowUpgradeModal(false);
        }}
        buttonStyle={buttonStyle}
      />

      {/* Study Stats Card */}
      {/* Study Plan (Greyed out, Coming Soon) */}
      <div
        style={{
          ...cardStyle,
          padding: "24px",
          backgroundColor: "#f3f4f6",
          opacity: 0.6,
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "24px",
          }}
        >
          <h3
            style={{
              fontSize: "20px",
              fontWeight: "600",
              color: "#6b7280",
              margin: 0,
            }}
          >
            30-Day Study Plan
          </h3>
          <BookOpen size={20} color="#6b7280" />
        </div>

        <div style={wideGridStyle}>
          {[
            {
              week: "Week 1",
              topic: "Arrays & Basic Algorithms",
              status: "current",
            },
            {
              week: "Week 2",
              topic: "Strings & Hash Tables",
              status: "upcoming",
            },
            {
              week: "Week 3",
              topic: "Linked Lists & Stacks",
              status: "upcoming",
            },
            {
              week: "Week 4",
              topic: "Trees & Recursion",
              status: "upcoming",
            },
          ].map((plan, index) => (
            <div
              key={index}
              style={{
                padding: "20px",
                border: `2px solid ${
                  plan.status === "current" ? "#2563eb" : "#e5e7eb"
                }`,
                borderRadius: "12px",
                backgroundColor:
                  plan.status === "current" ? "#eff6ff" : "white",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "12px",
                }}
              >
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    backgroundColor:
                      plan.status === "current" ? "#2563eb" : "transparent",
                    border:
                      plan.status === "current" ? "none" : "2px solid #d1d5db",
                    borderRadius: "50%",
                  }}
                ></div>
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: "500",
                    color: plan.status === "current" ? "#2563eb" : "#6b7280",
                  }}
                >
                  {plan.week}
                </span>
              </div>
              <h4
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#1f2937",
                  margin: "0 0 12px 0",
                }}
              >
                {plan.topic}
              </h4>
              {plan.status === "current" && (
                <button
                  style={{
                    ...buttonStyle,
                    width: "100%",
                    justifyContent: "center",
                    fontSize: "14px",
                  }}
                >
                  Start Now
                </button>
              )}
            </div>
          ))}
        </div>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <span
            style={{
              background: "#6b7280",
              color: "white",
              padding: "8px 24px",
              borderRadius: "20px",
              fontWeight: 600,
              fontSize: "18px",
              opacity: 0.95,
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
          >
            Coming Soon
          </span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
