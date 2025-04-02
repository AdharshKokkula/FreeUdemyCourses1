// Course data
const courseData = [
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
      "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=500&q=80",
    originalPrice: "$129.99",
    category: "Data Science",
    couponCode: "DATAPYTHON",
    courseUrl: "https://www.udemy.com/course/python-data-science",
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
    couponCode: "MARKETFREE",
    courseUrl: "https://www.udemy.com/course/digital-marketing",
    rating: 4.2,
    instructor: "Mike Johnson",
    description:
      "Learn SEO, social media marketing, email campaigns, and more to grow your business online.",
    expiryDate: "2023-12-20",
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
    description:
      "Master the principles of user interface and user experience design with practical projects.",
    expiryDate: "2023-12-15",
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
    description:
      "Prepare for the AWS Solutions Architect certification with hands-on labs and practice exams.",
    expiryDate: "2023-12-28",
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
    description:
      "Master JavaScript from the basics to advanced concepts like ES6, OOP, and asynchronous JS.",
    expiryDate: "2023-12-22",
  },
];

// DOM Elements
const categoryButtonsContainer = document.getElementById("category-buttons");
const courseGridContainer = document.getElementById("course-grid");
const popupAd = document.getElementById("popup-ad");
const closePopupBtn = document.getElementById("close-popup");
const popupCtaBtn = document.getElementById("popup-cta");
const currentYearSpan = document.getElementById("current-year");

// Get all available categories from the course data
function getCategories() {
  const categories = courseData.map((course) => course.category);
  return ["All", ...new Set(categories)]; // Remove duplicates and add "All"
}

// Initialize the page
function initPage() {
  // Set current year in footer
  currentYearSpan.textContent = new Date().getFullYear();

  // Render category filter buttons
  renderCategoryFilter();

  // Render courses (initially all courses)
  renderCourses();

  // Setup popup ad to appear after 30 seconds
  setupPopupAd();
}

// Render category filter buttons
function renderCategoryFilter() {
  const categories = getCategories();

  categories.forEach((category, index) => {
    const button = document.createElement("button");
    button.className = `whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
      index === 0 ? "bg-primary text-primary-foreground" : "hover:bg-slate-100"
    }`;
    button.dataset.category = category;
    button.textContent = category;
    button.addEventListener("click", handleCategoryClick);

    categoryButtonsContainer.appendChild(button);
  });
}

// Handle category button click
function handleCategoryClick(e) {
  // Update active state for buttons
  const buttons = categoryButtonsContainer.querySelectorAll("button");
  buttons.forEach((button) => {
    if (button === e.target) {
      button.className =
        "whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors bg-primary text-primary-foreground";
    } else {
      button.className =
        "whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors hover:bg-slate-100";
    }
  });

  // Get selected category and render filtered courses
  const selectedCategory = e.target.dataset.category;
  renderCourses(selectedCategory);
}

// Render courses based on selected category
function renderCourses(selectedCategory = "All") {
  // Clear current courses
  courseGridContainer.innerHTML = "";

  // Filter courses by category
  const filteredCourses =
    selectedCategory === "All"
      ? courseData
      : courseData.filter((course) => course.category === selectedCategory);

  if (filteredCourses.length === 0) {
    // Show no courses found message
    courseGridContainer.innerHTML = `
      <div class="text-center py-12">
        <h3 class="text-lg font-medium text-gray-900">No courses found</h3>
        <p class="mt-2 text-sm text-gray-500">
          Try selecting a different category or check back later for new courses.
        </p>
      </div>
    `;
    return;
  }

  // Function to insert ads between rows of courses
  const renderCoursesWithAds = () => {
    // Calculate how many courses to show per row based on screen size
    const getCoursesPerRow = () => {
      const width = window.innerWidth;
      if (width >= 1024) return 4; // lg
      if (width >= 768) return 3; // md
      if (width >= 640) return 2; // sm
      return 1; // xs
    };

    const coursesPerRow = getCoursesPerRow();
    const adFrequency = 2; // Show ad after every 2 rows
    let courseIndex = 0;

    while (courseIndex < filteredCourses.length) {
      // Add a row of courses
      const rowCourses = filteredCourses.slice(
        courseIndex,
        courseIndex + coursesPerRow,
      );

      // Create row element
      const row = document.createElement("div");
      row.className =
        "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6";

      // Add courses to row
      rowCourses.forEach((course) => {
        row.appendChild(createCourseCard(course));
      });

      courseGridContainer.appendChild(row);
      courseIndex += coursesPerRow;

      // Add an ad banner after every 'adFrequency' rows, except after the last row
      if (
        courseIndex < filteredCourses.length &&
        Math.floor(courseIndex / coursesPerRow) % adFrequency === 0
      ) {
        courseGridContainer.appendChild(createAdBanner());
      }
    }
  };

  renderCoursesWithAds();
}

