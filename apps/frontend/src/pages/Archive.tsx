import useCalendar from "../hooks/useCalendar";

export default function Archive() {
	const { months } = useCalendar();

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
				<div className="space-y-8">
					{/* Year Card */}
					<div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-6 space-y-4">
						<h2 className="text-xl font-medium text-green-300">2025</h2>

						<div className="flex flex-wrap gap-3">
							{months.map(month => (
								<button
									key={month}
									className="px-4 py-2 rounded-full text-sm
									bg-neutral-800 text-neutral-300
									border border-neutral-700
									hover:bg-green-900/30 hover:text-green-300
									hover:border-green-700
									transition-colors hover:cursor-pointer"
								>
									{month}
								</button>
							))}
						</div>
					</div>

					{/* Another Year */}
					<div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-6 space-y-4">
						<h2 className="text-xl font-medium text-green-300">2024</h2>

						<div className="flex flex-wrap gap-3">
							{months.map(month => (
								<button
									key={month}
									className="px-4 py-2 rounded-full text-sm
									bg-neutral-800 text-neutral-400
									border border-neutral-700
									hover:bg-green-900/30 hover:text-green-300
									hover:border-green-700
									transition-colors hover:cursor-pointer"
								>
									{month}
								</button>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
