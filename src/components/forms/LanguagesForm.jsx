import React from 'react';
import { Globe, Plus, Trash2 } from 'lucide-react';

const LanguagesForm = ({ resumeData, setResumeData }) => {
  const addLanguage = () => {
    const newLanguage = {
      id: Date.now().toString(),
      name: '',
      level: 'Beginner'
    };

    setResumeData({
      ...resumeData,
      languages: [...resumeData.languages, newLanguage]
    });
  };

  const updateLanguage = (id, field, value) => {
    setResumeData({
      ...resumeData,
      languages: resumeData.languages.map(language =>
        language.id === id ? { ...language, [field]: value } : language
      )
    });
  };

  const removeLanguage = (id) => {
    setResumeData({
      ...resumeData,
      languages: resumeData.languages.filter(language => language.id !== id)
    });
  };

  const proficiencyLevels = [
    'Beginner',
    'Elementary',
    'Intermediate',
    'Advanced',
    'Fluent',
    'Native'
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 flex items-center">
            <Globe className="h-5 w-5 mr-2 text-blue-600" />
            Languages
          </h3>
          <p className="text-gray-600 mt-1">
            Add the languages you speak and your proficiency level.
          </p>
        </div>
        <button
          onClick={addLanguage}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Language</span>
        </button>
      </div>

      {resumeData.languages.length === 0 && (
        <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <Globe className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No languages added yet</p>
          <button
            onClick={addLanguage}
            className="mt-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            Add your first language
          </button>
        </div>
      )}

      {resumeData.languages.map((language, index) => (
        <div key={language.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-medium text-gray-900">
              Language #{index + 1}
            </h4>
            <button
              onClick={() => removeLanguage(language.id)}
              className="text-red-600 hover:text-red-700 p-2"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Language *
              </label>
              <input
                type="text"
                value={language.name}
                onChange={(e) => updateLanguage(language.id, 'name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="English"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Proficiency Level *
              </label>
              <select
                value={language.level}
                onChange={(e) => updateLanguage(language.id, 'level', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {proficiencyLevels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LanguagesForm;