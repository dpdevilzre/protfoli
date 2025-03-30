import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/Home";
import { ThemeProvider } from "@/contexts/ThemeContext";
import ThemeToggle from "@/components/ThemeToggle";
import SocialLinks from "@/components/SocialLinks";
import Header from "@/components/Header";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Header />
        <Home />
        <SocialLinks />
        <ThemeToggle />
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
