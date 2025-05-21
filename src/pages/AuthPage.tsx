
import { SignIn, SignUp } from "@clerk/clerk-react";
import { useLocation } from "react-router-dom";
import { Layout } from "@/components/Layout";

const AuthPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const mode = searchParams.get("mode") || "sign-in";

  return (
    <Layout>
      <div className="container-custom py-12">
        <div className="flex flex-col items-center justify-center">
          <div className="w-full max-w-md">
            {mode === "sign-up" ? (
              <SignUp signInUrl="/auth?mode=sign-in" routing="path" path="/auth" />
            ) : (
              <SignIn signUpUrl="/auth?mode=sign-up" routing="path" path="/auth" />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AuthPage;
