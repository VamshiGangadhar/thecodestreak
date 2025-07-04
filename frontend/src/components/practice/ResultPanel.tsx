import React from "react";
import { Badge, Alert, Label } from "reactstrap";
import { CheckCircle } from "lucide-react";

interface ResultPanelProps {
  totalTests: number;
  passedTests: number;
  error: string;
}

const ResultPanel: React.FC<ResultPanelProps> = ({
  totalTests,
  passedTests,
  error,
}) => (
  <>
    <h6 className="fw-semibold mb-3">Execution Result</h6>
    {totalTests > 0 && (
      <div className="mb-3">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className="fw-semibold">Test Results:</span>
          <Badge
            color={passedTests === totalTests ? "success" : "danger"}
            className="px-2 py-1"
          >
            {passedTests}/{totalTests} Passed
          </Badge>
        </div>
        <div className="progress mb-2" style={{ height: "8px" }}>
          <div
            className="progress-bar bg-success"
            style={{ width: `${(passedTests / totalTests) * 100}%` }}
          />
        </div>
      </div>
    )}
    {error && (
      <Alert color="danger" className="p-3">
        <Label className="small fw-semibold mb-2">Error:</Label>
        <pre className="mb-0 small" style={{ whiteSpace: "pre-wrap" }}>
          {error}
        </pre>
      </Alert>
    )}
    {!error && passedTests === totalTests && totalTests > 0 && (
      <Alert color="success" className="p-3">
        <CheckCircle size={20} className="me-2" />
        All test cases passed! Great job! 🎉
      </Alert>
    )}
  </>
);

export default ResultPanel;
