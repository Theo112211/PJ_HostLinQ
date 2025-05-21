
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Search, Filter } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { motion } from "framer-motion";

export interface SearchFiltersProps {
  priceRange: [number, number];
  setPriceRange: Dispatch<SetStateAction<[number, number]>>;
  selectedAmenities: string[];
  setSelectedAmenities: Dispatch<SetStateAction<string[]>>;
  availability: string[];
  setAvailability: Dispatch<SetStateAction<string[]>>;
  locationSearch?: string;
  setLocationSearch?: Dispatch<SetStateAction<string>>;
}

export function SearchFilters({
  priceRange,
  setPriceRange,
  selectedAmenities,
  setSelectedAmenities,
  availability,
  setAvailability,
  locationSearch = "",
  setLocationSearch
}: SearchFiltersProps) {
  const [isFiltersOpen, setIsFiltersOpen] = useState(true);

  const amenitiesList = [
    "Free WiFi",
    "Breakfast Included",
    "Kitchen",
    "Laundry",
    "Private Rooms",
    "24/7 Reception",
    "Lockers",
    "Air Conditioning"
  ];

  const handleAmenityToggle = (amenity: string) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(prev => prev.filter(item => item !== amenity));
    } else {
      setSelectedAmenities(prev => [...prev, amenity]);
    }
  };

  const handleAvailabilityToggle = (status: string) => {
    if (availability.includes(status)) {
      if (availability.length > 1) {
        setAvailability(prev => prev.filter(item => item !== status));
      }
    } else {
      setAvailability(prev => [...prev, status]);
    }
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (setLocationSearch) {
      setLocationSearch(e.target.value);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="font-bold text-lg mb-4">Filters</h3>
      
      {/* Location Filter */}
      {setLocationSearch && (
        <div className="mb-6">
          <h4 className="font-medium mb-3">Location</h4>
          <Input 
            type="text"
            placeholder="Filter by location..."
            value={locationSearch}
            onChange={handleLocationChange}
            className="w-full"
          />
        </div>
      )}
      
      {/* Price Range */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Price Range</h4>
        <div className="px-2">
          <Slider
            value={[priceRange[0], priceRange[1]]}
            min={0}
            max={200}
            step={1}
            onValueChange={(value) => setPriceRange([value[0], value[1]])}
            className="mb-2"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Amenities */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Amenities</h4>
        <div className="grid grid-cols-1 gap-2">
          {amenitiesList.map((amenity) => (
            <motion.div 
              key={amenity} 
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Checkbox
                id={`amenity-${amenity}`}
                checked={selectedAmenities.includes(amenity)}
                onCheckedChange={() => handleAmenityToggle(amenity)}
              />
              <label
                htmlFor={`amenity-${amenity}`}
                className="text-sm cursor-pointer"
              >
                {amenity}
              </label>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div>
        <h4 className="font-medium mb-3">Availability</h4>
        <div className="space-y-2">
          {["available", "limited", "unavailable"].map(status => (
            <motion.div 
              key={status} 
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Checkbox
                id={`availability-${status}`}
                checked={availability.includes(status)}
                onCheckedChange={() => handleAvailabilityToggle(status)}
              />
              <label
                htmlFor={`availability-${status}`}
                className="text-sm capitalize cursor-pointer"
              >
                {status}
              </label>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
