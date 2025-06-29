import React, { useEffect, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  Spinner,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import AvatarDropdown from "../AvatarDropdown";

function NavigationBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [avatarAvailable, setAvatarAvailable] = useState<boolean | null>(null);
  const [isDark, setIsDark] = useState<boolean>(
    () => localStorage.getItem("theme") === "dark"
  );
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    const fetchAvatar = async () => {
      const { data } = await supabase.storage
        .from("avatars")
        .createSignedUrl("user123.jpg", 3600);
      if (data?.signedUrl) {
        setAvatarUrl(data.signedUrl);
        setAvatarAvailable(true);
      } else {
        setAvatarAvailable(false);
      }
    };
    fetchAvatar();
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user || null);
    });
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      }
    );
    return () => listener?.subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
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

  console.log("User:", user);
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
        thecodestreak
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

          {/* Theme Toggle */}
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

          {/* Avatar Dropdown - Using your new component */}
          <div className="ms-2">
            {avatarAvailable === null ? (
              <Spinner size="sm" />
            ) : (
              <AvatarDropdown
                imagePath={user?.user_metadata?.avatar_url}
                userName={user?.user_metadata?.name || "Guest"}
                userEmail={user?.email || ""}
                isLoggedIn={!!user}
                onLogout={handleLogout}
                onLogin={handleLogin}
              />
            )}
          </div>
        </Nav>
      </Collapse>
    </Navbar>
  );
}

export default NavigationBar;
