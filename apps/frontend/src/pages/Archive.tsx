import YearCard from "../components/YearCard";
import useCalendar from "../hooks/useCalendar";

export default function Archive() {
	const { allEntries } = useCalendar();

	// TODO - add search functionality
	// TODO - add logic for highlighting months that have entries and also showing the number of entries for each month, maybe with a badge or something
	// TODO - add logic to only show years that have entries and also sort the years in descending order so that the most recent year is at the top.

	return (
		<div className="min-h-screen bg-neutral-950 text-neutral-200 px-6 py-10">
			<div className="max-w-4xl mx-auto space-y-10">
				{/* Header */}
				<div className="space-y-2">
					<h1 className="text-3xl font-semibold text-green-400">Archive</h1>
					<p className="text-sm text-neutral-400">
						Browse your entries by year and month
					</p>
				</div>

				<div>
					<input
						type="text"
						placeholder="Search entries..."
						className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-4 py-3 text-base text-neutral-200 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-green-500"
					/>
				</div>

				{/* Years */}
				{allEntries?.postedYears?.length > 0 ? (
					<div className="space-y-6">
						{allEntries.postedYears
							.sort((a: number, b: number) => b - a)
							.map((year: number) => (
								<YearCard
									key={year}
									year={year}
									entryMonths={
										allEntries.archives.find(archive => archive.year === year)
											?.months || []
									}
								/>
							))}
					</div>
				) : (
					<p className="text-sm text-neutral-400 text-center text-xl mt-20">
						No entries found
					</p>
				)}
			</div>
		</div>
	);
}
