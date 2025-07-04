import React from "react";
import { Card, CardBody, Button, FormGroup, Label, Input } from "reactstrap";
import { Play, Trash2, CheckCircle, XCircle, Clock } from "lucide-react";
import { TestCase } from "./types";

interface TestCaseCardProps {
  testCase: TestCase;
  index: number;
  isRunning: boolean;
  runTestCase: (id: string) => void;
  removeTestCase: (id: string) => void;
  updateTestCase: (
    id: string,
    field: "input" | "expectedOutput",
    value: string
  ) => void;
}

const TestCaseCard: React.FC<TestCaseCardProps> = ({
  testCase,
  index,
  isRunning,
  runTestCase,
  removeTestCase,
  updateTestCase,
}) => (
  <Card className="border">
    <CardBody className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <div className="d-flex align-items-center gap-2">
          <span className="small fw-semibold">Test Case {index + 1}</span>
          {testCase.status === "passed" && (
            <CheckCircle size={16} className="text-success" />
          )}
          {testCase.status === "failed" && (
            <XCircle size={16} className="text-danger" />
          )}
          {testCase.status === "pending" && (
            <Clock size={16} className="text-warning" />
          )}
        </div>
        <div className="d-flex gap-1">
          <Button
            color="outline-primary"
            size="sm"
            onClick={() => runTestCase(testCase.id)}
            disabled={isRunning}
            style={{ padding: "0.25rem 0.5rem" }}
          >
            <Play size={12} />
          </Button>
          <Button
            color="outline-danger"
            size="sm"
            onClick={() => removeTestCase(testCase.id)}
            style={{ padding: "0.25rem 0.5rem" }}
          >
            <Trash2 size={12} />
          </Button>
        </div>
      </div>
      <FormGroup className="mb-2">
        <Label className="small fw-semibold">Input:</Label>
        <Input
          type="textarea"
          value={testCase.input}
          onChange={(e) => updateTestCase(testCase.id, "input", e.target.value)}
          placeholder="Enter input..."
          style={{ fontSize: "13px", minHeight: "60px" }}
        />
      </FormGroup>
      <FormGroup className="mb-0">
        <Label className="small fw-semibold">Expected Output:</Label>
        <Input
          type="textarea"
          value={testCase.expectedOutput}
          onChange={(e) =>
            updateTestCase(testCase.id, "expectedOutput", e.target.value)
          }
          placeholder="Enter expected output..."
          style={{ fontSize: "13px", minHeight: "60px" }}
        />
      </FormGroup>
      {testCase.actualOutput !== undefined && (
        <div className="mt-2">
          <Label className="small fw-semibold">Actual Output:</Label>
          <pre
            className={`small p-2 rounded ${
              testCase.status === "passed"
                ? "bg-success-subtle text-success-emphasis"
                : "bg-danger-subtle text-danger-emphasis"
            }`}
            style={{ fontSize: "13px", whiteSpace: "pre-wrap" }}
          >
            {testCase.actualOutput}
          </pre>
          {testCase.executionTime && (
            <div className="small text-muted">
              Execution time: {testCase.executionTime}ms
            </div>
          )}
        </div>
      )}
    </CardBody>
  </Card>
);

export default TestCaseCard;
