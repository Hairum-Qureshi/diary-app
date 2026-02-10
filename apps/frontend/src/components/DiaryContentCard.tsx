import { useEffect, useState } from "react";
import type { Entry } from "../interfaces";
import useDiary from "../hooks/useDiary";
import { FaLock } from "react-icons/fa";
import { FaUnlock } from "react-icons/fa6";

export default function DiaryContentCard({
	entryData
}: {
	entryData: Entry | null;
}) {
	const { toggleVisibility, editEntry, deleteEntry } = useDiary();

	const [isPrivate, setIsPrivate] = useState(
		entryData?.visibility === "private"
	);

	const togglePrivacy = () => {
		setIsPrivate(prev => !prev);

		if (entryData?._id) toggleVisibility(entryData._id);
	};

	useEffect(() => {
		if (entryData) setIsPrivate(entryData.visibility === "private");
	}, [entryData]);

	// TODO - make word count dynamic but shouldn't count HTML tags in content, maybe use a library to parse HTML and count words in text nodes only

	return (
		<article className="p-2 shadow-sm">
			{/* Entry metadata + privacy toggle */}
			<div className="mb-6 flex items-start justify-between gap-4">
				<div>
					<h2 className="text-2xl font-medium text-zinc-100">
						{entryData?.title}
					</h2>
					<time className="mt-1 block text-sm text-zinc-400">
						{entryData?.createdAt
							? new Date(entryData.createdAt).toLocaleDateString()
							: ""}
						{" · "}
						{entryData?.createdAt
							? new Date(entryData.createdAt).toLocaleTimeString()
							: ""}
					</time>
				</div>

				<button
					onClick={togglePrivacy}
					aria-label={isPrivate ? "Make entry public" : "Make entry private"}
					className="flex items-center gap-2 rounded-md border border-zinc-800 px-3 py-2 text-sm text-zinc-300 hover:text-emerald-300 hover:border-emerald-400 transition hover:cursor-pointer"
				>
					{isPrivate ? (
						<>
							<FaLock className="text-emerald-400" />
							<span className="hidden sm:inline">Private</span>
						</>
					) : (
						<>
							<FaUnlock className="text-zinc-400" />
							<span className="hidden sm:inline">Public</span>
						</>
					)}
				</button>
			</div>

			{/* Entry content */}
			<div
				className="space-y-4 text-zinc-200 leading-relaxed"
				dangerouslySetInnerHTML={{ __html: entryData?.content || "" }}
			/>

			{/* Footer actions */}
			<footer className="mt-8 flex items-center justify-between border-t border-zinc-800 pt-4">
				<span className="text-xs text-zinc-500">Word count: 187</span>

				<div className="flex gap-3">
					<button
						className="text-sm text-emerald-400 hover:text-emerald-300 hover:cursor-pointer transition"
						onClick={() => {
							if (entryData)
								editEntry({
									entryID: entryData._id,
									title: entryData.title,
									date: entryData.createdAt,
									content: entryData.content
								});
						}}
					>
						Edit
					</button>
					<button className="text-sm text-zinc-400 hover:text-emerald-300 hover:cursor-pointer transition">
						Share
					</button>
					<button
						className="text-sm text-red-400 hover:text-zinc-200 hover:cursor-pointer transition"
						onClick={() => {
							if (entryData?._id) deleteEntry(entryData._id);
						}}
					>
						Delete
					</button>
				</div>
			</footer>
		</article>
	);
}
