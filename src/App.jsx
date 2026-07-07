import React, { useState } from "react";
import Home from "./Home.jsx";
import Dashboard from "./Dashboard.jsx";

// Prototype-level routing only — no URLs, no backend. Opening a site from
// the list just swaps which screen is mounted.
export default function App() {
  const [openSite, setOpenSite] = useState(null);

  if (openSite) {
    return <Dashboard onBack={() => setOpenSite(null)} />;
  }

  return <Home onOpenSite={(site) => setOpenSite(site)} />;
}
