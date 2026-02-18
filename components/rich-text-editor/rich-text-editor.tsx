"use client";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import SubScript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Highlighter,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Minus,
  Quote,
  Redo,
  RemoveFormattingIcon,
  Strikethrough,
  Subscript,
  Superscript as SuperscriptIcon,
  Underline as UnderlineIcon,
  Undo,
  Unlink,
} from "lucide-react";
import { useMemo } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import "./rich-text-editor.css";

// ✅ Move ToolbarButton OUTSIDE the component (top level)
interface ToolbarButtonProps {
  value: string;
  icon: React.ElementType;
  tooltip: string;
  shortcut?: string;
  onClick: () => void;
  disabled?: boolean;
  isActive: boolean;
}

const ToolbarButton = ({
  value,
  icon: Icon,
  tooltip,
  shortcut,
  onClick,
  disabled,
  isActive,
}: ToolbarButtonProps) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <ToggleGroupItem
        value={value}
        aria-label={tooltip}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onClick();
        }}
        disabled={disabled}
        data-state={isActive ? "on" : "off"}
      >
        <Icon className="size-4" />
      </ToggleGroupItem>
    </TooltipTrigger>
    <TooltipContent>
      <p>
        {tooltip}
        {shortcut && ` (${shortcut})`}
      </p>
    </TooltipContent>
  </Tooltip>
);

interface RichTextEditorProps {
  value?: string;
  placeholder?: string;
  onChange?: (content: string) => void;
  className?: string;
}

