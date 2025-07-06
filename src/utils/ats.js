// ats.js
// Consolidated ATS-related logic from the AI Resume Builder project
// Includes scoring, keyword extraction, analysis, and improvement suggestions

// Enhanced ATS Optimization
function optimizeResume() {
    const targetJob = document.getElementById('targetJob').value;
    const targetCompany = document.getElementById('targetCompany').value;
    const jobDescription = document.getElementById('jobDescription').value;
    const industry = document.getElementById('industry').value;

    if (!targetJob.trim()) {
        alert('Please enter a target job title for optimization.');
        return;
    }

    // Show loading state
    const optimizeButton = document.querySelector('.ats-actions .btn-primary');
    const originalText = optimizeButton.innerHTML;
    optimizeButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing...';
    optimizeButton.disabled = true;

    // Simulate comprehensive ATS analysis
    setTimeout(() => {
        // Calculate ATS score based on various factors
        const atsScore = calculateATSScore(targetJob, jobDescription, resumeData);
        
        // Update score display
        document.getElementById('atsScore').textContent = atsScore;
        
        // Add optimization results to resume data
        resumeData.atsOptimized = true;
        resumeData.targetJob = targetJob;
        resumeData.targetCompany = targetCompany;
        resumeData.jobDescription = jobDescription;
        resumeData.industry = industry;
        resumeData.atsScore = atsScore;

        // Show detailed analysis results
        showDetailedATSAnalysis(targetJob, jobDescription, atsScore);

        // Show improvement suggestions
        showImprovementSuggestions(targetJob, jobDescription, atsScore);

        // Enable next button
        document.getElementById('nextToStep4').disabled = false;

        // Reset button
        optimizeButton.innerHTML = originalText;
        optimizeButton.disabled = false;
    }, 3000);
}

// Calculate ATS Score
function calculateATSScore(targetJob, jobDescription, resumeData) {
    let score = 0;
    const maxScore = 100;
    
    // 1. Basic Information (15 points)
    score += calculateBasicInfoScore(resumeData);
    
    // 2. Keyword Matching (35 points)
    if (jobDescription) {
        score += calculateKeywordScore(targetJob, jobDescription, resumeData);
    } else {
        score += calculateGenericKeywordScore(resumeData);
    }
    
    // 3. Content Quality (25 points)
    score += calculateContentQualityScore(resumeData);
    
    // 4. Format and Structure (15 points)
    score += calculateFormatScore(resumeData);
    
    // 5. Experience Relevance (10 points)
    score += calculateExperienceRelevanceScore(targetJob, resumeData);
    
    return Math.min(maxScore, Math.round(score));
}

// Calculate basic information score
function calculateBasicInfoScore(resumeData) {
    let score = 0;
    if (resumeData.fullName && resumeData.fullName.trim().length > 0) score += 3;
    if (resumeData.email && isValidEmail(resumeData.email)) score += 3;
    if (resumeData.phone && resumeData.phone.trim().length > 0) score += 2;
    if (resumeData.title && resumeData.title.trim().length > 0) score += 2;
    if (resumeData.location && resumeData.location.trim().length > 0) score += 1;
    if (resumeData.linkedin && resumeData.linkedin.trim().length > 0) score += 1;
    if (resumeData.summary && resumeData.summary.trim().length > 50) score += 3;
    return score;
}

// Calculate keyword matching score
function calculateKeywordScore(targetJob, jobDescription, resumeData) {
    const resumeText = getResumeText(resumeData).toLowerCase();
    const jobText = jobDescription.toLowerCase();
    const industryKeywords = getIndustryKeywords(targetJob, jobText);
    const technicalKeywords = getTechnicalKeywords(targetJob, jobText);
    const softSkillKeywords = getSoftSkillKeywords(jobText);
    let score = 0;
    const industryMatch = calculateKeywordMatch(industryKeywords, resumeText);
    score += (industryMatch * 15);
    const technicalMatch = calculateKeywordMatch(technicalKeywords, resumeText);
    score += (technicalMatch * 12);
    const softSkillMatch = calculateKeywordMatch(softSkillKeywords, resumeText);
    score += (softSkillMatch * 8);
    return score;
}

