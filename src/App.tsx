import React, { useContext } from "react";
import { ChatProvider, ChatContext } from "./context/ChatContext";
import Header from "./components/Header";
import ChatContainer from "./components/ChatContainer";
import { ThemeProvider } from "./components/theme-provider";

const ChatApp = () => {
  const { currentModel, setCurrentModel } = useContext(ChatContext);

  return (
    <div className="bg-background text-foreground min-h-screen">
      <Header onModelSelect={setCurrentModel} currentModel={currentModel} />
      <ChatContainer />
    </div>
  );
};

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
      <ChatProvider initialModel="llama3-8b-8192">
        <ChatApp />
      </ChatProvider>
    </ThemeProvider>
  );
}

export default App;
