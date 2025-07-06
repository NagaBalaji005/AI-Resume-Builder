import React, { useRef } from 'react';
import { ChevronLeft, Download, Eye, FileText, Share2 } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import CreativeTemplate from './templates/CreativeTemplate';
import ModernTechTemplate from './templates/ModernTechTemplate';
import ProfessionalExecutiveTemplate from './templates/ProfessionalExecutiveTemplate';
import StudentTemplate from './templates/StudentTemplate';

const FinalResume = ({ resumeData, selectedTemplate, onPrevious }) => {
  const resumeRef = useRef();
  const [shareTooltip, setShareTooltip] = React.useState(false);

  const renderTemplate = () => {
    switch (selectedTemplate) {
      case 'creative':
        return <CreativeTemplate resumeData={resumeData} />;
      case 'modern-tech':
        return <ModernTechTemplate resumeData={resumeData} />;
      case 'professional-executive':
        return <ProfessionalExecutiveTemplate resumeData={resumeData} />;
      case 'student':
        return <StudentTemplate resumeData={resumeData} />;
      default:
        return <CreativeTemplate resumeData={resumeData} />;
    }
  };

  const downloadPDF = async () => {
    const element = resumeRef.current;
    
    if (!element) {
      console.error('Resume element not found');
      return;
    }

    // Find the actual resume content element (the template div)
    const resumeContentElement = element.querySelector('[data-resume-content]');
    if (!resumeContentElement) {
      console.error('Resume content element not found');
      return;
    }

    console.log('Found resume content element:', resumeContentElement);

    try {
    // Create PDF with exact A4 dimensions
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
      precision: 16
    });

    // A4 dimensions in mm
    const pdfWidth = 210;
    const pdfHeight = 297;
    
      // Set font and colors
      pdf.setFont('helvetica');
      pdf.setFontSize(12);
      pdf.setTextColor(0, 0, 0);
      
      // Add a simple test content first
      let yPosition = 20;
      
      // Header
      pdf.setFontSize(24);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Test Resume', pdfWidth / 2, yPosition, { align: 'center' });
      yPosition += 20;
    
      // Personal Info
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Personal Information:', 20, yPosition);
      yPosition += 10;
      
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`Name: ${resumeData.personalInfo.name}`, 20, yPosition);
      yPosition += 8;
      pdf.text(`Title: ${resumeData.personalInfo.title}`, 20, yPosition);
      yPosition += 8;
      pdf.text(`Email: ${resumeData.personalInfo.email}`, 20, yPosition);
      yPosition += 8;
      pdf.text(`Phone: ${resumeData.personalInfo.phone}`, 20, yPosition);
      yPosition += 8;
      if (resumeData.personalInfo.linkedin) {
        const linkedinUrl = resumeData.personalInfo.linkedin.startsWith('http') ? resumeData.personalInfo.linkedin : `https://${resumeData.personalInfo.linkedin}`;
        pdf.text(`LinkedIn: ${linkedinUrl}`, 20, yPosition);
        yPosition += 8;
      }
      yPosition += 7;
      
      // Summary
      if (resumeData.personalInfo.summary) {
        pdf.setFontSize(14);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Summary:', 20, yPosition);
        yPosition += 10;
        
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'normal');
        const summaryLines = pdf.splitTextToSize(resumeData.personalInfo.summary, pdfWidth - 40);
        pdf.text(summaryLines, 20, yPosition);
        yPosition += summaryLines.length * 6 + 10;
      }
      
      // Experience
      if (resumeData.experience && resumeData.experience.length > 0) {
        pdf.setFontSize(14);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Experience:', 20, yPosition);
        yPosition += 10;
        
        resumeData.experience.forEach((exp, index) => {
          if (yPosition > pdfHeight - 50) {
            pdf.addPage();
            yPosition = 20;
          }
          
          pdf.setFontSize(12);
          pdf.setFont('helvetica', 'bold');
          pdf.text(exp.title, 20, yPosition);
          yPosition += 6;
          
          pdf.setFontSize(10);
          pdf.setFont('helvetica', 'normal');
          pdf.text(`${exp.company} | ${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}`, 20, yPosition);
          yPosition += 6;
          
          if (exp.description) {
            const descLines = pdf.splitTextToSize(exp.description, pdfWidth - 40);
            pdf.text(descLines, 20, yPosition);
            yPosition += descLines.length * 5;
          }
          
          yPosition += 5;
        });
      }
      
      // Education
      if (resumeData.education && resumeData.education.length > 0) {
        if (yPosition > pdfHeight - 50) {
          pdf.addPage();
          yPosition = 20;
        }
        
        pdf.setFontSize(14);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Education:', 20, yPosition);
        yPosition += 10;
        
        resumeData.education.forEach((edu, index) => {
          pdf.setFontSize(12);
          pdf.setFont('helvetica', 'bold');
          pdf.text(edu.degree, 20, yPosition);
          yPosition += 6;
          
          pdf.setFontSize(10);
          pdf.setFont('helvetica', 'normal');
          pdf.text(`${edu.institution} | ${edu.startDate} - ${edu.endDate}`, 20, yPosition);
          yPosition += 8;
        });
      }
      
      // Skills
      if (resumeData.skills && resumeData.skills.length > 0) {
        if (yPosition > pdfHeight - 50) {
          pdf.addPage();
          yPosition = 20;
        }
        
        pdf.setFontSize(14);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Skills:', 20, yPosition);
        yPosition += 10;
        
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');
        const skillsText = resumeData.skills.join(', ');
        const skillsLines = pdf.splitTextToSize(skillsText, pdfWidth - 40);
        pdf.text(skillsLines, 20, yPosition);
        yPosition += skillsLines.length * 5;
    }

    // Download with proper filename
    const fileName = `${resumeData.personalInfo.name.replace(/\s+/g, '_')}_Resume.pdf`;
    pdf.save(fileName);
      console.log('PDF saved as:', fileName);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  const handlePrintResume = () => {
    // Open a new window with just the resume content
    const printWindow = window.open('', '_blank', 'width=900,height=1200');
    if (!printWindow) return;

    // Get the HTML for the selected template
    const templateHtml = resumeRef.current.querySelector('[data-resume-content]').outerHTML;

    // Add print styles for true edge-to-edge A4, no browser header/footer, no padding
    const printStyles = `
      <style>
        @page {
          size: A4;
          margin: 0;
        }
        html, body {
          width: 210mm;
          min-height: 297mm;
          background: #fff;
          margin: 0 !important;
          padding: 0 !important;
          box-sizing: border-box;
        }
        body { margin: 0; padding: 0; background: #fff; }
        [data-resume-content] {
          width: 210mm !important;
          min-height: 297mm !important;
          max-width: 210mm !important;
          max-height: 297mm !important;
          background: #fff !important;
          margin: 0 !important;
          box-shadow: none !important;
          color-adjust: exact !important;
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
          page-break-inside: avoid !important;
          break-inside: avoid !important;
          overflow: hidden !important;
          position: relative !important;
        }
        * {
          box-sizing: border-box !important;
        }
        @media print {
          html, body {
            width: 210mm;
            min-height: 297mm;
            background: #fff;
            margin: 0 !important;
            padding: 0 !important;
          }
          [data-resume-content] {
            width: 210mm !important;
            min-height: 297mm !important;
            max-width: 210mm !important;
            max-height: 297mm !important;
            background: #fff !important;
            margin: 0 !important;
            box-shadow: none !important;
            color-adjust: exact !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
            overflow: hidden !important;
            position: relative !important;
          }
        }
      </style>
    `;

    // Write the content to the new window
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Resume</title>
          ${printStyles}
        </head>
        <body>${templateHtml}</body>
      </html>
    `);
    printWindow.document.close();

    // Wait for content to load, then print
    printWindow.onload = () => {
      printWindow.focus();
      printWindow.print();
    };
  };

  const handleShareResume = () => {
    navigator.clipboard.writeText(window.location.href);
    setShareTooltip(true);
    setTimeout(() => setShareTooltip(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Professional Resume</h2>
        <p className="text-lg text-gray-600">
          Preview your ATS-optimized resume and download it as a high-quality PDF
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Controls Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Resume Actions</h3>
            
            <div className="space-y-4">
              <button
                onClick={handlePrintResume}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Download className="h-5 w-5" />
                <span>Print/Download Styled PDF</span>
              </button>

              <button
                onClick={handleShareResume}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors relative"
              >
                <Share2 className="h-5 w-5" />
                <span>Share Resume</span>
                {shareTooltip && (
                  <span className="absolute top-0 right-0 mt-1 mr-2 px-2 py-1 bg-green-600 text-white text-xs rounded shadow-lg z-10">Link copied!</span>
                )}
              </button>

              <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                <Eye className="h-5 w-5" />
                <span>Preview Mode</span>
              </button>
            </div>

            <div className="mt-8 p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center mb-2">
                <FileText className="h-5 w-5 text-green-600 mr-2" />
                <span className="font-semibold text-green-900">ATS Optimized</span>
              </div>
              <p className="text-sm text-green-700">
                Your resume is optimized for applicant tracking systems and ready for job applications.
              </p>
            </div>

            <div className="mt-6">
              <h4 className="font-semibold text-gray-900 mb-3">Template Features</h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Professional formatting</li>
                <li>• ATS-friendly structure</li>
                <li>• Optimized keyword placement</li>
                <li>• Clean, readable design</li>
                <li>• Single-page optimization</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Resume Preview */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Resume Preview</h3>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <FileText className="h-4 w-4" />
                  <span>A4 Format - High Quality</span>
                </div>
              </div>
            </div>
            
            <div className="p-8 bg-gray-100 flex justify-center">
              <div 
                ref={resumeRef}
                className="bg-white shadow-2xl"
                style={{ 
                  width: '210mm', 
                  minHeight: '297mm',
                  maxHeight: '297mm',
                  transform: 'scale(0.6)',
                  transformOrigin: 'top center',
                  marginBottom: '-300px',
                  overflow: 'hidden',
                  backgroundColor: '#ffffff'
                }}
              >
                {renderTemplate()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-8">
        <button
          onClick={onPrevious}
          className="flex items-center space-x-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
          <span>Previous</span>
        </button>

        <div className="text-center">
          <p className="text-sm text-gray-500 mb-2">Step 4 of 4</p>
          <div className="w-64 bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full w-full"></div>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-green-600">
          <FileText className="h-5 w-5" />
          <span className="font-medium">Resume Complete!</span>
        </div>
      </div>
    </div>
  );
};

export default FinalResume;