
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/clerk-react";
import { BookmarkX } from "lucide-react";
import { HostelCard } from "@/components/HostelCard";
import { getHostels } from "@/services/hostelService";
import { motion } from "framer-motion";

// This is a placeholder since we don't have an actual saved hostels implementation yet
// In a real app, we would have a savedHostelsService to manage this functionality
const SavedHostels = () => {
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();
  const [savedHostels, setSavedHostels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // This is a mock implementation - in a real app, we would fetch only saved hostels
    const loadSavedHostels = async () => {
      if (!isSignedIn) return;
      
      try {
        setIsLoading(true);
        const allHostels = await getHostels();
        // Mock implementation: pretend some hostels are saved (in a real app, we would have a saved_hostels table)
        // This just takes the first 2 hostels as an example
        setSavedHostels(allHostels.slice(0, 2));
      } catch (error) {
        console.error("Error loading saved hostels:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadSavedHostels();
  }, [isSignedIn]);
  
  // Redirect to auth if not signed in
  if (!isSignedIn) {
    return (
      <Layout>
        <div className="container-custom py-12">
          <div className="max-w-md mx-auto bg-card p-8 rounded-lg shadow-sm border">
            <h1 className="text-2xl font-bold mb-4 text-center">Sign in Required</h1>
            <p className="text-muted-foreground mb-6 text-center">
              You need to sign in to view your saved hostels.
            </p>
            <div className="flex flex-col gap-4">
              <Button onClick={() => navigate("/auth?mode=sign-in")} className="w-full">
                Sign In
              </Button>
              <Button onClick={() => navigate("/auth?mode=sign-up")} variant="outline" className="w-full">
                Sign Up
              </Button>
              <Button onClick={() => navigate("/")} variant="ghost" className="w-full">
                Continue as Guest
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <motion.div 
        className="container-custom py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Saved Hostels</h1>
            <p className="text-muted-foreground">Your favorite places to stay</p>
          </div>
          <Button variant="outline" onClick={() => navigate("/search")}>
            Find More Hostels
          </Button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-64 rounded-lg bg-muted animate-pulse"></div>
            ))}
          </div>
        ) : savedHostels.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
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
            {savedHostels.map((hostel) => (
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
          <div className="text-center py-16 bg-muted/20 rounded-lg">
            <BookmarkX className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No saved hostels</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              You haven't saved any hostels yet. Browse our listings and save 
              your favorites for quick access later.
            </p>
            <Button onClick={() => navigate("/search")}>
              Find Hostels
            </Button>
          </div>
        )}
      </motion.div>
    </Layout>
  );
};

export default SavedHostels;
