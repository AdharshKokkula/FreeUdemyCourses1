import React, { useState, useEffect } from "react";
import Header from "./Header";
import CategoryFilter from "./CategoryFilter";
import CourseGrid from "./CourseGrid";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import PopupAd from "./PopupAd";
import { useCourses } from "../lib/courseData";

const Home = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { courses, loading, allCategories } = useCourses();

  // Handle category change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // Set timer for popup to appear after 30 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 30000); // 30 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header with navigation and top ad */}
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Free Udemy Courses with Coupon Codes
        </h1>
        <p className="text-center text-gray-600 mb-8 max-w-3xl mx-auto">
          Get access to premium Udemy courses for free! We find and verify the
          best coupon codes so you can learn new skills without spending a
          penny.
        </p>

        {/* Category Filter */}
        <div className="mb-8">
          <CategoryFilter
            categories={["All", ...allCategories]}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
        </div>

        {/* Main content area with course grid and sidebar */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Course Grid - Takes more space */}
          <div className="flex-grow">
            <CourseGrid
              courses={courses}
              selectedCategory={
                selectedCategory === "All" ? "" : selectedCategory
              }
              loading={loading}
              adFrequency={2} // Show ad after every 2 rows
            />
          </div>

          {/* Sidebar with ads - Fixed width */}
          <Sidebar className="hidden lg:block" />
        </div>
      </main>

      {/* Footer with links and bottom ad */}
      <Footer />

      {/* Popup Ad that appears after 30 seconds */}
      <PopupAd
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        title="Special Offer for Web Developers!"
        description="Get 50% off on our partner's Premium Web Development courses. Limited time offer!"
        ctaText="Claim This Offer"
        ctaLink="https://example.com/special-offer"
        imageUrl="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80"
      />
    </div>
  );
};

export default Home;
