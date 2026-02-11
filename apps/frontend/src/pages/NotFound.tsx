import { Link } from "react-router-dom";

export default function NotFound() {
	return (
		<div className="relative h-[calc(100vh-3.5rem)] bg-zinc-950 text-white overflow-hidden flex items-center justify-center px-6">
			<div className="pointer-events-none absolute inset-0">
				<div className="absolute top-1/3 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[120px]" />
			</div>

			<div className="relative z-10 max-w-md text-center flex flex-col items-center gap-6">
				<span className="text-2xl tracking-widest text-emerald-400/80">
					404
				</span>

				<h1 className="text-3xl font-semibold tracking-tight">
					This page doesn't exist
				</h1>

				<p className="text-zinc-400 leading-relaxed">
					The page you're looking for may have been moved, deleted, or never
					written at all.
				</p>

				<Link
					to="/"
					className="
						mt-2 inline-flex items-center justify-center
						rounded-lg px-6 py-3
						text-sm font-medium
						bg-zinc-900 border border-zinc-800
						text-zinc-100
						transition-all
						hover:border-emerald-500/40
						hover:shadow-[0_0_30px_rgba(16,185,129,0.25)]
						active:scale-[0.98]
					"
				>
					Return home
				</Link>
			</div>
		</div>
	);
}
