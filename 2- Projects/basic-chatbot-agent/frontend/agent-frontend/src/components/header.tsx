import reactLogo from "../assets/react.svg";  
import viteLogo from "/vite.svg";   

const Header = () => {
  return (
    <section>
      <header className="flex flex-col items-center py-2">
        <div className="flex justify-center">
          <a href="https://saadsalman.cloud/" target="_blank" rel="noopener noreferrer">
            <img
              src={viteLogo}
              className="w-20 h-20 animate-heartbeat transform transition duration-300 mt-2"
              alt="Chatbot logo"
            />
          </a>
        </div>
        <h1 className="lg:text-4xl font-extrabold bg-clip-text text-transparent shining-gradient mt-5">
          Chatbot Agent
        </h1>
      </header>
    </section>
  );
};

export default Header;

