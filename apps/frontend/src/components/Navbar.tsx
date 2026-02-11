export default function Navbar() {
	// TODO - add logout
	return (
		<div className="bg-zinc-950 h-14 flex items-center justify-center text-white">
			<ul>
				<li className="inline-block mx-4">
					<a href="/" className="hover:text-emerald-500 transition">
						Home
					</a>
				</li>
				<li className="inline-block mx-4">
					<a href="/about" className="hover:text-emerald-500 transition">
						About
					</a>
				</li>
				<li className="inline-block mx-4">
					<a href="/dashboard" className="hover:text-emerald-500 transition">
						Dashboard
					</a>
				</li>
				<li className="inline-block mx-4">
					<a href="/profile" className="hover:text-emerald-500 transition">
						Profile
					</a>
				</li>
				<li className="inline-block mx-4">
					<a href="/calendar" className="hover:text-emerald-500 transition">
						Calendar
					</a>
				</li>
				<li className="inline-block mx-4">
					<a href="/new-entry" className="hover:text-emerald-500 transition">
						New Entry
					</a>
				</li>
				<li className="inline-block mx-4">
					<a href="/all-entries" className="hover:text-emerald-500 transition">
						Archive
					</a>
				</li>
			</ul>
		</div>
	);
}
