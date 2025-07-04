export interface TestCase {
  id: string;
  input: string;
  expectedOutput: string;
  actualOutput?: string;
  status?: "passed" | "failed" | "pending";
  executionTime?: number;
}
