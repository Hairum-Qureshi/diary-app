import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link"; // only add this if you want link functionality
import Underline from "@tiptap/extension-underline"; // only add this if you want underline functionality
import Toolbar from "./Toolbar";
import "../css/index.css";
import { Placeholder } from "@tiptap/extensions";
import { useLocation } from "react-router-dom";
import useDiary from "../hooks/useDiary";
import { useEffect } from "react";

export default function Editor() {
	const location = useLocation();
	const { entryData } = useDiary();

	const editor = useEditor({
		extensions: [
			StarterKit,
			Link,
			Underline,
			Placeholder.configure({ placeholder: "Write something..." })
		],
		editorProps: {
			attributes: {
				class: "focus:outline-none" // hides the default outline when clicking in the editor
			}
		},
		enablePasteRules: true, // disable Markdown when pasting
		enableInputRules: true, // disable Markdown when typing
		content: location.pathname.includes("edit")
			? entryData
				? entryData.content
				: ""
			: ""
	});

	if (!editor) return null;

	useEffect(() => {
		// set editor content
		if (location.pathname.includes("edit") && entryData) {
			editor.commands.setContent(entryData.content);
		}
	}, [location.pathname, entryData]);

	return (
		<div className="w-full">
			<Toolbar editor={editor} />
			<div
				className="text-white mx-4 mt-3 leading-5 h-72 overflow-y-auto
                [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mb-4
                [&_h3]:text-xl [&_h3]:font-bold [&_h3]:mb-4
                [&_p]:mb-2
                [&_blockquote]:pl-4 [&_blockquote]:border-l-4 [&_blockquote]:border-sky-500 [&_blockquote]:italic [&_blockquote]:text-slate-400
                [&_ul]:list-disc [&_ul]:pl-6
                [&_ol]:list-decimal [&_ol]:pl-6
                [&_li]:mb-1
                [&_a]:text-sky-400 [&_a]:underline [&_a]:hover:text-sky-300 border-b border-green-900/60 pb-4"
			>
				<EditorContent
					editor={editor}
					onInput={() => {
						localStorage.setItem("editorContent", editor.getHTML());
					}}
				/>
			</div>
		</div>
	);
}
