import { useNavigate } from "react-router-dom";
import useCalendar from "../hooks/useCalendar";

export default function YearCard({
	year,
	entryMonths
}: {
	year: number;
	entryMonths: number[];
}) {
	const { months } = useCalendar();
	const navigate = useNavigate();

	return (
		<div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-6 space-y-4">
			<h2 className="text-xl font-medium text-green-300">{year}</h2>

			<div className="flex flex-wrap gap-3">
				{months.map(month => (
					<button
						key={month}
						className={`px-4 py-2 rounded-full text-sm
                        border border-neutral-700
                        hover:bg-green-900/30 hover:text-green-300
                        hover:border-green-700
                        transition-colors ${entryMonths.includes(months.indexOf(month) + 1) ? "bg-green-900/60 text-green-300 border-green-700 hover:cursor-pointer " : "bg-neutral-800 border-neutral-700 text-neutral-300 hover:cursor-not-allowed hover:bg-neutral-800/60 hover:text-neutral-300 hover:border-neutral-700"}`}
						onClick={() => {
							if (!entryMonths.includes(months.indexOf(month))) return;
							navigate(
								`/calendar?month=${months.indexOf(month) + 1}&year=${year}`
							);
						}}
						disabled={!entryMonths.includes(months.indexOf(month))}
					>
						{month}
					</button>
				))}
			</div>
		</div>
	);
}
