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

export default function App() {
	// TODO - wrap certain routes with a middleware auth component
	return (
		<BrowserRouter>
			<Navbar />
			<Routes>
				<Route path="/" element={<Landing />} />
				<Route path="/about" element={<About />} />
				<Route path="/calendar" element={<Calendar />} />
				<Route path="/profile" element={<Profile />} />
				<Route
					path="/calendar?month=:month&year=:year"
					element={<Calendar />}
				/>
				<Route path="/new-entry" element={<DiaryForm />} />
				<Route path="/all-entries" element={<Archive />} />
				<Route path="/entry/:month/:day/:year/edit" element={<DiaryForm />} />
				<Route path="/entry/:month/:day/:year" element={<DiaryEntry />} />
				<Route path="/entry/:entryID?shareable=true" element={<DiaryEntry />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
}
