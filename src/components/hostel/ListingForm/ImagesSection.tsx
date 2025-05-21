
import { ImageUpload } from "@/components/ImageUpload";
import { Label } from "@/components/ui/label";

interface ImagesSectionProps {
  onImageUpload: (type: string, files: File[]) => void;
  existingImages?: {
    exterior?: string[];
    commonArea?: string[];
    bedroom?: string[];
    bathroom?: string[];
  };
}

export const ImagesSection = ({
  onImageUpload,
  existingImages
}: ImagesSectionProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Hostel Images</h2>
      <p className="text-sm text-muted-foreground mb-2">
        Upload images of your hostel (JPEG, PNG, or WebP format, max 5MB each):
      </p>
      
      <div className="grid gap-6">
        <div>
          <Label className="mb-2 block">Exterior Images *</Label>
          <ImageUpload 
            onChange={(files) => onImageUpload('exterior', files)} 
            label="Upload exterior images" 
            maxFiles={3}
            existingImages={existingImages?.exterior || []}
          />
        </div>
        
        <div>
          <Label className="mb-2 block">Common Area Images *</Label>
          <ImageUpload 
            onChange={(files) => onImageUpload('commonArea', files)} 
            label="Upload common area images" 
            maxFiles={3}
            existingImages={existingImages?.commonArea || []}
          />
        </div>
        
        <div>
          <Label className="mb-2 block">Bedroom Images *</Label>
          <ImageUpload 
            onChange={(files) => onImageUpload('bedroom', files)} 
            label="Upload bedroom images" 
            maxFiles={3}
            existingImages={existingImages?.bedroom || []}
          />
        </div>
        
        <div>
          <Label className="mb-2 block">Bathroom Images *</Label>
          <ImageUpload 
            onChange={(files) => onImageUpload('bathroom', files)} 
            label="Upload bathroom images" 
            maxFiles={3}
            existingImages={existingImages?.bathroom || []}
          />
        </div>
      </div>
    </div>
  );
};
