import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Start from './pages/Start';
import Contact from './pages/Contact';
import About from './pages/About';
import Terms from './pages/Terms';
import Posts from './pages/Posts';
import Post from './pages/Post';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <main className="content">
          <div className="scrollable-content">
            <Routes>
              <Route path="/" element={<Start />} />
              <Route path="/contact" element={<Contact />}>
                <Route path="about" element={<About />} />
                <Route path="terms" element={<Terms />} />
              </Route>
              <Route path="/posts" element={<Posts />} />
              <Route path="/post/:id" element={<Post />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
