
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { createHostel, updateHostel } from "@/services/hostelService";
import { BasicInfoSection } from "./BasicInfoSection";
import { ImagesSection } from "./ImagesSection";
import { AmenitiesSection } from "./AmenitiesSection";
import { ContactSection } from "./ContactSection";
import { motion } from "framer-motion";

interface FormData {
  name: string;
  location: string;
  address: string;
  postalCode: string;
  priceRange: [number, number];
  currency: string;
  maxCapacity: number;
  description: string;
  phone: string;
  email: string;
  website: string;
  amenities: string[];
  availability: "available" | "limited" | "unavailable";
  images: {
    exterior: File[] | null;
    commonArea: File[] | null;
    bedroom: File[] | null;
    bathroom: File[] | null;
  };
  existingImages?: {
    exterior?: string[];
    commonArea?: string[];
    bedroom?: string[];
    bathroom?: string[];
  };
}

interface HostelListingFormProps {
  initialData?: any; // Accept initial data for editing
  isEditing?: boolean; // Flag to determine if editing or creating
  onSuccess?: (hostelId: string) => void; // Callback for after successful submit
}

export const HostelListingForm = ({ 
  initialData, 
  isEditing = false, 
  onSuccess 
}: HostelListingFormProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { userId } = useAuth();
  
  const [formData, setFormData] = useState<FormData>({
    name: "",
    location: "",
    address: "",
    postalCode: "",
    priceRange: [10, 50],
    currency: "GHS", // Default to Ghana Cedi
    maxCapacity: 1,
    description: "",
    phone: "",
    email: "",
    website: "",
    amenities: [],
    availability: "available",
    images: {
      exterior: null,
      commonArea: null,
      bedroom: null,
      bathroom: null
    },
    existingImages: {}
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Load initial data when editing
  useEffect(() => {
    if (initialData && isEditing) {
      // Transform initial data to match form structure
      setFormData(prev => ({
        ...prev,
        name: initialData.name || "",
        location: initialData.location || "",
        address: initialData.address || "",
        postalCode: initialData.postalCode || "",
        priceRange: initialData.priceRange || [10, 50],
        currency: initialData.currency || "GHS", // Default to Ghana Cedi
        maxCapacity: initialData.maxCapacity || 1,
        description: initialData.description || "",
        phone: initialData.phone || "",
        email: initialData.email || "",
        website: initialData.website || "",
        amenities: initialData.amenities || [],
        availability: initialData.availability || "available",
        // Set existing images if available
        existingImages: initialData.images || {}
      }));
    }
  }, [initialData, isEditing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAmenityToggle = (amenity: string) => {
    setFormData(prev => {
      if (prev.amenities.includes(amenity)) {
        return {
          ...prev,
          amenities: prev.amenities.filter(item => item !== amenity)
        };
      } else {
        return {
          ...prev,
          amenities: [...prev.amenities, amenity]
        };
      }
    });
  };

  const handlePriceRangeChange = (value: number[]) => {
    setFormData(prev => ({ 
      ...prev, 
      priceRange: [value[0], value[1]] as [number, number]
    }));
  };

  const handleCurrencyChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      currency: value
    }));
  };
  
  const handleMaxCapacityChange = (value: number[]) => {
    setFormData(prev => ({
      ...prev,
      maxCapacity: value[0]
    }));
  };

  const handleAvailabilityChange = (value: "available" | "limited" | "unavailable") => {
    setFormData(prev => ({
      ...prev,
      availability: value
    }));
  };

  const handleImageUpload = (type: keyof FormData['images'], files: File[]) => {
    setFormData(prev => ({
      ...prev,
      images: {
        ...prev.images,
        [type]: files
      }
    }));
  };

  const validateForm = () => {
    const requiredFields = ['name', 'location', 'address', 'postalCode', 'description', 'email'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof FormData]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Missing information",
        description: `Please fill in the following fields: ${missingFields.join(', ')}`,
        variant: "destructive"
      });
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    if (!userId) {
      toast({
        title: "Authentication required",
        description: "You must be signed in to list a hostel.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      let result;
      
      if (isEditing && initialData?.id) {
        // Update existing hostel
        console.log("Updating hostel with id:", initialData.id);
        // Include existing images in the update
        const dataToUpdate = {
          ...formData,
          existingImages: formData.existingImages
        };
        result = await updateHostel(initialData.id, dataToUpdate, userId);
      } else {
        // Create new hostel
        console.log("Submitting hostel with userId:", userId);
        result = await createHostel(formData, userId);
      }
      
      if (result.success) {
        toast({
          title: isEditing ? "Hostel updated" : "Hostel listing created",
          description: isEditing ? 
            "Your hostel has been successfully updated." : 
            "Your hostel has been successfully listed."
        });
        
        // If we have a success callback, call it with the hostel ID
        if (onSuccess && result.hostelId) {
          onSuccess(result.hostelId);
        } else if (result.hostelId) {
          // Otherwise navigate to the hostel detail page
          navigate(`/hostel/${result.hostelId}`);
        } else {
          navigate("/");
        }
      } else {
        console.error("Error details:", result.error);
        
        // Improved error handling that works with both string and object error types
        let errorMessage: string;
        
        if (typeof result.error === 'string') {
          errorMessage = result.error;
        } else if (result.error && typeof result.error === 'object') {
          errorMessage = result.error.message || "Failed to save hostel listing";
        } else {
          errorMessage = "Unknown error occurred";
        }
        
        throw new Error(errorMessage);
      }
    } catch (error: any) {
      console.error(isEditing ? "Error updating hostel:" : "Error creating hostel:", error);
      toast({
        title: "Error",
        description: error.message || `Failed to ${isEditing ? 'update' : 'create'} hostel listing. Please try again.`,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <BasicInfoSection
        name={formData.name}
        location={formData.location}
        address={formData.address}
        postalCode={formData.postalCode}
        priceRange={formData.priceRange}
        currency={formData.currency}
        maxCapacity={formData.maxCapacity}
        description={formData.description}
        availability={formData.availability}
        onInputChange={handleChange}
        onPriceRangeChange={handlePriceRangeChange}
        onCurrencyChange={handleCurrencyChange}
        onMaxCapacityChange={handleMaxCapacityChange}
        onAvailabilityChange={handleAvailabilityChange}
      />

      <ImagesSection 
        onImageUpload={handleImageUpload}
        existingImages={formData.existingImages}
      />

      <AmenitiesSection
        selectedAmenities={formData.amenities}
        onAmenityToggle={handleAmenityToggle}
      />

      <ContactSection
        phone={formData.phone}
        email={formData.email}
        website={formData.website}
        onChange={handleChange}
      />
      
      <div className="pt-4">
        <Button 
          type="submit" 
          className="w-full bg-primary hover:bg-hostel-dark"
          disabled={isSubmitting}
        >
          {isSubmitting ? 
            (isEditing ? "Updating..." : "Submitting...") : 
            (isEditing ? "Update Hostel" : "List My Hostel")
          }
        </Button>
      </div>
    </motion.form>
  );
};
