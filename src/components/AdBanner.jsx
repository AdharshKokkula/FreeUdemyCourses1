import React, { useEffect, useState } from "react";

const AdBanner = ({
  position = "between-rows",
  width = "100%",
  height = "120px",
  adCode = "",
  isVisible = true,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Simulate ad loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  // Different styling based on position
  const getPositionStyles = () => {
    switch (position) {
      case "header":
        return "w-full h-[90px] bg-gradient-to-r from-blue-100 to-purple-100";
      case "sidebar":
        return "w-full h-[600px] bg-gradient-to-b from-green-100 to-blue-100";
      case "footer":
        return "w-full h-[90px] bg-gradient-to-r from-orange-100 to-red-100";
      case "between-rows":
      default:
        return "w-full h-[120px] bg-gradient-to-r from-yellow-100 to-green-100";
    }
  };

  return (
    <div
      className={`ad-banner relative overflow-hidden rounded-md shadow-md my-4 ${getPositionStyles()}`}
      style={{ width, height, backgroundColor: "#f0f0f0" }}
      aria-label="Advertisement"
    >
      {adCode ? (
        <div dangerouslySetInnerHTML={{ __html: adCode }} />
      ) : (
        <div className="flex flex-col items-center justify-center w-full h-full">
          {!isLoaded ? (
            <div className="animate-pulse flex flex-col items-center justify-center w-full h-full">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ) : (
            <>
              <div className="text-gray-500 text-sm font-medium mb-2">
                ADVERTISEMENT
              </div>
              <div className="flex items-center justify-center space-x-2">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                </div>
                <span className="text-blue-500 font-semibold">
                  Your Ad Here
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                This is a placeholder for Google AdSense
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default AdBanner;
