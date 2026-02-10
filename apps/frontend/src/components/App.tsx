import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import NotFound from "../pages/NotFound";
import Dashboard from "../pages/Dashboard";
import "../css/index.css";
import Navbar from "./Navbar";
import Calendar from "../pages/Calendar";
import DiaryForm from "../pages/DiaryForm";
import DiaryEntry from "../pages/DiaryEntry";

export default function App() {
	return (
		<BrowserRouter>
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/about" element={<About />} />
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/calendar" element={<Calendar />} />
				<Route path="/new-entry" element={<DiaryForm />} />
				<Route path="/entry/:month/:day/:year" element={<DiaryEntry />} />
				<Route path="/entry/:entryID?shareable=true" element={<DiaryEntry />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
}
