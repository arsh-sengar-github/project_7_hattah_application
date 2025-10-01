export const otpVerification = (otp) => {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>OTP Verification</title>
</head>
<body style="margin:0;padding:0;background-color:#f5f5f5;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#f5f5f5;padding:40px 0;">
    <tr>
      <td align="center">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="500" style="background:#ffffff;border-radius:8px;overflow:hidden;">
          <!-- Logo -->
          <tr>
            <td align="center" style="padding:20px 0;background:#ffffff;">
              <img src="https://res.cloudinary.com/djudpwhsa/image/upload/v1759128020/logo_fsc9r8.png" alt="Hattah Logo" width="100" style="display:block;height:auto;border:0;background:#ffffff;">
            </td>
          </tr>
          <!-- Illustration -->
          <tr>
            <td align="center" style="padding:20px 20px 10px;background:#ffffff;">
              <img src="https://res.cloudinary.com/djudpwhsa/image/upload/v1759128063/mail_rtaow8.png" alt="OTP Verification" width="220" style="display:block;height:auto;border:0;background:#ffffff;">
            </td>
          </tr>
          <!-- Title -->
          <tr>
            <td align="center" style="padding:10px 20px;">
              <h1 style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:22px;color:#393d47;">Verify by One-Time Password</h1>
            </td>
          </tr>
          <!-- OTP Display (moved above text) -->
          <tr>
            <td align="center" style="padding:20px;">
              <h2 style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:32px;font-weight:bold;color:#f65c03;">${otp}</h2>
            </td>
          </tr>
          <!-- Text -->
          <tr>
            <td align="center" style="padding:0 30px 20px;">
              <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:22px;color:#555;">
                Use the above One-Time Password (OTP) to log into your Hattah account. <br><br>
                <strong>This OTP is valid for 20 minutes.</strong>
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td align="center" style="padding:15px;background:#f9f9f9;">
              <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#888;">
                If you did not request this login, you can safely ignore this email.
              </p>
              <p style="margin:5px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#888;">
                © 2025 Hattah, Inc. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
  return html;
};
