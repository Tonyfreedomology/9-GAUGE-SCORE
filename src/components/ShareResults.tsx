
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

      // Check if Web Share API is supported and can share files
      if (navigator.share && navigator.canShare({ files: [file] })) {
        console.log('Sharing via Web Share API...');
        try {
          await navigator.share({
            files: [file],
            title: 'My Freedomology Assessment Results',
            text: 'Check out my Freedomology Assessment results!'
          });
          toast.success("Thanks for sharing your results!");
        } catch (error) {
          console.error('Error sharing:', error);
          // If user cancels share, don't show error toast
          if (error instanceof Error && error.name !== 'AbortError') {
            fallbackToDownload(blob);
          }
        }
      } else {
        console.log('Web Share API not supported, falling back to download...');
        fallbackToDownload(blob);
      }
    } catch (error) {
      console.error("Error processing image:", error);
      toast.error("Sorry, there was an error sharing your results");
    } finally {
      setIsGenerating(false);
    }
  };

  const fallbackToDownload = (blob: Blob) => {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'freedomology-results.png';
    link.click();
    toast.success("Results image downloaded!");
  };

  const generateAndShareImage = () => {
    setIsGenerating(true);
  };

  return (
    <>
      <Button
        onClick={generateAndShareImage}
        disabled={isGenerating}
        className="bg-gradient-to-r from-[#17BEBB] to-[#00D4FF] text-white px-8 py-4 rounded-xl 
          text-lg font-heading font-bold tracking-tighter lowercase flex items-center gap-2
          transition-all duration-300 hover:shadow-lg hover:scale-105"
      >
        <Share2 className="w-5 h-5" />
        {isGenerating ? "generating..." : "share results"}
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
