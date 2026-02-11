interface UseGoogleAuthHook {
	googleSignInMutation: () => Promise<void>;
	signOut: () => Promise<void>;
}

interface CalendarDayProps {
	day: number;
	hasEntry: boolean;
	currentMonth: string;
	currentYear: number;
	getWeekDayOfMonth: (month: string, year: number, day: number) => string;
	isToday: (month: string, year: number, day: number) => boolean;
	title: string;
}

interface Entry {
	_id: string;
	uid: string;
	title: string;
	content: string;
	visibility: "private" | "public";
	createdAt: string;
}

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

export type { UseGoogleAuthHook, CalendarDayProps, Entry, UseCalendarHook };
