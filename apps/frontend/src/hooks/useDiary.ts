import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface UseDiaryHook {
	createEntry: (
		title: string,
		entry: string,
		date: string,
		content: string
	) => void;
}

export default function useDiary() {
	const navigate = useNavigate();

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

	return { createEntry };
}
