import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted px-6">
      <div className="text-center max-w-md">
        <h1 className="mb-2 text-6xl font-display font-bold text-foreground">404</h1>
        <p className="mb-6 text-lg text-muted-foreground">Oops! This page doesn't exist or has been moved.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/">
            <Button className="gap-2 w-full sm:w-auto">
              <Home size={16} /> Home
            </Button>
          </Link>
          <Link to="/contact">
            <Button variant="outline" className="gap-2 w-full sm:w-auto">
              <ArrowLeft size={16} /> Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
