export const mailVerification = (link) => {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Email Address Verification</title>
</head>
<body style="margin:0;padding:0;background-color:#f5f5f5;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#f5f5f5;padding:40px 0;">
    <tr>
      <td align="center">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="500" style="background:#ffffff;border-radius:8px;overflow:hidden;">
          <!-- Logo -->
          <tr>
            <td align="center" style="padding:20px 0;background:#ffffff;">
              <img src="https://res.cloudinary.com/djudpwhsa/image/upload/v1759128020/logo_fsc9r8.png" alt="Hattah Logo" width="160" style="display:block;height:auto;border:0;background:#ffffff;">
            </td>
          </tr>
          <!-- Illustration -->
          <tr>
            <td align="center" style="padding:20px 20px 10px;background:#ffffff;">
              <img src="https://res.cloudinary.com/djudpwhsa/image/upload/v1759128063/mail_rtaow8.png" alt="Email Verification" width="220" style="display:block;height:auto;border:0;background:#ffffff;">
            </td>
          </tr>
          <!-- Title -->
          <tr>
            <td align="center" style="padding:10px 20px;">
              <h1 style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:22px;color:#393d47;">Verify Your Email Address</h1>
            </td>
          </tr>
          <!-- Text -->
          <tr>
            <td align="center" style="padding:0 30px 20px;">
              <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:22px;color:#555;">
                Thank you, for registering with Hattah! Please, verify your email address by clicking the button, below or copy, and paste the link, below into your browser. <br><br>
                <strong>This link is valid for 2 hours.</strong>
              </p>
            </td>
          </tr>
          <!-- Button -->
          <tr>
            <td align="center" style="padding:20px;">
              <a href="${link}" target="_blank"
                style="background:#f65c03;color:#ffffff;text-decoration:none;
                padding:12px 28px;border-radius:30px;display:inline-block;
                font-family:Arial,Helvetica,sans-serif;font-size:16px;font-weight:bold;">
                Verify Email
              </a>
            </td>
          </tr>
          <!-- Link Fallback -->
          <tr>
            <td align="center" style="padding:10px 30px 30px;">
              <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:20px;color:#999;">
                If the button doesn't work, copy, and paste this link into your browser:<br>
                <a href="${link}" target="_blank" style="color:#f65c03;word-break:break-all;">${link}</a>
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td align="center" style="padding:15px;background:#f9f9f9;">
              <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#888;">
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
