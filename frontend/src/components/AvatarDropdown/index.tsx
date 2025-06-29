import React, { useState, useRef, useEffect } from "react";
import { User, LogOut } from "lucide-react";

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
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        event.target &&
        !dropdownRef.current.contains(event.target as Element)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMenuClick = (action: string) => {
    setIsOpen(false);

    switch (action) {
      case "logout":
        onLogout?.();
        break;
      case "login":
        onLogin?.();
        break;
      case "dashboard":
        onNavigate?.("/dashboard");
        break;
      default:
        break;
    }
  };

  return (
    <div className="position-relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="btn p-0 border-0 bg-transparent"
        style={{
          width: "42px",
          height: "42px",
          borderRadius: "50%",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f8f9fa",
          transition: "all 0.2s ease",
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
          <User size={24} color="#6c757d" />
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="position-absolute bg-white border rounded shadow-lg"
          style={{
            right: 0,
            top: "100%",
            marginTop: "8px",
            width: "320px",
            zIndex: 1050,
            overflow: "hidden",
          }}
        >
          <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
            <small className="text-muted">Account</small>
            <button
              onClick={() => setIsOpen(false)}
              className="btn btn-sm p-0 border-0 bg-transparent text-muted"
              style={{ fontSize: "20px", lineHeight: 1 }}
            >
              ×
            </button>
          </div>

          <div className="p-4 text-center">
            <div
              className="mx-auto mb-3 d-flex align-items-center justify-content-center bg-light rounded-circle"
              style={{
                width: "80px",
                height: "80px",
                overflow: "hidden",
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
                <User size={40} color="#6c757d" />
              )}
            </div>
            <h6 className="mb-1 fw-medium">Hi, {userName}!</h6>
            {userEmail && <p className="text-muted small mb-3">{userEmail}</p>}

            {isLoggedIn && (
              <button
                onClick={() => handleMenuClick("dashboard")}
                className="btn btn-outline-secondary btn-sm rounded-pill px-3"
              >
                Go to Dashboard
              </button>
            )}
          </div>

          <div className="border-top p-3 d-flex justify-content-center">
            {isLoggedIn ? (
              <button
                onClick={() => handleMenuClick("logout")}
                className="btn btn-outline-danger btn-sm d-flex align-items-center gap-2"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            ) : (
              <button
                onClick={() => handleMenuClick("login")}
                className="btn btn-outline-primary btn-sm d-flex align-items-center gap-2"
              >
                <User size={16} />
                <span>Login</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AvatarDropdown;
