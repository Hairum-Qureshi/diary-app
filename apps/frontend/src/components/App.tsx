import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import ProtectedRoutesGuard from "./middleware/ProtectedRoutesGuard";
import Landing from "../pages/Landing";
import About from "../pages/About";
import Calendar from "../pages/Calendar";
import Profile from "../pages/Profile";
import DiaryForm from "../pages/DiaryForm";
import Archive from "../pages/Archive";
import DiaryEntry from "../pages/DiaryEntry";
import NotFound from "../pages/NotFound";
import "../css/index.css";

export default function App() {
	return (
		<BrowserRouter>
			<Navbar />
			<Routes>
				<Route path="/" element={<Landing />} />
				<Route path="/about" element={<About />} />
				<Route
					path="/calendar"
					element={
						<ProtectedRoutesGuard>
							<Calendar />
						</ProtectedRoutesGuard>
					}
				/>

				<Route
					path="/profile"
					element={
						<ProtectedRoutesGuard>
							<Profile />
						</ProtectedRoutesGuard>
					}
				/>

				<Route
					path="/new-entry"
					element={
						<ProtectedRoutesGuard>
							<DiaryForm />
						</ProtectedRoutesGuard>
					}
				/>

				<Route
					path="/all-entries"
					element={
						<ProtectedRoutesGuard>
							<Archive />
						</ProtectedRoutesGuard>
					}
				/>

				<Route
					path="/entry/:month/:day/:year/edit"
					element={
						<ProtectedRoutesGuard>
							<DiaryForm />
						</ProtectedRoutesGuard>
					}
				/>

				<Route
					path="/entry/:month/:day/:year"
					element={
						<ProtectedRoutesGuard>
							<DiaryEntry />
						</ProtectedRoutesGuard>
					}
				/>
				<Route path="/entry/:entryID" element={<DiaryEntry />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
}
