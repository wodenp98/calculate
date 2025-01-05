import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <Loader className="animate-spin mr-2" />
      <div className="text-2xl">Chargement...</div>
    </div>
  );
}
