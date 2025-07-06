import React, { useState, useEffect } from 'react';

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 600);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  return isMobile;
};

const CreativeTemplate = ({ resumeData, forceDesktopLayout = false }) => {
  const isMobile = useIsMobile();
  const { personalInfo, experience, education, skills, projects, certifications, achievements, languages, interests } = resumeData;

  return (
    <div data-resume-content style={{
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
      fontSize: isMobile ? '3.5vw' : '11px',
      lineHeight: '1.4',
      color: '#333',
      background: '#ffffff',
      width: '100%',
      maxWidth: isMobile ? '100vw' : '210mm',
      minHeight: isMobile ? '100vh' : '297mm',
      margin: '0 auto',
      position: 'relative',
      padding: isMobile ? '3vw' : undefined,
      boxSizing: 'border-box',
    }}>
      <div style={{
        width: '100%',
        maxWidth: isMobile ? '100vw' : '210mm',
        minHeight: isMobile ? '100vh' : '297mm',
        margin: '0 auto',
        background: 'white',
        boxShadow: '0 0 20px rgba(0,0,0,0.1)',
        position: 'relative',
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}>
        
        {/* Header Section */}
        <div style={{ background: 'linear-gradient(135deg, #ff6b35, #ff8c42)', color: 'white', padding: '25px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '2.2rem', fontWeight: '300', marginBottom: '8px' }}>{personalInfo.name}</h1>
            <p style={{ fontSize: '1rem', marginBottom: '15px', fontWeight: '300' }}>{personalInfo.title}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', fontSize: '0.85rem' }}>
              {personalInfo.phone && <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span>📞</span><span>{personalInfo.phone}</span></div>}
              {personalInfo.email && <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span>✉️</span><span>{personalInfo.email}</span></div>}
              {personalInfo.linkedin && (
                <a
                  href={personalInfo.linkedin.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'white', textDecoration: 'underline' }}
                >
                  🔗 LinkedIn
                </a>
              )}
              {personalInfo.location && <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span>📍</span><span>{personalInfo.location}</span></div>}
            </div>
          </div>
          {/* Profile Image Placeholder - User can add image here */}
          <div style={{ width: '100px', height: '100px', borderRadius: '8px', background: '#666', flexShrink: '0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '12px', textAlign: 'center' }}>
            {resumeData.profileImage ? (
              <img src={resumeData.profileImage} alt="Profile" style={{ width: '100%', height: '100%', borderRadius: '8px', objectFit: 'cover' }} />
            ) : (
              <span>Add Photo</span>
            )}
          </div>
        </div>
        
        {/* Main Content */}
        <div style={{
          display: 'flex',
          flexDirection: forceDesktopLayout ? 'row' : (isMobile ? 'column' : 'row'),
          background: 'white',
          minHeight: forceDesktopLayout ? 'calc(297mm - 120px)' : (isMobile ? 'auto' : 'calc(297mm - 120px)'),
        }}>
          <div style={{
            flex: '2',
            padding: isMobile ? '3vw' : '25px 30px',
            background: '#fafafa',
            boxSizing: 'border-box',
          }}>
            
            {/* Summary */}
            {personalInfo.summary && (
              <div style={{ marginBottom: '25px' }}>
                <h2 style={{ color: '#8B2635', fontSize: '1.1rem', fontWeight: '600', marginBottom: '15px', paddingBottom: '6px', borderBottom: '2px solid #8B2635', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Summary</h2>
                <p style={{ color: '#555', lineHeight: '1.7', fontSize: '0.9rem', wordBreak: 'break-word', letterSpacing: '0.02em' }}>{personalInfo.summary}</p>
              </div>
            )}
            
            {/* Experience */}
            {experience.length > 0 && (
              <div style={{ marginBottom: '25px' }}>
                <h2 style={{ color: '#8B2635', fontSize: '1.1rem', fontWeight: '600', marginBottom: '15px', paddingBottom: '6px', borderBottom: '2px solid #8B2635', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Experience</h2>
                {experience.map((exp, index) => (
                  <div key={index} style={{ marginBottom: '25px' }}>
                    <h3 style={{ color: '#8B2635', fontSize: '1rem', fontWeight: '600', marginBottom: '4px' }}>{exp.title}</h3>
                    <div style={{ color: '#ff6b35', fontWeight: '600', marginBottom: '6px', fontSize: '0.95rem' }}>{exp.company}</div>
                    <div style={{ display: 'flex', gap: '15px', color: '#666', fontSize: '0.8rem', marginBottom: '8px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>📅 {exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                      {exp.location && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>📍 {exp.location}</span>}
                    </div>
                    {exp.description && <p style={{ color: '#555', lineHeight: '1.7', marginBottom: '8px', fontSize: '0.95rem', wordBreak: 'break-word', letterSpacing: '0.02em' }}>{exp.description}</p>}
                    {exp.achievements.length > 0 && (
                      <ul style={{ listStyle: 'none', marginLeft: '0' }}>
                        {exp.achievements.filter(ach => ach.trim()).map((achievement, achIndex) => (
                          <li key={achIndex} style={{ color: '#555', lineHeight: '1.5', marginBottom: '6px', position: 'relative', paddingLeft: '12px', fontSize: '0.9rem' }}>
                            <span style={{ content: '•', color: '#ff6b35', fontWeight: 'bold', position: 'absolute', left: '0' }}>•</span>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}
            
            {/* Projects */}
            {projects.length > 0 && (
              <div style={{ marginBottom: '25px' }}>
                <h2 style={{ color: '#8B2635', fontSize: '1.1rem', fontWeight: '600', marginBottom: '15px', paddingBottom: '6px', borderBottom: '2px solid #8B2635', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Projects</h2>
                {projects.map((project, index) => (
                  <div key={index} style={{ marginBottom: '20px' }}>
                    <h3 style={{ color: '#8B2635', fontSize: '1rem', fontWeight: '600', marginBottom: '4px' }}>{project.title}</h3>
                    <div style={{ color: '#ff6b35', fontWeight: '500', marginBottom: '6px', fontSize: '0.9rem' }}>{project.technologies}</div>
                    <p style={{ color: '#555', lineHeight: '1.7', marginBottom: '8px', fontSize: '0.95rem', wordBreak: 'break-word', letterSpacing: '0.02em' }}>{project.description}</p>
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" style={{ color: '#ff6b35', fontSize: '0.85rem', textDecoration: 'underline' }}>
                        {project.linkDisplayName ? project.linkDisplayName : project.link}
                      </a>
                    )}
                    {project.achievements.length > 0 && (
                      <ul style={{ listStyle: 'none', marginLeft: '0' }}>
                        {project.achievements.filter(ach => ach.trim()).map((achievement, achIndex) => (
                          <li key={achIndex} style={{ color: '#555', lineHeight: '1.5', marginBottom: '6px', position: 'relative', paddingLeft: '12px', fontSize: '0.9rem' }}>
                            <span style={{ content: '•', color: '#ff6b35', fontWeight: 'bold', position: 'absolute', left: '0' }}>•</span>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}
            
            {/* Tech Stack */}
            {skills.length > 0 && (
              <div style={{ marginTop: '25px' }}>
                <h2 style={{ color: '#8B2635', fontSize: '1.1rem', fontWeight: '600', marginBottom: '15px', paddingBottom: '6px', borderBottom: '2px solid #8B2635', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Tech Stack</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginTop: '15px' }}>
                  {skills.map((skill, index) => (
                    <div key={index} style={{ background: 'white', padding: '8px 10px', borderRadius: '6px', textAlign: 'center', fontWeight: '500', color: '#555', border: '1px solid #e0e0e0', fontSize: '0.85rem' }}>
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div style={{
            flex: '1',
            padding: isMobile ? '3vw' : '25px 25px',
            background: 'white',
            boxSizing: 'border-box',
          }}>
            
            {/* Key Achievements */}
            {achievements.length > 0 && (
              <div style={{ marginBottom: '25px' }}>
                <h2 style={{ color: '#8B2635', fontSize: '1.1rem', fontWeight: '600', marginBottom: '15px', paddingBottom: '6px', borderBottom: '2px solid #8B2635', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Key Achievements</h2>
                {achievements.map((achievement, index) => (
                  <div key={index} style={{ marginBottom: '18px' }}>
                    <div style={{ color: '#ff6b35', fontSize: '1.2rem', marginBottom: '6px' }}>{achievement.icon || '🏆'}</div>
                    <div style={{ color: '#8B2635', fontWeight: '600', marginBottom: '6px', fontSize: '0.95rem' }}>{achievement.title}</div>
                    <div style={{ color: '#555', lineHeight: '1.5', fontSize: '0.85rem', wordBreak: 'break-word', letterSpacing: '0.02em' }}>{achievement.description}</div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Certifications */}
            {certifications.length > 0 && (
              <div style={{ marginBottom: '25px' }}>
                <h2 style={{ color: '#8B2635', fontSize: '1.1rem', fontWeight: '600', marginBottom: '15px', paddingBottom: '6px', borderBottom: '2px solid #8B2635', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Certifications</h2>
                {certifications.map((cert, index) => (
                  <div key={index} style={{ marginBottom: '12px' }}>
                    <div style={{ color: '#ff6b35', fontWeight: '600', marginBottom: '4px', fontSize: '0.9rem' }}>{cert.name}</div>
                    <div style={{ color: '#666', fontSize: '0.8rem' }}>{cert.organization}</div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Education */}
            {education.length > 0 && (
              <div style={{ marginBottom: '25px' }}>
                <h2 style={{ color: '#8B2635', fontSize: '1.1rem', fontWeight: '600', marginBottom: '15px', paddingBottom: '6px', borderBottom: '2px solid #8B2635', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Education</h2>
                {education.map((edu, index) => (
                  <div key={index} style={{ marginBottom: '15px' }}>
                    <div style={{ color: '#8B2635', fontWeight: '600', fontSize: '0.95rem', marginBottom: '4px' }}>{edu.degree}</div>
                    <div style={{ color: '#ff6b35', fontWeight: '600', marginBottom: '4px', fontSize: '0.9rem' }}>{edu.institution}</div>
                    <div style={{ color: '#666', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span>📅 {edu.startDate} - {edu.endDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Languages */}
            {languages.length > 0 && (
              <div style={{ marginBottom: '25px' }}>
                <h2 style={{ color: '#8B2635', fontSize: '1.1rem', fontWeight: '600', marginBottom: '15px', paddingBottom: '6px', borderBottom: '2px solid #8B2635', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Languages</h2>
                {languages.map((lang, index) => (
                  <div key={index} style={{ marginBottom: '8px', color: '#555', fontSize: '0.9rem' }}>
                    <strong>{lang.name}</strong> - {lang.level}
                  </div>
                ))}
              </div>
            )}
            
            {/* Passions */}
            {interests.length > 0 && (
              <div>
                <h2 style={{ color: '#8B2635', fontSize: '1.1rem', fontWeight: '600', marginBottom: '15px', paddingBottom: '6px', borderBottom: '2px solid #8B2635', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Passions</h2>
                {interests.map((interest, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#555', fontSize: '0.9rem' }}>
                    <div style={{ color: '#ff6b35', fontSize: '1rem' }}>🏃</div>
                    <span>{interest}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        {/* Additional Information */}
        {resumeData.additionalInfo && resumeData.additionalInfo.trim() && (
          <div style={{ marginTop: '32px', paddingTop: '16px', borderTop: '2px solid #eee' }}>
            <div style={{ color: '#ff6b35', fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Additional Information</div>
            <div style={{ fontSize: '0.95rem', color: '#333', whiteSpace: 'pre-line', wordBreak: 'break-word', letterSpacing: '0.02em' }}>{resumeData.additionalInfo}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreativeTemplate;
