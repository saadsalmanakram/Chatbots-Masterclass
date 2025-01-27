import { useState, useRef, useEffect, ChangeEvent, KeyboardEvent } from 'react';
import axios from 'axios';

interface ChatMessage {
  role: 'user' | 'ai';
  message: string;
}

const ChatApp = () => {
  const [userMessage, setUserMessage] = useState('');
  const [selectedModel, setSelectedModel] = useState('meta-llama/Llama-3.2-1B-Instruct');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const models = [
    'meta-llama/Llama-3.2-1B-Instruct',
    'google/gemma-1.1-2b-it',
    'google/gemma-2-2b-it',
    'google/gemma-2-9b-it',
    'microsoft/Phi-3-mini-4k-instruct',
    'microsoft/Phi-3.5-mini-instruct',
    'HuggingFaceH4/starchat2-15b-v0.1'
  ];

  useEffect(() => {
    const container = chatContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [chatHistory]);

  const handleMessageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    if (!userMessage.trim() || loading) return;

    setLoading(true);
    setError(null);

    try {
      setChatHistory(prev => [
        ...prev,
        { role: 'user', message: userMessage }
      ]);

      setChatHistory(prev => [
        ...prev,
        { role: 'ai', message: 'LOADING Svg Animation' }
      ]);

      const response = await axios.post('http://127.0.0.1:8000/api/chat/', {
        message: userMessage,
        model: selectedModel
      });

      setChatHistory(prev => {
        const updatedHistory = [...prev];
        if (
          updatedHistory.length > 0 &&
          updatedHistory[updatedHistory.length - 1].message === 'LOADING Svg Animation'
        ) {
          updatedHistory[updatedHistory.length - 1] = {
            role: 'ai',
            message: response.data.response
          };
        }
        return updatedHistory;
      });

      setUserMessage('');
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to send message. Please try again.');
    }

    setLoading(false);
  };

  const handleNewChat = () => {
    setChatHistory([]);
    setUserMessage('');
    setError(null);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="chat-app-container flex flex-col h-full space-chat">
      <div 
        ref={chatContainerRef} 
        className="chat-history flex flex-col flex-grow space-y-4 p-4 overflow-y-auto backdrop-blur-sm border rounded-xl border-purple-500 bg-black/10 text-white"
        style={{ height: 'calc(100vh - 180px)' }}
      >
        {chatHistory.map((chat, index) => (
          <div 
            key={index}
            className={`chat-message ${chat.role === 'user' ? 'user' : 'ai'} p-4 rounded-lg transition-all duration-300 space-message`}
          >
            {chat.message === 'LOADING Svg Animation' ? (
              <div className="flex justify-center items-center w-full h-20 animate-pulse">
                <div 
                  className="w-8 h-8 border-4 border-white border-t-transparent rounded-full"
                  style={{
                    animation: 'spin 1s linear infinite',
                    boxShadow: '0 0 15px 5px rgba(102, 204, 255, 0.3)'
                  }}
                ></div>
              </div>
            ) : (
              <p className="text-sm">{chat.message}</p>
            )}
          </div>
        ))}
      </div>

      {error && (
        <div className="error-message p-3 bg-red-900/30 bg-clip-text text-red-400 rounded-lg mt-4 mb-4 text-center animate-heartbeat">
          {error}
        </div>
      )}

      <div className="input-container flex items-center gap-4 p-4 border-t border-purple-500 backdrop-blur-sm">
        <select 
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
          className="model-select p-2 bg-gray-700 rounded-lg border border-purple-500 text-white
            focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all
            hover:bg-gray-600"
        >
          {models.map((model, index) => (
            <option 
              key={index} 
              value={model}
              className="text-white hover:bg-gray-500"
            >
              {model.replace(/\/|-/g, ' ').replace('Instruct', '')}
            </option>
          ))}
        </select>

        <input
          type="text"
          value={userMessage}
          onChange={handleMessageChange}
          onKeyDown={handleKeyDown}
          placeholder="Enter your command..."
          disabled={loading}
          className="input-field flex-grow p-2 bg-black/20 rounded-lg border border-purple-500
            focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none
            hover:bg-black/30 transition-all space-input"
          style={{ paddingRight: '80px' }}
        />

        <button 
          onClick={handleSendMessage} 
          disabled={loading}
          className="send-button px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-medium
            hover:from-purple-700 hover:to-blue-700 hover:scale-105
            active:scale-95 shadow-xl border border-purple-500 text-white
            transition-all disabled:opacity-50 disabled:cursor-not-allowed space-button"
        >
          Send
        </button>

        <button
          onClick={handleNewChat}
          className="reset-button px-6 py-2 bg-gradient-to-r from-red-600 to-pink-600 rounded-lg font-medium
            hover:from-red-700 hover:to-pink-700 hover:scale-105
            active:scale-95 shadow-xl border border-red-500 text-white
            transition-all space-button"
        >
          New Chat
        </button>
      </div>
    </div>
  );
};

export default ChatApp;