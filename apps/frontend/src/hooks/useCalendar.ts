import { useState } from "react";

export default function useCalendar() {
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

			if (months[nextIndex] === "January") {
				setCurrentYear(new Date().getFullYear() + 1);
			}

			return months[nextIndex];
		});
	}

	function getPreviousMonth() {
		setCurrentMonth(prevMonth => {
			const currentIndex = months.indexOf(prevMonth);
			const previousIndex = (currentIndex - 1 + months.length) % months.length;

			if (months[previousIndex] === "December") {
				setCurrentYear(new Date().getFullYear() - 1);
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
		isToday
	};
}
