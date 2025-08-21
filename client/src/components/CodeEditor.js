import React, { useState } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css'; //Example style, you can use another
import styles from './CodeEditor.module.css';

const CodeEditor = () => {
  const [code, setCode] = useState(
    `function add(a, b) {\n  return a + b;\n}`
  );

  return (
    <Editor
      value={code}
      onValueChange={code => setCode(code)}
      highlight={code => highlight(code, languages.js)}
      padding={10}
      className={styles.editor}
    />
  );
};

export default CodeEditor;
