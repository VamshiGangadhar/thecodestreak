import React from "react";
import { Trophy, Clock, PlayCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const difficultyConfig = {
  easy: { color: "#059669", bgColor: "#ecfdf5", borderColor: "#059669" },
  medium: { color: "#d97706", bgColor: "#fffbeb", borderColor: "#d97706" },
  hard: { color: "#dc2626", bgColor: "#fef2f2", borderColor: "#dc2626" },
};

export type Challenge = {
  id: number;
  title: string;
  description: string;
  difficulty: keyof typeof difficultyConfig;
  points: number;
  timeEstimate: string;
  solved: boolean;
  category: string;
};

type ChallengeCardProps = {
  challenge: Challenge;
  setSelectedChallenge?: (challenge: Challenge) => void;
};

const cardStyle: React.CSSProperties = {
  backgroundColor: "white",
  borderRadius: "12px",
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
  border: "1px solid #e5e7eb",
  overflow: "hidden",
};

const ChallengeCard: React.FC<ChallengeCardProps> = ({
  challenge,
  setSelectedChallenge,
}) => {
  const diffConfig = difficultyConfig[challenge.difficulty];
  const navigate = useNavigate();

  return (
    <div
      style={{
        ...cardStyle,
        cursor: setSelectedChallenge ? "pointer" : undefined,
        transition: "all 0.2s ease",
        position: "relative",
      }}
      onMouseEnter={
        setSelectedChallenge
          ? (e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 4px 12px rgba(0, 0, 0, 0.15)";
            }
          : undefined
      }
      onMouseLeave={
        setSelectedChallenge
          ? (e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.1)";
            }
          : undefined
      }
      onClick={
        setSelectedChallenge ? () => setSelectedChallenge(challenge) : undefined
      }
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
            <Clock size={20} color="#7c3aed" style={{ margin: "0 auto 4px" }} />
            <p
              style={{
                fontSize: "16px",
                fontWeight: "bold",
                color: "#7c3aed",
                margin: "0 0 2px 0",
              }}
            >
              {challenge?.timeEstimate?.split("-")[0]}
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
          onClick={() => navigate(`/dailyChallenge/solve/${challenge.id}`)}
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

export default ChallengeCard;
