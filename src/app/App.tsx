import { HomePage } from "@/pages/home";
import { useEffect, useRef } from "react";

export function App() {
  const initialTitleRef = useRef<string>(document.title);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.title = '🦆 Эй, ты куда?';
      } else {
        document.title = initialTitleRef.current;
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.title = initialTitleRef.current;
    };
  }, []);

  return <HomePage />;
}
