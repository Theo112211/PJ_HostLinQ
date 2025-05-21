import { supabase } from "@/integrations/supabase/client";
import { uploadToPinata, uploadMultipleToPinata } from "@/utils/pinataService";
import { v4 as uuidv4 } from 'uuid';
import MD5 from 'crypto-js/md5';
import enc from 'crypto-js/enc-hex';

interface HostelFormData {
  name: string;
  location: string;
  address: string;
  postalCode: string;
  priceRange: [number, number];
  pricePeriod?: "daily" | "monthly" | "yearly";
  currency: string;
  maxCapacity: number;
  description: string;
  phone: string | null;
  email: string;
  website: string | null;
  amenities: string[];
  availability: "available" | "limited" | "unavailable";
  images: {
    exterior: File[] | null;
    commonArea: File[] | null;
    bedroom: File[] | null;
    bathroom: File[] | null;
  };
}

// Helper function to convert any user ID to a valid UUID
function convertToValidUuid(userId: string): string {
  // Check if already a valid UUID
  const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (uuidPattern.test(userId)) {
    return userId;
  }
  
  // If not a valid UUID, generate a deterministic UUID based on the input userId
  // This ensures the same clerk userId always maps to the same Supabase UUID
  const hash = MD5(userId).toString(enc);
  const generatedUuid = [
    hash.substring(0, 8),
    hash.substring(8, 12),
    hash.substring(12, 16),
    hash.substring(16, 20),
    hash.substring(20, 32)
  ].join('-');
  
  console.log(`Converting user ID "${userId}" to valid UUID: ${generatedUuid}`);
  return generatedUuid;
}

export async function createHostel(formData: HostelFormData, userId: string) {
  try {
    console.log("Creating hostel with userId:", userId);
    
    if (!userId) {
      console.error("No user ID provided");
      return { success: false, error: "No user ID provided" };
    }

    // Convert the userId to a valid UUID format
    const validUuid = convertToValidUuid(userId);
    console.log("Using converted UUID:", validUuid);

    // First, upload all images to Pinata IPFS
    const uploadImages = async () => {
      const imageUploads = [];
      
      // Process each image type
      for (const [type, files] of Object.entries(formData.images)) {
        if (files && files.length > 0) {
          try {
            console.log(`Uploading ${files.length} ${type} images to Pinata...`);
            const urls = await uploadMultipleToPinata(files);
            console.log(`Successfully uploaded ${type} images:`, urls);
            
            // Create entry for each uploaded image
            urls.forEach(url => {
              if (url) {
                imageUploads.push({
                  image_url: url,
                  image_type: type
                });
              }
            });
          } catch (imageError) {
            console.error(`Error uploading ${type} images:`, imageError);
          }
        }
      }
      
      return imageUploads;
    };

    // Upload all images first
    const uploadedImages = await uploadImages();
    console.log("Uploaded images:", uploadedImages);

    if (uploadedImages.length === 0) {
      console.warn("No images were uploaded, but continuing with hostel creation");
    }

    // Create the hostel entry
    const { data: hostel, error: hostelError } = await supabase
      .from('hostels')
      .insert({
        user_id: validUuid,
        name: formData.name,
        location: formData.location,
        address: formData.address,
        postal_code: formData.postalCode,
        price_min: formData.priceRange[0],
        price_max: formData.priceRange[1],
        currency: formData.currency,
        max_capacity: formData.maxCapacity,
        description: formData.description,
        phone: formData.phone || null,
        email: formData.email,
        website: formData.website || null,
        amenities: formData.amenities,
        availability: formData.availability
      })
      .select('id')
      .single();

    if (hostelError) {
      console.error('Error creating hostel:', hostelError);
      throw hostelError;
    }
    
    console.log("Created hostel:", hostel);
    
    if (uploadedImages.length > 0 && hostel) {
      // Insert all the image records linked to this hostel
      const { error: imagesError } = await supabase
        .from('hostel_images')
        .insert(
          uploadedImages.map(img => ({
            hostel_id: hostel.id,
            image_url: img.image_url,
            image_type: img.image_type
          }))
        );

      if (imagesError) {
        console.error('Error adding hostel images:', imagesError);
        // Continue even if images fail - the hostel is created
        console.warn('Hostel created but some images may not have been linked');
      } else {
        console.log('Successfully linked all images to hostel');
      }
    }

    return { success: true, hostelId: hostel?.id };
  } catch (error: any) {
    console.error('Error creating hostel:', error);
    return { 
      success: false, 
      error: {
        message: error.message || "Failed to create hostel listing",
        details: error.details || error.code || ""
      }
    };
  }
}

