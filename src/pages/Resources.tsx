
import { Layout } from "@/components/Layout";
import { Info } from "lucide-react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

const Resources = () => {
  // Animation variants for page elements
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <Layout>
      <div className="container-custom py-12">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants}>
            <h1 className="text-4xl font-bold mb-2">Resources</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Helpful guides, tools, and information for Ghanaian travelers and hostel owners
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="grid gap-8 mt-8">
            <Card className="p-6 shadow-md">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Info className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold mb-3">For Travelers</h2>
                  <div className="grid gap-4">
                    <div>
                      <h3 className="font-medium text-lg mb-2">Ghana Travel Essentials</h3>
                      <p className="text-muted-foreground">
                        Our comprehensive guide on what to pack for your hostel stay in Ghana, 
                        including essential items for different regions and seasons in Ghana.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium text-lg mb-2">Safety Tips in Ghana</h3>
                      <p className="text-muted-foreground">
                        Stay safe during your travels with our expert safety tips for 
                        hostel stays across Ghana, including local customs, emergency contacts,
                        and information on how to navigate transportation safely.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium text-lg mb-2">Budget Travel in Ghana</h3>
                      <p className="text-muted-foreground">
                        Learn how to make the most of your cedi with our 
                        money-saving tips, affordable dining options at local chop bars, and free 
                        activity suggestions across major Ghanaian cities.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 shadow-md">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Info className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold mb-3">For Hostel Owners</h2>
                  <div className="grid gap-4">
                    <div>
                      <h3 className="font-medium text-lg mb-2">Marketing Your Ghanaian Hostel</h3>
                      <p className="text-muted-foreground">
                        Effective strategies to increase your hostel's visibility in the Ghanaian market, 
                        attract both local and international guests, and leverage social media platforms 
                        popular in Ghana.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium text-lg mb-2">Ghana Tourism Board Compliance</h3>
                      <p className="text-muted-foreground">
                        Learn about the regulations and standards required by the Ghana Tourism Authority,
                        how to obtain and maintain proper licensing, and best practices for legal compliance.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium text-lg mb-2">Sustainable Practices for Ghanaian Hostels</h3>
                      <p className="text-muted-foreground">
                        Implement eco-friendly initiatives in your hostel that not only 
                        help the environment but also reduce costs and appeal to the growing number of 
                        environmentally conscious travelers visiting Ghana.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 shadow-md">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Info className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold mb-3">Ghana Destination Guides</h2>
                  <p className="text-muted-foreground mb-4">
                    Explore our curated guides to popular destinations across Ghana, 
                    featuring local insights, hidden gems, and practical information.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-muted/40 p-4 rounded-md">
                      <h3 className="font-medium mb-2">Greater Accra</h3>
                      <ul className="list-disc list-inside text-sm text-muted-foreground">
                        <li>Accra City Center</li>
                        <li>Labadi Beach</li>
                        <li>Jamestown</li>
                        <li>Osu Castle</li>
                      </ul>
                    </div>
                    <div className="bg-muted/40 p-4 rounded-md">
                      <h3 className="font-medium mb-2">Central & Western</h3>
                      <ul className="list-disc list-inside text-sm text-muted-foreground">
                        <li>Cape Coast Castle</li>
                        <li>Kakum National Park</li>
                        <li>Elmina</li>
                        <li>Busua Beach</li>
                      </ul>
                    </div>
                    <div className="bg-muted/40 p-4 rounded-md">
                      <h3 className="font-medium mb-2">Ashanti & North</h3>
                      <ul className="list-disc list-inside text-sm text-muted-foreground">
                        <li>Kumasi Central Market</li>
                        <li>Manhyia Palace</li>
                        <li>Mole National Park</li>
                        <li>Larabanga Mosque</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Resources;
