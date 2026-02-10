import { useEffect, useState } from "react";
import { FaLock } from "react-icons/fa";
import useDiary from "../hooks/useDiary";
import { FaUnlock } from "react-icons/fa6";

export default function DiaryEntry() {
	const { entryData } = useDiary();
	const { toggleVisibility } = useDiary();

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

	return (
		<div className="min-h-screen bg-zinc-950 text-zinc-100 flex justify-center px-4 py-12">
			<div className="w-full max-w-3xl">
				{/* Header */}
				<header className="mb-8 border-b border-zinc-800 pb-4">
					<h1 className="text-3xl font-semibold tracking-tight text-emerald-400">
						Personal Diary
					</h1>
					<p className="mt-2 text-sm text-zinc-400">
						A quiet space to reflect, write, and remember.
					</p>
				</header>

				{/* Diary Entry Card */}
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
							aria-label={
								isPrivate ? "Make entry public" : "Make entry private"
							}
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
							<button className="text-sm text-emerald-400 hover:text-emerald-300 hover:cursor-pointer transition">
								Edit
							</button>
							<button className="text-sm text-zinc-400 hover:text-emerald-300 hover:cursor-pointer transition">
								Share
							</button>
							<button className="text-sm text-red-400 hover:text-zinc-200 hover:cursor-pointer transition">
								Delete
							</button>
						</div>
					</footer>
				</article>
			</div>
		</div>
	);
}
