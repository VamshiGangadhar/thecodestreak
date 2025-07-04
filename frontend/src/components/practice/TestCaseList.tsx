import React from "react";
import { Button } from "reactstrap";
import TestCaseCard from "./TestCaseCard";
import { TestCase } from "./types";
import { Plus } from "lucide-react";

interface TestCaseListProps {
  testCases: TestCase[];
  isRunning: boolean;
  runTestCase: (id: string) => void;
  removeTestCase: (id: string) => void;
  updateTestCase: (
    id: string,
    field: "input" | "expectedOutput",
    value: string
  ) => void;
  addTestCase: () => void;
}

const TestCaseList: React.FC<TestCaseListProps> = ({
  testCases,
  isRunning,
  runTestCase,
  removeTestCase,
  updateTestCase,
  addTestCase,
}) => (
  <>
    <div className="d-flex justify-content-between align-items-center mb-3">
      <h6 className="mb-0 fw-semibold">Test Cases</h6>
      <Button
        color="outline-primary"
        size="sm"
        onClick={addTestCase}
        className="d-flex align-items-center gap-1"
      >
        <Plus size={14} /> 
        Add Test
      </Button>
    </div>
    <div className="d-grid gap-3">
      {testCases.map((testCase, index) => (
        <TestCaseCard
          key={testCase.id}
          testCase={testCase}
          index={index}
          isRunning={isRunning}
          runTestCase={runTestCase}
          removeTestCase={removeTestCase}
          updateTestCase={updateTestCase}
        />
      ))}
    </div>
  </>
);

export default TestCaseList;
