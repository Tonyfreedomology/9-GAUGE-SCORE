
import { useState } from "react";
import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ShareableImage } from "./ShareableImage";

type ShareResultsProps = {
  containerRef: React.RefObject<HTMLDivElement>;
  answers: Record<string, number>;
};

export const ShareResults = ({ answers }: ShareResultsProps) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleImageGenerated = async (dataUrl: string) => {
    try {
      // Convert data URL to blob
      const response = await fetch(dataUrl);
      const blob = await response.blob();
      const file = new File([blob], 'freedomology-results.png', { type: 'image/png' });

      // Share or download the image
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
      console.error("Error sharing image:", error);
      toast.error("Sorry, there was an error sharing your results");
    } finally {
      setIsGenerating(false);
    }
  };

  const generateAndShareImage = () => {
    setIsGenerating(true);
  };

  return (
    <>
      <Button
        onClick={generateAndShareImage}
        disabled={isGenerating}
        className="bg-gradient-to-r from-[#17BEBB] to-[#00D4FF] text-white px-8 py-4 rounded-xl text-lg font-semibold
          transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center gap-2"
      >
        <Share2 className="w-5 h-5" />
        {isGenerating ? "Generating..." : "Share Results"}
      </Button>
      
      {isGenerating && (
        <ShareableImage 
          answers={answers}
          onImageGenerated={handleImageGenerated}
        />
      )}
    </>
  );
};
