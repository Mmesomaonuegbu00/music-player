"use client";


import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

const Darkmode = () => {
  const { theme, setTheme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // Ensures theme updates only after hydration
  }, []);

  if (!mounted) return null; // Avoid rendering before hydration

  return (
    <div className="flex justify-end">
      {currentTheme === "dark" ? (
        <Sun onClick={() => setTheme("light")} className=" rounded-full lg:w-6 lg:h-6 cursor-pointer text-gray-500 " />
      ) : (
        <Moon onClick={() => setTheme("dark")} className=" rounded-full lg:w-6 lg:h-6 cursor-pointer text-gray-500 " />
      )}
    </div>
  );
};

export default Darkmode;
