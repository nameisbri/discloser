import { useState } from "react";
import "./App.scss";
import Dashboard from "./components/Dashboard/Dashboard";
import Navigation from "./components/Navigation/Navigation";

const App = () => {
  return (
    <div className="app">
      <Dashboard />
      <Navigation />
    </div>
  );
};

export default App;
