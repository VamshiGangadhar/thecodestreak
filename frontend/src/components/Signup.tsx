import { useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { supabase } from "../supabaseClient";
import BrandHeader from "./BrandHeader";

interface FormState {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  displayName: string;
}

export default function Signup() {
  const [form, setForm] = useState<FormState>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    displayName: "",
  });
  const [message, setMessage] = useState<string>("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    const userId = data.user?.id;
    if (userId) {
      const { error: profileError } = await supabase.from("profiles").insert({
        id: userId,
        first_name: form.firstName,
        last_name: form.lastName,
        email: form.email,
        display_name: form.displayName,
      });

      if (profileError) {
        setMessage(profileError.message);
        return;
      }

      setMessage("Signup successful! Check your email.");
    }
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
          {/* Logo and Header */}
          <div className="text-center mb-4">
            <div className="mb-3">
              <BrandHeader as="span" />
            </div>
            <h2 className="h4 fw-semibold text-dark mb-1">Sign up</h2>
            <p className="text-muted small mb-0">
              Create your account to get started
            </p>
          </div>

          {/* Message */}
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

          {/* Form */}
          <Form onSubmit={handleSignup}>
            <FormGroup className="mb-3">
              <Label
                for="firstName"
                className="form-label fw-semibold text-dark"
              >
                First Name
              </Label>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="First Name"
                className="form-control py-2"
                value={form.firstName}
                onChange={(e) =>
                  setForm({ ...form, firstName: e.target.value })
                }
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
                for="lastName"
                className="form-label fw-semibold text-dark"
              >
                Last Name
              </Label>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Last Name"
                className="form-control py-2"
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
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
                for="displayName"
                className="form-label fw-semibold text-dark"
              >
                Display Name
              </Label>
              <Input
                id="displayName"
                name="displayName"
                type="text"
                placeholder="Display Name"
                className="form-control py-2"
                value={form.displayName}
                onChange={(e) =>
                  setForm({ ...form, displayName: e.target.value })
                }
                required
                style={{
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  fontSize: "14px",
                }}
              />
            </FormGroup>
            <FormGroup className="mb-3">
              <Label for="email" className="form-label fw-semibold text-dark">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="your@email.com"
                className="form-control py-2"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
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
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                className="form-control py-2"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                style={{
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  fontSize: "14px",
                }}
              />
            </FormGroup>
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
              Sign up
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

          {/* Sign in link */}
          <div className="text-center">
            <span className="text-muted small">
              Already have an account?{" "}
              <a
                href="/signin"
                className="text-decoration-none fw-semibold"
                style={{ color: "#4F46E5" }}
              >
                Sign in
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
