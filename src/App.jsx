import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/UI/Navbar';
import Footer from './components/UI/Footer';
import Feed from './pages/HomePage';
import MyPosts from './pages/MyPostsPage';
import UploadPost from './pages/UploadPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DebBot from './components/Chatbot/DebBot';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/my-posts" element={<MyPosts />} />
            <Route path="/upload" element={<UploadPost />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Routes>
        </main>
        <Footer />
        <DebBot />
      </div>
    </Router>
  )
}

export default App
