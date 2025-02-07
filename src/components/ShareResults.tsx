
import { useState } from "react";
import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ShareableImage } from "./ShareableImage";
import { SocialSharePopover } from "./SocialSharePopover";

type ShareResultsProps = {
  containerRef: React.RefObject<HTMLDivElement>;
  answers: Record<string, number>;
};

export const ShareResults = ({ answers }: ShareResultsProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleImageGenerated = async (dataUrl: string) => {
    try {
      // Store the generated image URL
      setImageUrl(dataUrl);
      
      // Convert data URL to blob for potential fallback
      const response = await fetch(dataUrl);
      const blob = await response.blob();
      
      // Try Web Share API as fallback
      const fileShareData = {
        title: 'My Freedomology Assessment Results',
        text: 'Check out my Freedomology Assessment results!',
        files: [new File([blob], 'freedomology-results.png', { type: 'image/png' })]
      };
      
      if (navigator.share && navigator.canShare && navigator.canShare(fileShareData)) {
        try {
          await navigator.share(fileShareData);
          toast.success("Thanks for sharing your results!");
          return;
        } catch (error) {
          console.error('Error sharing with file:', error);
          if (error instanceof Error && error.name !== 'AbortError') {
            fallbackToDownload(blob);
          }
        }
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
    <div className="flex flex-col items-center gap-4">
      {!imageUrl ? (
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
      ) : (
        <div className="flex flex-col items-center gap-4">
          <h3 className="text-lg font-semibold text-center">Share your results</h3>
          <SocialSharePopover 
            shareUrl={window.location.href}
            title="Check out my Freedomology Assessment results!"
            imageUrl={imageUrl}
          />
          <Button
            variant="outline"
            onClick={() => {
              setImageUrl(null);
              setIsGenerating(false);
            }}
            className="mt-2"
          >
            Generate New Image
          </Button>
        </div>
      )}
      
      {isGenerating && (
        <ShareableImage 
          answers={answers}
          onImageGenerated={handleImageGenerated}
        />
      )}
    </div>
  );
};
