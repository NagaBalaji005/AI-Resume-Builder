import React from 'react';
import { Eye, Star, Briefcase, GraduationCap, Palette } from 'lucide-react';
import creativeTemplate from '../assets/creative.png';
import modernTechTemplate from '../assets/modern-tech.png';
import professionalExecutiveTemplate from '../assets/professional-executive.png';
import studentTemplate from '../assets/student.png';

const TemplateSelection = ({ onTemplateSelect }) => {
  const templates = [
    {
      id: 'creative',
      name: 'Creative Professional',
      description: 'Perfect for creative roles with vibrant design elements',
      icon: Palette,
      color: 'from-orange-500 to-red-500',
      features: ['Creative Layout', 'Color Accents', 'Visual Elements'],
      image: creativeTemplate
    },
    {
      id: 'modern-tech',
      name: 'Modern Tech',
      description: 'Clean, technical design ideal for tech professionals',
      icon: Briefcase,
      color: 'from-blue-500 to-indigo-600',
      features: ['Clean Design', 'Technical Focus', 'Project Showcase'],
      image: modernTechTemplate
    },
    {
      id: 'professional-executive',
      name: 'Executive Professional',
      description: 'Sophisticated design for senior-level positions',
      icon: Star,
      color: 'from-gray-700 to-gray-900',
      features: ['Executive Style', 'Achievement Focus', 'Premium Look'],
      image: professionalExecutiveTemplate
    },
    {
      id: 'student',
      name: 'Student & Entry Level',
      description: 'Academic-focused template for students and new graduates',
      icon: GraduationCap,
      color: 'from-green-500 to-teal-600',
      features: ['Academic Focus', 'Project Emphasis', 'Clean Layout'],
      image: studentTemplate
    }
  ];

  return (
    <div className="max-w-7xl mx-auto w-full px-2 sm:px-4 overflow-x-hidden">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Perfect Template</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto px-2 sm:px-0">
          Select from our professionally designed, ATS-optimized templates. Each template is crafted to help you stand out while ensuring compatibility with applicant tracking systems.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-full w-full mx-auto">
        {templates.map((template) => {
          const IconComponent = template.icon;
          return (
            <div
              key={template.id}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border border-gray-100 w-full"
              onClick={() => onTemplateSelect(template.id)}
            >
              <div className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2 sm:gap-0">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-xl bg-gradient-to-r ${template.color} shadow-lg`}>
                      <IconComponent className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {template.name}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                    </div>
                  </div>
                  <Eye className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors hidden sm:block" />
                </div>

                <div className="mb-4">
                  <div className="bg-gray-50 rounded-lg p-2 sm:p-3 h-48 sm:h-96 flex items-center justify-center border-2 border-gray-200 overflow-hidden w-full">
                    <img 
                      src={template.image} 
                      alt={`${template.name} template preview`}
                      className="w-full h-auto max-h-40 sm:max-h-96 object-contain rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900 text-sm">Key Features:</h4>
                  <div className="flex flex-wrap gap-1">
                    {template.features.map((feature, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          );
        })}
      </div>

      <div className="mt-12 text-center">
        <div className="bg-blue-50 rounded-2xl p-4 sm:p-8 border border-blue-100 w-full max-w-full">
          <h3 className="text-2xl font-bold text-blue-900 mb-4">Why Our Templates Work</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-lg mx-auto mb-3 flex items-center justify-center">
                <Star className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-semibold text-blue-900 mb-2">ATS Optimized</h4>
              <p className="text-blue-700 text-sm">Designed to pass through applicant tracking systems</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-lg mx-auto mb-3 flex items-center justify-center">
                <Eye className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-semibold text-blue-900 mb-2">Recruiter Approved</h4>
              <p className="text-blue-700 text-sm">Layouts preferred by hiring managers</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-lg mx-auto mb-3 flex items-center justify-center">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-semibold text-blue-900 mb-2">Industry Tested</h4>
              <p className="text-blue-700 text-sm">Proven success across various industries</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateSelection;
