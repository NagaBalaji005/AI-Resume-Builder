import React, { useState } from 'react';
import { FileText, Zap, User, LogOut, ChevronDown, LogIn } from 'lucide-react';

const Header = ({ currentStep, currentUser, onSignOut, isAuthenticated, onSignIn }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  const steps = [
    { number: 1, title: 'Template Selection', description: 'Choose your design' },
    { number: 2, title: 'Information', description: 'Enter your details' },
    { number: 3, title: 'ATS Optimization', description: 'AI-powered refinement' },
    { number: 4, title: 'Final Resume', description: 'Download & preview' }
  ];

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    onSignOut();
    setIsProfileOpen(false);
  };

  return (
    <header className="bg-white shadow-lg border-b border-gray-200 w-full overflow-x-hidden">
      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-6 w-full max-w-full">
        <div className="flex flex-col sm:flex-row items-center w-full mb-6 sm:mb-8 text-center">
          <div className="flex-1 flex flex-col sm:flex-row items-center justify-center sm:justify-start">
            {/* Brand */}
            <div className="flex items-center space-x-1">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <FileText className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">AI Resume Builder</h1>
                <p className="text-gray-600 flex items-center gap-1">
                  <Zap className="h-4 w-4 text-yellow-500" />
                  ATS-Optimized Professional Resumes
                </p>
              </div>
            </div>
          </div>
          {/* Profile Section */}
          <div className="w-full sm:w-auto flex justify-center sm:justify-end mt-4 sm:mt-0">
            {isAuthenticated && currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">{currentUser.username}</span>
                  <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                </button>
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{currentUser.username}</p>
                      <p className="text-xs text-gray-500">{currentUser.email}</p>
                    </div>
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onSignIn}
                className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <LogIn className="h-4 w-4" />
                <span className="font-medium">Sign In</span>
              </button>
            )}
          </div>
        </div>
        {/* Centered Stepper */}
        <div className="flex items-center justify-center w-full overflow-x-auto scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-blue-50">
          <div className="flex items-center space-x-4 sm:space-x-8 max-w-full w-full px-1 sm:px-0 justify-center min-w-[340px]">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 ${
                    currentStep >= step.number
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {step.number}
                </div>
                <div className="mt-2 text-center">
                    <p className={`text-sm font-medium ${currentStep >= step.number ? 'text-blue-600' : 'text-gray-500'}`}>{step.title}</p>
                  <p className="text-xs text-gray-400">{step.description}</p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`w-16 h-1 mx-4 transition-all duration-300 ${
                    currentStep > step.number ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
