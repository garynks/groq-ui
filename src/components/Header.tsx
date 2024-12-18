import React, { useEffect, useState } from "react";
import { getAvailableModels } from "../services/llmService";
import "../styles/Header.css";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


function Header() {
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

  const availableModels = ["llama3-8b-8192", "gpt-3.5-turbo", "gpt-4.2-jumbo"];

  return (
    <header>
      <a href="https://groq.com/">
        <img
          className="logo"
          src="../src/assets/Groq_Logo_24_black.svg"
          alt="Groq Logo"
        />
      </a>
      <Select>
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
