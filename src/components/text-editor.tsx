import './text-editor.css'
import MDEditor from '@uiw/react-md-editor';
import { useState, useEffect, useRef } from 'react';

const TextEditor: React.FC = () => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        editorRef.current &&
        event.target &&
        editorRef.current.contains(event.target as Node)
      ) {
        return;
      }
      setEditing(false);
    };

    document.addEventListener('click', listener, { capture: true });

    return () => {
      document.removeEventListener('click', listener);
    };
  }, []);

  if (editing) {
    return (
      <div ref={editorRef}>
        <MDEditor />
      </div>
    );
  }

  return (
    <div onClick={() => setEditing(true)}>
      <MDEditor.Markdown source={'# Header'} />
    </div>
  );
};

export default TextEditor;
