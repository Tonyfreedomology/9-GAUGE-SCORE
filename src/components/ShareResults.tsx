import { useState } from "react";
import html2canvas from "html2canvas";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { toast } from "sonner";

type ShareResultsProps = {
  containerRef: React.RefObject<HTMLDivElement>;
};

export const ShareResults = ({ containerRef }: ShareResultsProps) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generateAndShareImage = async () => {
    if (!containerRef.current) return;
    
    try {
      setIsGenerating(true);
      console.log("Starting image generation");
      
      const canvas = await html2canvas(containerRef.current, {
        backgroundColor: null,
        scale: 2, // Higher quality
        logging: true,
      });
      
      // Convert to blob
      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((blob) => {
          resolve(blob!);
        }, 'image/png');
      });

      // Create file from blob
      const file = new File([blob], 'freedomology-results.png', { type: 'image/png' });

      // Check if Web Share API is supported
      if (navigator.share && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'My Freedomology Assessment Results',
          text: 'Check out my Freedomology Assessment results!'
        });
        toast.success("Thanks for sharing your results!");
      } else {
        // Fallback to download if sharing isn't supported
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'freedomology-results.png';
        link.click();
        toast.success("Results image downloaded!");
      }
    } catch (error) {
      console.error("Error generating/sharing image:", error);
      toast.error("Sorry, there was an error sharing your results");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button
      onClick={generateAndShareImage}
      disabled={isGenerating}
      className="bg-gradient-to-r from-[#17BEBB] to-[#00D4FF] text-white px-8 py-4 rounded-xl text-lg font-semibold
        transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center gap-2"
    >
      <Share2 className="w-5 h-5" />
      {isGenerating ? "Generating..." : "Share Results"}
    </Button>
  );
};