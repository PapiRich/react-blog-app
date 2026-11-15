import { NavLink } from "react-router";
import { useTheme } from "../context/ThemeContext";

function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="navbar">
      <NavLink to="/" end>
        Home
      </NavLink>

      <NavLink to="/" end>
        Blog Posts
      </NavLink>

      <NavLink to="/post/1">
        First Post
      </NavLink>

      <NavLink to="/contact">
        Contact
      </NavLink>

      <button
        type="button"
        className="theme-toggle"
        onClick={toggleTheme}
      >
        {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
      </button>
    </nav>
  );
}

export default Navbar;