import { useState, useEffect } from "react";
import Header from './components/Header';  
import Footer from './components/Footer';
import ChatApp from './components/ChatApp';
import SideBar from './components/SideBar';

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [activeChat, setActiveChat] = useState<string | null>(null);

  useEffect(() => {
    const savedChats = JSON.parse(localStorage.getItem("chatHistory") || "[]");
    setChatHistory(savedChats);
  }, []);

  const handleNewChat = () => {
    const newSession = { id: Date.now().toString(), messages: [] };
    setChatHistory([...chatHistory, newSession]);
    setActiveChat(newSession.id);
    localStorage.setItem("chatHistory", JSON.stringify([...chatHistory, newSession]));
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 via-sky-900 to-gray-800 text-white font-sans">
      <SideBar chatHistory={chatHistory} setActiveChat={setActiveChat} handleNewChat={handleNewChat} />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1 flex flex-col overflow-hidden">
          <ChatApp activeChat={activeChat} />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
