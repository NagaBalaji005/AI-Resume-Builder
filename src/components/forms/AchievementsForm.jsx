import React from 'react';
import { Trophy, Plus, Trash2 } from 'lucide-react';

const AchievementsForm = ({ resumeData, setResumeData }) => {
  const addAchievement = () => {
    const newAchievement = {
      id: Date.now().toString(),
      title: '',
      description: '',
      icon: '🏆'
    };

    setResumeData({
      ...resumeData,
      achievements: [...resumeData.achievements, newAchievement]
    });
  };

  const updateAchievement = (id, field, value) => {
    setResumeData({
      ...resumeData,
      achievements: resumeData.achievements.map(achievement =>
        achievement.id === id ? { ...achievement, [field]: value } : achievement
      )
    });
  };

  const removeAchievement = (id) => {
    setResumeData({
      ...resumeData,
      achievements: resumeData.achievements.filter(achievement => achievement.id !== id)
    });
  };

  const iconOptions = ['🏆', '🥇', '⭐', '🎯', '💡', '🚀', '📈', '🔥', '💎', '⚡'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 flex items-center">
            <Trophy className="h-5 w-5 mr-2 text-blue-600" />
            Achievements & Awards
          </h3>
          <p className="text-gray-600 mt-1">
            Highlight your key achievements, awards, and recognitions.
          </p>
        </div>
        <button
          onClick={addAchievement}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Achievement</span>
        </button>
      </div>

      {resumeData.achievements.length === 0 && (
        <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <Trophy className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No achievements added yet</p>
          <button
            onClick={addAchievement}
            className="mt-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            Add your first achievement
          </button>
        </div>
      )}

      {resumeData.achievements.map((achievement, index) => (
        <div key={achievement.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-medium text-gray-900">
              Achievement #{index + 1}
            </h4>
            <button
              onClick={() => removeAchievement(achievement.id)}
              className="text-red-600 hover:text-red-700 p-2"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Achievement Title *
              </label>
              <input
                type="text"
                value={achievement.title}
                onChange={(e) => updateAchievement(achievement.id, 'title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Employee of the Year"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Icon
              </label>
              <div className="flex flex-wrap gap-2">
                {iconOptions.map((icon) => (
                  <button
                    key={icon}
                    onClick={() => updateAchievement(achievement.id, 'icon', icon)}
                    className={`w-10 h-10 rounded-lg border-2 flex items-center justify-center text-lg transition-colors ${
                      achievement.icon === icon
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={achievement.description}
                onChange={(e) => updateAchievement(achievement.id, 'description', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Describe your achievement and its impact..."
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AchievementsForm;