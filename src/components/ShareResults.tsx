
import { useState } from "react";
import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ShareableImage } from "./ShareableImage";
import { SocialSharePopover } from "./SocialSharePopover";
import { calculateOverallScore } from "@/lib/services/assessmentService";
import { useQuery } from "@tanstack/react-query";
import { fetchAssessmentData } from "@/lib/services/assessmentService";

type ShareResultsProps = {
  containerRef: React.RefObject<HTMLDivElement>;
  answers: Record<string, number>;
};

export const ShareResults = ({ answers }: ShareResultsProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const { data: assessmentData } = useQuery({
    queryKey: ['assessment'],
    queryFn: fetchAssessmentData
  });

  const overallScore = assessmentData ? calculateOverallScore(assessmentData, answers) : 0;
  const shareText = `I just scored ${overallScore} on the 9-gauge assessment. What's your score?`;

  const handleImageGenerated = async (dataUrl: string) => {
    try {
      setImageUrl(dataUrl);
      
      const response = await fetch(dataUrl);
      const blob = await response.blob();
      
      const fileShareData = {
        title: shareText,
        text: shareText,
        files: [new File([blob], '9-gauge-results.png', { type: 'image/png' })]
      };
      
      if (navigator.share && navigator.canShare && navigator.canShare(fileShareData)) {
        try {
          await navigator.share(fileShareData);
          toast.success("Thanks for sharing your results!", {
            className: "bg-white border-2 border-[#17BEBB] text-[#293230] font-semibold"
          });
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
      toast.error("Sorry, there was an error sharing your results", {
        className: "bg-white border-2 border-red-500 text-[#293230] font-semibold"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const fallbackToDownload = (blob: Blob) => {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = '9-gauge-results.png';
    link.click();
    toast.success("Results image downloaded!", {
      className: "bg-white border-2 border-[#17BEBB] text-[#293230] font-semibold"
    });
  };

  const generateAndShareImage = () => {
    setIsGenerating(true);
  };

  return (
    <div className="flex flex-col items-center gap-4 relative">
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
        <div className="flex flex-col items-center gap-4 bg-[#293230]/90 backdrop-blur-lg p-6 rounded-xl w-full max-w-md">
          <h3 className="text-xl font-heading font-bold text-white text-center mb-2">Share your results</h3>
          <SocialSharePopover 
            shareUrl={window.location.href}
            title={shareText}
            imageUrl={imageUrl}
            score={overallScore}
          />
          <Button
            variant="outline"
            onClick={() => {
              setImageUrl(null);
              setIsGenerating(false);
            }}
            className="mt-4 text-white hover:text-white hover:bg-white/20 border-white w-full"
          >
            Generate New Image
          </Button>
        </div>
      )}
      
      <div className="absolute top-0 left-0 opacity-0 pointer-events-none">
        {isGenerating && (
          <ShareableImage 
            answers={answers}
            onImageGenerated={handleImageGenerated}
          />
        )}
      </div>
    </div>
  );
};
