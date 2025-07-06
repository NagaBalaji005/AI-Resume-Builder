import React from 'react';
import { X, Mail, Phone, MapPin, Linkedin, Clock } from 'lucide-react';

const ContactModal = ({ isOpen, onClose, type }) => {
  if (!isOpen) return null;

  const helpCenterContent = (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Help Center</h3>
      <p className="text-gray-600 mb-4">
        Need assistance with our AI Resume Builder? We're here to help you create the perfect resume.
      </p>
      
      <div className="space-y-3">
        <div className="flex items-center space-x-3">
          <Mail className="h-5 w-5 text-blue-600" />
          <div>
            <p className="font-medium text-gray-900">Email Support</p>
            <p className="text-gray-600">support@airesumebuilder.com</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Phone className="h-5 w-5 text-green-600" />
          <div>
            <p className="font-medium text-gray-900">Phone Support</p>
            <p className="text-gray-600">+1 (555) 123-4567</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Clock className="h-5 w-5 text-purple-600" />
          <div>
            <p className="font-medium text-gray-900">Support Hours</p>
            <p className="text-gray-600">Monday-Friday, 9AM-6PM EST</p>
          </div>
        </div>
      </div>
      
      <div className="bg-blue-50 p-4 rounded-lg mt-4">
        <p className="text-sm text-blue-800">
          <strong>Quick Tips:</strong> Make sure to save your progress frequently and use our ATS optimization feature for better results.
        </p>
      </div>
    </div>
  );

  const contactUsContent = (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Us</h3>
      <p className="text-gray-600 mb-4">
        Get in touch with Naga Balaji for any inquiries about our AI Resume Builder platform.
      </p>
      
      <div className="space-y-3">
        <div className="flex items-center space-x-3">
          <Mail className="h-5 w-5 text-blue-600" />
          <div>
            <p className="font-medium text-gray-900">Email</p>
            <p className="text-gray-600">adapala.nagabalaji005@gmail.com</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Phone className="h-5 w-5 text-green-600" />
          <div>
            <p className="font-medium text-gray-900">Phone</p>
            <p className="text-gray-600">+1 (555) 987-6543</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Linkedin className="h-5 w-5 text-blue-700" />
          <div>
            <p className="font-medium text-gray-900">LinkedIn</p>
            <a 
              href="https://www.linkedin.com/in/adapala-naga-balaji-339b4131a" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              www.linkedin.com/in/adapala-naga-balaji-339b4131a
            </a>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <MapPin className="h-5 w-5 text-red-600" />
          <div>
            <p className="font-medium text-gray-900">Address</p>
            <p className="text-gray-600">123 Innovation Drive, Tech City, TC 12345</p>
          </div>
        </div>
      </div>
      
      <div className="bg-green-50 p-4 rounded-lg mt-4">
        <p className="text-sm text-green-800">
          <strong>Business Inquiries:</strong> For partnership opportunities, email us at business@airesumebuilder.com
        </p>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            {type === 'help' ? 'Help Center' : 'Contact Us'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="p-6">
          {type === 'help' ? helpCenterContent : contactUsContent}
        </div>
        
        <div className="flex justify-end p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactModal; 