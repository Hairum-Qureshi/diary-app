import {
	FaBold,
	FaItalic,
	FaStrikethrough,
	FaQuoteRight,
	FaList,
	FaListOl,
	FaUnderline
} from "react-icons/fa";
import { Editor } from "@tiptap/react";

interface TipTapEditorToolbarProps {
	editor: Editor;
}

export default function TipTapEditorToolbar({
	editor
}: TipTapEditorToolbarProps) {
	// TODO - add styling for selected buttons (e.g. if the user clicks the bold button, it should stay highlighted until they click it again to turn it off)

	// ! The character counter isn't working

	// TODO - make it so that you can click anywhere in the editor and be able to type instead of having to click the first line of the editor to start typing. This is a bit tricky because of the way TipTap handles focus, but it should be possible to add an onClick handler to the editor container that focuses the editor when clicked.

	return (
		<div className="flex items-center">
			<button
				className="text-slate-600 ml-3 hover:cursor-pointer text-base"
				onClick={() => {
					editor.chain().focus().toggleBold().run();
					localStorage.setItem("editorContent", editor.getHTML());
				}}
				disabled={!editor.can().chain().focus().toggleBold().run()}
				title="Bold"
				type="button"
			>
				<FaBold
					className={`p-1 mt-2 text-2xl ${
						editor.isActive("bold") ? "text-sky-500" : "hover:text-slate-500"
					}`}
				/>
			</button>
			<button
				className="text-slate-600 ml-3 hover:cursor-pointer text-base"
				title="Italic"
				onClick={() => {
					editor.chain().focus().toggleItalic().run();
					localStorage.setItem("editorContent", editor.getHTML());
				}}
				disabled={!editor.can().chain().focus().toggleItalic().run()}
				type="button"
			>
				<FaItalic
					className={`p-1 mt-2 text-2xl ${
						editor.isActive("italic") ? "text-sky-500" : "hover:text-slate-500"
					}`}
				/>
			</button>
			<button
				className="text-slate-600 ml-3 hover:cursor-pointer text-base"
				title="Strikethrough"
				onClick={() => {
					editor.chain().focus().toggleStrike().run();
					localStorage.setItem("editorContent", editor.getHTML());
				}}
				disabled={!editor.can().chain().focus().toggleStrike().run()}
				type="button"
			>
				<FaStrikethrough
					className={`p-1 mt-2 text-2xl ${
						editor.isActive("strike") ? "text-sky-500" : "hover:text-slate-500"
					}`}
				/>
			</button>
			<button
				className="text-slate-600 ml-3 hover:cursor-pointer text-base"
				title="Underline"
				onClick={() => {
					editor.chain().focus().toggleUnderline().run();
					localStorage.setItem("editorContent", editor.getHTML());
				}}
				disabled={!editor.can().chain().focus().toggleUnderline().run()}
				type="button"
			>
				<FaUnderline
					className={`p-1 mt-2 text-2xl ${
						editor.isActive("underline")
							? "text-sky-500"
							: "hover:text-slate-500"
					}`}
				/>
			</button>
			<button
				className="text-slate-600 ml-3 hover:cursor-pointer text-base"
				title="Quote"
				onClick={() => {
					editor.chain().focus().toggleBlockquote().run();
					localStorage.setItem("editorContent", editor.getHTML());
				}}
				disabled={!editor.can().chain().focus().toggleBlockquote().run()}
				type="button"
			>
				<FaQuoteRight
					className={`p-1 mt-2 text-2xl ${
						editor.isActive("blockquote")
							? "text-sky-500"
							: "hover:text-slate-500"
					}`}
				/>
			</button>

			<button
				className="text-slate-600 ml-3 hover:cursor-pointer text-base"
				title="Bullet list"
				onClick={() => {
					editor.chain().focus().toggleBulletList().run();
					localStorage.setItem("editorContent", editor.getHTML());
				}}
				disabled={!editor.can().chain().focus().toggleBulletList().run()}
				type="button"
			>
				<FaList
					className={`p-1 mt-2 text-2xl ${
						editor.isActive("bulletList")
							? "text-sky-500"
							: "hover:text-slate-500"
					}`}
				/>
			</button>
			<button
				className="text-slate-600 ml-3 hover:cursor-pointer text-base"
				title="Numbered list"
				onClick={() => {
					editor.chain().focus().toggleOrderedList().run();
					localStorage.setItem("editorContent", editor.getHTML());
				}}
				type="button"
			>
				<FaListOl
					className={`p-1 mt-2 text-2xl ${
						editor.isActive("orderedList")
							? "text-sky-500"
							: "hover:text-slate-500"
					}`}
				/>
			</button>

			<span className="flex items-center ml-auto text-base text-slate-500 mr-3">
				{editor.getText().length} Characters
			</span>
		</div>
	);
}