// New function to update an existing hostel
export async function updateHostel(hostelId: string, formData: HostelFormData, userId: string) {
  try {
    console.log("Updating hostel with id:", hostelId);
    
    if (!userId) {
      console.error("No user ID provided");
      return { success: false, error: "No user ID provided" };
    }

    // Convert the userId to a valid UUID format
    const validUuid = convertToValidUuid(userId);
    console.log("Using converted UUID for update:", validUuid);

    // Upload any new images to Pinata IPFS
    const uploadImages = async () => {
      const imageUploads = [];
      
      // Process each image type
      for (const [type, files] of Object.entries(formData.images)) {
        if (files && files.length > 0) {
          try {
            console.log(`Uploading ${files.length} ${type} images to Pinata...`);
            const urls = await uploadMultipleToPinata(files);
            console.log(`Successfully uploaded ${type} images:`, urls);
            
            // Create entry for each uploaded image
            urls.forEach(url => {
              if (url) {
                imageUploads.push({
                  image_url: url,
                  image_type: type
                });
              }
            });
          } catch (imageError) {
            console.error(`Error uploading ${type} images:`, imageError);
          }
        }
      }
      
      return imageUploads;
    };

    // Upload any new images first
    const uploadedImages = await uploadImages();
    console.log("Uploaded images for update:", uploadedImages);

    // Update the hostel entry
    const { data: hostel, error: hostelError } = await supabase
      .from('hostels')
      .update({
        name: formData.name,
        location: formData.location,
        address: formData.address,
        postal_code: formData.postalCode,
        price_min: formData.priceRange[0],
        price_max: formData.priceRange[1],
        currency: formData.currency,
        max_capacity: formData.maxCapacity,
        description: formData.description,
        phone: formData.phone || null,
        email: formData.email,
        website: formData.website || null,
        amenities: formData.amenities,
        availability: formData.availability,
        updated_at: new Date().toISOString()
      })
      .eq('id', hostelId)
      .eq('user_id', validUuid)  // Ensure only the owner can update
      .select('id')
      .single();

    if (hostelError) {
      console.error('Error updating hostel:', hostelError);
      throw hostelError;
    }
    
    console.log("Updated hostel:", hostel);
    
    if (uploadedImages.length > 0 && hostel) {
      // Insert all the new image records linked to this hostel
      const { error: imagesError } = await supabase
        .from('hostel_images')
        .insert(
          uploadedImages.map(img => ({
            hostel_id: hostel.id,
            image_url: img.image_url,
            image_type: img.image_type
          }))
        );

      if (imagesError) {
        console.error('Error adding hostel images during update:', imagesError);
        // Continue even if images fail - the hostel is updated
        console.warn('Hostel updated but some images may not have been linked');
      } else {
        console.log('Successfully linked all new images to updated hostel');
      }
    }

    return { success: true, hostelId: hostel?.id };
  } catch (error: any) {
    console.error('Error updating hostel:', error);
    return { 
      success: false, 
      error: {
        message: error.message || "Failed to update hostel listing",
        details: error.details || error.code || ""
      }
    };
  }
}

