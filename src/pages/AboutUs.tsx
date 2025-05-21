
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const AboutUs = () => {
  const navigate = useNavigate();
  
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  return (
    <Layout>
      <div className="container-custom">
        {/* Hero Section */}
        <motion.section 
          className="py-16 text-center"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.3
              }
            }
          }}
        >
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-6"
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
          >
            About HostelFinder
          </motion.h1>
          
          <motion.p 
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Connecting travelers with unique hostels across Ghana and beyond since 2023
          </motion.p>
        </motion.section>
        
        {/* Mission Section */}
        <motion.section 
          className="py-16 bg-muted/30 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg mb-8">
              HostelFinder was created with a simple vision: to make it easier for travelers to find
              affordable, community-focused accommodations in Ghana and beyond. We believe that
              hostels offer more than just a place to sleep—they provide opportunities for meaningful
              connections with fellow travelers and local cultures.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div 
                className="p-6 bg-background rounded-lg shadow-sm"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-xl font-semibold mb-3">Connect</h3>
                <p>
                  We connect travelers with unique hostels in Ghana that match their preferences and budget.
                </p>
              </motion.div>
              <motion.div 
                className="p-6 bg-background rounded-lg shadow-sm"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-xl font-semibold mb-3">Discover</h3>
                <p>
                  We help travelers discover hidden gems and authentic local experiences throughout Ghana.
                </p>
              </motion.div>
              <motion.div 
                className="p-6 bg-background rounded-lg shadow-sm"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-xl font-semibold mb-3">Support</h3>
                <p>
                  We support Ghanaian hostel owners by giving them a platform to showcase their unique properties.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.section>
        
        {/* Team Section */}
        <motion.section 
          className="py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-10 text-center">Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Theophilus, Appiah Boadi",
                  role: "Founder & CEO",
                  bio: "Tech enthusiast passionate about creating accessible travel options for all Ghanaians.",
                  image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
                  contact: {
                    email: "appiahboadi112211@gmail.com",
                    phone: "+233 545 973 939"
                  }
                },
                {
                  name: "Ellis, Botwe Asante",
                  role: "Chief Technology Officer",
                  bio: "Software engineer with a passion for creating user-friendly travel technology for the Ghanaian market.",
                  image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop"
                },
                {
                  name: "Paul, Aganakurigo",
                  role: "Head of Partnerships",
                  bio: "Experienced in hospitality management with deep connections across Ghana's tourism industry.",
                  image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
                }
              ].map((member, index) => (
                <motion.div 
                  key={index}
                  className="flex flex-col items-center text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                  <p className="text-primary font-medium text-sm mb-2">{member.role}</p>
                  <p className="text-muted-foreground text-sm mb-2">{member.bio}</p>
                  {member.contact && (
                    <div className="text-xs text-muted-foreground">
                      <p className="mb-1">Email: {member.contact.email}</p>
                      <p>Phone: {member.contact.phone}</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
        
        {/* Story Section */}
        <motion.section 
          className="py-16 bg-muted/30 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-6 text-center">Our Story</h2>
            <div className="prose dark:prose-invert max-w-none">
              <p>
                HostelFinder began in 2023 when our founder, Theophilus, recognized the need for a platform that could connect 
                budget-conscious travelers with quality accommodations across Ghana. Despite the growth of tourism in the 
                country, there was no dedicated service focusing on hostels and affordable lodging.
              </p>
              <p>
                After conducting extensive research on the local hospitality industry, Theophilus assembled a team of fellow 
                tech enthusiasts and travel lovers who shared his vision. Together, they created HostelFinder with an initial 
                focus on major Ghanaian cities like Accra, Kumasi, Cape Coast, and Tamale.
              </p>
              <p>
                Today, HostelFinder connects thousands of travelers with hostels across Ghana and is expanding to other 
                countries in West Africa. We remain committed to our core values of affordability, community, and promoting 
                authentic Ghanaian hospitality.
              </p>
              <p>
                As we continue to grow, we're expanding our network of hostel partners and enhancing our platform with features
                designed to make hostel discovery and booking even easier for travelers throughout Ghana and beyond.
              </p>
            </div>
          </div>
        </motion.section>
        
        {/* Values Section */}
        <motion.section 
          className="py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-10 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: "Ghanaian Hospitality",
                  description: "We celebrate and promote the uniquely warm and welcoming spirit of Ghanaian hospitality in all the accommodations we feature."
                },
                {
                  title: "Authenticity",
                  description: "We showcase hostels that offer authentic experiences and connections to local Ghanaian culture, rather than generic, one-size-fits-all accommodations."
                },
                {
                  title: "Accessibility",
                  description: "We're committed to making travel in Ghana accessible to everyone by highlighting affordable options that don't compromise on experience or safety."
                },
                {
                  title: "Community Development",
                  description: "We support hostels that contribute positively to their local communities and promote sustainable tourism practices throughout Ghana."
                }
              ].map((value, index) => (
                <motion.div 
                  key={index}
                  className="p-6 border rounded-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  whileHover={{ scale: 1.02 }}
                >
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
        
        {/* CTA Section */}
        <motion.section 
          className="py-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          <div className="max-w-2xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-6">Join Our Community</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Whether you're a traveler looking for affordable accommodation in Ghana or a hostel owner wanting to reach more guests,
              HostelFinder is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => navigate("/search")}>
                Find Hostels
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate("/list-hostel")}>
                List Your Property
              </Button>
            </div>
          </div>
        </motion.section>
      </div>
    </Layout>
  );
};

export default AboutUs;
