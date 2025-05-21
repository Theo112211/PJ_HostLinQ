
import { Layout } from "../components/Layout";
import { SignedIn, SignedOut, useAuth } from "@clerk/clerk-react";
import { HostelListingForm } from "@/components/hostel/ListingForm";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const ListHostel = () => {
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();

  return (
    <Layout>
      <SignedIn>
        <div className="container-custom py-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">List Your Hostel</h1>
            <p className="text-muted-foreground mb-6">
              Complete the form below to add your hostel to our platform.
            </p>
            
            <div className="bg-card p-6 rounded-lg shadow-sm border">
              <HostelListingForm />
            </div>
          </div>
        </div>
      </SignedIn>
      <SignedOut>
        <div className="container-custom py-12">
          <div className="max-w-md mx-auto bg-card p-8 rounded-lg shadow-sm border">
            <h1 className="text-2xl font-bold mb-4 text-center">Sign in Required</h1>
            <p className="text-muted-foreground mb-6 text-center">
              You need to sign in to list your hostel on our platform.
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
      </SignedOut>
    </Layout>
  );
};

export default ListHostel;
