"use client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Click({ children }: { children: React.ReactNode }) {
  const handleClick = () => {
    toast.success("Button clicked");
  };
  return (
    <Button variant="default" onClick={handleClick}>
      {children}
    </Button>
  );
}
