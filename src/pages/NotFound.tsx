import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import RouteHead from "@/components/RouteHead";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404: route not found:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <RouteHead
        override={{
          title: "Page not found | Otto Pay",
          description: "",
          robots: "noindex,nofollow",
          canonical_url: null,
        }}
      />
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="max-w-md text-center">
          <h1 className="mb-3 text-6xl font-bold text-primary">404</h1>
          <h2 className="mb-3 text-2xl font-semibold text-foreground">Page not found</h2>
          <p className="mb-6 text-muted-foreground">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Button asChild>
            <Link to="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default NotFound;
