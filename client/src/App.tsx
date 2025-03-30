import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/Home";
import { ThemeProvider } from "@/contexts/ThemeContext";
import ThemeToggle from "@/components/ThemeToggle";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Home />
        <ThemeToggle />
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
