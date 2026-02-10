import { Link } from "react-router-dom";

export default function Dashboard() {
	return (
		<div className="min-h-screen bg-zinc-950 text-zinc-100">
			<div className="mx-auto max-w-5xl px-6 py-10">
				{/* Header */}
				<header className="mb-10 flex items-center justify-between">
					<div>
						<h1 className="text-2xl font-semibold tracking-tight">
							Your Journal
						</h1>
						<p className="mt-1 text-sm text-zinc-400">
							A quiet place to return to
						</p>
					</div>

					<Link
						to="/new-entry"
						className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500 transition"
					>
						Write today
					</Link>
				</header>

				{/* Main content */}
				<div className="space-y-6">
					{/* Gentle prompt card */}
					<section className="rounded-xl border border-green-900/60 bg-green-950/60 p-6">
						<h2 className="mb-2 text-lg font-medium text-zinc-100">
							Today’s prompt
						</h2>
						<p className="text-sm text-zinc-300 leading-relaxed">
							What stayed with you today? A thought, a moment, or something you
							didn’t say out loud.
						</p>
					</section>

					{/* Recent entries */}
					<section className="rounded-xl border border-green-900/60 bg-green-950/60 p-6">
						<h2 className="mb-4 text-lg font-medium">Recent entries</h2>

						<div className="space-y-3">
							{[1, 2, 3].map(entry => (
								<a
									key={entry}
									href={`/entry/${entry}`}
									className="block rounded-lg border border-green-900/50 bg-zinc-950/70 p-4 hover:border-green-700 hover:bg-zinc-900 transition"
								>
									<p className="text-sm text-zinc-200">
										Today felt slow in a good way. Walked more, thought less…
									</p>
									<p className="mt-2 text-xs text-zinc-500">
										Sep 12 • Late evening
									</p>
								</a>
							))}
						</div>
					</section>
				</div>
			</div>
		</div>
	);
}
