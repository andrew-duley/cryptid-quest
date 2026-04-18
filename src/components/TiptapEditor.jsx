import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'

export default function TiptapEditor({ onEditorChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit, // Includes basic text formatting
      Underline,
    ],
    content: '<p>Hello Andrew! What are you going to write about today?</p>',
    onUpdate: ({ editor }) => {
      onEditorChange(editor.getHTML());
    }
  });

  if (!editor) return null;

  
  return (
    <div>
      <div>

        <div className="formatting-section">
          <button onClick={() => editor?.chain().focus().undo().run()}>Undo</button>
          <button onClick={() => editor?.chain().focus().redo().run()}>Redo</button>
        </div>

        <div className="formatting-section">
          <select onChange={e => {
            const value = e.target.value;

            value === "paragraph" ? editor?.chain().focus().setParagraph().run() : editor?.chain().focus().toggleHeading({ level: Number(value) }).run();
            }}>
            <option value="paragraph">Paragraph</option>
            <option value="2">H2</option>
            <option value="3">H3</option>
            <option value="4">H4</option>
            {/* <button onClick={() => editor?.chain().focus().toggleSmall().run()}>Small</button> */}
          </select>
        </div>
        
        <div className="formatting-section">
          <button onClick={() => editor?.chain().focus().toggleBold().run()}>Bold</button>
          <button onClick={() => editor?.chain().focus().toggleItalic().run()}>Italic</button>
          <button onClick={() => editor?.chain().focus().toggleUnderline().run()}>Underline</button>
          <button onClick={() => editor?.chain().focus().toggleStrikethrough().run()}>Strikethrough</button>
        </div>

        <div className="formatting-section">
          <button onClick={() => editor?.chain().focus().toggleOrderedList().run()}>Ordered List</button>
          <button onClick={() => editor?.chain().focus().toggleBulletList().run()}>UnorderedList</button>
        </div> 
        
        <div className="formatting-section">
          <button onClick={() => editor?.chain().focus().toggleBlockquote().run()}>Blockquote</button>
          <button onClick={() => editor?.chain().focus().toggleCodeBlock().run()}>Code Block</button>
        </div>

      </div>
      <EditorContent editor={editor} />
    </div>
  );
}