import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Zap, CheckCircle, AlertCircle, TrendingUp, Target, FileText, BarChart3, Lightbulb } from 'lucide-react';

const ATSRefining = ({ resumeData, setResumeData, onNext, onPrevious, selectedTemplate }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [atsScore, setAtsScore] = useState(0);
  const [detailedAnalysis, setDetailedAnalysis] = useState({});
  const [suggestions, setSuggestions] = useState([]);

  // Template-specific requirements
  const getTemplateRequirements = () => {
    switch (selectedTemplate) {
      case 'creative':
        return {
          requiredSections: ['personal', 'experience', 'skills', 'achievements', 'certifications', 'education', 'interests'],
          optionalSections: ['additional-info'],
          focusAreas: ['creative content', 'visual elements', 'achievements', 'interests'],
          keywords: ['creative', 'design', 'artistic', 'innovation', 'visual', 'portfolio', 'projects']
        };
      case 'modern-tech':
        return {
          requiredSections: ['personal', 'experience', 'projects', 'achievements', 'skills', 'education'],
          optionalSections: ['additional-info'],
          focusAreas: ['technical skills', 'projects', 'achievements', 'modern technologies'],
          keywords: ['javascript', 'react', 'node.js', 'python', 'aws', 'docker', 'git', 'api', 'database', 'frontend', 'backend', 'full stack', 'agile', 'scrum']
        };
      case 'professional-executive':
        return {
          requiredSections: ['personal', 'experience', 'education', 'languages', 'certifications', 'achievements', 'skills', 'time-management'],
          optionalSections: ['additional-info'],
          focusAreas: ['leadership', 'management', 'achievements', 'languages', 'time management'],
          keywords: ['leadership', 'management', 'strategy', 'executive', 'director', 'manager', 'team', 'budget', 'revenue', 'growth', 'strategy', 'planning']
        };
      case 'student':
        return {
          requiredSections: ['personal', 'education', 'projects', 'skills', 'certifications', 'achievements', 'interests'],
          optionalSections: ['additional-info'],
          focusAreas: ['education', 'projects', 'academic achievements', 'skills development'],
          keywords: ['academic', 'projects', 'internship', 'volunteer', 'research', 'gpa', 'graduation', 'coursework', 'thesis', 'capstone']
        };
      default:
        return {
          requiredSections: ['personal', 'experience', 'education', 'skills'],
          optionalSections: ['projects', 'certifications', 'achievements', 'additional-info'],
          focusAreas: ['general professional content'],
          keywords: ['leadership', 'management', 'project', 'development', 'analysis', 'design']
        };
    }
  };

  // Improved text extraction function
  const getResumeText = (data) => {
    let text = '';
    
    // Personal Info
    if (data.personalInfo) {
      text += ` ${data.personalInfo.name || ''} ${data.personalInfo.title || ''} ${data.personalInfo.summary || ''}`;
    }
    
    // Experience
    if (data.experience && Array.isArray(data.experience)) {
      data.experience.forEach(exp => {
        text += ` ${exp.title || ''} ${exp.company || ''} ${exp.description || ''}`;
        if (exp.achievements && Array.isArray(exp.achievements)) {
          exp.achievements.forEach(ach => {
            text += ` ${ach || ''}`;
          });
        }
      });
    }
    
    // Education
    if (data.education && Array.isArray(data.education)) {
      data.education.forEach(edu => {
        text += ` ${edu.degree || ''} ${edu.institution || ''}`;
      });
    }
    
    // Skills
    if (data.skills && Array.isArray(data.skills)) {
      data.skills.forEach(skill => {
        text += ` ${skill || ''}`;
      });
    }
    
    // Projects
    if (data.projects && Array.isArray(data.projects)) {
      data.projects.forEach(project => {
        text += ` ${project.title || ''} ${project.description || ''} ${project.technologies || ''}`;
        if (project.achievements && Array.isArray(project.achievements)) {
          project.achievements.forEach(ach => {
            text += ` ${ach || ''}`;
          });
        }
      });
    }
    
    // Certifications
    if (data.certifications && Array.isArray(data.certifications)) {
      data.certifications.forEach(cert => {
        text += ` ${cert.name || ''} ${cert.organization || ''}`;
      });
    }
    
    // Achievements
    if (data.achievements && Array.isArray(data.achievements)) {
      data.achievements.forEach(ach => {
        text += ` ${ach.title || ''} ${ach.description || ''}`;
      });
    }
    
    return text.toLowerCase().replace(/\s+/g, ' ').trim();
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const calculateKeywordMatch = (keywords, text) => {
    if (keywords.length === 0) return 0;
    const matched = keywords.filter(keyword => text.includes(keyword.toLowerCase()));
    return Math.min(1, matched.length / keywords.length);
  };

  const calculateBasicInfoScore = (data) => {
    let score = 0;
    if (data.personalInfo.name && data.personalInfo.name.trim().length > 0) score += 3;
    if (data.personalInfo.email && isValidEmail(data.personalInfo.email)) score += 3;
    if (data.personalInfo.phone && data.personalInfo.phone.trim().length > 0) score += 2;
    if (data.personalInfo.title && data.personalInfo.title.trim().length > 0) score += 2;
    if (data.personalInfo.location && data.personalInfo.location.trim().length > 0) score += 1;
    if (data.personalInfo.linkedin && data.personalInfo.linkedin.trim().length > 0) score += 1;
    if (data.personalInfo.summary && data.personalInfo.summary.trim().length > 50) score += 3;
    return score;
  };

  const calculateTemplateSpecificKeywordScore = (data) => {
    const resumeText = getResumeText(data);
    const requirements = getTemplateRequirements();
    const templateKeywords = requirements.keywords;
    
    // Combine template-specific keywords with common keywords
    const commonKeywords = [
      'leadership', 'management', 'project', 'development', 'analysis', 'design',
      'implementation', 'strategy', 'planning', 'coordination', 'communication',
      'teamwork', 'problem solving', 'technical', 'software', 'data', 'research',
      'customer service', 'sales', 'marketing', 'finance', 'operations', 'quality',
      'improvement', 'optimization', 'efficiency', 'performance', 'results'
    ];
    
    const allKeywords = [...templateKeywords, ...commonKeywords];
    const matchRate = calculateKeywordMatch(allKeywords, resumeText);
    return matchRate * 35;
  };

  const calculateTemplateSpecificContentScore = (data) => {
    let score = 0;
    const requirements = getTemplateRequirements();
    
    // Summary quality
    if (data.personalInfo.summary) {
      const summaryLength = data.personalInfo.summary.trim().length;
      if (summaryLength >= 100 && summaryLength <= 300) score += 6;
      else if (summaryLength > 50) score += 4;
      else if (summaryLength > 0) score += 2;
      
      const actionVerbs = ['developed', 'implemented', 'managed', 'led', 'created', 'designed', 'analyzed', 'improved', 'increased', 'reduced', 'built', 'maintained', 'coordinated', 'delivered', 'achieved'];
      const hasActionVerbs = actionVerbs.some(verb => data.personalInfo.summary.toLowerCase().includes(verb));
      if (hasActionVerbs) score += 2;
    }

    // Template-specific section scoring
    if (requirements.focusAreas.includes('experience') && data.experience && data.experience.length > 0) {
      let totalExperienceLength = 0;
      let experienceCount = 0;
      
      data.experience.forEach(exp => {
        if (exp.description && exp.description.trim().length > 0) {
          totalExperienceLength += exp.description.trim().length;
          experienceCount++;
        }
        if (exp.achievements && Array.isArray(exp.achievements)) {
        exp.achievements.forEach(ach => {
          if (ach && ach.trim().length > 0) {
            totalExperienceLength += ach.trim().length;
            experienceCount++;
          }
        });
        }
      });

      if (experienceCount > 0) {
        const avgLength = totalExperienceLength / experienceCount;
        if (avgLength >= 100) score += 6;
        else if (avgLength >= 50) score += 4;
        else if (avgLength >= 20) score += 2;
      }
    }

    if (requirements.focusAreas.includes('projects') && data.projects && data.projects.length > 0) {
      score += Math.min(6, data.projects.length * 2);
    }

    if (requirements.focusAreas.includes('achievements') && data.achievements && data.achievements.length > 0) {
      score += Math.min(4, data.achievements.length * 1.5);
    }

    if (requirements.focusAreas.includes('education') && data.education && data.education.length > 0) {
      score += 3;
    }

    if (requirements.focusAreas.includes('skills') && data.skills && data.skills.length > 0) {
      score += Math.min(3, data.skills.length * 0.5);
    }

    if (requirements.focusAreas.includes('languages') && data.languages && data.languages.length > 0) {
      score += Math.min(3, data.languages.length * 1.5);
    }

    if (requirements.focusAreas.includes('time management') && data.timeManagement && data.timeManagement.length > 0) {
      score += 2;
    }

    return score;
  };

  const calculateTemplateSpecificFormatScore = (data) => {
    let score = 0;
    const requirements = getTemplateRequirements();
    
    // Check required sections
    requirements.requiredSections.forEach(section => {
      switch (section) {
        case 'personal':
    if (data.personalInfo.summary && data.personalInfo.summary.trim().length > 0) score += 2;
          break;
        case 'experience':
          if (data.experience && data.experience.length > 0) score += 2;
          break;
        case 'education':
          if (data.education && data.education.length > 0) score += 2;
          break;
        case 'skills':
          if (data.skills && data.skills.length > 0) score += 1;
          break;
        case 'projects':
          if (data.projects && data.projects.length > 0) score += 1;
          break;
        case 'certifications':
          if (data.certifications && data.certifications.length > 0) score += 1;
          break;
        case 'achievements':
          if (data.achievements && data.achievements.length > 0) score += 1;
          break;
        case 'languages':
          if (data.languages && data.languages.length > 0) score += 1;
          break;
        case 'interests':
          if (data.interests && data.interests.length > 0) score += 1;
          break;
        case 'time-management':
          if (data.timeManagement && data.timeManagement.length > 0) score += 1;
          break;
      }
    });
    
    // Content length
    const totalLength = getResumeText(data).length;
    if (totalLength >= 1000 && totalLength <= 3000) score += 5;
    else if (totalLength >= 500 && totalLength < 1000) score += 3;
    else if (totalLength >= 200) score += 1;
    
    return score;
  };

  const calculateTemplateSpecificExperienceScore = (data) => {
    let score = 0;
    const requirements = getTemplateRequirements();
    
    // Experience count (more important for professional templates)
    if (requirements.focusAreas.includes('experience')) {
      if (data.experience && data.experience.length >= 3) score += 5;
      else if (data.experience && data.experience.length >= 2) score += 3;
      else if (data.experience && data.experience.length >= 1) score += 1;
    }
    
    // Projects count (important for tech and student templates)
    if (requirements.focusAreas.includes('projects')) {
      if (data.projects && data.projects.length >= 3) score += 5;
      else if (data.projects && data.projects.length >= 2) score += 3;
      else if (data.projects && data.projects.length >= 1) score += 1;
    }
    
    // Education focus (important for student template)
    if (requirements.focusAreas.includes('education')) {
      if (data.education && data.education.length >= 2) score += 3;
      else if (data.education && data.education.length >= 1) score += 2;
    }
    
    // Skills relevance
    if (data.skills && data.skills.length >= 8) score += 2;
    
    return score;
  };

  const calculateATSScore = (data) => {
    let score = 0;
    const maxScore = 100;
    
    // 1. Basic Information (15 points)
    const basicScore = calculateBasicInfoScore(data);
    score += basicScore;
    
    // 2. Template-Specific Keyword Matching (35 points)
    const keywordScore = calculateTemplateSpecificKeywordScore(data);
    score += keywordScore;
    
    // 3. Template-Specific Content Quality (25 points)
    const contentScore = calculateTemplateSpecificContentScore(data);
    score += contentScore;
    
    // 4. Template-Specific Format and Structure (15 points)
    const formatScore = calculateTemplateSpecificFormatScore(data);
    score += formatScore;
    
    // 5. Template-Specific Experience Relevance (10 points)
    const experienceScore = calculateTemplateSpecificExperienceScore(data);
    score += experienceScore;
    
    return {
      total: Math.min(maxScore, Math.round(score)),
      breakdown: {
        basic: basicScore,
        keywords: Math.round(keywordScore),
        content: Math.round(contentScore),
        format: Math.round(formatScore),
        experience: Math.round(experienceScore)
      }
    };
  };

  useEffect(() => {
    // Simulate ATS analysis
    setIsAnalyzing(true);
    setTimeout(() => {
      performATSAnalysis();
      setIsAnalyzing(false);
      setAnalysisComplete(true);
    }, 3000);
  }, [resumeData, selectedTemplate]);

  const performATSAnalysis = () => {
    const scoreResult = calculateATSScore(resumeData);
    const score = scoreResult.total;
    const breakdown = scoreResult.breakdown;
    const requirements = getTemplateRequirements();
    
    setAtsScore(score);
    setDetailedAnalysis(breakdown);
    
    const newSuggestions = [];

    // Template-specific suggestions
    const templateName = selectedTemplate?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());

    // Detailed suggestions based on score breakdown
    if (breakdown.basic < 12) {
      newSuggestions.push({
        type: 'error',
        category: 'Contact Information',
        title: 'Complete Your Contact Information',
        description: 'Missing essential contact details. ATS systems require complete contact information to process your application.',
        suggestions: [
          'Add a professional email address',
          'Include a phone number with area code',
          'Add your city and state/country',
          'Include LinkedIn profile URL'
        ],
        impact: '+3-5 ATS points'
      });
    }

    if (breakdown.keywords < 25) {
      newSuggestions.push({
        type: 'warning',
        category: 'Keywords & Skills',
        title: `Improve ${templateName} Keywords`,
        description: `Your resume lacks ${templateName.toLowerCase()}-relevant keywords that ATS systems scan for.`,
        suggestions: [
          `Add more ${requirements.focusAreas.join(', ')} related keywords`,
          'Include industry-specific terminology',
          'Use action verbs like "developed", "implemented", "managed"',
          `Focus on ${templateName.toLowerCase()} specific skills and achievements`
        ],
        impact: '+8-12 ATS points'
      });
    }

    if (breakdown.content < 20) {
      newSuggestions.push({
        type: 'warning',
        category: 'Content Quality',
        title: `Enhance ${templateName} Content`,
        description: `Your resume content needs improvement to meet ${templateName} ATS standards.`,
        suggestions: [
          'Expand your professional summary to 100-300 characters',
          'Add quantified achievements (e.g., "increased sales by 25%")',
          'Use more action verbs in experience descriptions',
          `Include specific ${templateName.toLowerCase()} examples of your accomplishments`
        ],
        impact: '+5-8 ATS points'
      });
    }

    if (breakdown.format < 12) {
      newSuggestions.push({
        type: 'error',
        category: 'Structure & Format',
        title: `Improve ${templateName} Structure`,
        description: `Your resume structure needs optimization for ${templateName} ATS compatibility.`,
        suggestions: [
          `Add all required ${templateName} sections: ${requirements.requiredSections.join(', ')}`,
          'Ensure proper section headers',
          'Maintain consistent formatting',
          'Keep content length between 1-2 pages'
        ],
        impact: '+3-5 ATS points'
      });
    }

    if (breakdown.experience < 8) {
      newSuggestions.push({
        type: 'warning',
        category: 'Experience',
        title: `Strengthen ${templateName} Experience`,
        description: `Your work experience needs more detail and relevance for ${templateName} template.`,
        suggestions: [
          'Add more detailed job descriptions',
          'Include 3-5 achievements per role',
          'Highlight current or recent positions',
          `Add relevant ${templateName.toLowerCase()} internships or projects if needed`
        ],
        impact: '+2-4 ATS points'
      });
    }

    // Add positive feedback for good scores
    if (score >= 80) {
      newSuggestions.push({
        type: 'success',
        category: 'Overall',
        title: `Excellent ${templateName} ATS Optimization!`,
        description: `Your resume is well-optimized for ${templateName.toLowerCase()} applicant tracking systems.`,
        suggestions: [
          'Your resume should pass most ATS screenings',
          'Consider minor tweaks for specific job applications',
          'Keep updating with new skills and experiences'
        ],
        impact: 'Ready for applications'
      });
    } else if (score >= 65) {
      newSuggestions.push({
        type: 'success',
        category: 'Overall',
        title: `Good ${templateName} ATS Score!`,
        description: `Your resume has solid ${templateName.toLowerCase()} ATS compatibility with room for improvement.`,
        suggestions: [
          'Focus on the specific suggestions above',
          'Tailor keywords for each job application',
          'Consider adding more quantified achievements'
        ],
        impact: 'Good foundation, needs refinement'
      });
    }

    setSuggestions(newSuggestions);
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 65) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score) => {
    if (score >= 80) return 'bg-green-600';
    if (score >= 65) return 'bg-yellow-600';
    return 'bg-red-600';
  };

  return (
    <div className="max-w-5xl mx-auto w-full px-2 sm:px-4 overflow-x-hidden">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center">
          <Zap className="h-8 w-8 mr-3 text-yellow-500" />
          {selectedTemplate ? `${selectedTemplate.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} ATS Optimization` : 'ATS Optimization & AI Refinement'}
        </h2>
        <p className="text-lg text-gray-600">
          Our AI analyzes your resume for {selectedTemplate ? `${selectedTemplate.replace('-', ' ')} ` : ''}ATS compatibility and provides detailed optimization suggestions
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ATS Score Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">ATS Compatibility Score</h3>
              {isAnalyzing ? (
                <div className="flex flex-col items-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mb-4"></div>
                  <p className="text-gray-600">Analyzing your resume...</p>
                </div>
              ) : (
                <div className="relative">
                  <div className="w-32 h-32 mx-auto mb-4">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="2"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeDasharray={`${atsScore}, 100`}
                        className={getScoreColor(atsScore)}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className={`text-3xl font-bold ${getScoreColor(atsScore)}`}>
                        {atsScore}%
                      </span>
                    </div>
                  </div>
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    atsScore >= 80 ? 'bg-green-100 text-green-800' :
                    atsScore >= 65 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {atsScore >= 80 ? 'Excellent' : atsScore >= 65 ? 'Good' : 'Needs Improvement'}
                  </div>
                </div>
              )}
            </div>

            {analysisComplete && (
              <div className="space-y-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-3 flex items-center">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Score Breakdown
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Contact Info:</span>
                      <span className="font-medium">{detailedAnalysis.basic}/15</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Keywords:</span>
                      <span className="font-medium">{detailedAnalysis.keywords}/35</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Content Quality:</span>
                      <span className="font-medium">{detailedAnalysis.content}/25</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Format:</span>
                      <span className="font-medium">{detailedAnalysis.format}/15</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Experience:</span>
                      <span className="font-medium">{detailedAnalysis.experience}/10</span>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-900 mb-2 flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    ATS Ready
                  </h4>
                  <p className="text-sm text-green-700">
                    Your resume is optimized for applicant tracking systems and ready for job applications.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Analysis Results */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <Target className="h-6 w-6 mr-2 text-blue-600" />
              Optimization Suggestions
            </h3>

            {isAnalyzing ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Analyzing your resume content...</p>
              </div>
            ) : (
              <div className="space-y-4">
                {suggestions.map((suggestion, index) => (
                  <div key={index} className={`p-4 rounded-lg border ${
                    suggestion.type === 'error' ? 'bg-red-50 border-red-200' :
                    suggestion.type === 'warning' ? 'bg-yellow-50 border-yellow-200' :
                    'bg-green-50 border-green-200'
                  }`}>
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-full ${
                        suggestion.type === 'error' ? 'bg-red-100 text-red-600' :
                        suggestion.type === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-green-100 text-green-600'
                      }`}>
                        {suggestion.type === 'error' ? <AlertCircle className="h-5 w-5" /> :
                         suggestion.type === 'warning' ? <TrendingUp className="h-5 w-5" /> :
                         <CheckCircle className="h-5 w-5" />}
                        </div>
                        <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">{suggestion.title}</h4>
                        <p className="text-sm text-gray-600 mb-3">{suggestion.description}</p>
                        <div className="space-y-2">
                                {suggestion.suggestions.map((item, idx) => (
                            <div key={idx} className="flex items-center space-x-2">
                              <span className="text-blue-600">•</span>
                              <span className="text-sm text-gray-700">{item}</span>
                            </div>
                          ))}
                        </div>
                        <div className="mt-3">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            suggestion.type === 'error' ? 'bg-red-100 text-red-800' :
                            suggestion.type === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {suggestion.impact}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation */}
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

export default ATSRefining;
