import { useState, useEffect } from "react";

interface ChatSession {
  id: string;
  messages: { role: "user" | "ai"; message: string }[];
}

interface SideBarProps {
  chatHistory: ChatSession[];
  setActiveChat: (id: string) => void;
}

const SideBar = ({ chatHistory, setActiveChat }: SideBarProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
  }, [chatHistory]);

  return (
    <div className="flex h-screen">
      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="fixed left-2 top-2 px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-medium
          hover:from-purple-700 hover:to-blue-700 hover:scale-105
          active:scale-95 shadow-xl border border-purple-500 text-white
          transition-all disabled:opacity-50 disabled:cursor-not-allowed z-50"
      >
        {isVisible ? "Hide" : "Show"} Chat History
      </button>
      
      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full bg-gray-800 text-white p-4 overflow-y-auto border-r border-gray-700 transform ${isVisible ? "w-64 translate-x-0" : "w-0 -translate-x-full"} transition-all duration-300 ease-in-out`}
      >
        <ul>
          {chatHistory.map((session) => (
            <li
              key={session.id}
              className="p-2 bg-gray-700 rounded mb-2 cursor-pointer hover:bg-gray-600"
              onClick={() => setActiveChat(session.id)}
            >
              {new Date(parseInt(session.id)).toLocaleString()}
            </li>
          ))}
        </ul>
      </div>
      
      {/* Main Content Wrapper */}
      <div className={`flex-1 transition-all duration-300 ${isVisible ? "ml-64" : "ml-0"}`}>
        {/* This will be the main chat window */}
      </div>
    </div>
  );
};

export default SideBar;