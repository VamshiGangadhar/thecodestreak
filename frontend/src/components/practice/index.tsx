import React, { useState, useRef } from "react";
import { Container, Row, Col, Button, Spinner } from "reactstrap";
import {
  Code,
  Terminal,
  RefreshCw,
  Moon,
  Sun,
  ArrowLeftRight,
} from "lucide-react";
import { LANGUAGES } from "./static/languageConfiguration";
import { DEFAULT_CODE } from "./static/defaultCode";
import {
  handleLanguageChange,
  handleEditorDidMount,
  executeTestCase,
  runTestCase as runTestCaseHelper,
  runAllTestCases as runAllTestCasesHelper,
  submitSolution as submitSolutionHelper,
  addTestCase as addTestCaseHelper,
  removeTestCase as removeTestCaseHelper,
  updateTestCase as updateTestCaseHelper,
  resetCode as resetCodeHelper,
} from "./helper/helper";
import { TestCase } from "./types";
import PracticeEditor from "./PracticeEditor";
import TestCasePanel from "./TestCasePanel";

const PracticeCompiler: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(LANGUAGES[0]);
  const [code, setCode] = useState<string>(DEFAULT_CODE.javascript);
  const [activeTab, setActiveTab] = useState<string>("testcases");
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(
    localStorage.getItem("theme") === "dark"
  );
  const editorRef = useRef<any>(null);

  const [testCases, setTestCases] = useState<TestCase[]>([
    {
      id: "1",
      input: "nums = [2,7,11,15], target = 9",
      expectedOutput: "[0,1]",
    },
    {
      id: "2",
      input: "nums = [3,2,4], target = 6",
      expectedOutput: "[1,2]",
    },
    {
      id: "3",
      input: "nums = [3,3], target = 6",
      expectedOutput: "[0,1]",
    },
  ]);

  const passedTests = testCases.filter((tc) => tc.status === "passed").length;
  const totalTests = testCases.length;

  // Handlers for TestCaseList
  const runTestCase = (id: string) =>
    runTestCaseHelper(
      id,
      testCases,
      setTestCases,
      (tc: TestCase) => executeTestCase(tc, selectedLanguage, code),
      setError
    );
  const removeTestCase = (id: string) => removeTestCaseHelper(id, setTestCases);
  const updateTestCase = (
    id: string,
    field: "input" | "expectedOutput",
    value: string
  ) => updateTestCaseHelper(id, field, value, setTestCases);
  const addTestCase = () => addTestCaseHelper(setTestCases);

  const runAll = () =>
    runAllTestCasesHelper(
      testCases,
      setTestCases,
      (tc: TestCase) => executeTestCase(tc, selectedLanguage, code),
      setIsRunning,
      setError
    );
  const submit = () =>
    submitSolutionHelper(
      () =>
        runAllTestCasesHelper(
          testCases,
          setTestCases,
          (tc: TestCase) => executeTestCase(tc, selectedLanguage, code),
          setIsRunning,
          setError
        ),
      setIsSubmitting
    );

  // Add state for resizable panels
  const [editorWidth, setEditorWidth] = useState<number>(
    window.innerWidth * 0.55
  );
  const [isResizing, setIsResizing] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLeft, setIsLeft] = useState(true); // true: editor left, test panel right

  // Handle mouse events for resizing
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
    const maxWidth = window.innerWidth - 320;
    let newWidth =
      e.clientX - containerRef.current.getBoundingClientRect().left;
    if (newWidth < minWidth) newWidth = minWidth;
    if (newWidth > maxWidth) newWidth = maxWidth;
    setEditorWidth(newWidth);
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
    // eslint-disable-next-line
  }, [isResizing]);

  return (
    <div
      ref={containerRef}
      className="vw-100 d-flex flex-column bg-light fade-in"
      style={{
        minHeight: "100vh",
        minWidth: "100vw",
        width: "100vw",
        height: "100vh",
        padding: 0,
        margin: 0,
        boxSizing: "border-box",
        position: "relative",
        marginTop: "var(--navbar-height, 65px)",
      }}
    >
      {/* Panel Switcher Button */}
      <button
        onClick={() => setIsLeft((prev) => !prev)}
        style={{
          position: "absolute",
          top: 18,
          right: 28,
          background: isLeft ? "#6366f1" : "#7c3aed",
          border: isLeft ? "2px solid #6366f1" : "2px solid #7c3aed",
          borderRadius: 18,
          padding: 6,
          cursor: "pointer",
          zIndex: 20,
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
      <Container
        fluid
        style={{
          maxWidth: "100vw",
          width: "100vw",
          height: "calc(100vh - 80px)",
          minHeight: "calc(100vh - 80px)",
          minWidth: "100vw",
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
          borderRadius: 0,
          background: "#fff",
          padding: 0,
          margin: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <Row
          className="mt-2 gx-0"
          style={{ flex: "0 0 auto", margin: 0, padding: 0 }}
        >
          <Col className="p-0">
            <div
              className="d-flex align-items-center justify-content-between bg-white border rounded-3 px-4 py-3"
              style={{
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                minHeight: 64,
                marginBottom: 8,
                marginLeft: 0,
                marginRight: 0,
                paddingLeft: 0,
              }}
            >
              {/* Left: Title */}
              <div className="d-flex align-items-center gap-2 flex-shrink-0">
                <span
                  style={{
                    background: "#f1f5f9",
                    borderRadius: "50%",
                    padding: 6,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Code className="text-primary" size={24} />
                </span>
                <span
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    color: "#1e293b",
                  }}
                >
                  Code Practice
                </span>
              </div>

              {/* Right: Theme/Reset Buttons */}
              <div className="d-flex gap-2 flex-shrink-0">
                <Button
                  color="outline-secondary"
                  size="sm"
                  onClick={() => setIsDarkTheme(!isDarkTheme)}
                  className="d-flex align-items-center gap-1"
                  style={{
                    borderColor: "#e5e7eb",
                    color: "#6366f1",
                    background: "#f8fafc",
                  }}
                >
                  {isDarkTheme ? <Sun size={16} /> : <Moon size={16} />}
                  {isDarkTheme ? "Light" : "Dark"}
                </Button>
                <Button
                  color="outline-secondary"
                  size="sm"
                  onClick={() =>
                    resetCodeHelper(
                      selectedLanguage,
                      setCode,
                      setError,
                      setTestCases,
                      DEFAULT_CODE
                    )
                  }
                  className="d-flex align-items-center gap-1"
                  style={{
                    borderColor: "#e5e7eb",
                    color: "#64748b",
                    background: "#f8fafc",
                  }}
                >
                  <RefreshCw size={16} />
                  Reset
                </Button>
              </div>
            </div>
          </Col>
        </Row>

        {/* Main Panels Row - Use flex to fill vertical space */}
        <div
          style={{
            flex: 1,
            display: "flex",
            minHeight: 0,
            height: "1px",
            margin: 0,
            overflow: "hidden",
            flexDirection: isLeft ? "row" : "row-reverse",
          }}
        >
          {/* Left Panel - Monaco Code Editor */}
          <div
            style={{
              width: editorWidth,
              minWidth: 320,
              maxWidth: "80vw",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              transition: isResizing ? "none" : "width 0.2s",
              overflow: "hidden",
              position: "relative",
              margin: isLeft ? "0 8px 0 0" : "0 0 0 8px",
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
          {/* Right Panel - Test Cases & Results */}
          <div
            style={{
              flex: 1,
              minWidth: 320,
              maxWidth: "80vw",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              margin: isLeft ? "0 0 0 8px" : "0 8px 0 0",
            }}
          >
            <TestCasePanel
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              testCases={testCases}
              isRunning={isRunning}
              isSubmitting={isSubmitting}
              runTestCase={runTestCase}
              removeTestCase={removeTestCase}
              updateTestCase={updateTestCase}
              addTestCase={addTestCase}
              runAll={runAll}
              submit={submit}
              error={error}
            />
          </div>
        </div>
      </Container>
      <style>{`
        .fade-in {
          opacity: 0;
          animation: fadeIn 0.7s ease-in forwards;
        }
        @keyframes fadeIn {
          to { opacity: 1; }
        }
        :root {
          --navbar-height: 64px;
        }
        @media (max-width: 768px) {
          :root {
            --navbar-height: 56px;
          }
        }
        @media (max-width: 1200px) {
          .shadow-sm.card {
            min-width: 320px !important;
            max-width: 100vw !important;
          }
        }
      `}</style>
    </div>
  );
};

export default PracticeCompiler;
