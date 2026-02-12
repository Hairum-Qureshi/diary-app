import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "../pages/Landing";
import About from "../pages/About";
import NotFound from "../pages/NotFound";
import Navbar from "./Navbar";
import Calendar from "../pages/Calendar";
import DiaryForm from "../pages/DiaryForm";
import DiaryEntry from "../pages/DiaryEntry";
import Archive from "../pages/Archive";
import Profile from "../pages/Profile";
import "../css/index.css";
import ProtectedRoutesGuard from "./middleware/ProtectedRoutesGuard";

export default function App() {
	return (
		<BrowserRouter>
			<Navbar />
			<Routes>
				<Route path="/" element={<Landing />} />
				<Route path="/about" element={<About />} />
				<ProtectedRoutesGuard>
					<Route path="/calendar" element={<Calendar />} />
				</ProtectedRoutesGuard>
				<ProtectedRoutesGuard>
					<Route path="/profile" element={<Profile />} />
				</ProtectedRoutesGuard>
				<ProtectedRoutesGuard>
					<Route
						path="/calendar?month=:month&year=:year"
						element={<Calendar />}
					/>
				</ProtectedRoutesGuard>
				<ProtectedRoutesGuard>
					<Route path="/new-entry" element={<DiaryForm />} />
				</ProtectedRoutesGuard>
				<ProtectedRoutesGuard>
					<Route path="/all-entries" element={<Archive />} />
				</ProtectedRoutesGuard>
				<ProtectedRoutesGuard>
					<Route path="/entry/:month/:day/:year/edit" element={<DiaryForm />} />
				</ProtectedRoutesGuard>
				<ProtectedRoutesGuard>
					<Route path="/entry/:month/:day/:year" element={<DiaryEntry />} />
				</ProtectedRoutesGuard>
				<Route path="/entry/:entryID?shareable=true" element={<DiaryEntry />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
}
