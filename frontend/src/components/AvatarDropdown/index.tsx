import React, { useState, useRef, useEffect } from "react";
import {
  User,
  LogOut,
  Settings,
  BarChart3,
  ChevronRight,
  Sparkles,
} from "lucide-react";

interface AvatarDropdownProps {
  imagePath?: string | null;
  userName?: string;
  userEmail?: string;
  onLogout?: () => void;
  onLogin?: () => void;
  onNavigate?: (path: string) => void;
  isLoggedIn?: boolean;
}

const AvatarDropdown: React.FC<AvatarDropdownProps> = ({
  imagePath = null,
  userName = "Guest",
  userEmail = "",
  onLogout,
  onLogin,
  onNavigate,
  isLoggedIn = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        event.target &&
        !dropdownRef.current.contains(event.target as Element)
      ) {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(() => setAnimateIn(true), 10);
  };

  const handleClose = () => {
    setAnimateIn(false);
    setTimeout(() => setIsOpen(false), 200);
  };

  const handleMenuClick = (action: string) => {
    handleClose();

    setTimeout(() => {
      switch (action) {
        case "logout":
          onLogout?.();
          break;
        case "login":
          if (onLogin) {
            onLogin();
          } else {
            onNavigate?.("/signin");
          }
          break;
        case "dashboard":
          onNavigate?.("/dashboard");
          break;
        case "settings":
          onNavigate?.("/settings");
          break;
        default:
          break;
      }
    }, 150);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const avatarStyle: React.CSSProperties = {
    width: "44px",
    height: "44px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: imagePath
      ? "none"
      : "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
    color: "white",
    fontWeight: "600",
    fontSize: "16px",
    cursor: "pointer",
    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    border: "2px solid rgba(255, 255, 255, 0.2)",
    boxShadow: "0 4px 16px rgba(37, 99, 235, 0.2)",
    overflow: "hidden",
    position: "relative",
  };

  const overlayStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(2px)",
    zIndex: 998,
    opacity: animateIn ? 1 : 0,
    transition: "all 0.2s ease",
  };

  const dropdownStyle: React.CSSProperties = {
    position: "absolute",
    right: 0,
    top: "calc(100% + 8px)",
    width: "340px",
    background: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(20px)",
    borderRadius: "20px",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1), 0 8px 24px rgba(0, 0, 0, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    zIndex: 999,
    overflow: "hidden",
    transform: animateIn
      ? "translateY(0) scale(1)"
      : "translateY(-10px) scale(0.95)",
    opacity: animateIn ? 1 : 0,
    transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
    transformOrigin: "top right",
  };

  const headerStyle: React.CSSProperties = {
    background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
    padding: "24px",
    borderBottom: "1px solid rgba(226, 232, 240, 0.5)",
    position: "relative",
    overflow: "hidden",
  };

  const avatarLargeStyle: React.CSSProperties = {
    width: "72px",
    height: "72px",
    borderRadius: "18px",
    background: imagePath
      ? "none"
      : "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontWeight: "700",
    fontSize: "24px",
    margin: "0 auto 16px",
    boxShadow: "0 8px 24px rgba(37, 99, 235, 0.3)",
    overflow: "hidden",
    position: "relative",
  };

  const menuItemStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "16px 24px",
    color: "#334155",
    textDecoration: "none",
    fontWeight: "500",
    fontSize: "15px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    borderRadius: "0",
    background: "transparent",
    border: "none",
    width: "100%",
    textAlign: "left",
  };

  interface MenuItemProps {
    icon: React.ComponentType<{ size?: number }>;
    children: React.ReactNode;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    variant?: "default" | "danger";
  }

  const MenuItem: React.FC<MenuItemProps> = ({
    icon: Icon,
    children,
    onClick,
    variant = "default",
  }) => (
    <button
      onClick={onClick}
      style={{
        ...menuItemStyle,
        color: variant === "danger" ? "#dc2626" : "#334155",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor =
          variant === "danger"
            ? "rgba(220, 38, 38, 0.05)"
            : "rgba(241, 245, 249, 0.8)";
        e.currentTarget.style.color =
          variant === "danger" ? "#b91c1c" : "#1e293b";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "transparent";
        e.currentTarget.style.color =
          variant === "danger" ? "#dc2626" : "#334155";
      }}
    >
      <Icon size={18} />
      <span style={{ flex: 1 }}>{children}</span>
      <ChevronRight size={16} opacity={0.5} />
    </button>
  );

  return (
    <>
      <div style={{ position: "relative" }} ref={dropdownRef}>
        <button
          onClick={isOpen ? handleClose : handleOpen}
          style={avatarStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.boxShadow =
              "0 6px 20px rgba(37, 99, 235, 0.3)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow =
              "0 4px 16px rgba(37, 99, 235, 0.2)";
          }}
        >
          {imagePath ? (
            <img
              src={imagePath}
              alt="User Avatar"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          ) : (
            <>
              <div
                style={{
                  position: "absolute",
                  top: "-50%",
                  right: "-50%",
                  width: "200%",
                  height: "200%",
                  background:
                    "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)",
                  transform: "rotate(45deg)",
                  animation: "shimmer 3s infinite",
                }}
              ></div>
              <span style={{ position: "relative", zIndex: 1 }}>
                {getInitials(userName)}
              </span>
              <style>{`
                @keyframes shimmer {
                  0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
                  100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
                }
              `}</style>
            </>
          )}
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <>
            <div style={overlayStyle} onClick={handleClose} />
            <div style={dropdownStyle}>
              {/* Header */}
              <div style={headerStyle}>
                <div
                  style={{
                    position: "absolute",
                    top: "-50%",
                    right: "-50%",
                    width: "200%",
                    height: "200%",
                    background:
                      "radial-gradient(circle, rgba(37, 99, 235, 0.1) 0%, transparent 70%)",
                    pointerEvents: "none",
                  }}
                ></div>

                <div style={avatarLargeStyle}>
                  {imagePath ? (
                    <img
                      src={imagePath}
                      alt="User Avatar"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <span>{getInitials(userName)}</span>
                  )}
                </div>

                <div style={{ textAlign: "center", position: "relative" }}>
                  <h6
                    style={{
                      margin: "0 0 4px 0",
                      fontWeight: "700",
                      fontSize: "18px",
                      color: "#1e293b",
                    }}
                  >
                    Hi, {userName}! 👋
                  </h6>
                  {userEmail && (
                    <p
                      style={{
                        color: "#64748b",
                        fontSize: "14px",
                        margin: 0,
                        opacity: 0.8,
                      }}
                    >
                      {userEmail}
                    </p>
                  )}
                </div>
              </div>

              {/* Menu Items */}
              <div style={{ padding: "8px 0" }}>
                {isLoggedIn ? (
                  <>
                    <MenuItem
                      icon={BarChart3}
                      onClick={() => handleMenuClick("dashboard")}
                    >
                      Dashboard
                    </MenuItem>
                    <MenuItem
                      icon={Settings}
                      onClick={() => handleMenuClick("settings")}
                    >
                      Settings
                    </MenuItem>
                    <div
                      style={{
                        height: "1px",
                        background:
                          "linear-gradient(90deg, transparent 0%, rgba(226, 232, 240, 0.8) 50%, transparent 100%)",
                        margin: "8px 24px",
                      }}
                    ></div>
                    <MenuItem
                      icon={LogOut}
                      onClick={() => handleMenuClick("logout")}
                      variant="danger"
                    >
                      Sign Out
                    </MenuItem>
                  </>
                ) : (
                  <MenuItem
                    icon={User}
                    onClick={() => handleMenuClick("login")}
                  >
                    Sign In
                  </MenuItem>
                )}
              </div>

              {/* Footer */}
              <div
                style={{
                  background:
                    "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)",
                  padding: "16px 24px",
                  borderTop: "1px solid rgba(226, 232, 240, 0.5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
              >
                <Sparkles size={16} color="#2563eb" />
                <span
                  style={{
                    fontSize: "13px",
                    color: "#64748b",
                    fontWeight: "500",
                  }}
                >
                  Powered by TheCodeStreak
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default AvatarDropdown;
