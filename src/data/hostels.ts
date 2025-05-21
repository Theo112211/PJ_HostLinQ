
import { HostelProps } from "../components/HostelCard";

export const hostels: HostelProps[] = [
  {
    id: "1",
    name: "Backpackers Paradise",
    location: "Accra, Ghana",
    price: 150,
    currency: "GHS",
    availability: "available",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    amenities: ["Free WiFi", "Breakfast Included", "Kitchen", "Laundry", "Lockers"],
    phone: "+233545973939",
    email: "contact@backpackersparadise.com",
    website: "https://example.com/backpackersparadise"
  },
  {
    id: "2",
    name: "Urban Oasis Hostel",
    location: "Kumasi, Ghana",
    price: 200,
    currency: "GHS",
    availability: "limited",
    image: "https://images.unsplash.com/photo-1520277739336-7bf67edfa768?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    amenities: ["Free WiFi", "Private Rooms", "24/7 Reception", "Bar", "Tours"],
    phone: "+233209876543",
    email: "info@urbanoasis.com",
    website: "https://example.com/urbanoasis"
  },
  {
    id: "3",
    name: "Beachfront Bungalows",
    location: "Cape Coast, Ghana",
    price: 180,
    currency: "GHS",
    availability: "available",
    image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    amenities: ["Pool", "Free WiFi", "Breakfast Included", "Air Conditioning"],
    phone: "+233557654321",
    email: "stay@beachfrontbungalows.com",
    website: "https://example.com/beachfront"
  },
  {
    id: "4",
    name: "City Central Hostel",
    location: "Accra, Ghana",
    price: 130,
    currency: "GHS",
    availability: "unavailable",
    image: "https://images.unsplash.com/photo-1620332372374-f108c53d165a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    amenities: ["Free WiFi", "Kitchen", "Laundry", "24/7 Reception"],
    phone: "+233501234567",
    email: "booking@citycentral.com",
    website: "https://example.com/citycentral"
  },
  {
    id: "5",
    name: "Mountain View Lodge",
    location: "Aburi, Ghana",
    price: 220,
    currency: "GHS",
    availability: "available",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    amenities: ["Scenic Views", "Free WiFi", "Kitchen", "Bike Rental", "Outdoor Activities"],
    phone: "+233249876543",
    email: "info@mountainviewlodge.com",
    website: "https://example.com/mountainview"
  },
  {
    id: "6",
    name: "Nomad's Hub",
    location: "Tamale, Ghana",
    price: 120,
    currency: "GHS",
    availability: "limited",
    image: "https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    amenities: ["Free WiFi", "Breakfast Included", "Air Conditioning", "Rooftop Bar"],
    phone: "+233553456789",
    email: "hello@nomadshub.com",
    website: "https://example.com/nomadshub"
  }
];

export const getHostelById = (id: string) => {
  return hostels.find(hostel => hostel.id === id);
};
