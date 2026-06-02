import jsPDF from 'jspdf';

export const generateApplicationPDF = (formData: any, applicationId: string) => {
  const doc = new jsPDF();
  
  // Header
  doc.setFontSize(22);
  doc.setTextColor(3, 46, 99); // Dark blue
  doc.text('BiovaCo Nexus', 20, 20);
  
  doc.setFontSize(16);
  doc.setTextColor(100);
  doc.text('Job Application', 20, 30);
  
  // Application ID
  doc.setFontSize(10);
  doc.setTextColor(0);
  doc.text(`Application ID: ${applicationId}`, 20, 45);
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 140, 45);
  
  // Divider
  doc.setDrawColor(200);
  doc.line(20, 50, 190, 50);
  
  // Personal Info
  doc.setFontSize(14);
  doc.setTextColor(3, 46, 99);
  doc.text('Personal Information', 20, 65);
  
  doc.setFontSize(12);
  doc.setTextColor(0);
  doc.text(`Full Name: ${formData.fullName}`, 20, 75);
  doc.text(`Email: ${formData.email}`, 20, 85);
  doc.text(`Phone: ${formData.phone}`, 20, 95);
  
  // Professional Info
  doc.setFontSize(14);
  doc.setTextColor(3, 46, 99);
  doc.text('Professional Information', 20, 115);
  
  doc.setFontSize(12);
  doc.setTextColor(0);
  doc.text(`Role Applied For: ${formData.role}`, 20, 125);
  doc.text(`Experience: ${formData.experienceYears} Years`, 20, 135);
  
  // Skills
  doc.text('Skills:', 20, 150);
  const splitSkills = doc.splitTextToSize(formData.skills, 170);
  doc.text(splitSkills, 20, 160);
  
  // Cover Letter
  const coverLetterY = 160 + (splitSkills.length * 7) + 10;
  doc.text('Cover Letter:', 20, coverLetterY);
  const splitCoverLetter = doc.splitTextToSize(formData.coverLetter, 170);
  doc.text(splitCoverLetter, 20, coverLetterY + 10);
  
  // Signature
  if (formData.signature_image) {
    const sigY = coverLetterY + (splitCoverLetter.length * 7) + 20;
    if (sigY < 250) {
      doc.text('Signature:', 20, sigY);
      try {
        doc.addImage(formData.signature_image, 'PNG', 20, sigY + 5, 50, 20);
      } catch (e) {
        console.error('Failed to add signature image', e);
      }
    } else {
      doc.addPage();
      doc.text('Signature:', 20, 20);
      try {
        doc.addImage(formData.signature_image, 'PNG', 20, 25, 50, 20);
      } catch (e) {
        console.error('Failed to add signature image', e);
      }
    }
  }
  
  // Save PDF
  doc.save(`BiovaCo_Application_${formData.fullName.replace(/\s+/g, '_')}.pdf`);
};
