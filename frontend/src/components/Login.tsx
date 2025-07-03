import { useState } from "react";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import BrandHeader from "./BrandHeader";

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Login successful!");
    localStorage.setItem("user", email);
    navigate("/dailyChallenge");
  };

  const handleGoogleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setMessage("");
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    navigate("/dashboard");
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f8fafc",
        zIndex: 10,
      }}
    >
      <div
        className="card shadow-sm border-0 w-100"
        style={{ maxWidth: "400px" }}
      >
        <div className="card-body p-5">
          <div className="text-center mb-4">
            <div className="mb-3">
              <BrandHeader as="span" />
            </div>
            <h2 className="h4 fw-semibold text-dark mb-1">Sign in</h2>
            <p className="text-muted small mb-0">
              Welcome back! Please sign in to your account
            </p>
          </div>

          {message && (
            <div
              className={`alert ${
                message.includes("successful")
                  ? "alert-success"
                  : "alert-danger"
              } py-2 px-3 mb-3`}
            >
              <small>{message}</small>
            </div>
          )}

          <Form onSubmit={handleLogin}>
            <FormGroup className="mb-3">
              <Label for="email" className="form-label fw-semibold text-dark">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                placeholder="your@email.com"
                type="email"
                className="form-control py-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  fontSize: "14px",
                }}
              />
            </FormGroup>

            <FormGroup className="mb-3">
              <Label
                for="password"
                className="form-label fw-semibold text-dark"
              >
                Password
              </Label>
              <div className="position-relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="form-control py-2"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{
                    paddingRight: "2.5rem",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                    fontSize: "14px",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="btn btn-sm position-absolute top-50 end-0 translate-middle-y me-2"
                  style={{
                    background: "none",
                    border: "none",
                    color: "#6b7280",
                    padding: "0.25rem",
                  }}
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <FaEyeSlash size={14} />
                  ) : (
                    <FaEye size={14} />
                  )}
                </button>
              </div>
            </FormGroup>

            <div className="d-flex justify-content-end mb-3">
              <a
                href="#"
                className="text-decoration-none small"
                style={{ color: "#4F46E5", fontSize: "13px" }}
              >
                Forgot your password?
              </a>
            </div>

            <Button
              type="submit"
              className="w-100 py-2 fw-semibold"
              style={{
                backgroundColor: "#4F46E5",
                border: "none",
                borderRadius: "8px",
                fontSize: "14px",
              }}
            >
              Sign in
            </Button>
          </Form>

          {/* Divider */}
          <div className="position-relative my-4">
            <hr className="text-muted" />
            <span
              className="position-absolute top-50 start-50 translate-middle bg-white px-3 text-muted"
              style={{ fontSize: "12px" }}
            >
              or
            </span>
          </div>

          {/* Google Login - Uncomment when ready */}
          {/* <Button
                  onClick={handleGoogleLogin}
                  className="w-100 py-2 d-flex align-items-center justify-content-center gap-2 mb-3"
                  style={{
                    backgroundColor: 'white',
                    border: '1px solid #e2e8f0',
                    color: '#374151',
                    borderRadius: '8px',
                    fontSize: '14px'
                  }}
                >
                  <img
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    alt="Google"
                    style={{ width: "18px", height: "18px" }}
                  />
                  Sign in with Google
                </Button> */}

          {/* Sign up link */}
          <div className="text-center">
            <span className="text-muted small">
              Don't have an account?{" "}
              <a
                href="/signup"
                className="text-decoration-none fw-semibold"
                style={{ color: "#4F46E5" }}
              >
                Sign up
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
