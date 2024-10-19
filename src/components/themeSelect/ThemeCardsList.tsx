import { ThemeCard } from "../common/cards/themeCard/ThemeCard.tsx";
import { Theme } from "../../interfaces/interfaces.ts";
import { useRef, useState, useEffect } from "react";
import Button from "../common/buttons/Button.tsx";
import { ArrowLeftIcon, ArrowRightIcon } from "../common/icons/Icons.tsx";

interface ThemeCardsListProps {
  themes: Theme[];
  onCardClick: (theme: Theme) => void;
}

export const ThemeCardsList: React.FC<ThemeCardsListProps> = ({ themes, onCardClick }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showScrollButtons, setShowScrollButtons] = useState(false);

  const scroll = (direction: string) => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -600 : 600;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const { scrollWidth, clientWidth } = scrollRef.current;
        setShowScrollButtons(scrollWidth > clientWidth);
      }
    };

    handleScroll();

    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, [themes]);

  return (
    <div className="relative pb-10 px-5 lg:px-32">
      {showScrollButtons && (
        <Button shape={'circle'} size={'circle'} onClick={() => scroll("left")} className="absolute left-5 top-1/2 transform -translate-y-1/2 z-10">
          <ArrowLeftIcon />
        </Button>
      )}
      <div ref={scrollRef} className="flex overflow-x-auto gap-5 scroll-smooth" style={{ scrollbarWidth: 'none', overflow: 'hidden' }}>
        {themes.map((theme) => (
          <div key={theme.id} className="flex-shrink-0">
            <ThemeCard theme={theme} onClick={() => onCardClick(theme)} />
          </div>
        ))}
      </div>
      {showScrollButtons && (
        <Button shape={'circle'} size={'circle'} onClick={() => scroll("right")} className="absolute right-5 top-1/2 transform -translate-y-1/2 z-10">
          <ArrowRightIcon />
        </Button>
      )}
    </div>
  );
};
