import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import UploadPage from "./pages/UploadPage";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./routes/ProtectedRoute";
import DebBot from "./components/Chatbot/DebBot";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white dark:bg-gray-900 p-4 shadow flex justify-between items-center rounded-b-2xl">
      <div className="flex items-center gap-4">
        <Link to="/" className="text-xl font-bold text-purple-600 dark:text-purple-300 flex items-center gap-2">
          InstaVerse <span className="text-xs text-gray-400">by D-Tech-Code</span>
        </Link>
        <Link to="/feed" className="text-sm text-blue-600 dark:text-blue-300">Feed</Link>
        {user && (
          <Link to="/upload" className="text-sm text-blue-600 dark:text-blue-300">Upload</Link>
        )}
        <button
          onClick={toggleTheme}
          className="ml-2 p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          aria-label="Toggle dark mode"
        >
          {theme === "dark" ? (
            <span role="img" aria-label="Light mode">🌞</span>
          ) : (
            <span role="img" aria-label="Dark mode">🌙</span>
          )}
        </button>
      </div>
      {user ? (
        <div className="flex items-center gap-4">
          <span className="text-sm">{user.email}</span>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      ) : null}
    </nav>
  );
} 