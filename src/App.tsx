import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Book from "./pages/BookList";
import BookDetailPage from "./pages/BookDetailPage";
import Home from "./pages/Home";
import "./styles/global.scss";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/booklist" element={<Book />} />
        <Route path="/book/:id" element={<BookDetailPage />} />
      </Routes>
    </Router>
  );
};

export default App;
