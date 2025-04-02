import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Button } from "./ui/button";

interface PopupAdProps {
  isOpen?: boolean;
  onClose?: () => void;
  delayInSeconds?: number;
  title?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
  imageUrl?: string;
}

const PopupAd: React.FC<PopupAdProps> = ({
  isOpen: externalIsOpen,
  onClose,
  delayInSeconds = 30,
  title = "Special Offer Just For You!",
  description = "Get access to premium programming courses with 50% off using our exclusive partner link. Limited time offer!",
  ctaText = "Get This Deal",
  ctaLink = "https://example.com/special-offer",
  imageUrl = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80",
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);

  // Determine if component is controlled or uncontrolled
  const isControlled = externalIsOpen !== undefined;
  const isOpen = isControlled ? externalIsOpen : internalIsOpen;

  useEffect(() => {
    // Only set timer if component is uncontrolled
    if (!isControlled) {
      const timer = setTimeout(() => {
        setInternalIsOpen(true);
      }, delayInSeconds * 1000);

      return () => clearTimeout(timer);
    }
  }, [isControlled, delayInSeconds]);

  const handleClose = () => {
    if (!isControlled) {
      setInternalIsOpen(false);
    }
    if (onClose) {
      onClose();
    }
  };

  const handleCTAClick = () => {
    // Open the CTA link in a new tab
    window.open(ctaLink, "_blank");
    // Close the popup
    handleClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-white rounded-lg overflow-hidden">
        <div className="absolute right-4 top-4 z-10">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            className="h-8 w-8 rounded-full bg-white/80 hover:bg-white/90"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex flex-col bg-white">
          <div className="relative w-full h-48 overflow-hidden">
            <img
              src={imageUrl}
              alt="Special offer"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/50 to-transparent"></div>
          </div>

          <DialogHeader className="p-6 pb-2">
            <DialogTitle className="text-2xl font-bold text-center">
              {title}
            </DialogTitle>
            <DialogDescription className="text-center mt-2">
              {description}
            </DialogDescription>
          </DialogHeader>

          <div className="p-6 pt-2 flex flex-col items-center">
            <Button
              onClick={handleCTAClick}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium"
            >
              {ctaText}
            </Button>

            <p className="text-xs text-gray-500 mt-4 text-center">
              By clicking the button, you'll be redirected to our partner's
              website.
              <br />
              This helps support our free course listings.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PopupAd;
