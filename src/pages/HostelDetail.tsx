import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "../components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getHostelById } from "@/services/hostelService";
import { Phone, Mail, Globe, MapPin, Calendar, Copy, Info, Loader2, Heart } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { ImageCarousel } from "@/components/ImageCarousel";

const HostelDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [hostel, setHostel] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchHostelDetails = async () => {
      try {
        setLoading(true);
        const data = await getHostelById(id || "");
        setHostel(data);
        if (!data) {
          setError("Hostel not found");
        }
      } catch (err) {
        console.error("Error fetching hostel details:", err);
        setError("Failed to load hostel details");
      } finally {
        setLoading(false);
      }
    };
    
    fetchHostelDetails();
  }, [id]);
  
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        toast({
          title: "Copied!",
          description: `${label} copied to clipboard`,
          duration: 2000,
        });
      })
      .catch(() => {
        toast({
          title: "Failed to copy",
          description: "Please try again",
          variant: "destructive",
        });
      });
  };
  
  // Format address for copying
  const formatFullAddress = () => {
    if (!hostel) return "";
    return `${hostel.address}, ${hostel.postal_code}, ${hostel.location}`;
  };
  
  // Format price range based on period
  const formatPriceRange = () => {
    if (!hostel) return "";
    const { price_min, price_max, currency, price_period = "daily" } = hostel;
    
    let period = "";
    switch (price_period) {
      case "monthly": period = "/month"; break;
      case "yearly": period = "/year"; break;
      default: period = "/day";
    }
    
    if (price_min === price_max) {
      return `${currency} ${price_min}${period}`;
    }
    return `${currency} ${price_min} - ${price_max}${period}`;
  };

  if (loading) {
    return (
      <Layout>
        <div className="container-custom py-12 flex flex-col items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin mb-4" />
          <p className="text-muted-foreground">Loading hostel details...</p>
        </div>
      </Layout>
    );
  }

  if (error || !hostel) {
    return (
      <Layout>
        <motion.div 
          className="container-custom py-12 min-h-[60vh] flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted/30 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center max-w-md mx-auto">
            <h2 className="text-3xl font-bold mb-4">Hostel not found</h2>
            <p className="mb-6 text-muted-foreground">The hostel you are looking for does not exist or has been removed.</p>
            <Button 
              onClick={() => navigate("/search")}
              className="bg-primary hover:bg-primary/90"
            >
              Back to Search
            </Button>
          </div>
        </motion.div>
      </Layout>
    );
  }

  return (
    <Layout>
      <motion.div 
        className="container-custom py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <Button 
          variant="outline" 
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          Back
        </Button>

        <div className="bg-card rounded-lg overflow-hidden border shadow-sm">
          {/* Hostel images */}
          <div className="relative">
            {hostel.images && Object.values(hostel.images).some(arr => (arr as string[]).length > 0) ? (
              <ImageCarousel images={hostel.images} />
            ) : (
              <div className="h-80">
                <img 
                  src={hostel.image || "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"} 
                  alt={hostel.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="absolute top-4 right-4 flex gap-2">
              <Badge className="bg-primary text-white">
                {formatPriceRange()}
              </Badge>
              <div className="flex items-center bg-card/95 px-2 py-0.5 rounded shadow-sm">
                <span className="text-sm font-medium">{hostel.availability}</span>
              </div>
            </div>
          </div>

          {/* Hostel details */}
          <div className="p-6">
            <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">{hostel.name}</h1>
                <div className="flex items-center text-muted-foreground">
                  <MapPin size={16} className="mr-1" /> 
                  <span className="mr-2">{hostel.location}</span>
                  <button 
                    onClick={() => copyToClipboard(formatFullAddress(), "Address")}
                    className="p-1 hover:bg-muted rounded-full"
                    title="Copy full address"
                  >
                    <Copy size={14} />
                  </button>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Heart size={16} />
                  <span>Save</span>
                </Button>
                <Button 
                  className="bg-primary hover:bg-primary/90 flex items-center gap-2 whitespace-nowrap"
                  size="sm"
                >
                  <Calendar size={16} />
                  <span>Check Availability</span>
                </Button>
              </div>
            </div>

            <Tabs defaultValue="details" className="mt-6">
              <TabsList className="mb-6">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="amenities">Amenities</TabsTrigger>
                <TabsTrigger value="location">Location</TabsTrigger>
                <TabsTrigger value="contact">Contact</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold mb-4">About this hostel</h2>
                  <p className="text-muted-foreground">{hostel.description}</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                  <div className="bg-muted/30 p-4 rounded-lg border">
                    <h3 className="text-sm font-medium mb-2">Price Range</h3>
                    <p className="text-lg font-semibold">{formatPriceRange()}</p>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-lg border">
                    <h3 className="text-sm font-medium mb-2">Maximum Capacity</h3>
                    <p className="text-lg font-semibold">{hostel.max_capacity} people</p>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-lg border">
                    <h3 className="text-sm font-medium mb-2">Availability</h3>
                    <div className="flex items-center">
                      <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                        hostel.availability === 'available' 
                          ? 'bg-green-500' 
                          : hostel.availability === 'limited' 
                            ? 'bg-yellow-500' 
                            : 'bg-red-500'
                      }`}></span>
                      <p className="font-medium capitalize">{hostel.availability}</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="amenities">
                <h2 className="text-xl font-semibold mb-4">Amenities</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {hostel.amenities && hostel.amenities.map((amenity: string, index: number) => (
                    <div key={index} className="flex items-center p-3 bg-muted/30 rounded-lg border">
                      <span className="w-2 h-2 rounded-full bg-primary mr-3"></span>
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="location">
                <h2 className="text-xl font-semibold mb-4">Location</h2>
                <div className="bg-muted/30 p-4 rounded-lg border mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">Full Address</h3>
                    <button 
                      onClick={() => copyToClipboard(formatFullAddress(), "Address")}
                      className="text-primary hover:text-primary/80 flex items-center"
                    >
                      <Copy size={14} className="mr-1" /> Copy
                    </button>
                  </div>
                  <p className="text-muted-foreground">{formatFullAddress()}</p>
                </div>
                <p className="mb-2">
                  Our hostel is situated in a prime location in {hostel.location}, 
                  providing easy access to popular attractions, public transportation, 
                  restaurants, and nightlife.
                </p>
              </TabsContent>
              
              <TabsContent value="contact">
                <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {hostel.phone && (
                    <div className="bg-card p-4 rounded-lg border">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">Phone</h3>
                        <button 
                          onClick={() => copyToClipboard(hostel.phone, "Phone number")}
                          className="text-primary hover:text-primary/80 flex items-center"
                        >
                          <Copy size={14} className="mr-1" /> Copy
                        </button>
                      </div>
                      <a 
                        href={`tel:${hostel.phone}`}
                        className="flex items-center text-muted-foreground hover:text-foreground"
                      >
                        <Phone size={16} className="mr-2" />
                        <span>{hostel.phone}</span>
                      </a>
                    </div>
                  )}
                  
                  {hostel.email && (
                    <div className="bg-card p-4 rounded-lg border">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">Email</h3>
                        <button 
                          onClick={() => copyToClipboard(hostel.email, "Email")}
                          className="text-primary hover:text-primary/80 flex items-center"
                        >
                          <Copy size={14} className="mr-1" /> Copy
                        </button>
                      </div>
                      <a 
                        href={`mailto:${hostel.email}`}
                        className="flex items-center text-muted-foreground hover:text-foreground"
                      >
                        <Mail size={16} className="mr-2" />
                        <span>{hostel.email}</span>
                      </a>
                    </div>
                  )}
                  
                  {hostel.website && (
                    <div className="bg-card p-4 rounded-lg border">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">Website</h3>
                        <button 
                          onClick={() => copyToClipboard(hostel.website, "Website URL")}
                          className="text-primary hover:text-primary/80 flex items-center"
                        >
                          <Copy size={14} className="mr-1" /> Copy
                        </button>
                      </div>
                      <a 
                        href={hostel.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-muted-foreground hover:text-foreground"
                      >
                        <Globe size={16} className="mr-2" />
                        <span className="truncate">{hostel.website}</span>
                      </a>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
};

export default HostelDetail;
