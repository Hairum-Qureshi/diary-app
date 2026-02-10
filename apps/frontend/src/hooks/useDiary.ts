import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import type { Entry } from "../interfaces";

interface UseDiaryHook {
	createEntry: (title: string, date: string, content: string) => void;
	entryData: Entry | null;
	toggleVisibility: (entryID: string) => void;
}

export default function useDiary(): UseDiaryHook {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { month, day, year } = useParams();

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
		if (!title || !date || !content) return alert("Please fill in all fields");

		mutate({ title, date, content });
	}

	// use useQuery here
	const { data: entryData } = useQuery({
		queryKey: ["entry"],
		queryFn: async () => {
			try {
				if (!month || !day || !year) return null;
				const response = await axios.get(
					`${import.meta.env.VITE_BACKEND_URL}/entry/${month}/${day}/${year}`,
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

	const { mutate: toggleVisibility } = useMutation({
		mutationFn: async (entryID: string) => {
			try {
				const response = await axios.patch(
					`${import.meta.env.VITE_BACKEND_URL}/entry/${entryID}/toggle-visibility`,
					{},
					{
						withCredentials: true
					}
				);

				return response;
			} catch (error) {
				console.error(error);
			}
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["entry"]
			});
		}
	});

	return { createEntry, entryData, toggleVisibility };
}
