
import { Layout } from "@/components/Layout";
import { Shield } from "lucide-react";
import { motion } from "framer-motion";

const PrivacyPolicy = () => {
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
          className="max-w-3xl mx-auto"
        >
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-8">
            <div className="bg-primary/10 p-3 rounded-full">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-3xl font-bold">Privacy Policy</h1>
          </motion.div>

          <motion.div variants={itemVariants} className="prose dark:prose-invert max-w-none">
            <p className="text-lg mb-6">
              Last updated: May 14, 2025
            </p>
            
            <p>
              HostelFinder ("we", "our", or "us") is committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
              when you visit our website and use our services.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">Information We Collect</h2>
            
            <h3 className="text-lg font-medium mt-6 mb-2">Personal Information</h3>
            <p>
              We may collect personal information that you provide to us, including but not limited to:
            </p>
            <ul className="list-disc pl-6 mt-2 mb-4 space-y-2">
              <li>Name, email address, and contact details</li>
              <li>Account login information</li>
              <li>Profile information</li>
              <li>Booking and reservation details</li>
              <li>Payment information</li>
              <li>Communications with us</li>
            </ul>

            <h3 className="text-lg font-medium mt-6 mb-2">Usage Information</h3>
            <p>
              We may also collect information about how you access and use our website:
            </p>
            <ul className="list-disc pl-6 mt-2 mb-4 space-y-2">
              <li>Log data and device information</li>
              <li>Cookies and tracking technologies</li>
              <li>Search queries and browsing history on our site</li>
              <li>User preferences and settings</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4">How We Use Your Information</h2>
            <p>We may use the information we collect for various purposes, including to:</p>
            <ul className="list-disc pl-6 mt-2 mb-6 space-y-2">
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and bookings</li>
              <li>Send you technical notices, updates, and administrative messages</li>
              <li>Respond to your comments, questions, and requests</li>
              <li>Provide customer support</li>
              <li>Communicate with you about products, services, offers, and events</li>
              <li>Monitor and analyze trends, usage, and activity</li>
              <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
              <li>Protect the rights and property of HostelFinder and others</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4">Sharing of Information</h2>
            <p>We may share your information in the following circumstances:</p>
            <ul className="list-disc pl-6 mt-2 mb-6 space-y-2">
              <li>With hostels and accommodation providers to facilitate your bookings</li>
              <li>With service providers who perform services on our behalf</li>
              <li>In response to legal process or when required by law</li>
              <li>To protect the safety, rights, or property of HostelFinder, our users, or the public</li>
              <li>In connection with a sale or transfer of business assets</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4">Your Rights and Choices</h2>
            <p>
              Depending on your location, you may have certain rights regarding your personal information, 
              including the right to:
            </p>
            <ul className="list-disc pl-6 mt-2 mb-6 space-y-2">
              <li>Access, correct, or delete your personal information</li>
              <li>Object to or restrict certain processing</li>
              <li>Data portability</li>
              <li>Withdraw consent at any time</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p className="mt-2">
              Email: privacy@hostelfinder.com<br />
              Address: 123 Traveler Lane, Global City, 10001
            </p>
          </motion.div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
