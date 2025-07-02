import React, { useState, useEffect } from "react";
import {
  Calendar,
  Code,
  Trophy,
  Flame,
  Clock,
  Target,
  TrendingUp,
  Award,
  PlayCircle,
  ChevronRight,
  Zap,
  Star,
  CheckCircle2,
  BarChart3,
} from "lucide-react";
import { useUser } from "../../../context/UserContext";

// Challenge type definition
type Challenge = {
  id: number;
  title: string;
  description: string;
  difficulty: keyof typeof difficultyConfig;
  points: number;
  timeEstimate: string;
  solved: boolean;
  category: string;
};

// Mock challenge data
const mockChallenges: Challenge[] = [
  {
    id: 1,
    title: "Reverse a String",
    description: "Given a string, reverse the order of characters.",
    difficulty: "Easy",
    points: 10,
    timeEstimate: "5-10 min",
    solved: false,
    category: "String Manipulation",
  },
  {
    id: 2,
    title: "Find the Maximum Subarray Sum",
    description:
      "Given an array of integers, find the contiguous subarray with the largest sum.",
    difficulty: "Medium",
    points: 25,
    timeEstimate: "15-20 min",
    solved: false,
    category: "Dynamic Programming",
  },
  {
    id: 3,
    title: "Merge K Sorted Lists",
    description: "Merge k sorted linked lists into one sorted linked list.",
    difficulty: "Hard",
    points: 50,
    timeEstimate: "25-35 min",
    solved: false,
    category: "Linked Lists",
  },
];

const difficultyConfig = {
  Easy: { color: "#059669", bgColor: "#ecfdf5", borderColor: "#059669" },
  Medium: { color: "#d97706", bgColor: "#fffbeb", borderColor: "#d97706" },
  Hard: { color: "#dc2626", bgColor: "#fef2f2", borderColor: "#dc2626" },
};

