import { useState } from "react";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import { supabase } from "../supabaseClient"; // Adjust the import path to your setup

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");

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
  };

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      setMessage(error.message);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", width: "100vw" }}
    >
      <div className="p-4 rounded" style={{ width: "320px" }}>
        {/* Logo */}
        <div className="text-center mb-3">
          <img
            src="/logo192.png"
            alt="thecodestreak"
            style={{ width: "24px", height: "24px" }}
          />
          <h4 className="mt-2 fw-semibold">Sign in</h4>
        </div>

        {/* Message */}
        {message && (
          <div className="alert alert-info p-2 text-center small">
            {message}
          </div>
        )}

        {/* Form */}
        <Form onSubmit={handleLogin}>
          <FormGroup>
            <Label for="email" className="small fw-semibold">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              placeholder="your@email.com"
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label for="password" className="small fw-semibold">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormGroup>

          <Button color="dark" block className="w-100 mt-3" type="submit">
            Sign in
          </Button>
        </Form>

        <div className="text-center mt-2">
          <a href="#" className="small text-decoration-none">
            Forgot your password?
          </a>
        </div>

        <div className="text-center my-3">
          <hr />
          <span
            className="position-relative bg-white px-2 small text-muted"
            style={{ top: "-14px" }}
          >
            or
          </span>
        </div>

        <Button
          color="light"
          className="w-100 border d-flex align-items-center justify-content-center gap-2 mb-2"
          onClick={handleGoogleLogin}
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            style={{ width: "20px", height: "20px" }}
          />
          Sign in with Google
        </Button>

        <div className="text-center mt-3 small">
          Don’t have an account? <a href="/signup">Sign up</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
