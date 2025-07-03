import React from "react";

const brandStyle: React.CSSProperties = {
  fontSize: "24px",
  fontWeight: 800,
  background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  textDecoration: "none",
  letterSpacing: "-0.5px",
  cursor: "pointer",
  display: "inline-block",
};

interface BrandHeaderProps {
  as?: React.ElementType;
  style?: React.CSSProperties;
  className?: string;
  onClick?: () => void;
}

const BrandHeader: React.FC<BrandHeaderProps> = ({
  as: Tag = "span",
  style = {},
  className = "",
  onClick,
}) => {
  const Component = Tag as React.ElementType;
  return (
    <Component
      style={{ ...brandStyle, ...style }}
      className={className}
      onClick={onClick}
    >
      TheCodeStreak
    </Component>
  );
};

export default BrandHeader;
