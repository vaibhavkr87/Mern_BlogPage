import { useEffect, useState } from "react";

export default function useDarkMode() {

  const getInitial = () => {
    try {
      return JSON.parse(localStorage.getItem("theme")) || false;
    } catch {
      return false;
    }
  };

  const [dark, setDark] = useState(getInitial);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("theme", JSON.stringify(dark));
  }, [dark]);

  return [dark, setDark];
}
