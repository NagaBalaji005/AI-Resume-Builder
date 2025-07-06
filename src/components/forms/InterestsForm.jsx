import React, { useState } from 'react';
import { Heart, Plus, X } from 'lucide-react';

const InterestsForm = ({ resumeData, setResumeData }) => {
  const [newInterest, setNewInterest] = useState('');

  const addInterest = () => {
    if (newInterest.trim() && !resumeData.interests.includes(newInterest.trim())) {
      setResumeData({
        ...resumeData,
        interests: [...resumeData.interests, newInterest.trim()]
      });
      setNewInterest('');
    }
  };

  const removeInterest = (interestToRemove) => {
    setResumeData({
      ...resumeData,
      interests: resumeData.interests.filter(interest => interest !== interestToRemove)
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addInterest();
    }
  };

  const suggestedInterests = [
    'Reading', 'Photography', 'Traveling', 'Cooking', 'Music', 'Sports',
    'Gaming', 'Hiking', 'Yoga', 'Painting', 'Writing', 'Dancing',
    'Volunteering', 'Gardening', 'Technology', 'Movies', 'Fitness', 'Art'
  ];

  const availableSuggestions = suggestedInterests.filter(
    interest => !resumeData.interests.includes(interest)
  );

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <Heart className="h-5 w-5 mr-2 text-blue-600" />
          Interests & Hobbies
        </h3>
        <p className="text-gray-600 mb-6">
          Add your personal interests and hobbies to show your personality and cultural fit.
        </p>
      </div>

      <div className="flex space-x-2">
        <input
          type="text"
          value={newInterest}
          onChange={(e) => setNewInterest(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter an interest or hobby"
        />
        <button
          onClick={addInterest}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add</span>
        </button>
      </div>

      {resumeData.interests.length > 0 && (
        <div>
          <h4 className="text-lg font-medium text-gray-900 mb-3">Your Interests</h4>
          <div className="flex flex-wrap gap-2">
            {resumeData.interests.map((interest, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-2 bg-purple-100 text-purple-800 rounded-lg text-sm font-medium"
              >
                {interest}
                <button
                  onClick={() => removeInterest(interest)}
                  className="ml-2 text-purple-600 hover:text-purple-800"
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
          <h4 className="text-lg font-medium text-gray-900 mb-3">Suggested Interests</h4>
          <div className="flex flex-wrap gap-2">
            {availableSuggestions.slice(0, 12).map((interest, index) => (
              <button
                key={index}
                onClick={() => {
                  setResumeData({
                    ...resumeData,
                    interests: [...resumeData.interests, interest]
                  });
                }}
                className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
              >
                + {interest}
              </button>
            ))}
          </div>
        </div>
      )}

      {resumeData.interests.length === 0 && (
        <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No interests added yet</p>
          <p className="text-gray-400 text-sm">Start typing to add your first interest</p>
        </div>
      )}
    </div>
  );
};

export default InterestsForm;