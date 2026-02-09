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
}

export type { UseGoogleAuthHook, CalendarDayProps };
