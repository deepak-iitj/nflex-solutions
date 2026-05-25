import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const SHOW_AFTER = 400;

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  if (!visible) return null;

  return (
    <Button
      size="icon"
      variant="secondary"
      className="fixed bottom-20 right-6 z-40 h-10 w-10 rounded-full shadow-lg md:bottom-6"
      onClick={scrollToTop}
      aria-label="Back to top"
    >
      <ChevronUp size={18} />
    </Button>
  );
}
