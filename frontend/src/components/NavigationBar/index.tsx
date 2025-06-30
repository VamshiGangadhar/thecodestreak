import React, { useEffect, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import AvatarDropdown from "../AvatarDropdown";
import { useUser } from "../../context/UserContext";
import { APPLICATION_NAME } from "../../constants/constants";

function NavigationBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState<boolean>(
    () => localStorage.getItem("theme") === "dark"
  );
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  const handleLogout = async () => {
    await logout();
    navigate("/signin");
  };

  const handleLogin = () => navigate("/signin");

  const navItems = [
    { name: "Home", href: "/home" },
    { name: "Daily Challenge", href: "/dailyChallenge" },
    { name: "Discuss", href: "/discuss" },
    { name: "Practice", href: "/practice" },
    { name: "Dashboard", href: "/dashboard" },
  ];

  return (
    <Navbar
      expand="lg"
      fixed="top"
      className={`w-100 border-bottom shadow-sm px-4 py-2 transition-all ${
        isDark ? "navbar-dark bg-dark" : "navbar-light bg-light"
      }`}
      style={{ backdropFilter: "blur(6px)" }}
    >
      <NavbarBrand href="/" className="fs-4 fw-bold">
        {APPLICATION_NAME}
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav navbar className="ms-auto align-items-center gap-3">
          {navItems.map((item) => (
            <NavItem key={item.href}>
              <NavLink
                href={item.href}
                className={`px-2 fw-medium ${
                  isDark ? "text-light" : "text-dark"
                }`}
              >
                {item.name}
              </NavLink>
            </NavItem>
          ))}

          <div
            role="button"
            onClick={() => setIsDark(!isDark)}
            title="Toggle Theme"
            className={`d-flex align-items-center justify-center rounded-circle p-2 transition-all ${
              isDark ? "text-light bg-secondary" : "text-dark bg-light"
            }`}
            style={{
              cursor: "pointer",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              transition: "all 0.3s ease",
            }}
          >
            {isDark ? <LightModeIcon /> : <DarkModeIcon />}
          </div>

          <div className="ms-2">
            <AvatarDropdown
              imagePath={user?.avatar_url || ""}
              userName={user?.display_name || user?.first_name || "Guest"}
              userEmail={user?.email || ""}
              isLoggedIn={!!user}
              onLogout={handleLogout}
              onLogin={handleLogin}
            />
          </div>
        </Nav>
      </Collapse>
    </Navbar>
  );
}

export default NavigationBar;
