
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from "framer-motion";

const Documentation = () => {
  const [activeTab, setActiveTab] = useState("user");
  
  return (
    <Layout>
      <motion.div 
        className="container-custom py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-5xl mx-auto">
          <motion.h1 
            className="text-4xl font-bold mb-6"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            HostLinQ Documentation
          </motion.h1>
          
          <Tabs defaultValue="user" value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="user">User Guide</TabsTrigger>
              <TabsTrigger value="hostel-owner">Hostel Owner Guide</TabsTrigger>
              <TabsTrigger value="developer">Developer Documentation</TabsTrigger>
            </TabsList>
            
            {/* User Guide Tab */}
            <TabsContent value="user" className="space-y-8">
              <section className="prose dark:prose-invert max-w-none">
                <h2 className="text-2xl font-semibold">Introduction for Travelers</h2>
                <p>
                  HostelFinder makes it easy to find and book the perfect hostel for your travels.
                  This guide will help you navigate the platform and make the most of your experience.
                </p>
              </section>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="finding-hostels">
                  <AccordionTrigger className="text-xl font-medium">Finding Hostels</AccordionTrigger>
                  <AccordionContent className="prose dark:prose-invert max-w-none">
                    <p>
                      Use our search and filtering tools to find hostels that match your needs:
                    </p>
                    <ul className="list-disc pl-6">
                      <li><strong>Search by location</strong> - Enter a city, country, or region</li>
                      <li><strong>Filter by price range</strong> - Set minimum and maximum price</li>
                      <li><strong>Filter by amenities</strong> - Select facilities like free WiFi, kitchen, etc.</li>
                      <li><strong>Filter by availability</strong> - Choose between available, limited, or unavailable properties</li>
                    </ul>
                    <p>
                      Search results will show key information like price, location, and a preview image to help you quickly compare options.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="viewing-details">
                  <AccordionTrigger className="text-xl font-medium">Viewing Hostel Details</AccordionTrigger>
                  <AccordionContent className="prose dark:prose-invert max-w-none">
                    <p>
                      Click on any hostel card to view detailed information, including:
                    </p>
                    <ul className="list-disc pl-6">
                      <li>Comprehensive description and overview</li>
                      <li>Photo gallery showing exterior, common areas, bedrooms, and bathrooms</li>
                      <li>Complete list of available amenities</li>
                      <li>Detailed price information including price ranges and currency</li>
                      <li>Exact location with address information</li>
                      <li>Contact details to reach the hostel directly</li>
                    </ul>
                    <p>
                      Use this detailed information to make an informed decision about your stay.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="user-accounts">
                  <AccordionTrigger className="text-xl font-medium">User Accounts & Authentication</AccordionTrigger>
                  <AccordionContent className="prose dark:prose-invert max-w-none">
                    <p>
                      While you can browse hostels as a guest, creating an account offers additional benefits:
                    </p>
                    <ul className="list-disc pl-6">
                      <li>Save favorite hostels for later reference</li>
                      <li>Write reviews about places you've stayed</li>
                      <li>Message hostel owners directly</li>
                      <li>List your own hostel if you're a property owner</li>
                    </ul>
                    <p>
                      To create an account, click "Sign Up" in the navigation menu and follow the prompts to register.
                      You can sign up using email/password or continue with social providers.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>
            
            {/* Hostel Owner Guide Tab */}
            <TabsContent value="hostel-owner" className="space-y-8">
              <section className="prose dark:prose-invert max-w-none">
                <h2 className="text-2xl font-semibold">Guide for Hostel Owners</h2>
                <p>
                  HostelFinder provides a platform for hostel owners to showcase their properties
                  to travelers worldwide. This guide will help you create and manage your listings.
                </p>
              </section>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="listing-process">
                  <AccordionTrigger className="text-xl font-medium">Listing Your Hostel</AccordionTrigger>
                  <AccordionContent className="prose dark:prose-invert max-w-none">
                    <p>
                      To add your property to HostelFinder:
                    </p>
                    <ol className="list-decimal pl-6">
                      <li>Create or sign in to your account</li>
                      <li>Click "List Your Hostel" in the navigation menu</li>
                      <li>Complete the comprehensive listing form with your hostel details</li>
                      <li>Upload high-quality photos of your property</li>
                      <li>Review your listing information and submit</li>
                    </ol>
                    <p>
                      Your listing will be immediately available to travelers searching for accommodations in your area.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="hostel-information">
                  <AccordionTrigger className="text-xl font-medium">Required Information</AccordionTrigger>
                  <AccordionContent className="prose dark:prose-invert max-w-none">
                    <p>
                      When creating a listing, you'll need to provide:
                    </p>
                    <ul className="list-disc pl-6">
                      <li><strong>Basic Information:</strong> Name, location, address, postal code, description</li>
                      <li><strong>Pricing:</strong> Price range and currency</li>
                      <li><strong>Capacity:</strong> Maximum number of guests</li>
                      <li><strong>Amenities:</strong> Available facilities and services (WiFi, breakfast, etc.)</li>
                      <li><strong>Photos:</strong> Images of exterior, common areas, bedrooms, and bathrooms</li>
                      <li><strong>Contact Information:</strong> Email, phone number, website</li>
                      <li><strong>Availability Status:</strong> Available, limited availability, or unavailable</li>
                    </ul>
                    <p>
                      The more detailed and accurate your information, the more likely travelers are to book your hostel.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="owner-dashboard">
                  <AccordionTrigger className="text-xl font-medium">Managing Your Listing</AccordionTrigger>
                  <AccordionContent className="prose dark:prose-invert max-w-none">
                    <p>
                      After creating your listing, you can manage it through the Owner Dashboard:
                    </p>
                    <ul className="list-disc pl-6">
                      <li>Update property information and photos anytime</li>
                      <li>Change availability status as needed</li>
                      <li>Respond to inquiries from potential guests</li>
                      <li>View analytics about your listing performance</li>
                      <li>Manage multiple properties from a single dashboard</li>
                    </ul>
                    <p>
                      Regular updates to your listing will help maintain its visibility in search results.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="best-practices">
                  <AccordionTrigger className="text-xl font-medium">Best Practices</AccordionTrigger>
                  <AccordionContent className="prose dark:prose-invert max-w-none">
                    <p>
                      To maximize the effectiveness of your listing:
                    </p>
                    <ul className="list-disc pl-6">
                      <li>Use high-quality, well-lit photos that accurately represent your property</li>
                      <li>Write detailed, honest descriptions that highlight unique features</li>
                      <li>Keep pricing information current and competitive</li>
                      <li>Respond promptly to inquiries</li>
                      <li>Update availability status regularly</li>
                      <li>Showcase what makes your hostel unique</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>
            
            {/* Developer Documentation Tab */}
            <TabsContent value="developer" className="space-y-8">
              <section className="prose dark:prose-invert max-w-none">
                <h2 className="text-2xl font-semibold">Developer Documentation</h2>
                <p>
                  This section provides technical documentation for developers working with the HostelFinder platform.
                  It includes architectural details, database schemas, API information, and implementation guides.
                </p>
              </section>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="architecture">
                  <AccordionTrigger className="text-xl font-medium">System Architecture</AccordionTrigger>
                  <AccordionContent className="prose dark:prose-invert max-w-none">
                    <h3>Technical Stack</h3>
                    <p>
                      HostelFinder is built using modern web technologies:
                    </p>
                    <ul className="list-disc pl-6">
                      <li><strong>Frontend:</strong> React with TypeScript, Vite build system</li>
                      <li><strong>Styling:</strong> Tailwind CSS with Shadcn UI components</li>
                      <li><strong>State Management:</strong> React Context and TanStack Query for remote data</li>
                      <li><strong>Routing:</strong> React Router (v6)</li>
                      <li><strong>Authentication:</strong> Clerk for user authentication and session management</li>
                      <li><strong>Backend:</strong> Supabase for database, storage, and serverless functions</li>
                      <li><strong>Image Storage:</strong> IPFS via Pinata for decentralized storage</li>
                      <li><strong>Animations:</strong> Framer Motion for UI animations</li>
                    </ul>
                    
                    <h3>Application Structure</h3>
                    <p>The application follows a modular structure:</p>
                    <ul className="list-disc pl-6">
                      <li><strong>components/</strong> - Reusable UI components</li>
                      <li><strong>pages/</strong> - Main application views</li>
                      <li><strong>services/</strong> - API and data access services</li>
                      <li><strong>hooks/</strong> - Custom React hooks</li>
                      <li><strong>utils/</strong> - Utility functions</li>
                      <li><strong>integrations/</strong> - Third-party service integrations</li>
                      <li><strong>lib/</strong> - Core library functions</li>
                    </ul>
                    
                    <h3>Authentication Flow</h3>
                    <p>
                      The application uses Clerk for authentication with the following flow:
                    </p>
                    <ol className="list-decimal pl-6">
                      <li>User initiates sign-in/sign-up process</li>
                      <li>Clerk handles the authentication process</li>
                      <li>Upon successful authentication, Clerk provides a token and user information</li>
                      <li>The token is used for authenticated requests to Supabase</li>
                      <li>The application maintains authentication state using React context</li>
                    </ol>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="database-schema">
                  <AccordionTrigger className="text-xl font-medium">Database Schema</AccordionTrigger>
                  <AccordionContent className="prose dark:prose-invert max-w-none">
                    <h3>Main Tables</h3>
                    <p>The database consists of several key tables:</p>
                    
                    <h4>hostels</h4>
                    <table className="min-w-full border-collapse">
                      <thead>
                        <tr>
                          <th className="border p-2 text-left">Column</th>
                          <th className="border p-2 text-left">Type</th>
                          <th className="border p-2 text-left">Description</th>
                        </tr>
                      </thead>
                      <tbody className="text-sm">
                        <tr>
                          <td className="border p-2">id</td>
                          <td className="border p-2">UUID</td>
                          <td className="border p-2">Primary key, automatically generated</td>
                        </tr>
                        <tr>
                          <td className="border p-2">user_id</td>
                          <td className="border p-2">UUID</td>
                          <td className="border p-2">Foreign key to the user who created the hostel</td>
                        </tr>
                        <tr>
                          <td className="border p-2">name</td>
                          <td className="border p-2">TEXT</td>
                          <td className="border p-2">Hostel name</td>
                        </tr>
                        <tr>
                          <td className="border p-2">location</td>
                          <td className="border p-2">TEXT</td>
                          <td className="border p-2">City/region where the hostel is located</td>
                        </tr>
                        <tr>
                          <td className="border p-2">address</td>
                          <td className="border p-2">TEXT</td>
                          <td className="border p-2">Street address</td>
                        </tr>
                        <tr>
                          <td className="border p-2">postal_code</td>
                          <td className="border p-2">TEXT</td>
                          <td className="border p-2">Postal/ZIP code</td>
                        </tr>
                        <tr>
                          <td className="border p-2">price_min</td>
                          <td className="border p-2">INTEGER</td>
                          <td className="border p-2">Minimum price</td>
                        </tr>
                        <tr>
                          <td className="border p-2">price_max</td>
                          <td className="border p-2">INTEGER</td>
                          <td className="border p-2">Maximum price</td>
                        </tr>
                        <tr>
                          <td className="border p-2">currency</td>
                          <td className="border p-2">TEXT</td>
                          <td className="border p-2">Currency code (e.g., USD)</td>
                        </tr>
                        <tr>
                          <td className="border p-2">max_capacity</td>
                          <td className="border p-2">INTEGER</td>
                          <td className="border p-2">Maximum guest capacity</td>
                        </tr>
                        <tr>
                          <td className="border p-2">description</td>
                          <td className="border p-2">TEXT</td>
                          <td className="border p-2">Detailed hostel description</td>
                        </tr>
                        <tr>
                          <td className="border p-2">amenities</td>
                          <td className="border p-2">TEXT[]</td>
                          <td className="border p-2">Array of available amenities</td>
                        </tr>
                        <tr>
                          <td className="border p-2">availability</td>
                          <td className="border p-2">TEXT</td>
                          <td className="border p-2">Status: 'available', 'limited', 'unavailable'</td>
                        </tr>
                        <tr>
                          <td className="border p-2">created_at</td>
                          <td className="border p-2">TIMESTAMP</td>
                          <td className="border p-2">Creation timestamp</td>
                        </tr>
                        <tr>
                          <td className="border p-2">updated_at</td>
                          <td className="border p-2">TIMESTAMP</td>
                          <td className="border p-2">Last update timestamp</td>
                        </tr>
                      </tbody>
                    </table>
                    
                    <h4 className="mt-4">hostel_images</h4>
                    <table className="min-w-full border-collapse">
                      <thead>
                        <tr>
                          <th className="border p-2 text-left">Column</th>
                          <th className="border p-2 text-left">Type</th>
                          <th className="border p-2 text-left">Description</th>
                        </tr>
                      </thead>
                      <tbody className="text-sm">
                        <tr>
                          <td className="border p-2">id</td>
                          <td className="border p-2">UUID</td>
                          <td className="border p-2">Primary key, automatically generated</td>
                        </tr>
                        <tr>
                          <td className="border p-2">hostel_id</td>
                          <td className="border p-2">UUID</td>
                          <td className="border p-2">Foreign key to the hostels table</td>
                        </tr>
                        <tr>
                          <td className="border p-2">image_url</td>
                          <td className="border p-2">TEXT</td>
                          <td className="border p-2">URL to the image (IPFS)</td>
                        </tr>
                        <tr>
                          <td className="border p-2">image_type</td>
                          <td className="border p-2">TEXT</td>
                          <td className="border p-2">Type: 'exterior', 'commonArea', 'bedroom', 'bathroom'</td>
                        </tr>
                        <tr>
                          <td className="border p-2">created_at</td>
                          <td className="border p-2">TIMESTAMP</td>
                          <td className="border p-2">Creation timestamp</td>
                        </tr>
                      </tbody>
                    </table>
                    
                    <h3 className="mt-4">Entity Relationship Diagram (ERD)</h3>
                    <p>
                      The database follows this relationship structure:
                    </p>
                    <pre className="bg-muted p-4 rounded-md overflow-x-auto">
{`
hostels:
  id (PK) ─┐
  user_id  │
  ...      │
           │
hostel_images:
  id (PK)  │
  hostel_id (FK) ─┘
  ...
`}
                    </pre>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="api-documentation">
                  <AccordionTrigger className="text-xl font-medium">API & Data Flow</AccordionTrigger>
                  <AccordionContent className="prose dark:prose-invert max-w-none">
                    <h3>Core Services</h3>
                    
                    <h4>hostelService</h4>
                    <p>The hostelService provides the following methods:</p>
                    <ul className="list-disc pl-6">
                      <li>
                        <strong>createHostel(formData, userId)</strong>
                        <p>Creates a new hostel listing with the provided data and uploads images to IPFS.</p>
                      </li>
                      <li>
                        <strong>getHostels()</strong>
                        <p>Retrieves all hostel listings with their associated images.</p>
                      </li>
                      <li>
                        <strong>getHostelById(id)</strong>
                        <p>Retrieves detailed information about a specific hostel by ID.</p>
                      </li>
                      <li>
                        <strong>getUserHostels(userId)</strong>
                        <p>Retrieves all hostels created by a specific user.</p>
                      </li>
                    </ul>
                    
                    <h4>Data Flow for Creating a Hostel</h4>
                    <ol className="list-decimal pl-6">
                      <li>User submits the hostel listing form</li>
                      <li>Form data is validated on the client-side</li>
                      <li>Images are uploaded to IPFS via Pinata</li>
                      <li>Hostel data is stored in the Supabase database</li>
                      <li>Image URLs and metadata are stored in the hostel_images table</li>
                      <li>User is redirected to the new hostel's detail page</li>
                    </ol>
                    
                    <h4>Data Flow for Browsing Hostels</h4>
                    <ol className="list-decimal pl-6">
                      <li>User visits the search page</li>
                      <li>Application fetches all hostels from Supabase</li>
                      <li>User applies filters (location, price, amenities, etc.)</li>
                      <li>Results are filtered on the client-side based on criteria</li>
                      <li>Filtered results are displayed as hostel cards</li>
                    </ol>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="implementation-notes">
                  <AccordionTrigger className="text-xl font-medium">Implementation Notes</AccordionTrigger>
                  <AccordionContent className="prose dark:prose-invert max-w-none">
                    <h3>Authentication Implementation</h3>
                    <p>
                      The application uses Clerk for authentication with the following features:
                    </p>
                    <ul className="list-disc pl-6">
                      <li>Email/password authentication</li>
                      <li>Social provider login</li>
                      <li>Guest browsing mode</li>
                      <li>Protected routes for authenticated users</li>
                      <li>Role-based access control for hostel owners</li>
                    </ul>
                    <p>
                      Authentication state is managed through Clerk's hooks and context providers.
                    </p>
                    
                    <h3>Image Handling</h3>
                    <p>
                      The application uses IPFS via Pinata for image storage, providing:
                    </p>
                    <ul className="list-disc pl-6">
                      <li>Decentralized, permanent storage</li>
                      <li>Content-addressed images that cannot be altered</li>
                      <li>Multiple image category support (exterior, rooms, etc.)</li>
                      <li>Client-side image validation and compression</li>
                    </ul>
                    <code className="block p-2 bg-muted rounded-md">
                      // Example image upload flow<br />
                      const urls = await uploadMultipleToPinata(files);<br />
                      // Store references in database<br />
                      await supabase.from(&apos;hostel_images&apos;).insert(&#123;...&#125;)
                    </code>
                    
                    <h3>Performance Optimizations</h3>
                    <ul className="list-disc pl-6">
                      <li>Client-side filtering to reduce server load</li>
                      <li>Lazy loading of images</li>
                      <li>Component-based architecture for better code splitting</li>
                      <li>Minimized re-renders using React.memo and useCallback</li>
                      <li>Optimistic UI updates for better user experience</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>
          </Tabs>
          
          <div className="mt-12 text-center">
            <p className="text-muted-foreground">
              Still have questions? Contact our support team at support@hostelfinder.com
            </p>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
};

export default Documentation;
