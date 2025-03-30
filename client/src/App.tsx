import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/Home";
import { ThemeProvider } from "@/contexts/ThemeContext";
import ThemeToggle from "@/components/ThemeToggle";
import SocialLinks from "@/components/SocialLinks";
import Header from "@/components/Header";
import CustomCursor from "@/components/CustomCursor";
import LoadingScreen from "@/components/LoadingScreen";
import { useEffect, useState } from "react";

function App() {
  const [isMounted, setIsMounted] = useState(false);
  
  // Only show custom cursor after component mounts (avoids SSR issues)
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LoadingScreen duration={2500} />
        <Header />
        <Home />
        <SocialLinks />
        <ThemeToggle />
        <Toaster />
        {isMounted && <CustomCursor />}
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
