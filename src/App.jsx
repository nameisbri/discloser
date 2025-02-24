import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Landing from "./pages/Landing/Landing";
import Navigation from "./components/Navigation/Navigation";
import Upload from "./pages/Upload/Upload";
import Review from "./pages/Review/Review";
import Reminders from "./pages/Reminders/Reminders";
import Results from "./pages/Results/Results";
import Share from "./pages/Share/Share";
import Learn from "./pages/Learn/Learn";
import "./App.scss";

// Create a wrapper component to handle the navigation logic
const AppContent = () => {
  const location = useLocation();
  const isLandingPage = location.pathname === "/landing";

  return (
    <div className="app">
      {!isLandingPage && <Navigation />}
      <main className="app__main">
        <Routes>
          <Route path="/landing" element={<Landing />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/review" element={<Review />} />
          <Route path="/reminders" element={<Reminders />} />
          <Route path="/results" element={<Results />} />
          <Route path="/share" element={<Share />} />
          <Route path="/share/:userId" element={<Share />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="*" element={"404 error"} />
        </Routes>
      </main>
    </div>
  );
};

// Main App component
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
