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
    title: "Professional Certificate: Finance Data Analysis & Analytics",
    slug: "professional-certificate-finance-data-analysis-analytics",
    thumbnail:
      "https://images.unsplash.com/photo-1641938116300-2b0a0920e173?w=500&q=80",
    originalPrice: "$99.99",
    category: "Finance",
    couponCode: "A790223982F058E87FAC",
    courseUrl:
      "https://www.udemy.com/course/professional-certificate-finance-data-analysis-analytics/",
    rating: 4.6,
    instructor: "Unknown Instructor",
    description:
      "Master financial data analysis and analytics with this professional certificate course.",
  },
  {
    id: "2",
    title: "Art Gallery Management Mastery Course",
    slug: "art-gallery-management-mastery-course",
    thumbnail:
      "https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=500&q=80",
    originalPrice: "$84.99",
    category: "Art",
    couponCode: "A67152376E8CE006E06E",
    courseUrl:
      "https://www.udemy.com/course/art-gallery-management-mastery-course/",
    rating: 4.3,
    instructor: "Unknown Instructor",
    description:
      "Learn the essentials of managing an art gallery with this comprehensive mastery course.",
  },
  {
    id: "3",
    title: "Executive Presence: Foundations of Confident Leadership",
    slug: "executive-presence-foundations-of-confident-leadership",
    thumbnail:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&q=80",
    originalPrice: "$89.99",
    category: "Leadership",
    couponCode: "1CD21CFEDCA44A562760",
    courseUrl:
      "https://www.udemy.com/course/executive-presence-foundations-of-confident-leadership/",
    rating: 4.7,
    instructor: "Unknown Instructor",
    description:
      "Build executive presence and confident leadership skills with this foundational course.",
  },
  {
    id: "4",
    title: "Ethically Hack the Planet Part 4",
    slug: "ethically-hack-the-planet-part-4",
    thumbnail:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&q=80",
    originalPrice: "$109.99",
    category: "Cybersecurity",
    couponCode: "FF13C9E5B86608FBBCC1",
    courseUrl: "https://www.udemy.com/course/ethically-hack-the-planet-part-4/",
    rating: 4.5,
    instructor: "Unknown Instructor",
    description:
      "Advanced ethical hacking techniques in part 4 of this comprehensive series.",
  },
  {
    id: "5",
    title: "AI Art Generation",
    slug: "ai-art-generation",
    thumbnail:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=500&q=80",
    originalPrice: "$79.99",
    category: "Artificial Intelligence",
    couponCode: "79B294BBF83399B7BEAC",
    courseUrl: "https://www.udemy.com/course/ai-art-generation/",
    rating: 4.4,
    instructor: "Unknown Instructor",
    description:
      "Create stunning art using artificial intelligence tools and techniques.",
  },
  {
    id: "6",
    title: "Modeling & Rendering Interior Office Project in Revit",
    slug: "modeling-rending-interior-office-project-in-revit",
    thumbnail:
      "https://images.unsplash.com/photo-1497366754035-fc079f7988fc?w=500&q=80",
    originalPrice: "$94.99",
    category: "Architecture",
    couponCode: "5648E5FDF25ED65025F0",
    courseUrl:
      "https://www.udemy.com/course/modeling-rending-interior-office-project-in-revit/",
    rating: 4.6,
    instructor: "Unknown Instructor",
    description:
      "Learn to model and render interior office designs using Revit software.",
  },
  {
    id: "7",
    title: "Learn Chess in Hindi: Zero to Master Level",
    slug: "learn-chess-in-hindi-zero-to-master-level",
    thumbnail:
      "https://images.unsplash.com/photo-1588394768561-0a79414e29b0?w=500&q=80",
    originalPrice: "$69.99",
    category: "Gaming",
    couponCode: "73A667D67A66A264692A",
    courseUrl:
      "https://www.udemy.com/course/learn-chess-in-hindi-zero-to-master-level/",
    rating: 4.3,
    instructor: "Unknown Instructor",
    description:
      "Master chess from beginner to advanced levels with lessons in Hindi.",
  },
  {
    id: "8",
    title: "Learn AutoCAD 2D",
    slug: "learn-autocad-2d",
    thumbnail:
      "https://images.unsplash.com/photo-1508830524289-0adcbe822b40?w=500&q=80",
    originalPrice: "$74.99",
    category: "Design",
    couponCode: "89B3442164439DF5B157",
    courseUrl: "https://www.udemy.com/course/learn-autocad-2d/",
    rating: 4.5,
    instructor: "Unknown Instructor",
    description:
      "Learn the fundamentals of 2D drafting and design using AutoCAD.",
  },
  {
    id: "9",
    title: "Quantity Surveying & Building Estimate",
    slug: "quantity-surveying-building-estimate",
    thumbnail:
      "https://images.unsplash.com/photo-1504307651254-35680f3567cd?w=500&q=80",
    originalPrice: "$89.99",
    category: "Construction",
    couponCode: "7EAD6754D49AF57DC0E7",
    courseUrl:
      "https://www.udemy.com/course/quantity-surveying-building-estimate/",
    rating: 4.4,
    instructor: "Unknown Instructor",
    description:
      "Master quantity surveying and building cost estimation techniques.",
  },
  {
    id: "10",
    title: "Learn Bar Bending Schedule in AutoCAD & Excel",
    slug: "learn-bar-bending-schedule-in-autocad-excel",
    thumbnail:
      "https://images.unsplash.com/photo-1504307651254-35680f3567cd?w=500&q=80",
    originalPrice: "$79.99",
    category: "Engineering",
    couponCode: "29B30D095BAFEBA04A5A",
    courseUrl:
      "https://www.udemy.com/course/learn-bar-bending-schedule-in-autocad-excel/",
    rating: 4.5,
    instructor: "Unknown Instructor",
    description:
      "Learn to create bar bending schedules using AutoCAD and Excel.",
  },
  {
    id: "11",
    title: "ETABS From Zero to Hero",
    slug: "etabs-from-zero-to-hero",
    thumbnail:
      "https://images.unsplash.com/photo-1504307651254-35680f3567cd?w=500&q=80",
    originalPrice: "$99.99",
    category: "Engineering",
    couponCode: "9C0EFE716BE66069ABB5",
    courseUrl: "https://www.udemy.com/course/etabs-from-zero-to-hero/",
    rating: 4.6,
    instructor: "Unknown Instructor",
    description:
      "Become an expert in structural analysis and design using ETABS.",
  },
  {
    id: "12",
    title: "Learn Dynamo in Revit: Zero to Hero in Hindi",
    slug: "learn-dynamo-in-revit-zero-to-hero-in-hindi",
    thumbnail:
      "https://images.unsplash.com/photo-1497366754035-fc079f7988fc?w=500&q=80",
    originalPrice: "$89.99",
    category: "Architecture",
    couponCode: "BF23E73FA7E96F3B755A",
    courseUrl:
      "https://www.udemy.com/course/learn-dynamo-in-revit-zero-to-hero-in-hindi/",
    rating: 4.5,
    instructor: "Unknown Instructor",
    description: "Master Dynamo for Revit from scratch with lessons in Hindi.",
  },
  {
    id: "13",
    title: "Learn STAAD.Pro From Zero to Hero in Hindi",
    slug: "learn-staad-pro-from-zero-to-hero-hindi",
    thumbnail:
      "https://images.unsplash.com/photo-1504307651254-35680f3567cd?w=500&q=80",
    originalPrice: "$94.99",
    category: "Engineering",
    couponCode: "B1F094A5CFD7CA6CA873",
    courseUrl:
      "https://www.udemy.com/course/learn-staad-pro-from-zero-to-hero-hindi/",
    rating: 4.6,
    instructor: "Unknown Instructor",
    description:
      "Learn structural analysis and design with STAAD.Pro in Hindi.",
  },
  {
    id: "14",
    title: "Recon Ninja: Advanced Info Gathering for Ethical Hackers",
    slug: "recon-ninja-advanced-info-gathering-for-ethical-hackers",
    thumbnail:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&q=80",
    originalPrice: "$119.99",
    category: "Cybersecurity",
    couponCode: "D9E5B0F39B30F404E235",
    courseUrl:
      "https://www.udemy.com/course/recon-ninja-advanced-info-gathering-for-ethical-hackers/",
    rating: 4.7,
    instructor: "Unknown Instructor",
    description: "Advanced reconnaissance techniques for ethical hackers.",
  },
  {
    id: "15",
    title: "Become a Hydra Expert: Advanced Brute Forcing Techniques",
    slug: "become-a-hydra-expert-advanced-brute-forcing-techniques",
    thumbnail:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&q=80",
    originalPrice: "$109.99",
    category: "Cybersecurity",
    couponCode: "B202431D4E89DD7E0558",
    courseUrl:
      "https://www.udemy.com/course/become-a-hydra-expert-advanced-brute-forcing-techniques/",
    rating: 4.6,
    instructor: "Unknown Instructor",
    description: "Master advanced brute-forcing techniques using Hydra.",
  },
  {
    id: "16",
    title: "Hacking the Human Mind: Social Engineering Fundamentals",
    slug: "hacking-the-human-mind-social-engineering-fundamentals",
    thumbnail:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&q=80",
    originalPrice: "$99.99",
    category: "Cybersecurity",
    couponCode: "10ABE304E1288964A4E2",
    courseUrl:
      "https://www.udemy.com/course/hacking-the-human-mind-social-engineering-fundamentals/",
    rating: 4.5,
    instructor: "Unknown Instructor",
    description: "Learn the basics of social engineering for cybersecurity.",
  },
  {
    id: "17",
    title: "SQLMap From Scratch for Ethical Hackers",
    slug: "sqlmap-from-scratch-for-ethical-hackers",
    thumbnail:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&q=80",
    originalPrice: "$104.99",
    category: "Cybersecurity",
    couponCode: "70F9DC320036C83E9228",
    courseUrl:
      "https://www.udemy.com/course/sqlmap-from-scratch-for-ethical-hackers/",
    rating: 4.6,
    instructor: "Unknown Instructor",
    description: "Learn SQLMap for ethical hacking from the ground up.",
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
