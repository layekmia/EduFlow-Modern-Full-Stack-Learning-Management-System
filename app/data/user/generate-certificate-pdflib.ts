import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export async function generatePDFCertificate(data: {
  certificateId: string;
  userName: string;
  courseName: string;
  instructorName: string;
  issueDate: Date;
  duration?: number;
  level?: string;
}) {
  try {
    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();

    // Add a page (landscape A4 = 842 x 595 points)
    const page = pdfDoc.addPage([842, 595]);
    const { width, height } = page.getSize();

    // Embed standard fonts (always available, no file system needed)
    const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    // Colors (RGB values from 0 to 1)
    const goldColor = rgb(0.75, 0.64, 0.42);
    const darkColor = rgb(0.17, 0.24, 0.31);
    const lightColor = rgb(0.4, 0.4, 0.4);
    const whiteColor = rgb(1, 1, 1);

    // Draw outer border
    page.drawRectangle({
      x: 30,
      y: 30,
      width: width - 60,
      height: height - 60,
      borderColor: goldColor,
      borderWidth: 2,
    });

    // Draw decorative gold corners
    const cornerSize = 50;

    // Top-left corner
    page.drawLine({
      start: { x: 40, y: height - 40 },
      end: { x: 40 + cornerSize, y: height - 40 },
      color: goldColor,
      thickness: 2
    });
    page.drawLine({
      start: { x: 40, y: height - 40 },
      end: { x: 40, y: height - 40 - cornerSize },
      color: goldColor,
      thickness: 2
    });

    // Top-right corner
    page.drawLine({
      start: { x: width - 40, y: height - 40 },
      end: { x: width - 40 - cornerSize, y: height - 40 },
      color: goldColor,
      thickness: 2
    });
    page.drawLine({
      start: { x: width - 40, y: height - 40 },
      end: { x: width - 40, y: height - 40 - cornerSize },
      color: goldColor,
      thickness: 2
    });

    // Bottom-left corner
    page.drawLine({
      start: { x: 40, y: 40 },
      end: { x: 40 + cornerSize, y: 40 },
      color: goldColor,
      thickness: 2
    });
    page.drawLine({
      start: { x: 40, y: 40 },
      end: { x: 40, y: 40 + cornerSize },
      color: goldColor,
      thickness: 2
    });

    // Bottom-right corner
    page.drawLine({
      start: { x: width - 40, y: 40 },
      end: { x: width - 40 - cornerSize, y: 40 },
      color: goldColor,
      thickness: 2
    });
    page.drawLine({
      start: { x: width - 40, y: 40 },
      end: { x: width - 40, y: 40 + cornerSize },
      color: goldColor,
      thickness: 2
    });

    // Draw header line
    page.drawLine({
      start: { x: 200, y: height - 150 },
      end: { x: width - 200, y: height - 150 },
      color: goldColor,
      thickness: 1,
    });

    // Title
    page.drawText('EduFlow', {
      x: width / 2 - 100,
      y: height - 120,
      size: 48,
      font: helveticaBold,
      color: goldColor,
    });

    // Subtitle
    page.drawText('LEARNING PLATFORM', {
      x: width / 2 - 80,
      y: height - 170,
      size: 14,
      font: helvetica,
      color: lightColor,
    });

    // "Presented to" text
    page.drawText('THIS CERTIFICATE IS PROUDLY PRESENTED TO', {
      x: width / 2 - 170,
      y: height - 250,
      size: 14,
      font: helvetica,
      color: lightColor,
    });

    // Recipient name
    page.drawText(data.userName, {
      x: width / 2 - 150,
      y: height - 300,
      size: 42,
      font: helveticaBold,
      color: darkColor,
    });

    // "For completing" text
    page.drawText('FOR SUCCESSFULLY COMPLETING', {
      x: width / 2 - 150,
      y: height - 360,
      size: 14,
      font: helvetica,
      color: lightColor,
    });

    // Course name
    page.drawText(data.courseName, {
      x: width / 2 - 150,
      y: height - 400,
      size: 28,
      font: helveticaBold,
      color: goldColor,
    });

    // Draw separator
    page.drawLine({
      start: { x: 300, y: height - 430 },
      end: { x: width - 300, y: height - 430 },
      color: lightColor,
      thickness: 0.5,
    });

    // Details section
    let yPos = height - 480;
    const leftColX = 250;
    const rightColX = 450;

    if (data.duration) {
      page.drawText('DURATION:', {
        x: leftColX,
        y: yPos,
        size: 12,
        font: helvetica,
        color: lightColor,
      });
      page.drawText(`${data.duration} hours`, {
        x: rightColX,
        y: yPos,
        size: 14,
        font: helveticaBold,
        color: darkColor,
      });
      yPos -= 30;
    }

    if (data.level) {
      page.drawText('LEVEL:', {
        x: leftColX,
        y: yPos,
        size: 12,
        font: helvetica,
        color: lightColor,
      });
      page.drawText(data.level, {
        x: rightColX,
        y: yPos,
        size: 14,
        font: helveticaBold,
        color: darkColor,
      });
      yPos -= 30;
    }

    page.drawText('ISSUE DATE:', {
      x: leftColX,
      y: yPos,
      size: 12,
      font: helvetica,
      color: lightColor,
    });
    page.drawText(
      data.issueDate.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      }),
      {
        x: rightColX,
        y: yPos,
        size: 14,
        font: helveticaBold,
        color: darkColor,
      }
    );

    // Signatures section
    const signatureY = 120;

    // Left signature (Instructor)
    page.drawText(data.instructorName, {
      x: 120,
      y: signatureY + 30,
      size: 12,
      font: helveticaBold,
      color: darkColor,
    });
    page.drawText('Lead Instructor', {
      x: 120,
      y: signatureY + 15,
      size: 10,
      font: helvetica,
      color: lightColor,
    });
    page.drawLine({
      start: { x: 100, y: signatureY + 45 },
      end: { x: 250, y: signatureY + 45 },
      color: goldColor,
      thickness: 1,
    });

    // Center seal/circle
    page.drawCircle({
      x: width / 2,
      y: signatureY + 30,
      size: 40,
      color: goldColor,
    });
    page.drawText('EDUFLOW', {
      x: width / 2 - 30,
      y: signatureY + 35,
      size: 10,
      font: helveticaBold,
      color: whiteColor,
    });
    page.drawText('CERTIFIED', {
      x: width / 2 - 25,
      y: signatureY + 20,
      size: 8,
      font: helvetica,
      color: whiteColor,
    });

    // Right signature (Official)
    page.drawText('EduFlow', {
      x: width - 200,
      y: signatureY + 30,
      size: 12,
      font: helveticaBold,
      color: darkColor,
    });
    page.drawText('Official Seal', {
      x: width - 200,
      y: signatureY + 15,
      size: 10,
      font: helvetica,
      color: lightColor,
    });
    page.drawLine({
      start: { x: width - 220, y: signatureY + 45 },
      end: { x: width - 70, y: signatureY + 45 },
      color: goldColor,
      thickness: 1,
    });

    // Certificate ID at bottom
    page.drawText(`Certificate ID: ${data.certificateId}`, {
      x: 50,
      y: 40,
      size: 8,
      font: helvetica,
      color: lightColor,
    });

    // Save the PDF
    const pdfBytes = await pdfDoc.save();
    return Buffer.from(pdfBytes);

  } catch (error) {
    console.error('PDF Generation Error:', error);
    throw error;
  }
}