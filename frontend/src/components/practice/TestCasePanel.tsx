import React from "react";
import {
  Card,
  CardBody,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Badge,
  Button,
  Spinner,
} from "reactstrap";
import { Terminal, CheckCircle, Play } from "lucide-react";
import TestCaseList from "./TestCaseList";
import ResultPanel from "./ResultPanel";
import { TestCase } from "./types";

interface TestCasePanelProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  testCases: TestCase[];
  isRunning: boolean;
  isSubmitting: boolean;
  runTestCase: (id: string) => void;
  removeTestCase: (id: string) => void;
  updateTestCase: (
    id: string,
    field: "input" | "expectedOutput",
    value: string
  ) => void;
  addTestCase: () => void;
  runAll: () => void;
  submit: () => void;
  error: string;
}

const TestCasePanel: React.FC<TestCasePanelProps> = ({
  activeTab,
  setActiveTab,
  testCases,
  isRunning,
  isSubmitting,
  runTestCase,
  removeTestCase,
  updateTestCase,
  addTestCase,
  runAll,
  submit,
  error,
}) => {
  const passedTests = testCases.filter((tc) => tc.status === "passed").length;
  const totalTests = testCases.length;

  return (
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
                    color={passedTests === totalTests ? "success" : "secondary"}
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
  );
};

export default TestCasePanel;
