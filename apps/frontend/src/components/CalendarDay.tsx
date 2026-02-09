import type { CalendarDayProps } from "../interfaces";

export default function CalendarDay({
	day,
	hasEntry,
	currentMonth,
	currentYear,
	getWeekDayOfMonth,
	isToday
}: CalendarDayProps) {
	return (
		<div
			key={day}
			className={`flex items-start gap-4 px-6 py-4 transition
                  ${isToday(currentMonth, currentYear, day) ? "bg-green-900/30 border border-green-700" : "hover:bg-green-950/80"}
                `}
		>
			{/* Date column */}
			<div className="w-14 text-right">
				<p className="text-sm font-medium text-zinc-200">{day}</p>
				<p className="text-xs text-zinc-500">
					{getWeekDayOfMonth(currentMonth, currentYear, day)}
				</p>
			</div>

			{/* Entry preview */}
			<div className="flex-1">
				{hasEntry ? (
					<>
						<p className="text-sm text-zinc-200">
							Felt quieter than usual today. Needed that.
						</p>
						<p className="mt-1 text-xs text-zinc-500">11:42 PM</p>
					</>
				) : (
					<p className="text-sm italic text-zinc-500">No entry</p>
				)}
			</div>

			{/* Indicator */}
			{hasEntry && (
				<span className="mt-1 h-2 w-2 rounded-full bg-emerald-600" />
			)}
		</div>
	);
}
