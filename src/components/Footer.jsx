import React, { useState } from 'react';
import { FileText, Heart, Star, Users, Zap } from 'lucide-react';
import ContactModal from './ContactModal';

const Footer = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('help');

  const openModal = (type) => {
    setModalType(type);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <footer className="bg-gray-900 text-white w-full overflow-x-hidden">
      <div className="container mx-auto px-2 sm:px-4 py-8 sm:py-12 w-full max-w-full">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-8 w-full max-w-full">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">AI Resume Builder</h3>
                <p className="text-gray-400 text-sm">ATS-Optimized Resumes</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Create professional, ATS-optimized resumes with our AI-powered platform. 
              Stand out from the competition and land your dream job.
            </p>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Features</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="flex items-center space-x-2">
                <Zap className="h-4 w-4 text-yellow-500" />
                <span>AI-Powered Optimization</span>
              </li>
              <li className="flex items-center space-x-2">
                <Star className="h-4 w-4 text-yellow-500" />
                <span>ATS-Friendly Templates</span>
              </li>
              <li className="flex items-center space-x-2">
                <FileText className="h-4 w-4 text-blue-500" />
                <span>Professional Designs</span>
              </li>
              <li className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-green-500" />
                <span>Industry Tested</span>
              </li>
            </ul>
          </div>

          {/* Templates */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Templates</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Creative Professional</li>
              <li>Modern Tech</li>
              <li>Executive Professional</li>
              <li>Student & Entry Level</li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <button 
                  onClick={() => openModal('help')}
                  className="hover:text-white transition-colors text-left"
                >
                  Help Center
                </button>
              </li>
              <li>
                <a href="https://www.coursera.org/articles/resume-tips" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Resume Tips
                </a>
              </li>
              <li>
                <a href="https://www.jobscan.co/blog/20-ats-friendly-resume-templates/?utm_source=chatgpt.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  ATS Guide
                </a>
              </li>
              <li>
                <button 
                  onClick={() => openModal('contact')}
                  className="hover:text-white transition-colors text-left"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Stats Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-6 text-center w-full max-w-full">
            <div>
              <div className="text-2xl font-bold text-blue-400">10K+</div>
              <div className="text-gray-400 text-sm">Resumes Created</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-400">92%</div>
              <div className="text-gray-400 text-sm">ATS Pass Rate</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-400">4.1/5</div>
              <div className="text-gray-400 text-sm">User Rating</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-400">24/7</div>
              <div className="text-gray-400 text-sm">Support Available</div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center w-full max-w-full">
          <div className="text-gray-400 text-sm">
            ©2025 Naga Balaji's AI Resume Builder. All rights reserved. Made with ❤️ for job seekers worldwide.
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      <ContactModal 
        isOpen={modalOpen} 
        onClose={closeModal} 
        type={modalType} 
      />
    </footer>
  );
};

export default Footer;
