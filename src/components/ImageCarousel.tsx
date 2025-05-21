
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageCarouselProps {
  images: {
    exterior: string[];
    commonArea: string[];
    bedroom: string[];
    bathroom: string[];
    [key: string]: string[];
  };
}

export function ImageCarousel({ images }: ImageCarouselProps) {
  const [activeTab, setActiveTab] = useState<string>("exterior");
  
  // Flatten all images and filter out empty arrays
  const allImages = Object.entries(images)
    .filter(([_, urls]) => urls && urls.length > 0)
    .reduce((acc, [type, urls]) => {
      return { ...acc, [type]: urls };
    }, {} as Record<string, string[]>);
  
  // If no images are available, show a default one
  if (Object.keys(allImages).length === 0) {
    return (
      <div className="h-80">
        <img 
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
          alt="Default hostel"
          className="w-full h-full object-cover"
        />
      </div>
    );
  }
  
  // Set active tab to the first available image category if current is empty
  if (!allImages[activeTab]) {
    setActiveTab(Object.keys(allImages)[0]);
  }
  
  const activeImages = allImages[activeTab] || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? activeImages.length - 1 : prev - 1));
  };
  
  const handleNext = () => {
    setCurrentIndex((prev) => (prev === activeImages.length - 1 ? 0 : prev + 1));
  };
  
  const tabLabels: Record<string, string> = {
    exterior: "Exterior",
    commonArea: "Common Areas",
    bedroom: "Bedrooms",
    bathroom: "Bathrooms"
  };
  
  return (
    <div className="relative h-80">
      <img 
        src={activeImages[currentIndex]}
        alt={`Hostel ${activeTab}`}
        className="w-full h-full object-cover"
      />
      
      {/* Navigation arrows */}
      <div className="absolute inset-0 flex items-center justify-between p-4">
        <Button 
          variant="outline" 
          size="icon" 
          className="bg-background/80 backdrop-blur-sm h-8 w-8 rounded-full"
          onClick={handlePrev}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button 
          variant="outline" 
          size="icon" 
          className="bg-background/80 backdrop-blur-sm h-8 w-8 rounded-full"
          onClick={handleNext}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Image counter */}
      <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm text-sm px-2 py-1 rounded">
        {currentIndex + 1} / {activeImages.length}
      </div>
      
      {/* Image category tabs */}
      <div className="absolute bottom-4 left-4 flex gap-2 overflow-x-auto pb-1 max-w-[80%]">
        {Object.keys(allImages).map((type) => (
          <button
            key={type}
            onClick={() => {
              setActiveTab(type);
              setCurrentIndex(0);
            }}
            className={`px-3 py-1 text-xs rounded whitespace-nowrap ${
              activeTab === type
                ? "bg-primary text-primary-foreground"
                : "bg-background/80 backdrop-blur-sm hover:bg-background"
            }`}
          >
            {tabLabels[type] || type}
          </button>
        ))}
      </div>
    </div>
  );
}
