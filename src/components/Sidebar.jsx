import React, { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import { Separator } from "./ui/separator";

const Sidebar = ({ className = "" }) => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsSticky(scrollPosition > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <aside
      className={`w-[300px] h-[600px] flex flex-col gap-6 bg-white ${className} ${isSticky ? "sticky top-20" : ""}`}
    >
      {/* Top Ad Banner */}
      <Card className="overflow-hidden border border-gray-200 shadow-sm">
        <CardContent className="p-0">
          <div className="bg-gray-100 h-[250px] flex items-center justify-center">
            <div className="text-center p-4">
              <p className="text-sm text-gray-500 mb-2">ADVERTISEMENT</p>
              <div className="bg-gray-200 h-[200px] w-full flex items-center justify-center">
                <p className="text-gray-400 text-sm">Google AdSense Banner</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Popular Categories Section */}
      <Card className="overflow-hidden border border-gray-200 shadow-sm">
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-3">Popular Categories</h3>
          <Separator className="mb-3" />
          <ul className="space-y-2">
            {[
              "Web Development",
              "Data Science",
              "Business",
              "IT & Software",
              "Design",
              "Marketing",
            ].map((category) => (
              <li key={category}>
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-800 hover:underline text-sm block py-1"
                >
                  {category}
                </a>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Bottom Ad Banner */}
      <Card className="overflow-hidden border border-gray-200 shadow-sm">
        <CardContent className="p-0">
          <div className="bg-gray-100 h-[250px] flex items-center justify-center">
            <div className="text-center p-4">
              <p className="text-sm text-gray-500 mb-2">ADVERTISEMENT</p>
              <div className="bg-gray-200 h-[200px] w-full flex items-center justify-center">
                <p className="text-gray-400 text-sm">Google AdSense Banner</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </aside>
  );
};

export default Sidebar;
