import './text-editor.css';
import MDEditor from '@uiw/react-md-editor';
import { useState, useEffect, useRef } from 'react';
import { Cell } from '../state';
import { useActions } from '../hooks/use-actions';

interface TextEditorProps {
  cell: Cell;
}

const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const [editing, setEditing] = useState(false);
  const { updateCell } = useActions();

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
      <div className="text-editor card" ref={editorRef}>
        <MDEditor
          value={cell.content}
          onChange={(v) => updateCell(cell.id, v || '')}
        />
      </div>
    );
  }

  return (
    <div className="text-editor card" onClick={() => setEditing(true)}>
      <div className="card-content">
        <MDEditor.Markdown source={cell.content || "CLICK TO EDIT"} />
      </div>
    </div>
  );
};

export default TextEditor;
