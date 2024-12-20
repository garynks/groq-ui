import React, { useContext } from "react";
import { ChatProvider, ChatContext } from "./context/ChatContext";
import Header from "./components/Header";
import ChatContainer from "./components/ChatContainer";

const ChatApp = () => {
  const { currentModel, setCurrentModel } = useContext(ChatContext);

  return (
    <>
      <Header onModelSelect={setCurrentModel} currentModel={currentModel} />
      <ChatContainer />
    </>
  );
};

function App() {
  return (
    <ChatProvider initialModel="llama3-8b-8192">
      <ChatApp />
    </ChatProvider>
  );
}

export default App;
