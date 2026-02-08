export default function Navbar() {
  return (
    <div className = "bg-zinc-950 pt-6 text-white text-center">
        <ul>
            <li className="inline-block mx-4">
                <a href="/" className="hover:text-emerald-500 transition">Home</a>
            </li>
            <li className="inline-block mx-4">
                <a href="/about" className="hover:text-emerald-500 transition">About</a>
            </li>
            <li className="inline-block mx-4">
                <a href="/dashboard" className="hover:text-emerald-500 transition">Dashboard</a>
            </li>
            <li className="inline-block mx-4">
                <a href="/calendar" className="hover:text-emerald-500 transition">Calendar</a>
            </li>
        </ul>
    </div>
  )
}
