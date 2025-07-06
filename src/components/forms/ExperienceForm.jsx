import React from 'react';
import { Briefcase, Plus, Trash2, Calendar, MapPin } from 'lucide-react';

const ExperienceForm = ({ resumeData, setResumeData }) => {
  const addExperience = () => {
    const newExperience = {
      id: Date.now().toString(),
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      achievements: ['']
    };

    setResumeData({
      ...resumeData,
      experience: [...resumeData.experience, newExperience]
    });
  };

  const updateExperience = (id, field, value) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    });
  };

  const removeExperience = (id) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.filter(exp => exp.id !== id)
    });
  };

  const addAchievement = (expId) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.map(exp =>
        exp.id === expId 
          ? { ...exp, achievements: [...exp.achievements, ''] }
          : exp
      )
    });
  };

  const updateAchievement = (expId, index, value) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.map(exp =>
        exp.id === expId 
          ? { 
              ...exp, 
              achievements: exp.achievements.map((ach, i) => i === index ? value : ach)
            }
          : exp
      )
    });
  };

  const removeAchievement = (expId, index) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.map(exp =>
        exp.id === expId 
          ? { 
              ...exp, 
              achievements: exp.achievements.filter((_, i) => i !== index)
            }
          : exp
      )
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 flex items-center">
            <Briefcase className="h-5 w-5 mr-2 text-blue-600" />
            Work Experience
          </h3>
          <p className="text-gray-600 mt-1">
            Add your work experience, starting with the most recent position.
          </p>
        </div>
        <button
          onClick={addExperience}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Experience</span>
        </button>
      </div>

      {resumeData.experience.length === 0 && (
        <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No work experience added yet</p>
          <button
            onClick={addExperience}
            className="mt-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            Add your first experience
          </button>
        </div>
      )}

      {resumeData.experience.map((exp, index) => (
        <div key={exp.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-medium text-gray-900">
              Experience #{index + 1}
            </h4>
            {resumeData.experience.length > 1 && (
              <button
                onClick={() => removeExperience(exp.id)}
                className="text-red-600 hover:text-red-700 p-2"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Title *
              </label>
              <input
                type="text"
                value={exp.title}
                onChange={(e) => updateExperience(exp.id, 'title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Software Engineer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company *
              </label>
              <input
                type="text"
                value={exp.company}
                onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Tech Company Inc."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="h-4 w-4 inline mr-1" />
                Location
              </label>
              <input
                type="text"
                value={exp.location}
                onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="San Francisco, CA"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="h-4 w-4 inline mr-1" />
                Start Date *
              </label>
              <input
                type="month"
                value={exp.startDate}
                onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="md:col-span-2">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={exp.current}
                    onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">I currently work here</span>
                </label>
                {!exp.current && (
                  <div className="w-full sm:w-auto">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      End Date *
                    </label>
                    <input
                      type="month"
                      value={exp.endDate}
                      onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Description
            </label>
            <textarea
              value={exp.description}
              onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Brief description of your role and responsibilities..."
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-medium text-gray-700">
                Key Achievements & Responsibilities
              </label>
              <button
                onClick={() => addAchievement(exp.id)}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                + Add Achievement
              </button>
            </div>
            {exp.achievements.map((achievement, achIndex) => (
              <div key={achIndex} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mb-2 w-full">
                <input
                  type="text"
                  value={achievement}
                  onChange={(e) => updateAchievement(exp.id, achIndex, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
                  placeholder="Key achievement or responsibility"
                />
                {exp.achievements.length > 1 && (
                  <button
                    onClick={() => removeAchievement(exp.id, achIndex)}
                    className="text-red-600 hover:text-red-700 p-2 w-full sm:w-auto"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExperienceForm;
