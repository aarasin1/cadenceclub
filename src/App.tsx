import React from "react";
import Home from "./pages/Home";
import EventsListPage from "./pages/EventsListPage";
import EventDetailPage from "./pages/EventDetailPage";
import { Routes, Route } from "react-router-dom";

const App: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Home />}
      />
      <Route
        path="/events"
        element={<EventsListPage />}
      />
      <Route
        path="/events/:id"
        element={<EventDetailPage />}
      />
    </Routes>
  );
};

export default App;
