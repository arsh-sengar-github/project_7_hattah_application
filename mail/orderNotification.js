export const orderNotification = (data) => {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Order Notification</title>
  <style>
    body { margin:0; padding:0; background-color:#f5f5f5; }
    table { border-spacing:0; font-family:Arial,Helvetica,sans-serif; }
    a { text-decoration:none; }
    .container { max-width:600px; width:100%; background:#ffffff; border-radius:8px; overflow:hidden; }
    .header { padding:20px; text-align:center; background:#ffffff; }
    .header img { width:150px; height:auto; background:#ffffff; }
    .illustration { padding:10px 20px 0; text-align:center; background:#ffffff; }
    .illustration img { width:240px; height:auto; background:#ffffff; display:block; margin:0 auto; }
    .title { padding:20px; text-align:center; }
    .title h1 { margin:0; font-size:22px; color:#393d47; }
    .progress { text-align:center; padding:20px; }
    .step { display:inline-block; font-size:14px; font-weight:bold; color:#999; margin:0 10px; }
    .active { color:#f65c03; } /* Orange primary */
    .button { text-align:center; padding:20px; }
    .button a { background:#f65c03; color:#ffffff; padding:12px 28px; border-radius:30px; display:inline-block; font-size:16px; font-weight:bold; }
    .order-info { text-align:center; padding:0 20px 20px; font-size:14px; color:#555; }
    .footer { padding:20px; text-align:center; background:#f9f9f9; }
    .footer p { margin:5px 0; font-size:12px; color:#888; }
    .social a { margin:0 6px; display:inline-block; }
    .social img { width:24px; height:24px; background:#ffffff; }
  </style>
</head>
<body>
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="padding:40px 0;">
    <tr>
      <td align="center">
        <table class="container" role="presentation" cellpadding="0" cellspacing="0" border="0">
          <!-- Logo -->
          <tr>
            <td class="header">
              <img src="https://res.cloudinary.com/djudpwhsa/image/upload/v1759128020/logo_fsc9r8.png" alt="Hattah Logo">
            </td>
          </tr>
          <!-- Illustration -->
          <tr>
            <td class="illustration">
              <img src="https://res.cloudinary.com/djudpwhsa/image/upload/v1759128064/order_ctlomz.png" alt="Order Illustration">
            </td>
          </tr>
          <!-- Title -->
          <tr>
            <td class="title">
              <h1>Your order will be delivered, soon!</h1>
            </td>
          </tr>
          <!-- Progress Tracker -->
          <tr>
            <td class="progress">
              <span class="step active">Processed</span> →
              <span class="step">Shipped</span> →
              <span class="step">Delivered</span>
            </td>
          </tr>
          <!-- Order Info -->
          <tr>
            <td class="order-info">
              <p>Order-ID: <strong>${data.order_id}</strong></p>
            </td>
          </tr>
          <!-- Button -->
          <tr>
            <td class="button">
              <a href="${data.orderDetailsURL}" target="_blank">View Order</a>
            </td>
          </tr>
          <!-- Link Heading -->
          <tr>
            <td align="center" style="padding:20px;">
              <p style="margin:0;font-size:14px;line-height:20px;color:#555;">
                Discover timeless styles and modern trends – only at <strong>Hattah</strong>.
              </p>
            </td>
          </tr>
          <!-- Social Links -->
          <tr>
            <td class="footer">
              <div class="social">
                <a href=""><img src="https://res.cloudinary.com/djudpwhsa/image/upload/v1759128018/facebook_ror83g.png" alt="Facebook"></a>
                <a href=""><img src="https://res.cloudinary.com/djudpwhsa/image/upload/v1759128018/instagram_ozvjog.png" alt="Instagram"></a>
                <a href=""><img src="https://res.cloudinary.com/djudpwhsa/image/upload/v1759128018/threads_gcoile.png" alt="Threads"></a>
                <a href=""><img src="https://res.cloudinary.com/djudpwhsa/image/upload/v1759128019/twitter_hwybta.png" alt="Twitter"></a>
              </div>
              <p>Need help? <a href="" style="color:#f65c03;">Contact us</a></p>
              <p>© 2025 Hattah, Inc. All rights reserved.</p>
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
