import { useState } from "react";

interface UseCalendarHook {
	currentMonth: string;
	currentYear: number;
	getDaysInMonth: (month: string, year: number) => number;
	months: readonly string[];
	getNextMonth: () => void;
	getPreviousMonth: () => void;
	getWeekDayOfMonth: (month: string, year: number, day: number) => string;
	isToday: (month: string, year: number, day: number) => boolean;
}

export default function useCalendar(): UseCalendarHook {
	const months: readonly string[] = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December"
	];

	const daysOfWeek: readonly string[] = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday"
	];

	const [currentMonth, setCurrentMonth] = useState(
		months[new Date().getMonth()]
	);
	const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

	function getDaysInMonth(month: string, year: number): number {
		const monthIndex = months.indexOf(month);
		return new Date(year, monthIndex + 1, 0).getDate();
	}

	function getNextMonth() {
		setCurrentMonth(prevMonth => {
			const currentIndex = months.indexOf(prevMonth);
			const nextIndex = (currentIndex + 1) % months.length;

			if (nextIndex === 0) {
				setCurrentYear(prevYear => prevYear + 1);
			}

			return months[nextIndex];
		});
	}

	function getPreviousMonth() {
		setCurrentMonth(prevMonth => {
			const currentIndex = months.indexOf(prevMonth);
			const previousIndex = (currentIndex - 1 + months.length) % months.length;

			if (previousIndex === months.length - 1) {
				setCurrentYear(prevYear => prevYear - 1);
			}

			return months[previousIndex];
		});
	}

	function getWeekDayOfMonth(month: string, year: number, day: number): string {
		const monthIndex = months.indexOf(month);
		const date = new Date(year, monthIndex, day);
		return daysOfWeek[date.getDay()];
	}

	function isToday(month: string, year: number, day: number): boolean {
		const today = new Date();
		const monthIndex = months.indexOf(month);
		return (
			today.getFullYear() === year &&
			today.getMonth() === monthIndex &&
			today.getDate() === day
		);
	}

	return {
		currentMonth,
		currentYear,
		getDaysInMonth,
		months,
		getNextMonth,
		getPreviousMonth,
		getWeekDayOfMonth,
		isToday,
		months
	};
}
