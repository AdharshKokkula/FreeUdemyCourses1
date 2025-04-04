import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { ExternalLink, Info } from "lucide-react";

const CourseCard = ({
  id = "1",
  title = "Complete Web Development Bootcamp 2023",
  slug = "complete-web-development-bootcamp-2023",
  thumbnail = "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=500&q=80",
  originalPrice = "$94.99",
  category = "Development",
  couponCode = "FREECOURSE",
  courseUrl = "https://www.udemy.com/course/example",
  rating = 4.5,
  instructor = "John Doe",
}) => {
  return (
    <Card className="w-full max-w-[280px] overflow-hidden h-[320px] flex flex-col bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
      <Link to={`/course/${slug}`} className="group">
        <div className="relative">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-[140px] object-cover group-hover:opacity-90 transition-opacity"
          />
          <Badge className="absolute top-2 right-2 bg-red-500 hover:bg-red-600">
            FREE
          </Badge>
        </div>

        <CardHeader className="p-3 pb-0">
          <h3
            className="font-bold text-sm line-clamp-2 h-10 group-hover:text-blue-600 transition-colors"
            title={title}
          >
            {title}
          </h3>
        </CardHeader>
      </Link>

      <CardContent className="p-3 pt-1 flex-grow">
        <div className="flex items-center text-sm text-gray-500 mb-1">
          <span className="mr-1">Instructor:</span>
          <span className="font-medium truncate">{instructor}</span>
        </div>

        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-3 h-3 ${i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="ml-1 text-xs text-gray-500">{rating}</span>
          </div>
          <Badge className="ml-auto text-xs" variant="outline">
            {category}
          </Badge>
        </div>

        <div className="flex items-center">
          <span className="text-gray-500 line-through text-sm">
            {originalPrice}
          </span>
          <span className="ml-2 text-green-600 font-bold">$0.00</span>
        </div>
      </CardContent>

      <CardFooter className="p-3 pt-0 flex gap-2">
        <Button
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center"
          asChild
        >
          <Link to={`/course/${slug}`}>
            <Info className="h-4 w-4 mr-1" /> Details
          </Link>
        </Button>

        <Button
          className="flex-1 bg-green-600 hover:bg-green-700 text-white flex items-center justify-center"
          onClick={() =>
            window.open(`${courseUrl}?couponCode=${couponCode}`, "_blank")
          }
        >
          Get <ExternalLink className="h-4 w-4 ml-1" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
