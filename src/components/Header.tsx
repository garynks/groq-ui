import React, { useEffect, useState } from "react";
import { getAvailableModels } from "../services/llmService";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface HeaderProps {
  onModelSelect: (model: string) => void;
  currentModel: string;
}

function Header({ onModelSelect, currentModel }: HeaderProps) {
  //   const [availableModels, setAvailableModels] = useState<string[]>([]);

  //   useEffect(() => {
  //     const fetchModels = async () => {
  //       try {
  //         const models = await getAvailableModels();
  //         setAvailableModels(models.data);
  //       } catch (error) {
  //         console.error("Failed to fetch models:", error);
  //       }
  //     };
  //     fetchModels();
  //   }, []);

  const availableModels = [
    "llama3-8b-8192",
    "whisper-large-v3",
    "mixtral-8x7b-32768",
  ];

  return (
    <header className="flex justify-between items-center p-4 mx-auto max-w-4xl">
      <a href="https://groq.com/">
        <img
          className="h-8 w-auto"
          src="../src/assets/Groq_Logo_24_black.svg"
          alt="Groq Logo"
        />
      </a>
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
    </header>
  );
}

export default Header;
