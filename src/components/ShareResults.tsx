import { RefObject } from 'react';
import html2canvas from 'html2canvas';
import { Share } from 'lucide-react';
import { useToast } from './ui/use-toast';

type ShareResultsProps = {
  containerRef: RefObject<HTMLDivElement>;
};

type ShareData = {
  files: File[];
  title: string;
  text: string;
};

export const ShareResults = ({ containerRef }: ShareResultsProps) => {
  const { toast } = useToast();

  const handleShare = async () => {
    if (!containerRef.current) {
      console.error('Container ref is not available');
      return;
    }

    try {
      console.log('Starting image capture...');
      const canvas = await html2canvas(containerRef.current);
      
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((blob) => {
          if (blob) {
            console.log('Blob created successfully');
            resolve(blob);
          } else {
            reject(new Error('Failed to create blob'));
          }
        }, 'image/png');
      });

      const file = new File([blob], 'freedomology-score.png', { type: 'image/png' });
      const shareData: ShareData = {
        files: [file],
        title: 'My Freedomology Score',
        text: 'Check out my Freedomology Score!'
      };

      if (navigator.canShare?.(shareData)) {
        console.log('Sharing via native share API...');
        await navigator.share(shareData);
      } else {
        console.log('Native sharing not available, downloading instead...');
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'freedomology-score.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        toast({
          title: "Image downloaded!",
          description: "Your results have been saved as an image.",
        });
      }
    } catch (error) {
      console.error('Error sharing results:', error);
      toast({
        title: "Error",
        description: "Failed to share your results. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <button
      onClick={handleShare}
      className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl text-lg font-semibold
        transition-all duration-300 hover:bg-white/20 hover:shadow-lg hover:scale-105
        flex items-center gap-2 min-w-[200px] justify-center"
      type="button"
      aria-label="Share results"
    >
      <Share className="w-5 h-5" />
      Share Results
    </button>
  );
};