
import { Button } from "@/components/ui/button";
import { ShieldAlert } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <ShieldAlert className="h-24 w-24 text-red-500 mb-6" />
      <h1 className="text-4xl font-bold text-gray-900 mb-2 text-center">Access Denied</h1>
      <p className="text-xl text-gray-600 mb-6 text-center">
        You don't have permission to access this page.
      </p>
      <div className="flex space-x-4">
        <Button onClick={() => navigate(-1)}>Go Back</Button>
        <Button variant="outline" onClick={() => navigate("/")}>
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default Unauthorized;
