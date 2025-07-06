import React from 'react';
import { FolderOpen, Plus, Trash2, ExternalLink } from 'lucide-react';

const ProjectsForm = ({ resumeData, setResumeData }) => {
  const addProject = () => {
    const newProject = {
      id: Date.now().toString(),
      title: '',
      technologies: '',
      description: '',
      achievements: [''],
      link: '',
      linkDisplayName: ''
    };

    setResumeData({
      ...resumeData,
      projects: [...resumeData.projects, newProject]
    });
  };

  const updateProject = (id, field, value) => {
    setResumeData({
      ...resumeData,
      projects: resumeData.projects.map(project =>
        project.id === id ? { ...project, [field]: value } : project
      )
    });
  };

  const removeProject = (id) => {
    setResumeData({
      ...resumeData,
      projects: resumeData.projects.filter(project => project.id !== id)
    });
  };

  const addAchievement = (projectId) => {
    setResumeData({
      ...resumeData,
      projects: resumeData.projects.map(project =>
        project.id === projectId 
          ? { ...project, achievements: [...project.achievements, ''] }
          : project
      )
    });
  };

  const updateAchievement = (projectId, index, value) => {
    setResumeData({
      ...resumeData,
      projects: resumeData.projects.map(project =>
        project.id === projectId 
          ? { 
              ...project, 
              achievements: project.achievements.map((ach, i) => i === index ? value : ach)
            }
          : project
      )
    });
  };

  const removeAchievement = (projectId, index) => {
    setResumeData({
      ...resumeData,
      projects: resumeData.projects.map(project =>
        project.id === projectId 
          ? { 
              ...project, 
              achievements: project.achievements.filter((_, i) => i !== index)
            }
          : project
      )
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 flex items-center">
            <FolderOpen className="h-5 w-5 mr-2 text-blue-600" />
            Projects
          </h3>
          <p className="text-gray-600 mt-1">
            Showcase your personal projects, open source contributions, or significant work projects.
          </p>
        </div>
        <button
          onClick={addProject}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Project</span>
        </button>
      </div>

      {resumeData.projects.length === 0 && (
        <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <FolderOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No projects added yet</p>
          <button
            onClick={addProject}
            className="mt-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            Add your first project
          </button>
        </div>
      )}

      {resumeData.projects.map((project, index) => (
        <div key={project.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-medium text-gray-900">
              Project #{index + 1}
            </h4>
            <button
              onClick={() => removeProject(project.id)}
              className="text-red-600 hover:text-red-700 p-2"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Title *
              </label>
              <input
                type="text"
                value={project.title}
                onChange={(e) => updateProject(project.id, 'title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="E-commerce Website"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Technologies Used *
              </label>
              <input
                type="text"
                value={project.technologies}
                onChange={(e) => updateProject(project.id, 'technologies', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="React, Node.js, MongoDB"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <ExternalLink className="h-4 w-4 inline mr-1" />
                Project Link (Optional)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={project.linkDisplayName || ''}
                  onChange={(e) => updateProject(project.id, 'linkDisplayName', e.target.value)}
                  className="w-1/3 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Display Name (e.g. GitHub)"
                />
              <input
                type="url"
                value={project.link}
                onChange={(e) => updateProject(project.id, 'link', e.target.value)}
                  className="w-2/3 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://github.com/username/project"
              />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project Description *
            </label>
            <textarea
              value={project.description}
              onChange={(e) => updateProject(project.id, 'description', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Brief description of what the project does and its purpose..."
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-medium text-gray-700">
                Key Features & Achievements
              </label>
              <button
                onClick={() => addAchievement(project.id)}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                + Add Feature
              </button>
            </div>
            {project.achievements.map((achievement, achIndex) => (
              <div key={achIndex} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mb-2 w-full">
                <input
                  type="text"
                  value={achievement}
                  onChange={(e) => updateAchievement(project.id, achIndex, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
                  placeholder="Key feature or achievement"
                />
                {project.achievements.length > 1 && (
                  <button
                    onClick={() => removeAchievement(project.id, achIndex)}
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

export default ProjectsForm;
