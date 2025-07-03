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
  Settings,
  Copy,
  Download,
  RefreshCw,
  Plus,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  Moon,
  Sun,
} from "lucide-react";
import Editor from "@monaco-editor/react";

// Language configurations for Monaco Editor
const LANGUAGES = [
  {
    id: "javascript",
    name: "JavaScript",
    monacoId: "javascript",
    extension: "js",
  },
  { id: "python", name: "Python", monacoId: "python", extension: "py" },
  { id: "java", name: "Java", monacoId: "java", extension: "java" },
  { id: "cpp", name: "C++", monacoId: "cpp", extension: "cpp" },
  { id: "c", name: "C", monacoId: "c", extension: "c" },
  {
    id: "typescript",
    name: "TypeScript",
    monacoId: "typescript",
    extension: "ts",
  },
  { id: "go", name: "Go", monacoId: "go", extension: "go" },
  { id: "rust", name: "Rust", monacoId: "rust", extension: "rs" },
];

// Default code templates
const DEFAULT_CODE = {
  javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
    const map = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        
        map.set(nums[i], i);
    }
    
    return [];
}

// Test the function
console.log(twoSum([2, 7, 11, 15], 9)); // Expected: [0, 1]`,

  python: `def two_sum(nums, target):
    """
    Find two numbers in the array that add up to target.
    
    Args:
        nums: List of integers
        target: Target sum
        
    Returns:
        List of two indices
    """
    num_map = {}
    
    for i, num in enumerate(nums):
        complement = target - num
        
        if complement in num_map:
            return [num_map[complement], i]
            
        num_map[num] = i
    
    return []

# Test the function
print(two_sum([2, 7, 11, 15], 9))  # Expected: [0, 1]`,

  java: `import java.util.*;

class Solution {
    /**
     * Find two numbers in the array that add up to target.
     * 
     * @param nums Array of integers
     * @param target Target sum
     * @return Array of two indices
     */
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            
            map.put(nums[i], i);
        }
        
        return new int[0];
    }
    
    public static void main(String[] args) {
        Solution solution = new Solution();
        int[] result = solution.twoSum(new int[]{2, 7, 11, 15}, 9);
        System.out.println(Arrays.toString(result)); // Expected: [0, 1]
    }
}`,

  cpp: `#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    /**
     * Find two numbers in the array that add up to target.
     * 
     * @param nums Vector of integers
     * @param target Target sum
     * @return Vector of two indices
     */
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> map;
        
        for (int i = 0; i < nums.size(); i++) {
            int complement = target - nums[i];
            
            if (map.find(complement) != map.end()) {
                return {map[complement], i};
            }
            
            map[nums[i]] = i;
        }
        
        return {};
    }
};

int main() {
    Solution solution;
    vector<int> nums = {2, 7, 11, 15};
    vector<int> result = solution.twoSum(nums, 9);
    
    cout << "[" << result[0] << ", " << result[1] << "]" << endl; // Expected: [0, 1]
    return 0;
}`,

  c: `#include <stdio.h>
#include <stdlib.h>

/**
 * Find two numbers in the array that add up to target.
 * 
 * @param nums Array of integers
 * @param numsSize Size of the array
 * @param target Target sum
 * @param returnSize Pointer to return the size of result
 * @return Array of two indices
 */
int* twoSum(int* nums, int numsSize, int target, int* returnSize) {
    *returnSize = 2;
    int* result = (int*)malloc(2 * sizeof(int));
    
    // Simple O(n²) approach for demonstration
    for (int i = 0; i < numsSize; i++) {
        for (int j = i + 1; j < numsSize; j++) {
            if (nums[i] + nums[j] == target) {
                result[0] = i;
                result[1] = j;
                return result;
            }
        }
    }
    
    *returnSize = 0;
    return NULL;
}

int main() {
    int nums[] = {2, 7, 11, 15};
    int target = 9;
    int returnSize;
    
    int* result = twoSum(nums, 4, target, &returnSize);
    
    if (result != NULL) {
        printf("[%d, %d]\\n", result[0], result[1]); // Expected: [0, 1]
        free(result);
    }
    
    return 0;
}`,

  typescript: `/**
 * Find two numbers in the array that add up to target.
 */
function twoSum(nums: number[], target: number): number[] {
    const map = new Map<number, number>();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if (map.has(complement)) {
            return [map.get(complement)!, i];
        }
        
        map.set(nums[i], i);
    }
    
    return [];
}

// Test the function
console.log(twoSum([2, 7, 11, 15], 9)); // Expected: [0, 1]`,

  go: `package main

import "fmt"

// twoSum finds two numbers in the array that add up to target
func twoSum(nums []int, target int) []int {
    numMap := make(map[int]int)
    
    for i, num := range nums {
        complement := target - num
        
        if index, exists := numMap[complement]; exists {
            return []int{index, i}
        }
        
        numMap[num] = i
    }
    
    return []int{}
}

func main() {
    nums := []int{2, 7, 11, 15}
    target := 9
    result := twoSum(nums, target)
    
    fmt.Printf("%v\\n", result) // Expected: [0 1]
}`,

  rust: `use std::collections::HashMap;

impl Solution {
    /// Find two numbers in the array that add up to target
    pub fn two_sum(nums: Vec<i32>, target: i32) -> Vec<i32> {
        let mut map = HashMap::new();
        
        for (i, num) in nums.iter().enumerate() {
            let complement = target - num;
            
            if let Some(&index) = map.get(&complement) {
                return vec![index as i32, i as i32];
            }
            
            map.insert(num, i);
        }
        
        vec![]
    }
}

struct Solution;

fn main() {
    let nums = vec![2, 7, 11, 15];
    let target = 9;
    let result = Solution::two_sum(nums, target);
    
    println!("{:?}", result); // Expected: [0, 1]
}`,
};

