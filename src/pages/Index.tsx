
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Search, MapPin, Star } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HostelCard } from "@/components/HostelCard";
import { getHostels } from "@/services/hostelService";

export default function Index() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [featuredHostels, setFeaturedHostels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadHostels = async () => {
      try {
        setIsLoading(true);
        const hostels = await getHostels();
        
        // Get up to 6 featured hostels for the homepage
        setFeaturedHostels(hostels.slice(0, 6));
      } catch (error) {
        console.error('Error loading hostels:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadHostels();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/10 to-background py-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Find the Perfect Hostel for Your Journey</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Discover affordable accommodations in top destinations worldwide
            </p>

            <form onSubmit={handleSearch} className="flex gap-2">
              <Input
                type="text"
                placeholder="Search by city or country..."
                className="flex-1"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" className="bg-primary hover:bg-hostel-dark">
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Featured Hostels */}
      <section className="py-12">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Featured Hostels</h2>
            <Button 
              variant="ghost" 
              className="gap-1" 
              onClick={() => navigate('/search')}
            >
              View All <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="bg-muted rounded-lg h-64 animate-pulse"></div>
              ))}
            </div>
          ) : featuredHostels.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {featuredHostels.map((hostel) => (
                <HostelCard key={hostel.id} hostel={hostel} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No hostels available yet</p>
              <Button onClick={() => navigate('/list-hostel')}>
                List Your Hostel
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 bg-muted/30">
        <div className="container-custom">
          <h2 className="text-2xl font-bold text-center mb-10">How HostLinQ Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-background rounded-lg p-6 text-center shadow-sm">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Find</h3>
              <p className="text-muted-foreground">
                Search for hostels based on location, price, and amenities to find your perfect match.
              </p>
            </div>
            
            <div className="bg-background rounded-lg p-6 text-center shadow-sm">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Compare</h3>
              <p className="text-muted-foreground">
                View detailed information, photos, and reviews to make an informed decision.
              </p>
            </div>
            
            <div className="bg-background rounded-lg p-6 text-center shadow-sm">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Stay</h3>
              <p className="text-muted-foreground">
                Book directly with the hostel and enjoy your stay in a carefully selected accommodation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA - List Your Hostel */}
      <section className="py-16 bg-gradient-to-b from-background to-primary/10">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Own a Hostel?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              List your property on HostelFinder and reach thousands of travelers looking for their next adventure.
            </p>
            <Button 
              className="bg-primary hover:bg-hostel-dark text-primary-foreground"
              size="lg"
              onClick={() => navigate('/list-hostel')}
            >
              List Your Hostel
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
