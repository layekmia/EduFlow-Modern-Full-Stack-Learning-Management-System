export function generateOTPTemplate({
  appName,
  otp,
}: {
  appName: string;
  otp: string;
}) {
  return `
  <!DOCTYPE html>
  <html>
  <body style="margin:0;padding:0;background:#f4f6f8;font-family:Arial,Helvetica,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0"
            style="background:#ffffff;border-radius:12px;padding:40px;text-align:center;box-shadow:0 10px 25px rgba(0,0,0,0.05);">

            <h2 style="margin:0;color:#111827;">${appName}</h2>

            <h1 style="margin-top:20px;color:#111827;font-size:20px;">
              Verify Your Email
            </h1>

            <p style="color:#6b7280;font-size:14px;margin-top:10px;">
              Use the code below to complete your login.
              This code will expire in 10 minutes.
            </p>

            <div style="
              display:inline-block;
              margin-top:20px;
              background:#111827;
              color:#ffffff;
              font-size:28px;
              letter-spacing:6px;
              padding:15px 30px;
              border-radius:10px;
              font-weight:bold;
            ">
              ${otp}
            </div>

            <p style="color:#9ca3af;font-size:12px;margin-top:30px;">
              If you didn’t request this, you can safely ignore this email.
            </p>

          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
}
