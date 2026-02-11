import ProfileRow from "../components/ProfileRow";
import { useCurrentUser } from "../hooks/useCurrentUser";

export default function Profile() {
	const { data: currUser } = useCurrentUser();

	return (
		<div className="min-h-screen bg-zinc-950 text-white flex justify-center px-6 py-16">
			<div className="w-full max-w-2xl space-y-10">
				{/* Header */}
				<div className="flex items-center gap-6">
					<img
						src={currUser?.profilePicture}
						alt="Profile"
						className="h-20 w-20 rounded-full border border-zinc-800"
					/>

					<div>
						<h1 className="text-2xl font-semibold tracking-tight">Account</h1>
						<p className="text-zinc-400 text-sm">Your personal information</p>
					</div>
				</div>

				{/* Info card */}
				<div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6 space-y-4">
					<ProfileRow
						label="Full name"
						value={`${currUser?.firstName} ${currUser?.lastName}`}
					/>
					<ProfileRow label="Email" value={currUser?.email} />
					<ProfileRow
						label="Date joined"
						value={new Date(currUser?.createdAt).toLocaleDateString("en-US", {
							month: "long",
							day: "numeric",
							year: "numeric"
						})}
					/>
				</div>

				{/* Delete account */}
				<div className="rounded-xl border border-red-900/40 bg-red-950/30 p-6 space-y-4">
					<h2 className="text-lg font-semibold text-red-400">Delete account</h2>

					<p className="text-sm text-red-300/80 leading-relaxed">
						This will permanently delete your account and all diary entries.
						This action cannot be undone.
					</p>

					<button
						className="
							mt-2 inline-flex items-center justify-center
							rounded-lg px-5 py-2.5
							text-sm font-medium
							bg-red-600/20 text-red-300
							border border-red-800/50
							hover:bg-red-600/30
							hover:text-red-200
							transition
							active:scale-[0.98]
                            hover:cursor-pointer
						"
					>
						Delete my account
					</button>
				</div>
			</div>
		</div>
	);
}
