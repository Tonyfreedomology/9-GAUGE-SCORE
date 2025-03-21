
import { useState } from "react";
import { Share2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ShareableImage } from "./ShareableImage";
import { SocialSharePopover } from "./SocialSharePopover";
import { calculateOverallScore } from "@/lib/services/assessmentService";
import { Database } from "@/integrations/supabase/types";

type ShareResultsProps = {
  containerRef: React.RefObject<HTMLDivElement>;
  answers: Record<string, number>;
  categories: (Database['public']['Tables']['assessment_categories']['Row'] & {
    questions: Database['public']['Tables']['assessment_questions']['Row'][];
  })[];
};

export const ShareResults = ({ answers, categories, containerRef }: ShareResultsProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  
  const score = calculateOverallScore(categories, answers);

  const handleImageGenerated = async (dataUrl: string) => {
    try {
      setImageUrl(dataUrl);
      
      const response = await fetch(dataUrl);
      const blob = await response.blob();
      
      const shareUrl = `https://9gauge.freedomology.com`;
      const fileShareData = {
        title: 'My Freedomology Assessment Results',
        text: `I just scored ${score}/100 on the 9-gauge assessment. What's your score? Take the assessment here: ${shareUrl}`,
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
      } else {
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
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
    toast.success("Results image downloaded!");
  };

  const generateAndShareImage = () => {
    setIsGenerating(true);
  };

  const handleManualDownload = () => {
    if (imageUrl) {
      fetch(imageUrl)
        .then(response => response.blob())
        .then(blob => fallbackToDownload(blob))
        .catch(() => toast.error("Error downloading image"));
    }
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
        <div className="flex flex-col items-center gap-4 bg-white/10 backdrop-blur-lg p-6 rounded-xl">
          <h3 className="text-xl font-heading font-bold text-white text-center mb-2">Share your results</h3>
          <SocialSharePopover 
            shareUrl="https://9gauge.freedomology.com"
            title="Check out my Freedomology Assessment results!"
            imageUrl={imageUrl}
            score={score}
          />
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setImageUrl(null);
                setIsGenerating(false);
              }}
              className="mt-4 text-white hover:text-white hover:bg-white/20"
            >
              Generate New Image
            </Button>
            <Button
              variant="outline"
              onClick={handleManualDownload}
              className="mt-4 text-white hover:text-white hover:bg-white/20"
            >
              <Download className="w-5 h-5" />
            </Button>
          </div>
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
