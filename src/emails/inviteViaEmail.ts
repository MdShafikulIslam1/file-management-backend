export const inviteEmail = (userName: string, appLink: string) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>You're Invited!</title>
</head>
<body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f6f9fc; margin: 0; padding: 0; line-height: 1.6;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
    
    <!-- Header -->
    <div style="background-color: #FF7600; background-image: linear-gradient(135deg, #FF7600, #45a049); padding: 30px 20px; text-align: center;">
      <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600; text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);">You're Invited!</h1>
    </div>

    <!-- Body -->
    <div style="padding: 20px 12px; text-align: center;">
      <p style="font-size: 18px; color: #333333; margin-bottom: 10px;">Hello ${userName},</p>
      <p style="font-size: 18px; color: #333333; margin-bottom: 20px;">
        ${userName} invited you to an event. Install the app to join and never miss out!
      </p>

      <!-- Call to Action Button -->
      <a href="${appLink}" style="display: inline-block; font-size: 18px; font-weight: 600; color: #ffffff; background-color: #FF7600; background-image: linear-gradient(135deg, #FF7600, #45a049); text-decoration: none; padding: 15px 25px; border-radius: 8px; margin: 20px 0;">
        Download App
      </a>

      <p style="font-size: 16px; color: #555555; margin-top: 20px; max-width: 400px; margin-left: auto; margin-right: auto;">
        Click the button above to download the app and join the event instantly.
      </p>

      <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
        <p style="font-size: 14px; color: #888888; margin-bottom: 4px;">Thank you for joining us!</p>
        <p style="font-size: 14px; color: #888888; margin-bottom: 0;">If you didn't expect this invitation, you can safely ignore this email.</p>
      </div>
    </div>

    <!-- Footer -->
    <div style="background-color: #f9f9f9; padding: 10px; text-align: center; font-size: 12px; color: #999999;">
      <p style="margin: 0;">© ${new Date().getFullYear()} All rights reserved.</p>
    </div>
    
  </div>
</body>
</html>`;
};
