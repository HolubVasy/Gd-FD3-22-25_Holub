import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import StartPage from "./pages/StartPage";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import TermsPage from "./pages/TermsPage";
import PostsPage from "./pages/PostsPage";
import PostPage from "./pages/PostPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="start" element={<StartPage />} />
          <Route path="contact" element={<ContactPage />}>
            <Route path="about" element={<AboutPage />} />
            <Route path="terms" element={<TermsPage />} />
          </Route>
          <Route path="posts" element={<PostsPage />} />
          <Route path="post/:id" element={<PostPage />} />
          <Route path="404" element={<NotFoundPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
}
