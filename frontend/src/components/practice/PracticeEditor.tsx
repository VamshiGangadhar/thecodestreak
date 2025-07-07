import React from "react";
import Editor from "@monaco-editor/react";
import { Card, CardBody, Label, Input } from "reactstrap";
import { LANGUAGES } from "./static/languageConfiguration";

interface PracticeEditorProps {
  code: string;
  setCode: (code: string) => void;
  selectedLanguage: any;
  setSelectedLanguage: (lang: any) => void;
  setError: (err: string) => void;
  setTestCases: (fn: any) => void;
  isDarkTheme: boolean;
  editorRef: React.MutableRefObject<any>;
  handleEditorDidMount: (
    editor: any,
    monaco: any,
    editorRef: React.MutableRefObject<any>
  ) => void;
  DEFAULT_CODE: any;
  onRunAll?: () => void;
  onSubmit?: () => void;
  isRunning?: boolean;
  isSubmitting?: boolean;
}

const PracticeEditor: React.FC<PracticeEditorProps> = ({
  code,
  setCode,
  selectedLanguage,
  setSelectedLanguage,
  setError,
  setTestCases,
  isDarkTheme,
  editorRef,
  handleEditorDidMount,
  DEFAULT_CODE,
  onRunAll,
  onSubmit,
  isRunning,
  isSubmitting,
}) => (
  <div
    style={{
      position: "relative",
      height: "100%",
      display: "flex",
      flexDirection: "column",
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
        onChange={(e) => {
          const language = LANGUAGES.find((lang) => lang.id === e.target.value);
          if (language) {
            setSelectedLanguage(language);
            setCode(DEFAULT_CODE[language.id] || "");
            setError("");
            setTestCases((prev: any) =>
              prev.map((tc: any) => ({
                ...tc,
                actualOutput: undefined,
                status: undefined,
              }))
            );
          }
        }}
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
        <div style={{ flex: 1, minHeight: 0 }}>
          <Editor
            height="100%"
            language={selectedLanguage.monacoId}
            value={code}
            onChange={(value) => setCode(value || "")}
            onMount={(editor, monaco) =>
              handleEditorDidMount(editor, monaco, editorRef)
            }
            theme={isDarkTheme ? "light" : "vs-dark"}
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
  </div>
);

export default PracticeEditor;
