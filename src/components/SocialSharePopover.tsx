
import { Twitter, Facebook, Linkedin, X } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

type SocialSharePopoverProps = {
  shareUrl: string;
  title: string;
  imageUrl?: string;
};

export const SocialSharePopover = ({ shareUrl, title }: SocialSharePopoverProps) => {
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      name: "X (Twitter)",
      icon: <X className="w-5 h-5" />,
      color: "hover:text-[#1DA1F2]",
      url: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    },
    {
      name: "Facebook",
      icon: <Facebook className="w-5 h-5" />,
      color: "hover:text-[#4267B2]",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="w-5 h-5" />,
      color: "hover:text-[#0077b5]",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
  ];

  const handleShare = (url: string) => {
    window.open(url, "_blank", "width=550,height=435");
  };

  return (
    <div className="flex items-center gap-2">
      {shareLinks.map((platform) => (
        <Button
          key={platform.name}
          variant="outline"
          size="icon"
          className={`rounded-full ${platform.color}`}
          onClick={() => handleShare(platform.url)}
        >
          {platform.icon}
        </Button>
      ))}
    </div>
  );
};
