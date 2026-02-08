export default function About() {
	return (
		<div className="min-h-screen bg-zinc-950 text-zinc-100 flex justify-center px-4 py-12">
			{/* Page container */}
			<div className="w-full max-w-4xl">
				{/* Header */}
				<header className="mb-10 border-b border-zinc-800 pb-4">
					<h1 className="text-3xl font-semibold tracking-tight text-emerald-400">
						About
					</h1>
					<p className="mt-2 text-sm text-zinc-400">
						Why this space exists, and how it’s meant to be used.
					</p>
				</header>

				{/* Main content */}
				<section className="space-y-8">
					{/* Card 1 */}
					<div className="rounded-xl border border-green-800 bg-zinc-900/40 p-6">
						<h2 className="mb-2 text-xl font-medium text-zinc-100">Purpose</h2>
						<p className="text-zinc-200 leading-relaxed">
							This diary was built as a quiet place to think out loud. It isn’t
							designed to optimize productivity, track streaks, or push
							notifications. The goal is simple: provide a calm, private space
							where thoughts can exist without being judged or ranked.
						</p>
					</div>

					{/* Card 2 */}
					<div className="rounded-xl border border-green-800 bg-zinc-900/40 p-6">
						<h2 className="mb-2 text-xl font-medium text-zinc-100">
							Philosophy
						</h2>
						<p className="text-zinc-200 leading-relaxed">
							Writing is often messy. Ideas arrive half-formed, emotions
							contradict each other, and clarity comes later—if at all. This app
							embraces that reality. There’s no pressure to be insightful or
							consistent. Showing up is enough.
						</p>
					</div>

					{/* Card 3 */}
					<div className="rounded-xl border border-green-800 bg-zinc-900/40 p-6">
						<h2 className="mb-2 text-xl font-medium text-zinc-100">
							Privacy & Ownership
						</h2>
						<p className="text-zinc-200 leading-relaxed">
							Your entries belong to you. This diary treats writing as something
							personal, not content to be optimized or shared. Whether you write
							daily or once in a while, nothing here is meant to rush or reward
							you—only to hold space.
						</p>
					</div>

					{/* Subtle closing note */}
					<div className="pt-4 text-sm text-zinc-500">
						Built for reflection, not performance.
					</div>
				</section>
			</div>
		</div>
	);
}
