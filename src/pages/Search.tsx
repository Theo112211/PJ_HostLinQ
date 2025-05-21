
import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { HostelCard } from "@/components/HostelCard";
import { SearchFilters } from "@/components/SearchFilters";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getHostels } from "@/services/hostelService";
import { Search as SearchIcon } from "lucide-react";
import { motion } from "framer-motion";

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("query") || "";
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [locationSearch, setLocationSearch] = useState("");
  const [hostels, setHostels] = useState([]);
  const [filteredHostels, setFilteredHostels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Filters
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [availability, setAvailability] = useState<string[]>(["available", "limited"]);
  
  const resultsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const loadHostels = async () => {
      try {
        setIsLoading(true);
        const data = await getHostels();
        setHostels(data);
        setFilteredHostels(data);
      } catch (error) {
        console.error('Error loading hostels:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadHostels();
  }, []);
  
  // Apply filters whenever they change or search query changes
  useEffect(() => {
    if (!hostels.length) return;
    
    let results = [...hostels];
    
    // Apply search query filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      results = results.filter(hostel => 
        hostel.name.toLowerCase().includes(query) || 
        hostel.location.toLowerCase().includes(query)
      );
    }
    
    // Apply location filter
    if (locationSearch.trim()) {
      const locationQuery = locationSearch.toLowerCase();
      results = results.filter(hostel => 
        hostel.location.toLowerCase().includes(locationQuery)
      );
    }
    
    // Apply price filter
    results = results.filter(hostel => 
      hostel.price >= priceRange[0] && hostel.price <= priceRange[1]
    );
    
    // Apply amenities filter
    if (selectedAmenities.length > 0) {
      results = results.filter(hostel => 
        selectedAmenities.every(amenity => 
          hostel.amenities.includes(amenity)
        )
      );
    }
    
    // Apply availability filter
    if (availability.length > 0 && availability.length < 3) {
      results = results.filter(hostel => 
        availability.includes(hostel.availability || 'available')
      );
    }
    
    setFilteredHostels(results);
  }, [searchQuery, locationSearch, priceRange, selectedAmenities, availability, hostels]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Update URL search params
    setSearchParams({ query: searchQuery });
    
    // Scroll to results
    if (resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <Layout>
      <div className="container-custom py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <motion.div 
            className="lg:w-1/4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-card p-6 rounded-lg shadow-sm border mb-6">
              <form onSubmit={handleSearch} className="flex gap-2 mb-6">
                <Input
                  type="text"
                  placeholder="Search hostels..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit">
                  <SearchIcon size={18} />
                </Button>
              </form>
              
              <SearchFilters 
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                selectedAmenities={selectedAmenities}
                setSelectedAmenities={setSelectedAmenities}
                availability={availability}
                setAvailability={setAvailability}
                locationSearch={locationSearch}
                setLocationSearch={setLocationSearch}
              />
            </div>
          </motion.div>
          
          {/* Results */}
          <div className="lg:w-3/4" ref={resultsRef}>
            <motion.h1 
              className="text-2xl font-bold mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {searchQuery ? `Search Results for "${searchQuery}"` : "All Hostels"}
              {locationSearch && ` in ${locationSearch}`}
            </motion.h1>
            
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="bg-muted rounded-lg h-64 animate-pulse"></div>
                ))}
              </div>
            ) : filteredHostels.length > 0 ? (
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                initial="hidden"
                animate="show"
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1
                    }
                  }
                }}
              >
                {filteredHostels.map((hostel) => (
                  <motion.div
                    key={hostel.id}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      show: { opacity: 1, y: 0 }
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    <HostelCard hostel={hostel} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                className="text-center py-12 bg-muted/20 rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-lg font-medium mb-2">No hostels found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your filters or search terms
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
