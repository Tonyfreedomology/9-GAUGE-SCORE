
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

      // Debug logging
      console.log('Checking Web Share API support...');
      
      // First try sharing without the file
      const textShareData = {
        title: 'My Freedomology Assessment Results',
        text: 'Check out my Freedomology Assessment results!'
      };

      const fileShareData = {
        ...textShareData,
        files: [file]
      };
      
      // Check if we can share with file first
      if (navigator.share && navigator.canShare && navigator.canShare(fileShareData)) {
        console.log('Full Web Share API supported, sharing with file...');
        try {
          await navigator.share(fileShareData);
          toast.success("Thanks for sharing your results!");
          return;
        } catch (error) {
          console.error('Error sharing with file:', error);
        }
      }

      // Try sharing just text if file sharing failed
      if (navigator.share) {
        console.log('Attempting text-only share...');
        try {
          await navigator.share(textShareData);
          toast.success("Thanks for sharing your results!");
          // Download the image separately since we couldn't share it
          fallbackToDownload(blob);
        } catch (error) {
          console.error('Error sharing text:', error);
          if (error instanceof Error && error.name !== 'AbortError') {
            console.log('Share failed completely, falling back to download only');
            fallbackToDownload(blob);
          }
        }
      } else {
        console.log('Web Share API not supported at all, falling back to download');
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
