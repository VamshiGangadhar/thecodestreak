import React, { useState, useRef } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Input,
  Label,
  FormGroup,
  Spinner,
  Alert,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Badge,
} from "reactstrap";
import {
  Play,
  Code,
  FileText,
  Terminal,
  RefreshCw,
  Plus,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  Moon,
  Sun,
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
import TestCaseList from "./TestCaseList";
import ResultPanel from "./ResultPanel";

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
        // marginTop: "72px", // Increased margin for more space below navbar
      }}
    >
      <Container
        fluid
        style={{
          maxWidth: "100vw",
          width: "100vw",
          height: "calc(100vh - 80px)", // Match the new marginTop
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
              position: "relative", // <-- add for absolute positioning
            }}
          >
            {/* Language Selector floating at top-right of editor panel */}
            <div
              style={{
                position: "absolute",
                top: 16,
                right: 16,
                zIndex: 20,
                background: "#f8fafc",
                borderRadius: 24,
                boxShadow: "0 1px 4px rgba(99,102,241,0.07)",
                padding: "6px 18px 6px 16px",
                border: "1.5px solid #e5e7eb",
                minWidth: 180,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Label
                className="mb-0 fw-semibold small"
                style={{
                  color: "#6366f1",
                  fontSize: 13,
                  letterSpacing: 0.2,
                  marginRight: 6,
                }}
              >
                Language
              </Label>
              <Input
                type="select"
                value={selectedLanguage.id}
                onChange={(e) =>
                  handleLanguageChange(
                    e.target.value,
                    setSelectedLanguage,
                    setCode,
                    setError,
                    setTestCases,
                    DEFAULT_CODE
                  )
                }
                style={{
                  width: "110px",
                  fontSize: "14px",
                  background: "#fff",
                  border: "1.5px solid #c7d2fe",
                  color: "#3730a3",
                  borderRadius: 16,
                  boxShadow: "0 1px 4px rgba(99,102,241,0.04)",
                  fontWeight: 500,
                  padding: "4px 10px",
                  outline: "none",
                  transition: "border 0.2s",
                }}
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang.id} value={lang.id}>
                    {lang.name}
                  </option>
                ))}
              </Input>
            </div>

            <Card
              className="shadow-sm border-0 h-100"
              style={{
                flex: 1,
                minHeight: 0,
                marginBottom: 0,
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardBody
                className="p-0 d-flex flex-column"
                style={{ flex: 1, minHeight: 0 }}
              >
                {/* Monaco Editor */}
                <div style={{ flex: 1, minHeight: 0 }}>
                  <PracticeEditor
                    code={code}
                    setCode={setCode}
                    selectedLanguage={selectedLanguage}
                    isDarkTheme={isDarkTheme}
                    editorRef={editorRef}
                    handleEditorDidMount={handleEditorDidMount}
                  />
                </div>
              </CardBody>
            </Card>
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
            }}
          >
            <Card
              className="shadow-sm border-0 h-100"
              style={{
                flex: 1,
                minHeight: 0,
                marginBottom: 0,
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardBody
                className="p-0 d-flex flex-column"
                style={{ flex: 1, minHeight: 0 }}
              >
                {/* Tabs Header */}
                <div className="border-bottom">
                  <Nav tabs className="px-4">
                    <NavItem>
                      <NavLink
                        className={`cursor-pointer ${
                          activeTab === "testcases" ? "active" : ""
                        }`}
                        onClick={() => setActiveTab("testcases")}
                        style={{ fontSize: "14px", fontWeight: "600" }}
                      >
                        <Terminal size={16} className="me-1" />
                        Test Cases
                        {totalTests > 0 && (
                          <Badge
                            color={
                              passedTests === totalTests
                                ? "success"
                                : "secondary"
                            }
                            className="ms-2"
                          >
                            {passedTests}/{totalTests}
                          </Badge>
                        )}
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={`cursor-pointer ${
                          activeTab === "result" ? "active" : ""
                        }`}
                        onClick={() => setActiveTab("result")}
                        style={{ fontSize: "14px", fontWeight: "600" }}
                      >
                        <CheckCircle size={16} className="me-1" />
                        Result
                      </NavLink>
                    </NavItem>
                  </Nav>
                </div>

                {/* Tab Content */}
                <div style={{ flex: 1, minHeight: 0, overflow: "auto" }}>
                  <TabContent activeTab={activeTab}>
                    <TabPane tabId="testcases" className="p-4">
                      <TestCaseList
                        testCases={testCases}
                        isRunning={isRunning}
                        runTestCase={runTestCase}
                        removeTestCase={removeTestCase}
                        updateTestCase={updateTestCase}
                        addTestCase={addTestCase}
                      />
                    </TabPane>

                    <TabPane tabId="result" className="p-4">
                      <ResultPanel
                        totalTests={totalTests}
                        passedTests={passedTests}
                        error={error}
                      />
                    </TabPane>
                  </TabContent>
                </div>

                {/* Action Buttons */}
                <div
                  className="border-top p-4 bg-white"
                  style={{ position: "sticky", bottom: 0, zIndex: 2 }}
                >
                  <div className="d-grid gap-2">
                    <Button
                      color="primary"
                      onClick={runAll}
                      disabled={isRunning || testCases.length === 0}
                      className="d-flex align-items-center justify-content-center gap-2"
                      style={{ backgroundColor: "#4F46E5", border: "none" }}
                    >
                      {isRunning ? (
                        <>
                          <Spinner size="sm" />
                          Running Tests...
                        </>
                      ) : (
                        <>
                          <Play size={16} />
                          Run All Tests
                        </>
                      )}
                    </Button>

                    <Button
                      color="success"
                      onClick={submit}
                      disabled={isSubmitting || testCases.length === 0}
                      className="d-flex align-items-center justify-content-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Spinner size="sm" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <CheckCircle size={16} />
                          Submit Solution
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardBody>
            </Card>
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
