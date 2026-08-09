import { HomePage } from "@/pages/home";
import { useEffect, useRef } from "react";

export function App() {
  const initialTitleRef = useRef<string>(document.title);

  useEffect(() => {
    const initialTitle = initialTitleRef.current;

    const handleVisibilityChange = () => {
      document.title = document.hidden ? "🦆 Эй, ты куда?" : initialTitle;
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.title = initialTitle;
    };
  }, []);

  return <HomePage />;
}
