import React, { useState } from "react";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";

const CategoryFilter = ({
  categories = [
    "All",
    "Development",
    "Business",
    "IT & Software",
    "Design",
    "Marketing",
    "Personal Development",
    "Photography",
    "Music",
    "Health & Fitness",
  ],
  selectedCategory = "All",
  onCategoryChange = () => {},
}) => {
  const [active, setActive] = useState(selectedCategory);

  const handleCategoryClick = (category) => {
    setActive(category);
    onCategoryChange(category);
  };

  return (
    <div className="w-full bg-white shadow-sm py-4 px-2 mb-6">
      <ScrollArea className="w-full">
        <div className="flex space-x-2 pb-1">
          {categories.map((category) => (
            <Button
              key={category}
              variant={active === category ? "default" : "outline"}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${active === category ? "bg-primary text-primary-foreground" : "hover:bg-slate-100"}`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default CategoryFilter;
