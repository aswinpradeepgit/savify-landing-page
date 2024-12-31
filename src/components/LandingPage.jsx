import React from 'react';
import { 
  BookMarked, 
  Mic, 
  Link2, 
  Clock, 
  MessageSquareText,
  Circle,
  Laptop,
  Smartphone,
  Phone
} from 'lucide-react';

const TypewriterText = () => {
  const [text, setText] = React.useState('Where Ideas ');
  const [phase, setPhase] = React.useState(0);
  const phrases = ['Live', 'Breathe', 'Come Back to Life'];
  const colors = ['text-green-500', 'text-blue-500', 'text-purple-500'];
  const baseText = 'Where Ideas ';

  React.useEffect(() => {
    let timeout;
    const currentPhrase = phrases[phase % phrases.length];
    
    const addLetter = (index) => {
      setText(baseText + currentPhrase.slice(0, index + 1));
      if (index < currentPhrase.length - 1) {
        timeout = setTimeout(() => addLetter(index + 1), 100);
      } else {
        timeout = setTimeout(startDeleting, 1500);
      }
    };

    const startDeleting = () => {
      const deleteLetters = (length) => {
        setText(baseText + currentPhrase.slice(0, length));
        if (length > 0) {
          timeout = setTimeout(() => deleteLetters(length - 1), 50);
        } else {
          timeout = setTimeout(() => {
            setPhase((prev) => prev + 1);
            addLetter(0);
          }, 500);
        }
      };
      deleteLetters(currentPhrase.length);
    };

    timeout = setTimeout(() => addLetter(0), 200);
    return () => clearTimeout(timeout);
  }, [phase]);

  const staticText = baseText.slice(0, -1);
  const dynamicText = text.slice(baseText.length - 1);
  const currentColor = colors[phase % colors.length];

  return (
    <span className="font-semibold">
      {staticText}
      <span className={currentColor + " transition-colors duration-300"}>
        {dynamicText}
      </span>
      <span className="animate-pulse">|</span>
    </span>
  );
};

const FloatingCard = ({ children, isLeft = false }) => (
  <div 
    style={{ '--rotate-deg': isLeft ? '2deg' : '-2deg' }}
    className={`w-64 transform transition-all duration-700 ease-in-out 
      ${isLeft ? 'rotate-2 hover:rotate-3' : '-rotate-2 hover:-rotate-3'}
      hover:scale-105 animate-float`}
  >
    {children}
  </div>
);

const ModernLogo = () => (
  <div className="relative flex items-center">
    <div className="relative w-8 h-8 mr-2">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-8 h-8">
        {/* Base plane shape */}
        <path
          d="M2 12l7 3l4.5-4.5l-4.5 7.5l11-9l-18 3z"
          className="text-blue-500"
          fill="currentColor"
          opacity="0.9"
        >
          {/* Floating animation */}
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0,0; 0,-1; 0,0"
            dur="2s"
            repeatCount="indefinite"
          />
        </path>
        {/* Trail effect */}
        <path
          d="M2 12l7 3l4.5-4.5l-4.5 7.5l11-9l-18 3z"
          className="text-blue-400"
          fill="currentColor"
          opacity="0.3"
        >
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0,0; -1,0; 0,0"
            dur="2s"
            repeatCount="indefinite"
          />
        </path>
      </svg>
    </div>
    <span className="font-semibold text-xl text-gray-800">
      savify.app
    </span>
  </div>
);

