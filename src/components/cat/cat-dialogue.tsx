"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import { generateCatExplanations } from "@/ai/flows/generate-cat-explanations";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

export function CatDialogue() {
  const pathname = usePathname();
  const [explanation, setExplanation] = useState("");
  const [loading, setLoading] = useState(true);

  const sectionContent = useMemo(() => {
    const sectionName = pathname.substring(1) || "home";
    switch (sectionName) {
      case 'about':
        return 'This page is about me, my skills, and my journey as a developer and designer.';
      case 'projects':
        return 'This page showcases some of the projects I have worked on.';
      case 'contact':
        return 'This page provides ways to get in touch with me for collaborations or just to say hi.';
      default:
        return "This is the homepage of my portfolio. It's a place to welcome visitors.";
    }
  }, [pathname]);

  useEffect(() => {
    const getExplanation = async () => {
      setLoading(true);
      
      const sectionName = pathname.substring(1) || "home";

      try {
        const result = await generateCatExplanations({ sectionName, sectionContent });
        setExplanation(result.explanation);
      } catch (error) {
        console.error("Failed to get cat explanation:", error);
        setExplanation("Meow! I'm having a little catnap. I'll be back with my thoughts soon.");
      } finally {
        setLoading(false);
      }
    };

    getExplanation();
  }, [pathname, sectionContent]);

  return (
    <Card className="mt-4 bg-card/80 backdrop-blur-sm border-primary/20">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <MessageSquare className="h-5 w-5 mt-1 text-primary flex-shrink-0" />
          <div className="text-sm text-foreground/90 min-h-[60px]">
            {loading ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ) : (
              <p className="italic">"{explanation}"</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
