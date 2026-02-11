import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface UseAccountHook {
	deleteUserAccount: () => void;
}

export default function useAccount(): UseAccountHook {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const { mutate: deleteUserAccount } = useMutation({
		mutationFn: async () => {
			try {
				const confirmation = confirm(
					"Are you sure you want to delete your account? This action cannot be undone and will delete all of your entries."
				);

				if (!confirmation) return;

				const response = await axios.delete(
					`${import.meta.env.VITE_BACKEND_URL}/user`,
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
			navigate("/");
			queryClient.clear();
		}
	});

	return {
		deleteUserAccount
	};
}
