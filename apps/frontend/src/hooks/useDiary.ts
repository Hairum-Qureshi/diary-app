import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import type { Entry } from "../interfaces";
import { useEffect, useState } from "react";

interface UseDiaryHook {
	createEntry: (title: string, date: string, content: string) => void;
	entryData: Entry | null;
}

export default function useDiary({
	month,
	day,
	year
}: {
	month?: string;
	day?: string;
	year?: string;
} = {}): UseDiaryHook {
	const navigate = useNavigate();
	const [entryData, setEntryData] = useState<Entry | null>(null);

	const { mutate } = useMutation({
		mutationFn: async ({
			title,
			date,
			content
		}: {
			title: string;
			date: string;
			content: string;
		}) => {
			try {
				const response = await axios.post(
					`${import.meta.env.VITE_BACKEND_URL}/entry/new`,
					{
						title,
						date,
						content
					},
					{
						withCredentials: true
					}
				);

				return response;
			} catch (error) {
				console.error(error);
			}
		},
		onSuccess: response => {
			if (response) {
				const DateMDY: string[] = response.data.createdAt
					.substring(0, 10)
					.split("-");

				navigate(`/entry/${DateMDY[1]}/${DateMDY[2]}/${DateMDY[0]}`);
			}
		}
	});

	function createEntry(title: string, date: string, content: string) {
		console.log(title, date, content);
		if (!title || !date || !content) return alert("Please fill in all fields");

		mutate({ title, date, content });
	}

	async function getEntryByDate() {
		const response = await axios.get(
			`${import.meta.env.VITE_BACKEND_URL}/entry/${month}/${day}/${year}`,
			{
				withCredentials: true
			}
		);
		setEntryData(response.data);
	}

	useEffect(() => {
		if (month && day && year) {
			getEntryByDate();
		}
	}, [month, day, year]);

	return { createEntry, entryData };
}
