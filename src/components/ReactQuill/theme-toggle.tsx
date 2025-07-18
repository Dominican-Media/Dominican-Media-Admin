import * as React from "react";

// --- UI Primitives ---
import { Button } from "@/components/tiptap-ui-primitive/button";

// --- Icons ---
import { MoonStarIcon } from "@/components/tiptap-icons/moon-star-icon";
import { SunIcon } from "@/components/tiptap-icons/sun-icon";

export function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = React.useState<boolean>(false);

  const toggleDarkMode = () => setIsDarkMode((isDark) => !isDark);

  return (
    // <Button
    //   onClick={toggleDarkMode}
    //   aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
    //   data-style="ghost"
    // >
    //   {isDarkMode ? (
    //     <MoonStarIcon className="tiptap-button-icon" />
    //   ) : (
    //     <SunIcon className="tiptap-button-icon" />
    //   )}
    // </Button>
    null
  );
}
