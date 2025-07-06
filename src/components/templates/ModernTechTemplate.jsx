import React from 'react';

const ModernTechTemplate = ({ resumeData }) => {
  const { personalInfo, experience, education, skills, projects, certifications, achievements, languages } = resumeData;

  return (
    <div data-resume-content style={{ 
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif', 
      backgroundColor: '#f5f5f5', 
      color: '#333', 
      lineHeight: '1.4', 
      fontSize: '14px',
      width: '210mm',
      minHeight: '297mm',
      margin: '0 auto',
      position: 'relative'
    }}>
      <div style={{ 
        width: '210mm', 
        minHeight: '297mm', 
        maxWidth: '210mm', 
        margin: '0 auto', 
        background: 'white', 
        boxShadow: '0 0 20px rgba(0,0,0,0.1)', 
        position: 'relative',
        overflow: 'hidden'
      }}>
        
        {/* Header Section */}
        <div style={{ background: 'white', padding: '30px 40px 20px 40px' }}>
          <h1 style={{ color: '#1e3a8a', fontSize: '2.5rem', fontWeight: '700', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>{personalInfo.name}</h1>
          <div style={{ color: '#60a5fa', fontSize: '1.1rem', fontWeight: '400', marginBottom: '20px' }}>{personalInfo.title}</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', fontSize: '0.9rem', color: '#666' }}>
            {personalInfo.phone && <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span>📞</span><span>{personalInfo.phone}</span></div>}
            {personalInfo.email && <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span>✉️</span><span>{personalInfo.email}</span></div>}
            {personalInfo.linkedin && (
              <a
                href={personalInfo.linkedin.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#2563eb', textDecoration: 'underline' }}
              >
                🔗 LinkedIn
              </a>
            )}
            {personalInfo.location && <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span>📍</span><span>{personalInfo.location}</span></div>}
            {personalInfo.portfolio && <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span>⭐</span><span>{personalInfo.portfolio}</span></div>}
          </div>
        </div>
        
        {/* Main Content */}
        <div style={{ display: 'flex', padding: '0 40px', minHeight: 'calc(297mm - 180px)' }}>
          <div style={{ flex: '1.8', paddingRight: '25px' }}>
            
            {/* Summary */}
            {personalInfo.summary && (
              <div>
                <h2 style={{ color: '#1f2937', fontSize: '1.1rem', fontWeight: '600', margin: '25px 0 15px 0', paddingBottom: '8px', borderBottom: '1px solid #d1d5db', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Summary</h2>
                <p style={{ color: '#4b5563', lineHeight: '1.7', marginBottom: '15px', fontSize: '0.95rem', wordBreak: 'break-word', letterSpacing: '0.02em' }}>{personalInfo.summary}</p>
              </div>
            )}
            
            {/* Experience */}
            {experience.length > 0 && (
              <div>
                <h2 style={{ color: '#1f2937', fontSize: '1.1rem', fontWeight: '600', margin: '25px 0 15px 0', paddingBottom: '8px', borderBottom: '1px solid #d1d5db', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Experience</h2>
                {experience.map((exp, index) => (
                  <div key={index} style={{ marginBottom: '25px' }}>
                    <h3 style={{ color: '#2563eb', fontSize: '1.05rem', fontWeight: '600', marginBottom: '4px' }}>{exp.title}</h3>
                    <div style={{ color: '#60a5fa', fontWeight: '500', marginBottom: '6px' }}>{exp.company}</div>
                    <div style={{ display: 'flex', gap: '20px', color: '#6b7280', fontSize: '0.85rem', marginBottom: '10px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>📅 {exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                      {exp.location && <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>📍 {exp.location}</span>}
                    </div>
                    {exp.achievements.length > 0 && (
                      <ul style={{ listStyle: 'none', margin: '0' }}>
                        {exp.achievements.filter(ach => ach.trim()).map((achievement, achIndex) => (
                          <li key={achIndex} style={{ color: '#4b5563', lineHeight: '1.5', marginBottom: '6px', position: 'relative', paddingLeft: '15px', fontSize: '0.9rem' }}>
                            <span style={{ content: '•', color: '#2563eb', fontWeight: 'bold', position: 'absolute', left: '0' }}>•</span>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div style={{ flex: '1.2', paddingLeft: '25px', borderLeft: '1px solid #e5e7eb' }}>
            
            {/* Projects */}
            {projects.length > 0 && (
              <div>
                <h2 style={{ color: '#1f2937', fontSize: '1.1rem', fontWeight: '600', margin: '25px 0 15px 0', paddingBottom: '8px', borderBottom: '1px solid #d1d5db', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Projects</h2>
                {projects.map((project, index) => (
                  <div key={index} style={{ marginBottom: '20px' }}>
                    <h3 style={{ color: '#2563eb', fontWeight: '600', fontSize: '1rem', marginBottom: '5px' }}>{project.title}</h3>
                    <p style={{ color: '#4b5563', lineHeight: '1.7', marginBottom: '6px', fontSize: '0.9rem', wordBreak: 'break-word', letterSpacing: '0.02em' }}>{project.description}</p>
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" style={{ color: '#60a5fa', fontSize: '0.85rem', textDecoration: 'underline' }}>
                        {project.linkDisplayName ? project.linkDisplayName : project.link}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
            
            {/* Key Achievements */}
            {achievements.length > 0 && (
              <div>
                <h2 style={{ color: '#1f2937', fontSize: '1.1rem', fontWeight: '600', margin: '25px 0 15px 0', paddingBottom: '8px', borderBottom: '1px solid #d1d5db', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Key Achievements</h2>
                {achievements.map((achievement, index) => (
                  <div key={index} style={{ marginBottom: '18px', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <div style={{ color: '#2563eb', fontSize: '1.2rem', marginTop: '2px', flexShrink: '0' }}>{achievement.icon || '🏆'}</div>
                    <div style={{ flex: '1' }}>
                      <div style={{ color: '#1f2937', fontWeight: '600', marginBottom: '4px', fontSize: '0.95rem' }}>{achievement.title}</div>
                      <div style={{ color: '#4b5563', lineHeight: '1.5', fontSize: '0.85rem', wordBreak: 'break-word', letterSpacing: '0.02em' }}>{achievement.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Skills */}
            {skills.length > 0 && (
              <div>
                <h2 style={{ color: '#1f2937', fontSize: '1.1rem', fontWeight: '600', margin: '25px 0 15px 0', paddingBottom: '8px', borderBottom: '1px solid #d1d5db', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Skills</h2>
                <div style={{ color: '#4b5563', lineHeight: '1.6', fontSize: '0.9rem', wordBreak: 'break-word', letterSpacing: '0.02em' }}>
                  <strong>Technical:</strong> {skills.slice(0, Math.ceil(skills.length/2)).join(', ')}<br/><br/>
                  <strong>Tools:</strong> {skills.slice(Math.ceil(skills.length/2)).join(', ')}
                </div>
              </div>
            )}
            
            {/* Education */}
            {education.length > 0 && (
              <div>
                <h2 style={{ color: '#1f2937', fontSize: '1.1rem', fontWeight: '600', margin: '25px 0 15px 0', paddingBottom: '8px', borderBottom: '1px solid #d1d5db', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Education</h2>
                {education.map((edu, index) => (
                  <div key={index} style={{ marginBottom: '18px' }}>
                    <div style={{ color: '#2563eb', fontWeight: '600', fontSize: '1rem', marginBottom: '4px' }}>{edu.degree}</div>
                    <div style={{ color: '#60a5fa', fontWeight: '500', marginBottom: '4px' }}>{edu.institution}</div>
                    <div style={{ color: '#6b7280', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <span>📅 {edu.startDate} - {edu.endDate}</span>
                      <span>📍 {edu.location}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Certifications */}
            {certifications.length > 0 && (
              <div>
                <h2 style={{ color: '#1f2937', fontSize: '1.1rem', fontWeight: '600', margin: '25px 0 15px 0', paddingBottom: '8px', borderBottom: '1px solid #d1d5db', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Certifications</h2>
                {certifications.map((cert, index) => (
                  <div key={index} style={{ marginBottom: '12px' }}>
                    <div style={{ color: '#2563eb', fontWeight: '600', fontSize: '0.9rem', marginBottom: '2px' }}>{cert.name}</div>
                    <div style={{ color: '#6b7280', fontSize: '0.8rem' }}>{cert.organization}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        {/* Additional Information */}
        {resumeData.additionalInfo && resumeData.additionalInfo.trim() && (
          <div style={{ marginTop: '32px', paddingTop: '16px', borderTop: '2px solid #eee' }}>
            <div style={{ color: '#2563eb', fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Additional Information</div>
            <div style={{ fontSize: '0.95rem', color: '#333', whiteSpace: 'pre-line', wordBreak: 'break-word', letterSpacing: '0.02em' }}>{resumeData.additionalInfo}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModernTechTemplate;
