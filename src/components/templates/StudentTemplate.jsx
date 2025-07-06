import React from 'react';

const StudentTemplate = ({ resumeData }) => {
  const { personalInfo, experience, education, skills, projects, certifications, achievements, interests } = resumeData;

  return (
    <div data-resume-content style={{
      fontFamily: 'Times New Roman, serif', 
      lineHeight: '1.4', 
      color: '#000', 
      background: '#fff', 
      padding: '32px',
      maxWidth: '210mm', 
      minHeight: '297mm', 
      margin: '0 auto', 
      fontSize: '12px',
      border: '8px solid #fff',
      boxSizing: 'border-box',
      boxShadow: '0 0 0 1px #e0e0e0'
    }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '25px', paddingBottom: '15px' }}>
        <div style={{ fontSize: '22px', fontWeight: 'bold', letterSpacing: '2px', marginBottom: '8px', textTransform: 'uppercase' }}>{personalInfo.name}</div>
        <div style={{ fontSize: '13px', fontStyle: 'italic', marginBottom: '8px', color: '#333' }}>{personalInfo.location}</div>
        <div style={{ fontSize: '11px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          {personalInfo.email && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>📧 {personalInfo.email}</span>}
          {personalInfo.phone && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>📞 {personalInfo.phone}</span>}
          {personalInfo.linkedin && (
            <a
              href={personalInfo.linkedin.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#2563eb', textDecoration: 'underline' }}
            >
              🔗 LinkedIn
            </a>
          )}
        </div>
      </div>

      {/* Career Objective */}
      {personalInfo.summary && (
        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontSize: '15px', fontWeight: 'bold', borderBottom: '1px solid #000', paddingBottom: '3px', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Career Objective</div>
          <p style={{ fontSize: '12px', lineHeight: '1.7', color: '#000', textAlign: 'justify', marginBottom: '5px', wordBreak: 'break-word', letterSpacing: '0.02em' }}>{personalInfo.summary}</p>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontSize: '15px', fontWeight: 'bold', borderBottom: '1px solid #000', paddingBottom: '3px', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Education</div>
          {education.map((edu, index) => (
            <div key={index} style={{ marginBottom: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: '1' }}>
                <div style={{ fontWeight: 'bold', fontSize: '13px', marginBottom: '2px' }}>{edu.institution}</div>
                <div style={{ fontStyle: 'italic', fontSize: '12px', color: '#333' }}>{edu.degree}</div>
              </div>
              <div style={{ textAlign: 'right', fontSize: '11px', minWidth: '120px' }}>
                <div style={{ fontWeight: 'bold', marginBottom: '2px' }}>{edu.startDate} – {edu.endDate}</div>
                {edu.gpa && <div style={{ fontStyle: 'italic', color: '#666' }}>GPA - {edu.gpa}</div>}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontSize: '15px', fontWeight: 'bold', borderBottom: '1px solid #000', paddingBottom: '3px', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Projects</div>
          {projects.map((project, index) => (
            <div key={index} style={{ marginBottom: '18px', paddingLeft: '0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px', flexWrap: 'wrap', gap: '10px' }}>
                <div style={{ flex: '1', minWidth: '250px' }}>
                  <span style={{ fontWeight: 'bold', fontSize: '13px', display: 'inline' }}>{project.title}</span>
                  <span style={{ fontStyle: 'italic', fontSize: '11px', color: '#555', marginLeft: '5px' }}>| {project.technologies}</span>
                </div>
                {project.link && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" style={{ fontSize: '11px', color: '#2563eb', textDecoration: 'underline', whiteSpace: 'nowrap' }}>
                    {project.linkDisplayName ? project.linkDisplayName : project.link}
                  </a>
                )}
              </div>
              {project.description && <p style={{ fontSize: '11px', lineHeight: '1.7', marginBottom: '6px', textAlign: 'justify', wordBreak: 'break-word', letterSpacing: '0.02em' }}>{project.description}</p>}
              {project.achievements.length > 0 && (
                <ul style={{ listStyle: 'none', paddingLeft: '0' }}>
                  {project.achievements.filter(ach => ach.trim()).map((achievement, achIndex) => (
                    <li key={achIndex} style={{ fontSize: '11px', lineHeight: '1.7', marginBottom: '4px', position: 'relative', paddingLeft: '12px', textAlign: 'justify', wordBreak: 'break-word', letterSpacing: '0.02em' }}>
                      <span style={{ content: '\u2022', position: 'absolute', left: '0', fontWeight: 'bold' }}>•</span>
                      {achievement}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontSize: '15px', fontWeight: 'bold', borderBottom: '1px solid #000', paddingBottom: '3px', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Experience</div>
          {experience.map((exp, index) => (
            <div key={index} style={{ marginBottom: '18px', borderLeft: '2px solid #f0f0f0', paddingLeft: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px', flexWrap: 'wrap', gap: '10px' }}>
                <div style={{ flex: '1', minWidth: '250px' }}>
                  <span style={{ fontWeight: 'bold', fontSize: '13px', display: 'inline' }}>{exp.title}</span>
                  <div style={{ fontWeight: '600', color: '#333', fontSize: '12px' }}>{exp.company}</div>
                </div>
                <div style={{ fontSize: '11px', color: '#666' }}>
                  {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                </div>
              </div>
              {exp.description && <p style={{ fontSize: '11px', lineHeight: '1.7', marginBottom: '6px', textAlign: 'justify', wordBreak: 'break-word', letterSpacing: '0.02em' }}>{exp.description}</p>}
              {exp.achievements.length > 0 && (
                <ul style={{ listStyle: 'none', paddingLeft: '0' }}>
                  {exp.achievements.filter(ach => ach.trim()).map((achievement, achIndex) => (
                    <li key={achIndex} style={{ fontSize: '11px', lineHeight: '1.7', marginBottom: '4px', position: 'relative', paddingLeft: '12px', textAlign: 'justify', wordBreak: 'break-word', letterSpacing: '0.02em' }}>
                      <span style={{ content: '•', position: 'absolute', left: '0', fontWeight: 'bold' }}>•</span>
                      {achievement}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Skills - Changed from "Technical Skills" to "Skills" */}
      {skills.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontSize: '15px', fontWeight: 'bold', borderBottom: '1px solid #000', paddingBottom: '3px', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Skills</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '8px 15px', fontSize: '11px' }}>
            {skills.map((skill, index) => (
              <div key={index} style={{ position: 'relative', paddingLeft: '12px' }}>
                <span style={{ content: '•', position: 'absolute', left: '0', fontWeight: 'bold' }}>•</span>
                {skill}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontSize: '15px', fontWeight: 'bold', borderBottom: '1px solid #000', paddingBottom: '3px', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Certifications</div>
          <ul style={{ listStyle: 'none', paddingLeft: '0' }}>
            {certifications.map((cert, index) => (
              <li key={index} style={{ fontSize: '11px', lineHeight: '1.4', marginBottom: '6px', position: 'relative', paddingLeft: '12px', textAlign: 'justify' }}>
                <span style={{ content: '•', position: 'absolute', left: '0', fontWeight: 'bold' }}>•</span>
                <strong>{cert.name}</strong> by {cert.organization}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Accomplishments */}
      {achievements.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontSize: '15px', fontWeight: 'bold', borderBottom: '1px solid #000', paddingBottom: '3px', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Accomplishments</div>
          <ul style={{ listStyle: 'none', paddingLeft: '0' }}>
            {achievements.map((achievement, index) => (
              <li key={index} style={{ fontSize: '11px', lineHeight: '1.4', marginBottom: '6px', position: 'relative', paddingLeft: '12px', textAlign: 'justify' }}>
                <span style={{ content: '•', position: 'absolute', left: '0', fontWeight: 'bold' }}>•</span>
                <strong>{achievement.title}:</strong> {achievement.description}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Interests */}
      {interests.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontSize: '15px', fontWeight: 'bold', borderBottom: '1px solid #000', paddingBottom: '3px', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Interests</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '8px 15px', fontSize: '11px' }}>
            {interests.map((interest, index) => (
              <div key={index} style={{ position: 'relative', paddingLeft: '12px' }}>
                <span style={{ content: '\u2022', position: 'absolute', left: '0', fontWeight: 'bold' }}>•</span>
                {interest}
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Additional Information */}
      {resumeData.additionalInfo && resumeData.additionalInfo.trim() && (
        <div style={{ marginTop: '32px', paddingTop: '16px', borderTop: '2px solid #eee' }}>
          <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#667eea', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Additional Information</div>
          <div style={{ fontSize: '12px', color: '#333', whiteSpace: 'pre-line', wordBreak: 'break-word', letterSpacing: '0.02em' }}>{resumeData.additionalInfo}</div>
        </div>
      )}
    </div>
  );
};

export default StudentTemplate;
