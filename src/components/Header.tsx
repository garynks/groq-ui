import React, { useEffect, useState } from "react";
import { getAvailableModels } from "../services/llmService";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

interface HeaderProps {
  onModelSelect: (model: string) => void;
  currentModel: string;
}

function Header({ onModelSelect, currentModel }: HeaderProps) {
  const [availableModels, setAvailableModels] = useState<string[]>([currentModel]);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const models = await getAvailableModels();
        setAvailableModels(models);
      } catch (error) {
        console.error("Failed to fetch models:", error);
      }
    };
    fetchModels();
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="flex justify-between items-center p-4 mx-auto max-w-4xl bg-background text-foreground">
      <a href="https://groq.com/">
        {theme === "dark" ? (
          <img
            className="h-8 w-auto"
            src="../src/assets/Groq_Logo_24_white.svg"
            alt="Groq Logo"
          />
        ) : (
          <img
            className="h-8 w-auto"
            src="../src/assets/Groq_Logo_24_black.svg"
            alt="Groq Logo"
          />
        )}
      </a>
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="icon" onClick={toggleTheme}>
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        </Button>
        <Select value={currentModel} onValueChange={onModelSelect}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a model" />
          </SelectTrigger>
          <SelectContent>
            {availableModels.map((model) => (
              <SelectItem key={model} value={model}>
                {model}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </header>
  );
}

export default Header;