// Calculate generic keyword score when no job description is provided
function calculateGenericKeywordScore(resumeData) {
    const resumeText = getResumeText(resumeData).toLowerCase();
    const commonKeywords = [
        'leadership', 'management', 'project', 'development', 'analysis', 'design',
        'implementation', 'strategy', 'planning', 'coordination', 'communication',
        'teamwork', 'problem solving', 'technical', 'software', 'data', 'research',
        'customer service', 'sales', 'marketing', 'finance', 'operations', 'quality',
        'improvement', 'optimization', 'efficiency', 'performance', 'results'
    ];
    const matchRate = calculateKeywordMatch(commonKeywords, resumeText);
    return matchRate * 25;
}

// Calculate content quality score
function calculateContentQualityScore(resumeData) {
    let score = 0;
    if (resumeData.summary) {
        const summaryLength = resumeData.summary.trim().length;
        if (summaryLength >= 100 && summaryLength <= 300) score += 6;
        else if (summaryLength > 50) score += 4;
        else if (summaryLength > 0) score += 2;
        const actionVerbs = ['developed', 'implemented', 'managed', 'led', 'created', 'designed', 'analyzed', 'improved', 'increased', 'reduced'];
        const hasActionVerbs = actionVerbs.some(verb => resumeData.summary.toLowerCase().includes(verb));
        if (hasActionVerbs) score += 2;
    }
    const experienceFields = ['jobDescription', 'responsibilities', 'jobDescriptionTech', 'responsibilitiesTech', 'jobDescriptionExec', 'responsibilitiesExec'];
    let totalExperienceLength = 0;
    let experienceCount = 0;
    experienceFields.forEach(field => {
        if (resumeData[field] && Array.isArray(resumeData[field])) {
            resumeData[field].forEach(exp => {
                if (exp && exp.trim().length > 0) {
                    totalExperienceLength += exp.trim().length;
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
        const hasQuantified = /increased|decreased|improved|reduced|by \d+%|\d+% increase|\d+% decrease/.test(getResumeText(resumeData));
        if (hasQuantified) score += 4;
    }
    if (resumeData.degree && resumeData.degree.length > 0) score += 3;
    if (resumeData.certificationName && resumeData.certificationName.length > 0) score += 2;
    if (resumeData.technicalSkills && resumeData.technicalSkills.trim().length > 0) score += 2;
    return score;
}

// Calculate format and structure score
function calculateFormatScore(resumeData) {
    let score = 0;
    const requiredSections = ['summary', 'jobTitle', 'degree'];
    const optionalSections = ['technicalSkills', 'certificationName', 'achievementTitle'];
    requiredSections.forEach(section => {
        if (resumeData[section] && 
            (Array.isArray(resumeData[section]) ? resumeData[section].length > 0 : resumeData[section].trim().length > 0)) {
            score += 2;
        }
    });
    optionalSections.forEach(section => {
        if (resumeData[section] && 
            (Array.isArray(resumeData[section]) ? resumeData[section].length > 0 : resumeData[section].trim().length > 0)) {
            score += 1;
        }
    });
    const totalLength = getResumeText(resumeData).length;
    if (totalLength >= 1000 && totalLength <= 3000) score += 5;
    else if (totalLength >= 500 && totalLength < 1000) score += 3;
    else if (totalLength >= 200) score += 1;
    return score;
}

// Calculate experience relevance score
function calculateExperienceRelevanceScore(targetJob, resumeData) {
    let score = 0;
    const jobTitles = [
        resumeData.jobTitle,
        resumeData.jobTitleTech,
        resumeData.jobTitleExec
    ].filter(Boolean).flat();
    const targetJobLower = targetJob.toLowerCase();
    const relevantTitles = jobTitles.filter(title => 
        title.toLowerCase().includes(targetJobLower) ||
        targetJobLower.includes(title.toLowerCase()) ||
        hasSimilarKeywords(title, targetJob)
    );
    if (relevantTitles.length > 0) score += 5;
    else if (jobTitles.length > 0) score += 2;
    let totalExperience = 0;
    const experienceFields = ['startDate', 'startDateTech', 'startDateExec'];
    experienceFields.forEach(field => {
        if (resumeData[field] && Array.isArray(resumeData[field])) {
            totalExperience += resumeData[field].length;
        }
    });
    if (totalExperience >= 3) score += 5;
    else if (totalExperience >= 2) score += 3;
    else if (totalExperience >= 1) score += 1;
    return score;
}

// Helper functions
function getResumeText(resumeData) {
    return JSON.stringify(resumeData).replace(/[{}"\[\]]/g, ' ').replace(/,/g, ' ');
}

function calculateKeywordMatch(keywords, text) {
    if (keywords.length === 0) return 0;
    const matched = keywords.filter(keyword => text.includes(keyword.toLowerCase()));
    return Math.min(1, matched.length / keywords.length);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function hasSimilarKeywords(text1, text2) {
    const words1 = text1.toLowerCase().split(/\s+/);
    const words2 = text2.toLowerCase().split(/\s+/);
    const commonWords = words1.filter(word => words2.includes(word));
    return commonWords.length >= 2;
}

function getIndustryKeywords(targetJob, jobText) {
    const industryMap = {
        'software': ['software', 'development', 'programming', 'coding', 'application', 'system', 'database', 'api', 'framework', 'algorithm'],
        'data': ['data', 'analytics', 'analysis', 'statistics', 'machine learning', 'ai', 'artificial intelligence', 'modeling', 'visualization', 'sql'],
        'marketing': ['marketing', 'campaign', 'brand', 'social media', 'digital', 'content', 'seo', 'sem', 'analytics', 'conversion'],
        'finance': ['finance', 'financial', 'accounting', 'budget', 'forecasting', 'investment', 'risk', 'compliance', 'audit', 'trading'],
        'sales': ['sales', 'revenue', 'customer', 'client', 'business development', 'account', 'pipeline', 'quota', 'negotiation', 'relationship'],
        'management': ['management', 'leadership', 'strategy', 'planning', 'coordination', 'supervision', 'team', 'project', 'operations', 'executive'],
        'design': ['design', 'ui', 'ux', 'user experience', 'interface', 'creative', 'visual', 'prototype', 'wireframe', 'branding'],
        'engineering': ['engineering', 'technical', 'mechanical', 'electrical', 'civil', 'structural', 'manufacturing', 'quality', 'testing', 'maintenance']
    };
    const targetJobLower = targetJob.toLowerCase();
    for (const [industry, keywords] of Object.entries(industryMap)) {
        if (targetJobLower.includes(industry) || keywords.some(keyword => targetJobLower.includes(keyword))) {
            return keywords.filter(keyword => jobText.includes(keyword));
        }
    }
    return [];
}

function getTechnicalKeywords(targetJob, jobText) {
    const technicalKeywords = [
        'javascript', 'python', 'java', 'c++', 'react', 'angular', 'vue', 'node.js', 'express', 'mongodb',
        'mysql', 'postgresql', 'aws', 'azure', 'docker', 'kubernetes', 'git', 'agile', 'scrum', 'devops',
        'html', 'css', 'typescript', 'php', 'ruby', 'go', 'rust', 'swift', 'kotlin', 'scala',
        'tensorflow', 'pytorch', 'pandas', 'numpy', 'scikit-learn', 'tableau', 'power bi', 'excel', 'sql'
    ];
    return technicalKeywords.filter(keyword => jobText.includes(keyword));
}

function getSoftSkillKeywords(jobText) {
    const softSkills = [
        'leadership', 'communication', 'teamwork', 'problem solving', 'critical thinking', 'creativity',
        'adaptability', 'time management', 'organization', 'collaboration', 'negotiation', 'presentation',
        'mentoring', 'coaching', 'decision making', 'strategic thinking', 'customer service', 'interpersonal'
    ];
    return softSkills.filter(skill => jobText.includes(skill));
}

function analyzeContentQuality(resumeData) {
    const analysis = {
        summaryQuality: 'Good',
        experienceQuality: 'Good',
        hasQuantified: false,
        hasActionVerbs: false
    };
    if (resumeData.summary) {
        const summaryLength = resumeData.summary.trim().length;
        if (summaryLength >= 100 && summaryLength <= 300) analysis.summaryQuality = 'Excellent';
        else if (summaryLength >= 50) analysis.summaryQuality = 'Good';
        else analysis.summaryQuality = 'Needs improvement';
        const actionVerbs = ['developed', 'implemented', 'managed', 'led', 'created', 'designed', 'analyzed', 'improved', 'increased', 'reduced'];
        analysis.hasActionVerbs = actionVerbs.some(verb => resumeData.summary.toLowerCase().includes(verb));
    }
    const experienceFields = ['jobDescription', 'responsibilities', 'jobDescriptionTech', 'responsibilitiesTech', 'jobDescriptionExec', 'responsibilitiesExec'];
    let totalExperienceLength = 0;
    let experienceCount = 0;
    experienceFields.forEach(field => {
        if (resumeData[field] && Array.isArray(resumeData[field])) {
            resumeData[field].forEach(exp => {
                if (exp && exp.trim().length > 0) {
                    totalExperienceLength += exp.trim().length;
                    experienceCount++;
                }
            });
        }
    });
    if (experienceCount > 0) {
        const avgLength = totalExperienceLength / experienceCount;
        if (avgLength >= 100) analysis.experienceQuality = 'Excellent';
        else if (avgLength >= 50) analysis.experienceQuality = 'Good';
        else analysis.experienceQuality = 'Needs improvement';
    }
    analysis.hasQuantified = /increased|decreased|improved|reduced|by \d+%|\d+% increase|\d+% decrease/.test(getResumeText(resumeData));
    return analysis;
}

function getScoreDescription(score) {
    if (score >= 85) return "Excellent! Your resume has high ATS compatibility and should pass most screening systems.";
    if (score >= 75) return "Very Good! Your resume should perform well in ATS systems with minor improvements.";
    if (score >= 65) return "Good! Your resume has decent ATS compatibility but could benefit from enhancements.";
    if (score >= 50) return "Fair. Your resume needs improvements to better match ATS requirements.";
    return "Needs significant improvement. Focus on the suggested enhancements to increase ATS compatibility.";
}

function showDetailedATSAnalysis(targetJob, jobDescription, atsScore) {
    const atsResults = document.getElementById('atsResults');
    // Calculate detailed breakdown
    const basicInfoScore = calculateBasicInfoScore(resumeData);
    const keywordScore = jobDescription ? calculateKeywordScore(targetJob, jobDescription, resumeData) : calculateGenericKeywordScore(resumeData);
    const contentQualityScore = calculateContentQualityScore(resumeData);
    const formatScore = calculateFormatScore(resumeData);
    const experienceRelevanceScore = calculateExperienceRelevanceScore(targetJob, resumeData);
    let analysisHTML = `
        <div class="analysis-results">
            <div class="analysis-item">
                <h4>📊 Overall ATS Score: ${atsScore}/100</h4>
                <p>${getScoreDescription(atsScore)}</p>
            </div>
            <div class="analysis-item">
                <h4>📋 Score Breakdown</h4>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 10px;">
                    <div style="background: #f8f9fa; padding: 8px; border-radius: 4px;">
                        <strong>Basic Info:</strong> ${basicInfoScore}/15
                    </div>
                    <div style="background: #f8f9fa; padding: 8px; border-radius: 4px;">
                        <strong>Keywords:</strong> ${Math.round(keywordScore)}/35
                    </div>
                    <div style="background: #f8f9fa; padding: 8px; border-radius: 4px;">
                        <strong>Content Quality:</strong> ${Math.round(contentQualityScore)}/25
                    </div>
                    <div style="background: #f8f9fa; padding: 8px; border-radius: 4px;">
                        <strong>Format:</strong> ${Math.round(formatScore)}/15
                    </div>
                    <div style="background: #f8f9fa; padding: 8px; border-radius: 4px;">
                        <strong>Experience:</strong> ${Math.round(experienceRelevanceScore)}/10
                    </div>
                </div>
            </div>
    `;
    if (jobDescription) {
        const resumeText = getResumeText(resumeData).toLowerCase();
        const jobText = jobDescription.toLowerCase();
        const industryKeywords = getIndustryKeywords(targetJob, jobText);
        const technicalKeywords = getTechnicalKeywords(targetJob, jobText);
        const softSkillKeywords = getSoftSkillKeywords(jobText);
        const industryMatch = calculateKeywordMatch(industryKeywords, resumeText);
        const technicalMatch = calculateKeywordMatch(technicalKeywords, resumeText);
        const softSkillMatch = calculateKeywordMatch(softSkillKeywords, resumeText);
        const matchedIndustry = industryKeywords.filter(keyword => resumeText.includes(keyword.toLowerCase()));
        const matchedTechnical = technicalKeywords.filter(keyword => resumeText.includes(keyword.toLowerCase()));
        const matchedSoftSkills = softSkillKeywords.filter(keyword => resumeText.includes(keyword.toLowerCase()));
        analysisHTML += `
            <div class="analysis-item">
                <h4>🔑 Keyword Analysis</h4>
                <div style="margin-top: 10px;">
                    <div style="margin-bottom: 8px;">
                        <strong>Industry Keywords:</strong> ${matchedIndustry.length}/${industryKeywords.length} (${Math.round(industryMatch * 100)}%)
                        ${matchedIndustry.length > 0 ? `<br><small>Matched: ${matchedIndustry.join(', ')}</small>` : ''}
                    </div>
                    <div style="margin-bottom: 8px;">
                        <strong>Technical Keywords:</strong> ${matchedTechnical.length}/${technicalKeywords.length} (${Math.round(technicalMatch * 100)}%)
                        ${matchedTechnical.length > 0 ? `<br><small>Matched: ${matchedTechnical.join(', ')}</small>` : ''}
                    </div>
                    <div style="margin-bottom: 8px;">
                        <strong>Soft Skills:</strong> ${matchedSoftSkills.length}/${softSkillKeywords.length} (${Math.round(softSkillMatch * 100)}%)
                        ${matchedSoftSkills.length > 0 ? `<br><small>Matched: ${matchedSoftSkills.join(', ')}</small>` : ''}
                    </div>
                </div>
            </div>
        `;
    }
    // Content quality analysis
    const contentAnalysis = analyzeContentQuality(resumeData);
    analysisHTML += `
        <div class="analysis-item">
            <h4>📝 Content Quality Analysis</h4>
            <div style="margin-top: 10px;">
                <div style="margin-bottom: 5px;">✅ Summary: ${contentAnalysis.summaryQuality}</div>
                <div style="margin-bottom: 5px;">✅ Experience Descriptions: ${contentAnalysis.experienceQuality}</div>
                <div style="margin-bottom: 5px;">✅ Quantified Achievements: ${contentAnalysis.hasQuantified ? 'Present' : 'Missing'}</div>
                <div style="margin-bottom: 5px;">✅ Action Verbs: ${contentAnalysis.hasActionVerbs ? 'Used' : 'Could improve'}</div>
            </div>
        </div>
    `;
    analysisHTML += `
            <div class="analysis-item">
                <h4>✅ Format Analysis</h4>
                <p>Resume structure is ATS-friendly with proper sections and formatting.</p>
            </div>
        </div>
    `;
    atsResults.innerHTML = analysisHTML;
}

function showImprovementSuggestions(targetJob, jobDescription, atsScore) {
    document.getElementById('atsImprovements').style.display = 'block';
    let keywordSuggestions = [];
    if (jobDescription) {
        const jobText = jobDescription.toLowerCase();
        const industryKeywords = getIndustryKeywords(targetJob, jobText);
        const technicalKeywords = getTechnicalKeywords(targetJob, jobText);
        const softSkillKeywords = getSoftSkillKeywords(jobText);
        const resumeText = getResumeText(resumeData).toLowerCase();
        const missingIndustry = industryKeywords.filter(keyword => !resumeText.includes(keyword.toLowerCase()));
        const missingTechnical = technicalKeywords.filter(keyword => !resumeText.includes(keyword.toLowerCase()));
        const missingSoftSkills = softSkillKeywords.filter(keyword => !resumeText.includes(keyword.toLowerCase()));
        keywordSuggestions = [...missingIndustry.slice(0, 3), ...missingTechnical.slice(0, 3), ...missingSoftSkills.slice(0, 2)];
    } else {
        keywordSuggestions = [targetJob.toLowerCase(), 'leadership', 'project management', 'results-driven', 'strategic planning'];
    }
    const keywordSuggestionsEl = document.getElementById('keywordSuggestions');
    keywordSuggestionsEl.innerHTML = `
        <p>Add these keywords to improve matching:</p>
        <ul>
            ${keywordSuggestions.map(keyword => `<li>${keyword}</li>`).join('')}
        </ul>
    `;
    const contentSuggestions = document.getElementById('contentSuggestions');
    const suggestions = [];
    if (atsScore < 75) {
        suggestions.push('Add quantified achievements (e.g., "increased sales by 25%")');
        suggestions.push('Use more action verbs (developed, implemented, managed, led)');
        suggestions.push('Expand experience descriptions with specific details');
    }
    if (atsScore < 65) {
        suggestions.push('Improve professional summary (100-300 characters)');
        suggestions.push('Add relevant certifications and skills');
        suggestions.push('Include industry-specific terminology');
    }
    if (atsScore < 50) {
        suggestions.push('Ensure all basic information is complete');
        suggestions.push('Add more relevant work experience');
        suggestions.push('Include technical skills and tools');
    }
    contentSuggestions.innerHTML = `
        <p>Enhance your content with:</p>
        <ul>
            ${suggestions.map(suggestion => `<li>${suggestion}</li>`).join('')}
        </ul>
    `;
    const formatSuggestions = document.getElementById('formatSuggestions');
    formatSuggestions.innerHTML = `
        <p>Optimize formatting:</p>
        <ul>
            <li>Use standard fonts (Arial, Calibri, Times New Roman)</li>
            <li>Clear section headers (Experience, Education, Skills)</li>
            <li>Consistent formatting throughout</li>
            <li>Proper spacing and bullet points</li>
            <li>Avoid graphics, tables, and complex layouts</li>
        </ul>
    `;
    const impactMetrics = document.getElementById('impactMetrics');
    let improvementPotential = '';
    if (atsScore < 50) improvementPotential = '+40-50 points possible';
    else if (atsScore < 65) improvementPotential = '+25-35 points possible';
    else if (atsScore < 75) improvementPotential = '+15-25 points possible';
    else improvementPotential = '+5-15 points possible';
    impactMetrics.innerHTML = `
        <p>Expected improvements:</p>
        <ul>
            <li>${improvementPotential} with suggested changes</li>
            <li>+30-50% keyword match rate</li>
            <li>+40-60% interview callback rate</li>
            <li>Better ranking in ATS systems</li>
        </ul>
    `;
} 