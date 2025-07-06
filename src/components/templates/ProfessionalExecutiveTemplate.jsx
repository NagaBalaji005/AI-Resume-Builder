import React from 'react';

const ProfessionalExecutiveTemplate = ({ resumeData }) => {
  const { personalInfo, experience, education, skills, achievements, certifications, languages, timeManagement, interests } = resumeData;

  return (
    <div data-resume-content style={{
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif', 
      lineHeight: '1.4', 
      color: '#333', 
      background: '#fff', 
      padding: '32px',
      maxWidth: '210mm', 
      minHeight: '297mm', 
      margin: '0 auto', 
      fontSize: '13px',
      border: '8px solid #fff',
      boxSizing: 'border-box',
      boxShadow: '0 0 0 1px #e0e0e0'
    }}>
      
      <div style={{ marginBottom: '25px' }}>
        <div style={{ fontSize: '28px', fontWeight: '900', color: '#000', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '1px' }}>{personalInfo.name}</div>
        <div style={{ fontSize: '16px', color: '#2E86AB', fontWeight: '600', marginBottom: '10px' }}>{personalInfo.title}</div>
        <div style={{ fontSize: '12px', display: 'flex', flexWrap: 'wrap', gap: '15px', color: '#666' }}>
          {personalInfo.email && <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>📧 {personalInfo.email}</span>}
          {personalInfo.phone && <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>📞 {personalInfo.phone}</span>}
          {personalInfo.linkedin && (
            <a
              href={personalInfo.linkedin.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#2E86AB', textDecoration: 'underline' }}
            >
              🔗 LinkedIn
            </a>
          )}
          {personalInfo.location && <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>📍 {personalInfo.location}</span>}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px', height: '100%' }}>
        <div style={{ paddingRight: '15px' }}>
          
          {/* Experience */}
          {experience.length > 0 && (
            <div style={{ marginBottom: '25px' }}>
              <div style={{ fontSize: '14px', fontWeight: '900', color: '#000', textTransform: 'uppercase', marginBottom: '15px', borderBottom: '2px solid #000', paddingBottom: '3px', letterSpacing: '0.5px' }}>Experience</div>
              {experience.map((exp, index) => (
                <div key={index} style={{ marginBottom: '20px' }}>
                  <div style={{ fontSize: '14px', fontWeight: '700', color: '#000', marginBottom: '3px' }}>{exp.title}</div>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: '#2E86AB', marginBottom: '3px' }}>{exp.company}</div>
                  <div style={{ fontSize: '11px', color: '#666', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '15px', flexWrap: 'wrap' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>🏢 {exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                    {exp.location && <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>📍 {exp.location}</span>}
                  </div>
                  {exp.description && <p style={{ fontSize: '12px', lineHeight: '1.7', marginBottom: '8px', color: '#555', wordBreak: 'break-word', letterSpacing: '0.02em' }}>{exp.description}</p>}
                  {exp.achievements.length > 0 && (
                    <ul style={{ listStyle: 'none', paddingLeft: '0' }}>
                      {exp.achievements.filter(ach => ach.trim()).map((achievement, achIndex) => (
                        <li key={achIndex} style={{ fontSize: '12px', marginBottom: '6px', position: 'relative', paddingLeft: '12px', lineHeight: '1.4' }}>
                          <span style={{ content: '•', position: 'absolute', left: '0', color: '#2E86AB', fontWeight: 'bold' }}>•</span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div style={{ marginBottom: '25px' }}>
              <div style={{ fontSize: '14px', fontWeight: '900', color: '#000', textTransform: 'uppercase', marginBottom: '15px', borderBottom: '2px solid #000', paddingBottom: '3px', letterSpacing: '0.5px' }}>Education</div>
              {education.map((edu, index) => (
                <div key={index} style={{ marginBottom: '15px' }}>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: '#000', marginBottom: '3px' }}>{edu.degree}</div>
                  <div style={{ fontSize: '12px', fontWeight: '600', color: '#2E86AB', marginBottom: '3px' }}>{edu.institution}</div>
                  <div style={{ fontSize: '11px', color: '#666', display: 'flex', alignItems: 'center', gap: '15px', flexWrap: 'wrap' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>🏢 {edu.startDate} - {edu.endDate}</span>
                    {edu.location && <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>📍 {edu.location}</span>}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '14px', fontWeight: '900', color: '#000', textTransform: 'uppercase', marginBottom: '15px', borderBottom: '2px solid #000', paddingBottom: '3px', letterSpacing: '0.5px' }}>Languages</div>
              {languages.map((lang, index) => (
                <div key={index} style={{ marginBottom: '12px' }}>
                  <div style={{ fontSize: '12px', fontWeight: '700', color: '#000', marginBottom: '4px', display: 'flex', justifyContent: 'space-between' }}>
                    <span>{lang.name}</span>
                    <span style={{ fontSize: '10px', color: '#666' }}>{lang.level}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '2px' }}>
                    {[1,2,3,4,5].map((bar) => (
                      <div key={bar} style={{ width: '16px', height: '6px', borderRadius: '2px', background: bar <= (lang.level === 'Native' ? 5 : lang.level === 'Fluent' ? 4 : lang.level === 'Advanced' ? 3 : 2) ? '#2E86AB' : '#e0e0e0' }}></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Certification */}
          {certifications.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '14px', fontWeight: '900', color: '#000', textTransform: 'uppercase', marginBottom: '15px', borderBottom: '2px solid #000', paddingBottom: '3px', letterSpacing: '0.5px' }}>Certification</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {certifications.map((cert, index) => (
                  <div key={index} style={{ background: '#f8f9fa', padding: '12px', borderRadius: '6px', borderLeft: '3px solid #2E86AB' }}>
                    <div style={{ fontSize: '12px', fontWeight: '700', color: '#2E86AB', marginBottom: '4px' }}>{cert.name}</div>
                    <div style={{ fontSize: '10px', color: '#666', lineHeight: '1.4' }}>{cert.description || `Certified by ${cert.organization}`}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div style={{ paddingLeft: '15px' }}>
          
          {/* Summary */}
          {personalInfo.summary && (
            <div style={{ marginBottom: '25px' }}>
              <div style={{ fontSize: '14px', fontWeight: '900', color: '#000', textTransform: 'uppercase', marginBottom: '15px', borderBottom: '2px solid #000', paddingBottom: '3px', letterSpacing: '0.5px' }}>Summary</div>
              <div style={{ fontSize: '12px', color: '#333', textAlign: 'justify', lineHeight: '1.7', wordBreak: 'break-word', letterSpacing: '0.02em' }}>{personalInfo.summary}</div>
            </div>
          )}

          {/* Achievements */}
          {achievements.length > 0 && (
            <div style={{ marginBottom: '25px' }}>
              <div style={{ fontSize: '14px', fontWeight: '900', color: '#000', textTransform: 'uppercase', marginBottom: '15px', borderBottom: '2px solid #000', paddingBottom: '3px', letterSpacing: '0.5px' }}>Achievements</div>
              <ul style={{ listStyle: 'none', paddingLeft: '0' }}>
                {achievements.map((achievement, index) => (
                  <li key={index} style={{ fontSize: '12px', marginBottom: '12px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <span style={{ color: '#2E86AB', fontSize: '14px', marginTop: '1px', flexShrink: '0' }}>{achievement.icon || '💎'}</span>
                    <div style={{ flex: '1' }}>
                      <div style={{ fontWeight: '700', color: '#000', marginBottom: '2px', fontSize: '12px' }}>{achievement.title}</div>
                      <div style={{ fontSize: '11px', color: '#666', lineHeight: '1.7', wordBreak: 'break-word', letterSpacing: '0.02em' }}>{achievement.description}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <div style={{ marginBottom: '25px' }}>
              <div style={{ fontSize: '14px', fontWeight: '900', color: '#000', textTransform: 'uppercase', marginBottom: '15px', borderBottom: '2px solid #000', paddingBottom: '3px', letterSpacing: '0.5px' }}>Skills</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', fontSize: '11px', fontWeight: '600', color: '#000' }}>
                {skills.map((skill, index) => (
                  <span key={index} style={{ background: '#f0f0f0', padding: '6px 10px', borderRadius: '4px', border: '1px solid #ddd', whiteSpace: 'nowrap' }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* My Time Chart - Only show if user has added time management data */}
          {timeManagement && timeManagement.length > 0 && (
            <div style={{ marginBottom: '25px' }}>
              <div style={{ fontSize: '14px', fontWeight: '900', color: '#000', textTransform: 'uppercase', marginBottom: '15px', borderBottom: '2px solid #000', paddingBottom: '3px', letterSpacing: '0.5px' }}>My Time</div>
              <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <svg width="120" height="120" viewBox="0 0 120 120">
                  {(() => {
                    const total = timeManagement.reduce((sum, item) => sum + (item.percentage || 0), 0);
                    let startAngle = 0;
                    return timeManagement.map((item, idx) => {
                      const angle = (item.percentage / total) * 360;
                      const largeArc = angle > 180 ? 1 : 0;
                      const endAngle = startAngle + angle;
                      const x1 = 60 + 60 * Math.cos((Math.PI / 180) * (startAngle - 90));
                      const y1 = 60 + 60 * Math.sin((Math.PI / 180) * (startAngle - 90));
                      const x2 = 60 + 60 * Math.cos((Math.PI / 180) * (endAngle - 90));
                      const y2 = 60 + 60 * Math.sin((Math.PI / 180) * (endAngle - 90));
                      const pathData = `M60,60 L${x1},${y1} A60,60 0 ${largeArc},1 ${x2},${y2} Z`;
                      // Calculate label position (middle of arc)
                      const midAngle = startAngle + angle / 2;
                      const labelX = 60 + 40 * Math.cos((Math.PI / 180) * (midAngle - 90));
                      const labelY = 60 + 40 * Math.sin((Math.PI / 180) * (midAngle - 90));
                      const sector = (
                        <g key={idx}>
                          <path d={pathData} fill={item.color || '#2E86AB'} />
                          <text x={labelX} y={labelY} textAnchor="middle" dominantBaseline="middle" fontSize="14" fontWeight="bold" fill="#fff">{String.fromCharCode(65 + idx)}</text>
                        </g>
                      );
                      startAngle += angle;
                      return sector;
                    });
                  })()}
                  {/* White center circle */}
                  <circle cx="60" cy="60" r="28" fill="#fff" />
                </svg>
              </div>
              <div style={{ marginTop: '15px', fontSize: '10px' }}>
                {timeManagement.map((item, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '5px' }}>
                    <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: item.color || '#2E86AB', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '10px', flexShrink: '0' }}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span>{item.activity}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Interests */}
      {interests.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontSize: '15px', fontWeight: 'bold', borderBottom: '1px solid #000', paddingBottom: '3px', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Interests</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '8px 15px', fontSize: '11px' }}>
            {interests.map((interest, index) => (
              <div key={index} style={{ position: 'relative', paddingLeft: '12px' }}>
                <span style={{ content: '\u2022', position: 'absolute', left: '0', fontWeight: 'bold' }}> 2</span>
                {interest}
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Additional Information */}
      {resumeData.additionalInfo && resumeData.additionalInfo.trim() && (
        <div style={{ marginTop: '32px', paddingTop: '16px', borderTop: '2px solid #eee' }}>
          <div style={{ fontSize: '14px', fontWeight: '900', color: '#2E86AB', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Additional Information</div>
          <div style={{ fontSize: '12px', color: '#333', whiteSpace: 'pre-line' }}>{resumeData.additionalInfo}</div>
        </div>
      )}
    </div>
  );
};

export default ProfessionalExecutiveTemplate;
