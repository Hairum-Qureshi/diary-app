import { Link } from "react-router-dom";
import CalendarDay from "../components/CalendarDay";
import useCalendar from "../hooks/useCalendar";

export default function Calendar() {
	const {
		currentMonth,
		currentYear,
		getDaysInMonth,
		getNextMonth,
		getPreviousMonth,
		getWeekDayOfMonth,
		isToday,
		months,
		monthEntriesData
	} = useCalendar();

	// ! bug - when navigating to the next month, sometimes the year increments by 2 instead of 1. This is because the getNextMonth function is called twice in quick succession, causing the year to increment twice. To fix this, we can use a ref to track whether the month change is already in progress and prevent multiple increments.

	return (
		<div className="min-h-screen bg-zinc-950 text-zinc-100">
			<div className="mx-auto max-w-5xl px-6 py-10">
				{/* Header */}
				<header className="mb-8 flex items-center justify-between">
					<button
						className="rounded-lg border border-green-900/60 bg-green-950/60 px-3 py-2 text-sm text-zinc-300 hover:border-green-700 transition hover:cursor-pointer"
						onClick={getPreviousMonth}
					>
						←
					</button>

					<div className="text-center">
						<h1 className="text-2xl font-semibold tracking-tight">
							{currentMonth}
						</h1>
						<p className="text-sm text-zinc-400">{currentYear}</p>
					</div>

					<button
						className="rounded-lg border border-green-900/60 bg-green-950/60 px-3 py-2 text-sm text-zinc-300 hover:border-green-700 transition hover:cursor-pointer disabled:cursor-not-allowed disabled:border-green-900/30 disabled:text-green-900/30"
						onClick={getNextMonth}
						disabled={
							currentYear === new Date().getFullYear() &&
							currentMonth === "December"
						}
					>
						→
					</button>
				</header>

				{/* Days list */}
				<div className="rounded-xl border border-green-900/60 bg-green-950/50 divide-y divide-green-900/40">
					{[...Array(getDaysInMonth(currentMonth, currentYear))].map((_, i) => {
						const day = i + 1;
						let title = "";
						const hasEntry = monthEntriesData?.some(entry => {
							const entryDay = entry.createdAt.split("T")[0].split("-")[2];
							title = entry.title;
							return parseInt(entryDay) === day;
						});

						return (
							<Link
								to={`/entry/${months.indexOf(currentMonth) + 1}/${day}/${currentYear}`}
								key={day}
							>
								<CalendarDay
									day={day}
									hasEntry={hasEntry}
									currentMonth={currentMonth}
									currentYear={currentYear}
									getWeekDayOfMonth={getWeekDayOfMonth}
									isToday={isToday}
									title={title}
								/>
							</Link>
						);
					})}
				</div>
			</div>
		</div>
	);
}
