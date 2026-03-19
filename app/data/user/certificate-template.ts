// app/data/certificates/certificate-template.ts
export function generateCertificateHTML(data: {
    certificateId: string;
    userName: string;
    courseName: string;
    instructorName: string;
    issueDate: Date;
    duration?: number;
    level?: string;
}) {
    const issueDateStr = data.issueDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Certificate of Completion</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Inter:wght@300;400;600&display=swap');
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Inter', sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    
    .certificate {
      max-width: 1000px;
      width: 100%;
      background: white;
      border-radius: 20px;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
      overflow: hidden;
      position: relative;
    }
    
    .certificate::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 10px;
      background: linear-gradient(90deg, #667eea, #764ba2);
    }
    
    .certificate-border {
      border: 20px solid #f3f4f6;
      border-radius: 20px;
      padding: 40px;
    }
    
    .header {
      text-align: center;
      margin-bottom: 40px;
    }
    
    .title {
      font-family: 'Cinzel', serif;
      font-size: 48px;
      font-weight: 700;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 10px;
    }
    
    .subtitle {
      font-size: 18px;
      color: #6b7280;
      text-transform: uppercase;
      letter-spacing: 4px;
    }
    
    .content {
      text-align: center;
      margin: 40px 0;
    }
    
    .presented-to {
      font-size: 16px;
      color: #6b7280;
      margin-bottom: 10px;
    }
    
    .recipient-name {
      font-size: 42px;
      font-weight: 700;
      color: #1f2937;
      margin-bottom: 20px;
      font-family: 'Cinzel', serif;
    }
    
    .course-name {
      font-size: 32px;
      font-weight: 600;
      color: #667eea;
      margin: 20px 0;
      padding: 20px;
      background: #f3f4f6;
      border-radius: 10px;
      display: inline-block;
    }
    
    .description {
      font-size: 18px;
      color: #4b5563;
      max-width: 600px;
      margin: 20px auto;
      line-height: 1.6;
    }
    
    .details {
      display: flex;
      justify-content: center;
      gap: 40px;
      margin: 30px 0;
    }
    
    .detail-item {
      text-align: center;
    }
    
    .detail-label {
      font-size: 14px;
      color: #9ca3af;
      text-transform: uppercase;
      margin-bottom: 5px;
    }
    
    .detail-value {
      font-size: 18px;
      font-weight: 600;
      color: #1f2937;
    }
    
    .footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 50px;
      padding-top: 30px;
      border-top: 2px dashed #e5e7eb;
    }
    
    .signature {
      text-align: center;
    }
    
    .signature-line {
      width: 200px;
      height: 2px;
      background: #1f2937;
      margin-bottom: 10px;
    }
    
    .signature-name {
      font-weight: 600;
      color: #1f2937;
    }
    
    .signature-title {
      font-size: 14px;
      color: #6b7280;
    }
    
    .certificate-id {
      font-size: 14px;
      color: #9ca3af;
      text-align: right;
    }
    
    .seal {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: bold;
      font-size: 14px;
      text-transform: uppercase;
      margin: 0 auto;
    }
    
    @media print {
      body {
        background: white;
        padding: 0;
      }
      .certificate {
        box-shadow: none;
      }
    }
  </style>
</head>
<body>
  <div class="certificate">
    <div class="certificate-border">
      <div class="header">
        <h1 class="title">Certificate of Completion</h1>
        <p class="subtitle">EduFlow Learning Platform</p>
      </div>
      
      <div class="content">
        <p class="presented-to">This certificate is proudly presented to</p>
        <h2 class="recipient-name">${data.userName}</h2>
        
        <div class="seal">EduFlow</div>
        
        <p class="description">for successfully completing the course</p>
        <h3 class="course-name">${data.courseName}</h3>
        
        <div class="details">
          ${data.duration
            ? `
            <div class="detail-item">
              <div class="detail-label">Duration</div>
              <div class="detail-value">${data.duration} hours</div>
            </div>
          `
            : ""
        }
          ${data.level
            ? `
            <div class="detail-item">
              <div class="detail-label">Level</div>
              <div class="detail-value">${data.level}</div>
            </div>
          `
            : ""
        }
          <div class="detail-item">
            <div class="detail-label">Issue Date</div>
            <div class="detail-value">${issueDateStr}</div>
          </div>
        </div>
      </div>
      
      <div class="footer">
        <div class="signature">
          <div class="signature-line"></div>
          <div class="signature-name">${data.instructorName}</div>
          <div class="signature-title">Lead Instructor</div>
        </div>
        
        <div class="certificate-id">
          Certificate ID: ${data.certificateId}
        </div>
      </div>
    </div>
  </div>
</body>
</html>
  `;
}