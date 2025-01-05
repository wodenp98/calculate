import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Loading() {
  return (
    <Button disabled>
      <Loader className="animate-spin" />
      Chargement...
    </Button>
  );
}
