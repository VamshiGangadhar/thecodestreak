import React from "react";
import Editor from "@monaco-editor/react";

interface PracticeEditorProps {
  code: string;
  setCode: (code: string) => void;
  selectedLanguage: any;
  isDarkTheme: boolean;
  editorRef: React.MutableRefObject<any>;
  handleEditorDidMount: (
    editor: any,
    monaco: any,
    editorRef: React.MutableRefObject<any>
  ) => void;
}

const PracticeEditor: React.FC<PracticeEditorProps> = ({
  code,
  setCode,
  selectedLanguage,
  isDarkTheme,
  editorRef,
  handleEditorDidMount,
}) => (
  <Editor
    height="100%"
    language={selectedLanguage.monacoId}
    value={code}
    onChange={(value) => setCode(value || "")}
    onMount={(editor, monaco) =>
      handleEditorDidMount(editor, monaco, editorRef)
    }
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
);

export default PracticeEditor;
