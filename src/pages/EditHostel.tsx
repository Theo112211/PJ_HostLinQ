
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { getHostelById } from "@/services/hostelService";
import { HostelListingForm } from "@/components/hostel/ListingForm"; 
import { useAuth } from "@clerk/clerk-react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const EditHostel = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userId, isSignedIn } = useAuth();
  const { toast } = useToast();
  
  const [isLoading, setIsLoading] = useState(true);
  const [hostel, setHostel] = useState(null);
  const [hostelImages, setHostelImages] = useState(null);
  
  useEffect(() => {
    const loadHostel = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        const hostelData = await getHostelById(id);
        
        if (!hostelData) {
          toast({
            title: "Error",
            description: "Hostel not found",
            variant: "destructive"
          });
          navigate("/owner-dashboard");
          return;
        }
        
        setHostel(hostelData);
        
        // If the hostel has images, prepare them for the form
        if (hostelData.images) {
          setHostelImages(hostelData.images);
        }
      } catch (error) {
        console.error("Error loading hostel:", error);
        toast({
          title: "Error",
          description: "Failed to load hostel information",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadHostel();
  }, [id, navigate, toast]);
  
  // Redirect to auth if not signed in
  if (!isSignedIn) {
    return (
      <Layout>
        <div className="container-custom py-12">
          <div className="max-w-md mx-auto bg-card p-8 rounded-lg shadow-sm border">
            <h1 className="text-2xl font-bold mb-4 text-center">Sign in Required</h1>
            <p className="text-muted-foreground mb-6 text-center">
              You need to sign in to edit your hostel listing.
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
      <div className="container-custom py-8 max-w-4xl">
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={() => navigate("/owner-dashboard")}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold">Edit Hostel</h1>
          <p className="text-muted-foreground mt-1">
            Update your hostel listing information
          </p>
        </div>
        
        {isLoading ? (
          <div className="space-y-4">
            <div className="h-20 bg-muted rounded-md animate-pulse"></div>
            <div className="h-40 bg-muted rounded-md animate-pulse"></div>
            <div className="h-60 bg-muted rounded-md animate-pulse"></div>
          </div>
        ) : hostel ? (
          <HostelListingForm 
            initialData={{...hostel, existingImages: hostelImages}}
            isEditing={true}
            onSuccess={(hostelId) => {
              toast({
                title: "Success",
                description: "Hostel updated successfully",
              });
              navigate(`/hostel/${hostelId}`);
            }}
          />
        ) : (
          <div className="text-center py-12">
            <p>Hostel not found or you do not have permission to edit it.</p>
            <Button 
              onClick={() => navigate("/owner-dashboard")} 
              className="mt-4"
            >
              Return to Dashboard
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default EditHostel;
