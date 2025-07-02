import React, { useEffect, useState } from "react";
import {
  Menu,
  X,
  Sun,
  Moon,
  Home,
  Calendar,
  MessageSquare,
  Code,
  BarChart3,
} from "lucide-react";
import AvatarDropdown from "../AvatarDropdown";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const APPLICATION_NAME = "TheCodeStreak";

function NavigationBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState<boolean>(
    () => localStorage.getItem("theme") === "dark"
  );
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    // navigate("/signin");
  };

  const handleLogin = () => {
    navigate("/signin");
  };

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Daily Challenge", href: "/dailyChallenge", icon: Calendar },
    { name: "Discuss", href: "/discuss", icon: MessageSquare },
    { name: "Practice", href: "/practice", icon: Code },
    { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
  ];

  const navbarStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: isDark
      ? scrolled
        ? "rgba(15, 23, 42, 0.9)"
        : "rgba(15, 23, 42, 0.8)"
      : scrolled
      ? "rgba(255, 255, 255, 0.9)"
      : "rgba(255, 255, 255, 0.8)",
    backdropFilter: "blur(16px)",
    borderBottom: isDark
      ? "1px solid rgba(148, 163, 184, 0.1)"
      : "1px solid rgba(226, 232, 240, 0.8)",
    boxShadow: scrolled
      ? "0 4px 20px rgba(0, 0, 0, 0.1)"
      : "0 2px 10px rgba(0, 0, 0, 0.05)",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    padding: "0",
  };

  const containerStyle: React.CSSProperties = {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "0 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "70px",
  };

  const brandStyle: React.CSSProperties = {
    fontSize: "24px",
    fontWeight: "800",
    background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    textDecoration: "none",
    letterSpacing: "-0.5px",
    cursor: "pointer",
  };

  const navLinksStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    listStyle: "none",
    margin: 0,
    padding: 0,
  };

  const mobileMenuStyle: React.CSSProperties = {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    backgroundColor: isDark
      ? "rgba(15, 23, 42, 0.95)"
      : "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(20px)",
    borderBottom: isDark
      ? "1px solid rgba(148, 163, 184, 0.1)"
      : "1px solid rgba(226, 232, 240, 0.8)",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
    borderRadius: "0 0 16px 16px",
    overflow: "hidden",
    transform: isOpen ? "translateY(0)" : "translateY(-10px)",
    opacity: isOpen ? 1 : 0,
    visibility: isOpen ? "visible" : "hidden",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  };

  type NavItem = {
    name: string;
    href: string;
    icon: React.ComponentType<{ size?: number }>;
  };

  const NavLink = ({
    item,
    isMobile = false,
  }: {
    item: NavItem;
    isMobile?: boolean;
  }) => {
    const Icon = item.icon;
    const linkStyle: React.CSSProperties = {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      padding: isMobile ? "16px 24px" : "10px 16px",
      color: isDark ? "#e2e8f0" : "#334155",
      textDecoration: "none",
      fontWeight: "500",
      fontSize: isMobile ? "16px" : "14px",
      borderRadius: isMobile ? "0" : "10px",
      transition: "all 0.2s ease",
      cursor: "pointer",
      position: "relative",
      overflow: "hidden",
    };

    return (
      <a
        href={item.href}
        style={linkStyle}
        onMouseEnter={(e) => {
          if (!isMobile) {
            e.currentTarget.style.backgroundColor = isDark
              ? "rgba(148, 163, 184, 0.1)"
              : "rgba(226, 232, 240, 0.5)";
            e.currentTarget.style.color = isDark ? "#f1f5f9" : "#1e293b";
          }
        }}
        onMouseLeave={(e) => {
          if (!isMobile) {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = isDark ? "#e2e8f0" : "#334155";
          }
        }}
      >
        <Icon size={isMobile ? 20 : 18} />
        <span>{item.name}</span>
      </a>
    );
  };

  const ThemeToggle = ({ isMobile = false }) => {
    const toggleStyle: React.CSSProperties = {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: isMobile ? "48px" : "42px",
      height: isMobile ? "48px" : "42px",
      borderRadius: "12px",
      backgroundColor: isDark
        ? "rgba(148, 163, 184, 0.1)"
        : "rgba(226, 232, 240, 0.8)",
      border: "none",
      cursor: "pointer",
      transition: "all 0.2s ease",
      color: isDark ? "#f1f5f9" : "#334155",
      margin: isMobile ? "16px 24px" : "0",
    };

    return (
      <button
        onClick={() => setIsDark(!isDark)}
        style={toggleStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = isDark
            ? "rgba(148, 163, 184, 0.2)"
            : "rgba(226, 232, 240, 1)";
          e.currentTarget.style.transform = "scale(1.05)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = isDark
            ? "rgba(148, 163, 184, 0.1)"
            : "rgba(226, 232, 240, 0.8)";
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        {isDark ? (
          <Sun size={isMobile ? 22 : 20} />
        ) : (
          <Moon size={isMobile ? 22 : 20} />
        )}
      </button>
    );
  };

  return (
    <nav style={navbarStyle}>
      <div style={containerStyle}>
        {/* Brand */}
        <a href="/" style={brandStyle}>
          {APPLICATION_NAME}
        </a>

        {/* Desktop Navigation */}
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <ul
            style={{
              ...navLinksStyle,
              display: window.innerWidth >= 1024 ? "flex" : "none",
            }}
          >
            {navItems.map((item) => (
              <li key={item.href}>
                <NavLink item={item} />
              </li>
            ))}
          </ul>

          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{ display: window.innerWidth >= 1024 ? "block" : "none" }}
            >
              <ThemeToggle />
            </div>

            <AvatarDropdown
              imagePath={user?.avatar_url || ""}
              userName={user?.display_name || user?.first_name || "Guest"}
              userEmail={user?.email || ""}
              isLoggedIn={!!user}
              onLogout={handleLogout}
              onLogin={handleLogin}
            />

            {/* Mobile Menu Button */}
            <button
              onClick={toggle}
              style={{
                display: window.innerWidth >= 1024 ? "none" : "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "42px",
                height: "42px",
                backgroundColor: "transparent",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                color: isDark ? "#e2e8f0" : "#334155",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = isDark
                  ? "rgba(148, 163, 184, 0.1)"
                  : "rgba(226, 232, 240, 0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div style={mobileMenuStyle}>
        <div style={{ padding: "16px 0" }}>
          {navItems.map((item) => (
            <NavLink key={item.href} item={item} isMobile />
          ))}
          <div
            style={{
              borderTop: isDark
                ? "1px solid rgba(148, 163, 184, 0.1)"
                : "1px solid rgba(226, 232, 240, 0.8)",
              paddingTop: "16px",
              marginTop: "16px",
            }}
          >
            <ThemeToggle isMobile />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavigationBar;
