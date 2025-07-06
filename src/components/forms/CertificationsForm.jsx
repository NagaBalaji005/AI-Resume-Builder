import React from 'react';
import { Award, Plus, Trash2, Calendar } from 'lucide-react';

const CertificationsForm = ({ resumeData, setResumeData }) => {
  const addCertification = () => {
    const newCertification = {
      id: Date.now().toString(),
      name: '',
      organization: '',
      description: ''
    };

    setResumeData({
      ...resumeData,
      certifications: [...resumeData.certifications, newCertification]
    });
  };

  const updateCertification = (id, field, value) => {
    setResumeData({
      ...resumeData,
      certifications: resumeData.certifications.map(cert =>
        cert.id === id ? { ...cert, [field]: value } : cert
      )
    });
  };

  const removeCertification = (id) => {
    setResumeData({
      ...resumeData,
      certifications: resumeData.certifications.filter(cert => cert.id !== id)
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 flex items-center">
            <Award className="h-5 w-5 mr-2 text-blue-600" />
            Certifications
          </h3>
          <p className="text-gray-600 mt-1">
            Add your professional certifications, licenses, and credentials.
          </p>
        </div>
        <button
          onClick={addCertification}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Certification</span>
        </button>
      </div>

      {resumeData.certifications.length === 0 && (
        <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No certifications added yet</p>
          <button
            onClick={addCertification}
            className="mt-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            Add your first certification
          </button>
        </div>
      )}

      {resumeData.certifications.map((cert, index) => (
        <div key={cert.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-medium text-gray-900">
              Certification #{index + 1}
            </h4>
            <button
              onClick={() => removeCertification(cert.id)}
              className="text-red-600 hover:text-red-700 p-2"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Certification Name *
              </label>
              <input
                type="text"
                value={cert.name}
                onChange={(e) => updateCertification(cert.id, 'name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="AWS Certified Solutions Architect"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Issuing Organization *
              </label>
              <input
                type="text"
                value={cert.organization}
                onChange={(e) => updateCertification(cert.id, 'organization', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Amazon Web Services"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description (Optional)
              </label>
              <textarea
                value={cert.description}
                onChange={(e) => updateCertification(cert.id, 'description', e.target.value)}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Brief description of the certification and its relevance..."
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CertificationsForm;