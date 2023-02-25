import { useState } from "react";
import CodeMirror from '@uiw/react-codemirror';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data'

interface INoteEditor {
  onSave: (note: { title: string; content: string }) => void;
}

export const NoteEditor: React.FC<INoteEditor> = ({ onSave }) => {
  const [title, setTitle] = useState<string>('');
  const [code, setCode] = useState<string>('');
  return (
    <div className="card mt-5 border border-gray-200 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">
          <input
            type="text"
            className="input-primary input input-lg w-full font-bold"
            placeholder="Note title"
            value={title}
            onChange={e => setTitle(e.currentTarget.value)}
          />
        </h2>
        <CodeMirror
          value={code}
          width="500px"
          height="30vh"
          minHeight="30vh"
          minWidth="100%"
          extensions={[
            markdown({
              base: markdownLanguage,
              codeLanguages: languages
            })
          ]}
          onChange={value => setCode(value)}
          className="border border-gray-300"
        />
      </div>
      <div className="card-actions justify-end">
        <button
          onClick={() => {
            onSave({ title, content: code });
            setCode('');
            setTitle('');
          }}
          className="btn-primary btn"
          disabled={title.trim().length === 0 || code.trim().length === 0}
        >Save</button>
      </div>
    </div>
  )
}