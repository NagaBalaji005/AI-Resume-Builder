import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TemplateSelection from './components/TemplateSelection';
import UserInformation from './components/UserInformation';
import ATSRefining from './components/ATSRefining';
import FinalResume from './components/FinalResume';
import Footer from './components/Footer';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { api } from './services/api';

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      name: '',
      title: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      portfolio: '',
      summary: ''
    },
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: [],
    achievements: [],
    languages: [],
    interests: []
  });

  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [authMode, setAuthMode] = useState('signin'); // 'signin' or 'signup'
  const [showAuthPage, setShowAuthPage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check authentication on app startup
  useEffect(() => {
    const checkAuthentication = async () => {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');

      if (token && user) {
        try {
          // Verify token with backend
          const userData = JSON.parse(user);
          setIsAuthenticated(true);
          setCurrentUser(userData);
        } catch (error) {
          console.error('Authentication check failed:', error);
          // Clear invalid data
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setIsAuthenticated(false);
          setCurrentUser(null);
        }
      }
      setIsLoading(false);
    };

    checkAuthentication();
  }, []);

  const handleTemplateSelect = (template) => {
    if (!isAuthenticated) {
      setSelectedTemplate(template);
      setShowAuthPage(true);
      return;
    }
    setSelectedTemplate(template);
    setCurrentStep(2);
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSignIn = (user) => {
    setIsAuthenticated(true);
    setCurrentUser(user);
    setShowAuthPage(false);
    // If a template was selected before authentication, proceed to step 2
    if (selectedTemplate) {
      setCurrentStep(2);
    }
  };

  const handleSignUp = (user) => {
    setIsAuthenticated(true);
    setCurrentUser(user);
    setShowAuthPage(false);
    // If a template was selected before authentication, proceed to step 2
    if (selectedTemplate) {
      setCurrentStep(2);
    }
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setCurrentStep(1);
    setSelectedTemplate(null);
    setResumeData({
      personalInfo: {
        name: '',
        title: '',
        email: '',
        phone: '',
        location: '',
        linkedin: '',
        portfolio: '',
        summary: ''
      },
      experience: [],
      education: [],
      skills: [],
      projects: [],
      certifications: [],
      achievements: [],
      languages: [],
      interests: []
    });
    // Clear localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const switchToSignUp = () => {
    setAuthMode('signup');
  };

  const switchToSignIn = () => {
    setAuthMode('signin');
  };

  const handleBackToMain = () => {
    setShowAuthPage(false);
    setSelectedTemplate(null);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <TemplateSelection onTemplateSelect={handleTemplateSelect} />;
      case 2:
        return (
          <UserInformation
            resumeData={resumeData}
            setResumeData={setResumeData}
            selectedTemplate={selectedTemplate}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 3:
        return (
          <ATSRefining
            resumeData={resumeData}
            setResumeData={setResumeData}
            onNext={handleNext}
            onPrevious={handlePrevious}
            selectedTemplate={selectedTemplate}
          />
        );
      case 4:
        return (
          <FinalResume
            resumeData={resumeData}
            selectedTemplate={selectedTemplate}
            onPrevious={handlePrevious}
          />
        );
      default:
        return <TemplateSelection onTemplateSelect={handleTemplateSelect} />;
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show authentication pages if required
  if (showAuthPage) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {authMode === 'signin' ? (
          <SignIn 
            onSignIn={handleSignIn} 
            onSwitchToSignUp={switchToSignUp}
            onBack={handleBackToMain}
          />
        ) : (
          <SignUp 
            onSignUp={handleSignUp} 
            onSwitchToSignIn={switchToSignIn}
            onBack={handleBackToMain}
          />
        )}
      </div>
    );
  }

  // Render main app
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col">
      <Header 
        currentStep={currentStep} 
        currentUser={currentUser}
        onSignOut={handleSignOut}
        isAuthenticated={isAuthenticated}
        onSignIn={() => setShowAuthPage(true)}
      />
      <main className="flex-1 container mx-auto px-4 py-8">
        {renderStep()}
      </main>
      <Footer />
    </div>
  );
}

export default App;