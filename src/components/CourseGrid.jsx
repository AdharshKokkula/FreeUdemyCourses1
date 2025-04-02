import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CourseCard from "./CourseCard";
import AdBanner from "./AdBanner";
import { Skeleton } from "./ui/skeleton";

const CourseGrid = ({
  courses = [
    {
      id: "1",
      title: "Complete Web Development Bootcamp 2023",
      thumbnail:
        "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=500&q=80",
      originalPrice: "$94.99",
      category: "Development",
      couponCode: "FREECOURSE",
      courseUrl: "https://www.udemy.com/course/example",
      rating: 4.5,
      instructor: "John Doe",
    },
    {
      id: "2",
      title: "Python for Data Science and Machine Learning",
      thumbnail:
        "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=500&q=80",
      originalPrice: "$129.99",
      category: "Data Science",
      couponCode: "DATAPYTHON",
      courseUrl: "https://www.udemy.com/course/python-data-science",
      rating: 4.8,
      instructor: "Jane Smith",
    },
    {
      id: "3",
      title: "Digital Marketing Masterclass",
      thumbnail:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&q=80",
      originalPrice: "$84.99",
      category: "Marketing",
      couponCode: "MARKETFREE",
      courseUrl: "https://www.udemy.com/course/digital-marketing",
      rating: 4.2,
      instructor: "Mike Johnson",
    },
    {
      id: "4",
      title: "UI/UX Design Fundamentals",
      thumbnail:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&q=80",
      originalPrice: "$74.99",
      category: "Design",
      couponCode: "UXFREE",
      courseUrl: "https://www.udemy.com/course/uiux-design",
      rating: 4.6,
      instructor: "Sarah Williams",
    },
    {
      id: "5",
      title: "AWS Certified Solutions Architect",
      thumbnail:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&q=80",
      originalPrice: "$149.99",
      category: "IT & Software",
      couponCode: "AWSCERT",
      courseUrl: "https://www.udemy.com/course/aws-architect",
      rating: 4.7,
      instructor: "David Clark",
    },
    {
      id: "6",
      title: "Complete JavaScript Course 2023",
      thumbnail:
        "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=500&q=80",
      originalPrice: "$89.99",
      category: "Development",
      couponCode: "JSMASTER",
      courseUrl: "https://www.udemy.com/course/javascript-complete",
      rating: 4.9,
      instructor: "Robert Wilson",
    },
  ],
  selectedCategory = "",
  loading = false,
  adFrequency = 3,
}) => {
  const [filteredCourses, setFilteredCourses] = useState(courses);

  useEffect(() => {
    if (selectedCategory && selectedCategory !== "All") {
      setFilteredCourses(
        courses.filter((course) => course.category === selectedCategory),
      );
    } else {
      setFilteredCourses(courses);
    }
  }, [selectedCategory, courses]);

  if (loading) {
    return (
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <Skeleton className="h-[140px] w-full" />
              <div className="p-4">
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-8 w-full mt-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Function to insert ads between rows of courses
  const renderCoursesWithAds = () => {
    const result = [];
    let courseIndex = 0;

    // Calculate how many courses to show per row based on screen size
    // This is an approximation that matches the grid-cols classes
    const getCoursesPerRow = () => {
      if (typeof window !== "undefined") {
        const width = window.innerWidth;
        if (width >= 1024) return 4; // lg
        if (width >= 768) return 3; // md
        if (width >= 640) return 2; // sm
        return 1; // xs
      }
      return 4; // Default to desktop view
    };

    const coursesPerRow = getCoursesPerRow();

    while (courseIndex < filteredCourses.length) {
      // Add a row of courses
      const rowCourses = filteredCourses.slice(
        courseIndex,
        courseIndex + coursesPerRow,
      );

      result.push(
        <div
          key={`row-${courseIndex}`}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {rowCourses.map((course) => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>,
      );

      courseIndex += coursesPerRow;

      // Add an ad banner after every 'adFrequency' rows, except after the last row
      if (
        courseIndex < filteredCourses.length &&
        courseIndex % (coursesPerRow * adFrequency) === 0
      ) {
        result.push(
          <AdBanner
            key={`ad-${courseIndex}`}
            position="between-rows"
            height="120px"
          />,
        );
      }
    }

    return result;
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      {filteredCourses.length > 0 ? (
        <div className="space-y-8">{renderCoursesWithAds()}</div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900">
            No courses found
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            Try selecting a different category or check back later for new
            courses.
          </p>
        </div>
      )}
    </div>
  );
};

export default CourseGrid;
