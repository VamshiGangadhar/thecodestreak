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
import { supabase } from "../../supabaseClient";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

function NavigationBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [avatarAvailable, setAvatarAvailable] = useState<boolean | null>(null);
  const [isDark, setIsDark] = useState<boolean>(
    () => localStorage.getItem("theme") === "dark"
  );

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

  return (
    <Navbar
      expand="lg"
      fixed="top"
      className={`w-100 border-bottom shadow-sm px-3 ${
        isDark ? "navbar-dark bg-dark" : "navbar-light bg-light"
      }`}
    >
      <NavbarBrand href="/">thecodestreak</NavbarBrand>
      <NavbarToggler onClick={toggle} />

      <Collapse isOpen={isOpen} navbar>
        <Nav navbar className="ms-auto d-flex align-items-center gap-3">
          {["/home", "/dailyChallenge", "/discuss", "/practice"].map(
            (href, i) => (
              <NavItem key={href}>
                <NavLink href={href} className={isDark ? "text-light" : ""}>
                  {["Home", "Daily Challenge", "Discuss", "Practice"][i]}
                </NavLink>
              </NavItem>
            )
          )}

          {/* Theme Toggle */}
          <div
            role="button"
            onClick={() => setIsDark(!isDark)}
            title="Toggle Theme"
            className={`d-flex align-items-center ${
              isDark ? "text-light" : "text-dark"
            }`}
          >
            {isDark ? <LightModeIcon /> : <DarkModeIcon />}
          </div>

          <div className="d-flex align-items-center">
            {avatarAvailable === null ? (
              <Spinner size="sm" />
            ) : avatarAvailable ? (
              <img
                src={avatarUrl!}
                alt="User Avatar"
                className="rounded-circle"
                style={{ width: "40px", height: "40px", objectFit: "cover" }}
              />
            ) : (
              <AccountCircleIcon
                fontSize="large"
                className={isDark ? "text-light" : "text-dark"}
              />
            )}
          </div>
        </Nav>
      </Collapse>
    </Navbar>
  );
}

export default NavigationBar;
