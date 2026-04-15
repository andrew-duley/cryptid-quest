import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

export default function TiptapEditor({ onEditorChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit, // Includes basic text formatting
    ],
    content: '<p>Hello Andrew! What are you going to write about today?</p>',
    onUpdate: ({ editor }) => {
      onEditorChange(editor.getHTML());
    }
  });

  if (!editor) return null;

  return <EditorContent className="tiptap"  editor={editor} />
}