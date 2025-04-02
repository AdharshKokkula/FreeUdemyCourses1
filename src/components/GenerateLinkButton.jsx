import React, { useState } from "react";
import { Button } from "./ui/button";
import { ExternalLink, Copy, Check } from "lucide-react";

const GenerateLinkButton = ({
  courseUrl = "",
  couponCode = "",
  isEnabled = false,
  className = "",
}) => {
  const [linkGenerated, setLinkGenerated] = useState(false);
  const [copied, setCopied] = useState(false);

  const fullUrl = `${courseUrl}?couponCode=${couponCode}`;

  const handleGenerateLink = () => {
    if (!isEnabled) return;
    setLinkGenerated(true);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenLink = () => {
    window.open(fullUrl, "_blank");
  };

  if (!linkGenerated) {
    return (
      <Button
        className={`w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-1 ${className} ${!isEnabled ? "opacity-50 cursor-not-allowed" : ""}`}
        onClick={handleGenerateLink}
        disabled={!isEnabled}
      >
        Generate Course Link
      </Button>
    );
  }

  return (
    <div className="space-y-4">
      <div className="p-3 bg-gray-100 rounded-md flex items-center justify-between">
        <div className="text-sm font-medium text-gray-800 truncate mr-2">
          {fullUrl}
        </div>
        <div className="flex space-x-2">
          <Button
            size="sm"
            variant="outline"
            className="flex items-center gap-1"
            onClick={handleCopyLink}
          >
            {copied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            {copied ? "Copied" : "Copy"}
          </Button>
        </div>
      </div>
      <Button
        className="w-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-1"
        onClick={handleOpenLink}
      >
        Get Course <ExternalLink className="h-4 w-4 ml-1" />
      </Button>
    </div>
  );
};

export default GenerateLinkButton;
