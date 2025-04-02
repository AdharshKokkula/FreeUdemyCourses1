import { useState, useEffect } from "react";

// Sample course data
const sampleCourses = [
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
  {
    id: "7",
    title: "Excel from Beginner to Advanced",
    thumbnail:
      "https://images.unsplash.com/photo-1542621334-a254cf47733d?w=500&q=80",
    originalPrice: "$69.99",
    category: "Business",
    couponCode: "EXCELFREE",
    courseUrl: "https://www.udemy.com/course/excel-advanced",
    rating: 4.6,
    instructor: "Emily Johnson",
  },
  {
    id: "8",
    title: "Photography Masterclass",
    thumbnail:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80",
    originalPrice: "$79.99",
    category: "Photography",
    couponCode: "PHOTOFREE",
    courseUrl: "https://www.udemy.com/course/photography-masterclass",
    rating: 4.7,
    instructor: "Michael Brown",
  },
  {
    id: "9",
    title: "Complete Guitar Lessons System",
    thumbnail:
      "https://images.unsplash.com/photo-1525201548942-d8732f6617a0?w=500&q=80",
    originalPrice: "$59.99",
    category: "Music",
    couponCode: "GUITARFREE",
    courseUrl: "https://www.udemy.com/course/guitar-complete",
    rating: 4.8,
    instructor: "David Wilson",
  },
  {
    id: "10",
    title: "Yoga for Beginners",
    thumbnail:
      "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=500&q=80",
    originalPrice: "$49.99",
    category: "Health & Fitness",
    couponCode: "YOGAFREE",
    courseUrl: "https://www.udemy.com/course/yoga-beginners",
    rating: 4.5,
    instructor: "Sarah Miller",
  },
  {
    id: "11",
    title: "React - The Complete Guide",
    thumbnail:
      "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=500&q=80",
    originalPrice: "$99.99",
    category: "Development",
    couponCode: "REACTFREE",
    courseUrl: "https://www.udemy.com/course/react-complete",
    rating: 4.9,
    instructor: "Max Schwarzmüller",
  },
  {
    id: "12",
    title: "The Complete SQL Bootcamp",
    thumbnail:
      "https://images.unsplash.com/photo-1489875347897-49f64b51c1f8?w=500&q=80",
    originalPrice: "$79.99",
    category: "IT & Software",
    couponCode: "SQLFREE",
    courseUrl: "https://www.udemy.com/course/sql-bootcamp",
    rating: 4.7,
    instructor: "Jose Portilla",
  },
];

// Custom hook to fetch and manage course data
export const useCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Extract unique categories from courses
  const allCategories = [
    ...new Set(sampleCourses.map((course) => course.category)),
  ];

  useEffect(() => {
    // Simulate API fetch with a delay
    const fetchCourses = async () => {
      try {
        setLoading(true);
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setCourses(sampleCourses);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch courses");
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return { courses, loading, error, allCategories };
};

// Function to fetch a single course by ID
export const getCourseById = (id) => {
  return sampleCourses.find((course) => course.id === id) || null;
};

// Function to fetch courses by category
export const getCoursesByCategory = (category) => {
  if (!category || category === "All") {
    return sampleCourses;
  }
  return sampleCourses.filter((course) => course.category === category);
};

export default {
  useCourses,
  getCourseById,
  getCoursesByCategory,
};
