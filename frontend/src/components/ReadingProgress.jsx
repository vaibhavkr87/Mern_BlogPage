import { useEffect, useState } from "react";

export default function ReadingProgress() {

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const height = document.body.scrollHeight - window.innerHeight;
      const scrolled = (window.scrollY / height) * 100;
      setProgress(scrolled);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[4px] bg-transparent z-[9999]">
      <div
        className="h-full bg-indigo-500 dark:bg-indigo-400 transition-all"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
