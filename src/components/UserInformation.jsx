import React, { useState } from 'react';
import PersonalInfoForm from './forms/PersonalInfoForm';
import ExperienceForm from './forms/ExperienceForm';
import EducationForm from './forms/EducationForm';
import SkillsForm from './forms/SkillsForm';
import ProjectsForm from './forms/ProjectsForm';
import CertificationsForm from './forms/CertificationsForm';
import AchievementsForm from './forms/AchievementsForm';
import LanguagesForm from './forms/LanguagesForm';
import InterestsForm from './forms/InterestsForm';
import TimeManagementForm from './forms/TimeManagementForm';
import { ChevronLeft, ChevronRight, User, Briefcase, GraduationCap, Code, FolderOpen, Award, Trophy, Globe, Heart, Clock, FileText } from 'lucide-react';

const UserInformation = ({ resumeData, setResumeData, selectedTemplate, onNext, onPrevious }) => {
  const [activeSection, setActiveSection] = useState('personal');

  // Template-specific required sections
  const getTemplateSections = () => {
    const baseSections = [
      { id: 'personal', title: 'Personal Info', icon: User, required: true }
    ];

    switch (selectedTemplate) {
      case 'creative':
        return [
          ...baseSections,
          { id: 'experience', title: 'Experience', icon: Briefcase, required: true },
          { id: 'skills', title: 'Skills', icon: Code, required: true },
          { id: 'achievements', title: 'Achievements', icon: Trophy, required: true },
          { id: 'certifications', title: 'Certifications', icon: Award, required: true },
          { id: 'education', title: 'Education', icon: GraduationCap, required: true },
          { id: 'interests', title: 'Interests', icon: Heart, required: true },
          { id: 'additional-info', title: 'Additional Information', icon: FileText, required: false }
        ];
      
      case 'modern-tech':
        return [
          ...baseSections,
          { id: 'experience', title: 'Experience', icon: Briefcase, required: true },
          { id: 'projects', title: 'Projects', icon: FolderOpen, required: true },
          { id: 'achievements', title: 'Achievements', icon: Trophy, required: true },
          { id: 'skills', title: 'Skills', icon: Code, required: true },
          { id: 'education', title: 'Education', icon: GraduationCap, required: true },
          { id: 'additional-info', title: 'Additional Information', icon: FileText, required: false }
        ];
      
      case 'professional-executive':
        return [
          ...baseSections,
          { id: 'experience', title: 'Experience', icon: Briefcase, required: true },
          { id: 'education', title: 'Education', icon: GraduationCap, required: true },
          { id: 'languages', title: 'Languages', icon: Globe, required: true },
          { id: 'certifications', title: 'Certifications', icon: Award, required: true },
          { id: 'achievements', title: 'Achievements', icon: Trophy, required: true },
          { id: 'skills', title: 'Skills', icon: Code, required: true },
          { id: 'time-management', title: 'My Time', icon: Clock, required: true },
          { id: 'additional-info', title: 'Additional Information', icon: FileText, required: false }
        ];
      
      case 'student':
        return [
          ...baseSections,
          { id: 'education', title: 'Education', icon: GraduationCap, required: true },
          { id: 'projects', title: 'Projects', icon: FolderOpen, required: true },
          { id: 'skills', title: 'Skills', icon: Code, required: true },
          { id: 'certifications', title: 'Certifications', icon: Award, required: true },
          { id: 'achievements', title: 'Achievements', icon: Trophy, required: true },
          { id: 'interests', title: 'Interests', icon: Heart, required: true },
          { id: 'additional-info', title: 'Additional Information', icon: FileText, required: false }
        ];
      
      default:
        return baseSections;
    }
  };

  const sections = getTemplateSections();

  const renderForm = () => {
    switch (activeSection) {
      case 'personal':
        return <PersonalInfoForm resumeData={resumeData} setResumeData={setResumeData} selectedTemplate={selectedTemplate} />;
      case 'experience':
        return <ExperienceForm resumeData={resumeData} setResumeData={setResumeData} />;
      case 'education':
        return <EducationForm resumeData={resumeData} setResumeData={setResumeData} />;
      case 'skills':
        return <SkillsForm resumeData={resumeData} setResumeData={setResumeData} />;
      case 'projects':
        return <ProjectsForm resumeData={resumeData} setResumeData={setResumeData} />;
      case 'certifications':
        return <CertificationsForm resumeData={resumeData} setResumeData={setResumeData} />;
      case 'achievements':
        return <AchievementsForm resumeData={resumeData} setResumeData={setResumeData} />;
      case 'languages':
        return <LanguagesForm resumeData={resumeData} setResumeData={setResumeData} />;
      case 'interests':
        return <InterestsForm resumeData={resumeData} setResumeData={setResumeData} />;
      case 'time-management':
        return <TimeManagementForm resumeData={resumeData} setResumeData={setResumeData} />;
      case 'additional-info':
        return (
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Additional Information</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Information (Optional)
                </label>
                <textarea
                  value={resumeData.additionalInfo || ''}
                  onChange={e => setResumeData({ ...resumeData, additionalInfo: e.target.value })}
                  rows={8}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Add any additional information you'd like to include in your resume..."
                />
                <p className="text-sm text-gray-500 mt-2">
                  This section will appear at the bottom of your resume. You can include awards, volunteer work, or any other relevant information.
                </p>
              </div>
            </div>
          </div>
        );
      default:
        return <PersonalInfoForm resumeData={resumeData} setResumeData={setResumeData} selectedTemplate={selectedTemplate} />;
    }
  };

  const isFormValid = () => {
    const { personalInfo, experience, education, skills } = resumeData;
    const basicValid = personalInfo.name && personalInfo.email && personalInfo.phone && personalInfo.summary;
    
    // Template-specific validation
    switch (selectedTemplate) {
      case 'creative':
        return basicValid && experience.length > 0 && education.length > 0 && skills.length > 0;
      case 'modern-tech':
        return basicValid && experience.length > 0 && education.length > 0 && skills.length > 0;
      case 'professional-executive':
        return basicValid && experience.length > 0 && education.length > 0 && skills.length > 0;
      case 'student':
        return basicValid && education.length > 0 && skills.length > 0;
      default:
        return basicValid && experience.length > 0 && education.length > 0 && skills.length > 0;
    }
  };

  return (
    <div className="max-w-7xl mx-auto w-full px-2 sm:px-4 overflow-x-hidden">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Tell Us About Yourself</h2>
        <p className="text-lg text-gray-600">
          Fill in your information to create a personalized, ATS-optimized resume
        </p>
        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800">
            <strong>Selected Template:</strong> {selectedTemplate?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </p>
          <p className="text-xs text-blue-600 mt-1">
            Required sections are marked for this template
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-8 w-full max-w-full">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1 mb-4 lg:mb-0">
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 sticky top-8 w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Resume Sections</h3>
            <nav className="space-y-2">
              {sections.map((section) => {
                const IconComponent = section.icon;
                const isActive = activeSection === section.id;
                const isCompleted = section.id === 'personal' ? 
                  resumeData.personalInfo.name && resumeData.personalInfo.email :
                  section.id === 'experience' ? resumeData.experience.length > 0 :
                  section.id === 'education' ? resumeData.education.length > 0 :
                  section.id === 'skills' ? resumeData.skills.length > 0 :
                  section.id === 'projects' ? resumeData.projects.length > 0 :
                  section.id === 'certifications' ? resumeData.certifications.length > 0 :
                  section.id === 'achievements' ? resumeData.achievements.length > 0 :
                  section.id === 'languages' ? resumeData.languages.length > 0 :
                  section.id === 'interests' ? resumeData.interests.length > 0 :
                  section.id === 'time-management' ? resumeData.timeManagement && resumeData.timeManagement.length > 0 :
                  section.id === 'additional-info' ? resumeData.additionalInfo :
                  true;

                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <IconComponent className="h-5 w-5" />
                    <div className="flex-1">
                      <span className="font-medium">{section.title}</span>
                      {section.required && (
                        <span className="text-xs opacity-75 block">Required</span>
                      )}
                    </div>
                    {isCompleted && (
                      <div className="w-2 h-2 bg-green-400 rounded-full" />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Form Area */}
        <div className="lg:col-span-3 w-full">
          <div className="bg-white rounded-xl shadow-lg p-8">
            {renderForm()}
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-2 sm:gap-0 w-full">
        <button
          onClick={onPrevious}
          className="w-full sm:w-auto flex items-center justify-center px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
        >
          <span>Previous</span>
        </button>
        <button
          onClick={onNext}
          className="w-full sm:w-auto flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          <span>Next</span>
        </button>
      </div>
    </div>
  );
};

export default UserInformation;
