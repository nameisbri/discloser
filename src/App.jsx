import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard"; // Corrected import path
import Navigation from "./components/Navigation/Navigation"; // Corrected import path
import Upload from "./pages/Upload/Upload"; // Corrected import path
import Reminders from "./pages/Reminders/Reminders"; // Corrected import path
import Results from "./pages/Results/Results"; // Corrected import path
import Share from "./pages/Share/Share"; // Corrected import path
import "./App.scss";

function App() {
  return (
    <Router>
      <div className="app">
        <Navigation />
        <main className="app__main">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/reminders" element={<Reminders />} />
            <Route path="/results" element={<Results />} />
            <Route path="/share" element={<Share />} />
            <Route path="*" element={"404 error"} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
