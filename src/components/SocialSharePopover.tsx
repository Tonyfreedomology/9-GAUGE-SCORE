
import { Twitter, Facebook, Linkedin, X } from "lucide-react";
import { Button } from "@/components/ui/button";

type SocialSharePopoverProps = {
  shareUrl: string;
  title: string;
  imageUrl?: string;
};

export const SocialSharePopover = ({ shareUrl, title, imageUrl }: SocialSharePopoverProps) => {
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      name: "X (Twitter)",
      icon: <X className="w-5 h-5" />,
      color: "bg-white hover:bg-gray-100 text-black",
      url: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    },
    {
      name: "Facebook",
      icon: <Facebook className="w-5 h-5" />,
      color: "bg-[#4267B2] hover:bg-[#365899] text-white",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="w-5 h-5" />,
      color: "bg-[#0077b5] hover:bg-[#006399] text-white",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
  ];

  const handleShare = (url: string) => {
    window.open(url, "_blank", "width=550,height=435");
  };

  return (
    <div className="flex items-center gap-3">
      {shareLinks.map((platform) => (
        <Button
          key={platform.name}
          size="lg"
          className={`rounded-full ${platform.color} shadow-lg transform transition-all duration-200 hover:scale-105 min-w-[48px] min-h-[48px]`}
          onClick={() => handleShare(platform.url)}
        >
          {platform.icon}
        </Button>
      ))}
    </div>
  );
};
