import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";

type WeekContentProps = {
  number: string;
  title: string;
  description: string;
};

export const WeekContent = ({ number, title, description }: WeekContentProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <div 
      ref={ref}
      className={cn(
        "opacity-0 translate-y-4 transition-all duration-700",
        inView && "opacity-100 translate-y-0"
      )}
    >
      <div className="flex gap-6 mb-8">
        <span className="text-relationships/60 text-xl">{number}</span>
        <div>
          <h3 className="text-white text-xl font-semibold mb-2">{title}</h3>
          <p className="text-white/80 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
};