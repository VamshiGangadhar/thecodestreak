import React from "react";

const ResponsiveContainer = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      width: "100vw",
      padding: "0 clamp(20px, 5vw, 80px)",
      boxSizing: "border-box",
    }}
  >
    {children}
  </div>
);

export default ResponsiveContainer;
