import { createContext, useState } from "react";

type Theme = "dark" | "light";

export const ThemeContext = createContext<{
  theme: Theme | undefined;
  setTheme: React.Dispatch<React.SetStateAction<Theme>> | undefined;
}>({
  theme: undefined,
  setTheme: undefined,
});

export const ThemeProvider = (children: React.ReactNode) => {
  const [theme, setTheme] = useState<Theme>("dark");

  return <ThemeContext value={{ theme, setTheme }}>{children}</ThemeContext>;
};
