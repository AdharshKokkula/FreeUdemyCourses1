import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getCourseBySlug } from "../lib/courseData";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { ArrowLeft, Clock } from "lucide-react";
import AdComponent from "./AdComponent";
import GenerateLinkButton from "./GenerateLinkButton";
import Header from "./Header";
import Footer from "./Footer";

const CourseDetail = ({ mockCourse }) => {
  const { slug } = useParams();
  const course = mockCourse || getCourseBySlug(slug);
  const [timeLeft, setTimeLeft] = useState(30);
  const [timerActive, setTimerActive] = useState(false);
  const [linkEnabled, setLinkEnabled] = useState(false);

  useEffect(() => {
    // Start the timer when component mounts
    setTimerActive(true);
  }, []);

  useEffect(() => {
    let timer;
    if (timerActive && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setLinkEnabled(true);
    }

    return () => clearTimeout(timer);
  }, [timerActive, timeLeft]);

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Course Not Found
            </h2>
            <p className="text-gray-600 mb-6">
              The course you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Courses
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <Link to="/">
          <Button variant="outline" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Courses
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden bg-white shadow-md">
              <div className="relative">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-[300px] object-cover"
                />
                <Badge className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white px-3 py-1">
                  FREE
                </Badge>
              </div>

              <CardContent className="p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {course.title}
                </h1>

                <div className="flex items-center text-sm text-gray-600 mb-4">
                  <span className="mr-1">Instructor:</span>
                  <span className="font-medium">{course.instructor}</span>
                  <span className="mx-2">•</span>
                  <span className="mr-1">Category:</span>
                  <Badge variant="outline" className="ml-1">
                    {course.category}
                  </Badge>
                </div>

                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(course.rating) ? "text-yellow-400" : "text-gray-300"}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="ml-1 text-sm text-gray-600">
                      {course.rating}
                    </span>
                  </div>
                  <div className="ml-auto">
                    <span className="text-gray-500 line-through text-sm mr-2">
                      {course.originalPrice}
                    </span>
                    <span className="text-green-600 font-bold">$0.00</span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 mt-4">
                  <h3 className="text-lg font-semibold mb-2">
                    About this course
                  </h3>
                  <p className="text-gray-700 mb-4">{course.description}</p>
                </div>

                {/* Top Ad */}
                <AdComponent placement="top" height="250px" />

                {/* Timer and Generate Link Button */}
                <div className="border p-4 rounded-md bg-gray-50 my-6">
                  <div className="flex items-center justify-center mb-4">
                    <Clock className="text-blue-500 mr-2 h-5 w-5" />
                    <span className="text-gray-700 font-medium">
                      {linkEnabled
                        ? "Your course link is ready!"
                        : `Please wait ${timeLeft} seconds to generate your course link`}
                    </span>
                  </div>

                  {!linkEnabled && (
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                        style={{ width: `${((30 - timeLeft) / 30) * 100}%` }}
                      ></div>
                    </div>
                  )}

                  <GenerateLinkButton
                    courseUrl={course.courseUrl}
                    couponCode={course.couponCode}
                    isEnabled={linkEnabled}
                  />
                </div>

                {/* Bottom Ad */}
                <AdComponent placement="bottom" height="250px" />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-white shadow-md overflow-hidden sticky top-20">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Course Details</h3>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Original Price:</span>
                    <span className="text-gray-500 line-through">
                      {course.originalPrice}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Discount:</span>
                    <span className="text-green-600 font-medium">100% OFF</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Current Price:</span>
                    <span className="text-green-600 font-bold">$0.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Coupon Code:</span>
                    <span className="font-mono bg-gray-100 px-2 py-1 rounded text-sm">
                      {course.couponCode}
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold mb-4">
                    Related Courses
                  </h3>
                  <div className="space-y-4">
                    {/* This would be populated with actual related courses */}
                    <div className="text-sm text-gray-600">
                      Related courses will appear here based on category.
                    </div>
                  </div>
                </div>

                {/* Sidebar Ad */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <AdComponent position="sidebar" height="400px" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CourseDetail;
