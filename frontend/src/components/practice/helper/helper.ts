// Helper functions for PracticeCompiler
import { LANGUAGES } from "../static/languageConfiguration";
import { TestCase } from "../types";

export const handleLanguageChange = (
  languageId: string,
  setSelectedLanguage: React.Dispatch<React.SetStateAction<any>>,
  setCode: React.Dispatch<React.SetStateAction<string>>,
  setError: React.Dispatch<React.SetStateAction<string>>,
  setTestCases: React.Dispatch<React.SetStateAction<TestCase[]>>,
  DEFAULT_CODE: any
) => {
  const language = LANGUAGES.find((lang) => lang.id === languageId);
  if (language) {
    setSelectedLanguage(language);
    setCode(DEFAULT_CODE[languageId as keyof typeof DEFAULT_CODE] || "");
    setError("");
    setTestCases((prev) =>
      prev.map((tc) => ({
        ...tc,
        actualOutput: undefined,
        status: undefined,
      }))
    );
  }
};

export const handleEditorDidMount = (
  editor: any,
  monaco: any,
  editorRef: React.MutableRefObject<any>
) => {
  editorRef.current = editor;
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

export const executeTestCase = async (
  testCase: TestCase,
  selectedLanguage: any,
  code: string
): Promise<{
  output: string;
  status: "passed" | "failed";
  hasError: boolean;
}> => {
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
    const result = await response.json();
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
        hasError: !!hasError,
      };
    }
    return { output: "No output", status: "failed", hasError: true };
  } catch (err) {
    return {
      output: "Execution error",
      status: "failed",
      hasError: true,
    };
  }
};

export const runTestCase = async (
  testCaseId: string,
  testCases: TestCase[],
  setTestCases: React.Dispatch<React.SetStateAction<TestCase[]>>,
  executeTestCaseFn: (
    testCase: TestCase
  ) => Promise<{
    output: string;
    status: "passed" | "failed";
    hasError: boolean;
  }>,
  setError: React.Dispatch<React.SetStateAction<string>>
) => {
  const testCase = testCases.find((tc) => tc.id === testCaseId);
  if (!testCase) return;
  setTestCases((prev) =>
    prev.map((tc) =>
      tc.id === testCaseId
        ? { ...tc, actualOutput: undefined, status: "pending" }
        : tc
    )
  );
  const startTime = Date.now();
  const result = await executeTestCaseFn(testCase);
  const executionTime = Date.now() - startTime;
  setTestCases((prev) =>
    prev.map((tc) =>
      tc.id === testCaseId
        ? {
            ...tc,
            actualOutput: result.output,
            status: result.status,
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

export const runAllTestCases = async (
  testCases: TestCase[],
  setTestCases: React.Dispatch<React.SetStateAction<TestCase[]>>,
  executeTestCaseFn: (
    testCase: TestCase
  ) => Promise<{
    output: string;
    status: "passed" | "failed";
    hasError: boolean;
  }>,
  setIsRunning: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<string>>
) => {
  setIsRunning(true);
  setError("");
  setTestCases((prev) =>
    prev.map((tc) => ({ ...tc, status: "pending", actualOutput: undefined }))
  );
  for (const testCase of testCases) {
    const startTime = Date.now();
    const result = await executeTestCaseFn(testCase);
    const executionTime = Date.now() - startTime;
    setTestCases((prev) =>
      prev.map((tc) =>
        tc.id === testCase.id
          ? {
              ...tc,
              actualOutput: result.output,
              status: result.status,
              executionTime,
            }
          : tc
      )
    );
    await new Promise((resolve) => setTimeout(resolve, 200));
  }
  setIsRunning(false);
};

export const submitSolution = async (
  runAllTestCasesFn: () => Promise<void>,
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setIsSubmitting(true);
  await runAllTestCasesFn();
  setIsSubmitting(false);
};

export const addTestCase = (
  setTestCases: React.Dispatch<React.SetStateAction<TestCase[]>>
) => {
  const newTestCase: TestCase = {
    id: Date.now().toString(),
    input: "",
    expectedOutput: "",
  };
  setTestCases((prev) => [...prev, newTestCase]);
};

export const removeTestCase = (
  id: string,
  setTestCases: React.Dispatch<React.SetStateAction<TestCase[]>>
) => {
  setTestCases((prev) => prev.filter((tc) => tc.id !== id));
};

export const updateTestCase = (
  id: string,
  field: "input" | "expectedOutput",
  value: string,
  setTestCases: React.Dispatch<React.SetStateAction<TestCase[]>>
) => {
  setTestCases((prev) =>
    prev.map((tc) => (tc.id === id ? { ...tc, [field]: value } : tc))
  );
};

export const resetCode = (
  selectedLanguage: any,
  setCode: React.Dispatch<React.SetStateAction<string>>,
  setError: React.Dispatch<React.SetStateAction<string>>,
  setTestCases: React.Dispatch<React.SetStateAction<TestCase[]>>,
  DEFAULT_CODE: any
) => {
  setCode(DEFAULT_CODE[selectedLanguage.id as keyof typeof DEFAULT_CODE] || "");
  setError("");
  setTestCases((prev) =>
    prev.map((tc) => ({ ...tc, actualOutput: undefined, status: undefined }))
  );
};
