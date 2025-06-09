"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Highlight from "@tiptap/extension-highlight";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import classes from "./Editor.module.css";

type EditorTypes = {
  label?: string;
};

const MenuBar = ({ editor }: any) => {
  if (!editor) return null;

  const btn = (name: string, command: () => void, active = false) => (
    <button
      onClick={command}
      className={`${classes["menu-button"]} ${active ? "active" : ""}`}
      type="button"
    >
      {name}
    </button>
  );

  return (
    <div className={classes["menu-bar"]}>
      {btn("Undo", () => editor.chain().focus().undo().run())}
      {btn("Redo", () => editor.chain().focus().redo().run())}
      {btn(
        "Bold",
        () => editor.chain().focus().toggleBold().run(),
        editor.isActive("bold")
      )}
      {btn(
        "Italic",
        () => editor.chain().focus().toggleItalic().run(),
        editor.isActive("italic")
      )}
      {btn(
        "Underline",
        () => editor.chain().focus().toggleUnderline().run(),
        editor.isActive("underline")
      )}
      {btn(
        "Strike",
        () => editor.chain().focus().toggleStrike().run(),
        editor.isActive("strike")
      )}
      {btn(
        "Code",
        () => editor.chain().focus().toggleCode().run(),
        editor.isActive("code")
      )}
      {btn(
        "H1",
        () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
        editor.isActive("heading", { level: 1 })
      )}
      {btn(
        "H2",
        () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
        editor.isActive("heading", { level: 2 })
      )}
      {btn(
        "H3",
        () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
        editor.isActive("heading", { level: 3 })
      )}
      {btn(
        "Bullet",
        () => editor.chain().focus().toggleBulletList().run(),
        editor.isActive("bulletList")
      )}
      {btn(
        "Numbered",
        () => editor.chain().focus().toggleOrderedList().run(),
        editor.isActive("orderedList")
      )}
      {btn(
        "Task List",
        () => editor.chain().focus().toggleTaskList().run(),
        editor.isActive("taskList")
      )}
      {btn(
        "Quote",
        () => editor.chain().focus().toggleBlockquote().run(),
        editor.isActive("blockquote")
      )}
      {btn(
        "Code Block",
        () => editor.chain().focus().toggleCodeBlock().run(),
        editor.isActive("codeBlock")
      )}
      {btn("HR", () => editor.chain().focus().setHorizontalRule().run())}
      {btn(
        "Highlight",
        () => editor.chain().focus().toggleHighlight().run(),
        editor.isActive("highlight")
      )}
      {btn(
        "Sub",
        () => editor.chain().focus().toggleSubscript().run(),
        editor.isActive("subscript")
      )}
      {btn(
        "Sup",
        () => editor.chain().focus().toggleSuperscript().run(),
        editor.isActive("superscript")
      )}
      {btn(
        "Link",
        () => {
          const url = window.prompt("Enter URL");
          if (url) editor.chain().focus().setLink({ href: url }).run();
        },
        editor.isActive("link")
      )}
      {btn("Image", () => {
        const url = window.prompt("Enter image URL");
        if (url) editor.chain().focus().setImage({ src: url }).run();
      })}
      {btn("Clear", () =>
        editor.chain().focus().clearNodes().unsetAllMarks().run()
      )}
    </div>
  );
};

const TiptapEditor = ({ label }: EditorTypes) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      Underline,
      Link,
      Highlight,
      Subscript,
      Superscript,
      TaskList,
      TaskItem.configure({ nested: true }),
      HorizontalRule,
      Image,
    ],
    content: "<p>Hello rich world! 🌐</p>",
  });

  return (
    <section className={classes.container}>
      {label && (
        <label htmlFor="text" className={classes.label}>
          {label}
        </label>
      )}

      <div className={classes["editor-wrapper"]}>
        <MenuBar editor={editor} />
        <EditorContent
          editor={editor}
          className={classes["editor-content"]}
          id="text"
        />
      </div>
    </section>
  );
};

export default TiptapEditor;