const FeatureCard = ({ icon: Icon, title, description }) => {
  const getBorderColor = (title) => {
    switch (title) {
      case "Smart Bookmarking": return "border-green-200";
      case "Voice Notes": return "border-blue-200";
      case "Learning Assistant": return "border-purple-200";
      case "Smart Reminders": return "border-yellow-200";
      default: return "border-gray-200";
    }
  };

  const getIconBgColor = (title) => {
    switch (title) {
      case "Smart Bookmarking": return "bg-green-50";
      case "Voice Notes": return "bg-blue-50";
      case "Learning Assistant": return "bg-purple-50";
      case "Smart Reminders": return "bg-yellow-50";
      default: return "bg-gray-50";
    }
  };

  const getIconColor = (title) => {
    switch (title) {
      case "Smart Bookmarking": return "text-green-600";
      case "Voice Notes": return "text-blue-600";
      case "Learning Assistant": return "text-purple-600";
      case "Smart Reminders": return "text-yellow-600";
      default: return "text-gray-600";
    }
  };

  return (
    <div className={`bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 
      border ${getBorderColor(title)} transform hover:scale-105`}>
      <div className="flex items-center space-x-3 mb-4">
        <div className={`p-2 ${getIconBgColor(title)} rounded-lg`}>
          <Icon className={`w-6 h-6 ${getIconColor(title)}`} />
        </div>
        <h3 className="font-medium text-lg text-gray-800">{title}</h3>
      </div>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const PlatformCard = ({ icon: Icon, title }) => (
  <div className="flex flex-col items-center space-y-2 group">
    <div className="w-16 h-16 bg-white rounded-xl shadow-md flex items-center justify-center 
      transition-all duration-300 group-hover:shadow-lg group-hover:scale-105">
      <Icon className="w-8 h-8 text-blue-500" />
    </div>
    <span className="text-sm font-medium text-gray-600">{title}</span>
  </div>
);

const LandingPage = () => {
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float {
        0%, 100% { transform: translate(0, 0) rotate(var(--rotate-deg)); }
        50% { transform: translate(0, -10px) rotate(calc(var(--rotate-deg) + 0.5deg)); }
      }
      .animate-float {
        animation: float 6s ease-in-out infinite;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <nav className="flex items-center justify-between p-6">
        <ModernLogo />
        <div className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
          <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">How it works</a>
          <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</a>
          <button className="text-gray-600 hover:text-gray-900 transition-colors">Sign in</button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all shadow-md hover:shadow-lg">
            Get started
          </button>
        </div>
        <button className="md:hidden text-gray-600">Menu</button>
      </nav>

      <main className="max-w-6xl mx-auto px-6 relative">
        <div className="relative">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start mb-16 pt-8 gap-8">
            <FloatingCard isLeft={true}>
              <div className="bg-yellow-200 p-4 shadow-lg rounded-sm border border-yellow-300">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span className="font-medium text-gray-800">AI Assistant</span>
                </div>
                <p className="text-sm text-gray-700">
                  "Hey, that article you saved last week about productivity? I've created a personalized action plan based on it."
                </p>
              </div>
            </FloatingCard>

            <FloatingCard isLeft={false}>
              <div className="bg-blue-100/90 p-4 rounded-sm shadow-lg border border-blue-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="w-5 h-5 text-blue-500" />
                  <span className="font-medium text-gray-800">Smart Reminder</span>
                </div>
                <p className="text-sm text-gray-600">
                  Turn your saved content into actual knowledge. Time to review and implement!
                </p>
              </div>
            </FloatingCard>
          </div>

          <div className="text-center py-8">
            <h1 className="text-4xl md:text-5xl font-semibold mb-4 text-gray-900">
              <TypewriterText />
            </h1>

            <div className="flex flex-col md:flex-row justify-between gap-8 my-8">
              <div className="md:w-64">
                <FloatingCard isLeft={true}>
                  <div className="bg-white/90 backdrop-blur-lg p-4 rounded-xl shadow-lg border border-red-100">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                      <span className="font-medium text-gray-800">Job Alert</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      "Quick heads up - the Product Design role at Spotify you're interested in? Applications close soon. Your saved portfolio looks ready!"
                    </p>
                    <div className="mt-2 flex items-center text-sm text-blue-500 cursor-pointer hover:text-blue-600">
                      <span>View application</span>
                      <span className="ml-1">→</span>
                    </div>
                  </div>
                </FloatingCard>
              </div>

              <div className="max-w-2xl mx-auto text-center px-4">
                <p className="text-xl text-gray-600 mb-3">
                  Transform how you save, revolutionize how you remember
                </p>
                <p className="text-lg text-gray-500 mb-6">
                  The right content finds you at the right time
                </p>
                <button className="bg-blue-500 text-white px-8 py-3 rounded-lg text-lg hover:bg-blue-600 
                  shadow-lg hover:shadow-xl transition-all duration-300 mt-6 w-full md:w-auto">
                  Get Started
                </button>
              </div>

              <div className="md:w-64">
                <FloatingCard isLeft={false}>
                  <div className="bg-white/90 backdrop-blur-lg p-4 rounded-xl shadow-lg border border-purple-100">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      <span className="font-medium text-gray-800">Learning Path</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      "That React course you saved matches your recent GitHub bookmarks. Ready to level up your frontend skills?"
                    </p>
                    <div className="mt-2 flex items-center text-sm text-purple-500 cursor-pointer hover:text-purple-600">
                      <span>Start learning</span>
                      <span className="ml-1">→</span>
                    </div>
                  </div>
                </FloatingCard>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
            <FeatureCard 
              icon={Link2}
              title="Smart Reminders"
              description="Never miss what matters. Get reminded of the right content at the perfect time."
            />
            <FeatureCard 
              icon={BookMarked}
              title="Smart Bookmarking"
              description="Intelligent organization that learns from every save. Discover connections and insights you never knew existed."
            />
            <FeatureCard 
              icon={Mic}
              title="Voice Notes"
              description="Smart capture that understands context. Your thoughts, transcribed, organized, and connected automatically."
            />
            <FeatureCard 
              icon={MessageSquareText}
              title="Learning Assistant"
              description="An intelligent companion that understands your interests and guides your growth. Building connections across everything you save."
            />
          </div>

          <div className="mt-16 bg-white rounded-xl p-8 text-center border border-gray-100 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Save once, benefit forever
            </h2>
            <p className="text-gray-600 mb-8">
              Access and implement your knowledge anywhere, anytime
            </p>
            <div className="flex flex-wrap justify-center gap-8">
              <PlatformCard icon={Laptop} title="Web App" />
              <PlatformCard icon={Phone} title="iOS App" />
              <PlatformCard icon={Smartphone} title="Android App" />
            </div>
          </div>
        </div>
      </main>

      <footer className="text-center py-8 text-gray-500 text-sm border-t border-gray-100 mt-16">
        © 2025 savify.app • All rights reserved
      </footer>
    </div>
  );
};

export default LandingPage;