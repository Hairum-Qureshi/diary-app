import { useEffect, useState } from "react";
import Editor from "../components/Editor";
import { useLocation } from "react-router-dom";
import useDiary from "../hooks/useDiary";

export default function DiaryForm() {
	const { createEntry, entryData, editEntry } = useDiary();
	const [title, setTitle] = useState(entryData ? entryData.title : "");
	const [date, setDate] = useState(
		entryData ? entryData.createdAt.split("T")[0] : ""
	);
	const location = useLocation();

	useEffect(() => {
		if (location.pathname.includes("edit") && entryData) {
			setTitle(entryData.title);
			setDate(entryData.createdAt.split("T")[0]);
			localStorage.setItem("editorContent", entryData.content); // Load content into local storage for editing
		}
	}, [location.pathname, entryData]);

	// ! I think there's an issue where if you paste content in the editor, it doesn't get saved to local storage, so when you submit the form, the form thinks that the content (which is required) is missing. I need to figure out a way to ensure that any changes made in the editor, including pasting content, are saved to local storage so that they can be included when creating or editing an entry.

	return (
		<div className="min-h-screen bg-zinc-950 text-zinc-100">
			<div className="mx-auto max-w-3xl px-6 py-10">
				{/* Header */}
				<header className="mb-10">
					<h1 className="text-2xl font-semibold tracking-tight">
						{location.pathname.includes("edit") ? "Edit" : "New"} Entry
					</h1>
					<p className="mt-1 text-sm text-zinc-400">
						Take your time. There&apos;s no rush.
					</p>
				</header>

				<form
					className="space-y-10"
					onSubmit={e => {
						e.preventDefault();
						createEntry(
							title,
							date,
							localStorage.getItem("editorContent") || ""
						);
						localStorage.removeItem("editorContent"); // Clear local storage after submission
						setTitle("");
						setDate("");
					}}
				>
					{/* Title */}
					<div>
						<label className="mb-2 block text-sm text-zinc-500">Title</label>
						<input
							type="text"
							placeholder="A quiet evening"
							className="
								w-full bg-transparent
								border-b border-green-900/60
								px-1 pb-2 text-lg
								placeholder-zinc-600
								focus:border-emerald-600
								focus:outline-none
							"
							value={title}
							onChange={e => setTitle(e.target.value)}
						/>
					</div>

					{/* Date + Today button */}
					<div>
						<label className="mb-2 block text-sm text-zinc-500">Date</label>

						<div className="flex items-end gap-4 max-w-md">
							<input
								type="date"
								className="
								flex-1 bg-transparent
								border-b border-green-900/60
								px-1 pb-2 text-sm
								text-zinc-300
								focus:border-emerald-600
								focus:outline-none
								"
								value={date}
								onChange={e => setDate(e.target.value)}
								max={new Date().toISOString().split("T")[0]} // prevent selecting future dates
							/>

							<button
								type="button"
								className="
								pb-2 text-sm
								text-emerald-500
								border-b border-transparent
								hover:border-emerald-600
								hover:text-emerald-400
								hover:cursor-pointer
								transition
								"
								onClick={() => setDate(new Date().toISOString().split("T")[0])}
							>
								Choose today&apos;s date
							</button>
						</div>
					</div>
					<div>
						<label className="mb-3 block text-sm text-zinc-500">Entry</label>
						<Editor />
					</div>

					{/* Actions */}
					<div className="flex items-center justify-between pt-6">
						<p className="text-xs text-zinc-500">
							Saved locally until you submit.
						</p>

						{location.pathname.includes("edit") ? (
							<button
								type="button"
								className="px-4 py-2 bg-emerald-600 text-sm rounded text-white hover:bg-emerald-700 transition hover:cursor-pointer"
								onClick={() =>
									editEntry({
										entryID: entryData ? entryData._id : "",
										title,
										date,
										content: localStorage.getItem("editorContent") || ""
									})
								}
							>
								Save Changes
							</button>
						) : (
							<button
								type="submit"
								className="px-4 py-2 bg-emerald-600 text-sm rounded text-white hover:bg-emerald-700 transition hover:cursor-pointer"
							>
								Create Entry
							</button>
						)}
					</div>
				</form>
			</div>
		</div>
	);
}
