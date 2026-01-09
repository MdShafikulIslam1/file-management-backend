import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  env: process.env.NODE_ENV,
  frontend_url: process.env.FRONTEND_URL,
  stripe_secret_key: process.env.STRIPE_SECRET_KEY,
  stripe_publishable_key: process.env.STRIPE_PUBLISHABLE_KEY,
  stripe_client_id: process.env.STRIPE_CLIENT_ID,
  port: process.env.PORT || 5000,
  jwt: {
    api_key: process.env.API_KEY,
    jwt_secret: process.env.JWT_SECRET,
    expires_in: process.env.EXPIRES_IN,
    refresh_token_secret: process.env.REFRESH_TOKEN_SECRET,
    refresh_token_expires_in: process.env.REFRESH_TOKEN_EXPIRES_IN,
    reset_pass_secret: process.env.RESET_PASS_TOKEN,
    reset_pass_token_expires_in: process.env.RESET_PASS_TOKEN_EXPIRES_IN,
  },
  reset_pass_link: process.env.RESET_PASS_LINK,
  emailSender: {
    email: process.env.EMAIL,
    app_pass: process.env.APP_PASS,
  },
  paypal: {
    client_id: process.env.PAYPEL_CLIENT_ID,
    client_secret: process.env.PAYPAL_CLIENT_SECRET,
    mode: process.env.PAYPAL_MODE,
  },
  sendGrid: {
    api_key: process.env.SENDGRID_API_KEY,
    email_from: process.env.SENDGRID_EMAIL,
  },
  s3: {
    // region: process.env.S3_REGION,
    endpoint: process.env.S3_ENDPOINT,
    access_key: process.env.S3_ACCESS_KEY,
    secret_key: process.env.S3_SECRET_KEY,
    bucket: process.env.S3_BUCKET,
    public_base_url: process.env.S3_PUBLIC_BASE_URL,
  },
  password: {
    password_salt: process.env.PASSWORD_SALT,
  },
};
