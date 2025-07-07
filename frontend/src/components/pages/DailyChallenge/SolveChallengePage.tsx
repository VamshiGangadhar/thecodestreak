import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import PracticeEditor from "../../practice/PracticeEditor";
import TestCaseList from "../../practice/TestCaseList";
import ResultPanel from "../../practice/ResultPanel";
import { TestCase } from "../../practice/types";
import { LANGUAGES } from "../../practice/static/languageConfiguration";
import { DEFAULT_CODE } from "../../practice/static/defaultCode";
import {
  ChevronDown,
  ChevronUp,
  List,
  CheckCircle,
  ArrowLeftRight,
} from "lucide-react";

// Dummy challenge data for illustration; replace with real data fetching
const dummyChallenge = {
  id: 1,
  title: "Two Sum",
  description:
    "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
  difficulty: "easy",
  points: 100,
  timeEstimate: "15-20",
  solved: false,
  category: "Array",
  testCases: [
    { id: "1", input: "[2,7,11,15], 9", expectedOutput: "[0,1]" },
    { id: "2", input: "[3,2,4], 6", expectedOutput: "[1,2]" },
  ],
  starterCode: "function twoSum(nums, target) {\n  // Your code here\n}",
};

const SolveChallengePage = () => {
  const { id } = useParams();
  // Try to get daily challenges from localStorage/sessionStorage or fallback
  let challenge;
  const stored = window.localStorage.getItem("dailyChallengeQuestions");
  if (stored) {
    const list = JSON.parse(stored);
    challenge = list.find((c: any) => String(c.id) === String(id));
  }
  if (!challenge) challenge = dummyChallenge;

  // Provide starterCode and testCases if missing
  const starterCode = challenge.starterCode || DEFAULT_CODE["javascript"];
  const testCases = Array.isArray(challenge.testCases)
    ? challenge.testCases
    : [];

  const [code, setCode] = useState(starterCode);
  const [selectedLanguage, setSelectedLanguage] = useState(LANGUAGES[0]);
  const [error, setError] = useState("");
  const [testCasesState, setTestCases] = useState<TestCase[]>(testCases);
  const [isRunning, setIsRunning] = useState(false);
  const [passedTests, setPassedTests] = useState(0);
  const [testCasePanelOpen, setTestCasePanelOpen] = useState(true);
  const [activePanel, setActivePanel] = useState<"testcases" | "results">(
    "testcases"
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLeft, setIsLeft] = useState(true); // true: question left, code right
  const [panelWidth, setPanelWidth] = useState(400);
  const [isResizing, setIsResizing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<any>(null);
  const [testCasePanelHeight, setTestCasePanelHeight] = useState(240);
  const [isPanelResizing, setIsPanelResizing] = useState(false);
  const testCasePanelRef = useRef<HTMLDivElement>(null);

  // Resizing logic
  const startResizing = (e: React.MouseEvent) => {
    setIsResizing(true);
    document.body.style.cursor = "col-resize";
  };
  const stopResizing = () => {
    setIsResizing(false);
    document.body.style.cursor = "";
  };
  const resizePanel = (e: MouseEvent) => {
    if (!isResizing || !containerRef.current) return;
    const minWidth = 320;
    const maxWidth = window.innerWidth - 420;
    let newWidth = isLeft
      ? e.clientX - containerRef.current.getBoundingClientRect().left
      : containerRef.current.getBoundingClientRect().right - e.clientX;
    if (newWidth < minWidth) newWidth = minWidth;
    if (newWidth > maxWidth) newWidth = maxWidth;
    setPanelWidth(newWidth);
  };
  React.useEffect(() => {
    if (isResizing) {
      window.addEventListener("mousemove", resizePanel);
      window.addEventListener("mouseup", stopResizing);
    } else {
      window.removeEventListener("mousemove", resizePanel);
      window.removeEventListener("mouseup", stopResizing);
    }
    return () => {
      window.removeEventListener("mousemove", resizePanel);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [isResizing, isLeft]);

  // Panel vertical resizing logic
  const startPanelResizing = (e: React.MouseEvent) => {
    setIsPanelResizing(true);
    document.body.style.cursor = "row-resize";
  };
  const stopPanelResizing = () => {
    setIsPanelResizing(false);
    document.body.style.cursor = "";
  };
  const resizeTestCasePanel = (e: MouseEvent) => {
    if (!isPanelResizing || !testCasePanelRef.current) return;
    const minHeight = 36;
    const maxHeight = 400;
    let newHeight =
      testCasePanelRef.current.getBoundingClientRect().bottom - e.clientY;
    newHeight = testCasePanelOpen
      ? testCasePanelHeight + e.movementY * -1
      : testCasePanelHeight;
    if (newHeight < minHeight) newHeight = minHeight;
    if (newHeight > maxHeight) newHeight = maxHeight;
    setTestCasePanelHeight(newHeight);
  };
  React.useEffect(() => {
    if (isPanelResizing) {
      window.addEventListener("mousemove", resizeTestCasePanel);
      window.addEventListener("mouseup", stopPanelResizing);
    } else {
      window.removeEventListener("mousemove", resizeTestCasePanel);
      window.removeEventListener("mouseup", stopPanelResizing);
    }
    return () => {
      window.removeEventListener("mousemove", resizeTestCasePanel);
      window.removeEventListener("mouseup", stopPanelResizing);
    };
  }, [isPanelResizing, testCasePanelOpen, testCasePanelHeight]);

  // Placeholder language config
  const isDarkTheme = false;
  const handleEditorDidMount = (editor: any, monaco: any, ref: any) => {
    ref.current = editor;
  };

  // Test case handlers (implement logic as needed)
  const runTestCase = (id: string) => {};
  const removeTestCase = (id: string) => {
    setTestCases((prev) => prev.filter((tc) => tc.id !== id));
  };
  const updateTestCase = (
    id: string,
    field: "input" | "expectedOutput",
    value: string
  ) => {
    setTestCases((prev) =>
      prev.map((tc) => (tc.id === id ? { ...tc, [field]: value } : tc))
    );
  };
  const addTestCase = () => {
    setTestCases((prev) => [
      ...prev,
      { id: (prev.length + 1).toString(), input: "", expectedOutput: "" },
    ]);
  };

  // Handlers for Run All and Submit
  const handleRunAll = () => {
    setIsRunning(true);
    // TODO: Implement run all logic
    setTimeout(() => setIsRunning(false), 1200);
  };
  const handleSubmit = () => {
    setIsSubmitting(true);
    // TODO: Implement submit logic
    setTimeout(() => setIsSubmitting(false), 1200);
  };

  return (
    <div
      ref={containerRef}
      style={{
        width: "100vw",
        minHeight: "100vh",
        height: "100vh",
        margin: 0,
        padding: 0,
        background: "#f8fafc",
        boxSizing: "border-box",
        paddingTop: 64, // navbar height
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: isLeft ? "row" : "row-reverse",
          gap: 0,
          alignItems: "stretch",
          minHeight: `calc(100vh - 64px)`,
          height: `calc(100vh - 64px)`,
          maxWidth: 1400,
          margin: "0 auto",
          boxSizing: "border-box",
        }}
      >
        {/* Left/Right: Challenge Info + Minimizable Test/Result Panel */}
        <div
          style={{
            width: panelWidth,
            minWidth: 320,
            maxWidth: 520,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            position: "relative",
            minHeight: 0,
            background: "#fff",
            borderRadius: 18,
            boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
            padding: "32px 28px 0 32px",
            margin: isLeft ? "0 0 0 8px" : "0 8px 0 0",
            border: "1.5px solid #e5e7eb",
            transition: "margin 0.2s, box-shadow 0.2s",
          }}
        >
          {/* Challenge info at the top */}
          <div style={{ marginBottom: 16 }}>
            <h1 style={{ fontSize: 32, fontWeight: 700 }}>{challenge.title}</h1>
            <div style={{ display: "flex", gap: 16, margin: "12px 0" }}>
              <span
                style={{
                  background: "#ecfdf5",
                  color: "#059669",
                  padding: "4px 12px",
                  borderRadius: 20,
                }}
              >
                {challenge.difficulty}
              </span>
              <span
                style={{
                  background: "#dbeafe",
                  color: "#2563eb",
                  padding: "4px 12px",
                  borderRadius: 20,
                }}
              >
                {challenge.points} Points
              </span>
              <span
                style={{
                  background: "#f3e8ff",
                  color: "#7c3aed",
                  padding: "4px 12px",
                  borderRadius: 20,
                }}
              >
                {challenge.timeEstimate.split("-")[0]} Minutes
              </span>
            </div>
            <p style={{ fontSize: 18, color: "#374151" }}>
              {challenge.description}
            </p>
          </div>
          {/* Panel Switcher Button */}
          <button
            onClick={() => setIsLeft((prev) => !prev)}
            style={{
              position: "absolute",
              top: 12,
              right: 20,
              background: isLeft ? "#6366f1" : "#7c3aed", // More visible color
              border: isLeft ? "2px solid #6366f1" : "2px solid #7c3aed", // Match background
              borderRadius: 18,
              padding: 6,
              cursor: "pointer",
              zIndex: 10,
              boxShadow: "0 1px 4px rgba(0,0,0,0.10)",
              width: 36,
              height: 36,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background 0.2s, border 0.2s",
            }}
            aria-label="Switch panel sides"
            title="Switch panel sides"
          >
            <ArrowLeftRight size={20} color="#fff" />
          </button>
          {/* Minimizable Test/Result Panel at the bottom */}
          <div
            ref={testCasePanelRef}
            style={{
              position: "absolute",
              left: 16,
              right: 16,
              bottom: 16,
              zIndex: 2,
            }}
          >
            <div
              style={{
                background: "#fff",
                borderTop: "1.5px solid #e5e7eb",
                borderRadius: "16px 16px 0 0",
                boxShadow: "0 -2px 12px rgba(99,102,241,0.07)",
                transition: "height 0.2s",
                height: testCasePanelOpen ? testCasePanelHeight : 36,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                minWidth: 0,
                position: "relative",
              }}
            >
              {/* Action Buttons */}
              <div
                style={{
                  display: "flex",
                  gap: 12,
                  justifyContent: "flex-end",
                  alignItems: "center",
                  margin: "18px 24px 12px 24px",
                  background: "#fff",
                  borderBottom: "1.5px solid #e5e7eb",
                  borderTopLeftRadius: 16,
                  borderTopRightRadius: 16,
                  minHeight: 56,
                  boxSizing: "border-box",
                }}
              >
                <button
                  onClick={handleRunAll}
                  disabled={isRunning}
                  style={{
                    background: "#4F46E5",
                    color: "#fff",
                    border: "none",
                    borderRadius: 8,
                    padding: "5px 12px",
                    fontWeight: 600,
                    fontSize: 16,
                    cursor: isRunning ? "not-allowed" : "pointer",
                    opacity: isRunning ? 0.7 : 1,
                    transition: "background 0.2s",
                    boxShadow: "0 2px 8px 0 #6366f122",
                  }}
                >
                  {isRunning ? "Running..." : "Run All Test Cases"}
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  style={{
                    background: "#22c55e",
                    color: "#fff",
                    border: "none",
                    borderRadius: 8,
                    padding: "5px 12px",
                    fontWeight: 600,
                    fontSize: 16,
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                    opacity: isSubmitting ? 0.7 : 1,
                    transition: "background 0.2s",
                    boxShadow: "0 2px 8px 0 #22c55e22",
                  }}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
              {/* Tab Switcher */}
              <div
                style={{
                  display: "flex",
                  borderBottom: "1.5px solid #e5e7eb",
                  background:
                    activePanel === "testcases" ? "#f1f5f9" : "#ede9fe",
                  borderRadius: "0 0 12px 12px",
                  boxShadow: "0 1px 4px rgba(99,102,241,0.04)",
                }}
              >
                <button
                  onClick={() => setActivePanel("testcases")}
                  style={{
                    flex: 1,
                    padding: "8px 0",
                    background:
                      activePanel === "testcases" ? "#fff" : "transparent",
                    border: "none",
                    borderBottom:
                      activePanel === "testcases"
                        ? "2.5px solid #6366f1"
                        : "2.5px solid transparent",
                    color: activePanel === "testcases" ? "#3730a3" : "#64748b",
                    fontWeight: 600,
                    fontSize: 15,
                    cursor: "pointer",
                    outline: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                    borderRadius: "0 0 0 12px",
                  }}
                >
                  <List size={16} /> Test Cases
                </button>
                <button
                  onClick={() => setActivePanel("results")}
                  style={{
                    flex: 1,
                    padding: "8px 0",
                    background:
                      activePanel === "results" ? "#fff" : "transparent",
                    border: "none",
                    borderBottom:
                      activePanel === "results"
                        ? "2.5px solid #6366f1"
                        : "2.5px solid transparent",
                    color: activePanel === "results" ? "#3730a3" : "#64748b",
                    fontWeight: 600,
                    fontSize: 15,
                    cursor: "pointer",
                    outline: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                    borderRadius: "0 0 12px 0",
                  }}
                >
                  <CheckCircle size={16} /> Test Results
                </button>
              </div>
              {/* Only one panel visible at a time */}
              <div
                style={{
                  flex: 1,
                  minHeight: 0,
                  overflowY: "auto",
                  background: "#fff",
                  padding: "16px 16px 16px 20px",
                }}
              >
                {activePanel === "testcases" && (
                  <TestCaseList
                    testCases={testCasesState}
                    isRunning={isRunning}
                    runTestCase={runTestCase}
                    removeTestCase={removeTestCase}
                    updateTestCase={updateTestCase}
                    addTestCase={addTestCase}
                  />
                )}
                {activePanel === "results" && (
                  <ResultPanel
                    totalTests={testCasesState.length}
                    passedTests={passedTests}
                    error={error}
                  />
                )}
              </div>
              {/* Panel Height Resizer (Slider) */}
              <div
                onMouseDown={startPanelResizing}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 12,
                  cursor: "row-resize",
                  background: isPanelResizing
                    ? "linear-gradient(90deg, #6366f1 0%, #818cf8 100%)"
                    : "linear-gradient(90deg, #e0e7ff 0%, #f1f5f9 100%)",
                  zIndex: 5,
                  borderRadius: "8px 8px 0 0",
                  userSelect: "none",
                  transition: "background 0.2s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: isPanelResizing
                    ? "0 2px 8px 0 #6366f1aa"
                    : "0 1px 4px 0 #e0e7ffaa",
                }}
                title="Resize panel height"
              >
                <div
                  style={{
                    width: 40,
                    height: 4,
                    borderRadius: 2,
                    background: isPanelResizing ? "#fff" : "#a5b4fc",
                    boxShadow: isPanelResizing
                      ? "0 0 0 2px #6366f1"
                      : "0 0 0 1px #c7d2fe",
                    opacity: 0.95,
                  }}
                />
              </div>
              {/* Add gap between slider and toggle button */}
              <div style={{ height: 8 }} />
              {/* Toggle Button */}
              <button
                onClick={() => setTestCasePanelOpen((open) => !open)}
                style={{
                  position: "absolute",
                  top: testCasePanelOpen ? 22 : 14,
                  left: 18,
                  background: testCasePanelOpen ? "#ede9fe" : "#f1f5f9",
                  border: testCasePanelOpen
                    ? "1.5px solid #a5b4fc"
                    : "1.5px solid #e5e7eb",
                  borderRadius: 16,
                  padding: 2,
                  cursor: "pointer",
                  zIndex: 6,
                  boxShadow: testCasePanelOpen
                    ? "0 2px 8px 0 #a5b4fc33"
                    : "0 1px 4px 0 #e5e7eb33",
                  width: 28,
                  height: 28,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background 0.2s, border 0.2s, box-shadow 0.2s",
                }}
                aria-label={
                  testCasePanelOpen
                    ? "Minimize test cases"
                    : "Expand test cases"
                }
              >
                {testCasePanelOpen ? (
                  <ChevronDown size={18} color="#7c3aed" />
                ) : (
                  <ChevronUp size={18} color="#6366f1" />
                )}
              </button>
            </div>
          </div>
        </div>
        {/* Resizer Divider */}
        <div
          onMouseDown={startResizing}
          style={{
            width: 8,
            cursor: "col-resize",
            background: isResizing ? "#4F46E5" : "#e0e0e0",
            zIndex: 10,
            height: "100%",
            display: "inline-block",
            position: "relative",
            userSelect: "none",
          }}
        />
        {/* Right/Left: Code Editor */}
        <div
          style={{
            flex: 2,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            minHeight: 0,
            height: `calc(100vh - 64px)`,
            background: "#fff",
            borderRadius: 18,
            boxShadow: "0 2px 16px rgba(0,0,0,0.09)",
            margin: isLeft ? "0 8px 0 0" : "0 0 0 8px",
            border: "1.5px solid #e5e7eb",
            overflow: "hidden",
            transition: "margin 0.2s, box-shadow 0.2s",
          }}
        >
          <PracticeEditor
            code={code}
            setCode={setCode}
            selectedLanguage={selectedLanguage}
            setSelectedLanguage={setSelectedLanguage}
            setError={setError}
            setTestCases={setTestCases}
            isDarkTheme={isDarkTheme}
            editorRef={editorRef}
            handleEditorDidMount={handleEditorDidMount}
            DEFAULT_CODE={DEFAULT_CODE}
          />
        </div>
      </div>
    </div>
  );
};

export default SolveChallengePage;