export async function getHostels() {
  try {
    const { data, error } = await supabase
      .from('hostels')
      .select(`
        *,
        hostel_images(image_url, image_type)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching hostels:', error);
      return [];
    }

    // Process the data to match the expected HostelProps format
    return data.map(hostel => {
      // Find an exterior image, or use the first available image
      const images = hostel.hostel_images || [];
      const exteriorImage = images.find(img => img.image_type === 'exterior')?.image_url || 
                          images[0]?.image_url || 
                          "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";

      return {
        id: hostel.id,
        name: hostel.name,
        location: hostel.location,
        price: hostel.price_min, // Use min price for display
        currency: hostel.currency,
        rating: hostel.rating || 0,
        image: exteriorImage,
        amenities: hostel.amenities,
        phone: hostel.phone,
        email: hostel.email,
        website: hostel.website,
        availability: hostel.availability
      };
    });
  } catch (error) {
    console.error('Unexpected error in getHostels:', error);
    return [];
  }
}

export async function getHostelById(id: string) {
  try {
    const { data, error } = await supabase
      .from('hostels')
      .select(`
        *,
        hostel_images(image_url, image_type)
      `)
      .eq('id', id)
      .maybeSingle();

    if (error) {
      console.error('Error fetching hostel details:', error);
      return null;
    }

    if (!data) {
      console.error('No hostel found with id:', id);
      return null;
    }

    // Process the hostel images by type
    const images = {
      exterior: data.hostel_images.filter(img => img.image_type === 'exterior').map(img => img.image_url),
      commonArea: data.hostel_images.filter(img => img.image_type === 'commonArea').map(img => img.image_url),
      bedroom: data.hostel_images.filter(img => img.image_type === 'bedroom').map(img => img.image_url),
      bathroom: data.hostel_images.filter(img => img.image_type === 'bathroom').map(img => img.image_url),
    };

    return {
      ...data,
      images,
      priceRange: [data.price_min, data.price_max],
    };
  } catch (error) {
    console.error('Unexpected error in getHostelById:', error);
    return null;
  }
}

export async function getUserHostels(userId: string) {
  if (!userId) return [];
  
  try {
    // Convert the userId to a valid UUID format
    const validUuid = convertToValidUuid(userId);
    console.log("Using converted UUID for fetching user hostels:", validUuid);
    
    const { data, error } = await supabase
      .from('hostels')
      .select(`
        *,
        hostel_images(image_url, image_type)
      `)
      .eq('user_id', validUuid)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching user hostels:', error);
      return [];
    }

    return data.map(hostel => {
      const images = hostel.hostel_images || [];
      const exteriorImage = images.find(img => img.image_type === 'exterior')?.image_url || 
                          images[0]?.image_url || 
                          "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";

      return {
        id: hostel.id,
        name: hostel.name,
        location: hostel.location,
        price: hostel.price_min,
        currency: hostel.currency,
        rating: hostel.rating || 0,
        image: exteriorImage,
        amenities: hostel.amenities,
        availability: hostel.availability,
        created_at: hostel.created_at
      };
    });
  } catch (error) {
    console.error('Unexpected error in getUserHostels:', error);
    return [];
  }
}

// New function to delete a hostel
export async function deleteHostel(id: string, userId: string) {
  try {
    const validUuid = convertToValidUuid(userId);
    
    // First delete associated images to avoid orphaned records
    const { error: imageError } = await supabase
      .from('hostel_images')
      .delete()
      .eq('hostel_id', id);
      
    if (imageError) {
      console.error('Error deleting hostel images:', imageError);
      return { success: false, error: imageError };
    }
    
    // Then delete the hostel record
    const { error: hostelError } = await supabase
      .from('hostels')
      .delete()
      .match({ id, user_id: validUuid });
      
    if (hostelError) {
      console.error('Error deleting hostel:', hostelError);
      return { success: false, error: hostelError };
    }
    
    return { success: true };
  } catch (error) {
    console.error('Unexpected error in deleteHostel:', error);
    return { success: false, error };
  }
}

// Function to get analytics data for hostels owned by a user
export async function getHostelAnalytics(userId: string) {
  if (!userId) return null;
  
  try {
    const validUuid = convertToValidUuid(userId);
    
    // Get user hostels
    const { data: hostels, error: hostelsError } = await supabase
      .from('hostels')
      .select('id, name, created_at')
      .eq('user_id', validUuid);
      
    if (hostelsError) {
      console.error('Error fetching hostels for analytics:', hostelsError);
      return null;
    }
    
    // Generate sample analytics data for demonstration
    // In a real app, this would come from actual user interactions data
    const analyticsData = {
      totalHostels: hostels.length,
      viewsByMonth: [
        { month: 'Jan', views: Math.floor(Math.random() * 100) },
        { month: 'Feb', views: Math.floor(Math.random() * 100) },
        { month: 'Mar', views: Math.floor(Math.random() * 100) },
        { month: 'Apr', views: Math.floor(Math.random() * 100) },
        { month: 'May', views: Math.floor(Math.random() * 100) },
        { month: 'Jun', views: Math.floor(Math.random() * 100) },
      ],
      hostelPerformance: hostels.map(hostel => ({
        id: hostel.id,
        name: hostel.name,
        views: Math.floor(Math.random() * 1000),
        inquiries: Math.floor(Math.random() * 50),
        createdAt: hostel.created_at,
      })),
      topPerformingLocation: hostels.length > 0 ? 'Accra' : null,
      conversionRate: Math.random() * 10,
    };
    
    return analyticsData;
  } catch (error) {
    console.error('Unexpected error in getHostelAnalytics:', error);
    return null;
  }
}
