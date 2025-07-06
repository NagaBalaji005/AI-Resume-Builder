/**
 * @typedef {'creative' | 'modern-tech' | 'professional-executive' | 'student'} TemplateType
 */

/**
 * @typedef {Object} PersonalInfo
 * @property {string} name
 * @property {string} title
 * @property {string} email
 * @property {string} phone
 * @property {string} location
 * @property {string} linkedin
 * @property {string} [portfolio]
 * @property {string} summary
 */

/**
 * @typedef {Object} Experience
 * @property {string} id
 * @property {string} title
 * @property {string} company
 * @property {string} location
 * @property {string} startDate
 * @property {string} endDate
 * @property {boolean} current
 * @property {string} description
 * @property {string[]} achievements
 */

/**
 * @typedef {Object} Education
 * @property {string} id
 * @property {string} degree
 * @property {string} institution
 * @property {string} location
 * @property {string} startDate
 * @property {string} endDate
 * @property {string} [gpa]
 * @property {string} [relevant]
 */

/**
 * @typedef {Object} Project
 * @property {string} id
 * @property {string} title
 * @property {string} technologies
 * @property {string} description
 * @property {string[]} achievements
 * @property {string} [link]
 */

/**
 * @typedef {Object} Certification
 * @property {string} id
 * @property {string} name
 * @property {string} organization
 * @property {string} date
 * @property {string} [description]
 */

/**
 * @typedef {Object} Achievement
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {string} [icon]
 */

/**
 * @typedef {Object} Language
 * @property {string} id
 * @property {string} name
 * @property {string} level
 */

/**
 * @typedef {Object} ResumeData
 * @property {PersonalInfo} personalInfo
 * @property {Experience[]} experience
 * @property {Education[]} education
 * @property {string[]} skills
 * @property {Project[]} projects
 * @property {Certification[]} certifications
 * @property {Achievement[]} achievements
 * @property {Language[]} languages
 * @property {string[]} interests
 */

// Export for use in other files
export {}; 