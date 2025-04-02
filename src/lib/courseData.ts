import { useState, useEffect } from "react";

// Define the course data interface
export interface Course {
  id: string;
  title: string;
  thumbnail: string;
  originalPrice: string;
  category: string;
  couponCode: string;
  courseUrl: string;
  rating: number;
  instructor: string;
  description?: string;
  expiryDate?: string;
}

// Sample course data
const sampleCourses: Course[] = [
  {
    id: "1",
    title: "Complete Web Development Bootcamp 2023",
    thumbnail:
      "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=500&q=80",
    originalPrice: "$94.99",
    category: "Development",
    couponCode: "FREECOURSE1",
    courseUrl: "https://www.udemy.com/course/example1",
    rating: 4.5,
    instructor: "John Doe",
    description:
      "Learn web development from scratch with HTML, CSS, JavaScript, React, Node and more.",
    expiryDate: "2023-12-31",
  },
  {
    id: "2",
    title: "Python for Data Science and Machine Learning",
    thumbnail:
      "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=500&q=80",
    originalPrice: "$129.99",
    category: "Data Science",
    couponCode: "FREECOURSE2",
    courseUrl: "https://www.udemy.com/course/example2",
    rating: 4.8,
    instructor: "Jane Smith",
    description:
      "Master Python for data analysis, visualization, and machine learning with practical projects.",
    expiryDate: "2023-12-25",
  },
  {
    id: "3",
    title: "Digital Marketing Masterclass",
    thumbnail:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&q=80",
    originalPrice: "$84.99",
    category: "Marketing",
    couponCode: "FREECOURSE3",
    courseUrl: "https://www.udemy.com/course/example3",
    rating: 4.3,
    instructor: "Michael Johnson",
    description:
      "Learn SEO, social media marketing, email campaigns, and more to grow your business online.",
    expiryDate: "2023-12-20",
  },
  {
    id: "4",
    title: "iOS App Development with Swift",
    thumbnail:
      "https://images.unsplash.com/photo-1563203369-26f2e4a5ccf7?w=500&q=80",
    originalPrice: "$109.99",
    category: "Development",
    couponCode: "FREECOURSE4",
    courseUrl: "https://www.udemy.com/course/example4",
    rating: 4.6,
    instructor: "Sarah Williams",
    description:
      "Build iOS apps from scratch using Swift and Xcode with hands-on projects.",
    expiryDate: "2023-12-15",
  },
  {
    id: "5",
    title: "Financial Accounting Fundamentals",
    thumbnail:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500&q=80",
    originalPrice: "$79.99",
    category: "Business",
    couponCode: "FREECOURSE5",
    courseUrl: "https://www.udemy.com/course/example5",
    rating: 4.2,
    instructor: "Robert Brown",
    description:
      "Master the basics of financial accounting, balance sheets, income statements and more.",
    expiryDate: "2023-12-28",
  },
  {
    id: "6",
    title: "Adobe Photoshop CC Masterclass",
    thumbnail:
      "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=500&q=80",
    originalPrice: "$89.99",
    category: "Design",
    couponCode: "FREECOURSE6",
    courseUrl: "https://www.udemy.com/course/example6",
    rating: 4.7,
    instructor: "Emily Chen",
    description:
      "Learn professional photo editing and graphic design techniques with Adobe Photoshop.",
    expiryDate: "2023-12-22",
  },
  {
    id: "7",
    title: "Ethical Hacking for Beginners",
    thumbnail:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&q=80",
    originalPrice: "$119.99",
    category: "IT & Software",
    couponCode: "FREECOURSE7",
    courseUrl: "https://www.udemy.com/course/example7",
    rating: 4.4,
    instructor: "David Wilson",
    description:
      "Learn ethical hacking, penetration testing, and cybersecurity fundamentals.",
    expiryDate: "2023-12-18",
  },
  {
    id: "8",
    title: "Complete Guitar Masterclass",
    thumbnail:
      "https://images.unsplash.com/photo-1525201548942-d8732f6617a0?w=500&q=80",
    originalPrice: "$69.99",
    category: "Music",
    couponCode: "FREECOURSE8",
    courseUrl: "https://www.udemy.com/course/example8",
    rating: 4.9,
    instructor: "Carlos Rodriguez",
    description:
      "Learn to play guitar from beginner to advanced with practical exercises and songs.",
    expiryDate: "2023-12-30",
  },
];

// Get all available categories from the course data
export const getCategories = (): string[] => {
  const categories = sampleCourses.map((course) => course.category);
  return [...new Set(categories)]; // Remove duplicates
};

// Function to load course data (simulates fetching from a JSON file)
export const loadCourseData = async (): Promise<Course[]> => {
  // In a real implementation, this would fetch from a JSON file or API
  // For now, we'll just return the sample data with a simulated delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(sampleCourses);
    }, 300); // Simulate network delay
  });
};

// Hook to get and filter courses
export const useCourses = (initialCategory: string = "") => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] =
    useState<string>(initialCategory);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const data = await loadCourseData();
        setCourses(data);
        setError(null);
      } catch (err) {
        setError("Failed to load courses");
        console.error("Error loading courses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Filter courses by category
  const filteredCourses = selectedCategory
    ? courses.filter((course) => course.category === selectedCategory)
    : courses;

  return {
    courses: filteredCourses,
    loading,
    error,
    selectedCategory,
    setSelectedCategory,
    allCategories: getCategories(),
  };
};

// Function to search courses by title or instructor
export const searchCourses = (
  courses: Course[],
  searchTerm: string,
): Course[] => {
  if (!searchTerm.trim()) return courses;

  const term = searchTerm.toLowerCase().trim();
  return courses.filter(
    (course) =>
      course.title.toLowerCase().includes(term) ||
      course.instructor.toLowerCase().includes(term),
  );
};

export default {
  loadCourseData,
  getCategories,
  useCourses,
  searchCourses,
};