const DailyChallenge = () => {
  const { user } = useUser(); // Assuming you have a user context
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);

  // Use user context directly for available fields, and fallback to mock for only the missing ones
  const questionsToday = 2; // fallback mock
  const totalQuestions = 15; // fallback mock
  const dailyGoal = 3; // fallback mock

  const containerStyle: React.CSSProperties = {
    minHeight: "100vh",
    width: "100vw", // Use full viewport width
    backgroundColor: "#f8fafc",
    paddingTop: "100px", // Account for fixed navbar
    paddingBottom: "40px",
    fontFamily: "system-ui, -apple-system, sans-serif",
  };

  const contentStyle: React.CSSProperties = {
    width: "100vw", // Use full viewport width
    minHeight: "100vh",
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center", // Center all children horizontally
    backgroundColor: "#f8fafc",
  };

  const headerStyle: React.CSSProperties = {
    marginBottom: "48px",
  };

  const titleStyle: React.CSSProperties = {
    fontSize: "48px",
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: "12px",
    letterSpacing: "-1px",
  };

  const subtitleStyle: React.CSSProperties = {
    fontSize: "18px",
    color: "#6b7280",
    marginBottom: "0",
    lineHeight: "1.6",
  };

  const statsGridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "24px",
    marginBottom: "48px",
    width: "100%",
    maxWidth: "1400px",
  };

  const challengesGridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
    gap: "24px",
    marginBottom: "48px",
    width: "100%",
    maxWidth: "1400px",
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: "white",
    borderRadius: "12px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    border: "1px solid #e5e7eb",
    overflow: "hidden",
  };

  type StatCardProps = {
    icon: React.ElementType;
    title: string;
    value: string | number;
    subtitle?: string;
    iconColor: string;
    bgColor: string;
  };

  const StatCard = ({
    icon: Icon,
    title,
    value,
    subtitle,
    iconColor,
    bgColor,
  }: StatCardProps) => (
    <div style={cardStyle}>
      <div style={{ padding: "24px" }}>
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
            {title}
          </h3>
          <Icon size={20} color={iconColor} />
        </div>

        <div
          style={{
            textAlign: "center",
            padding: "16px",
            backgroundColor: bgColor,
            borderRadius: "12px",
            marginBottom: "12px",
          }}
        >
          <div
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              color: iconColor,
              marginBottom: "4px",
            }}
          >
            {value}
          </div>
          {subtitle && (
            <p
              style={{
                fontSize: "12px",
                color: "#6b7280",
                margin: 0,
              }}
            >
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );

  type Challenge = {
    id: number;
    title: string;
    description: string;
    difficulty: keyof typeof difficultyConfig;
    points: number;
    timeEstimate: string;
    solved: boolean;
    category: string;
  };

  const ChallengeCard = ({ challenge }: { challenge: Challenge }) => {
    const diffConfig = difficultyConfig[challenge.difficulty];

    return (
      <div
        style={{
          ...cardStyle,
          cursor: "pointer",
          transition: "all 0.2s ease",
          position: "relative",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.1)";
        }}
        onClick={() => setSelectedChallenge(challenge)}
      >
        {/* Header */}
        <div
          style={{
            background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
            padding: "24px",
            color: "white",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "12px",
            }}
          >
            <span
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                padding: "4px 12px",
                borderRadius: "20px",
                fontSize: "12px",
                fontWeight: "500",
              }}
            >
              {challenge.category}
            </span>
            <span
              style={{
                backgroundColor: diffConfig.bgColor,
                color: diffConfig.color,
                padding: "4px 12px",
                borderRadius: "20px",
                fontSize: "12px",
                fontWeight: "600",
              }}
            >
              {challenge.difficulty}
            </span>
          </div>

          <h3
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              margin: "0 0 8px 0",
              lineHeight: "1.3",
            }}
          >
            {challenge.title}
          </h3>

          <p
            style={{
              fontSize: "14px",
              color: "rgba(255, 255, 255, 0.8)",
              margin: 0,
              lineHeight: "1.4",
            }}
          >
            {challenge.description}
          </p>
        </div>

        {/* Content */}
        <div style={{ padding: "24px" }}>
          {/* Stats */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                textAlign: "center",
                padding: "12px",
                backgroundColor: "#dbeafe",
                borderRadius: "8px",
              }}
            >
              <Trophy
                size={20}
                color="#2563eb"
                style={{ margin: "0 auto 4px" }}
              />
              <p
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "#2563eb",
                  margin: "0 0 2px 0",
                }}
              >
                {challenge.points}
              </p>
              <p
                style={{
                  fontSize: "12px",
                  color: "#6b7280",
                  margin: 0,
                }}
              >
                Points
              </p>
            </div>

            <div
              style={{
                textAlign: "center",
                padding: "12px",
                backgroundColor: "#f3e8ff",
                borderRadius: "8px",
              }}
            >
              <Clock
                size={20}
                color="#7c3aed"
                style={{ margin: "0 auto 4px" }}
              />
              <p
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "#7c3aed",
                  margin: "0 0 2px 0",
                }}
              >
                {challenge.timeEstimate.split("-")[0]}
              </p>
              <p
                style={{
                  fontSize: "12px",
                  color: "#6b7280",
                  margin: 0,
                }}
              >
                Minutes
              </p>
            </div>
          </div>

          {/* Solve Button */}
          <button
            style={{
              width: "100%",
              padding: "12px 16px",
              backgroundColor: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: "500",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#1d4ed8";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#2563eb";
            }}
          >
            <PlayCircle size={16} />
            Solve
          </button>
        </div>
      </div>
    );
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        {/* Header */}
        <div style={{ ...headerStyle, width: "100%", maxWidth: "1400px" }}>
          <h1 style={titleStyle}>Daily Challenge</h1>
          <p style={subtitleStyle}>
            Solve at least one question to maintain your streak and level up
            your coding skills
          </p>
        </div>

        {/* Stats Grid */}
        <div style={statsGridStyle}>
          <StatCard
            icon={Flame}
            title="Streak"
            value={user?.streak ?? 0}
            subtitle="days in a row"
            iconColor="#ea580c"
            bgColor="#fed7aa"
          />
          <StatCard
            icon={CheckCircle2}
            title="Questions Solved"
            value={questionsToday}
            subtitle={`out of ${dailyGoal} daily goal`}
            iconColor="#059669"
            bgColor="#dcfce7"
          />
          <StatCard
            icon={TrendingUp}
            title="Total Solved"
            value={totalQuestions}
            subtitle="all time"
            iconColor="#7c3aed"
            bgColor="#ede9fe"
          />
          <StatCard
            icon={Award}
            title="Level"
            value={user?.level ?? "Intermediate"}
            subtitle={`${user?.points ?? 0} points earned`}
            iconColor="#2563eb"
            bgColor="#dbeafe"
          />
        </div>

        {/* Today's Questions Section */}
        <div
          style={{ marginBottom: "32px", width: "100%", maxWidth: "1400px" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "32px",
            }}
          >
            <h2
              style={{
                fontSize: "32px",
                fontWeight: "bold",
                color: "#1f2937",
                margin: 0,
              }}
            >
              Today's Questions
            </h2>
          </div>

          <div style={challengesGridStyle}>
            {mockChallenges.map((challenge) => (
              <ChallengeCard key={challenge.id} challenge={challenge} />
            ))}
          </div>
        </div>

        {/* Progress Section */}
        <div
          style={{
            ...cardStyle,
            padding: "32px",
            textAlign: "center",
            width: "100%",
            maxWidth: "1400px",
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
                color: "#1f2937",
                margin: 0,
              }}
            >
              Daily Progress
            </h3>
            <BarChart3 size={20} color="#059669" />
          </div>

          <div style={{ marginBottom: "16px" }}>
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
                  fontSize: "14px",
                  color: "#6b7280",
                }}
              >
                Progress to daily goal
              </span>
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#1f2937",
                }}
              >
                {questionsToday} / {dailyGoal}
              </span>
            </div>

            <div
              style={{
                width: "100%",
                height: "8px",
                backgroundColor: "#e5e7eb",
                borderRadius: "6px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${(questionsToday / dailyGoal) * 100}%`,
                  height: "100%",
                  backgroundColor: "#059669",
                  borderRadius: "6px",
                  transition: "width 0.5s ease",
                }}
              ></div>
            </div>
          </div>

          <p
            style={{
              fontSize: "14px",
              color: "#6b7280",
              margin: 0,
            }}
          >
            Complete {dailyGoal - questionsToday} more challenge
            {dailyGoal - questionsToday !== 1 ? "s" : ""} today to maintain your
            streak!
          </p>
        </div>
      </div>
    </div>
  );
};

export default DailyChallenge;