export function RichTextEditor({
  value = "",
  onChange,
  placeholder = "",
  className,
}: RichTextEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4],
        },
      }),
      Underline,
      Highlight,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-primary underline underline-offset-4",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "center", "right", "justify"],
      }),
      Superscript,
      SubScript,
      Placeholder.configure({
        placeholder,
        emptyEditorClass: "is-editor-empty",
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: cn(
          "block border-input field-sizing-content min-h-[300px] w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "prose prose-sm sm:prose-base max-w-full dark:prose-invert focus:ring-0 focus:outline-none",
        ),
      },
    },
  });

  // Memoize the toolbar sections (ToolbarButton is now outside)
  const textFormattingToolbar = useMemo(() => {
    if (!editor) return null;
    return (
      <ToggleGroup type="multiple" size="sm" variant="outline">
        <ToolbarButton
          value="bold"
          icon={Bold}
          tooltip="Bold"
          shortcut="Ctrl+B"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          isActive={editor.isActive("bold")}
        />
        <ToolbarButton
          value="strike"
          icon={Strikethrough}
          tooltip="Strikethrough"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          isActive={editor.isActive("strike")}
        />
        <ToolbarButton
          value="italic"
          icon={Italic}
          tooltip="Italic"
          shortcut="Ctrl+I"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          isActive={editor.isActive("italic")}
        />
        <ToolbarButton
          value="underline"
          icon={UnderlineIcon}
          tooltip="Underline"
          shortcut="Ctrl+U"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          disabled={!editor.can().chain().focus().toggleUnderline().run()}
          isActive={editor.isActive("underline")}
        />
        <ToolbarButton
          value="code"
          icon={Code}
          tooltip="Code"
          shortcut="Ctrl+E"
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          isActive={editor.isActive("code")}
        />
        <ToolbarButton
          value="highlight"
          icon={Highlighter}
          tooltip="Highlight"
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          disabled={!editor.can().chain().focus().toggleHighlight().run()}
          isActive={editor.isActive("highlight")}
        />
        <ToolbarButton
          value="clear"
          icon={RemoveFormattingIcon}
          tooltip="Clear formatting"
          onClick={() =>
            editor.chain().focus().clearNodes().unsetAllMarks().run()
          }
          disabled={
            !editor.can().chain().focus().clearNodes().unsetAllMarks().run()
          }
          isActive={false}
        />
      </ToggleGroup>
    );
  }, [editor]);

  const headingToolbar = useMemo(() => {
    if (!editor) return null;
    return (
      <ToggleGroup type="single" size="sm" variant="outline">
        {[1, 2, 3, 4].map((level) => (
          <ToolbarButton
            key={`h${level}`}
            value={`h${level}`}
            icon={
              level === 1
                ? Heading1
                : level === 2
                  ? Heading2
                  : level === 3
                    ? Heading3
                    : Heading4
            }
            tooltip={`Heading ${level}`}
            shortcut={`Ctrl+Alt+${level}`}
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleHeading({ level: level as 1 | 2 | 3 | 4 })
                .run()
            }
            disabled={
              !editor
                .can()
                .chain()
                .focus()
                .toggleHeading({ level: level as 1 | 2 | 3 | 4 })
                .run()
            }
            isActive={editor.isActive("heading", {
              level: level as 1 | 2 | 3 | 4,
            })}
          />
        ))}
      </ToggleGroup>
    );
  }, [editor]);

  const listToolbar = useMemo(() => {
    if (!editor) return null;
    return (
      <ToggleGroup type="multiple" size="sm" variant="outline">
        <ToolbarButton
          value="blockquote"
          icon={Quote}
          tooltip="Blockquote"
          shortcut="Ctrl+Shift+B"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          disabled={!editor.can().chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive("blockquote")}
        />
        <ToolbarButton
          value="bulletList"
          icon={List}
          tooltip="Bullet List"
          shortcut="Ctrl+Shift+8"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          disabled={!editor.can().chain().focus().toggleBulletList().run()}
          isActive={editor.isActive("bulletList")}
        />
        <ToolbarButton
          value="orderedList"
          icon={ListOrdered}
          tooltip="Ordered List"
          shortcut="Ctrl+Shift+7"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          disabled={!editor.can().chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive("orderedList")}
        />
        <ToolbarButton
          value="horizontalRule"
          icon={Minus}
          tooltip="Horizontal Rule"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          disabled={!editor.can().chain().focus().setHorizontalRule().run()}
          isActive={false}
        />
        <ToolbarButton
          value="superscript"
          icon={SuperscriptIcon}
          tooltip="Superscript"
          onClick={() => editor.chain().focus().toggleSuperscript().run()}
          disabled={!editor.can().chain().focus().toggleSuperscript().run()}
          isActive={editor.isActive("superscript")}
        />
        <ToolbarButton
          value="subscript"
          icon={Subscript}
          tooltip="Subscript"
          onClick={() => editor.chain().focus().toggleSubscript().run()}
          disabled={!editor.can().chain().focus().toggleSubscript().run()}
          isActive={editor.isActive("subscript")}
        />
      </ToggleGroup>
    );
  }, [editor]);

  const linkToolbar = useMemo(() => {
    if (!editor) return null;
    return (
      <ToggleGroup type="multiple" size="sm" variant="outline">
        <ToolbarButton
          value="add-link"
          icon={LinkIcon}
          tooltip="Add Link"
          shortcut="Ctrl+K"
          onClick={() => {
            const url = window.prompt("Enter URL");
            if (url) {
              editor
                .chain()
                .focus()
                .setLink({
                  href: url,
                  target: "_blank",
                  rel: "noopener noreferrer",
                })
                .run();
            }
          }}
          disabled={
            !editor
              .can()
              .chain()
              .focus()
              .setLink({ href: "https://example.com" })
              .run()
          }
          isActive={editor.isActive("link")}
        />
        <ToolbarButton
          value="remove-link"
          icon={Unlink}
          tooltip="Remove Link"
          shortcut="Ctrl+Shift+K"
          onClick={() => editor.chain().focus().unsetLink().run()}
          disabled={!editor.can().chain().focus().unsetLink().run()}
          isActive={false}
        />
      </ToggleGroup>
    );
  }, [editor]);

  const alignToolbar = useMemo(() => {
    if (!editor) return null;
    const alignments = [
      {
        value: "left",
        icon: AlignLeft,
        label: "Left",
        shortcut: "Ctrl+Shift+L",
      },
      {
        value: "center",
        icon: AlignCenter,
        label: "Center",
        shortcut: "Ctrl+Shift+E",
      },
      {
        value: "right",
        icon: AlignRight,
        label: "Right",
        shortcut: "Ctrl+Shift+R",
      },
      {
        value: "justify",
        icon: AlignJustify,
        label: "Justify",
        shortcut: "Ctrl+Shift+J",
      },
    ];
    return (
      <ToggleGroup type="single" size="sm" variant="outline">
        {alignments.map((align) => (
          <ToolbarButton
            key={align.value}
            value={align.value}
            icon={align.icon}
            tooltip={`Align ${align.label}`}
            shortcut={align.shortcut}
            onClick={() =>
              editor.chain().focus().setTextAlign(align.value).run()
            }
            disabled={
              !editor.can().chain().focus().setTextAlign(align.value).run()
            }
            isActive={editor.isActive({ textAlign: align.value })}
          />
        ))}
      </ToggleGroup>
    );
  }, [editor]);

  const undoRedoToolbar = useMemo(() => {
    if (!editor) return null;
    return (
      <ToggleGroup type="single" size="sm" variant="outline">
        <ToolbarButton
          value="undo"
          icon={Undo}
          tooltip="Undo"
          shortcut="Ctrl+Z"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          isActive={false}
        />
        <ToolbarButton
          value="redo"
          icon={Redo}
          tooltip="Redo"
          shortcut="Ctrl+Y"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          isActive={false}
        />
      </ToggleGroup>
    );
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className={className}>
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <TooltipProvider>
          {textFormattingToolbar}
          {headingToolbar}
          {listToolbar}
          {linkToolbar}
          {alignToolbar}
          {undoRedoToolbar}
        </TooltipProvider>
      </div>

      <EditorContent
        editor={editor}
        className="focus:ring-0 focus:outline-none"
      />
    </div>
  );
}
