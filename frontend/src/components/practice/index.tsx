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

  return (
    <div
      className="min-vh-100 vw-100 d-flex flex-column justify-content-center align-items-center bg-light py-0 fade-in"
      style={{
        minHeight: "100vh",
        minWidth: "100vw",
        width: "100vw",
        height: "100vh",
        padding: 0,
        margin: 0,
        boxSizing: "border-box",
        position: "relative",
        top: "var(--navbar-height, 20px)",
      }}
    >
      <Container
        fluid
        style={{
          maxWidth: "100vw",
          width: "100vw",
          height: "calc(100vh - var(--navbar-height, 64px))",
          minHeight: "calc(100vh - var(--navbar-height, 64px))",
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
        <Row className="mb-4">
          <Col>
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center gap-3">
                <div className="d-flex align-items-center gap-2">
                  <Code className="text-primary" size={28} />
                  <h1 className="h3 mb-0 fw-bold">Code Practice</h1>
                </div>

                <div className="d-flex align-items-center gap-2">
                  <Label className="mb-0 fw-semibold small">Language:</Label>
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
                    style={{ width: "140px", fontSize: "14px" }}
                  >
                    {LANGUAGES.map((lang) => (
                      <option key={lang.id} value={lang.id}>
                        {lang.name}
                      </option>
                    ))}
                  </Input>
                </div>
              </div>

              <div className="d-flex gap-2">
                <Button
                  color="outline-secondary"
                  size="sm"
                  onClick={() => setIsDarkTheme(!isDarkTheme)}
                  className="d-flex align-items-center gap-1"
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
                >
                  <RefreshCw size={16} />
                  Reset
                </Button>
              </div>
            </div>
          </Col>
        </Row>

        <Row>
          {/* Left Panel - Monaco Code Editor */}
          <Col lg={7} style={{ maxHeight: "70vh", overflowY: "auto" }}>
            <Card
              className="shadow-sm border-0"
              style={{ height: "65vh", minHeight: 500, maxHeight: "65vh" }}
            >
              <CardBody className="p-0">
                {/* Editor Header */}
                <div className="border-bottom px-4 py-3">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center gap-2">
                      <FileText size={18} className="text-muted" />
                      <span className="fw-semibold">Monaco Code Editor</span>
                      <Badge color="success" className="text-white">
                        VS Code Powered
                      </Badge>
                    </div>
                    <div className="small text-muted">
                      {selectedLanguage.name} • Professional IDE Experience
                    </div>
                  </div>
                </div>

                {/* Monaco Editor */}
                <div style={{ height: "calc(100% - 80px)" }}>
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
          </Col>

          {/* Right Panel - Test Cases & Results */}
          <Col lg={5} style={{ maxHeight: "70vh", overflowY: "auto" }}>
            <Card
              className="shadow-sm border-0"
              style={{ height: "65vh", minHeight: 500, maxHeight: "65vh" }}
            >
              <CardBody className="p-0">
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
                <div style={{ height: "calc(100% - 60px)", overflow: "auto" }}>
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
                <div className="border-top p-4">
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
          </Col>
        </Row>
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
      `}</style>
    </div>
  );
};

export default PracticeCompiler;
