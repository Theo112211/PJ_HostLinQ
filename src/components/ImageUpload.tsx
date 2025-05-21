
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ImageIcon, X, Upload } from "lucide-react";

interface ImageUploadProps {
  onChange: (files: File[]) => void;
  label?: string;
  maxFiles?: number;
  existingImages?: string[];
}

export function ImageUpload({ 
  onChange, 
  label = "Upload images", 
  maxFiles = 3,
  existingImages = []
}: ImageUploadProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [existingUrls, setExistingUrls] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle existing images on component mount
  useEffect(() => {
    if (existingImages && existingImages.length > 0) {
      setExistingUrls(existingImages);
    }
  }, [existingImages]);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    if (files.length === 0) return;
    
    // Check if adding these files would exceed the maximum
    if (selectedFiles.length + existingUrls.length + files.length > maxFiles) {
      alert(`You can only have up to ${maxFiles} images in total`);
      return;
    }
    
    // Filter for image files only
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length === 0) {
      alert('Please select valid image files (JPEG, PNG, WebP)');
      return;
    }
    
    // Create preview URLs
    const newPreviewUrls = imageFiles.map(file => URL.createObjectURL(file));
    
    // Update state
    setSelectedFiles(prev => [...prev, ...imageFiles]);
    setPreviewUrls(prev => [...prev, ...newPreviewUrls]);
    
    // Call onChange prop
    onChange([...selectedFiles, ...imageFiles]);
    
    // Reset the input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const removeFile = (index: number) => {
    // Release the object URL to avoid memory leaks
    URL.revokeObjectURL(previewUrls[index]);
    
    // Remove the file and preview
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    const newPreviewUrls = previewUrls.filter((_, i) => i !== index);
    
    setSelectedFiles(newFiles);
    setPreviewUrls(newPreviewUrls);
    
    // Call onChange prop
    onChange(newFiles);
  };

  const removeExistingImage = (index: number) => {
    setExistingUrls(prev => prev.filter((_, i) => i !== index));
  };
  
  // Calculate total images (new + existing)
  const totalImages = selectedFiles.length + existingUrls.length;
  
  return (
    <div className="space-y-4">
      <input
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        multiple={maxFiles > 1}
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      
      <Button 
        type="button"
        variant="outline"
        onClick={() => fileInputRef.current?.click()}
        className="w-full h-20 border-dashed flex flex-col gap-2"
        disabled={totalImages >= maxFiles}
      >
        <Upload className="w-5 h-5" />
        <span>
          {label}
          {maxFiles > 1 && ` (${totalImages}/${maxFiles})`}
        </span>
      </Button>
      
      {existingUrls.length > 0 && (
        <>
          <h4 className="text-sm font-medium">Existing Images</h4>
          <div className="grid grid-cols-3 gap-2">
            {existingUrls.map((url, index) => (
              <div key={`existing-${url}-${index}`} className="relative group">
                <div className="aspect-square overflow-hidden rounded-md bg-secondary/20">
                  <img 
                    src={url} 
                    alt={`Existing ${index}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  type="button"
                  className="absolute top-1 right-1 bg-black/50 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeExistingImage(index)}
                  aria-label="Remove image"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            ))}
          </div>
        </>
      )}
      
      {previewUrls.length > 0 && (
        <>
          <h4 className="text-sm font-medium">New Images</h4>
          <div className="grid grid-cols-3 gap-2">
            {previewUrls.map((url, index) => (
              <div key={url} className="relative group">
                <div className="aspect-square overflow-hidden rounded-md bg-secondary/20">
                  <img 
                    src={url} 
                    alt={`Preview ${index}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  type="button"
                  className="absolute top-1 right-1 bg-black/50 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeFile(index)}
                  aria-label="Remove image"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            ))}
          </div>
        </>
      )}
      
      <p className="text-xs text-muted-foreground">
        Acceptable formats: JPEG, PNG, WebP. Max file size: 5MB.
      </p>
    </div>
  );
}
