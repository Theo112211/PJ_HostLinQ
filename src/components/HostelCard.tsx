
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, Globe, CircleCheck, CircleX, Circle } from "lucide-react";

export interface HostelProps {
  id: string;
  name: string;
  location: string;
  price: number;
  currency: string;
  availability?: "available" | "limited" | "unavailable";
  image: string;
  amenities: string[];
  phone?: string;
  email?: string;
  website?: string;
}

export function HostelCard({ hostel }: { hostel: HostelProps }) {
  // Add safety check for undefined hostel
  if (!hostel) {
    return (
      <div className="bg-card rounded-lg overflow-hidden border shadow-sm p-4 text-center">
        <p className="text-muted-foreground">Hostel information unavailable</p>
      </div>
    );
  }

  // Render availability indicator
  const renderAvailability = (availability: string = "available") => {
    switch (availability) {
      case "available":
        return (
          <div className="flex items-center bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-2 py-0.5 rounded">
            <CircleCheck size={16} className="mr-1" />
            <span className="text-sm font-medium">Available</span>
          </div>
        );
      case "limited":
        return (
          <div className="flex items-center bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 px-2 py-0.5 rounded">
            <Circle size={16} className="mr-1" />
            <span className="text-sm font-medium">Limited</span>
          </div>
        );
      case "unavailable":
        return (
          <div className="flex items-center bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 px-2 py-0.5 rounded">
            <CircleX size={16} className="mr-1" />
            <span className="text-sm font-medium">Unavailable</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-2 py-0.5 rounded">
            <CircleCheck size={16} className="mr-1" />
            <span className="text-sm font-medium">Available</span>
          </div>
        );
    }
  };

  // Ensure we have a default image if one isn't provided
  const imageUrl = hostel.image || "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";

  return (
    <div className="bg-card rounded-lg overflow-hidden border shadow-sm card-hover">
      <div className="relative h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={hostel.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <Badge className="bg-primary text-white">
            {hostel.currency === 'USD' ? '$' : hostel.currency === 'GHS' ? '₵' : hostel.currency} {hostel.price}
          </Badge>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold line-clamp-1">{hostel.name}</h3>
          {renderAvailability(hostel.availability)}
        </div>
        <p className="text-muted-foreground text-sm mt-1">{hostel.location}</p>

        <div className="mt-3 flex flex-wrap gap-1">
          {hostel.amenities.slice(0, 3).map((amenity, index) => (
            <Badge key={index} variant="outline" className="bg-accent/50 text-accent-foreground text-xs">
              {amenity}
            </Badge>
          ))}
          {hostel.amenities.length > 3 && (
            <Badge variant="outline" className="bg-accent/50 text-accent-foreground text-xs">
              +{hostel.amenities.length - 3} more
            </Badge>
          )}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {hostel.phone && (
            <a 
              href={`tel:${hostel.phone}`}
              className="contact-button bg-primary/10 text-primary hover:bg-primary/20"
            >
              <Phone size={16} />
              <span className="text-sm">Call</span>
            </a>
          )}
          {hostel.email && (
            <a 
              href={`mailto:${hostel.email}`}
              className="contact-button bg-primary/10 text-primary hover:bg-primary/20"
            >
              <Mail size={16} />
              <span className="text-sm">Email</span>
            </a>
          )}
          {hostel.website && (
            <a 
              href={hostel.website}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-button bg-primary/10 text-primary hover:bg-primary/20"
            >
              <Globe size={16} />
              <span className="text-sm">Website</span>
            </a>
          )}
        </div>

        <div className="mt-4 flex justify-between items-center">
          <Link to={`/hostel/${hostel.id}`}>
            <Button variant="outline" className="text-primary border-primary hover:bg-primary hover:text-white">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
