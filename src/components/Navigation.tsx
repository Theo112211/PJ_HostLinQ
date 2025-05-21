
import { useState } from "react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { Home, Search, FileText } from "lucide-react";
import { UserButton } from "./UserButton";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-card border-b shadow-sm py-4">
      <div className="container-custom flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <Home size={18} className="text-white" />
          </div>
          <span className="text-xl font-bold text-primary">HostLinQ</span>
        </Link>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/search" className="hover:text-primary transition-colors">
            Find Hostels
          </Link>
          <Link to="/list-hostel" className="hover:text-primary transition-colors">
            List Your Hostel
          </Link>
          <Link to="/resources" className="hover:text-primary transition-colors">
            Resources
          </Link>
          <Link to="/docs" className="hover:text-primary transition-colors">
            Documentation
          </Link>
          <ThemeToggle />
          <UserButton />
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-card shadow-md z-50 p-4 md:hidden flex flex-col gap-4 border-b animate-fade-in">
            <Link
              to="/"
              className="px-4 py-2 hover:bg-primary/10 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/search"
              className="px-4 py-2 hover:bg-primary/10 rounded-md transition-colors flex items-center gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Search size={18} /> Find Hostels
            </Link>
            <Link
              to="/list-hostel"
              className="px-4 py-2 hover:bg-primary/10 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              List Your Hostel
            </Link>
            <Link
              to="/resources"
              className="px-4 py-2 hover:bg-primary/10 rounded-md transition-colors flex items-center gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <FileText size={18} /> Resources
            </Link>
            <Link
              to="/docs"
              className="px-4 py-2 hover:bg-primary/10 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Documentation
            </Link>
            <div className="flex items-center justify-between px-4 py-2">
              <ThemeToggle />
              <UserButton />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
