import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

interface UseCalendarHook {
	currentMonth: string;
	currentYear: number;
	getDaysInMonth: (month: string, year: number) => number;
	getNextMonth: () => void;
	getPreviousMonth: () => void;
	getWeekDayOfMonth: (month: string, year: number, day: number) => string;
	isToday: (month: string, year: number, day: number) => boolean;
	months: readonly string[];
	monthEntriesData: [
		{
			_id: string;
			title: string;
			createdAt: string;
		}
	];
	allEntries: {
		postedYears: number[];
		archives: {
			year: number;
			months: number[];
		}[];
	};
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

	const queryClient = useQueryClient();

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

		queryClient.invalidateQueries({
			queryKey: ["entries", currentMonth, currentYear]
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

	const { data: monthEntriesData } = useQuery({
		queryKey: ["entries", currentMonth, currentYear],
		queryFn: async () => {
			try {
				if (!currentMonth || !currentYear) return null;
				const response = await axios.get(
					`${import.meta.env.VITE_BACKEND_URL}/calendar/entries/${months.indexOf(currentMonth) + 1}/${currentYear}`,
					{
						withCredentials: true
					}
				);
				return response.data;
			} catch (error) {
				console.error(error);
			}
		}
	});

	const { data: allEntries } = useQuery({
		queryKey: ["all-entries"],
		queryFn: async () => {
			try {
				const response = await axios.get(
					`${import.meta.env.VITE_BACKEND_URL}/entry/all`,
					{
						withCredentials: true
					}
				);
				return response.data;
			} catch (error) {
				console.error(error);
			}
		}
	});

	return {
		currentMonth,
		currentYear,
		getDaysInMonth,
		getNextMonth,
		getPreviousMonth,
		getWeekDayOfMonth,
		isToday,
		months,
		monthEntriesData,
		allEntries
	};
}
