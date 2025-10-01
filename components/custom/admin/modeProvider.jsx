import { ThemeProvider as NextThemesProvider } from "next-themes";

const ModeProvider = ({ children, ...props }) => {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
};

export default ModeProvider;
