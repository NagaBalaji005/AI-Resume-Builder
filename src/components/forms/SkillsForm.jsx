import React, { useState } from 'react';
import { Code, Plus, X } from 'lucide-react';

const SkillsForm = ({ resumeData, setResumeData }) => {
  const [newSkill, setNewSkill] = useState('');

  const addSkill = () => {
    if (newSkill.trim() && !resumeData.skills.includes(newSkill.trim())) {
      setResumeData({
        ...resumeData,
        skills: [...resumeData.skills, newSkill.trim()]
      });
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setResumeData({
      ...resumeData,
      skills: resumeData.skills.filter(skill => skill !== skillToRemove)
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  const suggestedSkills = [
    'JavaScript', 'Python', 'React', 'Node.js', 'HTML/CSS', 'SQL', 'Git',
    'AWS', 'Docker', 'MongoDB', 'TypeScript', 'Vue.js', 'Angular', 'Java',
    'C++', 'Machine Learning', 'Data Analysis', 'Project Management',
    'Agile/Scrum', 'Leadership', 'Communication', 'Problem Solving'
  ];

  const availableSuggestions = suggestedSkills.filter(
    skill => !resumeData.skills.includes(skill)
  );

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <Code className="h-5 w-5 mr-2 text-blue-600" />
          Skills
        </h3>
        <p className="text-gray-600 mb-6">
          Add your technical and soft skills. Include programming languages, frameworks, tools, and other relevant abilities.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full">
        <input
          type="text"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
          placeholder="Enter a skill (e.g., JavaScript, Project Management)"
        />
        <button
          onClick={addSkill}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 w-full sm:w-auto"
        >
          <Plus className="h-4 w-4" />
          <span>Add</span>
        </button>
      </div>

      {resumeData.skills.length > 0 && (
        <div>
          <h4 className="text-lg font-medium text-gray-900 mb-3">Your Skills</h4>
          <div className="flex flex-wrap gap-2">
            {resumeData.skills.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-2 bg-blue-100 text-blue-800 rounded-lg text-sm font-medium"
              >
                {skill}
                <button
                  onClick={() => removeSkill(skill)}
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  <X className="h-4 w-4" />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {availableSuggestions.length > 0 && (
        <div>
          <h4 className="text-lg font-medium text-gray-900 mb-3">Suggested Skills</h4>
          <div className="flex flex-wrap gap-2">
            {availableSuggestions.slice(0, 12).map((skill, index) => (
              <button
                key={index}
                onClick={() => {
                  setResumeData({
                    ...resumeData,
                    skills: [...resumeData.skills, skill]
                  });
                }}
                className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
              >
                + {skill}
              </button>
            ))}
          </div>
        </div>
      )}

      {resumeData.skills.length === 0 && (
        <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <Code className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No skills added yet</p>
          <p className="text-gray-400 text-sm">Start typing to add your first skill</p>
        </div>
      )}
    </div>
  );
};

export default SkillsForm;
