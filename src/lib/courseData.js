import { useState, useEffect } from "react";

// Function to create slug from title
const createSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

// Sample course data
const sampleCourses = [
  {
    id: "1",
    title: "Complete Web Development Bootcamp 2023",
    slug: "complete-web-development-bootcamp-2023",
    thumbnail:
      "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=500&q=80",
    originalPrice: "$94.99",
    category: "Development",
    couponCode: "FREECOURSE",
    courseUrl: "https://www.udemy.com/course/example",
    rating: 4.5,
    instructor: "John Doe",
    description:
      "Learn web development from scratch with this comprehensive bootcamp. Covers HTML, CSS, JavaScript, React, Node.js and more.",
  },
  {
    id: "2",
    title: "Python for Data Science and Machine Learning",
    slug: "python-for-data-science-and-machine-learning",
    thumbnail:
      "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=500&q=80",
    originalPrice: "$129.99",
    category: "Data Science",
    couponCode: "DATAPYTHON",
    courseUrl: "https://www.udemy.com/course/python-data-science",
    rating: 4.8,
    instructor: "Jane Smith",
    description:
      "Master Python for data analysis, visualization, and machine learning. Learn pandas, NumPy, Matplotlib, Seaborn, Scikit-Learn, and more.",
  },
  {
    id: "3",
    title: "Digital Marketing Masterclass",
    slug: "digital-marketing-masterclass",
    thumbnail:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&q=80",
    originalPrice: "$84.99",
    category: "Marketing",
    couponCode: "MARKETFREE",
    courseUrl: "https://www.udemy.com/course/digital-marketing",
    rating: 4.2,
    instructor: "Mike Johnson",
    description:
      "Learn digital marketing strategies including SEO, social media marketing, email campaigns, PPC advertising, and content marketing.",
  },
  {
    id: "4",
    title: "UI/UX Design Fundamentals",
    slug: "ui-ux-design-fundamentals",
    thumbnail:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&q=80",
    originalPrice: "$74.99",
    category: "Design",
    couponCode: "UXFREE",
    courseUrl: "https://www.udemy.com/course/uiux-design",
    rating: 4.6,
    instructor: "Sarah Williams",
    description:
      "Master the principles of user interface and user experience design. Learn wireframing, prototyping, and design thinking methodologies.",
  },
  {
    id: "5",
    title: "AWS Certified Solutions Architect",
    slug: "aws-certified-solutions-architect",
    thumbnail:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&q=80",
    originalPrice: "$149.99",
    category: "IT & Software",
    couponCode: "AWSCERT",
    courseUrl: "https://www.udemy.com/course/aws-architect",
    rating: 4.7,
    instructor: "David Clark",
    description:
      "Prepare for the AWS Solutions Architect certification. Learn to design and deploy scalable, highly available systems on Amazon Web Services.",
  },
  {
    id: "6",
    title: "Complete JavaScript Course 2023",
    slug: "complete-javascript-course-2023",
    thumbnail:
      "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=500&q=80",
    originalPrice: "$89.99",
    category: "Development",
    couponCode: "JSMASTER",
    courseUrl: "https://www.udemy.com/course/javascript-complete",
    rating: 4.9,
    instructor: "Robert Wilson",
    description:
      "Master JavaScript from the basics to advanced concepts. Learn ES6+, asynchronous JavaScript, OOP, functional programming, and more.",
  },
  {
    id: "7",
    title: "Excel from Beginner to Advanced",
    slug: "excel-from-beginner-to-advanced",
    thumbnail:
      "https://images.unsplash.com/photo-1542621334-a254cf47733d?w=500&q=80",
    originalPrice: "$69.99",
    category: "Business",
    couponCode: "EXCELFREE",
    courseUrl: "https://www.udemy.com/course/excel-advanced",
    rating: 4.6,
    instructor: "Emily Johnson",
    description:
      "Learn Microsoft Excel from basic to advanced. Master formulas, functions, pivot tables, macros, and data analysis techniques.",
  },
  {
    id: "8",
    title: "Photography Masterclass",
    slug: "photography-masterclass",
    thumbnail:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80",
    originalPrice: "$79.99",
    category: "Photography",
    couponCode: "PHOTOFREE",
    courseUrl: "https://www.udemy.com/course/photography-masterclass",
    rating: 4.7,
    instructor: "Michael Brown",
    description:
      "Learn professional photography techniques. Master camera settings, composition, lighting, and post-processing in this comprehensive course.",
  },
  {
    id: "9",
    title: "Complete Guitar Lessons System",
    slug: "complete-guitar-lessons-system",
    thumbnail:
      "https://images.unsplash.com/photo-1525201548942-d8732f6617a0?w=500&q=80",
    originalPrice: "$59.99",
    category: "Music",
    couponCode: "GUITARFREE",
    courseUrl: "https://www.udemy.com/course/guitar-complete",
    rating: 4.8,
    instructor: "David Wilson",
    description:
      "Learn to play guitar from scratch. This course covers chords, scales, music theory, and playing techniques for beginners to advanced players.",
  },
  {
    id: "10",
    title: "Yoga for Beginners",
    slug: "yoga-for-beginners",
    thumbnail:
      "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=500&q=80",
    originalPrice: "$49.99",
    category: "Health & Fitness",
    couponCode: "YOGAFREE",
    courseUrl: "https://www.udemy.com/course/yoga-beginners",
    rating: 4.5,
    instructor: "Sarah Miller",
    description:
      "Start your yoga journey with this beginner-friendly course. Learn fundamental poses, breathing techniques, and mindfulness practices.",
  },
  {
    id: "11",
    title: "React - The Complete Guide",
    slug: "react-the-complete-guide",
    thumbnail:
      "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=500&q=80",
    originalPrice: "$99.99",
    category: "Development",
    couponCode: "REACTFREE",
    courseUrl: "https://www.udemy.com/course/react-complete",
    rating: 4.9,
    instructor: "Max Schwarzmüller",
    description:
      "Master React.js from the ground up. Learn hooks, Redux, React Router, Next.js and build powerful, responsive web applications.",
  },
  {
    id: "12",
    title: "The Complete SQL Bootcamp",
    slug: "the-complete-sql-bootcamp",
    thumbnail:
      "https://images.unsplash.com/photo-1489875347897-49f64b51c1f8?w=500&q=80",
    originalPrice: "$79.99",
    category: "IT & Software",
    couponCode: "SQLFREE",
    courseUrl: "https://www.udemy.com/course/sql-bootcamp",
    rating: 4.7,
    instructor: "Jose Portilla",
    description:
      "Learn SQL for data analysis and database management. Master queries, joins, aggregations, and database design principles.",
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

// Function to fetch a single course by slug
export const getCourseBySlug = (slug) => {
  return sampleCourses.find((course) => course.slug === slug) || null;
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
  getCourseBySlug,
  getCoursesByCategory,
};
