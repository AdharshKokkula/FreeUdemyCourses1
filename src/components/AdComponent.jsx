import React from "react";
import AdBanner from "./AdBanner";

const AdComponent = ({
  position = "course-detail",
  placement = "top", // top, bottom
  width = "100%",
  height = "250px",
}) => {
  // Different styling based on placement
  const getPlacementStyles = () => {
    switch (placement) {
      case "top":
        return "mb-6";
      case "bottom":
        return "mt-6";
      default:
        return "my-4";
    }
  };

  return (
    <div className={`ad-component ${getPlacementStyles()}`}>
      <AdBanner
        position={position}
        width={width}
        height={height}
        isVisible={true}
      />
      <div className="text-xs text-center text-gray-500 mt-1">
        Advertisement
      </div>
    </div>
  );
};

export default AdComponent;
