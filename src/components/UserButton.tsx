
import { UserButton as ClerkUserButton, SignInButton, SignUpButton, useAuth } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

export const UserButton = () => {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <ClerkUserButton afterSignOutUrl="/" />;
  }

  return (
    <div className="flex items-center gap-2">
      <SignUpButton mode="modal">
        <Button variant="outline" size="sm">Sign Up</Button>
      </SignUpButton>
      <SignInButton mode="modal">
        <Button variant="default" className="bg-primary hover:bg-hostel-dark">
          <User size={18} className="mr-2" /> Sign In
        </Button>
      </SignInButton>
    </div>
  );
};
