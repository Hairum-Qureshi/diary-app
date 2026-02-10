import useDiary from "../hooks/useDiary";
import DiaryContentCard from "../components/DiaryContentCard";
import { Link } from "react-router-dom";

export default function DiaryEntry() {
	const { entryData } = useDiary();

	return (
		<div className="min-h-screen bg-zinc-950 text-zinc-100 flex justify-center px-4 py-12">
			<div className="w-full max-w-3xl">
				<header className="mb-8 border-b border-zinc-800 pb-4">
					<h1 className="text-3xl font-semibold tracking-tight text-emerald-400">
						Personal Diary
					</h1>
					<p className="mt-2 text-sm text-zinc-400">
						A quiet space to reflect, write, and remember.
					</p>
				</header>
				{entryData ? (
					<DiaryContentCard entryData={entryData} />
				) : (
					<h2 className="text-center text-2xl my-20 text-zinc-500 max-w-3/4 mx-auto">
						There's nothing written for this day yet. Why not create a{" "}
						<Link to="/new-entry" className="text-green-500 hover:underline">
							new entry
						</Link>{" "}
						and jot down your thoughts?
					</h2>
				)}
			</div>
		</div>
	);
}
