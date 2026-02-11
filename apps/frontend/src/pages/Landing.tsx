import useGoogleAuth from "../hooks/useGoogleAuth";
import { useCurrentUser } from "../hooks/useCurrentUser";

export default function Landing() {
	const { googleSignInMutation } = useGoogleAuth();
	const { data: currUserData } = useCurrentUser();

	return (
		<div className="relative h-[calc(100vh-3.5rem)] bg-zinc-950 text-white overflow-hidden flex flex-col items-center justify-center px-6">
			{/* Subtle green background glow */}
			<div className="pointer-events-none absolute inset-0">
				<div className="absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[120px]" />
				<div className="absolute bottom-0 right-0 h-[300px] w-[300px] bg-emerald-400/5 blur-[100px]" />
			</div>

			{/* Content */}
			<div className="relative z-10 max-w-xl text-center flex flex-col items-center gap-8">
				<h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">
					A quiet place for your thoughts
				</h1>

				<p className="text-zinc-400 text-base sm:text-lg leading-relaxed">
					Write freely. Reflect honestly. Your private diary, always available,
					always yours.
				</p>

				{!currUserData && (
					<button
						onClick={() => googleSignInMutation()}
						className="
						group relative flex items-center justify-center gap-3
						rounded-lg px-8 py-3.5 font-medium
						bg-zinc-900 border border-zinc-800
						text-zinc-100
						transition-all duration-300
						hover:border-emerald-500/40
						hover:shadow-[0_0_30px_rgba(16,185,129,0.25)]
						active:scale-[0.98]
						hover:cursor-pointer
					"
					>
						{/* Green accent glow on hover */}
						<span className="absolute inset-0 rounded-lg bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />

						<span className="relative">Continue with Google</span>
					</button>
				)}

				<p className="text-xs text-zinc-500">
					No spam. No social feed. Just you and your words.
				</p>
			</div>
		</div>
	);
}
