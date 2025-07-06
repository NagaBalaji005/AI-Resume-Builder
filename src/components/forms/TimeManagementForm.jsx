import React from 'react';
import { Clock, Plus, Trash2, Info } from 'lucide-react';

const TimeManagementForm = ({ resumeData, setResumeData }) => {
  const addTimeActivity = () => {
    const newActivity = {
      id: Date.now().toString(),
      activity: '',
      percentage: 0,
      color: '#2E86AB'
    };

    setResumeData({
      ...resumeData,
      timeManagement: [...(resumeData.timeManagement || []), newActivity]
    });
  };

  const updateTimeActivity = (id, field, value) => {
    setResumeData({
      ...resumeData,
      timeManagement: (resumeData.timeManagement || []).map(activity =>
        activity.id === id ? { ...activity, [field]: value } : activity
      )
    });
  };

  const removeTimeActivity = (id) => {
    setResumeData({
      ...resumeData,
      timeManagement: (resumeData.timeManagement || []).filter(activity => activity.id !== id)
    });
  };

  const colorOptions = ['#2E86AB', '#5DADE2', '#85C1E9', '#AED6F1', '#D6EAF8', '#EBF5FB'];

  const totalPercentage = (resumeData.timeManagement || []).reduce((sum, activity) => sum + (activity.percentage || 0), 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 flex items-center">
            <Clock className="h-5 w-5 mr-2 text-blue-600" />
            My Time Management
          </h3>
          <p className="text-gray-600 mt-1">
            Show how you allocate your time across different activities (for Executive template).
          </p>
        </div>
        <button
          onClick={addTimeActivity}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Activity</span>
        </button>
      </div>

      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
        <div className="flex items-start space-x-3">
          <Info className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-blue-900">Professional Executive Template Only</h4>
            <p className="text-sm text-blue-700 mt-1">
              This section creates a visual time allocation chart that appears only in the Professional Executive template. 
              It shows how you spend your professional time across different activities.
            </p>
          </div>
        </div>
      </div>

      {(!resumeData.timeManagement || resumeData.timeManagement.length === 0) && (
        <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No time activities added yet</p>
          <button
            onClick={addTimeActivity}
            className="mt-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            Add your first activity
          </button>
        </div>
      )}

      {resumeData.timeManagement && resumeData.timeManagement.map((activity, index) => (
        <div key={activity.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-medium text-gray-900">
              Activity #{index + 1}
            </h4>
            <button
              onClick={() => removeTimeActivity(activity.id)}
              className="text-red-600 hover:text-red-700 p-2"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Activity Description *
              </label>
              <input
                type="text"
                value={activity.activity}
                onChange={(e) => updateTimeActivity(activity.id, 'activity', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Product roadmap planning"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time Percentage *
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={activity.percentage}
                onChange={(e) => updateTimeActivity(activity.id, 'percentage', parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="25"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Color
              </label>
              <div className="flex flex-wrap gap-2">
                {colorOptions.map((color) => (
                  <button
                    key={color}
                    onClick={() => updateTimeActivity(activity.id, 'color', color)}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      activity.color === color
                        ? 'border-gray-800 scale-110'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}

      {resumeData.timeManagement && resumeData.timeManagement.length > 0 && (
        <div className={`rounded-lg p-4 border ${
          totalPercentage === 100 ? 'bg-green-50 border-green-200' : 
          totalPercentage > 100 ? 'bg-red-50 border-red-200' : 
          'bg-yellow-50 border-yellow-200'
        }`}>
          <h4 className={`font-semibold mb-2 ${
            totalPercentage === 100 ? 'text-green-900' : 
            totalPercentage > 100 ? 'text-red-900' : 
            'text-yellow-900'
          }`}>
            Time Allocation Summary
          </h4>
          <p className={`text-sm ${
            totalPercentage === 100 ? 'text-green-700' : 
            totalPercentage > 100 ? 'text-red-700' : 
            'text-yellow-700'
          }`}>
            Total percentage: {totalPercentage}%
          </p>
          <p className={`text-xs mt-1 ${
            totalPercentage === 100 ? 'text-green-600' : 
            totalPercentage > 100 ? 'text-red-600' : 
            'text-yellow-600'
          }`}>
            {totalPercentage === 100 ? 'Perfect! Your time allocation adds up to 100%' :
             totalPercentage > 100 ? 'Warning: Total exceeds 100%. Please adjust percentages.' :
             'Note: Consider adding more activities to reach 100% for best visual representation'}
          </p>
        </div>
      )}
    </div>
  );
};

export default TimeManagementForm;