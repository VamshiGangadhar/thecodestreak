import React from "react";
import { Star } from "lucide-react";
import ResponsiveContainer from "./ResponsiveContainer";

interface Testimonial {
  name: string;
  role: string;
  content: string;
  avatar: string;
  rating: number;
}

const TestimonialsSection = ({
  testimonials,
  currentTestimonial,
  setCurrentTestimonial,
}: {
  testimonials: Testimonial[];
  currentTestimonial: number;
  setCurrentTestimonial: (idx: number) => void;
}) => (
  <section
    style={{
      backgroundColor: "#f8fafc",
      padding: "clamp(60px, 10vw, 80px) 0",
    }}
  >
    <ResponsiveContainer>
      <div
        style={{
          textAlign: "center",
          marginBottom: "clamp(60px, 10vw, 80px)",
        }}
      >
        <h2
          style={{
            fontSize: "clamp(32px, 6vw, 48px)",
            fontWeight: "800",
            color: "#1f2937",
            marginBottom: "clamp(16px, 3vw, 24px)",
            letterSpacing: "clamp(-0.5px, -0.1vw, -1px)",
            lineHeight: "1.2",
          }}
        >
          Loved by Developers Worldwide
        </h2>
        <p
          style={{
            fontSize: "clamp(16px, 3vw, 20px)",
            color: "#6b7280",
            maxWidth: "600px",
            margin: "0 auto",
            lineHeight: "1.6",
            padding: "0 clamp(16px, 4vw, 0px)",
          }}
        >
          Join thousands of developers who have transformed their careers with
          TheCodeStreak.
        </p>
      </div>

      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          position: "relative",
        }}
      >
        <div
          style={{
            background: "white",
            borderRadius: "clamp(16px, 3vw, 24px)",
            padding: "clamp(32px, 6vw, 48px)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
            border: "1px solid #e5e7eb",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-50%",
              left: "-50%",
              width: "200%",
              height: "200%",
              background:
                "radial-gradient(circle, rgba(37, 99, 235, 0.03) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          ></div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "clamp(16px, 4vw, 24px)",
              gap: "4px",
            }}
          >
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={24} fill="#fbbf24" color="#fbbf24" />
            ))}
          </div>

          <blockquote
            style={{
              fontSize: "clamp(18px, 4vw, 24px)",
              fontWeight: "500",
              color: "#1f2937",
              lineHeight: "1.6",
              marginBottom: "clamp(24px, 5vw, 32px)",
              fontStyle: "italic",
              position: "relative",
            }}
          >
            "{testimonials[currentTestimonial].content}"
          </blockquote>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "clamp(12px, 3vw, 16px)",
            }}
          >
            <div
              style={{
                width: "clamp(48px, 10vw, 64px)",
                height: "clamp(48px, 10vw, 64px)",
                background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: "700",
                fontSize: "clamp(16px, 3vw, 20px)",
              }}
            >
              {testimonials[currentTestimonial].avatar}
            </div>
            <div style={{ textAlign: "left" }}>
              <div
                style={{
                  fontSize: "clamp(16px, 3vw, 18px)",
                  fontWeight: "600",
                  color: "#1f2937",
                  marginBottom: "4px",
                }}
              >
                {testimonials[currentTestimonial].name}
              </div>
              <div
                style={{
                  fontSize: "clamp(14px, 3vw, 16px)",
                  color: "#6b7280",
                }}
              >
                {testimonials[currentTestimonial].role}
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial indicators */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "12px",
            marginTop: "32px",
          }}
        >
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                border: "none",
                backgroundColor:
                  index === currentTestimonial ? "#2563eb" : "#d1d5db",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>
      </div>
    </ResponsiveContainer>
  </section>
);

export default TestimonialsSection;
