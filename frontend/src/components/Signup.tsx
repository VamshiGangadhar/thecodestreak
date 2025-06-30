import { useState } from "react";
import { Button, Form, FormGroup, Input, Label, Row, Col } from "reactstrap";
import { supabase } from "../supabaseClient";

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
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", width: "100vw" }}
    >
      <div className="p-4 bg-white rounded" style={{ width: "360px" }}>
        <div className="text-center mb-3">
          <img
            src="/logo192.png"
            alt="thecodestreak"
            style={{ width: "24px", height: "24px" }}
          />
          <h4 className="mt-2 fw-semibold">Sign up</h4>
        </div>

        <Form onSubmit={handleSignup}>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="firstName" className="small fw-semibold">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="First"
                  value={form.firstName}
                  onChange={(e) =>
                    setForm({ ...form, firstName: e.target.value })
                  }
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="lastName" className="small fw-semibold">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Last"
                  value={form.lastName}
                  onChange={(e) =>
                    setForm({ ...form, lastName: e.target.value })
                  }
                />
              </FormGroup>
            </Col>
          </Row>

          <FormGroup>
            <Label for="displayName" className="small fw-semibold">
              Display Name
            </Label>
            <Input
              id="displayName"
              type="text"
              placeholder="Display Name"
              value={form.displayName}
              onChange={(e) =>
                setForm({ ...form, displayName: e.target.value })
              }
            />
          </FormGroup>

          <FormGroup>
            <Label for="email" className="small fw-semibold">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </FormGroup>

          <FormGroup>
            <Label for="password" className="small fw-semibold">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </FormGroup>

          <Button color="dark" block className="w-100 mt-2">
            Sign up
          </Button>

          {message && (
            <p className="text-center mt-2 small text-danger">{message}</p>
          )}

          <div className="text-center mt-3 small">
            Already have an account? <a href="/signin">Sign in</a>
          </div>
        </Form>
      </div>
    </div>
  );
}