// Create course card element
function createCourseCard(course) {
  const card = document.createElement("div");
  card.className =
    "w-full max-w-[280px] overflow-hidden h-[320px] flex flex-col bg-white shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg";

  // Generate star rating HTML
  const starsHtml = Array(5)
    .fill()
    .map((_, i) => {
      return `<svg class="w-3 h-3 ${i < Math.floor(course.rating) ? "text-yellow-400" : "text-gray-300"}" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>`;
    })
    .join("");

  card.innerHTML = `
    <div class="relative">
      <img src="${course.thumbnail}" alt="${course.title}" class="w-full h-[140px] object-cover" />
      <span class="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded">FREE</span>
    </div>
    
    <div class="p-3 pb-0">
      <h3 class="font-bold text-sm line-clamp-2 h-10" title="${course.title}">${course.title}</h3>
    </div>
    
    <div class="p-3 pt-1 flex-grow">
      <div class="flex items-center text-sm text-gray-500 mb-1">
        <span class="mr-1">Instructor:</span>
        <span class="font-medium truncate">${course.instructor}</span>
      </div>
      
      <div class="flex items-center mb-2">
        <div class="flex items-center">
          ${starsHtml}
          <span class="ml-1 text-xs text-gray-500">${course.rating}</span>
        </div>
        <span class="ml-auto text-xs border border-gray-200 px-1.5 py-0.5 rounded">${course.category}</span>
      </div>
      
      <div class="flex items-center">
        <span class="text-gray-500 line-through text-sm">${course.originalPrice}</span>
        <span class="ml-2 text-green-600 font-bold">$0.00</span>
      </div>
    </div>
    
    <div class="p-3 pt-0">
      <button class="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-1 py-2 px-4 rounded-md font-medium text-sm">
        Get Course <i class="fas fa-external-link-alt ml-1"></i>
      </button>
    </div>
  `;

  // Add event listener to the button
  const button = card.querySelector("button");
  button.addEventListener("click", () => {
    window.open(
      `${course.courseUrl}?couponCode=${course.couponCode}`,
      "_blank",
    );
  });

  return card;
}

// Create ad banner element
function createAdBanner(position = "between-rows") {
  const banner = document.createElement("div");
  banner.className =
    "relative overflow-hidden rounded-md shadow-md my-4 w-full h-[120px] bg-gradient-to-r from-yellow-100 to-green-100";
  banner.setAttribute("aria-label", "Advertisement");

  banner.innerHTML = `
    <div class="flex flex-col items-center justify-center w-full h-full">
      <div class="text-gray-500 text-sm font-medium mb-2">ADVERTISEMENT</div>
      <div class="flex items-center justify-center space-x-2">
        <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
          <i class="fas fa-play text-white"></i>
        </div>
        <span class="text-blue-500 font-semibold">Your Ad Here</span>
      </div>
      <p class="text-xs text-gray-400 mt-2">This is a placeholder for Google AdSense</p>
    </div>
  `;

  return banner;
}

// Setup popup ad
function setupPopupAd() {
  // Set popup to appear after 30 seconds
  setTimeout(() => {
    popupAd.classList.remove("hidden");
  }, 30000); // 30 seconds

  // Close popup when close button is clicked
  closePopupBtn.addEventListener("click", () => {
    popupAd.classList.add("hidden");
  });

  // Handle CTA button click
  popupCtaBtn.addEventListener("click", () => {
    window.open("https://example.com/special-offer", "_blank");
    popupAd.classList.add("hidden");
  });
}

// Handle window resize to update course grid layout
window.addEventListener("resize", () => {
  // Get the currently selected category
  const activeButton = categoryButtonsContainer.querySelector(".bg-primary");
  const selectedCategory = activeButton ? activeButton.dataset.category : "All";

  // Re-render courses with the selected category
  renderCourses(selectedCategory);
});

// Initialize the page when DOM is loaded
document.addEventListener("DOMContentLoaded", initPage);
