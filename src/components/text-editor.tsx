import MDEditor from '@uiw/react-md-editor';
import { useState } from 'react';

const TextEditor: React.FC = () => {
  const [editing, setEditing] = useState(false);

  if (editing) {
    return (
      <div>
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
