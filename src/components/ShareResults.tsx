
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
      console.log('navigator.share exists:', !!navigator.share);
      console.log('navigator.canShare exists:', !!navigator.canShare);
      
      const shareData = {
        files: [file],
        title: 'My Freedomology Assessment Results',
        text: 'Check out my Freedomology Assessment results!'
      };
      
      console.log('Testing canShare with data:', shareData);
      
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        console.log('Web Share API supported and can share files');
        try {
          await navigator.share(shareData);
          toast.success("Thanks for sharing your results!");
        } catch (error) {
          console.error('Error sharing:', error);
          if (error instanceof Error && error.name !== 'AbortError') {
            console.log('Share error, falling back to download');
            fallbackToDownload(blob);
          }
        }
      } else {
        console.log('Web Share API not fully supported:');
        console.log('- navigator.share:', !!navigator.share);
        console.log('- navigator.canShare:', !!navigator.canShare);
        console.log('- canShare result:', navigator.canShare ? navigator.canShare(shareData) : false);
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

