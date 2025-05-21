
import { ClerkProvider as BaseClerkProvider } from "@clerk/clerk-react";
import { ReactNode } from "react";

// The publishable key from Clerk dashboard
const CLERK_PUBLISHABLE_KEY = "pk_test_ZGVsaWNhdGUtc3RhZy02OC5jbGVyay5hY2NvdW50cy5kZXYk";

if (!CLERK_PUBLISHABLE_KEY) {
  console.error("Missing Clerk Publishable Key - Authentication features will not work properly");
}

export function ClerkProvider({ children }: { children: ReactNode }) {
  return (
    <BaseClerkProvider 
      publishableKey={CLERK_PUBLISHABLE_KEY}
      appearance={{
        elements: {
          formButtonPrimary: "bg-primary hover:bg-primary/90 text-primary-foreground",
          card: "bg-background border border-border shadow-sm",
          headerTitle: "text-foreground text-xl font-semibold",
          headerSubtitle: "text-muted-foreground",
          socialButtonsBlockButton: "border border-border bg-background text-foreground hover:bg-muted",
          footerActionLink: "text-primary hover:text-primary/90"
        }
      }}
    >
      {children}
    </BaseClerkProvider>
  );
}
