import { useEditor, EditorContent } from '@tiptap/react';
import { Link2, Link2Off } from 'lucide-react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';

import { useEffect } from 'react';

export default function TiptapEditor({ body, onEditorChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit, // Includes basic text formatting
      Underline,
      Link.configure({
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
        HTMLAttributes: {
          target: '_blank',
          rel: 'noopener noreferrer',
        }
      }),
      Image.configure({
        inline: false,
        allowBase64: false,
        HTMLAttributes: {
          class: 'the-campfire-post-image'
        }
      }),
    ],
    content: body,
    onUpdate: ({ editor }) => {
      onEditorChange(editor.getHTML());
    }
  });

  useEffect(() => {
    if (!editor) return;

    if (body !== editor.getHTML()) {
      editor.commands.setContent(body || "");
    }
  }, [body, editor]);

  if (!editor) return null;

  return (
    <div>
      <div className="formatting">

        <div className="formatting-section">
          <button type="button" onClick={() => editor?.chain().focus().undo().run()} aria-label="undo">↺</button>
          <button type="button" onClick={() => editor?.chain().focus().redo().run()} aria-label="redo">↻</button>
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
          <button type="button" onClick={() => editor?.chain().focus().toggleBold().run()}>Bold</button>
          <button type="button" onClick={() => editor?.chain().focus().toggleItalic().run()}>Italic</button>
          <button type="button" onClick={() => editor?.chain().focus().toggleUnderline().run()}>Underline</button>
          <button type="button" onClick={() => editor?.chain().focus().toggleStrikethrough().run()}>Strikethrough</button>
        </div>

        <div className="formatting-section">
          <button type="button" onClick={() => editor?.chain().focus().setImage({ src: imageUrl }).run()}>Image</button>
        </div>

        <div className="formatting-section">
          <button type="button" onClick={() => editor?.chain().focus().toggleOrderedList().run()}>Ordered List</button>
          <button type="button" onClick={() => editor?.chain().focus().toggleBulletList().run()}>UnorderedList</button>
        </div> 
        
        <div className="formatting-section">
          <button type="button" onClick={() => editor?.chain().focus().toggleBlockquote().run()}>Blockquote</button>
          <button type="button" onClick={() => editor?.chain().focus().toggleCodeBlock().run()}>Code Block</button>
        </div>

        <div className="formatting-section">
          <button type="button" onClick={() => {
            const url = prompt('Enter URL');

            if (url) {
              editor?.chain().focus().setLink({ href: url }).run()
            }}
          }><Link2 size={18} /></button>
          <button type="button" onClick={() => editor?.chain().focus().unsetLink().run()}><Link2Off size={18} /></button>
        </div>

      </div>
      <EditorContent editor={editor} />
    </div>
  );
}