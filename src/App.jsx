import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router";

import Header from "./components/Header";
import Footer from "./components/Footer";

import BlogPostsPage from "./pages/BlogPostsPage";
import IndividualPostPage from "./pages/IndividualPostPage";
import ContactPage from "./pages/ContactPage";

import { ThemeProvider, useTheme } from "./context/ThemeContext";

import "./App.css";

function AppContent() {
  const { theme } = useTheme();

  // Store comments for every blog post
  const [commentsByPost, setCommentsByPost] = useState({});

  function addComment(postId, newComment) {
    setCommentsByPost((previous) => ({
      ...previous,
      [postId]: [...(previous[postId] || []), newComment]
    }));
  }

  return (
    <div className={`app ${theme}`}>
      <Header />

      <Routes>
        <Route path="/" element={<BlogPostsPage />} />

        <Route
          path="/post/:id"
          element={
            <IndividualPostPage
              commentsByPost={commentsByPost}
              addComment={addComment}
            />
          }
        />

        <Route path="/contact" element={<ContactPage />} />

        <Route
          path="*"
          element={
            <main className="blog-container">
              <h2>Page Not Found</h2>
              <p>Sorry, this page does not exist.</p>
            </main>
          }
        />
      </Routes>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;