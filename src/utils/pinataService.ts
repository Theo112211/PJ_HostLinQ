
// Pinata IPFS service for image uploads

// Constants from credentials
const PINATA_API_KEY = "64b04bdd5ca680a3b171";
const PINATA_SECRET_KEY = "72e0f5bda78339c02c59172b25d6bdd450bba8d44cfa635cd7f31caf1106fc2f";
const PINATA_GATEWAY = "https://peach-legislative-bandicoot-367.mypinata.cloud";

/**
 * Uploads a file to Pinata IPFS
 * @param file The file to upload
 * @returns The IPFS CID or null if the upload failed
 */
export const uploadToPinata = async (file: File): Promise<string | null> => {
  try {
    // Create form data
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
      method: 'POST',
      headers: {
        'pinata_api_key': PINATA_API_KEY,
        'pinata_secret_api_key': PINATA_SECRET_KEY,
      },
      body: formData,
    });

    if (!response.ok) {
      console.error('Pinata upload failed:', await response.text());
      return null;
    }

    const data = await response.json();
    return `${PINATA_GATEWAY}/ipfs/${data.IpfsHash}`;
  } catch (error) {
    console.error('Error uploading to Pinata:', error);
    return null;
  }
};

/**
 * Uploads multiple files to Pinata IPFS
 * @param files Array of files to upload
 * @returns Array of IPFS URLs or empty array if uploads failed
 */
export const uploadMultipleToPinata = async (files: File[]): Promise<string[]> => {
  try {
    const uploadPromises = files.map(file => uploadToPinata(file));
    const results = await Promise.all(uploadPromises);
    return results.filter((url): url is string => url !== null);
  } catch (error) {
    console.error('Error uploading multiple files to Pinata:', error);
    return [];
  }
};