interface TestCase {
  id: string;
  input: string;
  expectedOutput: string;
  actualOutput?: string;
  status?: "passed" | "failed" | "pending";
  executionTime?: number;
}

interface CompilerOutput {
  run: {
    output?: string;
    stderr?: string;
    code?: number;
  };
}

const PracticeCompiler: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(LANGUAGES[0]);
  const [code, setCode] = useState(DEFAULT_CODE.javascript);
  const [activeTab, setActiveTab] = useState("testcases");
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const editorRef = useRef(null);

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

  // Handle language change
  const handleLanguageChange = (languageId: string) => {
    const language = LANGUAGES.find((lang) => lang.id === languageId);
    if (language) {
      setSelectedLanguage(language);
      setCode(DEFAULT_CODE[languageId as keyof typeof DEFAULT_CODE] || "");
      setError("");
      // Reset test case results
      setTestCases((prev) =>
        prev.map((tc) => ({
          ...tc,
          actualOutput: undefined,
          status: undefined,
        }))
      );
    }
  };

  // Handle editor mount
  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;

    // Configure editor options
    editor.updateOptions({
      fontSize: 14,
      fontFamily:
        "Fira Code, JetBrains Mono, SF Mono, Monaco, Inconsolata, Roboto Mono, monospace",
      lineHeight: 1.6,
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      automaticLayout: true,
      tabSize: 2,
      insertSpaces: true,
      wordWrap: "on",
      lineNumbers: "on",
      glyphMargin: false,
      folding: true,
      lineDecorationsWidth: 20,
      lineNumbersMinChars: 3,
      renderLineHighlight: "line",
      selectOnLineNumbers: true,
      roundedSelection: false,
      readOnly: false,
      cursorStyle: "line",
      formatOnType: true,
      formatOnPaste: true,
      suggestOnTriggerCharacters: true,
      acceptSuggestionOnEnter: "on",
      tabCompletion: "on",
      wordBasedSuggestions: "allDocuments",
      parameterHints: { enabled: true },
      quickSuggestions: true,
      contextmenu: true,
    });
  };

  // Execute single test case
  const executeTestCase = async (testCase: TestCase) => {
    try {
      const response = await fetch("https://emkc.org/api/v2/piston/execute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language: selectedLanguage.id,
          version: "*",
          files: [
            {
              name: `main.${selectedLanguage.extension}`,
              content: code,
            },
          ],
          stdin: testCase.input,
        }),
      });

      const result: CompilerOutput = await response.json();

      if (result.run) {
        const output = (result.run.output || "").trim();
        const hasError = result.run.stderr || result.run.code !== 0;

        return {
          output: hasError ? result.run.stderr || "Execution failed" : output,
          status: hasError
            ? "failed"
            : output === testCase.expectedOutput.trim()
            ? "passed"
            : "failed",
          hasError,
        };
      }

      return { output: "No output", status: "failed" as const, hasError: true };
    } catch (err) {
      return {
        output: "Execution error",
        status: "failed" as const,
        hasError: true,
      };
    }
  };

  // Run single test case
  const runTestCase = async (testCaseId: string) => {
    const testCase = testCases.find((tc) => tc.id === testCaseId);
    if (!testCase) return;

    setTestCases((prev) =>
      prev.map((tc) =>
        tc.id === testCaseId
          ? {
              ...tc,
              actualOutput: undefined,
              status: "pending" as const,
            }
          : tc
      )
    );

    const startTime = Date.now();
    const result = await executeTestCase(testCase);
    const executionTime = Date.now() - startTime;

    setTestCases((prev) =>
      prev.map((tc) =>
        tc.id === testCaseId
          ? {
              ...tc,
              actualOutput: result.output,
              status: result.status as "passed" | "failed" | "pending",
              executionTime,
            }
          : tc
      )
    );

    if (result.hasError) {
      setError(result.output);
    } else {
      setError("");
    }
  };

  // Run all test cases
  const runAllTestCases = async () => {
    setIsRunning(true);
    setError("");

    // Reset all test cases
    setTestCases((prev) =>
      prev.map((tc) => ({
        ...tc,
        status: "pending" as const,
        actualOutput: undefined,
      }))
    );

    for (const testCase of testCases) {
      const startTime = Date.now();
      const result = await executeTestCase(testCase);
      const executionTime = Date.now() - startTime;

      setTestCases((prev) =>
        prev.map((tc) =>
          tc.id === testCase.id
            ? {
                ...tc,
                actualOutput: result.output,
                status: result.status as "passed" | "failed" | "pending",
                executionTime,
              }
            : tc
        )
      );

      // Small delay between test cases for better UX
      await new Promise((resolve) => setTimeout(resolve, 200));
    }

    setIsRunning(false);
  };

  // Submit solution (run all test cases)
  const submitSolution = async () => {
    setIsSubmitting(true);
    await runAllTestCases();
    setIsSubmitting(false);
  };

  // Add new test case
  const addTestCase = () => {
    const newTestCase: TestCase = {
      id: Date.now().toString(),
      input: "",
      expectedOutput: "",
    };
    setTestCases((prev) => [...prev, newTestCase]);
  };

  // Remove test case
  const removeTestCase = (id: string) => {
    setTestCases((prev) => prev.filter((tc) => tc.id !== id));
  };

  // Update test case
  const updateTestCase = (
    id: string,
    field: "input" | "expectedOutput",
    value: string
  ) => {
    setTestCases((prev) =>
      prev.map((tc) => (tc.id === id ? { ...tc, [field]: value } : tc))
    );
  };

  // Reset everything
  const resetCode = () => {
    setCode(
      DEFAULT_CODE[selectedLanguage.id as keyof typeof DEFAULT_CODE] || ""
    );
    setError("");
    setTestCases((prev) =>
      prev.map((tc) => ({ ...tc, actualOutput: undefined, status: undefined }))
    );
  };

  const passedTests = testCases.filter((tc) => tc.status === "passed").length;
  const totalTests = testCases.length;

  return (
    <div
      className="min-vh-100 d-flex justify-content-center align-items-center bg-light py-4 fade-in"
      style={{ minHeight: "100vh", minWidth: "100vw" }}
    >
      <Container
        style={{
          maxWidth: "1400px",
          width: "100%",
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
          borderRadius: "18px",
          background: "#fff",
          padding: 0,
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
                    onChange={(e) => handleLanguageChange(e.target.value)}
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
                  onClick={resetCode}
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
                  <Editor
                    height="100%"
                    language={selectedLanguage.monacoId}
                    value={code}
                    onChange={(value) => setCode(value || "")}
                    onMount={handleEditorDidMount}
                    theme={isDarkTheme ? "vs-dark" : "light"}
                    options={{
                      fontSize: 14,
                      fontFamily:
                        "Fira Code, JetBrains Mono, SF Mono, Monaco, Inconsolata, Roboto Mono, monospace",
                      lineHeight: 1.6,
                      minimap: { enabled: false },
                      scrollBeyondLastLine: false,
                      automaticLayout: true,
                      tabSize: 2,
                      insertSpaces: true,
                      wordWrap: "on",
                      lineNumbers: "on",
                      glyphMargin: false,
                      folding: true,
                      lineDecorationsWidth: 20,
                      lineNumbersMinChars: 3,
                      renderLineHighlight: "line",
                      selectOnLineNumbers: true,
                      roundedSelection: false,
                      readOnly: false,
                      cursorStyle: "line",
                      formatOnType: true,
                      formatOnPaste: true,
                      suggestOnTriggerCharacters: true,
                      acceptSuggestionOnEnter: "on",
                      tabCompletion: "on",
                      wordBasedSuggestions: "allDocuments",
                      parameterHints: { enabled: true },
                      quickSuggestions: true,
                      contextmenu: true,
                    }}
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
                    {/* Test Cases Tab */}
                    <TabPane tabId="testcases" className="p-4">
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
                          <Card key={testCase.id} className="border">
                            <CardBody className="p-3">
                              <div className="d-flex justify-content-between align-items-center mb-2">
                                <div className="d-flex align-items-center gap-2">
                                  <span className="small fw-semibold">
                                    Test Case {index + 1}
                                  </span>
                                  {testCase.status === "passed" && (
                                    <CheckCircle
                                      size={16}
                                      className="text-success"
                                    />
                                  )}
                                  {testCase.status === "failed" && (
                                    <XCircle
                                      size={16}
                                      className="text-danger"
                                    />
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
                                <Label className="small fw-semibold">
                                  Input:
                                </Label>
                                <Input
                                  type="textarea"
                                  value={testCase.input}
                                  onChange={(e) =>
                                    updateTestCase(
                                      testCase.id,
                                      "input",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Enter input..."
                                  style={{
                                    fontSize: "13px",
                                    minHeight: "60px",
                                  }}
                                />
                              </FormGroup>

                              <FormGroup className="mb-0">
                                <Label className="small fw-semibold">
                                  Expected Output:
                                </Label>
                                <Input
                                  type="textarea"
                                  value={testCase.expectedOutput}
                                  onChange={(e) =>
                                    updateTestCase(
                                      testCase.id,
                                      "expectedOutput",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Enter expected output..."
                                  style={{
                                    fontSize: "13px",
                                    minHeight: "60px",
                                  }}
                                />
                              </FormGroup>

                              {testCase.actualOutput !== undefined && (
                                <div className="mt-2">
                                  <Label className="small fw-semibold">
                                    Actual Output:
                                  </Label>
                                  <pre
                                    className={`small p-2 rounded ${
                                      testCase.status === "passed"
                                        ? "bg-success-subtle text-success-emphasis"
                                        : "bg-danger-subtle text-danger-emphasis"
                                    }`}
                                    style={{
                                      fontSize: "13px",
                                      whiteSpace: "pre-wrap",
                                    }}
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
                        ))}
                      </div>
                    </TabPane>

                    {/* Result Tab */}
                    <TabPane tabId="result" className="p-4">
                      <h6 className="fw-semibold mb-3">Execution Result</h6>

                      {totalTests > 0 && (
                        <div className="mb-3">
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <span className="fw-semibold">Test Results:</span>
                            <Badge
                              color={
                                passedTests === totalTests
                                  ? "success"
                                  : "danger"
                              }
                              className="px-2 py-1"
                            >
                              {passedTests}/{totalTests} Passed
                            </Badge>
                          </div>

                          <div
                            className="progress mb-2"
                            style={{ height: "8px" }}
                          >
                            <div
                              className="progress-bar bg-success"
                              style={{
                                width: `${(passedTests / totalTests) * 100}%`,
                              }}
                            />
                          </div>
                        </div>
                      )}

                      {error && (
                        <Alert color="danger" className="p-3">
                          <Label className="small fw-semibold mb-2">
                            Error:
                          </Label>
                          <pre
                            className="mb-0 small"
                            style={{ whiteSpace: "pre-wrap" }}
                          >
                            {error}
                          </pre>
                        </Alert>
                      )}

                      {!error &&
                        passedTests === totalTests &&
                        totalTests > 0 && (
                          <Alert color="success" className="p-3">
                            <CheckCircle size={20} className="me-2" />
                            All test cases passed! Great job! 🎉
                          </Alert>
                        )}
                    </TabPane>
                  </TabContent>
                </div>

                {/* Action Buttons */}
                <div className="border-top p-4">
                  <div className="d-grid gap-2">
                    <Button
                      color="primary"
                      onClick={runAllTestCases}
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
                      onClick={submitSolution}
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
      `}</style>
    </div>
  );
};

export default PracticeCompiler;
