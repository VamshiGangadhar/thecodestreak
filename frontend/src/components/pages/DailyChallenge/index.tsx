import React, { useState, useEffect } from "react";
import {
  Trophy,
  Flame,
  Clock,
  TrendingUp,
  Award,
  PlayCircle,
  CheckCircle2,
  BarChart3,
} from "lucide-react";
import { useUser } from "../../../context/UserContext";
import { getDailyQuestionsForUser } from "./helper";
import ChallengeCard, { Challenge } from "./components/ChallengeCard";

const difficultyConfig = {
  Easy: { color: "#059669", bgColor: "#ecfdf5", borderColor: "#059669" },
  Medium: { color: "#d97706", bgColor: "#fffbeb", borderColor: "#d97706" },
  Hard: { color: "#dc2626", bgColor: "#fef2f2", borderColor: "#dc2626" },
};

// types for questions q
type Question = {
  questions: {
    id: string | number;
    title: string;
    description: string;
    difficulty: "easy" | "medium" | "hard";
    level: string;
  };
  completed: boolean;
  is_main: boolean;
  assigned_date: string;
};

const DailyChallenge = () => {
  const { user } = useUser();
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(
    null
  );
  const [dailyChallengeQuestions, setDailyChallengeQuestions] = useState<
    Challenge[]
  >([]);

  useEffect(() => {
    if (user?.id) {
      getDailyQuestionsForUser(user.id).then((data) => {
        const parsedData = typeof data === "string" ? JSON.parse(data) : data;

        if (parsedData.daily_questions) {
          const cleanedDailyQuestions = parsedData.daily_questions.map(
            (q: Question) => {
              return {
                id: q.questions.id,
                title: q.questions.title,
                description: q.questions.description,
                difficulty: q.questions.difficulty,
                level: q.questions.level,
                completed: q.completed,
                is_main: q.is_main,
                assigned_date: q.assigned_date,
              };
            }
          );

          console.log("Cleaned Daily Questions:", cleanedDailyQuestions);
          setDailyChallengeQuestions(cleanedDailyQuestions);
        } else {
          console.error("daily_questions is undefined");
        }
      });
    }
  }, [user?.id]);

  const questionsToday = 2;
  const totalQuestions = 15;
  const dailyGoal = 3;

  const containerStyle: React.CSSProperties = {
    minHeight: "100vh",
    width: "100vw",
    backgroundColor: "#f8fafc",
    paddingTop: "100px",
    paddingBottom: "40px",
    fontFamily: "system-ui, -apple-system, sans-serif",
  };

  const contentStyle: React.CSSProperties = {
    width: "100vw",
    minHeight: "100vh",
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
            {dailyChallengeQuestions.map((challenge) => (
              <ChallengeCard
                key={challenge.id}
                challenge={challenge}
                setSelectedChallenge={setSelectedChallenge}
              />
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
