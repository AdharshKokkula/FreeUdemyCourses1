import React from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";

interface HeaderProps {
  siteTitle?: string;
  logoUrl?: string;
  navLinks?: Array<{ title: string; href: string }>;
}

const Header = ({
  siteTitle = "FreeUdemyCourses",
  logoUrl = "/logo.png",
  navLinks = [
    { title: "Home", href: "/" },
    { title: "Categories", href: "/categories" },
    { title: "New Courses", href: "/new" },
    { title: "About", href: "/about" },
    { title: "Contact", href: "/contact" },
  ],
}: HeaderProps) => {
  return (
    <header className="w-full bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      {/* Ad Banner at the very top */}
      <div className="w-full bg-blue-50 p-2 text-center text-sm">
        <div className="max-w-7xl mx-auto">
          <p className="text-gray-600">
            Advertisement Space - Google AdSense Banner
          </p>
        </div>
      </div>

      {/* Main Header Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Site Title */}
          <div className="flex items-center">
            <img src={logoUrl} alt="Logo" className="h-8 w-8 mr-2" />
            <span className="text-xl font-bold text-blue-600">{siteTitle}</span>
          </div>

          {/* Navigation Links - Hidden on mobile */}
          <nav className="hidden md:flex space-x-6">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                {link.title}
              </a>
            ))}
          </nav>

          {/* Search and Mobile Menu */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-gray-600">
              <Search className="h-5 w-5" />
            </Button>

            {/* Mobile Menu Button - Only visible on mobile */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-gray-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
