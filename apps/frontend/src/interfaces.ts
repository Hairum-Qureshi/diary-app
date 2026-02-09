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

interface Entry {
	_id: string;
	uid: string;
	title: string;
	content: string;
	createdAt: string;
}

export type { UseGoogleAuthHook, CalendarDayProps, Entry };
