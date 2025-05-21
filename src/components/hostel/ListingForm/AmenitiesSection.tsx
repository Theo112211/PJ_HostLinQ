
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const amenitiesList = [
  "Free WiFi",
  "Breakfast Included",
  "Kitchen",
  "Laundry",
  "Private Rooms",
  "24/7 Reception",
  "Lockers",
  "Air Conditioning",
  "Bike Rental",
  "Bar/Cafe",
  "Tours/Activities",
  "Outdoor Area",
  "Shuttle Service",
  "Laundry Service",
  "24/7 Security"
];

interface AmenitiesSectionProps {
  selectedAmenities: string[];
  onAmenityToggle: (amenity: string) => void;
}

export const AmenitiesSection = ({
  selectedAmenities,
  onAmenityToggle
}: AmenitiesSectionProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Amenities</h2>
      <p className="text-sm text-muted-foreground mb-2">
        Select all amenities that your hostel offers:
      </p>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {amenitiesList.map((amenity) => (
          <div key={amenity} className="flex items-center space-x-2">
            <Checkbox
              id={`amenity-${amenity}`}
              checked={selectedAmenities.includes(amenity)}
              onCheckedChange={() => onAmenityToggle(amenity)}
            />
            <Label
              htmlFor={`amenity-${amenity}`}
              className="text-sm cursor-pointer"
            >
              {amenity}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};
