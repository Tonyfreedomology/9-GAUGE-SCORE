
import { Twitter, Facebook, Linkedin, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type SocialSharePopoverProps = {
  shareUrl: string;
  title: string;
  imageUrl?: string;
};

export const SocialSharePopover = ({ shareUrl, title, imageUrl }: SocialSharePopoverProps) => {
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);
  const assessmentUrl = encodeURIComponent("https://freedomology.com/9-gauge-assessment");

  const shareLinks = [
    {
      name: "X (Twitter)",
      icon: <X className="w-5 h-5" />,
      color: "bg-white hover:bg-gray-100 text-black",
      url: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${assessmentUrl}`,
    },
    {
      name: "Facebook",
      icon: <Facebook className="w-5 h-5" />,
      color: "bg-[#4267B2] hover:bg-[#365899] text-white",
      url: `https://www.facebook.com/sharer/sharer.php?u=${assessmentUrl}`,
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="w-5 h-5" />,
      color: "bg-[#0077b5] hover:bg-[#006399] text-white",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${assessmentUrl}`,
    },
  ];

  const handleShare = (url: string, platform: string) => {
    // Show a toast explaining how to share with the image
    toast.info(
      `To share your results with the image, save the image first and then upload it when posting to ${platform}.`, 
      {
        className: "bg-white border-2 border-[#17BEBB] text-[#293230] font-semibold",
        duration: 5000
      }
    );
    window.open(url, "_blank", "width=550,height=435");
  };

  return (
    <div className="flex items-center gap-3">
      {shareLinks.map((platform) => (
        <Button
          key={platform.name}
          size="lg"
          className={`rounded-full ${platform.color} shadow-lg transform transition-all duration-200 hover:scale-105 min-w-[48px] min-h-[48px]`}
          onClick={() => handleShare(platform.url, platform.name)}
        >
          {platform.icon}
        </Button>
      ))}
    </div>
  );
};
