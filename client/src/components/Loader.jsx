 import React , {useEffect} from 'react';
 import {useAppContext} from '../context/AppContext';
 import {useParams} from 'react-router-dom';

const Loader = () => {
    const {navigate} = useAppContext();
    const {nextUrl} = useParams();
    useEffect(()=>{
        if(nextUrl){
            setTimeout(()=>{
                navigate(`/${nextUrl}`)
            },8000)
        }
    },[nextUrl])
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 ">
      {/* Main Loader Card */}
      <div className="flex flex-col items-center space-y-6 p-10 bg-white rounded-3xl shadow-2xl max-w-xs w-full border border-gray-100 transform transition-all animate-fadeIn">
        
        {/* Animated Morphing Circle (SVG) */}
        <div className="relative">
          <svg
            className="w-16 h-16 animate-spin"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="20"
              cy="20"
              r="18"
              stroke="#1e40af"
              strokeWidth="4"
              className="opacity-20"
            />
            <path
              d="M20 2a18 18 0 0 1 18 18"
              stroke="url(#gradient)"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" /> {/* Gold */}
                <stop offset="100%" stopColor="#1d4ed8" /> {/* Blue */}
              </linearGradient>
            </defs>
          </svg>

          {/* Center sparkle effect */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 bg-gradient-to-t from-yellow-200 to-yellow-100 rounded-full shadow-inner animate-ping"></div>
          </div>
        </div>

        {/* Loader Text */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 bg-clip-text text-transparent">
            Almost There
          </h2>
          <p className="text-gray-600 text-sm leading-tight animate-typing overflow-hidden whitespace-nowrap border-r-2 border-gray-400 pr-1">
            Finding your perfect getaway...
          </p>
        </div>

        {/* Decorative Dots */}
        <div className="flex space-x-2 pt-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="w-2.5 h-2.5 bg-gradient-to-t from-blue-400 to-blue-200 rounded-full animate-bounce opacity-70"
              style={{
                animationDelay: `${i * 0.2}s`,
                animationDuration: '1.2s',
              }}
            ></div>
          ))}
        </div>

        {/* Optional: Mini room icons */}
        <div className="flex space-x-1 mt-4 opacity-40">
          <div className="w-3 h-3 border-2 border-blue-300 rounded-sm flex items-center justify-center">
            <div className="w-1 h-1 bg-blue-500 rounded-sm"></div>
          </div>
          <div className="w-3 h-3 border-2 border-purple-300 rounded-sm flex items-center justify-center">
            <div className="w-1 h-1 bg-purple-500 rounded-sm"></div>
          </div>
          <div className="w-3 h-3 border-2 border-amber-300 rounded-sm flex items-center justify-center">
            <div className="w-1 h-1 bg-amber-500 rounded-sm"></div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes typing {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        .animate-typing {
          animation: typing 2.5s steps(30) infinite, blink-caret 0.75s step-end infinite;
        }
        @keyframes blink-caret {
          from, to {
            border-color: transparent;
          }
          50% {
            border-color: #6b7280;
          }
        }
      `}</style>
    </div>
  );
};

export default Loader;